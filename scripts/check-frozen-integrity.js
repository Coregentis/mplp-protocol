#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Check integrity of frozen release versions
 * Prevents any modifications to frozen release directories
 */

class FrozenIntegrityChecker {
  constructor() {
    this.projectRoot = process.cwd();
    this.releaseDir = path.join(this.projectRoot, 'release');
    this.versionsFile = path.join(this.projectRoot, 'versions.json');
  }

  /**
   * Get all frozen versions from versions.json
   */
  getFrozenVersions() {
    try {
      if (!fs.existsSync(this.versionsFile)) {
        console.log('⚠️  versions.json not found, skipping frozen integrity check');
        return [];
      }

      const versionsData = JSON.parse(fs.readFileSync(this.versionsFile, 'utf8'));
      const frozenVersions = [];

      // Handle both array format and object format
      if (Array.isArray(versionsData)) {
        // Array format: [{ version: "v1.0.0", status: "frozen" }, ...]
        for (const versionInfo of versionsData) {
          if (versionInfo.status === 'frozen') {
            frozenVersions.push(versionInfo.version);
          }
        }
      } else if (versionsData.versions) {
        // Object format: { versions: { "v1.0.0": { status: "frozen" }, ... } }
        for (const [version, info] of Object.entries(versionsData.versions)) {
          if (info.status === 'frozen') {
            frozenVersions.push(version);
          }
        }
      }

      return frozenVersions;
    } catch (error) {
      console.error('❌ Error reading versions.json:', error.message);
      process.exit(1);
    }
  }

  /**
   * Calculate SHA256 hash for a directory recursively
   */
  calculateDirectoryHash(dirPath) {
    if (!fs.existsSync(dirPath)) {
      throw new Error(`Directory not found: ${dirPath}`);
    }

    const hash = crypto.createHash('sha256');
    const files = this.getAllFiles(dirPath).sort();

    for (const file of files) {
      const relativePath = path.relative(dirPath, file);
      const content = fs.readFileSync(file);
      
      // Include both file path and content in hash
      hash.update(relativePath);
      hash.update(content);
    }

    return hash.digest('hex');
  }

  /**
   * Get all files in directory recursively
   */
  getAllFiles(dirPath) {
    const files = [];
    
    const traverse = (currentPath) => {
      const items = fs.readdirSync(currentPath);
      
      for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          traverse(fullPath);
        } else {
          // Skip .checksum files
          if (!item.endsWith('.checksum')) {
            files.push(fullPath);
          }
        }
      }
    };
    
    traverse(dirPath);
    return files;
  }

  /**
   * Get or create checksum file for a version
   */
  getChecksumFile(version) {
    return path.join(this.releaseDir, version, '.checksum');
  }

  /**
   * Save checksum to file
   */
  saveChecksum(version, checksum) {
    const checksumFile = this.getChecksumFile(version);
    fs.writeFileSync(checksumFile, checksum, 'utf8');
    console.log(`✅ Saved checksum for ${version}: ${checksum.substring(0, 16)}...`);
  }

  /**
   * Load existing checksum from file
   */
  loadChecksum(version) {
    const checksumFile = this.getChecksumFile(version);
    
    if (!fs.existsSync(checksumFile)) {
      return null;
    }
    
    return fs.readFileSync(checksumFile, 'utf8').trim();
  }

  /**
   * Check integrity of a single frozen version
   */
  checkVersionIntegrity(version) {
    const versionDir = path.join(this.releaseDir, version);
    
    if (!fs.existsSync(versionDir)) {
      console.log(`⚠️  Version directory not found: ${version}`);
      return true; // Skip if directory doesn't exist
    }

    console.log(`🔍 Checking integrity of frozen version: ${version}`);
    
    const currentHash = this.calculateDirectoryHash(versionDir);
    const savedHash = this.loadChecksum(version);
    
    if (!savedHash) {
      // First time - save the checksum
      this.saveChecksum(version, currentHash);
      console.log(`📝 Initial checksum saved for ${version}`);
      return true;
    }
    
    if (currentHash !== savedHash) {
      console.error(`❌ Frozen version mutated: release/${version}/`);
      console.error(`   Expected: ${savedHash}`);
      console.error(`   Current:  ${currentHash}`);
      return false;
    }
    
    console.log(`✅ Integrity verified for ${version}`);
    return true;
  }

  /**
   * Check all frozen versions
   */
  checkAllFrozenVersions() {
    const frozenVersions = this.getFrozenVersions();
    
    if (frozenVersions.length === 0) {
      console.log('ℹ️  No frozen versions found');
      return true;
    }
    
    console.log(`🔒 Found ${frozenVersions.length} frozen version(s): ${frozenVersions.join(', ')}`);
    
    let allValid = true;
    
    for (const version of frozenVersions) {
      if (!this.checkVersionIntegrity(version)) {
        allValid = false;
      }
    }
    
    return allValid;
  }

  /**
   * Main execution method
   */
  run() {
    console.log('🛡️  MPLP Frozen Integrity Checker');
    console.log('=' .repeat(50));
    
    try {
      const success = this.checkAllFrozenVersions();
      
      if (success) {
        console.log('\n✅ All frozen versions integrity verified');
        process.exit(0);
      } else {
        console.log('\n❌ Frozen version integrity check failed');
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error during integrity check:', error.message);
      process.exit(1);
    }
  }
}

// Run the checker if this script is executed directly
if (require.main === module) {
  const checker = new FrozenIntegrityChecker();
  checker.run();
}

module.exports = FrozenIntegrityChecker;