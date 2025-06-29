/**
 * 文档管理系统测试套件
 * 测试文档版本管理、质量监控、同步增强等功能
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 模拟依赖
jest.mock('fs');
jest.mock('child_process');

// 导入被测试的模块
const DocsVersionManager = require('../../scripts/docs-version-manager');
const DocsQualityMonitor = require('../../tools/monitoring/doc-quality-monitor');
const DocsSync = require('../../scripts/docs-sync-enhanced');

// 测试数据常量
const MOCK_PACKAGE_JSON = {
  name: 'test-package',
  version: '1.0.0'
};

const MOCK_VERSION_DATA = {
  version: '1.0.0',
  timestamp: '2024-01-01T00:00:00.000Z',
  languages: {
    en: { status: 'synced' },
    zh: { status: 'synced' }
  },
  files: {
    'test.md': {
      hash: 'abc123',
      lastModified: '2024-01-01T00:00:00.000Z'
    }
  },
  baselineHash: 'baseline123',
  quality: {
    overall: 85,
    coverage: 90,
    consistency: 80
  }
};

const MOCK_MARKDOWN_CONTENT = `# Test Document

This is a test document.

## Section 1

Content here.
`;

const MOCK_QUALITY_REPORT = {
  timestamp: '2024-01-01T00:00:00.000Z',
  summary: {
    totalFiles: 2,
    passedFiles: 2,
    failedFiles: 0,
    warningFiles: 0,
    overallScore: 100
  },
  languages: {
    en: { score: 100 }
  },
  issues: [],
  recommendations: []
};

describe('文档管理系统', () => {
  let docsVersionManager;
  let docsQualityMonitor;
  let docsSync;

  beforeEach(() => {
    // 重置所有模拟
    jest.clearAllMocks();
    
    // 设置 fs 模拟
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockImplementation((filePath) => {
      if (filePath.includes('package.json')) {
        return JSON.stringify(MOCK_PACKAGE_JSON);
      }
      if (filePath.includes('version') || filePath.includes('.json')) {
        return JSON.stringify(MOCK_VERSION_DATA);
      }
      return MOCK_MARKDOWN_CONTENT;
    });
    fs.writeFileSync.mockImplementation(() => {});
    fs.readdirSync.mockReturnValue(['test.md', 'example.md']);
    fs.statSync.mockReturnValue({
      isDirectory: () => false,
      isFile: () => true,
      mtime: new Date('2024-01-01T00:00:00.000Z')
    });
    fs.mkdirSync.mockImplementation(() => {});
    
    // 设置 execSync 模拟
    execSync.mockReturnValue('mocked output');
    
    // 创建实例
    docsVersionManager = new DocsVersionManager();
    docsQualityMonitor = new DocsQualityMonitor();
    docsSync = new DocsSync();
  });

  describe('DocsVersionManager', () => {
    test('应该能够加载版本信息', () => {
      const versionData = docsVersionManager.loadVersion();
      expect(versionData).toBeDefined();
      expect(versionData.version).toBe('1.0.0');
    });

    test('应该能够获取所有Markdown文件', () => {
      const files = docsVersionManager.getAllMarkdownFiles('./docs');
      expect(Array.isArray(files)).toBe(true);
    });

    test('应该能够更新版本', async () => {
      const result = await docsVersionManager.updateVersion('1.0.1');
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    test('应该能够生成状态报告', async () => {
      const report = await docsVersionManager.generateStatusReport();
      expect(report).toBeDefined();
    });
  });

  describe('DocsQualityMonitor', () => {
    test('应该能够运行完整质量检查', async () => {
      const result = await docsQualityMonitor.runFullQualityCheck();
      expect(result).toBeDefined();
      expect(result.summary).toBeDefined();
      expect(typeof result.summary.overallScore).toBe('number');
    });

    test('应该能够检查文档结构', () => {
      const report = { issues: [], score: 100, metrics: {} };
      const structure = docsQualityMonitor.checkStructure(MOCK_MARKDOWN_CONTENT, report);
      expect(structure).toBeDefined();
    });

    test('应该能够检查内容质量', () => {
      const report = { issues: [], score: 100, metrics: {} };
      const metrics = docsQualityMonitor.checkContent(MOCK_MARKDOWN_CONTENT, report);
      expect(metrics).toBeDefined();
    });

    test('应该能够运行完整质量检查', async () => {
      const report = await docsQualityMonitor.runFullQualityCheck();
      expect(report).toBeDefined();
      expect(report.summary).toBeDefined();
    });
  });

  describe('DocsSync', () => {
    test('应该能够初始化', () => {
      expect(docsSync).toBeDefined();
      expect(docsSync.config).toBeDefined();
    });

    test('应该能够运行完整同步', async () => {
      const report = await docsSync.runFullSync({ dryRun: true });
      expect(report).toBeDefined();
      expect(report.summary).toBeDefined();
    });

    test('应该能够加载配置', () => {
      const config = docsSync.loadConfig();
      expect(config).toBeDefined();
      expect(config.languages).toBeDefined();
    });
  });

  describe('错误处理', () => {
    test('应该处理文件不存在的情况', () => {
      fs.existsSync.mockReturnValue(false);
      expect(() => {
        docsVersionManager.loadVersion();
      }).not.toThrow();
    });

    test('应该处理无效JSON', () => {
      fs.readFileSync.mockReturnValue('invalid json');
      expect(() => {
        docsVersionManager.loadVersion();
      }).toThrow();
    });
  });

  describe('集成测试', () => {
    test('应该能够集成版本控制与质量监控', async () => {
      const versionData = docsVersionManager.loadVersion();
      const quality = await docsQualityMonitor.runFullQualityCheck();
      
      expect(versionData).toBeDefined();
      expect(versionData.version).toBeDefined();
      expect(quality).toBeDefined();
      expect(quality.summary.overallScore).toBeGreaterThanOrEqual(0);
    });
  });
});