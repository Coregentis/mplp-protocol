const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

/**
 * 文档版本控制管理器
 * 负责文档版本跟踪、变更检测、同步状态管理
 */
class DocsVersionManager {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.docsDir = path.join(this.projectRoot, 'docs');
    this.versionFile = path.join(this.docsDir, '.docs-version.json');
    this.metadataFile = path.join(this.docsDir, '.docs-metadata.json');
    this.languages = {
      'en': 'English',
      'zh': '中文',
      'tw': '繁體中文',
      'jp': '日本語',
      'kr': '한국어',
      'es': 'Español',
      'fr': 'Français',
      'de': 'Deutsch',
      'it': 'Italiano',
      'ru': 'Русский'
    };
  }

  /**
   * 初始化文档版本控制
   */
  async initialize() {
    console.log('🚀 初始化文档版本控制系统...');
    
    // 确保必要目录存在
    if (!fs.existsSync(this.docsDir)) {
      fs.mkdirSync(this.docsDir, { recursive: true });
    }

    // 初始化版本文件
    if (!fs.existsSync(this.versionFile)) {
      const initialVersion = {
        version: '1.0.0',
        lastUpdate: new Date().toISOString(),
        languages: {},
        schemas: {},
        baselineHash: await this.calculateBaselineHash()
      };
      
      fs.writeFileSync(this.versionFile, JSON.stringify(initialVersion, null, 2));
      console.log('✅ 创建文档版本文件');
    }

    // 初始化元数据文件
    if (!fs.existsSync(this.metadataFile)) {
      const initialMetadata = {
        structure: await this.analyzeDocStructure(),
        dependencies: await this.analyzeDependencies(),
        quality: await this.analyzeQuality(),
        lastScan: new Date().toISOString()
      };
      
      fs.writeFileSync(this.metadataFile, JSON.stringify(initialMetadata, null, 2));
      console.log('✅ 创建文档元数据文件');
    }

    console.log('🎉 文档版本控制系统初始化完成');
  }

  /**
   * 计算文档基线哈希
   */
  async calculateBaselineHash() {
    const enDocsDir = path.join(this.docsDir, 'en');
    if (!fs.existsSync(enDocsDir)) {
      return null;
    }

    const files = this.getAllMarkdownFiles(enDocsDir);
    const contentHash = crypto.createHash('sha256');
    
    files.sort().forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      contentHash.update(content);
    });

    return contentHash.digest('hex');
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
   * 检测文档变更
   */
  async detectChanges() {
    console.log('🔍 检测文档变更...');
    
    const currentVersion = this.loadVersion();
    const currentHash = await this.calculateBaselineHash();
    
    const changes = {
      hasChanges: currentHash !== currentVersion.baselineHash,
      newFiles: [],
      modifiedFiles: [],
      deletedFiles: [],
      languageStatus: {}
    };

    if (changes.hasChanges) {
      // 详细分析变更
      changes.details = await this.analyzeDetailedChanges();
      
      // 检查各语言同步状态
      for (const [langCode, langName] of Object.entries(this.languages)) {
        if (langCode === 'en') continue;
        
        changes.languageStatus[langCode] = await this.checkLanguageSyncStatus(langCode);
      }
    }

    return changes;
  }

  /**
   * 分析详细变更
   */
  async analyzeDetailedChanges() {
    try {
      // 使用Git检测变更（如果可用）
      const gitStatus = execSync('git status --porcelain docs/', { 
        encoding: 'utf8',
        cwd: this.projectRoot 
      }).trim();
      
      const changes = {
        modified: [],
        added: [],
        deleted: []
      };
      
      gitStatus.split('\n').forEach(line => {
        if (!line) return;
        
        const status = line.substring(0, 2);
        const file = line.substring(3);
        
        if (status.includes('M')) {
          changes.modified.push(file);
        } else if (status.includes('A') || status.includes('??')) {
          changes.added.push(file);
        } else if (status.includes('D')) {
          changes.deleted.push(file);
        }
      });
      
      return changes;
    } catch (error) {
      // 如果Git不可用，使用文件系统比较
      return await this.compareWithBaseline();
    }
  }

  /**
   * 检查语言同步状态
   */
  async checkLanguageSyncStatus(langCode) {
    const enDir = path.join(this.docsDir, 'en');
    const langDir = path.join(this.docsDir, langCode);
    
    if (!fs.existsSync(enDir) || !fs.existsSync(langDir)) {
      return {
        status: 'missing',
        coverage: 0,
        outdated: [],
        missing: []
      };
    }

    const enFiles = this.getAllMarkdownFiles(enDir);
    const langFiles = this.getAllMarkdownFiles(langDir);
    
    const enRelativePaths = enFiles.map(f => path.relative(enDir, f));
    const langRelativePaths = langFiles.map(f => path.relative(langDir, f));
    
    const missing = enRelativePaths.filter(f => !langRelativePaths.includes(f));
    const outdated = [];
    
    // 检查过时文件
    for (const relPath of langRelativePaths) {
      const enFile = path.join(enDir, relPath);
      const langFile = path.join(langDir, relPath);
      
      if (fs.existsSync(enFile) && fs.existsSync(langFile)) {
        const enStat = fs.statSync(enFile);
        const langStat = fs.statSync(langFile);
        
        if (enStat.mtime > langStat.mtime) {
          outdated.push(relPath);
        }
      }
    }
    
    const coverage = ((enRelativePaths.length - missing.length) / enRelativePaths.length) * 100;
    
    return {
      status: missing.length === 0 && outdated.length === 0 ? 'synced' : 'outdated',
      coverage: Math.round(coverage),
      outdated,
      missing
    };
  }

  /**
   * 更新文档版本
   */
  async updateVersion(newVersion) {
    console.log(`📝 更新文档版本到 ${newVersion}...`);
    
    const currentVersion = this.loadVersion();
    const newHash = await this.calculateBaselineHash();
    
    const updatedVersion = {
      ...currentVersion,
      version: newVersion,
      lastUpdate: new Date().toISOString(),
      baselineHash: newHash,
      previousVersion: currentVersion.version
    };
    
    // 更新语言状态
    for (const [langCode] of Object.entries(this.languages)) {
      if (langCode === 'en') continue;
      
      updatedVersion.languages[langCode] = await this.checkLanguageSyncStatus(langCode);
    }
    
    fs.writeFileSync(this.versionFile, JSON.stringify(updatedVersion, null, 2));
    console.log('✅ 文档版本已更新');
    
    return {
      success: true,
      version: updatedVersion
    };
  }

  /**
   * 分析文档结构
   */
  async analyzeDocStructure() {
    const structure = {
      languages: {},
      totalFiles: 0,
      schemaFiles: 0,
      protocolFiles: 0
    };
    
    for (const [langCode, langName] of Object.entries(this.languages)) {
      const langDir = path.join(this.docsDir, langCode);
      
      if (fs.existsSync(langDir)) {
        const files = this.getAllMarkdownFiles(langDir);
        const schemaFiles = files.filter(f => f.includes('/schemas/'));
        
        structure.languages[langCode] = {
          name: langName,
          totalFiles: files.length,
          schemaFiles: schemaFiles.length,
          protocolFiles: files.length - schemaFiles.length,
          lastModified: this.getLastModifiedTime(langDir)
        };
        
        if (langCode === 'en') {
          structure.totalFiles = files.length;
          structure.schemaFiles = schemaFiles.length;
          structure.protocolFiles = files.length - schemaFiles.length;
        }
      }
    }
    
    return structure;
  }

  /**
   * 分析文档依赖关系
   */
  async analyzeDependencies() {
    const dependencies = {
      schemaToDoc: {},
      docToSchema: {},
      crossReferences: {},
      brokenLinks: []
    };
    
    // 分析schema文件与文档的对应关系
    const schemasDir = path.join(this.projectRoot, 'schemas');
    if (fs.existsSync(schemasDir)) {
      const schemaFiles = fs.readdirSync(schemasDir)
        .filter(f => f.endsWith('.schema.json'));
      
      for (const schemaFile of schemaFiles) {
        const baseName = path.basename(schemaFile, '.schema.json');
        const docPath = path.join(this.docsDir, 'schemas', `${baseName}.md`);
        
        dependencies.schemaToDoc[schemaFile] = {
          hasDoc: fs.existsSync(docPath),
          docPath: docPath,
          languages: {}
        };
        
        // 检查各语言版本
        for (const langCode of Object.keys(this.languages)) {
          const langDocPath = path.join(this.docsDir, langCode, 'schemas', `${baseName}.md`);
          dependencies.schemaToDoc[schemaFile].languages[langCode] = fs.existsSync(langDocPath);
        }
      }
    }
    
    return dependencies;
  }

  /**
   * 分析文档质量
   */
  async analyzeQuality() {
    const quality = {
      overall: 0,
      languages: {},
      issues: [],
      metrics: {
        completeness: 0,
        consistency: 0,
        freshness: 0
      }
    };
    
    for (const [langCode, langName] of Object.entries(this.languages)) {
      const langDir = path.join(this.docsDir, langCode);
      
      if (fs.existsSync(langDir)) {
        quality.languages[langCode] = await this.analyzeLanguageQuality(langCode);
      }
    }
    
    // 计算整体质量分数
    const langScores = Object.values(quality.languages).map(l => l.score);
    quality.overall = langScores.length > 0 ? 
      Math.round(langScores.reduce((a, b) => a + b, 0) / langScores.length) : 0;
    
    return quality;
  }

  /**
   * 分析单个语言的文档质量
   */
  async analyzeLanguageQuality(langCode) {
    const langDir = path.join(this.docsDir, langCode);
    const files = this.getAllMarkdownFiles(langDir);
    
    let totalScore = 0;
    const issues = [];
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      const fileScore = this.calculateFileQuality(content, file, langCode);
      
      totalScore += fileScore.score;
      issues.push(...fileScore.issues);
    }
    
    const avgScore = files.length > 0 ? Math.round(totalScore / files.length) : 0;
    
    return {
      score: avgScore,
      fileCount: files.length,
      issues: issues,
      lastAnalyzed: new Date().toISOString()
    };
  }

  /**
   * 计算单个文件质量分数
   */
  calculateFileQuality(content, filePath, langCode) {
    const issues = [];
    let score = 100;
    
    // 检查文件长度
    if (content.length < 500) {
      issues.push({ type: 'length', message: '文档内容过短', severity: 'warning' });
      score -= 10;
    }
    
    // 检查标题结构
    const headers = content.match(/^#+\s+.+$/gm) || [];
    if (headers.length === 0) {
      issues.push({ type: 'structure', message: '缺少标题结构', severity: 'error' });
      score -= 20;
    }
    
    // 检查翻译状态（非英文文档）
    if (langCode !== 'en') {
      if (content.includes('Pending Translation') || content.includes('待翻译')) {
        issues.push({ type: 'translation', message: '文档未翻译', severity: 'warning' });
        score -= 30;
      }
    }
    
    // 检查链接
    const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
    for (const link of links) {
      const match = link.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match && match[2].startsWith('./') || match[2].startsWith('../')) {
        const linkPath = path.resolve(path.dirname(filePath), match[2]);
        if (!fs.existsSync(linkPath)) {
          issues.push({ 
            type: 'link', 
            message: `断开的链接: ${match[2]}`, 
            severity: 'error' 
          });
          score -= 5;
        }
      }
    }
    
    return {
      score: Math.max(0, score),
      issues: issues.map(issue => ({ ...issue, file: path.relative(this.docsDir, filePath) }))
    };
  }

  /**
   * 获取最后修改时间
   */
  getLastModifiedTime(dir) {
    const files = this.getAllMarkdownFiles(dir);
    let lastModified = 0;
    
    for (const file of files) {
      const stat = fs.statSync(file);
      if (stat.mtime.getTime() > lastModified) {
        lastModified = stat.mtime.getTime();
      }
    }
    
    return lastModified > 0 ? new Date(lastModified).toISOString() : null;
  }

  /**
   * 加载版本信息
   */
  loadVersion() {
    if (!fs.existsSync(this.versionFile)) {
      return {
        version: '1.0.0',
        lastUpdate: new Date().toISOString(),
        languages: {},
        schemas: {},
        baselineHash: null
      };
    }
    
    return JSON.parse(fs.readFileSync(this.versionFile, 'utf8'));
  }

  /**
   * 加载元数据
   */
  loadMetadata() {
    if (!fs.existsSync(this.metadataFile)) {
      return {
        structure: {},
        dependencies: {},
        quality: {},
        lastScan: new Date().toISOString()
      };
    }
    
    return JSON.parse(fs.readFileSync(this.metadataFile, 'utf8'));
  }

  /**
   * 生成文档状态报告
   */
  async generateStatusReport() {
    console.log('📊 生成文档状态报告...');
    
    const version = this.loadVersion();
    const metadata = this.loadMetadata();
    const changes = await this.detectChanges();
    
    const report = {
      timestamp: new Date().toISOString(),
      version: version.version,
      summary: {
        totalLanguages: Object.keys(this.languages).length,
        syncedLanguages: 0,
        outdatedLanguages: 0,
        missingLanguages: 0,
        overallQuality: metadata.quality.overall || 0
      },
      languages: {},
      changes: changes,
      recommendations: []
    };
    
    // 分析各语言状态
    for (const [langCode, langName] of Object.entries(this.languages)) {
      const langStatus = changes.languageStatus[langCode] || 
        await this.checkLanguageSyncStatus(langCode);
      
      report.languages[langCode] = {
        name: langName,
        status: langStatus.status,
        coverage: langStatus.coverage,
        outdatedFiles: langStatus.outdated?.length || 0,
        missingFiles: langStatus.missing?.length || 0
      };
      
      // 统计摘要
      if (langCode !== 'en') {
        if (langStatus.status === 'synced') {
          report.summary.syncedLanguages++;
        } else if (langStatus.status === 'outdated') {
          report.summary.outdatedLanguages++;
        } else {
          report.summary.missingLanguages++;
        }
      }
    }
    
    // 生成建议
    if (report.summary.outdatedLanguages > 0) {
      report.recommendations.push('运行翻译同步以更新过时的语言版本');
    }
    
    if (report.summary.missingLanguages > 0) {
      report.recommendations.push('为缺失的语言创建文档结构');
    }
    
    if (changes.hasChanges) {
      report.recommendations.push('检测到文档变更，建议更新版本号');
    }
    
    // 保存报告
    const reportPath = path.join(this.docsDir, 'status-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('✅ 文档状态报告已生成:', reportPath);
    return report;
  }

  /**
   * 与基线比较（文件系统方式）
   */
  async compareWithBaseline() {
    const changes = {
      hasChanges: false,
      details: {
        added: [],
        modified: [],
        deleted: []
      }
    };
    
    try {
      const currentVersion = this.loadVersion();
      const currentHash = await this.calculateBaselineHash();
      
      if (currentVersion.baselineHash !== currentHash) {
        changes.hasChanges = true;
        // 简单的变更检测 - 在实际应用中可以更详细
        changes.details.modified = ['docs structure changed'];
      }
    } catch (error) {
      console.warn('⚠️ 基线比较失败:', error.message);
    }
    
    return changes;
  }

  /**
   * CLI 接口
   */
  static async cli() {
    const args = process.argv.slice(2);
    const command = args[0];
    
    const manager = new DocsVersionManager();
    
    try {
      switch (command) {
        case 'init':
          await manager.initialize();
          break;
          
        case 'status':
          const report = await manager.generateStatusReport();
          console.log('\n📋 文档状态摘要:');
          console.log(`版本: ${report.version}`);
          console.log(`同步语言: ${report.summary.syncedLanguages}/${report.summary.totalLanguages - 1}`);
          console.log(`整体质量: ${report.summary.overallQuality}%`);
          if (report.recommendations.length > 0) {
            console.log('\n💡 建议:');
            report.recommendations.forEach(rec => console.log(`  - ${rec}`));
          }
          break;
          
        case 'detect':
          const changes = await manager.detectChanges();
          console.log('\n🔍 变更检测结果:');
          console.log(`有变更: ${changes.hasChanges ? '是' : '否'}`);
          if (changes.hasChanges && changes.details) {
            console.log(`新增文件: ${changes.details.added?.length || 0}`);
            console.log(`修改文件: ${changes.details.modified?.length || 0}`);
            console.log(`删除文件: ${changes.details.deleted?.length || 0}`);
          }
          break;
          
        case 'update':
          const newVersion = args[1];
          if (!newVersion) {
            console.error('❌ 请提供新版本号');
            process.exit(1);
          }
          await manager.updateVersion(newVersion);
          break;
          
        case 'help':
        default:
          console.log(`
📚 文档版本管理器

使用方法:
  node docs-version-manager.js <command> [options]

命令:
  init     - 初始化文档版本控制
  status   - 显示文档状态报告
  detect   - 检测文档变更
  update   - 更新文档版本
  help     - 显示帮助信息

示例:
  node docs-version-manager.js init
  node docs-version-manager.js status
  node docs-version-manager.js update 1.1.0
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
  DocsVersionManager.cli();
}

module.exports = DocsVersionManager;