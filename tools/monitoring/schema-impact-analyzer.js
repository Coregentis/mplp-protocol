#!/usr/bin/env node
/**
 * MPLP Schema Impact Analyzer
 * 分析Schema变更对现有实现的影响
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SchemaImpactAnalyzer {
    constructor(config = {}) {
        this.config = {
            schemaPath: config.schemaPath || './schema',
            versionsToCompare: config.versionsToCompare || 2,
            outputPath: config.outputPath || './reports/schema-impact-report.json',
            gitRepo: config.gitRepo || '.',
            ...config
        };
        this.results = {
            timestamp: new Date().toISOString(),
            comparison: null,
            impact: {
                breaking: [],
                nonBreaking: [],
                additions: [],
                deprecations: []
            },
            compatibility: {
                backward: 'unknown',
                forward: 'unknown',
                score: 0
            },
            recommendations: []
        };
    }

    async analyzeImpact(baseVersion = null, targetVersion = null) {
        console.log('🔍 Starting Schema impact analysis...');
        
        try {
            const versions = await this.getVersions(baseVersion, targetVersion);
            this.results.comparison = {
                baseVersion: versions.base,
                targetVersion: versions.target
            };
            
            const baseSchema = await this.loadSchema(versions.base);
            const targetSchema = await this.loadSchema(versions.target);
            
            await this.compareSchemas(baseSchema, targetSchema);
            await this.assessCompatibility();
            await this.generateRecommendations();
            await this.generateReport();
            
            console.log(`✅ Schema impact analysis completed.`);
            console.log(`   Breaking changes: ${this.results.impact.breaking.length}`);
            console.log(`   Non-breaking changes: ${this.results.impact.nonBreaking.length}`);
            console.log(`   Compatibility score: ${this.results.compatibility.score}/100`);
            
            return this.results;
        } catch (error) {
            console.error('❌ Schema impact analysis failed:', error.message);
            throw error;
        }
    }

    async getVersions(baseVersion, targetVersion) {
        if (baseVersion && targetVersion) {
            return { base: baseVersion, target: targetVersion };
        }
        
        try {
            // Get recent git tags
            const tags = execSync('git tag --sort=-version:refname', { 
                cwd: this.config.gitRepo,
                encoding: 'utf8' 
            }).trim().split('\n').filter(tag => tag.trim());
            
            if (tags.length < 2) {
                throw new Error('Need at least 2 git tags to compare versions');
            }
            
            return {
                base: baseVersion || tags[1], // Previous version
                target: targetVersion || tags[0] // Latest version
            };
        } catch (error) {
            // Fallback to comparing with HEAD and HEAD~1
            return {
                base: baseVersion || 'HEAD~1',
                target: targetVersion || 'HEAD'
            };
        }
    }

    async loadSchema(version) {
        console.log(`📖 Loading schema for version: ${version}`);
        
        try {
            let schemaContent;
            
            if (version === 'HEAD' || version === 'current') {
                // Load current schema
                const schemaFiles = this.findSchemaFiles(this.config.schemaPath);
                schemaContent = this.combineSchemaFiles(schemaFiles);
            } else {
                // Load schema from git version
                const schemaFiles = this.findSchemaFiles(this.config.schemaPath);
                schemaContent = {};
                
                for (const file of schemaFiles) {
                    try {
                        const content = execSync(`git show ${version}:${file}`, {
                            cwd: this.config.gitRepo,
                            encoding: 'utf8'
                        });
                        const relativePath = path.relative(this.config.schemaPath, file);
                        schemaContent[relativePath] = JSON.parse(content);
                    } catch (error) {
                        console.warn(`⚠️  Could not load ${file} from version ${version}:`, error.message);
                    }
                }
            }
            
            return schemaContent;
        } catch (error) {
            throw new Error(`Failed to load schema for version ${version}: ${error.message}`);
        }
    }

    findSchemaFiles(schemaPath) {
        const files = [];
        
        if (!fs.existsSync(schemaPath)) {
            return files;
        }
        
        const traverse = (dir) => {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    traverse(fullPath);
                } else if (item.endsWith('.json') && !item.includes('test')) {
                    files.push(fullPath);
                }
            }
        };
        
        traverse(schemaPath);
        return files;
    }

    combineSchemaFiles(schemaFiles) {
        const combined = {};
        
        for (const file of schemaFiles) {
            try {
                const content = JSON.parse(fs.readFileSync(file, 'utf8'));
                const relativePath = path.relative(this.config.schemaPath, file);
                combined[relativePath] = content;
            } catch (error) {
                console.warn(`⚠️  Could not parse schema file ${file}:`, error.message);
            }
        }
        
        return combined;
    }

    async compareSchemas(baseSchema, targetSchema) {
        console.log('🔄 Comparing schemas...');
        
        // Compare each schema file
        const allFiles = new Set([...Object.keys(baseSchema), ...Object.keys(targetSchema)]);
        
        for (const file of allFiles) {
            const baseFileSchema = baseSchema[file];
            const targetFileSchema = targetSchema[file];
            
            if (!baseFileSchema && targetFileSchema) {
                // New schema file added
                this.results.impact.additions.push({
                    type: 'schema_file_added',
                    file: file,
                    severity: 'low',
                    description: `New schema file added: ${file}`
                });
            } else if (baseFileSchema && !targetFileSchema) {
                // Schema file removed
                this.results.impact.breaking.push({
                    type: 'schema_file_removed',
                    file: file,
                    severity: 'high',
                    description: `Schema file removed: ${file}`
                });
            } else if (baseFileSchema && targetFileSchema) {
                // Compare schema content
                this.compareSchemaContent(file, baseFileSchema, targetFileSchema);
            }
        }
    }

    compareSchemaContent(file, baseSchema, targetSchema) {
        // Compare properties
        this.compareProperties(file, baseSchema.properties || {}, targetSchema.properties || {});
        
        // Compare required fields
        this.compareRequired(file, baseSchema.required || [], targetSchema.required || []);
        
        // Compare definitions
        this.compareDefinitions(file, baseSchema.definitions || {}, targetSchema.definitions || {});
        
        // Compare schema metadata
        this.compareMetadata(file, baseSchema, targetSchema);
    }

    compareProperties(file, baseProps, targetProps) {
        const allProps = new Set([...Object.keys(baseProps), ...Object.keys(targetProps)]);
        
        for (const prop of allProps) {
            const baseProp = baseProps[prop];
            const targetProp = targetProps[prop];
            
            if (!baseProp && targetProp) {
                // New property added
                this.results.impact.additions.push({
                    type: 'property_added',
                    file: file,
                    property: prop,
                    severity: 'low',
                    description: `New property added: ${prop} in ${file}`
                });
            } else if (baseProp && !targetProp) {
                // Property removed
                this.results.impact.breaking.push({
                    type: 'property_removed',
                    file: file,
                    property: prop,
                    severity: 'high',
                    description: `Property removed: ${prop} from ${file}`
                });
            } else if (baseProp && targetProp) {
                // Property modified
                this.comparePropertyDetails(file, prop, baseProp, targetProp);
            }
        }
    }

    comparePropertyDetails(file, propName, baseProp, targetProp) {
        // Compare type
        if (baseProp.type !== targetProp.type) {
            this.results.impact.breaking.push({
                type: 'property_type_changed',
                file: file,
                property: propName,
                severity: 'high',
                description: `Property type changed: ${propName} from ${baseProp.type} to ${targetProp.type} in ${file}`,
                details: {
                    oldType: baseProp.type,
                    newType: targetProp.type
                }
            });
        }
        
        // Compare format
        if (baseProp.format !== targetProp.format) {
            const severity = this.isFormatChangeBreaking(baseProp.format, targetProp.format) ? 'high' : 'medium';
            this.results.impact[severity === 'high' ? 'breaking' : 'nonBreaking'].push({
                type: 'property_format_changed',
                file: file,
                property: propName,
                severity: severity,
                description: `Property format changed: ${propName} from ${baseProp.format || 'none'} to ${targetProp.format || 'none'} in ${file}`,
                details: {
                    oldFormat: baseProp.format,
                    newFormat: targetProp.format
                }
            });
        }
        
        // Compare enum values
        if (baseProp.enum && targetProp.enum) {
            const removedValues = baseProp.enum.filter(val => !targetProp.enum.includes(val));
            const addedValues = targetProp.enum.filter(val => !baseProp.enum.includes(val));
            
            if (removedValues.length > 0) {
                this.results.impact.breaking.push({
                    type: 'enum_values_removed',
                    file: file,
                    property: propName,
                    severity: 'high',
                    description: `Enum values removed from ${propName} in ${file}: ${removedValues.join(', ')}`,
                    details: {
                        removedValues: removedValues
                    }
                });
            }
            
            if (addedValues.length > 0) {
                this.results.impact.additions.push({
                    type: 'enum_values_added',
                    file: file,
                    property: propName,
                    severity: 'low',
                    description: `Enum values added to ${propName} in ${file}: ${addedValues.join(', ')}`,
                    details: {
                        addedValues: addedValues
                    }
                });
            }
        }
    }

    compareRequired(file, baseRequired, targetRequired) {
        const removedRequired = baseRequired.filter(field => !targetRequired.includes(field));
        const addedRequired = targetRequired.filter(field => !baseRequired.includes(field));
        
        if (removedRequired.length > 0) {
            this.results.impact.nonBreaking.push({
                type: 'required_fields_removed',
                file: file,
                severity: 'medium',
                description: `Required fields made optional in ${file}: ${removedRequired.join(', ')}`,
                details: {
                    removedRequired: removedRequired
                }
            });
        }
        
        if (addedRequired.length > 0) {
            this.results.impact.breaking.push({
                type: 'required_fields_added',
                file: file,
                severity: 'high',
                description: `New required fields added in ${file}: ${addedRequired.join(', ')}`,
                details: {
                    addedRequired: addedRequired
                }
            });
        }
    }

    compareDefinitions(file, baseDefinitions, targetDefinitions) {
        const allDefs = new Set([...Object.keys(baseDefinitions), ...Object.keys(targetDefinitions)]);
        
        for (const def of allDefs) {
            const baseDef = baseDefinitions[def];
            const targetDef = targetDefinitions[def];
            
            if (!baseDef && targetDef) {
                this.results.impact.additions.push({
                    type: 'definition_added',
                    file: file,
                    definition: def,
                    severity: 'low',
                    description: `New definition added: ${def} in ${file}`
                });
            } else if (baseDef && !targetDef) {
                this.results.impact.breaking.push({
                    type: 'definition_removed',
                    file: file,
                    definition: def,
                    severity: 'high',
                    description: `Definition removed: ${def} from ${file}`
                });
            }
        }
    }

    compareMetadata(file, baseSchema, targetSchema) {
        // Compare version
        if (baseSchema.version !== targetSchema.version) {
            this.results.impact.nonBreaking.push({
                type: 'version_changed',
                file: file,
                severity: 'low',
                description: `Schema version changed in ${file}: ${baseSchema.version} → ${targetSchema.version}`,
                details: {
                    oldVersion: baseSchema.version,
                    newVersion: targetSchema.version
                }
            });
        }
        
        // Compare title/description
        if (baseSchema.title !== targetSchema.title) {
            this.results.impact.nonBreaking.push({
                type: 'title_changed',
                file: file,
                severity: 'low',
                description: `Schema title changed in ${file}`
            });
        }
    }

    isFormatChangeBreaking(oldFormat, newFormat) {
        // Define format compatibility rules
        const compatibilityMatrix = {
            'date-time': ['date'],
            'date': [],
            'email': [],
            'uri': ['url'],
            'url': []
        };
        
        if (!oldFormat || !newFormat) return false;
        
        const compatible = compatibilityMatrix[oldFormat] || [];
        return !compatible.includes(newFormat);
    }

    async assessCompatibility() {
        console.log('🔍 Assessing compatibility...');
        
        const breakingCount = this.results.impact.breaking.length;
        const nonBreakingCount = this.results.impact.nonBreaking.length;
        const totalChanges = breakingCount + nonBreakingCount;
        
        // Backward compatibility
        if (breakingCount === 0) {
            this.results.compatibility.backward = 'full';
        } else if (breakingCount <= 2 && totalChanges > 5) {
            this.results.compatibility.backward = 'partial';
        } else {
            this.results.compatibility.backward = 'none';
        }
        
        // Forward compatibility (simplified assessment)
        const additionsCount = this.results.impact.additions.length;
        if (additionsCount === 0) {
            this.results.compatibility.forward = 'full';
        } else if (additionsCount <= 3) {
            this.results.compatibility.forward = 'partial';
        } else {
            this.results.compatibility.forward = 'limited';
        }
        
        // Calculate compatibility score
        let score = 100;
        score -= breakingCount * 20; // Each breaking change -20 points
        score -= nonBreakingCount * 5; // Each non-breaking change -5 points
        score = Math.max(0, score);
        
        this.results.compatibility.score = score;
    }

    async generateRecommendations() {
        const recommendations = [];
        
        if (this.results.impact.breaking.length > 0) {
            recommendations.push({
                type: 'breaking_changes',
                priority: 'high',
                title: 'Address Breaking Changes',
                description: 'Review and document all breaking changes. Consider providing migration guides.',
                actions: [
                    'Create migration documentation',
                    'Implement backward compatibility layer if possible',
                    'Update version number appropriately (major version bump)',
                    'Notify users about breaking changes'
                ]
            });
        }
        
        if (this.results.compatibility.score < 70) {
            recommendations.push({
                type: 'compatibility',
                priority: 'medium',
                title: 'Improve Compatibility',
                description: 'Consider reducing the impact of changes to maintain better compatibility.',
                actions: [
                    'Review if breaking changes are necessary',
                    'Consider deprecation warnings before removal',
                    'Implement feature flags for new functionality'
                ]
            });
        }
        
        if (this.results.impact.additions.length > 5) {
            recommendations.push({
                type: 'additions',
                priority: 'low',
                title: 'Document New Features',
                description: 'Ensure all new additions are properly documented.',
                actions: [
                    'Update documentation for new properties',
                    'Provide examples for new features',
                    'Update changelog with new additions'
                ]
            });
        }
        
        this.results.recommendations = recommendations;
    }

    async generateReport() {
        const reportDir = path.dirname(this.config.outputPath);
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }
        
        // Generate JSON report
        fs.writeFileSync(this.config.outputPath, JSON.stringify(this.results, null, 2));
        
        // Generate human-readable summary
        const summaryPath = this.config.outputPath.replace('.json', '-summary.md');
        const summary = this.generateSummaryMarkdown();
        fs.writeFileSync(summaryPath, summary);
        
        console.log(`📊 Reports generated:`);
        console.log(`   - JSON: ${this.config.outputPath}`);
        console.log(`   - Summary: ${summaryPath}`);
    }

    generateSummaryMarkdown() {
        const { comparison, impact, compatibility, recommendations } = this.results;
        
        return `# Schema Impact Analysis Report

**Generated:** ${this.results.timestamp}
**Comparison:** ${comparison.baseVersion} → ${comparison.targetVersion}
**Compatibility Score:** ${compatibility.score}/100

## Summary

| Impact Type | Count | Severity |
|-------------|-------|----------|
| Breaking Changes | ${impact.breaking.length} | High |
| Non-Breaking Changes | ${impact.nonBreaking.length} | Medium |
| Additions | ${impact.additions.length} | Low |
| Deprecations | ${impact.deprecations.length} | Medium |

## Compatibility Assessment

- **Backward Compatibility:** ${compatibility.backward}
- **Forward Compatibility:** ${compatibility.forward}
- **Overall Score:** ${compatibility.score}/100

## Breaking Changes

${this.formatChanges(impact.breaking)}

## Non-Breaking Changes

${this.formatChanges(impact.nonBreaking)}

## Additions

${this.formatChanges(impact.additions)}

## Recommendations

${this.formatRecommendations(recommendations)}

## Migration Guide

${this.generateMigrationGuide()}
`;
    }

    formatChanges(changes) {
        if (changes.length === 0) {
            return '✅ No changes in this category.\n';
        }
        
        return changes.map(change => 
            `- **${change.type}** (${change.severity}): ${change.description}`
        ).join('\n') + '\n';
    }

    formatRecommendations(recommendations) {
        if (recommendations.length === 0) {
            return '✅ No specific recommendations at this time.\n';
        }
        
        return recommendations.map(rec => 
            `### ${rec.title} (${rec.priority} priority)\n\n${rec.description}\n\n**Actions:**\n${rec.actions.map(action => `- ${action}`).join('\n')}`
        ).join('\n\n') + '\n';
    }

    generateMigrationGuide() {
        const breakingChanges = this.results.impact.breaking;
        
        if (breakingChanges.length === 0) {
            return '✅ No migration required - all changes are backward compatible.\n';
        }
        
        let guide = 'The following changes require attention when migrating:\n\n';
        
        breakingChanges.forEach((change, index) => {
            guide += `${index + 1}. **${change.type}**: ${change.description}\n`;
            if (change.details) {
                guide += `   - Details: ${JSON.stringify(change.details, null, 2)}\n`;
            }
            guide += '\n';
        });
        
        return guide;
    }
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    const baseVersion = args[0];
    const targetVersion = args[1];
    const configPath = args[2] || './config/monitoring-config.json';
    
    let config = {};
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8')).schemaImpact || {};
    }
    
    const analyzer = new SchemaImpactAnalyzer(config);
    analyzer.analyzeImpact(baseVersion, targetVersion).catch(error => {
        console.error('Failed to analyze schema impact:', error);
        process.exit(1);
    });
}

module.exports = SchemaImpactAnalyzer;