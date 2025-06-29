const fs = require('fs');
const path = require('path');
const { LANGUAGES } = require('./translate-all-docs');

/**
 * 翻译质量检查配置
 */
const QUALITY_CONFIG = {
  jp: {
    statusPattern: /翻訳ステータス.*?完了/,
    requiredHeaders: ['翻訳ステータス', '原文書', '最終更新', '翻訳バージョン'],
    statusText: '完了'
  },
  kr: {
    statusPattern: /번역 상태.*?완료/,
    requiredHeaders: ['번역 상태', '원본 문서', '최종 업데이트', '번역 버전'],
    statusText: '완료'
  },
  de: {
    statusPattern: /Übersetzungsstatus.*?Abgeschlossen/,
    requiredHeaders: ['Übersetzungsstatus', 'Originaldokument', 'Letzte Aktualisierung', 'Übersetzungsversion'],
    statusText: 'Abgeschlossen'
  },
  es: {
    statusPattern: /Estado de traducción.*?Completado/,
    requiredHeaders: ['Estado de traducción', 'Documento original', 'Última actualización', 'Versión de traducción'],
    statusText: 'Completado'
  },
  fr: {
    statusPattern: /Statut de traduction.*?Terminé/,
    requiredHeaders: ['Statut de traduction', 'Document original', 'Dernière mise à jour', 'Version de traduction'],
    statusText: 'Terminé'
  },
  it: {
    statusPattern: /Stato traduzione.*?Completato/,
    requiredHeaders: ['Stato traduzione', 'Documento originale', 'Ultimo aggiornamento', 'Versione traduzione'],
    statusText: 'Completato'
  },
  ru: {
    statusPattern: /Статус перевода.*?Завершено/,
    requiredHeaders: ['Статус перевода', 'Исходный документ', 'Последнее обновление', 'Версия перевода'],
    statusText: 'Завершено'
  },
  zh: {
    statusPattern: /翻译状态.*?已完成/,
    requiredHeaders: ['翻译状态', '原文档', '最后更新', '翻译版本'],
    statusText: '已完成'
  },
  tw: {
    statusPattern: /翻譯狀態.*?已完成/,
    requiredHeaders: ['翻譯狀態', '原文檔', '最後更新', '翻譯版本'],
    statusText: '已完成'
  }
};

/**
 * 检查单个文档的翻译质量
 */
function checkDocumentQuality(filePath, langCode) {
  const config = QUALITY_CONFIG[langCode];
  if (!config) {
    return {
      valid: false,
      error: `不支持的语言代码: ${langCode}`
    };
  }

  if (!fs.existsSync(filePath)) {
    return {
      valid: false,
      error: '文件不存在'
    };
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const firstFewLines = lines.slice(0, 10).join('\n');

    // 检查翻译状态
    const hasValidStatus = config.statusPattern.test(firstFewLines);
    
    // 检查必需的头部信息
    const missingHeaders = [];
    for (const header of config.requiredHeaders) {
      if (!firstFewLines.includes(header)) {
        missingHeaders.push(header);
      }
    }

    // 检查内容长度（基本质量指标）
    const contentLength = content.length;
    const hasMinimumContent = contentLength > 500; // 至少500字符

    // 检查是否有明显的未翻译英文内容（增强检查）
    const untranslatedIssues = checkUntranslatedContent(content, langCode);
    const hasUntranslatedContent = untranslatedIssues.length > 0;

    const issues = [];
    if (!hasValidStatus) {
      issues.push(`缺少有效的翻译状态标记（应包含"${config.statusText}"）`);
    }
    if (missingHeaders.length > 0) {
      issues.push(`缺少必需的头部信息: ${missingHeaders.join(', ')}`);
    }
    if (!hasMinimumContent) {
      issues.push('内容长度过短，可能翻译不完整');
    }
    if (hasUntranslatedContent) {
      issues.push(`检测到${untranslatedIssues.length}处可能未翻译的英文内容`);
      // 添加具体的未翻译内容到问题列表中（限制数量避免过长）
      const maxIssues = 3;
      const limitedIssues = untranslatedIssues.slice(0, maxIssues);
      issues.push(...limitedIssues);
      if (untranslatedIssues.length > maxIssues) {
        issues.push(`...还有${untranslatedIssues.length - maxIssues}处其他未翻译内容`);
      }
    }

    return {
      valid: issues.length === 0,
      issues: issues,
      stats: {
        contentLength,
        hasValidStatus,
        missingHeaders: missingHeaders.length,
        hasUntranslatedContent
      }
    };

  } catch (error) {
    return {
      valid: false,
      error: `读取文件失败: ${error.message}`
    };
  }
}

