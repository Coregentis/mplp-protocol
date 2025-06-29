/**
 * Documentation Version Control Configuration
 * 
 * This configuration file defines settings for documentation version management,
 * including baseline tracking, change detection, and synchronization rules.
 */

module.exports = {
  // Version control settings
  version: {
    // Current documentation version
    current: '1.0.0',
    
    // Version format (semantic versioning)
    format: 'semantic', // 'semantic' | 'timestamp' | 'incremental'
    
    // Auto-increment rules
    autoIncrement: {
      enabled: true,
      rules: {
        // Major version changes
        major: [
          'schema structure changes',
          'breaking API changes',
          'protocol version updates'
        ],
        // Minor version changes
        minor: [
          'new documentation sections',
          'new language support',
          'feature additions'
        ],
        // Patch version changes
        patch: [
          'content updates',
          'typo fixes',
          'formatting improvements',
          'translation updates'
        ]
      }
    }
  },

  // Baseline tracking configuration
  baseline: {
    // Directory to store baseline hashes
    directory: '.docs-baseline',
    
    // Files to track for changes
    trackFiles: [
      'docs/**/*.md',
      'schemas/**/*.json',
      'dev/protocols/**/*.md',
      'examples/**/*.json'
    ],
    
    // Files to exclude from tracking
    excludeFiles: [
      'docs/**/README.md',
      'docs/**/*-report-*.md',
      'docs/**/CHANGELOG.md',
      '.docs-baseline/**/*'
    ],
    
    // Hash algorithm for change detection
    hashAlgorithm: 'sha256',
    
    // Include file metadata in hash calculation
    includeMetadata: false
  },

  // Change detection settings
  changeDetection: {
    // Sensitivity level for change detection
    sensitivity: 'medium', // 'low' | 'medium' | 'high'
    
    // Minimum change threshold (percentage)
    threshold: {
      content: 5,    // 5% content change
      structure: 10, // 10% structure change
      metadata: 20   // 20% metadata change
    },
    
    // Change categories
    categories: {
      content: {
        weight: 1.0,
        patterns: [
          /^[\s\S]*$/  // Any content change
        ]
      },
      structure: {
        weight: 1.5,
        patterns: [
          /^#{1,6}\s/,     // Heading changes
          /^\s*[-*+]\s/,   // List structure
          /^\s*\d+\.\s/,   // Numbered lists
          /^\|.*\|$/       // Table structure
        ]
      },
      metadata: {
        weight: 0.8,
        patterns: [
          /^---[\s\S]*?---/, // YAML frontmatter
          /<!--[\s\S]*?-->/ // HTML comments
        ]
      }
    }
  },

  // Multi-language synchronization
  synchronization: {
    // Supported languages
    languages: ['en', 'zh', 'tw', 'jp', 'kr', 'de', 'es', 'fr', 'it', 'ru'],
    
    // Primary language (source of truth)
    primaryLanguage: 'en',
    
    // Sync rules
    rules: {
      // Auto-sync on primary language changes
      autoSync: true,
      
      // Sync delay (minutes)
      syncDelay: 5,
      
      // Conflict resolution strategy
      conflictResolution: 'primary-wins', // 'primary-wins' | 'manual' | 'merge'
      
      // Files that require manual sync
      manualSyncFiles: [
        'docs/*/README.md',
        'docs/*/CHANGELOG.md'
      ]
    },
    
    // Translation status tracking
    translationStatus: {
      // Track translation completeness
      trackCompleteness: true,
      
      // Minimum translation percentage
      minimumCompleteness: 80,
      
      // Translation quality thresholds
      qualityThresholds: {
        excellent: 95,
        good: 85,
        acceptable: 70,
        poor: 50
      }
    }
  },

  // Dependency tracking
  dependencies: {
    // Track schema-documentation dependencies
    trackSchemaDeps: true,
    
    // Track cross-references
    trackCrossRefs: true,
    
    // Dependency validation rules
    validation: {
      // Ensure schema docs exist for all schemas
      requireSchemaDoc: true,
      
      // Ensure examples exist for all schemas
      requireExamples: true,
      
      // Validate internal links
      validateLinks: true,
      
      // Check for orphaned files
      checkOrphans: true
    }
  },

  // Quality metrics
  quality: {
    // Content quality metrics
    metrics: {
      readability: {
        enabled: true,
        target: 'intermediate', // 'beginner' | 'intermediate' | 'advanced'
        tools: ['flesch-kincaid', 'automated-readability']
      },
      
      completeness: {
        enabled: true,
        requiredSections: [
          'description',
          'usage',
          'examples',
          'properties'
        ]
      },
      
      consistency: {
        enabled: true,
        checkTerminology: true,
        checkFormatting: true,
        checkStructure: true
      }
    },
    
    // Quality gates
    gates: {
      // Minimum quality score for release
      releaseThreshold: 85,
      
      // Warning threshold
      warningThreshold: 70,
      
      // Block deployment below this score
      blockThreshold: 50
    }
  },

  // Reporting configuration
  reporting: {
    // Report output directory
    outputDir: 'docs/reports',
    
    // Report formats
    formats: ['json', 'markdown', 'html'],
    
    // Report sections
    sections: {
      summary: true,
      changes: true,
      quality: true,
      dependencies: true,
      recommendations: true
    },
    
    // Report retention (days)
    retention: 30,
    
    // Auto-generate reports
    autoGenerate: {
      onChanges: true,
      onSchedule: false,
      schedule: '0 2 * * *' // Daily at 2 AM
    }
  },

  // Integration settings
  integration: {
    // Git integration
    git: {
      enabled: true,
      
      // Auto-commit version updates
      autoCommit: false,
      
      // Commit message template
      commitTemplate: 'docs: update documentation version to {version}',
      
      // Tag releases
      tagReleases: true,
      
      // Tag template
      tagTemplate: 'docs-v{version}'
    },
    
    // CI/CD integration
    cicd: {
      enabled: true,
      
      // Fail build on quality gate violations
      failOnQualityGate: true,
      
      // Generate artifacts
      generateArtifacts: true,
      
      // Artifact retention (days)
      artifactRetention: 90
    },
    
    // External tools
    tools: {
      markdownlint: {
        enabled: true,
        configFile: 'config/lint/.markdownlint.json'
      },
      
      linkChecker: {
        enabled: true,
        timeout: 30000,
        retries: 3
      },
      
      spellChecker: {
        enabled: false,
        language: 'en-US',
        customDictionary: 'docs/.dictionary.txt'
      }
    }
  },

  // Performance settings
  performance: {
    // Enable caching
    cache: {
      enabled: true,
      directory: '.docs-cache',
      ttl: 3600 // 1 hour
    },
    
    // Parallel processing
    parallel: {
      enabled: true,
      maxWorkers: 4
    },
    
    // Memory limits
    memory: {
      maxFileSize: '10MB',
      maxTotalSize: '100MB'
    }
  },

  // Debug and logging
  debug: {
    enabled: false,
    level: 'info', // 'error' | 'warn' | 'info' | 'debug' | 'trace'
    outputFile: 'docs-version.log'
  }
};