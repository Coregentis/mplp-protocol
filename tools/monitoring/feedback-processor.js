#!/usr/bin/env node
/**
 * MPLP Feedback Processor
 * 收集、分类和处理用户反馈
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class FeedbackProcessor {
    constructor(config = {}) {
        this.config = {
            githubRepo: config.githubRepo || 'owner/repo',
            feedbackPath: config.feedbackPath || './feedback',
            outputPath: config.outputPath || './reports/feedback-report.json',
            categories: config.categories || [
                'bug', 'feature_request', 'documentation', 
                'performance', 'usability', 'compatibility'
            ],
            priorities: config.priorities || ['low', 'medium', 'high', 'critical'],
            ...config
        };
        this.results = {
            timestamp: new Date().toISOString(),
            summary: {
                total: 0,
                byCategory: {},
                byPriority: {},
                byStatus: {}
            },
            feedback: [],
            trends: {},
            recommendations: []
        };
    }

    async processFeedback() {
        console.log('📝 Starting feedback processing...');
        
        try {
            await this.collectGitHubIssues();
            await this.collectLocalFeedback();
            await this.categorizeFeedback();
            await this.analyzeTrends();
            await this.generateRecommendations();
            await this.generateReport();
            
            console.log(`✅ Feedback processing completed.`);
            console.log(`   Total feedback items: ${this.results.summary.total}`);
            console.log(`   High priority items: ${this.results.summary.byPriority.high || 0}`);
            
            return this.results;
        } catch (error) {
            console.error('❌ Feedback processing failed:', error.message);
            throw error;
        }
    }

    async collectGitHubIssues() {
        console.log('🐙 Collecting GitHub issues...');
        
        try {
            // This would typically use GitHub API, but for demo we'll simulate
            // In real implementation, you'd use @octokit/rest or similar
            const mockIssues = this.getMockGitHubIssues();
            
            for (const issue of mockIssues) {
                this.results.feedback.push({
                    id: `github-${issue.number}`,
                    source: 'github',
                    type: 'issue',
                    title: issue.title,
                    description: issue.body,
                    author: issue.user.login,
                    created: issue.created_at,
                    updated: issue.updated_at,
                    status: issue.state,
                    labels: issue.labels.map(label => label.name),
                    url: issue.html_url,
                    category: this.inferCategory(issue.title, issue.body, issue.labels),
                    priority: this.inferPriority(issue.labels),
                    sentiment: this.analyzeSentiment(issue.body)
                });
            }
            
            console.log(`📊 Collected ${mockIssues.length} GitHub issues`);
        } catch (error) {
            console.warn('⚠️  Could not collect GitHub issues:', error.message);
        }
    }

    getMockGitHubIssues() {
        // Mock data for demonstration
        return [
            {
                number: 1,
                title: 'Schema validation fails for nested objects',
                body: 'When validating nested objects in the MPLP schema, the validator throws an error...',
                user: { login: 'developer1' },
                created_at: '2024-01-15T10:00:00Z',
                updated_at: '2024-01-16T14:30:00Z',
                state: 'open',
                labels: [{ name: 'bug' }, { name: 'schema' }],
                html_url: 'https://github.com/owner/repo/issues/1'
            },
            {
                number: 2,
                title: 'Add support for custom task types',
                body: 'It would be great if MPLP could support custom task types beyond the predefined ones...',
                user: { login: 'user2' },
                created_at: '2024-01-14T09:15:00Z',
                updated_at: '2024-01-14T09:15:00Z',
                state: 'open',
                labels: [{ name: 'enhancement' }, { name: 'feature' }],
                html_url: 'https://github.com/owner/repo/issues/2'
            },
            {
                number: 3,
                title: 'Documentation unclear about lifecycle phases',
                body: 'The documentation about lifecycle phases is confusing and needs better examples...',
                user: { login: 'user3' },
                created_at: '2024-01-13T16:45:00Z',
                updated_at: '2024-01-15T11:20:00Z',
                state: 'closed',
                labels: [{ name: 'documentation' }, { name: 'help wanted' }],
                html_url: 'https://github.com/owner/repo/issues/3'
            }
        ];
    }

    async collectLocalFeedback() {
        console.log('📁 Collecting local feedback...');
        
        if (!fs.existsSync(this.config.feedbackPath)) {
            console.log('📁 No local feedback directory found, skipping...');
            return;
        }
        
        const feedbackFiles = fs.readdirSync(this.config.feedbackPath)
            .filter(file => file.endsWith('.json') || file.endsWith('.md'));
        
        for (const file of feedbackFiles) {
            try {
                const filePath = path.join(this.config.feedbackPath, file);
                const content = fs.readFileSync(filePath, 'utf8');
                
                let feedbackData;
                if (file.endsWith('.json')) {
                    feedbackData = JSON.parse(content);
                } else {
                    // Parse markdown feedback
                    feedbackData = this.parseMarkdownFeedback(content, file);
                }
                
                this.results.feedback.push({
                    id: `local-${file}`,
                    source: 'local',
                    type: 'file',
                    ...feedbackData,
                    category: this.inferCategory(feedbackData.title, feedbackData.description),
                    priority: feedbackData.priority || this.inferPriority([]),
                    sentiment: this.analyzeSentiment(feedbackData.description)
                });
            } catch (error) {
                console.warn(`⚠️  Could not process feedback file ${file}:`, error.message);
            }
        }
        
        console.log(`📊 Collected ${feedbackFiles.length} local feedback files`);
    }

    parseMarkdownFeedback(content, filename) {
        const lines = content.split('\n');
        const feedback = {
            title: filename.replace('.md', ''),
            description: content,
            author: 'unknown',
            created: fs.statSync(path.join(this.config.feedbackPath, filename)).birthtime.toISOString(),
            status: 'new'
        };
        
        // Try to extract metadata from markdown
        const titleMatch = content.match(/^#\s+(.+)$/m);
        if (titleMatch) {
            feedback.title = titleMatch[1];
        }
        
        const authorMatch = content.match(/Author:\s*(.+)$/m);
        if (authorMatch) {
            feedback.author = authorMatch[1];
        }
        
        return feedback;
    }

    inferCategory(title, description, labels = []) {
        const text = `${title} ${description}`.toLowerCase();
        const labelNames = labels.map(label => typeof label === 'string' ? label : label.name).join(' ').toLowerCase();
        const fullText = `${text} ${labelNames}`;
        
        // Category inference rules
        const categoryRules = {
            bug: ['bug', 'error', 'fail', 'broken', 'issue', 'problem', 'crash'],
            feature_request: ['feature', 'enhancement', 'add', 'support', 'implement', 'new'],
            documentation: ['doc', 'documentation', 'readme', 'guide', 'example', 'unclear', 'confusing'],
            performance: ['slow', 'performance', 'speed', 'optimize', 'memory', 'cpu'],
            usability: ['usability', 'ux', 'ui', 'user', 'interface', 'experience', 'difficult'],
            compatibility: ['compatibility', 'version', 'breaking', 'migration', 'support']
        };
        
        for (const [category, keywords] of Object.entries(categoryRules)) {
            if (keywords.some(keyword => fullText.includes(keyword))) {
                return category;
            }
        }
        
        return 'other';
    }

    inferPriority(labels = []) {
        const labelNames = labels.map(label => typeof label === 'string' ? label : label.name).join(' ').toLowerCase();
        
        if (labelNames.includes('critical') || labelNames.includes('urgent')) {
            return 'critical';
        } else if (labelNames.includes('high') || labelNames.includes('important')) {
            return 'high';
        } else if (labelNames.includes('low') || labelNames.includes('minor')) {
            return 'low';
        }
        
        return 'medium';
    }

    analyzeSentiment(text) {
        // Simple sentiment analysis
        const positiveWords = ['good', 'great', 'excellent', 'love', 'awesome', 'helpful', 'useful'];
        const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'broken', 'useless', 'frustrating'];
        
        const words = text.toLowerCase().split(/\s+/);
        const positiveCount = words.filter(word => positiveWords.includes(word)).length;
        const negativeCount = words.filter(word => negativeWords.includes(word)).length;
        
        if (positiveCount > negativeCount) {
            return 'positive';
        } else if (negativeCount > positiveCount) {
            return 'negative';
        }
        
        return 'neutral';
    }

    async categorizeFeedback() {
        console.log('🏷️  Categorizing feedback...');
        
        // Initialize counters
        this.config.categories.forEach(cat => {
            this.results.summary.byCategory[cat] = 0;
        });
        this.results.summary.byCategory.other = 0;
        
        this.config.priorities.forEach(pri => {
            this.results.summary.byPriority[pri] = 0;
        });
        
        const statuses = ['open', 'closed', 'new', 'in_progress'];
        statuses.forEach(status => {
            this.results.summary.byStatus[status] = 0;
        });
        
        // Count feedback by categories
        for (const feedback of this.results.feedback) {
            this.results.summary.byCategory[feedback.category]++;
            this.results.summary.byPriority[feedback.priority]++;
            this.results.summary.byStatus[feedback.status]++;
        }
        
        this.results.summary.total = this.results.feedback.length;
        
        console.log(`🏷️  Categorization complete:`);
        console.log(`   Categories: ${JSON.stringify(this.results.summary.byCategory)}`);
        console.log(`   Priorities: ${JSON.stringify(this.results.summary.byPriority)}`);
    }

    async analyzeTrends() {
        console.log('📈 Analyzing trends...');
        
        // Analyze feedback over time
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        const recentFeedback = this.results.feedback.filter(f => 
            new Date(f.created) > thirtyDaysAgo
        );
        
        const weeklyFeedback = this.results.feedback.filter(f => 
            new Date(f.created) > sevenDaysAgo
        );
        
        this.results.trends = {
            totalLast30Days: recentFeedback.length,
            totalLast7Days: weeklyFeedback.length,
            averagePerDay: recentFeedback.length / 30,
            topCategories: this.getTopCategories(),
            sentimentDistribution: this.getSentimentDistribution(),
            responseTime: this.calculateAverageResponseTime()
        };
        
        console.log(`📈 Trends analysis complete:`);
        console.log(`   Last 30 days: ${this.results.trends.totalLast30Days} items`);
        console.log(`   Last 7 days: ${this.results.trends.totalLast7Days} items`);
    }

    getTopCategories() {
        const categories = Object.entries(this.results.summary.byCategory)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([category, count]) => ({ category, count }));
        
        return categories;
    }

    getSentimentDistribution() {
        const distribution = { positive: 0, negative: 0, neutral: 0 };
        
        for (const feedback of this.results.feedback) {
            distribution[feedback.sentiment]++;
        }
        
        return distribution;
    }

    calculateAverageResponseTime() {
        const closedFeedback = this.results.feedback.filter(f => f.status === 'closed' && f.updated);
        
        if (closedFeedback.length === 0) {
            return null;
        }
        
        const totalResponseTime = closedFeedback.reduce((sum, feedback) => {
            const created = new Date(feedback.created);
            const updated = new Date(feedback.updated);
            return sum + (updated - created);
        }, 0);
        
        const averageMs = totalResponseTime / closedFeedback.length;
        const averageDays = averageMs / (1000 * 60 * 60 * 24);
        
        return Math.round(averageDays * 10) / 10; // Round to 1 decimal place
    }

    async generateRecommendations() {
        console.log('💡 Generating recommendations...');
        
        const recommendations = [];
        
        // High priority items
        const highPriorityCount = this.results.summary.byPriority.high || 0;
        const criticalCount = this.results.summary.byPriority.critical || 0;
        
        if (criticalCount > 0) {
            recommendations.push({
                type: 'urgent_action',
                priority: 'critical',
                title: 'Address Critical Issues Immediately',
                description: `There are ${criticalCount} critical issues that need immediate attention.`,
                actions: [
                    'Review all critical issues within 24 hours',
                    'Assign dedicated resources to resolve critical issues',
                    'Communicate status updates to affected users'
                ]
            });
        }
        
        if (highPriorityCount > 5) {
            recommendations.push({
                type: 'high_priority_backlog',
                priority: 'high',
                title: 'Reduce High Priority Backlog',
                description: `There are ${highPriorityCount} high priority items in the backlog.`,
                actions: [
                    'Prioritize high priority items in next sprint',
                    'Consider adding more development resources',
                    'Break down large items into smaller tasks'
                ]
            });
        }
        
        // Category-specific recommendations
        const topCategory = this.results.trends.topCategories[0];
        if (topCategory && topCategory.count > this.results.summary.total * 0.3) {
            recommendations.push({
                type: 'category_focus',
                priority: 'medium',
                title: `Focus on ${topCategory.category} Issues`,
                description: `${topCategory.category} represents ${topCategory.count} items (${Math.round(topCategory.count / this.results.summary.total * 100)}% of all feedback).`,
                actions: [
                    `Conduct deep dive analysis of ${topCategory.category} issues`,
                    `Create dedicated improvement plan for ${topCategory.category}`,
                    'Consider preventive measures to reduce future issues'
                ]
            });
        }
        
        // Sentiment analysis
        const sentiment = this.results.trends.sentimentDistribution;
        const negativeRatio = sentiment.negative / this.results.summary.total;
        
        if (negativeRatio > 0.4) {
            recommendations.push({
                type: 'sentiment_improvement',
                priority: 'medium',
                title: 'Improve User Sentiment',
                description: `${Math.round(negativeRatio * 100)}% of feedback has negative sentiment.`,
                actions: [
                    'Analyze root causes of negative feedback',
                    'Improve communication with users',
                    'Implement proactive user support measures'
                ]
            });
        }
        
        // Response time
        if (this.results.trends.responseTime && this.results.trends.responseTime > 7) {
            recommendations.push({
                type: 'response_time',
                priority: 'medium',
                title: 'Improve Response Time',
                description: `Average response time is ${this.results.trends.responseTime} days.`,
                actions: [
                    'Set up automated acknowledgment responses',
                    'Implement triage process for faster categorization',
                    'Establish SLA targets for different priority levels'
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
        
        // Generate CSV export for analysis
        const csvPath = this.config.outputPath.replace('.json', '.csv');
        const csv = this.generateCSV();
        fs.writeFileSync(csvPath, csv);
        
        console.log(`📊 Reports generated:`);
        console.log(`   - JSON: ${this.config.outputPath}`);
        console.log(`   - Summary: ${summaryPath}`);
        console.log(`   - CSV: ${csvPath}`);
    }

    generateSummaryMarkdown() {
        const { summary, trends, recommendations } = this.results;
        
        return `# Feedback Analysis Report

**Generated:** ${this.results.timestamp}
**Total Feedback Items:** ${summary.total}

## Summary Statistics

### By Category
| Category | Count | Percentage |
|----------|-------|------------|
${Object.entries(summary.byCategory)
    .sort(([,a], [,b]) => b - a)
    .map(([cat, count]) => `| ${cat} | ${count} | ${Math.round(count / summary.total * 100)}% |`)
    .join('\n')}

### By Priority
| Priority | Count | Percentage |
|----------|-------|------------|
${Object.entries(summary.byPriority)
    .sort(([,a], [,b]) => b - a)
    .map(([pri, count]) => `| ${pri} | ${count} | ${Math.round(count / summary.total * 100)}% |`)
    .join('\n')}

### By Status
| Status | Count | Percentage |
|--------|-------|------------|
${Object.entries(summary.byStatus)
    .sort(([,a], [,b]) => b - a)
    .map(([status, count]) => `| ${status} | ${count} | ${Math.round(count / summary.total * 100)}% |`)
    .join('\n')}

## Trends Analysis

- **Last 30 days:** ${trends.totalLast30Days} items
- **Last 7 days:** ${trends.totalLast7Days} items
- **Average per day:** ${trends.averagePerDay.toFixed(1)} items
- **Average response time:** ${trends.responseTime ? `${trends.responseTime} days` : 'N/A'}

### Sentiment Distribution
- **Positive:** ${trends.sentimentDistribution.positive} (${Math.round(trends.sentimentDistribution.positive / summary.total * 100)}%)
- **Neutral:** ${trends.sentimentDistribution.neutral} (${Math.round(trends.sentimentDistribution.neutral / summary.total * 100)}%)
- **Negative:** ${trends.sentimentDistribution.negative} (${Math.round(trends.sentimentDistribution.negative / summary.total * 100)}%)

## Recommendations

${this.formatRecommendations(recommendations)}

## Action Items

${this.generateActionItems()}
`;
    }

    formatRecommendations(recommendations) {
        if (recommendations.length === 0) {
            return '✅ No specific recommendations at this time.\n';
        }
        
        return recommendations.map(rec => 
            `### ${rec.title} (${rec.priority} priority)\n\n${rec.description}\n\n**Actions:**\n${rec.actions.map(action => `- ${action}`).join('\n')}`
        ).join('\n\n') + '\n';
    }

    generateActionItems() {
        const actionItems = [];
        
        // Critical and high priority items
        const urgentFeedback = this.results.feedback.filter(f => 
            f.priority === 'critical' || f.priority === 'high'
        );
        
        if (urgentFeedback.length > 0) {
            actionItems.push(`- Review ${urgentFeedback.length} urgent feedback items`);
        }
        
        // Open items
        const openFeedback = this.results.feedback.filter(f => f.status === 'open' || f.status === 'new');
        if (openFeedback.length > 0) {
            actionItems.push(`- Process ${openFeedback.length} open feedback items`);
        }
        
        // Documentation improvements
        const docFeedback = this.results.feedback.filter(f => f.category === 'documentation');
        if (docFeedback.length > 2) {
            actionItems.push(`- Address ${docFeedback.length} documentation-related feedback items`);
        }
        
        return actionItems.length > 0 ? actionItems.join('\n') : '✅ No immediate action items.';
    }

    generateCSV() {
        const headers = [
            'ID', 'Source', 'Type', 'Title', 'Category', 'Priority', 
            'Status', 'Sentiment', 'Author', 'Created', 'Updated'
        ];
        
        const rows = this.results.feedback.map(feedback => [
            feedback.id,
            feedback.source,
            feedback.type,
            `"${feedback.title.replace(/"/g, '""')}"`,
            feedback.category,
            feedback.priority,
            feedback.status,
            feedback.sentiment,
            feedback.author,
            feedback.created,
            feedback.updated || ''
        ]);
        
        return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    }
}

// CLI usage
if (require.main === module) {
    const configPath = process.argv[2] || './config/monitoring-config.json';
    let config = {};
    
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8')).feedback || {};
    }
    
    const processor = new FeedbackProcessor(config);
    processor.processFeedback().catch(error => {
        console.error('Failed to process feedback:', error);
        process.exit(1);
    });
}

module.exports = FeedbackProcessor;