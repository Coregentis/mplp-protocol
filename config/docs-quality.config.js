/**
 * 文档质量检查配置
 * 定义文档质量标准、检查规则和阈值
 */

module.exports = {
  // 质量阈值配置
  thresholds: {
    // 内容长度限制
    minContentLength: 300,        // 最小内容长度（字符）
    maxContentLength: 100000,     // 最大内容长度（字符）
    
    // 结构要求
    minHeaderCount: 2,            // 最少标题数量
    maxHeaderDepth: 5,            // 最大标题层级
    maxConsecutiveEmptyLines: 3,  // 最大连续空行数
    
    // 链接检查
    linkCheckTimeout: 10000,      // 链接检查超时时间（毫秒）
    maxBrokenLinksPerFile: 3,     // 每个文件最大断链数
    
    // 翻译质量
    minTranslationCompleteness: 70, // 最小翻译完整度（百分比）
    maxUntranslatedSections: 5,     // 最大未翻译段落数
  },
  
  // 检查规则配置
  rules: {
    // 文档结构规则
    structure: {
      requireTitle: true,           // 要求主标题（H1）
      requireHeaders: true,         // 要求子标题
      requireToc: false,            // 要求目录（可选）
      maxNestingLevel: 4,           // 最大嵌套层级
      enforceHeaderSequence: true,  // 强制标题序列（H1->H2->H3）
      requireIntroduction: false,   // 要求介绍段落
      requireConclusion: false,     // 要求结论段落
    },
    
    // 内容质量规则
    content: {
      minLength: true,              // 检查最小长度
      maxLength: true,              // 检查最大长度
      requireExamples: false,       // 要求示例代码
      checkSpelling: false,         // 拼写检查（需要外部工具）
      checkGrammar: false,          // 语法检查（需要外部工具）
      requireCodeBlocks: false,     // 要求代码块
      checkCodeSyntax: true,        // 检查代码语法
      preventDuplicateContent: true, // 防止重复内容
    },
    
    // 链接验证规则
    links: {
      checkInternal: true,          // 检查内部链接
      checkExternal: false,         // 检查外部链接（可能较慢）
      checkAnchors: true,           // 检查锚点链接
      allowedDomains: [             // 允许的外部域名
        'github.com',
        'docs.github.com',
        'nodejs.org',
        'npmjs.com',
        'developer.mozilla.org'
      ],
      blockedDomains: [             // 禁止的域名
        'localhost',
        '127.0.0.1'
      ],
      requireHttps: false,          // 要求HTTPS链接
    },
    
    // 翻译质量规则
    translation: {
      checkStatus: true,            // 检查翻译状态
      requireMetadata: true,        // 要求翻译元数据
      checkConsistency: true,       // 检查一致性
      validateTerminology: false,   // 验证术语一致性
      checkDateFormat: true,        // 检查日期格式
      requireSourceReference: true, // 要求源文档引用
    },
    
    // 格式规范
    formatting: {
      enforceMarkdownLint: true,    // 强制Markdown规范
      checkLineLength: false,       // 检查行长度
      maxLineLength: 120,           // 最大行长度
      requireFinalNewline: true,    // 要求文件末尾换行
      preventTrailingSpaces: true,  // 防止行尾空格
      enforceListStyle: true,       // 强制列表样式一致
      enforceCodeBlockStyle: true,  // 强制代码块样式
    }
  },
  
  // 语言特定配置
  languages: {
    'en': {
      name: 'English',
      encoding: 'utf8',
      direction: 'ltr',
      statusKeywords: ['Status', 'Complete', 'Pending', 'In Progress'],
      requiredHeaders: ['Status', 'Source Document', 'Last Updated'],
      dateFormat: 'YYYY-MM-DD',
      terminology: {
        // 英文术语标准
        'API': 'API',
        'JSON': 'JSON',
        'HTTP': 'HTTP',
        'URL': 'URL'
      }
    },
    
    'zh': {
      name: '简体中文',
      encoding: 'utf8',
      direction: 'ltr',
      statusKeywords: ['翻译状态', '已完成', '待翻译', '翻译中'],
      requiredHeaders: ['翻译状态', '原文档', '最后更新'],
      dateFormat: 'YYYY年MM月DD日',
      terminology: {
        // 中文术语标准
        'API': 'API',
        'JSON': 'JSON',
        'HTTP': 'HTTP',
        'URL': 'URL',
        'Schema': '模式',
        'Protocol': '协议'
      }
    },
    
    'tw': {
      name: '繁體中文',
      encoding: 'utf8',
      direction: 'ltr',
      statusKeywords: ['翻譯狀態', '已完成', '待翻譯', '翻譯中'],
      requiredHeaders: ['翻譯狀態', '原文檔', '最後更新'],
      dateFormat: 'YYYY年MM月DD日',
      terminology: {
        'API': 'API',
        'JSON': 'JSON',
        'HTTP': 'HTTP',
        'URL': 'URL',
        'Schema': '模式',
        'Protocol': '協議'
      }
    },
    
    'jp': {
      name: '日本語',
      encoding: 'utf8',
      direction: 'ltr',
      statusKeywords: ['翻訳ステータス', '完了', '翻訳準備中', '翻訳中'],
      requiredHeaders: ['翻訳ステータス', '原文書', '最終更新'],
      dateFormat: 'YYYY年MM月DD日',
      terminology: {
        'API': 'API',
        'JSON': 'JSON',
        'HTTP': 'HTTP',
        'URL': 'URL',
        'Schema': 'スキーマ',
        'Protocol': 'プロトコル'
      }
    },
    
    'kr': {
      name: '한국어',
      encoding: 'utf8',
      direction: 'ltr',
      statusKeywords: ['번역 상태', '완료', '번역 대기 중', '번역 중'],
      requiredHeaders: ['번역 상태', '원본 문서', '최종 업데이트'],
      dateFormat: 'YYYY년 MM월 DD일',
      terminology: {
        'API': 'API',
        'JSON': 'JSON',
        'HTTP': 'HTTP',
        'URL': 'URL',
        'Schema': '스키마',
        'Protocol': '프로토콜'
      }
    },
    
    'de': {
      name: 'Deutsch',
      encoding: 'utf8',
      direction: 'ltr',
      statusKeywords: ['Übersetzungsstatus', 'Abgeschlossen', 'Ausstehend', 'In Bearbeitung'],
      requiredHeaders: ['Übersetzungsstatus', 'Quelldokument', 'Zuletzt aktualisiert'],
      dateFormat: 'DD.MM.YYYY',
      terminology: {
        'API': 'API',
        'JSON': 'JSON',
        'HTTP': 'HTTP',
        'URL': 'URL',
        'Schema': 'Schema',
        'Protocol': 'Protokoll'
      }
    },
    
    'es': {
      name: 'Español',
      encoding: 'utf8',
      direction: 'ltr',
      statusKeywords: ['Estado de traducción', 'Completado', 'Pendiente', 'En progreso'],
      requiredHeaders: ['Estado de traducción', 'Documento fuente', 'Última actualización'],
      dateFormat: 'DD/MM/YYYY',
      terminology: {
        'API': 'API',
        'JSON': 'JSON',
        'HTTP': 'HTTP',
        'URL': 'URL',
        'Schema': 'Esquema',
        'Protocol': 'Protocolo'
      }
    },
    
    'fr': {
      name: 'Français',
      encoding: 'utf8',
      direction: 'ltr',
      statusKeywords: ['Statut de traduction', 'Terminé', 'En attente', 'En cours'],
      requiredHeaders: ['Statut de traduction', 'Document source', 'Dernière mise à jour'],
      dateFormat: 'DD/MM/YYYY',
      terminology: {
        'API': 'API',
        'JSON': 'JSON',
        'HTTP': 'HTTP',
        'URL': 'URL',
        'Schema': 'Schéma',
        'Protocol': 'Protocole'
      }
    },
    
    'it': {
      name: 'Italiano',
      encoding: 'utf8',
      direction: 'ltr',
      statusKeywords: ['Stato traduzione', 'Completato', 'In attesa', 'In corso'],
      requiredHeaders: ['Stato traduzione', 'Documento sorgente', 'Ultimo aggiornamento'],
      dateFormat: 'DD/MM/YYYY',
      terminology: {
        'API': 'API',
        'JSON': 'JSON',
        'HTTP': 'HTTP',
        'URL': 'URL',
        'Schema': 'Schema',
        'Protocol': 'Protocollo'
      }
    },
    
    'ru': {
      name: 'Русский',
      encoding: 'utf8',
      direction: 'ltr',
      statusKeywords: ['Статус перевода', 'Завершено', 'Ожидает', 'В процессе'],
      requiredHeaders: ['Статус перевода', 'Исходный документ', 'Последнее обновление'],
      dateFormat: 'DD.MM.YYYY',
      terminology: {
        'API': 'API',
        'JSON': 'JSON',
        'HTTP': 'HTTP',
        'URL': 'URL',
        'Schema': 'Схема',
        'Protocol': 'Протокол'
      }
    }
  },
  
  // 文件类型特定配置
  fileTypes: {
    'README.md': {
      rules: {
        structure: {
          requireTitle: true,
          requireHeaders: true,
          minHeaderCount: 3
        },
        content: {
          minLength: 500,
          requireExamples: true
        }
      }
    },
    
    'CHANGELOG.md': {
      rules: {
        structure: {
          requireTitle: true,
          enforceHeaderSequence: true
        },
        content: {
          minLength: 200
        },
        formatting: {
          enforceListStyle: true
        }
      }
    },
    
    'schemas/*.md': {
      rules: {
        structure: {
          requireTitle: true,
          requireHeaders: true
        },
        content: {
          requireCodeBlocks: true,
          checkCodeSyntax: true
        },
        links: {
          checkInternal: true,
          checkAnchors: true
        }
      }
    }
  },
  
  // 报告配置
  reporting: {
    // 输出格式
    formats: ['json', 'markdown', 'html'],
    
    // 报告详细程度
    verbosity: 'normal', // 'minimal', 'normal', 'detailed', 'verbose'
    
    // 包含的信息
    include: {
      summary: true,
      fileDetails: true,
      issueDetails: true,
      recommendations: true,
      metrics: true,
      trends: false
    },
    
    // 排序和分组
    sorting: {
      files: 'alphabetical', // 'alphabetical', 'score', 'issues'
      issues: 'severity'      // 'severity', 'type', 'file'
    },
    
    // 过滤器
    filters: {
      minSeverity: 'info',    // 'error', 'warning', 'info'
      excludeTypes: [],       // 排除的问题类型
      includeOnlyTypes: []    // 仅包含的问题类型
    }
  },
  
  // 集成配置
  integrations: {
    // Git集成
    git: {
      enabled: true,
      checkOnCommit: true,
      blockOnErrors: false,
      generateCommitMessage: false
    },
    
    // CI/CD集成
    ci: {
      enabled: true,
      failOnErrors: true,
      failOnWarnings: false,
      generateArtifacts: true
    },
    
    // 外部工具集成
    tools: {
      markdownlint: {
        enabled: true,
        configFile: 'config/lint/.markdownlint.json'
      },
      
      textlint: {
        enabled: false,
        configFile: '.textlintrc'
      },
      
      vale: {
        enabled: false,
        configFile: '.vale.ini'
      }
    }
  },
  
  // 缓存配置
  cache: {
    enabled: true,
    ttl: 3600000,           // 缓存生存时间（毫秒）
    directory: '.docs-cache',
    invalidateOnChange: true
  },
  
  // 性能配置
  performance: {
    maxConcurrentFiles: 10,  // 最大并发处理文件数
    timeoutPerFile: 30000,   // 每个文件处理超时时间
    enableProgressBar: true, // 启用进度条
    enableProfiling: false   // 启用性能分析
  }
};