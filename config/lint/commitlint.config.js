/**
 * Commitlint Configuration for MPLP
 * Enforces Conventional Commits specification
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  
  rules: {
    // Type enum - allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'build',    // Build system or external dependencies
        'ci',       // CI/CD changes
        'chore',    // Other changes (maintenance, etc.)
        'revert',   // Revert previous commit
        'schema',   // Schema changes
        'example',  // Example updates
        'release'   // Release commits
      ]
    ],
    
    // Subject and body rules
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 72],
    'subject-min-length': [2, 'always', 3],
    
    // Header rules
    'header-max-length': [2, 'always', 100],
    'header-min-length': [2, 'always', 10],
    
    // Body rules
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    
    // Footer rules
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    
    // Type and scope rules
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    
    // Custom scope validation
    'scope-enum': [
      2,
      'always',
      [
        // Core components
        'schema',
        'core',
        'api',
        'protocol',
        
        // Documentation
        'docs',
        'readme',
        'changelog',
        
        // Infrastructure
        'ci',
        'build',
        'deps',
        'config',
        
        // Testing
        'test',
        'e2e',
        'unit',
        'integration',
        
        // Examples
        'examples',
        'demo',
        
        // Tools and scripts
        'scripts',
        'tools',
        'lint',
        
        // Release and versioning
        'release',
        'version',
        
        // Security
        'security',
        'audit',
        
        // Performance
        'perf',
        'optimization',
        
        // Localization
        'i18n',
        'l10n',
        
        // UI/UX (if applicable)
        'ui',
        'ux',
        'style'
      ]
    ]
  },
  
  // Custom plugins and parsers
  parserPreset: {
    parserOpts: {
      // Allow longer subject lines for certain types
      subjectPattern: /^(?![A-Z]).*$/,
      subjectPatternCorrespondence: ['subject']
    }
  },
  
  // Ignore certain patterns
  ignores: [
    // Ignore merge commits
    (commit) => commit.includes('Merge'),
    // Ignore revert commits (they have their own format)
    (commit) => commit.includes('Revert'),
    // Ignore automated commits
    (commit) => commit.includes('[automated]'),
    (commit) => commit.includes('[bot]')
  ],
  
  // Default ignore rules
  defaultIgnores: true,
  
  // Help URL for commit message format
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  
  // Custom formatter
  formatter: '@commitlint/format'
};