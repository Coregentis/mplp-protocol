#!/usr/bin/env node

/**
 * 文档管理系统入口脚本
 * 提供统一的文档管理命令行接口
 */

const { program } = require('commander');
const chalk = require('chalk');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 导入各个管理模块
const DocsVersionManager = require('./docs-version-manager');
const DocsQualityMonitor = require('./docs-quality-monitor');
const DocsSync = require('./docs-sync-enhanced');

class DocsManager {
    constructor() {
        this.versionManager = new DocsVersionManager();
        this.qualityMonitor = new DocsQualityMonitor();
        this.syncManager = new DocsSync();
        this.setupCommands();
    }

    setupCommands() {
        program
            .name('docs-manager')
            .description('Multi-Agent Project Lifecycle Protocol 文档管理系统')
            .version('1.0.0');

        // 初始化命令
        program
            .command('init')
            .description('初始化文档管理系统')
            .option('--force', '强制重新初始化')
            .action(async (options) => {
                await this.initializeSystem(options.force);
            });

        // 状态检查命令
        program
            .command('status')
            .description('查看文档系统状态')
            .option('--detailed', '显示详细状态信息')
            .action(async (options) => {
                await this.showStatus(options.detailed);
            });

        // 质量检查命令
        program
            .command('check')
            .description('运行文档质量检查')
            .option('--fix', '自动修复可修复的问题')
            .option('--report', '生成详细报告')
            .action(async (options) => {
                await this.runQualityCheck(options);
            });

        // 同步命令
        program
            .command('sync')
            .description('同步多语言文档')
            .option('--language <lang>', '指定同步的语言')
            .option('--dry-run', '预览同步操作')
            .action(async (options) => {
                await this.syncDocuments(options);
            });

        // 更新命令
        program
            .command('update')
            .description('更新文档版本')
            .option('--type <type>', '更新类型 (patch|minor|major)', 'patch')
            .option('--message <msg>', '更新说明')
            .action(async (options) => {
                await this.updateVersion(options);
            });

        // 完整管理流程
        program
            .command('manage')
            .description('运行完整的文档管理流程')
            .option('--skip-sync', '跳过同步步骤')
            .option('--skip-quality', '跳过质量检查')
            .action(async (options) => {
                await this.runFullManagement(options);
            });

        // 报告命令
        program
            .command('report')
            .description('生成文档管理报告')
            .option('--type <type>', '报告类型 (version|quality|sync|all)', 'all')
            .option('--format <format>', '报告格式 (json|markdown|html)', 'markdown')
            .action(async (options) => {
                await this.generateReport(options);
            });

        // 配置命令
        program
            .command('config')
            .description('管理配置设置')
            .option('--show', '显示当前配置')
            .option('--validate', '验证配置文件')
            .action(async (options) => {
                await this.manageConfig(options);
            });
    }

    async initializeSystem(force = false) {
        console.log(chalk.blue('🚀 初始化文档管理系统...'));

        try {
            // 检查是否已初始化
            if (!force && await this.isInitialized()) {
                console.log(chalk.yellow('⚠️  系统已初始化，使用 --force 强制重新初始化'));
                return;
            }

            // 创建必要的目录
            await this.createDirectories();

            // 初始化版本管理
            console.log(chalk.cyan('📋 初始化版本管理...'));
            await this.versionManager.initialize();

            // 初始化质量监控
            console.log(chalk.cyan('🔍 初始化质量监控...'));
            await this.qualityMonitor.initialize();

            // 初始化同步管理
            console.log(chalk.cyan('🔄 初始化同步管理...'));
            await this.syncManager.initialize();

            console.log(chalk.green('✅ 文档管理系统初始化完成！'));
            console.log(chalk.gray('💡 运行 `docs-manager status` 查看系统状态'));

        } catch (error) {
            console.error(chalk.red('❌ 初始化失败:'), error.message);
            process.exit(1);
        }
    }

