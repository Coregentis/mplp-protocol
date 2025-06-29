/**
 * Package.json Scripts Optimization
 * 
 * This script reorganizes and optimizes the npm scripts in package.json
 * by grouping them logically and removing redundancy.
 */

const fs = require('fs');
const path = require('path');

/**
 * Optimized script categories with clear separation of concerns
 */
const optimizedScripts = {
  // === TESTING SCRIPTS ===
  'test': 'node scripts/run-tests.js',
  'test:unit': 'node scripts/run-tests.js --type unit',
  'test:integration': 'node scripts/run-tests.js --type integration',
  'test:coverage': 'node scripts/run-tests.js --coverage',
  'test:watch': 'jest --watch',
  'test:ci': 'node scripts/run-tests.js --ci',
  'test:performance': 'node scripts/run-tests.js --performance',

  // === CODE QUALITY SCRIPTS ===
  'lint': 'eslint . --ext .js,.json',
  'lint:fix': 'eslint . --ext .js,.json --fix',
  'quality:check': 'npm run lint && npm run complexity:check && npm run duplicates:check',
  'complexity:check': 'complexity-report --output build/reports/complexity-report.json --format json src/',
  'duplicates:check': 'jscpd --output build/reports/duplication-report.json --format json .',

  // === SECURITY SCRIPTS ===
  'security:audit': 'npm audit --audit-level moderate',
  'security:check': 'audit-ci --moderate',
  'security:licenses': 'license-checker --onlyAllow "MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC" --excludePrivatePackages',

  // === VALIDATION SCRIPTS ===
  'validate': 'npm run validate:schemas && npm run validate:examples',
  'validate:schemas': 'node scripts/validate-schemas.js',
  'validate:examples': 'node scripts/validate-examples.js',
  'validate:docs': 'markdownlint docs/ --config config/lint/.markdownlint.json',
  'validate:links': 'markdown-link-check docs/**/*.md',

  // === DOCUMENTATION SCRIPTS ===
  'docs:generate': 'npm run generate:schema-docs && npm run docs:sync',
  'docs:sync': 'node scripts/duplicate-docs-to-languages.js',
  'docs:serve': 'http-server docs/ -p 8080',
  'docs:quality': 'node tools/monitoring/doc-quality-monitor.js check',
  'docs:version': 'node scripts/docs-version-manager.js status',

  // === BUILD SCRIPTS ===
  'build': 'npm run validate && npm run docs:generate',
  'build:clean': 'rimraf build/ && npm run build',
  'build:production': 'npm run test:ci && npm run quality:check && npm run security:check && npm run build',

  // === RELEASE SCRIPTS ===
  'release': 'node scripts/release.js',
  'release:patch': 'node scripts/release.js --type patch',
  'release:minor': 'node scripts/release.js --type minor',
  'release:major': 'node scripts/release.js --type major',
  'version:bump': 'node scripts/version-manager.js',
  'changelog:generate': 'node scripts/changelog-generator.js',

  // === DEPLOYMENT SCRIPTS ===
  'deploy:staging': 'node scripts/deploy.js --env staging',
  'deploy:production': 'node scripts/deploy.js --env production',
  'deploy:rollback': 'node scripts/deploy.js --rollback',

  // === UTILITY SCRIPTS ===
  'deps:check': 'npm-check-updates',
  'deps:update': 'npm-check-updates -u',
  'generate:schema-docs': 'node scripts/generate-schema-docs.js',
  'compatibility:check': 'node scripts/update-compatibility-matrix.js validate',
  'performance:check': 'node scripts/performance-tests.js --all'
};

/**
 * Script categories for better organization
 */
const scriptCategories = {
  testing: [
    'test', 'test:unit', 'test:integration', 'test:coverage', 
    'test:watch', 'test:ci', 'test:performance'
  ],
  quality: [
    'lint', 'lint:fix', 'quality:check', 'complexity:check', 'duplicates:check'
  ],
  security: [
    'security:audit', 'security:check', 'security:licenses'
  ],
  validation: [
    'validate', 'validate:schemas', 'validate:examples', 
    'validate:docs', 'validate:links'
  ],
  documentation: [
    'docs:generate', 'docs:sync', 'docs:serve', 'docs:quality', 'docs:version'
  ],
  build: [
    'build', 'build:clean', 'build:production'
  ],
  release: [
    'release', 'release:patch', 'release:minor', 'release:major', 
    'version:bump', 'changelog:generate'
  ],
  deployment: [
    'deploy:staging', 'deploy:production', 'deploy:rollback'
  ],
  utilities: [
    'deps:check', 'deps:update', 'generate:schema-docs', 
    'compatibility:check', 'performance:check'
  ]
};

