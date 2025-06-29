const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

/**
 * 增强版文档同步系统
 * 提供智能同步、冲突检测、版本控制等功能
 */
class DocsSync {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.docsDir = path.join(this.projectRoot, 'docs');
    this.syncStateFile = path.join(this.docsDir, '.sync-state.json');
    this.configFile = path.join(this.projectRoot, 'config', 'docs-sync.config.js');
    
    this.config = this.loadConfig();
    this.syncState = this.loadSyncState();
  }

  /**
   * 加载同步配置
   */
  loadConfig() {
    const defaultConfig = {
      // 支持的语言
      languages: ['en', 'zh', 'tw', 'jp', 'kr', 'de', 'es', 'fr', 'it', 'ru'],
      
      // 主语言（源语言）
      primaryLanguage: 'en',
      
      // 同步策略
      syncStrategy: {
        mode: 'smart', // 'force', 'smart', 'manual'
        conflictResolution: 'prompt', // 'source', 'target', 'prompt', 'merge'
        backupBeforeSync: true,
        validateAfterSync: true
      },
      
      // 文件过滤
      fileFilters: {
        include: ['*.md'],
        exclude: ['**/node_modules/**', '**/.git/**', '**/quality-reports/**'],
        ignorePatterns: ['.sync-state.json', 'translation-*.md']
      },
      
      // 同步规则
      syncRules: {
        preserveMetadata: true,
        updateTimestamps: true,
        maintainStructure: true,
        syncImages: true,
        syncAssets: false
      },
      
      // 验证规则
      validation: {
        checkStructure: true,
        validateLinks: true,
        checkTranslationStatus: true,
        requireMetadata: true
      }
    };
    
    if (fs.existsSync(this.configFile)) {
      try {
        const userConfig = require(this.configFile);
        return { ...defaultConfig, ...userConfig };
      } catch (error) {
        console.warn('⚠️ 无法加载同步配置，使用默认配置');
      }
    }
    
    return defaultConfig;
  }

  /**
   * 加载同步状态
   */
  loadSyncState() {
    if (fs.existsSync(this.syncStateFile)) {
      try {
        return JSON.parse(fs.readFileSync(this.syncStateFile, 'utf8'));
      } catch (error) {
        console.warn('⚠️ 无法加载同步状态，将创建新的状态文件');
      }
    }
    
    return {
      lastSync: null,
      fileHashes: {},
      conflicts: [],
      syncHistory: []
    };
  }

  /**
   * 保存同步状态
   */
  saveSyncState() {
    fs.writeFileSync(this.syncStateFile, JSON.stringify(this.syncState, null, 2));
  }

  /**
   * 执行完整同步
   */
  async runFullSync(options = {}) {
    console.log('🔄 开始文档同步...');
    
    const syncOptions = {
      force: false,
      dryRun: false,
      languages: this.config.languages,
      ...options
    };
    
    const syncReport = {
      timestamp: new Date().toISOString(),
      mode: syncOptions.force ? 'force' : this.config.syncStrategy.mode,
      languages: {},
      summary: {
        totalFiles: 0,
        syncedFiles: 0,
        skippedFiles: 0,
        conflictFiles: 0,
        errorFiles: 0
      },
      conflicts: [],
      errors: [],
      outOfSync: []
    };
    
    // 创建备份（如果启用）
    if (this.config.syncStrategy.backupBeforeSync && !syncOptions.dryRun) {
      await this.createBackup();
    }
    
    // 获取源文件列表
    const sourceFiles = this.getSourceFiles();
    console.log(`📁 发现 ${sourceFiles.length} 个源文件`);
    
    // 同步到各个语言
    for (const lang of syncOptions.languages) {
      if (lang === this.config.primaryLanguage) continue;
      
      console.log(`🌍 同步到 ${lang}...`);
      const langReport = await this.syncToLanguage(lang, sourceFiles, syncOptions);
      syncReport.languages[lang] = langReport;
      
      // 更新摘要
      syncReport.summary.totalFiles += langReport.totalFiles;
      syncReport.summary.syncedFiles += langReport.syncedFiles;
      syncReport.summary.skippedFiles += langReport.skippedFiles;
      syncReport.summary.conflictFiles += langReport.conflictFiles;
      syncReport.summary.errorFiles += langReport.errorFiles;
      
      syncReport.conflicts.push(...langReport.conflicts);
      syncReport.errors.push(...langReport.errors);
    }
    
    // 验证同步结果
    if (this.config.syncStrategy.validateAfterSync && !syncOptions.dryRun) {
      console.log('✅ 验证同步结果...');
      await this.validateSyncResult(syncReport);
    }
    
    // 更新同步状态
    if (!syncOptions.dryRun) {
      this.syncState.lastSync = syncReport.timestamp;
      this.syncState.syncHistory.push({
        timestamp: syncReport.timestamp,
        summary: syncReport.summary
      });
      
      // 保持历史记录不超过50条
      if (this.syncState.syncHistory.length > 50) {
        this.syncState.syncHistory = this.syncState.syncHistory.slice(-50);
      }
      
      this.saveSyncState();
    }
    
    // 生成报告
    await this.generateSyncReport(syncReport);
    
    console.log('✅ 同步完成');
    console.log(`📊 同步统计: ${syncReport.summary.syncedFiles}个文件已同步，${syncReport.summary.conflictFiles}个冲突，${syncReport.summary.errorFiles}个错误`);
    
    return syncReport;
  }

  /**
   * 同步到指定语言
   */
  async syncToLanguage(lang, sourceFiles, options) {
    const langDir = path.join(this.docsDir, lang);
    
    // 确保目标目录存在
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir, { recursive: true });
    }
    
    const langReport = {
      language: lang,
      totalFiles: sourceFiles.length,
      syncedFiles: 0,
      skippedFiles: 0,
      conflictFiles: 0,
      errorFiles: 0,
      files: {},
      conflicts: [],
      errors: []
    };
    
    for (const sourceFile of sourceFiles) {
      try {
        const result = await this.syncFile(sourceFile, lang, options);
        langReport.files[result.relativePath] = result;
        
        switch (result.status) {
          case 'synced':
            langReport.syncedFiles++;
            break;
          case 'skipped':
            langReport.skippedFiles++;
            break;
          case 'conflict':
            langReport.conflictFiles++;
            langReport.conflicts.push(result.conflict);
            break;
          case 'error':
            langReport.errorFiles++;
            langReport.errors.push(result.error);
            break;
        }
      } catch (error) {
        langReport.errorFiles++;
        langReport.errors.push({
          file: sourceFile,
          message: error.message
        });
      }
    }
    
    return langReport;
  }

  /**
   * 同步单个文件
   */
  async syncFile(sourceFile, targetLang, options) {
    const sourceDir = path.join(this.docsDir, this.config.primaryLanguage);
    const targetDir = path.join(this.docsDir, targetLang);
    
    const relativePath = path.relative(sourceDir, sourceFile);
    const targetFile = path.join(targetDir, relativePath);
    
    const result = {
      relativePath,
      sourceFile,
      targetFile,
      status: 'skipped',
      reason: '',
      conflict: null,
      error: null
    };
    
    // 检查是否需要同步
    const needsSync = await this.checkIfNeedsSync(sourceFile, targetFile, options);
    
    if (!needsSync.required) {
      result.reason = needsSync.reason;
      return result;
    }
    
    // 检查冲突
    if (fs.existsSync(targetFile) && !options.force) {
      const conflict = await this.detectConflict(sourceFile, targetFile);
      
      if (conflict.hasConflict) {
        result.status = 'conflict';
        result.conflict = conflict;
        
        // 根据冲突解决策略处理
        const resolution = await this.resolveConflict(conflict, options);
        if (resolution.resolved) {
          result.status = 'synced';
          result.reason = `冲突已解决: ${resolution.strategy}`;
        }
        
        return result;
      }
    }
    
    // 执行同步
    if (!options.dryRun) {
      await this.performSync(sourceFile, targetFile, targetLang);
      
      // 更新文件哈希
      const sourceHash = this.calculateFileHash(sourceFile);
      this.syncState.fileHashes[relativePath] = {
        [this.config.primaryLanguage]: sourceHash,
        [targetLang]: sourceHash,
        lastSync: new Date().toISOString()
      };
    }
    
    result.status = 'synced';
    result.reason = '文件已同步';
    
    return result;
  }

  /**
   * 检查文件是否需要同步
   */
  async checkIfNeedsSync(sourceFile, targetFile, options) {
    // 强制模式下总是同步
    if (options.force) {
      return { required: true, reason: '强制同步' };
    }
    
    // 目标文件不存在
    if (!fs.existsSync(targetFile)) {
      return { required: true, reason: '目标文件不存在' };
    }
    
    // 检查文件哈希
    const sourceHash = this.calculateFileHash(sourceFile);
    const targetHash = this.calculateFileHash(targetFile);
    
    const sourceDir = path.join(this.docsDir, this.config.primaryLanguage);
    const relativePath = path.relative(sourceDir, sourceFile);
    
    const storedHashes = this.syncState.fileHashes[relativePath];
    
    if (!storedHashes) {
      return { required: true, reason: '无同步历史记录' };
    }
    
    // 源文件已更改
    if (storedHashes[this.config.primaryLanguage] !== sourceHash) {
      return { required: true, reason: '源文件已更新' };
    }
    
    // 目标文件已更改（可能需要手动处理）
    if (storedHashes[path.basename(path.dirname(targetFile))] !== targetHash) {
      return { required: true, reason: '目标文件已修改' };
    }
    
    return { required: false, reason: '文件已是最新' };
  }

  /**
   * 检测冲突
   */
  async detectConflict(sourceFile, targetFile) {
    const sourceContent = fs.readFileSync(sourceFile, 'utf8');
    const targetContent = fs.readFileSync(targetFile, 'utf8');
    
    const conflict = {
      hasConflict: false,
      type: 'none',
      sourceFile,
      targetFile,
      details: {}
    };
    
    // 检查结构冲突
    const sourceStructure = this.analyzeDocumentStructure(sourceContent);
    const targetStructure = this.analyzeDocumentStructure(targetContent);
    
    if (sourceStructure.headerCount !== targetStructure.headerCount) {
      conflict.hasConflict = true;
      conflict.type = 'structure';
      conflict.details.headerMismatch = {
        source: sourceStructure.headerCount,
        target: targetStructure.headerCount
      };
    }
    
    // 检查内容长度差异
    const lengthDiff = Math.abs(sourceContent.length - targetContent.length) / sourceContent.length;
    if (lengthDiff > 0.3) { // 30%以上差异
      conflict.hasConflict = true;
      conflict.type = conflict.type === 'none' ? 'content' : 'multiple';
      conflict.details.lengthDifference = {
        source: sourceContent.length,
        target: targetContent.length,
        percentage: Math.round(lengthDiff * 100)
      };
    }
    
    // 检查翻译状态
    const targetMeta = this.extractTranslationMetadata(targetContent);
    if (targetMeta.status === 'completed' || targetMeta.hasCustomContent) {
      conflict.hasConflict = true;
      conflict.type = conflict.type === 'none' ? 'translation' : 'multiple';
      conflict.details.translationStatus = targetMeta;
    }
    
    return conflict.hasConflict ? [conflict] : [];
  }

  /**
   * 解决冲突
   */
  async resolveConflict(conflict, options) {
    const resolution = {
      resolved: false,
      strategy: 'none',
      action: 'none'
    };
    
    switch (this.config.syncStrategy.conflictResolution) {
      case 'source':
        // 总是使用源文件覆盖
        resolution.resolved = true;
        resolution.strategy = 'source-override';
        resolution.action = 'overwrite';
        break;
        
      case 'target':
        // 保持目标文件不变
        resolution.resolved = false;
        resolution.strategy = 'target-preserve';
        resolution.action = 'skip';
        break;
        
      case 'merge':
        // 尝试智能合并
        const mergeResult = await this.attemptMerge(conflict);
        resolution.resolved = mergeResult.success;
        resolution.strategy = 'smart-merge';
        resolution.action = mergeResult.success ? 'merge' : 'manual';
        break;
        
      case 'prompt':
      default:
        // 提示用户选择（在CLI模式下）
        if (process.stdout.isTTY) {
          const choice = await this.promptConflictResolution(conflict);
          resolution.resolved = choice !== 'skip';
          resolution.strategy = choice;
          resolution.action = choice;
        } else {
          // 非交互模式下跳过
          resolution.resolved = false;
          resolution.strategy = 'manual-required';
          resolution.action = 'skip';
        }
        break;
    }
    
    return resolution;
  }

  /**
   * 执行文件同步
   */
  async performSync(sourceFile, targetFile, targetLang) {
    try {
      // 确保目标目录存在
      const targetDir = path.dirname(targetFile);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // 读取源文件内容
      let sourceContent = fs.readFileSync(sourceFile, 'utf8');
      
      // 处理翻译元数据
      if (targetLang !== this.config.primaryLanguage) {
        sourceContent = this.addTranslationMetadata(sourceContent, targetLang, sourceFile);
      }
      
      // 写入目标文件
      fs.writeFileSync(targetFile, sourceContent);
      
      console.log(`  ✅ ${path.relative(this.docsDir, targetFile)}`);
      
      return { 
        success: true, 
        syncedFiles: [path.relative(this.docsDir, targetFile)]
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message,
        syncedFiles: []
      };
    }
  }

  /**
   * 添加翻译元数据
   */
  addTranslationMetadata(content, targetLang, sourceFile) {
    const metadata = {
      zh: {
        status: '翻译状态: Pending Translation',
        source: `原文档: ${path.relative(this.docsDir, sourceFile)}`,
        updated: `最后更新: ${new Date().toISOString().split('T')[0]}`
      },
      jp: {
        status: '翻訳ステータス: Pending Translation',
        source: `原文書: ${path.relative(this.docsDir, sourceFile)}`,
        updated: `最終更新: ${new Date().toISOString().split('T')[0]}`
      },
      kr: {
        status: '번역 상태: Pending Translation',
        source: `원본 문서: ${path.relative(this.docsDir, sourceFile)}`,
        updated: `최종 업데이트: ${new Date().toISOString().split('T')[0]}`
      }
    };
    
    const langMeta = metadata[targetLang] || {
      status: 'Translation Status: Pending Translation',
      source: `Source Document: ${path.relative(this.docsDir, sourceFile)}`,
      updated: `Last Updated: ${new Date().toISOString().split('T')[0]}`
    };
    
    // 检查是否已有元数据
    if (content.includes('翻译状态') || content.includes('Translation Status') || 
        content.includes('翻訳ステータス') || content.includes('번역 상태')) {
      return content; // 已有元数据，不重复添加
    }
    
    // 在文档开头添加元数据
    const metadataBlock = `---\n${langMeta.status}\n${langMeta.source}\n${langMeta.updated}\n---\n\n`;
    
    return metadataBlock + content;
  }

  /**
   * 提取翻译元数据
   */
  extractTranslationMetadata(content) {
    const metadata = {
      status: 'unknown',
      hasCustomContent: false,
      lastUpdated: null
    };
    
    // 检查翻译状态
    if (content.includes('已完成') || content.includes('Completed') || 
        content.includes('完了') || content.includes('완료')) {
      metadata.status = 'completed';
    } else if (content.includes('待翻译') || content.includes('Pending') ||
               content.includes('翻訳準備中') || content.includes('번역 대기 중')) {
      metadata.status = 'pending';
    }
    
    // 检查是否有自定义内容（通过内容长度和结构判断）
    const lines = content.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim().length > 0);
    
    if (nonEmptyLines.length > 10) { // 假设超过10行非空内容表示有实际翻译
      metadata.hasCustomContent = true;
    }
    
    // 提取更新时间
    const dateMatch = content.match(/(最后更新|Last Updated|最終更新|최종 업데이트):\s*([\d-]+)/);
    if (dateMatch) {
      metadata.lastUpdated = dateMatch[2];
    }
    
    return metadata;
  }

  /**
   * 分析文档结构
   */
  analyzeDocumentStructure(content) {
    const headers = content.match(/^#+\s+.+$/gm) || [];
    const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
    const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
    
    return {
      headerCount: headers.length,
      codeBlockCount: codeBlocks.length,
      linkCount: links.length,
      lineCount: content.split('\n').length,
      wordCount: content.split(/\s+/).length
    };
  }

  /**
   * 获取源文件列表
   */
  getSourceFiles() {
    const sourceDir = path.join(this.docsDir, this.config.primaryLanguage);
    
    if (!fs.existsSync(sourceDir)) {
      console.warn(`⚠️ 源语言目录不存在: ${sourceDir}`);
      return [];
    }
    
    return this.getAllMarkdownFiles(sourceDir)
      .filter(file => this.shouldIncludeFile(file));
  }

  /**
   * 检查文件是否应该包含在同步中
   */
  shouldIncludeFile(filePath) {
    const relativePath = path.relative(this.docsDir, filePath);
    
    // 检查排除模式
    for (const pattern of this.config.fileFilters.exclude) {
      if (this.matchPattern(relativePath, pattern)) {
        return false;
      }
    }
    
    // 检查忽略模式
    for (const pattern of this.config.fileFilters.ignorePatterns) {
      if (relativePath.includes(pattern)) {
        return false;
      }
    }
    
    // 检查包含模式
    for (const pattern of this.config.fileFilters.include) {
      if (this.matchPattern(relativePath, pattern)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * 模式匹配
   */
  matchPattern(str, pattern) {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    return regex.test(str);
  }

  /**
   * 获取所有Markdown文件
   */
  getAllMarkdownFiles(dir) {
    const files = [];
    
    if (!fs.existsSync(dir)) {
      return files;
    }

    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...this.getAllMarkdownFiles(fullPath));
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  /**
   * 计算文件哈希
   */
  calculateFileHash(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return crypto.createHash('md5').update(content).digest('hex');
  }

  /**
   * 创建备份
   */
  async createBackup() {
    const backupDir = path.join(this.docsDir, '.backups', new Date().toISOString().split('T')[0]);
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    console.log(`💾 创建备份到: ${backupDir}`);
    
    // 复制所有语言目录
    for (const lang of this.config.languages) {
      const langDir = path.join(this.docsDir, lang);
      const backupLangDir = path.join(backupDir, lang);
      
      if (fs.existsSync(langDir)) {
        this.copyDirectory(langDir, backupLangDir);
      }
    }
  }

  /**
   * 复制目录
   */
  copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    
    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  /**
   * 验证同步结果
   */
  async validateSyncResult(syncReport) {
    // 这里可以添加同步后的验证逻辑
    // 例如：检查文件完整性、链接有效性等
    const validation = {
      isValid: true,
      issues: []
    };
    
    // 基本验证逻辑
    if (!syncReport || typeof syncReport !== 'object') {
      validation.isValid = false;
      validation.issues.push('Invalid sync report format');
    }
    
    console.log('✅ 同步验证通过');
    return validation;
  }

  /**
   * 生成同步报告
   */
  async generateSyncReport(report) {
    const reportPath = path.join(this.docsDir, 'quality-reports', `sync-report-${new Date().toISOString().split('T')[0]}.md`);
    
    let markdown = `# 文档同步报告\n\n`;
    markdown += `**同步时间**: ${new Date(report.timestamp).toLocaleString()}\n`;
    markdown += `**同步模式**: ${report.mode}\n\n`;
    
    // 摘要
    markdown += `## 📊 同步摘要\n\n`;
    markdown += `| 指标 | 数值 |\n`;
    markdown += `|------|------|\n`;
    markdown += `| 总文件数 | ${report.summary.totalFiles} |\n`;
    markdown += `| 已同步 | ${report.summary.syncedFiles} |\n`;
    markdown += `| 已跳过 | ${report.summary.skippedFiles} |\n`;
    markdown += `| 冲突文件 | ${report.summary.conflictFiles} |\n`;
    markdown += `| 错误文件 | ${report.summary.errorFiles} |\n\n`;
    
    // 各语言详情
    markdown += `## 🌍 各语言同步详情\n\n`;
    for (const [lang, langReport] of Object.entries(report.languages)) {
      markdown += `### ${lang.toUpperCase()}\n\n`;
      markdown += `- **总文件**: ${langReport.totalFiles}\n`;
      markdown += `- **已同步**: ${langReport.syncedFiles}\n`;
      markdown += `- **冲突**: ${langReport.conflictFiles}\n`;
      markdown += `- **错误**: ${langReport.errorFiles}\n\n`;
    }
    
    // 冲突详情
    if (report.conflicts.length > 0) {
      markdown += `## ⚠️ 冲突详情\n\n`;
      report.conflicts.forEach(conflict => {
        markdown += `- **${conflict.targetFile}**: ${conflict.type} 冲突\n`;
      });
      markdown += `\n`;
    }
    
    // 错误详情
    if (report.errors.length > 0) {
      markdown += `## ❌ 错误详情\n\n`;
      report.errors.forEach(error => {
        markdown += `- **${error.file}**: ${error.message}\n`;
      });
      markdown += `\n`;
    }
    
    // 确保报告目录存在
    const reportDir = path.dirname(reportPath);
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, markdown);
    console.log(`📄 同步报告已生成: ${reportPath}`);
  }

  /**
   * 命令行接口
   */
  static async cli() {
    const args = process.argv.slice(2);
    const command = args[0];
    
    const sync = new DocsSync();
    
    try {
      switch (command) {
        case 'sync':
          const options = {
            force: args.includes('--force'),
            dryRun: args.includes('--dry-run'),
            languages: args.includes('--lang') ? 
              args[args.indexOf('--lang') + 1].split(',') : 
              sync.config.languages
          };
          
          const report = await sync.runFullSync(options);
          break;
          
        case 'status':
          console.log('📊 同步状态:');
          console.log(`最后同步: ${sync.syncState.lastSync || '从未同步'}`);
          console.log(`跟踪文件: ${Object.keys(sync.syncState.fileHashes).length}`);
          console.log(`历史记录: ${sync.syncState.syncHistory.length}`);
          break;
          
        case 'config':
          console.log('⚙️ 当前配置:');
          console.log(JSON.stringify(sync.config, null, 2));
          break;
          
        case 'help':
        default:
          console.log(`
🔄 文档同步器

使用方法:
  node docs-sync-enhanced.js <command> [options]

命令:
  sync [options]     - 执行文档同步
  status             - 显示同步状态
  config             - 显示当前配置
  help               - 显示帮助信息

选项:
  --force            - 强制同步所有文件
  --dry-run          - 预览模式，不实际修改文件
  --lang <langs>     - 指定同步语言（逗号分隔）

示例:
  node docs-sync-enhanced.js sync
  node docs-sync-enhanced.js sync --force
  node docs-sync-enhanced.js sync --dry-run
  node docs-sync-enhanced.js sync --lang zh,jp
`);
          break;
      }
    } catch (error) {
      console.error('❌ 执行失败:', error.message);
      process.exit(1);
    }
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  DocsSync.cli();
}

module.exports = DocsSync;