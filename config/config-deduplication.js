/**
 * Configuration Deduplication Tool
 * 
 * This script identifies and resolves duplicate configurations across the project,
 * providing recommendations for consolidation and cleanup.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Configuration file mappings and their purposes
 */
const configFiles = {
  // Release configurations
  release: {
    'release/release-config.json': 'Main release configuration',
    'release/release-approval-config.json': 'Release approval matrix'
  },
  
  // Security configurations
  security: {
    'security/.security-config.json': 'Security policies and scanning',
    'release/release-config.json': 'Release security settings (subset)'
  },
  
  // Documentation configurations
  documentation: {
    'docs-quality.config.js': 'Documentation quality rules',
    'docs-version.config.js': 'Documentation versioning',
    'monitoring-config.json': 'Documentation monitoring (subset)'
  },
  
  // Linting configurations
  linting: {
    'lint/.lintstagedrc.json': 'Git staged files linting',
    'lint/.markdownlint.json': 'Markdown linting rules',
    'lint/commitlint.config.js': 'Commit message linting'
  }
};

/**
 * Duplicate configuration patterns found in the project
 */
const duplicatePatterns = {
  // Security license configurations
  allowedLicenses: {
    files: [
      'security/.security-config.json',
      'release/release-config.json'
    ],
    paths: [
      'security.policies.licenseCompliance.allowedLicenses',
      'security.allowedLicenses'
    ],
    recommendation: 'Consolidate into unified security configuration'
  },
  
  // Security vulnerability thresholds
  vulnerabilityThresholds: {
    files: [
      'security/.security-config.json',
      'release/release-config.json'
    ],
    paths: [
      'security.policies.dependencyScanning.severityThresholds',
      'security.maxCriticalVulnerabilities'
    ],
    recommendation: 'Use single source for vulnerability limits'
  },
  
  // Documentation monitoring settings
  documentationChecks: {
    files: [
      'docs-quality.config.js',
      'monitoring-config.json'
    ],
    paths: [
      'rules.content',
      'documentationMonitoring.checks'
    ],
    recommendation: 'Merge documentation quality and monitoring configurations'
  },
  
  // Release approval settings
  releaseApproval: {
    files: [
      'release/release-config.json',
      'release/release-approval-config.json'
    ],
    paths: [
      'approval',
      'approval_matrix'
    ],
    recommendation: 'Consolidate approval configurations into single file'
  }
};

/**
 * Deduplication strategies
 */
const deduplicationStrategies = {
  // Strategy 1: Merge release configurations
  mergeReleaseConfigs: {
    description: 'Merge release-config.json and release-approval-config.json',
    action: 'merge',
    primaryFile: 'release/release-config.json',
    secondaryFile: 'release/release-approval-config.json',
    mergeStrategy: 'extend_primary_with_secondary'
  },
  
  // Strategy 2: Consolidate security settings
  consolidateSecurity: {
    description: 'Move all security settings to .security-config.json',
    action: 'consolidate',
    targetFile: 'security/.security-config.json',
    sourceFiles: ['release/release-config.json'],
    extractPaths: ['security']
  },
  
  // Strategy 3: Unify documentation configurations
  unifyDocumentationConfig: {
    description: 'Create single documentation configuration',
    action: 'create_unified',
    targetFile: 'docs-unified.config.js',
    sourceFiles: [
      'docs-quality.config.js',
      'docs-version.config.js',
      'monitoring-config.json'
    ],
    extractPaths: {
      'docs-quality.config.js': ['thresholds', 'rules', 'checks'],
      'docs-version.config.js': ['version', 'baseline'],
      'monitoring-config.json': ['documentationMonitoring']
    }
  }
};

/**
 * Analyze configuration files for duplicates
 */
