#!/usr/bin/env node

/**
 * MPLP Version Compatibility Matrix Update Script
 * 
 * This script manages the version compatibility matrix for the Multi-Agent Project Lifecycle Protocol.
 * It can add new versions, update compatibility relationships, and validate the matrix structure.
 * 
 * Usage:
 *   node scripts/update-compatibility-matrix.js add --version v1.1.0 --status active --compatible v1.0.0
 *   node scripts/update-compatibility-matrix.js validate
 *   node scripts/update-compatibility-matrix.js list
 */

const fs = require('fs');
const path = require('path');

class CompatibilityMatrixManager {
  constructor() {
    this.matrixPath = path.join(process.cwd(), 'version-compatibility.json');
    this.matrix = this.loadMatrix();
  }

  loadMatrix() {
    try {
      if (!fs.existsSync(this.matrixPath)) {
        console.error('❌ version-compatibility.json not found');
        process.exit(1);
      }
      const content = fs.readFileSync(this.matrixPath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.error('❌ Failed to load compatibility matrix:', error.message);
      process.exit(1);
    }
  }

  saveMatrix() {
    try {
      fs.writeFileSync(this.matrixPath, JSON.stringify(this.matrix, null, 2));
      console.log('✅ Compatibility matrix updated successfully');
    } catch (error) {
      console.error('❌ Failed to save compatibility matrix:', error.message);
      process.exit(1);
    }
  }

  addVersion(options) {
    const { version, status = 'active', compatibleWith = [], breakingChanges = false, deprecated = false, notes = '' } = options;
    
    // Validate version format
    if (!version || !version.match(/^v\d+\.\d+\.\d+/)) {
      console.error('❌ Invalid version format. Expected: vX.Y.Z');
      return false;
    }

    // Check if version already exists
    const existingVersion = this.matrix.matrix.find(v => v.version === version);
    if (existingVersion) {
      console.error(`❌ Version ${version} already exists`);
      return false;
    }

    // Validate compatible versions exist
    const compatibleArray = Array.isArray(compatibleWith) ? compatibleWith : [compatibleWith].filter(Boolean);
    for (const compatVer of compatibleArray) {
      if (!this.matrix.matrix.find(v => v.version === compatVer)) {
        console.error(`❌ Compatible version ${compatVer} does not exist`);
        return false;
      }
    }

    // Add new version
    const newVersion = {
      version,
      status,
      compatibleWith: compatibleArray,
      breakingChanges,
      deprecated,
      notes
    };

    this.matrix.matrix.push(newVersion);
    
    // Update latest if this is a newer version
    if (status === 'active' || status === 'frozen') {
      const currentLatest = this.matrix.latest;
      if (this.compareVersions(version, currentLatest) > 0) {
        this.matrix.latest = version;
        console.log(`📌 Updated latest version to ${version}`);
      }
    }

    console.log(`✅ Added version ${version} to compatibility matrix`);
    return true;
  }

  updateVersion(version, updates) {
    const versionIndex = this.matrix.matrix.findIndex(v => v.version === version);
    if (versionIndex === -1) {
      console.error(`❌ Version ${version} not found`);
      return false;
    }

    // Validate compatible versions if being updated
    if (updates.compatibleWith) {
      const compatibleArray = Array.isArray(updates.compatibleWith) ? updates.compatibleWith : [updates.compatibleWith].filter(Boolean);
      for (const compatVer of compatibleArray) {
        if (!this.matrix.matrix.find(v => v.version === compatVer)) {
          console.error(`❌ Compatible version ${compatVer} does not exist`);
          return false;
        }
      }
      updates.compatibleWith = compatibleArray;
    }

    // Update version
    Object.assign(this.matrix.matrix[versionIndex], updates);
    console.log(`✅ Updated version ${version}`);
    return true;
  }

  validateMatrix() {
    console.log('🔍 Validating compatibility matrix...');
    let isValid = true;

    // Check if latest version exists
    const latestExists = this.matrix.matrix.find(v => v.version === this.matrix.latest);
    if (!latestExists) {
      console.error(`❌ Latest version ${this.matrix.latest} not found in matrix`);
      isValid = false;
    }

    // Validate each version
    for (const version of this.matrix.matrix) {
      // Check version format
      if (!version.version.match(/^v\d+\.\d+\.\d+/)) {
        console.error(`❌ Invalid version format: ${version.version}`);
        isValid = false;
      }

      // Check status
      const validStatuses = ['active', 'frozen', 'deprecated', 'beta', 'alpha'];
      if (!validStatuses.includes(version.status)) {
        console.error(`❌ Invalid status for ${version.version}: ${version.status}`);
        isValid = false;
      }

      // Check compatible versions exist
      for (const compatVer of version.compatibleWith || []) {
        if (!this.matrix.matrix.find(v => v.version === compatVer)) {
          console.error(`❌ Compatible version ${compatVer} for ${version.version} does not exist`);
          isValid = false;
        }
      }
    }

    if (isValid) {
      console.log('✅ Compatibility matrix is valid');
    }
    return isValid;
  }

  listVersions() {
    console.log('📋 MPLP Version Compatibility Matrix\n');
    console.log(`Latest: ${this.matrix.latest}\n`);
    
    console.log('Versions:');
    for (const version of this.matrix.matrix) {
      const isLatest = version.version === this.matrix.latest ? ' (latest)' : '';
      const compatible = version.compatibleWith.length > 0 ? ` | Compatible: ${version.compatibleWith.join(', ')}` : '';
      const breaking = version.breakingChanges ? ' | ⚠️  Breaking' : '';
      const deprecated = version.deprecated ? ' | 🚫 Deprecated' : '';
      
      console.log(`  ${version.version}${isLatest} - ${version.status}${compatible}${breaking}${deprecated}`);
      if (version.notes) {
        console.log(`    Notes: ${version.notes}`);
      }
    }
  }

  compareVersions(a, b) {
    const parseVersion = (v) => v.replace('v', '').split('.').map(Number);
    const [aMajor, aMinor, aPatch] = parseVersion(a);
    const [bMajor, bMinor, bPatch] = parseVersion(b);
    
    if (aMajor !== bMajor) return aMajor - bMajor;
    if (aMinor !== bMinor) return aMinor - bMinor;
    return aPatch - bPatch;
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  const manager = new CompatibilityMatrixManager();
  
  switch (command) {
    case 'add': {
      const options = {};
      for (let i = 1; i < args.length; i += 2) {
        const key = args[i].replace('--', '');
        const value = args[i + 1];
        
        if (key === 'compatible') {
          options.compatibleWith = options.compatibleWith || [];
          options.compatibleWith.push(value);
        } else if (key === 'breaking') {
          options.breakingChanges = value === 'true';
        } else if (key === 'deprecated') {
          options.deprecated = value === 'true';
        } else {
          options[key] = value;
        }
      }
      
      if (manager.addVersion(options)) {
        manager.saveMatrix();
      }
      break;
    }
    
    case 'update': {
      const version = args[1];
      const updates = {};
      for (let i = 2; i < args.length; i += 2) {
        const key = args[i].replace('--', '');
        const value = args[i + 1];
        
        if (key === 'compatible') {
          updates.compatibleWith = updates.compatibleWith || [];
          updates.compatibleWith.push(value);
        } else if (key === 'breaking') {
          updates.breakingChanges = value === 'true';
        } else if (key === 'deprecated') {
          updates.deprecated = value === 'true';
        } else {
          updates[key] = value;
        }
      }
      
      if (manager.updateVersion(version, updates)) {
        manager.saveMatrix();
      }
      break;
    }
    
    case 'validate':
      manager.validateMatrix();
      break;
      
    case 'list':
      manager.listVersions();
      break;
      
    default:
      console.log(`
MPLP Version Compatibility Matrix Manager

Usage:
  node scripts/update-compatibility-matrix.js <command> [options]

Commands:
  add --version <version> [--status <status>] [--compatible <version>] [--breaking <true|false>] [--deprecated <true|false>] [--notes <notes>]
    Add a new version to the compatibility matrix
    
  update <version> [--status <status>] [--compatible <version>] [--breaking <true|false>] [--deprecated <true|false>] [--notes <notes>]
    Update an existing version in the compatibility matrix
    
  validate
    Validate the compatibility matrix structure and references
    
  list
    List all versions in the compatibility matrix

Examples:
  node scripts/update-compatibility-matrix.js add --version v1.1.0 --status active --compatible v1.0.0
  node scripts/update-compatibility-matrix.js update v1.0.0 --status frozen
  node scripts/update-compatibility-matrix.js validate
  node scripts/update-compatibility-matrix.js list
`);
  }
}

if (require.main === module) {
  main();
}

module.exports = CompatibilityMatrixManager;