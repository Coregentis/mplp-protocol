/**
 * Backward Compatibility Checker for MPLP
 * Validates that new versions maintain compatibility with previous versions
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class CompatibilityChecker {
  constructor() {
    this.projectRoot = process.cwd();
    this.schemasDir = path.join(this.projectRoot, 'schemas');
    this.examplesDir = path.join(this.projectRoot, 'examples');
    this.compatibilityFile = path.join(this.projectRoot, 'version-compatibility.json');
    this.versionsFile = path.join(this.projectRoot, 'versions.json');
  }

  /**
   * Load compatibility matrix
   */
  loadCompatibilityMatrix() {
    if (!fs.existsSync(this.compatibilityFile)) {
      return { latest: '1.0.0', matrix: [] };
    }
    return JSON.parse(fs.readFileSync(this.compatibilityFile, 'utf8'));
  }

  /**
   * Load versions information
   */
  loadVersions() {
    if (!fs.existsSync(this.versionsFile)) {
      return [];
    }
    return JSON.parse(fs.readFileSync(this.versionsFile, 'utf8'));
  }

  /**
   * Get all schema files
   */
  getSchemaFiles() {
    const schemaFiles = [];
    
    function scanDirectory(dir) {
      if (!fs.existsSync(dir)) return;
      
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath);
        } else if (item.endsWith('.json')) {
          schemaFiles.push(fullPath);
        }
      }
    }
    
    scanDirectory(this.schemasDir);
    return schemaFiles;
  }

  /**
   * Parse schema to extract version and structure info
   */
  parseSchema(schemaPath) {
    try {
      const content = fs.readFileSync(schemaPath, 'utf8');
      const schema = JSON.parse(content);
      
      return {
        path: schemaPath,
        id: schema.$id || schema.id,
        version: schema.version || '1.0.0',
        title: schema.title,
        properties: Object.keys(schema.properties || {}),
        required: schema.required || [],
        definitions: Object.keys(schema.definitions || schema.$defs || {})
      };
    } catch (error) {
      console.warn(`Warning: Could not parse schema ${schemaPath}:`, error.message);
      return null;
    }
  }

  /**
   * Compare two schema versions for compatibility
   */
  compareSchemas(oldSchema, newSchema) {
    const issues = [];
    const warnings = [];

    // Check if schema ID changed
    if (oldSchema.id !== newSchema.id) {
      issues.push(`Schema ID changed from '${oldSchema.id}' to '${newSchema.id}'`);
    }

    // Check for removed required properties
    const removedRequired = oldSchema.required.filter(prop => !newSchema.required.includes(prop));
    if (removedRequired.length > 0) {
      issues.push(`Removed required properties: ${removedRequired.join(', ')}`);
    }

    // Check for removed properties
    const removedProperties = oldSchema.properties.filter(prop => !newSchema.properties.includes(prop));
    if (removedProperties.length > 0) {
      issues.push(`Removed properties: ${removedProperties.join(', ')}`);
    }

    // Check for new required properties (potential breaking change)
    const newRequired = newSchema.required.filter(prop => !oldSchema.required.includes(prop));
    if (newRequired.length > 0) {
      warnings.push(`New required properties: ${newRequired.join(', ')}`);
    }

    // Check for removed definitions
    const removedDefinitions = oldSchema.definitions.filter(def => !newSchema.definitions.includes(def));
    if (removedDefinitions.length > 0) {
      issues.push(`Removed definitions: ${removedDefinitions.join(', ')}`);
    }

    return { issues, warnings };
  }

  /**
   * Check compatibility between two versions
   */
  async checkVersionCompatibility(oldVersion, newVersion) {
    console.log(`\n🔍 Checking compatibility: ${oldVersion} → ${newVersion}`);
    
    const oldReleasePath = path.join(this.projectRoot, 'release', oldVersion);
    const newReleasePath = this.schemasDir; // Current schemas
    
    if (!fs.existsSync(oldReleasePath)) {
      console.warn(`Warning: Old version ${oldVersion} not found in release directory`);
      return { compatible: true, issues: [], warnings: [] };
    }

    const oldSchemasPath = path.join(oldReleasePath, 'schemas');
    if (!fs.existsSync(oldSchemasPath)) {
      console.warn(`Warning: Schemas not found for version ${oldVersion}`);
      return { compatible: true, issues: [], warnings: [] };
    }

    // Get schema files from both versions
    const oldSchemas = this.getSchemaFilesInDirectory(oldSchemasPath);
    const newSchemas = this.getSchemaFiles();

    const allIssues = [];
    const allWarnings = [];

    // Parse old schemas
    const oldSchemaParsed = {};
    for (const schemaPath of oldSchemas) {
      const parsed = this.parseSchema(schemaPath);
      if (parsed) {
        const relativePath = path.relative(oldSchemasPath, schemaPath);
        oldSchemaParsed[relativePath] = parsed;
      }
    }

    // Parse new schemas and compare
    for (const schemaPath of newSchemas) {
      const relativePath = path.relative(this.schemasDir, schemaPath);
      const newParsed = this.parseSchema(schemaPath);
      
      if (!newParsed) continue;

      if (oldSchemaParsed[relativePath]) {
        const { issues, warnings } = this.compareSchemas(oldSchemaParsed[relativePath], newParsed);
        
        if (issues.length > 0) {
          allIssues.push(`${relativePath}: ${issues.join('; ')}`);
        }
        
        if (warnings.length > 0) {
          allWarnings.push(`${relativePath}: ${warnings.join('; ')}`);
        }
      }
    }

    // Check for removed schema files
    const removedSchemas = Object.keys(oldSchemaParsed).filter(schema => 
      !fs.existsSync(path.join(this.schemasDir, schema))
    );
    
    if (removedSchemas.length > 0) {
      allIssues.push(`Removed schema files: ${removedSchemas.join(', ')}`);
    }

    const compatible = allIssues.length === 0;
    
    if (compatible) {
      console.log(`✅ Version ${newVersion} is compatible with ${oldVersion}`);
    } else {
      console.log(`❌ Version ${newVersion} has compatibility issues with ${oldVersion}`);
    }

    if (allWarnings.length > 0) {
      console.log(`⚠️  ${allWarnings.length} warnings found`);
    }

    return { compatible, issues: allIssues, warnings: allWarnings };
  }

  /**
   * Get schema files in a specific directory
   */
  getSchemaFilesInDirectory(dir) {
    const schemaFiles = [];
    
    function scanDirectory(currentDir) {
      if (!fs.existsSync(currentDir)) return;
      
      const items = fs.readdirSync(currentDir);
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath);
        } else if (item.endsWith('.json')) {
          schemaFiles.push(fullPath);
        }
      }
    }
    
    scanDirectory(dir);
    return schemaFiles;
  }

  /**
   * Validate examples against schemas
   */
  async validateExamples() {
    console.log('\n📋 Validating examples against current schemas...');
    
    try {
      execSync('npm run validate:examples', { stdio: 'inherit' });
      console.log('✅ All examples are valid');
      return true;
    } catch (error) {
      console.error('❌ Example validation failed');
      return false;
    }
  }

  /**
   * Update compatibility matrix
   */
  updateCompatibilityMatrix(version, compatibilityResults) {
    const matrix = this.loadCompatibilityMatrix();
    
    // Find existing entry or create new one
    let versionEntry = matrix.matrix.find(entry => entry.version === version);
    
    if (!versionEntry) {
      versionEntry = {
        version: version,
        status: 'active',
        compatibleWith: [],
        breakingChanges: false,
        deprecated: false,
        notes: ''
      };
      matrix.matrix.push(versionEntry);
    }

    // Update compatibility information
    versionEntry.compatibleWith = [];
    versionEntry.breakingChanges = false;
    
    for (const [oldVersion, result] of Object.entries(compatibilityResults)) {
      if (result.compatible) {
        versionEntry.compatibleWith.push(oldVersion);
      } else {
        versionEntry.breakingChanges = true;
      }
    }

    // Update latest version
    matrix.latest = version;

    // Save updated matrix
    fs.writeFileSync(this.compatibilityFile, JSON.stringify(matrix, null, 2));
    console.log('✅ Compatibility matrix updated');
  }

  /**
   * Run full compatibility check
   */
  async runFullCheck(currentVersion) {
    console.log(`🚀 Running compatibility check for version ${currentVersion}`);
    console.log('=' .repeat(60));

    const versions = this.loadVersions();
    const frozenVersions = versions.filter(v => v.status === 'frozen').map(v => v.version);
    
    if (frozenVersions.length === 0) {
      console.log('No previous versions found for compatibility checking');
      return true;
    }

    const compatibilityResults = {};
    let allCompatible = true;

    // Check against all frozen versions
    for (const oldVersion of frozenVersions) {
      const result = await this.checkVersionCompatibility(oldVersion, currentVersion);
      compatibilityResults[oldVersion] = result;
      
      if (!result.compatible) {
        allCompatible = false;
        console.log(`\n❌ Breaking changes detected compared to ${oldVersion}:`);
        result.issues.forEach(issue => console.log(`   - ${issue}`));
      }
      
      if (result.warnings.length > 0) {
        console.log(`\n⚠️  Warnings for ${oldVersion}:`);
        result.warnings.forEach(warning => console.log(`   - ${warning}`));
      }
    }

    // Validate examples
    const examplesValid = await this.validateExamples();
    
    if (!examplesValid) {
      allCompatible = false;
    }

    // Update compatibility matrix
    this.updateCompatibilityMatrix(currentVersion, compatibilityResults);

    console.log('\n' + '=' .repeat(60));
    if (allCompatible) {
      console.log(`✅ Version ${currentVersion} passed all compatibility checks`);
    } else {
      console.log(`❌ Version ${currentVersion} has compatibility issues`);
    }

    return allCompatible;
  }

  /**
   * Main execution function
   */
  async run() {
    const args = process.argv.slice(2);
    const version = args.find(arg => arg.startsWith('--version='))?.split('=')[1];
    
    if (!version) {
      console.error('❌ Version is required. Use --version=v1.0.3');
      process.exit(1);
    }

    const success = await this.runFullCheck(version);
    process.exit(success ? 0 : 1);
  }
}

// Run if called directly
if (require.main === module) {
  const checker = new CompatibilityChecker();
  checker.run().catch(console.error);
}

module.exports = CompatibilityChecker;