function analyzeConfigDuplicates() {
  const analysis = {
    duplicates: [],
    recommendations: [],
    fileAnalysis: {},
    summary: {
      totalFiles: 0,
      duplicatePatterns: 0,
      potentialSavings: 0
    }
  };
  
  // Analyze each duplicate pattern
  Object.entries(duplicatePatterns).forEach(([patternName, pattern]) => {
    const duplicate = {
      pattern: patternName,
      description: pattern.recommendation,
      files: pattern.files,
      paths: pattern.paths,
      severity: calculateDuplicationSeverity(pattern)
    };
    
    analysis.duplicates.push(duplicate);
    analysis.summary.duplicatePatterns++;
  });
  
  // Generate recommendations
  Object.entries(deduplicationStrategies).forEach(([strategyName, strategy]) => {
    analysis.recommendations.push({
      strategy: strategyName,
      description: strategy.description,
      action: strategy.action,
      impact: calculateImpact(strategy),
      priority: calculatePriority(strategy)
    });
  });
  
  // Calculate file analysis
  const configDir = __dirname;
  const allConfigFiles = getAllConfigFiles(configDir);
  
  allConfigFiles.forEach(file => {
    const filePath = path.relative(configDir, file);
    analysis.fileAnalysis[filePath] = {
      size: fs.statSync(file).size,
      lastModified: fs.statSync(file).mtime,
      duplicateReferences: countDuplicateReferences(filePath)
    };
  });
  
  analysis.summary.totalFiles = allConfigFiles.length;
  analysis.summary.potentialSavings = calculatePotentialSavings(analysis);
  
  return analysis;
}

/**
 * Calculate duplication severity
 */
function calculateDuplicationSeverity(pattern) {
  const fileCount = pattern.files.length;
  const pathCount = pattern.paths.length;
  
  if (fileCount >= 3 || pathCount >= 3) return 'high';
  if (fileCount === 2 && pathCount >= 2) return 'medium';
  return 'low';
}

/**
 * Calculate impact of deduplication strategy
 */
function calculateImpact(strategy) {
  switch (strategy.action) {
    case 'merge':
      return 'medium';
    case 'consolidate':
      return 'high';
    case 'create_unified':
      return 'high';
    default:
      return 'low';
  }
}

/**
 * Calculate priority of deduplication strategy
 */
function calculatePriority(strategy) {
  const impactScore = strategy.action === 'create_unified' ? 3 : 
                     strategy.action === 'consolidate' ? 2 : 1;
  
  const complexityScore = strategy.sourceFiles ? strategy.sourceFiles.length : 1;
  
  const totalScore = impactScore + (complexityScore > 2 ? 2 : complexityScore);
  
  if (totalScore >= 5) return 'high';
  if (totalScore >= 3) return 'medium';
  return 'low';
}

/**
 * Get all configuration files recursively
 */
function getAllConfigFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.')) {
      files.push(...getAllConfigFiles(fullPath));
    } else if (stat.isFile() && isConfigFile(item)) {
      files.push(fullPath);
    }
  });
  
  return files;
}

/**
 * Check if file is a configuration file
 */
function isConfigFile(filename) {
  const configExtensions = ['.json', '.js', '.yml', '.yaml'];
  const configPatterns = ['config', 'lint', 'test', 'build', 'release'];
  
  const hasConfigExtension = configExtensions.some(ext => filename.endsWith(ext));
  const hasConfigPattern = configPatterns.some(pattern => 
    filename.toLowerCase().includes(pattern)
  );
  
  return hasConfigExtension && (hasConfigPattern || filename.startsWith('.'));
}

/**
 * Count duplicate references for a file
 */
function countDuplicateReferences(filePath) {
  let count = 0;
  
  Object.values(duplicatePatterns).forEach(pattern => {
    if (pattern.files.includes(filePath)) {
      count++;
    }
  });
  
  return count;
}

/**
 * Calculate potential savings from deduplication
 */
function calculatePotentialSavings(analysis) {
  let savings = 0;
  
  // Estimate lines of code that could be removed
  analysis.duplicates.forEach(duplicate => {
    if (duplicate.severity === 'high') savings += 50;
    else if (duplicate.severity === 'medium') savings += 30;
    else savings += 15;
  });
  
  return savings;
}

