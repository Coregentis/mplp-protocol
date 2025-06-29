#!/usr/bin/env node
/**
 * MPLP Document Quality Monitor
 * 监控文档质量，包括完整性、一致性和翻译质量检查
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class DocumentQualityMonitor {
    constructor(config = {}) {
        this.config = {
            docsPath: config.docsPath || './docs',
            languages: config.languages || ['en', 'zh', 'ja'],
            requiredSections: config.requiredSections || [
                'introduction',
                'specification',
                'examples',
                'implementation'
            ],
            outputPath: config.outputPath || './reports/doc-quality-report.json',
            ...config
        };
        this.results = {
            timestamp: new Date().toISOString(),
            overall: { score: 0, status: 'unknown' },
            completeness: { score: 0, issues: [] },
            consistency: { score: 0, issues: [] },
            translation: { score: 0, issues: [] },
            links: { score: 0, issues: [] }
        };
    }

    async runAllChecks() {
        console.log('🔍 Starting document quality monitoring...');
        
        try {
            await this.checkCompleteness();
            await this.checkConsistency();
            await this.checkTranslationQuality();
            await this.checkLinks();
            
            this.calculateOverallScore();
            await this.generateReport();
            
            console.log(`✅ Document quality check completed. Overall score: ${this.results.overall.score}/100`);
            return this.results;
        } catch (error) {
            console.error('❌ Document quality check failed:', error.message);
            throw error;
        }
    }

    async checkCompleteness() {
        console.log('📋 Checking document completeness...');
        const issues = [];
        let totalSections = 0;
        let foundSections = 0;

        for (const lang of this.config.languages) {
            const langPath = path.join(this.config.docsPath, lang);
            if (!fs.existsSync(langPath)) {
                issues.push({
                    type: 'missing_language',
                    language: lang,
                    severity: 'high',
                    message: `Missing documentation for language: ${lang}`
                });
                continue;
            }

            for (const section of this.config.requiredSections) {
                totalSections++;
                const sectionFile = path.join(langPath, `${section}.md`);
                if (fs.existsSync(sectionFile)) {
                    foundSections++;
                    // Check if file is not empty
                    const content = fs.readFileSync(sectionFile, 'utf8');
                    if (content.trim().length < 100) {
                        issues.push({
                            type: 'incomplete_section',
                            language: lang,
                            section: section,
                            severity: 'medium',
                            message: `Section ${section} in ${lang} appears incomplete (< 100 characters)`
                        });
                    }
                } else {
                    issues.push({
                        type: 'missing_section',
                        language: lang,
                        section: section,
                        severity: 'high',
                        message: `Missing section: ${section} in ${lang}`
                    });
                }
            }
        }

        const score = totalSections > 0 ? Math.round((foundSections / totalSections) * 100) : 0;
        this.results.completeness = { score, issues };
        console.log(`📋 Completeness check: ${score}/100 (${foundSections}/${totalSections} sections found)`);
    }

    async checkConsistency() {
        console.log('🔄 Checking document consistency...');
        const issues = [];
        const baseLanguage = this.config.languages[0]; // Usually 'en'
        
        for (const section of this.config.requiredSections) {
            const baseFile = path.join(this.config.docsPath, baseLanguage, `${section}.md`);
            if (!fs.existsSync(baseFile)) continue;

            const baseContent = fs.readFileSync(baseFile, 'utf8');
            const baseHeaders = this.extractHeaders(baseContent);
            const baseCodeBlocks = this.extractCodeBlocks(baseContent);

            for (const lang of this.config.languages.slice(1)) {
                const langFile = path.join(this.config.docsPath, lang, `${section}.md`);
                if (!fs.existsSync(langFile)) continue;

                const langContent = fs.readFileSync(langFile, 'utf8');
                const langHeaders = this.extractHeaders(langContent);
                const langCodeBlocks = this.extractCodeBlocks(langContent);

                // Check header structure consistency
                if (baseHeaders.length !== langHeaders.length) {
                    issues.push({
                        type: 'header_mismatch',
                        section: section,
                        baseLanguage: baseLanguage,
                        targetLanguage: lang,
                        severity: 'medium',
                        message: `Header count mismatch in ${section}: ${baseLanguage}(${baseHeaders.length}) vs ${lang}(${langHeaders.length})`
                    });
                }

                // Check code block consistency
                if (baseCodeBlocks.length !== langCodeBlocks.length) {
                    issues.push({
                        type: 'code_block_mismatch',
                        section: section,
                        baseLanguage: baseLanguage,
                        targetLanguage: lang,
                        severity: 'high',
                        message: `Code block count mismatch in ${section}: ${baseLanguage}(${baseCodeBlocks.length}) vs ${lang}(${langCodeBlocks.length})`
                    });
                }
            }
        }

        const totalChecks = this.config.requiredSections.length * (this.config.languages.length - 1) * 2;
        const score = totalChecks > 0 ? Math.max(0, Math.round((1 - issues.length / totalChecks) * 100)) : 100;
        this.results.consistency = { score, issues };
        console.log(`🔄 Consistency check: ${score}/100 (${issues.length} issues found)`);
    }

    async checkTranslationQuality() {
        console.log('🌐 Checking translation quality...');
        const issues = [];
        const baseLanguage = this.config.languages[0];

        for (const section of this.config.requiredSections) {
            const baseFile = path.join(this.config.docsPath, baseLanguage, `${section}.md`);
            if (!fs.existsSync(baseFile)) continue;

            const baseContent = fs.readFileSync(baseFile, 'utf8');
            const baseWordCount = baseContent.split(/\s+/).length;

            for (const lang of this.config.languages.slice(1)) {
                const langFile = path.join(this.config.docsPath, lang, `${section}.md`);
                if (!fs.existsSync(langFile)) continue;

                const langContent = fs.readFileSync(langFile, 'utf8');
                const langWordCount = langContent.split(/\s+/).length;

                // Check for significant word count differences (may indicate incomplete translation)
                const wordCountRatio = langWordCount / baseWordCount;
                if (wordCountRatio < 0.7 || wordCountRatio > 1.5) {
                    issues.push({
                        type: 'translation_length_mismatch',
                        section: section,
                        baseLanguage: baseLanguage,
                        targetLanguage: lang,
                        severity: 'medium',
                        message: `Significant word count difference in ${section}: ${baseLanguage}(${baseWordCount}) vs ${lang}(${langWordCount}), ratio: ${wordCountRatio.toFixed(2)}`
                    });
                }

                // Check for untranslated English text in non-English documents
                if (lang !== 'en') {
                    const englishPattern = /\b[A-Za-z]{4,}\b/g;
                    const englishMatches = langContent.match(englishPattern) || [];
                    const englishRatio = englishMatches.length / langWordCount;
                    
                    if (englishRatio > 0.3) {
                        issues.push({
                            type: 'untranslated_content',
                            section: section,
                            targetLanguage: lang,
                            severity: 'medium',
                            message: `High ratio of English text in ${lang} document: ${(englishRatio * 100).toFixed(1)}%`
                        });
                    }
                }
            }
        }

        const totalChecks = this.config.requiredSections.length * (this.config.languages.length - 1) * 2;
        const score = totalChecks > 0 ? Math.max(0, Math.round((1 - issues.length / totalChecks) * 100)) : 100;
        this.results.translation = { score, issues };
        console.log(`🌐 Translation quality check: ${score}/100 (${issues.length} issues found)`);
    }

    async checkLinks() {
        console.log('🔗 Checking document links...');
        const issues = [];
        const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

        for (const lang of this.config.languages) {
            const langPath = path.join(this.config.docsPath, lang);
            if (!fs.existsSync(langPath)) continue;

            for (const section of this.config.requiredSections) {
                const sectionFile = path.join(langPath, `${section}.md`);
                if (!fs.existsSync(sectionFile)) continue;

                const content = fs.readFileSync(sectionFile, 'utf8');
                let match;
                
                while ((match = linkPattern.exec(content)) !== null) {
                    const [fullMatch, linkText, linkUrl] = match;
                    
                    // Check internal links
                    if (linkUrl.startsWith('./') || linkUrl.startsWith('../')) {
                        const resolvedPath = path.resolve(path.dirname(sectionFile), linkUrl);
                        if (!fs.existsSync(resolvedPath)) {
                            issues.push({
                                type: 'broken_internal_link',
                                section: section,
                                language: lang,
                                linkText: linkText,
                                linkUrl: linkUrl,
                                severity: 'high',
                                message: `Broken internal link in ${section} (${lang}): ${linkText} -> ${linkUrl}`
                            });
                        }
                    }
                    
                    // Check for empty links
                    if (!linkUrl.trim()) {
                        issues.push({
                            type: 'empty_link',
                            section: section,
                            language: lang,
                            linkText: linkText,
                            severity: 'medium',
                            message: `Empty link in ${section} (${lang}): ${linkText}`
                        });
                    }
                }
            }
        }

        const totalSections = this.config.languages.length * this.config.requiredSections.length;
        const score = totalSections > 0 ? Math.max(0, Math.round((1 - issues.length / (totalSections * 2)) * 100)) : 100;
        this.results.links = { score, issues };
        console.log(`🔗 Link check: ${score}/100 (${issues.length} issues found)`);
    }

    extractHeaders(content) {
        const headerPattern = /^#{1,6}\s+(.+)$/gm;
        const headers = [];
        let match;
        
        while ((match = headerPattern.exec(content)) !== null) {
            headers.push(match[1].trim());
        }
        
        return headers;
    }

    extractCodeBlocks(content) {
        const codeBlockPattern = /```[\s\S]*?```/g;
        return content.match(codeBlockPattern) || [];
    }

    calculateOverallScore() {
        const weights = {
            completeness: 0.3,
            consistency: 0.25,
            translation: 0.25,
            links: 0.2
        };

        const weightedScore = 
            this.results.completeness.score * weights.completeness +
            this.results.consistency.score * weights.consistency +
            this.results.translation.score * weights.translation +
            this.results.links.score * weights.links;

        this.results.overall.score = Math.round(weightedScore);
        
        if (this.results.overall.score >= 90) {
            this.results.overall.status = 'excellent';
        } else if (this.results.overall.score >= 75) {
            this.results.overall.status = 'good';
        } else if (this.results.overall.score >= 60) {
            this.results.overall.status = 'fair';
        } else {
            this.results.overall.status = 'poor';
        }
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
        const { overall, completeness, consistency, translation, links } = this.results;
        
        return `# Document Quality Report

**Generated:** ${this.results.timestamp}
**Overall Score:** ${overall.score}/100 (${overall.status})

## Summary

| Category | Score | Issues |
|----------|-------|--------|
| Completeness | ${completeness.score}/100 | ${completeness.issues.length} |
| Consistency | ${consistency.score}/100 | ${consistency.issues.length} |
| Translation | ${translation.score}/100 | ${translation.issues.length} |
| Links | ${links.score}/100 | ${links.issues.length} |

## Issues by Category

### Completeness Issues
${this.formatIssues(completeness.issues)}

### Consistency Issues
${this.formatIssues(consistency.issues)}

### Translation Issues
${this.formatIssues(translation.issues)}

### Link Issues
${this.formatIssues(links.issues)}

## Recommendations

${this.generateRecommendations()}
`;
    }

    formatIssues(issues) {
        if (issues.length === 0) {
            return '✅ No issues found.\n';
        }
        
        return issues.map(issue => 
            `- **${issue.severity.toUpperCase()}**: ${issue.message}`
        ).join('\n') + '\n';
    }

    generateRecommendations() {
        const recommendations = [];
        
        if (this.results.completeness.score < 80) {
            recommendations.push('📋 **Improve Completeness**: Add missing documentation sections and expand incomplete content.');
        }
        
        if (this.results.consistency.score < 80) {
            recommendations.push('🔄 **Enhance Consistency**: Align document structure and code examples across all languages.');
        }
        
        if (this.results.translation.score < 80) {
            recommendations.push('🌐 **Improve Translations**: Review and complete translations, ensure proper localization.');
        }
        
        if (this.results.links.score < 80) {
            recommendations.push('🔗 **Fix Links**: Repair broken links and ensure all references are valid.');
        }
        
        if (recommendations.length === 0) {
            recommendations.push('🎉 **Excellent Work**: Documentation quality is high. Continue maintaining current standards.');
        }
        
        return recommendations.join('\n\n');
    }
}

// CLI usage
if (require.main === module) {
    const configPath = process.argv[2] || './config/monitoring-config.json';
    let config = {};
    
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8')).documentQuality || {};
    }
    
    const monitor = new DocumentQualityMonitor(config);
    monitor.runAllChecks().catch(error => {
        console.error('Failed to run document quality check:', error);
        process.exit(1);
    });
}

module.exports = DocumentQualityMonitor;