    async showStatus(detailed = false) {
        console.log(chalk.blue('📊 文档系统状态'));
        console.log('='.repeat(50));

        try {
            // 版本状态
            const versionStatus = await this.versionManager.getStatus();
            console.log(chalk.cyan('📋 版本管理:'));
            console.log(`  当前版本: ${versionStatus.version}`);
            console.log(`  跟踪文件: ${versionStatus.trackedFiles}`);
            console.log(`  待处理变更: ${versionStatus.pendingChanges}`);

            // 质量状态
            const qualityStatus = await this.qualityMonitor.getOverallStatus();
            console.log(chalk.cyan('🔍 质量监控:'));
            console.log(`  总体评分: ${qualityStatus.overallScore}/100`);
            console.log(`  问题数量: ${qualityStatus.totalIssues}`);
            console.log(`  最后检查: ${qualityStatus.lastCheck}`);

            // 同步状态
            const syncStatus = await this.syncManager.getStatus();
            console.log(chalk.cyan('🔄 同步状态:'));
            console.log(`  支持语言: ${syncStatus.supportedLanguages.join(', ')}`);
            console.log(`  同步状态: ${syncStatus.syncStatus}`);
            console.log(`  最后同步: ${syncStatus.lastSync}`);

            if (detailed) {
                console.log('\n' + chalk.yellow('📝 详细信息:'));
                console.log('版本详情:', JSON.stringify(versionStatus, null, 2));
                console.log('质量详情:', JSON.stringify(qualityStatus, null, 2));
                console.log('同步详情:', JSON.stringify(syncStatus, null, 2));
            }

        } catch (error) {
            console.error(chalk.red('❌ 获取状态失败:'), error.message);
        }
    }

    async runQualityCheck(options) {
        console.log(chalk.blue('🔍 运行文档质量检查...'));

        try {
            const results = await this.qualityMonitor.runFullCheck();

            console.log(chalk.cyan('📊 检查结果:'));
            console.log(`  总体评分: ${results.overallScore}/100`);
            console.log(`  检查文件: ${results.checkedFiles}`);
            console.log(`  发现问题: ${results.totalIssues}`);

            if (results.issues.length > 0) {
                console.log(chalk.yellow('⚠️  发现的问题:'));
                results.issues.forEach((issue, index) => {
                    console.log(`  ${index + 1}. ${issue.type}: ${issue.message}`);
                    if (issue.file) console.log(`     文件: ${issue.file}`);
                });
            }

            if (options.fix) {
                console.log(chalk.cyan('🔧 尝试自动修复...'));
                const fixResults = await this.qualityMonitor.autoFix();
                console.log(`  修复问题: ${fixResults.fixed}`);
                console.log(`  剩余问题: ${fixResults.remaining}`);
            }

            if (options.report) {
                const reportPath = await this.qualityMonitor.generateReport('markdown');
                console.log(chalk.green(`📄 详细报告已生成: ${reportPath}`));
            }

        } catch (error) {
            console.error(chalk.red('❌ 质量检查失败:'), error.message);
        }
    }

    async syncDocuments(options) {
        console.log(chalk.blue('🔄 同步多语言文档...'));

        try {
            const syncOptions = {
                targetLanguage: options.language,
                dryRun: options.dryRun
            };

            const results = await this.syncManager.syncAll(syncOptions);

            console.log(chalk.cyan('📊 同步结果:'));
            console.log(`  处理文件: ${results.processedFiles}`);
            console.log(`  同步成功: ${results.successful}`);
            console.log(`  同步失败: ${results.failed}`);
            console.log(`  跳过文件: ${results.skipped}`);

            if (results.conflicts.length > 0) {
                console.log(chalk.yellow('⚠️  发现冲突:'));
                results.conflicts.forEach((conflict, index) => {
                    console.log(`  ${index + 1}. ${conflict.file}: ${conflict.reason}`);
                });
            }

            if (!options.dryRun) {
                console.log(chalk.green('✅ 文档同步完成'));
            } else {
                console.log(chalk.yellow('👀 预览模式 - 未实际执行同步'));
            }

        } catch (error) {
            console.error(chalk.red('❌ 文档同步失败:'), error.message);
        }
    }