/**
 * 检查目录下所有文档的翻译质量
 */
function checkDirectoryQuality(dirPath, langCode) {
  const results = {
    total: 0,
    valid: 0,
    invalid: 0,
    files: [],
    summary: {
      totalContentLength: 0,
      avgContentLength: 0,
      filesWithIssues: 0
    }
  };

  if (!fs.existsSync(dirPath)) {
    console.warn(`目录不存在: ${dirPath}`);
    return results;
  }

  try {
    const files = fs.readdirSync(dirPath, { recursive: true })
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(dirPath, file));

    for (const filePath of files) {
      const relativePath = path.relative(dirPath, filePath);
      const quality = checkDocumentQuality(filePath, langCode);
      
      const fileResult = {
        path: relativePath,
        fullPath: filePath,
        valid: quality.valid,
        issues: quality.issues || [],
        error: quality.error,
        stats: quality.stats
      };

      results.files.push(fileResult);
      results.total++;

      if (quality.valid) {
        results.valid++;
      } else {
        results.invalid++;
        if (quality.issues && quality.issues.length > 0) {
          results.summary.filesWithIssues++;
        }
      }

      // 统计内容长度
      if (quality.stats && quality.stats.contentLength) {
        results.summary.totalContentLength += quality.stats.contentLength;
      }
    }

    // 计算平均内容长度
    if (results.total > 0) {
      results.summary.avgContentLength = Math.round(results.summary.totalContentLength / results.total);
    }

  } catch (error) {
    console.error(`检查目录失败 ${dirPath}:`, error.message);
  }

  return results;
}

/**
 * 检查文档中是否有未翻译的英文内容
 * 根据新翻译规则：技术字段名不应被视为未翻译内容
 * 增强版本：更精确地区分技术术语和需要翻译的普通英文内容
 */