/**
 * Composite scripts for common workflows
 */
const workflowScripts = {
  // Pre-commit workflow
  'pre-commit': 'npm run lint:fix && npm run test:unit && npm run validate:schemas',
  
  // Pre-release workflow
  'pre-release': 'npm run test:ci && npm run quality:check && npm run security:check && npm run validate && npm run build',
  
  // Full CI workflow
  'ci:full': 'npm run pre-release && npm run performance:check',
  
  // Development setup
  'dev:setup': 'npm install && npm run validate:schemas && npm run docs:generate',
  
  // Quick health check
  'health:check': 'npm run test:unit && npm run lint && npm run security:audit'
};

/**
 * Function to optimize package.json scripts
 */
function optimizePackageScripts() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  
  try {
    // Read current package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Backup original scripts
    const originalScripts = { ...packageJson.scripts };
    
    // Replace with optimized scripts
    packageJson.scripts = {
      ...optimizedScripts,
      ...workflowScripts
    };
    
    // Write optimized package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    
    // Generate optimization report
    const report = generateOptimizationReport(originalScripts, packageJson.scripts);
    
    return {
      success: true,
      report,
      optimizedScripts: packageJson.scripts
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Generate optimization report
 */
function generateOptimizationReport(originalScripts, optimizedScripts) {
  const originalCount = Object.keys(originalScripts).length;
  const optimizedCount = Object.keys(optimizedScripts).length;
  
  const removed = Object.keys(originalScripts).filter(
    script => !optimizedScripts[script]
  );
  
  const added = Object.keys(optimizedScripts).filter(
    script => !originalScripts[script]
  );
  
  const modified = Object.keys(optimizedScripts).filter(
    script => originalScripts[script] && originalScripts[script] !== optimizedScripts[script]
  );
  
  return {
    summary: {
      originalCount,
      optimizedCount,
      reduction: originalCount - optimizedCount,
      reductionPercentage: Math.round(((originalCount - optimizedCount) / originalCount) * 100)
    },
    changes: {
      removed: removed.length,
      added: added.length,
      modified: modified.length
    },
    details: {
      removedScripts: removed,
      addedScripts: added,
      modifiedScripts: modified
    },
    categories: scriptCategories
  };
}

/**
 * Generate documentation for script categories
 */
function generateScriptDocumentation() {
  let documentation = '# NPM Scripts Documentation\n\n';
  documentation += 'This document describes the organized npm scripts available in this project.\n\n';
  
  Object.entries(scriptCategories).forEach(([category, scripts]) => {
    documentation += `## ${category.charAt(0).toUpperCase() + category.slice(1)} Scripts\n\n`;
    
    scripts.forEach(script => {
      if (optimizedScripts[script]) {
        documentation += `- \`${script}\`: ${optimizedScripts[script]}\n`;
      }
    });
    
    documentation += '\n';
  });
  
  documentation += '## Workflow Scripts\n\n';
  Object.entries(workflowScripts).forEach(([script, command]) => {
    documentation += `- \`${script}\`: ${command}\n`;
  });
  
  return documentation;
}

module.exports = {
  optimizedScripts,
  scriptCategories,
  workflowScripts,
  optimizePackageScripts,
  generateOptimizationReport,
  generateScriptDocumentation
};

// If run directly, execute optimization
if (require.main === module) {
  console.log('Optimizing package.json scripts...');
  const result = optimizePackageScripts();
  
  if (result.success) {
    console.log('✅ Scripts optimized successfully!');
    console.log('📊 Optimization Report:');
    console.log(`   - Original scripts: ${result.report.summary.originalCount}`);
    console.log(`   - Optimized scripts: ${result.report.summary.optimizedCount}`);
    console.log(`   - Reduction: ${result.report.summary.reduction} scripts (${result.report.summary.reductionPercentage}%)`);
    console.log(`   - Removed: ${result.report.changes.removed}`);
    console.log(`   - Added: ${result.report.changes.added}`);
    console.log(`   - Modified: ${result.report.changes.modified}`);
    
    // Generate script documentation
    const docs = generateScriptDocumentation();
    fs.writeFileSync(path.join(__dirname, 'SCRIPTS.md'), docs);
    console.log('📝 Script documentation generated: config/SCRIPTS.md');
    
  } else {
    console.error('❌ Optimization failed:', result.error);
  }
}