    async updateVersion(options) {
        console.log(chalk.blue('📈 更新文档版本...'));

        try {
            const updateResult = await this.versionManager.updateVersion({
                type: options.type,
                message: options.message
            });

            console.log(chalk.green('✅ 版本更新成功'));
            console.log(`  新版本: ${updateResult.newVersion}`);
            console.log(`  更新文件: ${updateResult.updatedFiles}`);
            console.log(`  变更摘要: ${updateResult.changesSummary}`);

        } catch (error) {
            console.error(chalk.red('❌ 版本更新失败:'), error.message);
        }
    }

    async runFullManagement(options) {
        console.log(chalk.blue('🎯 运行完整文档管理流程...'));
        console.log('='.repeat(50));

        try {
            // 1. 版本检查
            console.log(chalk.cyan('1️⃣  检查文档版本...'));
            const versionStatus = await this.versionManager.detectChanges();
            
            // 2. 质量检查
            if (!options.skipQuality) {
                console.log(chalk.cyan('2️⃣  运行质量检查...'));
                await this.runQualityCheck({ report: true });
            }

            // 3. 同步检查
            if (!options.skipSync) {
                console.log(chalk.cyan('3️⃣  检查同步状态...'));
                await this.syncDocuments({ dryRun: true });
            }

            // 4. 生成综合报告
            console.log(chalk.cyan('4️⃣  生成综合报告...'));
            await this.generateReport({ type: 'all', format: 'markdown' });

            console.log(chalk.green('🎉 文档管理流程完成！'));

        } catch (error) {
            console.error(chalk.red('❌ 管理流程失败:'), error.message);
        }
    }

    async generateReport(options) {
        console.log(chalk.blue('📄 生成文档管理报告...'));

        try {
            const reportData = {
                timestamp: new Date().toISOString(),
                version: await this.versionManager.getStatus(),
                quality: await this.qualityMonitor.getOverallStatus(),
                sync: await this.syncManager.getStatus()
            };

            const reportPath = path.join(process.cwd(), 'docs', 'reports', 'management');
            await fs.promises.mkdir(reportPath, { recursive: true });

            const filename = `docs-management-report-${new Date().toISOString().split('T')[0]}.${options.format}`;
            const fullPath = path.join(reportPath, filename);

            if (options.format === 'json') {
                await fs.promises.writeFile(fullPath, JSON.stringify(reportData, null, 2));
            } else if (options.format === 'markdown') {
                const markdown = this.generateMarkdownReport(reportData);
                await fs.promises.writeFile(fullPath, markdown);
            }

            console.log(chalk.green(`📄 报告已生成: ${fullPath}`));

        } catch (error) {
            console.error(chalk.red('❌ 报告生成失败:'), error.message);
        }
    }

    generateMarkdownReport(data) {
        return `# 文档管理报告

生成时间: ${data.timestamp}

## 版本状态
- 当前版本: ${data.version.version}
- 跟踪文件: ${data.version.trackedFiles}
- 待处理变更: ${data.version.pendingChanges}

## 质量状态
- 总体评分: ${data.quality.overallScore}/100
- 问题数量: ${data.quality.totalIssues}
- 最后检查: ${data.quality.lastCheck}

## 同步状态
- 支持语言: ${data.sync.supportedLanguages.join(', ')}
- 同步状态: ${data.sync.syncStatus}
- 最后同步: ${data.sync.lastSync}

---
*报告由文档管理系统自动生成*
`;
    }

    async manageConfig(options) {
        if (options.show) {
            console.log(chalk.blue('⚙️  当前配置:'));
            // 显示配置信息
        }

        if (options.validate) {
            console.log(chalk.blue('✅ 验证配置文件...'));
            // 验证配置
        }
    }

    async isInitialized() {
        const configPaths = [
            'config/docs-quality.config.js',
            'config/docs-version.config.js'
        ];

        for (const configPath of configPaths) {
            if (!fs.existsSync(path.join(process.cwd(), configPath))) {
                return false;
            }
        }
        return true;
    }

    async createDirectories() {
        const directories = [
            'docs/reports/version',
            'docs/reports/quality',
            'docs/reports/sync',
            'docs/reports/management'
        ];

        for (const dir of directories) {
            await fs.promises.mkdir(path.join(process.cwd(), dir), { recursive: true });
        }
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    const manager = new DocsManager();
    program.parse(process.argv);

    // 如果没有提供命令，显示帮助
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
}

module.exports = DocsManager;