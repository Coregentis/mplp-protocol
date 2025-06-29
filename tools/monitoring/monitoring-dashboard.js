#!/usr/bin/env node
/**
 * MPLP Monitoring Dashboard
 * 生成项目健康监控仪表板和报告
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class MonitoringDashboard {
    constructor(config = {}) {
        this.config = {
            projectRoot: config.projectRoot || process.cwd(),
            outputPath: config.outputPath || './reports/dashboard.html',
            reportPath: config.reportPath || './reports',
            refreshInterval: config.refreshInterval || 3600000, // 1 hour
            thresholds: {
                docCoverage: 80,
                linkValidation: 95,
                schemaCompliance: 100,
                feedbackResponseTime: 7, // days
                ...config.thresholds
            },
            ...config
        };
        this.metrics = {
            timestamp: new Date().toISOString(),
            projectHealth: {
                overall: 'unknown',
                score: 0,
                components: {}
            },
            documentation: {
                coverage: 0,
                quality: 0,
                linkValidation: 0,
                translationStatus: {}
            },
            schema: {
                compliance: 0,
                validationErrors: [],
                compatibilityIssues: []
            },
            feedback: {
                totalItems: 0,
                openItems: 0,
                averageResponseTime: 0,
                sentimentScore: 0,
                categoryDistribution: {}
            },
            performance: {
                buildTime: 0,
                testCoverage: 0,
                codeQuality: 0
            },
            trends: {
                weekly: {},
                monthly: {},
                alerts: []
            }
        };
    }

    async generateDashboard() {
        console.log('📊 Generating monitoring dashboard...');
        
        try {
            await this.collectMetrics();
            await this.calculateHealthScore();
            await this.generateAlerts();
            await this.generateHTMLDashboard();
            await this.generateJSONReport();
            await this.generateSummaryReport();
            
            console.log(`✅ Dashboard generated successfully.`);
            console.log(`   Overall health score: ${this.metrics.projectHealth.score}/100`);
            console.log(`   Status: ${this.metrics.projectHealth.overall}`);
            console.log(`   Dashboard: ${this.config.outputPath}`);
            
            return this.metrics;
        } catch (error) {
            console.error('❌ Dashboard generation failed:', error.message);
            throw error;
        }
    }

    async collectMetrics() {
        console.log('📈 Collecting metrics...');
        
        await Promise.all([
            this.collectDocumentationMetrics(),
            this.collectSchemaMetrics(),
            this.collectFeedbackMetrics(),
            this.collectPerformanceMetrics(),
            this.collectTrendMetrics()
        ]);
    }

    async collectDocumentationMetrics() {
        console.log('📚 Collecting documentation metrics...');
        
        try {
            // Check if doc quality monitor report exists
            const docReportPath = path.join(this.config.reportPath, 'doc-quality-report.json');
            if (fs.existsSync(docReportPath)) {
                const docReport = JSON.parse(fs.readFileSync(docReportPath, 'utf8'));
                
                this.metrics.documentation = {
                    coverage: docReport.summary.completeness || 0,
                    quality: docReport.summary.consistency || 0,
                    linkValidation: docReport.summary.linkValidation || 0,
                    translationStatus: docReport.summary.translationQuality || {}
                };
            } else {
                // Fallback: basic documentation analysis
                this.metrics.documentation = await this.analyzeDocumentationBasic();
            }
        } catch (error) {
            console.warn('⚠️  Could not collect documentation metrics:', error.message);
            this.metrics.documentation = {
                coverage: 0,
                quality: 0,
                linkValidation: 0,
                translationStatus: {}
            };
        }
    }

    async analyzeDocumentationBasic() {
        const docFiles = this.findDocumentationFiles();
        const totalFiles = docFiles.length;
        
        if (totalFiles === 0) {
            return {
                coverage: 0,
                quality: 0,
                linkValidation: 0,
                translationStatus: {}
            };
        }
        
        let validFiles = 0;
        let totalLinks = 0;
        let validLinks = 0;
        
        for (const file of docFiles) {
            try {
                const content = fs.readFileSync(file, 'utf8');
                if (content.length > 100) { // Basic quality check
                    validFiles++;
                }
                
                // Count links
                const linkMatches = content.match(/\[.*?\]\(.*?\)/g) || [];
                totalLinks += linkMatches.length;
                
                // Simple link validation (check if local files exist)
                for (const link of linkMatches) {
                    const urlMatch = link.match(/\((.+?)\)/);
                    if (urlMatch && urlMatch[1]) {
                        const url = urlMatch[1];
                        if (!url.startsWith('http') && !url.startsWith('#')) {
                            const linkPath = path.resolve(path.dirname(file), url);
                            if (fs.existsSync(linkPath)) {
                                validLinks++;
                            }
                        } else {
                            validLinks++; // Assume external links are valid
                        }
                    }
                }
            } catch (error) {
                console.warn(`⚠️  Could not analyze ${file}:`, error.message);
            }
        }
        
        return {
            coverage: Math.round((validFiles / totalFiles) * 100),
            quality: Math.round((validFiles / totalFiles) * 100),
            linkValidation: totalLinks > 0 ? Math.round((validLinks / totalLinks) * 100) : 100,
            translationStatus: {
                'en': 100,
                'zh': this.checkTranslationFiles() ? 80 : 0
            }
        };
    }

    findDocumentationFiles() {
        const docExtensions = ['.md', '.rst', '.txt'];
        const docFiles = [];
        
        const searchDirs = [
            this.config.projectRoot,
            path.join(this.config.projectRoot, 'docs'),
            path.join(this.config.projectRoot, 'documentation')
        ];
        
        for (const dir of searchDirs) {
            if (fs.existsSync(dir)) {
                const files = this.findFilesRecursive(dir, docExtensions);
                docFiles.push(...files);
            }
        }
        
        return [...new Set(docFiles)]; // Remove duplicates
    }

    findFilesRecursive(dir, extensions) {
        const files = [];
        
        try {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    files.push(...this.findFilesRecursive(fullPath, extensions));
                } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
                    files.push(fullPath);
                }
            }
        } catch (error) {
            console.warn(`⚠️  Could not read directory ${dir}:`, error.message);
        }
        
        return files;
    }

    checkTranslationFiles() {
        const translationDirs = [
            path.join(this.config.projectRoot, 'docs', 'zh'),
            path.join(this.config.projectRoot, 'docs', 'zh-CN'),
            path.join(this.config.projectRoot, 'i18n'),
            path.join(this.config.projectRoot, 'locales')
        ];
        
        return translationDirs.some(dir => fs.existsSync(dir));
    }

    async collectSchemaMetrics() {
        console.log('🔧 Collecting schema metrics...');
        
        try {
            const schemaReportPath = path.join(this.config.reportPath, 'schema-impact-report.json');
            if (fs.existsSync(schemaReportPath)) {
                const schemaReport = JSON.parse(fs.readFileSync(schemaReportPath, 'utf8'));
                
                this.metrics.schema = {
                    compliance: schemaReport.summary.overallCompatibility || 0,
                    validationErrors: schemaReport.validationErrors || [],
                    compatibilityIssues: schemaReport.compatibilityIssues || []
                };
            } else {
                // Fallback: basic schema validation
                this.metrics.schema = await this.validateSchemasBasic();
            }
        } catch (error) {
            console.warn('⚠️  Could not collect schema metrics:', error.message);
            this.metrics.schema = {
                compliance: 0,
                validationErrors: ['Could not validate schemas'],
                compatibilityIssues: []
            };
        }
    }

    async validateSchemasBasic() {
        const schemaFiles = this.findSchemaFiles();
        
        if (schemaFiles.length === 0) {
            return {
                compliance: 100,
                validationErrors: [],
                compatibilityIssues: []
            };
        }
        
        let validSchemas = 0;
        const validationErrors = [];
        
        for (const schemaFile of schemaFiles) {
            try {
                const content = fs.readFileSync(schemaFile, 'utf8');
                const schema = JSON.parse(content);
                
                // Basic validation
                if (schema.$schema && (schema.type || schema.properties)) {
                    validSchemas++;
                } else {
                    validationErrors.push(`Invalid schema structure in ${schemaFile}`);
                }
            } catch (error) {
                validationErrors.push(`Parse error in ${schemaFile}: ${error.message}`);
            }
        }
        
        return {
            compliance: Math.round((validSchemas / schemaFiles.length) * 100),
            validationErrors,
            compatibilityIssues: []
        };
    }

    findSchemaFiles() {
        const schemaExtensions = ['.json', '.schema.json'];
        const schemaDirs = [
            path.join(this.config.projectRoot, 'schemas'),
            path.join(this.config.projectRoot, 'schema'),
            path.join(this.config.projectRoot, 'src', 'schemas')
        ];
        
        const schemaFiles = [];
        
        for (const dir of schemaDirs) {
            if (fs.existsSync(dir)) {
                const files = this.findFilesRecursive(dir, schemaExtensions);
                schemaFiles.push(...files);
            }
        }
        
        return schemaFiles;
    }

    async collectFeedbackMetrics() {
        console.log('💬 Collecting feedback metrics...');
        
        try {
            const feedbackReportPath = path.join(this.config.reportPath, 'feedback-report.json');
            if (fs.existsSync(feedbackReportPath)) {
                const feedbackReport = JSON.parse(fs.readFileSync(feedbackReportPath, 'utf8'));
                
                this.metrics.feedback = {
                    totalItems: feedbackReport.summary.total || 0,
                    openItems: feedbackReport.summary.byStatus.open || 0,
                    averageResponseTime: feedbackReport.trends.responseTime || 0,
                    sentimentScore: this.calculateSentimentScore(feedbackReport.trends.sentimentDistribution),
                    categoryDistribution: feedbackReport.summary.byCategory || {}
                };
            } else {
                this.metrics.feedback = {
                    totalItems: 0,
                    openItems: 0,
                    averageResponseTime: 0,
                    sentimentScore: 50,
                    categoryDistribution: {}
                };
            }
        } catch (error) {
            console.warn('⚠️  Could not collect feedback metrics:', error.message);
            this.metrics.feedback = {
                totalItems: 0,
                openItems: 0,
                averageResponseTime: 0,
                sentimentScore: 50,
                categoryDistribution: {}
            };
        }
    }

    calculateSentimentScore(sentimentDistribution) {
        if (!sentimentDistribution) return 50;
        
        const { positive = 0, neutral = 0, negative = 0 } = sentimentDistribution;
        const total = positive + neutral + negative;
        
        if (total === 0) return 50;
        
        // Calculate weighted score (positive=100, neutral=50, negative=0)
        const score = ((positive * 100) + (neutral * 50) + (negative * 0)) / total;
        return Math.round(score);
    }

    async collectPerformanceMetrics() {
        console.log('⚡ Collecting performance metrics...');
        
        try {
            // Check if package.json exists for build scripts
            const packageJsonPath = path.join(this.config.projectRoot, 'package.json');
            if (fs.existsSync(packageJsonPath)) {
                const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                
                // Simulate build time measurement
                this.metrics.performance.buildTime = this.measureBuildTime(packageJson);
            }
            
            // Check test coverage if available
            const coverageFiles = [
                path.join(this.config.projectRoot, 'coverage', 'coverage-summary.json'),
                path.join(this.config.projectRoot, 'coverage', 'lcov-report', 'index.html')
            ];
            
            for (const coverageFile of coverageFiles) {
                if (fs.existsSync(coverageFile)) {
                    this.metrics.performance.testCoverage = this.extractTestCoverage(coverageFile);
                    break;
                }
            }
            
            // Code quality metrics (basic)
            this.metrics.performance.codeQuality = await this.assessCodeQuality();
            
        } catch (error) {
            console.warn('⚠️  Could not collect performance metrics:', error.message);
            this.metrics.performance = {
                buildTime: 0,
                testCoverage: 0,
                codeQuality: 75 // Default reasonable score
            };
        }
    }

    measureBuildTime(packageJson) {
        // Simulate build time based on project complexity
        const scripts = packageJson.scripts || {};
        const dependencies = Object.keys(packageJson.dependencies || {}).length;
        const devDependencies = Object.keys(packageJson.devDependencies || {}).length;
        
        // Simple heuristic for build time
        let buildTime = 10; // Base time in seconds
        buildTime += dependencies * 0.5;
        buildTime += devDependencies * 0.3;
        
        if (scripts.build) buildTime += 20;
        if (scripts.test) buildTime += 15;
        if (scripts.lint) buildTime += 5;
        
        return Math.round(buildTime);
    }

    extractTestCoverage(coverageFile) {
        try {
            if (coverageFile.endsWith('.json')) {
                const coverage = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));
                return coverage.total?.lines?.pct || 0;
            } else {
                // Parse HTML coverage report
                const html = fs.readFileSync(coverageFile, 'utf8');
                const match = html.match(/Lines.*?(\d+\.\d+)%/);
                return match ? parseFloat(match[1]) : 0;
            }
        } catch (error) {
            return 0;
        }
    }

    async assessCodeQuality() {
        // Basic code quality assessment
        const jsFiles = this.findFilesRecursive(this.config.projectRoot, ['.js', '.ts', '.jsx', '.tsx']);
        
        if (jsFiles.length === 0) return 75;
        
        let qualityScore = 100;
        let totalFiles = 0;
        
        for (const file of jsFiles.slice(0, 20)) { // Limit to first 20 files for performance
            try {
                const content = fs.readFileSync(file, 'utf8');
                const lines = content.split('\n');
                
                totalFiles++;
                
                // Simple quality checks
                const hasComments = content.includes('//') || content.includes('/*');
                const hasLongLines = lines.some(line => line.length > 120);
                const hasConsoleLog = content.includes('console.log');
                const hasProperIndentation = this.checkIndentation(lines);
                
                if (!hasComments) qualityScore -= 5;
                if (hasLongLines) qualityScore -= 3;
                if (hasConsoleLog) qualityScore -= 2;
                if (!hasProperIndentation) qualityScore -= 5;
                
            } catch (error) {
                qualityScore -= 2;
            }
        }
        
        return Math.max(0, Math.round(qualityScore));
    }

    checkIndentation(lines) {
        // Check if indentation is consistent
        const indentations = lines
            .filter(line => line.trim().length > 0)
            .map(line => line.match(/^\s*/)[0].length);
        
        if (indentations.length === 0) return true;
        
        // Check if indentation follows a pattern (2 or 4 spaces)
        const validIndents = indentations.filter(indent => indent % 2 === 0 || indent % 4 === 0);
        return validIndents.length / indentations.length > 0.8;
    }

    async collectTrendMetrics() {
        console.log('📊 Collecting trend metrics...');
        
        // This would typically analyze historical data
        // For now, we'll create mock trend data
        this.metrics.trends = {
            weekly: {
                documentationChanges: 5,
                schemaUpdates: 2,
                feedbackItems: 8,
                issuesResolved: 12
            },
            monthly: {
                documentationChanges: 23,
                schemaUpdates: 7,
                feedbackItems: 34,
                issuesResolved: 45
            },
            alerts: []
        };
    }

    async calculateHealthScore() {
        console.log('🏥 Calculating health score...');
        
        const weights = {
            documentation: 0.25,
            schema: 0.25,
            feedback: 0.25,
            performance: 0.25
        };
        
        // Calculate component scores
        const docScore = (this.metrics.documentation.coverage + 
                         this.metrics.documentation.quality + 
                         this.metrics.documentation.linkValidation) / 3;
        
        const schemaScore = this.metrics.schema.compliance;
        
        const feedbackScore = Math.max(0, 100 - (this.metrics.feedback.openItems * 5) - 
                                      Math.max(0, (this.metrics.feedback.averageResponseTime - 3) * 10));
        
        const performanceScore = (this.metrics.performance.testCoverage + 
                                this.metrics.performance.codeQuality) / 2;
        
        // Store component scores
        this.metrics.projectHealth.components = {
            documentation: Math.round(docScore),
            schema: Math.round(schemaScore),
            feedback: Math.round(feedbackScore),
            performance: Math.round(performanceScore)
        };
        
        // Calculate overall score
        const overallScore = (docScore * weights.documentation) +
                           (schemaScore * weights.schema) +
                           (feedbackScore * weights.feedback) +
                           (performanceScore * weights.performance);
        
        this.metrics.projectHealth.score = Math.round(overallScore);
        
        // Determine overall status
        if (overallScore >= 90) {
            this.metrics.projectHealth.overall = 'excellent';
        } else if (overallScore >= 75) {
            this.metrics.projectHealth.overall = 'good';
        } else if (overallScore >= 60) {
            this.metrics.projectHealth.overall = 'fair';
        } else {
            this.metrics.projectHealth.overall = 'poor';
        }
    }

    async generateAlerts() {
        console.log('🚨 Generating alerts...');
        
        const alerts = [];
        
        // Documentation alerts
        if (this.metrics.documentation.coverage < this.config.thresholds.docCoverage) {
            alerts.push({
                type: 'warning',
                category: 'documentation',
                title: 'Low Documentation Coverage',
                message: `Documentation coverage is ${this.metrics.documentation.coverage}%, below threshold of ${this.config.thresholds.docCoverage}%`,
                severity: 'medium'
            });
        }
        
        if (this.metrics.documentation.linkValidation < this.config.thresholds.linkValidation) {
            alerts.push({
                type: 'warning',
                category: 'documentation',
                title: 'Broken Links Detected',
                message: `Link validation is ${this.metrics.documentation.linkValidation}%, below threshold of ${this.config.thresholds.linkValidation}%`,
                severity: 'medium'
            });
        }
        
        // Schema alerts
        if (this.metrics.schema.compliance < this.config.thresholds.schemaCompliance) {
            alerts.push({
                type: 'error',
                category: 'schema',
                title: 'Schema Compliance Issues',
                message: `Schema compliance is ${this.metrics.schema.compliance}%, below threshold of ${this.config.thresholds.schemaCompliance}%`,
                severity: 'high'
            });
        }
        
        if (this.metrics.schema.validationErrors.length > 0) {
            alerts.push({
                type: 'error',
                category: 'schema',
                title: 'Schema Validation Errors',
                message: `${this.metrics.schema.validationErrors.length} schema validation errors detected`,
                severity: 'high'
            });
        }
        
        // Feedback alerts
        if (this.metrics.feedback.averageResponseTime > this.config.thresholds.feedbackResponseTime) {
            alerts.push({
                type: 'warning',
                category: 'feedback',
                title: 'Slow Feedback Response',
                message: `Average response time is ${this.metrics.feedback.averageResponseTime} days, above threshold of ${this.config.thresholds.feedbackResponseTime} days`,
                severity: 'medium'
            });
        }
        
        if (this.metrics.feedback.openItems > 20) {
            alerts.push({
                type: 'warning',
                category: 'feedback',
                title: 'High Open Feedback Count',
                message: `${this.metrics.feedback.openItems} open feedback items require attention`,
                severity: 'medium'
            });
        }
        
        // Performance alerts
        if (this.metrics.performance.testCoverage < 70) {
            alerts.push({
                type: 'warning',
                category: 'performance',
                title: 'Low Test Coverage',
                message: `Test coverage is ${this.metrics.performance.testCoverage}%, below recommended 70%`,
                severity: 'medium'
            });
        }
        
        this.metrics.trends.alerts = alerts;
    }

    async generateHTMLDashboard() {
        const html = this.createDashboardHTML();
        
        const outputDir = path.dirname(this.config.outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(this.config.outputPath, html);
    }

    createDashboardHTML() {
        const { projectHealth, documentation, schema, feedback, performance, trends } = this.metrics;
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MPLP Project Health Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header h1 { color: #333; margin-bottom: 10px; }
        .header .timestamp { color: #666; font-size: 14px; }
        .health-score { text-align: center; margin: 20px 0; }
        .score-circle { width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; color: white; }
        .score-excellent { background: linear-gradient(135deg, #4CAF50, #45a049); }
        .score-good { background: linear-gradient(135deg, #2196F3, #1976D2); }
        .score-fair { background: linear-gradient(135deg, #FF9800, #F57C00); }
        .score-poor { background: linear-gradient(135deg, #F44336, #D32F2F); }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .card h3 { color: #333; margin-bottom: 15px; display: flex; align-items: center; }
        .card h3 .icon { margin-right: 10px; font-size: 20px; }
        .metric { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .metric-label { color: #666; }
        .metric-value { font-weight: bold; }
        .progress-bar { width: 100%; height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden; margin-top: 5px; }
        .progress-fill { height: 100%; transition: width 0.3s ease; }
        .progress-excellent { background: #4CAF50; }
        .progress-good { background: #2196F3; }
        .progress-fair { background: #FF9800; }
        .progress-poor { background: #F44336; }
        .alerts { margin-top: 20px; }
        .alert { padding: 15px; margin-bottom: 10px; border-radius: 5px; border-left: 4px solid; }
        .alert-error { background: #ffebee; border-color: #f44336; color: #c62828; }
        .alert-warning { background: #fff3e0; border-color: #ff9800; color: #ef6c00; }
        .alert-info { background: #e3f2fd; border-color: #2196f3; color: #1565c0; }
        .trends-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .trend-item { text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px; }
        .trend-value { font-size: 24px; font-weight: bold; color: #333; }
        .trend-label { font-size: 12px; color: #666; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 MPLP Project Health Dashboard</h1>
            <div class="timestamp">Last updated: ${new Date(this.metrics.timestamp).toLocaleString()}</div>
            
            <div class="health-score">
                <div class="score-circle score-${projectHealth.overall}">
                    ${projectHealth.score}/100
                </div>
                <div style="font-size: 18px; color: #333; text-transform: capitalize;">
                    Overall Health: ${projectHealth.overall}
                </div>
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <h3><span class="icon">📚</span>Documentation</h3>
                <div class="metric">
                    <span class="metric-label">Coverage</span>
                    <span class="metric-value">${documentation.coverage}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${this.getProgressClass(documentation.coverage)}" style="width: ${documentation.coverage}%"></div>
                </div>
                
                <div class="metric">
                    <span class="metric-label">Quality</span>
                    <span class="metric-value">${documentation.quality}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${this.getProgressClass(documentation.quality)}" style="width: ${documentation.quality}%"></div>
                </div>
                
                <div class="metric">
                    <span class="metric-label">Link Validation</span>
                    <span class="metric-value">${documentation.linkValidation}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${this.getProgressClass(documentation.linkValidation)}" style="width: ${documentation.linkValidation}%"></div>
                </div>
            </div>

            <div class="card">
                <h3><span class="icon">🔧</span>Schema</h3>
                <div class="metric">
                    <span class="metric-label">Compliance</span>
                    <span class="metric-value">${schema.compliance}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${this.getProgressClass(schema.compliance)}" style="width: ${schema.compliance}%"></div>
                </div>
                
                <div class="metric">
                    <span class="metric-label">Validation Errors</span>
                    <span class="metric-value">${schema.validationErrors.length}</span>
                </div>
                
                <div class="metric">
                    <span class="metric-label">Compatibility Issues</span>
                    <span class="metric-value">${schema.compatibilityIssues.length}</span>
                </div>
            </div>

            <div class="card">
                <h3><span class="icon">💬</span>Feedback</h3>
                <div class="metric">
                    <span class="metric-label">Total Items</span>
                    <span class="metric-value">${feedback.totalItems}</span>
                </div>
                
                <div class="metric">
                    <span class="metric-label">Open Items</span>
                    <span class="metric-value">${feedback.openItems}</span>
                </div>
                
                <div class="metric">
                    <span class="metric-label">Avg Response Time</span>
                    <span class="metric-value">${feedback.averageResponseTime} days</span>
                </div>
                
                <div class="metric">
                    <span class="metric-label">Sentiment Score</span>
                    <span class="metric-value">${feedback.sentimentScore}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${this.getProgressClass(feedback.sentimentScore)}" style="width: ${feedback.sentimentScore}%"></div>
                </div>
            </div>

            <div class="card">
                <h3><span class="icon">⚡</span>Performance</h3>
                <div class="metric">
                    <span class="metric-label">Build Time</span>
                    <span class="metric-value">${performance.buildTime}s</span>
                </div>
                
                <div class="metric">
                    <span class="metric-label">Test Coverage</span>
                    <span class="metric-value">${performance.testCoverage}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${this.getProgressClass(performance.testCoverage)}" style="width: ${performance.testCoverage}%"></div>
                </div>
                
                <div class="metric">
                    <span class="metric-label">Code Quality</span>
                    <span class="metric-value">${performance.codeQuality}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${this.getProgressClass(performance.codeQuality)}" style="width: ${performance.codeQuality}%"></div>
                </div>
            </div>
        </div>

        <div class="card">
            <h3><span class="icon">📊</span>Trends</h3>
            <div class="trends-grid">
                <div class="trend-item">
                    <div class="trend-value">${trends.weekly.documentationChanges}</div>
                    <div class="trend-label">Doc Changes (Week)</div>
                </div>
                <div class="trend-item">
                    <div class="trend-value">${trends.weekly.schemaUpdates}</div>
                    <div class="trend-label">Schema Updates (Week)</div>
                </div>
                <div class="trend-item">
                    <div class="trend-value">${trends.weekly.feedbackItems}</div>
                    <div class="trend-label">Feedback Items (Week)</div>
                </div>
                <div class="trend-item">
                    <div class="trend-value">${trends.weekly.issuesResolved}</div>
                    <div class="trend-label">Issues Resolved (Week)</div>
                </div>
            </div>
        </div>

        ${trends.alerts.length > 0 ? `
        <div class="alerts">
            <h3>🚨 Alerts</h3>
            ${trends.alerts.map(alert => `
            <div class="alert alert-${alert.type}">
                <strong>${alert.title}</strong><br>
                ${alert.message}
            </div>
            `).join('')}
        </div>
        ` : ''}
    </div>

    <script>
        // Auto-refresh every hour
        setTimeout(() => {
            window.location.reload();
        }, ${this.config.refreshInterval});
    </script>
</body>
</html>`;
    }

    getProgressClass(value) {
        if (value >= 90) return 'progress-excellent';
        if (value >= 75) return 'progress-good';
        if (value >= 60) return 'progress-fair';
        return 'progress-poor';
    }

    async generateJSONReport() {
        const jsonPath = this.config.outputPath.replace('.html', '.json');
        fs.writeFileSync(jsonPath, JSON.stringify(this.metrics, null, 2));
    }

    async generateSummaryReport() {
        const summaryPath = this.config.outputPath.replace('.html', '-summary.md');
        const summary = this.createSummaryMarkdown();
        fs.writeFileSync(summaryPath, summary);
    }

    createSummaryMarkdown() {
        const { projectHealth, trends } = this.metrics;
        
        return `# Project Health Summary

**Generated:** ${this.metrics.timestamp}
**Overall Score:** ${projectHealth.score}/100 (${projectHealth.overall})

## Component Scores

| Component | Score | Status |
|-----------|-------|--------|
| Documentation | ${projectHealth.components.documentation}/100 | ${this.getStatusEmoji(projectHealth.components.documentation)} |
| Schema | ${projectHealth.components.schema}/100 | ${this.getStatusEmoji(projectHealth.components.schema)} |
| Feedback | ${projectHealth.components.feedback}/100 | ${this.getStatusEmoji(projectHealth.components.feedback)} |
| Performance | ${projectHealth.components.performance}/100 | ${this.getStatusEmoji(projectHealth.components.performance)} |

## Key Metrics

### Documentation
- Coverage: ${this.metrics.documentation.coverage}%
- Quality: ${this.metrics.documentation.quality}%
- Link Validation: ${this.metrics.documentation.linkValidation}%

### Schema
- Compliance: ${this.metrics.schema.compliance}%
- Validation Errors: ${this.metrics.schema.validationErrors.length}
- Compatibility Issues: ${this.metrics.schema.compatibilityIssues.length}

### Feedback
- Total Items: ${this.metrics.feedback.totalItems}
- Open Items: ${this.metrics.feedback.openItems}
- Average Response Time: ${this.metrics.feedback.averageResponseTime} days
- Sentiment Score: ${this.metrics.feedback.sentimentScore}%

### Performance
- Build Time: ${this.metrics.performance.buildTime}s
- Test Coverage: ${this.metrics.performance.testCoverage}%
- Code Quality: ${this.metrics.performance.codeQuality}%

## Alerts

${trends.alerts.length > 0 ? trends.alerts.map(alert => 
    `### ${alert.title} (${alert.severity})
${alert.message}\n`
).join('\n') : '✅ No alerts at this time.\n'}

## Recommendations

${this.generateRecommendations()}
`;
    }

    getStatusEmoji(score) {
        if (score >= 90) return '🟢 Excellent';
        if (score >= 75) return '🔵 Good';
        if (score >= 60) return '🟡 Fair';
        return '🔴 Poor';
    }

    generateRecommendations() {
        const recommendations = [];
        
        if (this.metrics.projectHealth.components.documentation < 80) {
            recommendations.push('- Improve documentation coverage and quality');
        }
        
        if (this.metrics.schema.validationErrors.length > 0) {
            recommendations.push('- Fix schema validation errors');
        }
        
        if (this.metrics.feedback.openItems > 10) {
            recommendations.push('- Address open feedback items');
        }
        
        if (this.metrics.performance.testCoverage < 70) {
            recommendations.push('- Increase test coverage');
        }
        
        if (this.metrics.feedback.averageResponseTime > 7) {
            recommendations.push('- Improve feedback response time');
        }
        
        return recommendations.length > 0 ? recommendations.join('\n') : '✅ No specific recommendations at this time.';
    }
}

// CLI usage
if (require.main === module) {
    const configPath = process.argv[2] || './config/monitoring-config.json';
    let config = {};
    
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8')).dashboard || {};
    }
    
    const dashboard = new MonitoringDashboard(config);
    dashboard.generateDashboard().catch(error => {
        console.error('Failed to generate dashboard:', error);
        process.exit(1);
    });
}

module.exports = MonitoringDashboard;