/**
 * Execute deduplication strategy
 */
function executeDeduplication(strategyName) {
  const strategy = deduplicationStrategies[strategyName];
  if (!strategy) {
    throw new Error(`Unknown strategy: ${strategyName}`);
  }
  
  console.log(`Executing strategy: ${strategy.description}`);
  
  switch (strategy.action) {
    case 'merge':
      return mergeConfigurations(strategy);
    case 'consolidate':
      return consolidateConfigurations(strategy);
    case 'create_unified':
      return createUnifiedConfiguration(strategy);
    default:
      throw new Error(`Unknown action: ${strategy.action}`);
  }
}

/**
 * Merge two configuration files
 */
function mergeConfigurations(strategy) {
  const primaryPath = path.join(__dirname, strategy.primaryFile);
  const secondaryPath = path.join(__dirname, strategy.secondaryFile);
  
  const primaryConfig = JSON.parse(fs.readFileSync(primaryPath, 'utf8'));
  const secondaryConfig = JSON.parse(fs.readFileSync(secondaryPath, 'utf8'));
  
  // Merge configurations
  const mergedConfig = {
    ...primaryConfig,
    approval: {
      ...primaryConfig.approval,
      detailedMatrix: secondaryConfig.approval_matrix,
      environments: secondaryConfig.environments,
      notifications: secondaryConfig.notifications
    }
  };
  
  // Write merged configuration
  fs.writeFileSync(primaryPath, JSON.stringify(mergedConfig, null, 2));
  
  return {
    success: true,
    message: `Merged ${strategy.secondaryFile} into ${strategy.primaryFile}`,
    action: 'merged'
  };
}

/**
 * Generate deduplication report
 */
function generateDeduplicationReport() {
  const analysis = analyzeConfigDuplicates();
  
  let report = '# Configuration Deduplication Report\n\n';
  report += `Generated on: ${new Date().toISOString()}\n\n`;
  
  // Summary
  report += '## Summary\n\n';
  report += `- Total configuration files: ${analysis.summary.totalFiles}\n`;
  report += `- Duplicate patterns found: ${analysis.summary.duplicatePatterns}\n`;
  report += `- Potential lines saved: ~${analysis.summary.potentialSavings}\n\n`;
  
  // Duplicates
  report += '## Duplicate Patterns\n\n';
  analysis.duplicates.forEach(duplicate => {
    report += `### ${duplicate.pattern} (${duplicate.severity} severity)\n\n`;
    report += `**Description:** ${duplicate.description}\n\n`;
    report += `**Files involved:**\n`;
    duplicate.files.forEach(file => {
      report += `- ${file}\n`;
    });
    report += '\n';
  });
  
  // Recommendations
  report += '## Recommendations\n\n';
  analysis.recommendations.forEach(rec => {
    report += `### ${rec.strategy} (${rec.priority} priority)\n\n`;
    report += `**Description:** ${rec.description}\n\n`;
    report += `**Impact:** ${rec.impact}\n\n`;
  });
  
  return report;
}

module.exports = {
  configFiles,
  duplicatePatterns,
  deduplicationStrategies,
  analyzeConfigDuplicates,
  executeDeduplication,
  generateDeduplicationReport
};

// If run directly, generate report
if (require.main === module) {
  console.log('Analyzing configuration duplicates...');
  
  const report = generateDeduplicationReport();
  const reportPath = path.join(__dirname, 'DEDUPLICATION_REPORT.md');
  
  fs.writeFileSync(reportPath, report);
  console.log(`📊 Deduplication report generated: ${reportPath}`);
  
  const analysis = analyzeConfigDuplicates();
  console.log('\n📋 Quick Summary:');
  console.log(`   - Configuration files: ${analysis.summary.totalFiles}`);
  console.log(`   - Duplicate patterns: ${analysis.summary.duplicatePatterns}`);
  console.log(`   - Potential savings: ~${analysis.summary.potentialSavings} lines`);
}