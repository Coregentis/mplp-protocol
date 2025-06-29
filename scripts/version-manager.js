/**
 * Version Manager for MPLP
 * Provides unified interface for version management operations
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const CompatibilityChecker = require('./compatibility-checker');
const ChangelogGenerator = require('./changelog-generator');

class VersionManager {
  constructor() {
    this.projectRoot = process.cwd();
    this.packageFile = path.join(this.projectRoot, 'package.json');
    this.versionsFile = path.join(this.projectRoot, 'versions.json');
  }

  /**
   * Get current version from package.json
   */
  getCurrentVersion() {
    const packageData = JSON.parse(fs.readFileSync(this.packageFile, 'utf8'));
    return packageData.version;
  }

  /**
   * Calculate next version based on type
   */
  calculateNextVersion(currentVersion, bumpType, prereleaseId = 'alpha') {
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    
    switch (bumpType) {
      case 'major':
        return `${major + 1}.0.0`;
      case 'minor':
        return `${major}.${minor + 1}.0`;
      case 'patch':
        return `${major}.${minor}.${patch + 1}`;
      case 'prerelease':
        if (currentVersion.includes('-')) {
          // Increment existing prerelease
          const [base, prerelease] = currentVersion.split('-');
          const [id, num] = prerelease.split('.');
          return `${base}-${id}.${parseInt(num || 0) + 1}`;
        } else {
          // Create new prerelease
          return `${major}.${minor}.${patch + 1}-${prereleaseId}.0`;
        }
      default:
        throw new Error(`Unknown bump type: ${bumpType}`);
    }
  }

  /**
   * Validate version format
   */
  validateVersion(version) {
    const semverRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/;
    return semverRegex.test(version);
  }

  /**
   * Check if working directory is clean
   */
  isWorkingDirectoryClean() {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      return status.trim() === '';
    } catch (error) {
      console.warn('Warning: Could not check git status');
      return true; // Assume clean if git is not available
    }
  }

  /**
   * Get last git tag
   */
  getLastTag() {
    try {
      return execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    } catch (error) {
      return null;
    }
  }

  /**
   * Update package.json version
   */
  updatePackageVersion(version) {
    const packageData = JSON.parse(fs.readFileSync(this.packageFile, 'utf8'));
    packageData.version = version;
    fs.writeFileSync(this.packageFile, JSON.stringify(packageData, null, 2));
    console.log(`✅ Updated package.json to version ${version}`);
  }

  /**
   * Update versions.json
   */
  updateVersionsFile(version) {
    const updater = require('./version-updater');
    
    let versionsContent = '[]';
    if (fs.existsSync(this.versionsFile)) {
      versionsContent = fs.readFileSync(this.versionsFile, 'utf8');
    }
    
    const newContent = updater.writeVersion(versionsContent, version);
    fs.writeFileSync(this.versionsFile, newContent);
    console.log(`✅ Updated versions.json with version ${version}`);
  }

  /**
   * Run pre-release checks
   */
  async runPreReleaseChecks(version) {
    console.log('\n🔍 Running pre-release checks...');
    
    // Check working directory
    if (!this.isWorkingDirectoryClean()) {
      throw new Error('Working directory is not clean. Please commit or stash changes.');
    }
    console.log('✅ Working directory is clean');
    
    // Run tests
    try {
      execSync('npm run test:ci', { stdio: 'inherit' });
      console.log('✅ All tests passed');
    } catch (error) {
      throw new Error('Tests failed');
    }
    
    // Validate examples
    try {
      execSync('npm run validate:examples', { stdio: 'inherit' });
      console.log('✅ All examples validated');
    } catch (error) {
      throw new Error('Example validation failed');
    }
    
    // Check compatibility
    const checker = new CompatibilityChecker();
    const compatible = await checker.runFullCheck(`v${version}`);
    if (!compatible) {
      throw new Error('Compatibility check failed');
    }
    
    console.log('✅ All pre-release checks passed');
  }

  /**
   * Generate changelog
   */
  async generateChangelog(version) {
    console.log('\n📝 Generating changelog...');
    
    const generator = new ChangelogGenerator();
    const lastTag = this.getLastTag();
    
    await generator.generateMultilingualChangelogs(`v${version}`, lastTag);
    console.log('✅ Changelog generated');
  }

  /**
   * Create git commit and tag
   */
  createGitCommitAndTag(version) {
    console.log('\n🔄 Creating git commit and tag...');
    
    try {
      // Add all changes
      execSync('git add .', { stdio: 'inherit' });
      
      // Commit changes
      const commitMessage = `chore(release): v${version}`;
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
      
      // Create tag
      execSync(`git tag v${version}`, { stdio: 'inherit' });
      
      console.log(`✅ Created commit and tag v${version}`);
      console.log('\n📋 Next steps:');
      console.log(`   1. Review changes: git show v${version}`);
      console.log(`   2. Push to remote: git push origin main && git push origin v${version}`);
      
    } catch (error) {
      throw new Error(`Git operations failed: ${error.message}`);
    }
  }

  /**
   * Bump version
   */
  async bumpVersion(bumpType, options = {}) {
    const { prereleaseId = 'alpha', dryRun = false, skipChecks = false } = options;
    
    console.log(`🚀 Starting version bump: ${bumpType}`);
    console.log('=' .repeat(50));
    
    try {
      // Get current version
      const currentVersion = this.getCurrentVersion();
      console.log(`Current version: ${currentVersion}`);
      
      // Calculate new version
      const newVersion = this.calculateNextVersion(currentVersion, bumpType, prereleaseId);
      console.log(`New version: ${newVersion}`);
      
      // Validate new version
      if (!this.validateVersion(newVersion)) {
        throw new Error(`Invalid version format: ${newVersion}`);
      }
      
      if (dryRun) {
        console.log('\n🔍 DRY RUN - No changes will be made');
        console.log(`Would bump from ${currentVersion} to ${newVersion}`);
        return;
      }
      
      // Run pre-release checks
      if (!skipChecks) {
        await this.runPreReleaseChecks(newVersion);
      }
      
      // Generate changelog
      await this.generateChangelog(newVersion);
      
      // Update version files
      this.updatePackageVersion(newVersion);
      this.updateVersionsFile(newVersion);
      
      // Create git commit and tag
      this.createGitCommitAndTag(newVersion);
      
      console.log('\n' + '=' .repeat(50));
      console.log(`🎉 Successfully bumped version to ${newVersion}`);
      
    } catch (error) {
      console.error('\n❌ Version bump failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Parse command line arguments
   */
  parseArgs() {
    const args = process.argv.slice(2);
    const options = {
      bumpType: 'patch',
      prereleaseId: 'alpha',
      dryRun: false,
      skipChecks: false
    };
    
    // Parse positional argument (bump type)
    if (args[0] && !args[0].startsWith('--')) {
      options.bumpType = args[0];
    }
    
    // Parse flags
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      
      if (arg === '--dry-run') {
        options.dryRun = true;
      } else if (arg === '--skip-checks') {
        options.skipChecks = true;
      } else if (arg === '--prerelease-id' && args[i + 1]) {
        options.prereleaseId = args[i + 1];
        i++; // Skip next argument
      }
    }
    
    return options;
  }

  /**
   * Show help
   */
  showHelp() {
    console.log(`
MPLP Version Manager

Usage:
  node scripts/version-manager.js [bump-type] [options]

Bump Types:
  patch      Increment patch version (1.0.0 -> 1.0.1)
  minor      Increment minor version (1.0.0 -> 1.1.0)
  major      Increment major version (1.0.0 -> 2.0.0)
  prerelease Increment prerelease version (1.0.0 -> 1.0.1-alpha.0)

Options:
  --dry-run           Show what would be done without making changes
  --skip-checks       Skip pre-release checks (not recommended)
  --prerelease-id ID  Set prerelease identifier (default: alpha)
  --help              Show this help message

Examples:
  node scripts/version-manager.js patch
  node scripts/version-manager.js minor --dry-run
  node scripts/version-manager.js prerelease --prerelease-id beta
`);
  }

  /**
   * Main execution function
   */
  async run() {
    const options = this.parseArgs();
    
    if (process.argv.includes('--help')) {
      this.showHelp();
      return;
    }
    
    await this.bumpVersion(options.bumpType, options);
  }
}

// Run if called directly
if (require.main === module) {
  const manager = new VersionManager();
  manager.run().catch(console.error);
}

module.exports = VersionManager;