function checkUntranslatedContent(content, langCode) {
  const commonEnglishPhrases = [
    'This protocol freezes intent and enables multi-round confirmation to prevent execution drift and ensure alignment with user expectations.',
    'Multi-stage confirmation with checkpoints and user approval gates.',
    'Standard lifecycle: capture → freeze → review → approve → proceed',
    'Unique identifier for each confirmation instance',
    'Reference to the plan being confirmed',
    'Multi-stage approval workflow with status tracking',
    'Structured mechanism for undoing confirmed changes',
    'Overall confirmation state (pending, confirmed, rejected, rolled_back)',
    'Audit trail for confirmation actions',
    'Unique identifier for the confirmation instance.',
    'Associated plan identifier being confirmed.',
    'User or agent that performed the confirmation.',
    'Timestamp of the confirmation.',
    'Key Components:',
    'Suggested Execution Model'
  ];
  
  // 定义保护模式（按优先级排序，优先保护更具体的内容）
  const protectionPatterns = [
    // 1. 代码块（最高优先级）
    { pattern: /```[\s\S]*?```/g, type: 'code_block' },
    
    // 2. 行内代码
    { pattern: /`[^`]+`/g, type: 'inline_code' },
    
    // 3. URL和文件路径
    { pattern: /https?:\/\/[^\s)]+/g, type: 'url' },
    { pattern: /[a-zA-Z]:[\\\/.][^\s)]+/g, type: 'file_path' },
    { pattern: /\.[a-zA-Z0-9]+(?:\s|$)/g, type: 'file_extension' },
    
    // 4. JSON字符串值和数组值
    { pattern: /"[^"]*"/g, type: 'json_string' },
    { pattern: /\[[^\]]*\]/g, type: 'json_array' },
    
    // 5. JSON Schema字段（$开头的特殊字段）
    { pattern: /\$[a-zA-Z][a-zA-Z0-9_]*\b/g, type: 'schema_field' },
    
    // 6. MPLP相关技术类型（支持中文）
    { pattern: /\bMPLP\.[A-Za-z\u4e00-\u9fff]+\b/g, type: 'mplp_type' },
    
    // 7. 基础字段名（扩展版本）
    { pattern: /\b(confirmId|planId|userId|agentId|timestamp|status|type|id|roleId|workflowId|traceId|contextId|deliveryId|projectName|createdAt|agentStates|memory|executionId|testId|learnId)\b/g, type: 'basic_field' },
    
    // 8. camelCase字段名（更精确的模式）
    { pattern: /\b[a-z]+[A-Z][a-zA-Z]*(?:Id|Type|Status|Config|Data|Info|Ref|State|Mode|Phase|Step|Action|Result|Error|Success|Failure|Pending|Complete|Active|Inactive)?\b/g, type: 'camel_case_field' },
    
    // 9. 技术术语和关键词
    { pattern: /\b(Schema|Type|Interface|Enum|Protocol|Workflow|Context|Trace|Delivery|Role|Plan|Execute|Test|Learn|Confirm)\b/g, type: 'technical_term' },
    
    // 10. JSON Schema相关术语
    { pattern: /\b(properties|required|additionalProperties|items|anyOf|oneOf|allOf|definitions|refs|const|enum|format|pattern|minimum|maximum|minLength|maxLength|minItems|maxItems)\b/g, type: 'schema_keyword' },
    
    // 11. API和协议相关术语
    { pattern: /\b(API|HTTP|JSON|UUID|URI|URL|REST|GraphQL|YAML|XML|CSV|SQL|NoSQL|MongoDB|PostgreSQL|MySQL|Redis)\b/g, type: 'api_term' },
    
    // 12. 编程语言和框架术语
    { pattern: /\b(JavaScript|TypeScript|Python|Java|C#|Go|Rust|Node\.js|React|Vue|Angular|Express|FastAPI|Django|Flask)\b/g, type: 'tech_stack' },
    
    // 13. 版本号和标识符
    { pattern: /\bv?\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?\b/g, type: 'version' },
    { pattern: /\b[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\b/gi, type: 'uuid' },
    
    // 14. 技术文档中的结构化字段（对象定义前的字段名）
    { pattern: /\b(\w+)(?=\s*:\s*\{)/g, type: 'object_field' }
  ];
  
  // 需要翻译的英文模式（更精确的检测）
  const untranslatedPatterns = [
    // 文档结构性标题和关键词
    { pattern: /\b(Purpose|Key Components|Suggested Execution Model|Overview|Description|Parameters|Returns|Example|Usage|Note|Warning|Important|Summary|Introduction|Conclusion|Background|Requirements|Implementation|Configuration|Installation|Deployment|Testing|Debugging|Troubleshooting|FAQ|Glossary|References|Appendix)\b/g, severity: 'high' },
    
    // 描述性短语
    { pattern: /\b(Unique identifier for|Reference to the|Multi-stage|Structured mechanism|Overall|Audit trail|This protocol|The following|As shown in|For example|In this case|Please note|It is important|Make sure|Be careful|Keep in mind)\b/g, severity: 'medium' },
    
    // 动作和状态描述
    { pattern: /\b(enables|prevents|ensures|provides|supports|manages|handles|processes|validates|verifies|executes|implements|configures|initializes|terminates|completes|fails|succeeds|pending|active|inactive|running|stopped|paused|resumed)\b/g, severity: 'low' },
    
    // 完整的英文句子（简单检测）
    { pattern: /\b[A-Z][a-z]+\s+[a-z]+.*?[.!?]\s/g, severity: 'high' }
  ];
  
  const issues = [];
  
  // 检查常见的完整英文短语
  for (const phrase of commonEnglishPhrases) {
    if (content.includes(phrase)) {
      issues.push(`未翻译的完整短语: "${phrase}"`);
    }
  }
  
  // 创建内容副本进行处理
  let processedContent = content;
  const protectedItems = [];
  
  // 按优先级保护技术内容
  protectionPatterns.forEach((protectionRule, ruleIndex) => {
    const matches = [];
    let match;
    
    // 重置正则表达式的lastIndex
    protectionRule.pattern.lastIndex = 0;
    
    while ((match = protectionRule.pattern.exec(processedContent)) !== null) {
      matches.push({
        text: match[0],
        index: match.index,
        type: protectionRule.type
      });
      
      // 防止无限循环
      if (!protectionRule.pattern.global) break;
    }
    
    // 从后往前替换，避免索引偏移
    matches.reverse().forEach((matchItem, matchIndex) => {
      const placeholder = `__PROTECTED_${ruleIndex}_${matchIndex}__`;
      protectedItems.push({
        placeholder,
        original: matchItem.text,
        type: matchItem.type
      });
      
      processedContent = processedContent.substring(0, matchItem.index) + 
                       placeholder + 
                       processedContent.substring(matchItem.index + matchItem.text.length);
    });
  });
  
  // 检查未翻译的英文模式
  for (const untranslatedRule of untranslatedPatterns) {
    const matches = processedContent.match(untranslatedRule.pattern);
    if (matches) {
      // 去重并过滤占位符
      const uniqueMatches = [...new Set(matches)]
        .filter(match => !match.includes('__PROTECTED_'))
        .filter(match => match.trim().length > 1); // 过滤单字符匹配
      
      if (uniqueMatches.length > 0) {
        const severityPrefix = untranslatedRule.severity === 'high' ? '🔴' : 
                              untranslatedRule.severity === 'medium' ? '🟡' : '🟢';
        
        issues.push(...uniqueMatches.map(match => 
          `${severityPrefix} 可能未翻译的英文内容 (${untranslatedRule.severity}): "${match.trim()}"`
        ));
      }
    }
  }
  
  // 额外检查：检测可能的英文句子模式（排除已保护的内容）
  const sentencePattern = /\b[A-Z][a-z]+(?:\s+[a-z]+){2,}[.!?]/g;
  const sentenceMatches = processedContent.match(sentencePattern);
  if (sentenceMatches) {
    const uniqueSentences = [...new Set(sentenceMatches)]
      .filter(sentence => !sentence.includes('__PROTECTED_'))
      .filter(sentence => sentence.length > 10); // 过滤短句
    
    if (uniqueSentences.length > 0) {
      issues.push(...uniqueSentences.map(sentence => 
        `🔴 可能未翻译的英文句子: "${sentence.trim()}"`
      ));
    }
  }
  
  return issues;
}

/**
 * 生成翻译质量报告
 */
function generateQualityReport(langCode, results) {
  const config = QUALITY_CONFIG[langCode];
  const langConfig = LANGUAGES[langCode];
  
  console.log(`\n📊 ${langConfig.name} (${langCode}) 翻译质量报告`);
  console.log('='.repeat(50));
  
  console.log(`📄 文档总数: ${results.total}`);
  console.log(`✅ 质量合格: ${results.valid}`);
  console.log(`❌ 需要改进: ${results.invalid}`);
  console.log(`📈 合格率: ${results.total > 0 ? ((results.valid / results.total) * 100).toFixed(1) : 0}%`);
  console.log(`📝 平均内容长度: ${results.summary.avgContentLength} 字符`);
  
  if (results.invalid > 0) {
    console.log(`\n⚠️  需要改进的文档:`);
    
    for (const file of results.files) {
      if (!file.valid) {
        console.log(`\n📄 ${file.path}:`);
        if (file.error) {
          console.log(`   ❌ 错误: ${file.error}`);
        }
        if (file.issues && file.issues.length > 0) {
          for (const issue of file.issues) {
            console.log(`   ⚠️  ${issue}`);
          }
        }
      }
    }
  }
  
  return {
    langCode,
    language: langConfig.name,
    total: results.total,
    valid: results.valid,
    invalid: results.invalid,
    qualityRate: results.total > 0 ? ((results.valid / results.total) * 100) : 0,
    avgContentLength: results.summary.avgContentLength
  };
}

/**
 * 检查所有语言的翻译质量
 */
function checkAllLanguagesQuality(targetLanguages = null) {
  console.log('🔍 开始翻译质量检查...');
  console.log('='.repeat(60));
  
  const languagesToCheck = targetLanguages || Object.keys(LANGUAGES);
  const reports = [];
  
  for (const langCode of languagesToCheck) {
    if (!LANGUAGES[langCode]) {
      console.warn(`警告: 不支持的语言代码: ${langCode}`);
      continue;
    }
    
    if (!QUALITY_CONFIG[langCode]) {
      console.warn(`警告: 语言 ${langCode} 暂不支持质量检查`);
      continue;
    }
    
    const langDir = LANGUAGES[langCode].dir;
    const results = checkDirectoryQuality(langDir, langCode);
    const report = generateQualityReport(langCode, results);
    reports.push(report);
  }
  
  // 生成总体报告
  console.log('\n' + '='.repeat(60));
  console.log('📋 总体质量报告');
  console.log('='.repeat(60));
  
  let totalDocs = 0;
  let totalValid = 0;
  
  for (const report of reports) {
    console.log(`${report.language} (${report.langCode}): ${report.valid}/${report.total} (${report.qualityRate.toFixed(1)}%)`);
    totalDocs += report.total;
    totalValid += report.valid;
  }
  
  console.log('-'.repeat(60));
  const overallQuality = totalDocs > 0 ? ((totalValid / totalDocs) * 100) : 0;
  console.log(`🎯 总体质量: ${totalValid}/${totalDocs} (${overallQuality.toFixed(1)}%)`);
  console.log(`📅 检查时间: ${new Date().toLocaleString()}`);
  
  return {
    reports,
    summary: {
      totalDocuments: totalDocs,
      totalValid: totalValid,
      overallQuality: overallQuality,
      languagesChecked: reports.length
    }
  };
}

/**
 * 检查特定文件的翻译质量
 */
function checkFileQuality(filePath, langCode) {
  console.log(`🔍 检查文件: ${filePath}`);
  
  if (!QUALITY_CONFIG[langCode]) {
    console.error(`错误: 不支持的语言代码: ${langCode}`);
    return false;
  }
  
  const result = checkDocumentQuality(filePath, langCode);
  
  console.log(`\n📊 文件质量报告: ${path.basename(filePath)}`);
  console.log('-'.repeat(40));
  
  if (result.valid) {
    console.log('✅ 翻译质量: 合格');
  } else {
    console.log('❌ 翻译质量: 需要改进');
    
    if (result.error) {
      console.log(`错误: ${result.error}`);
    }
    
    if (result.issues && result.issues.length > 0) {
      console.log('\n问题列表:');
      for (const issue of result.issues) {
        console.log(`  ⚠️  ${issue}`);
      }
    }
  }
  
  if (result.stats) {
    console.log(`\n📈 统计信息:`);
    console.log(`  内容长度: ${result.stats.contentLength} 字符`);
    console.log(`  翻译状态: ${result.stats.hasValidStatus ? '✅' : '❌'}`);
    console.log(`  缺少头部: ${result.stats.missingHeaders}`);
    console.log(`  未翻译内容: ${result.stats.hasUntranslatedContent ? '⚠️' : '✅'}`);
  }
  
  return result.valid;
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  
  // 解析命令行参数
  const options = {
    languages: [],
    file: null,
    help: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--file' || arg === '-f') {
      options.file = args[++i];
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (LANGUAGES[arg] && QUALITY_CONFIG[arg]) {
      options.languages.push(arg);
    } else if (LANGUAGES[arg]) {
      console.warn(`警告: 语言 ${arg} 暂不支持质量检查`);
    } else {
      console.warn(`警告: 未知参数或不支持的语言代码: ${arg}`);
    }
  }
  
  if (options.help) {
    console.log(`
使用方法: node translation-quality-check.js [选项] [语言代码...]

选项:
  --file, -f <文件路径>  检查特定文件的翻译质量
  --help, -h             显示帮助信息

支持的语言代码: ${Object.keys(QUALITY_CONFIG).join(', ')}

示例:
  node translation-quality-check.js                    # 检查所有语言的翻译质量
  node translation-quality-check.js jp kr              # 只检查日语和韩语的翻译质量
  node translation-quality-check.js --file docs/jp/Role.md jp  # 检查特定日语文件
`);
    return;
  }
  
  // 检查特定文件
  if (options.file) {
    if (options.languages.length === 0) {
      console.error('错误: 检查文件时必须指定语言代码');
      return;
    }
    
    const langCode = options.languages[0];
    checkFileQuality(options.file, langCode);
    return;
  }
  
  // 检查所有或指定语言的翻译质量
  const targetLanguages = options.languages.length > 0 ? options.languages : null;
  
  if (targetLanguages) {
    console.log(`检查指定语言: ${targetLanguages.join(', ')}`);
  } else {
    console.log('检查所有支持的语言');
  }
  
  checkAllLanguagesQuality(targetLanguages);
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  checkDocumentQuality,
  checkDirectoryQuality,
  checkAllLanguagesQuality,
  checkFileQuality,
  generateQualityReport,
  QUALITY_CONFIG
};