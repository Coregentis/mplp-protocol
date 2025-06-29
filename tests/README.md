# MPLP 测试体系

本目录包含 Multi-Agent Project Lifecycle Protocol (MPLP) 项目的完整测试体系，确保协议的质量、一致性和可靠性。

## 📁 目录结构

```
tests/
├── README.md                    # 本文档
├── setup.js                    # 全局测试设置
├── unit/                       # 单元测试
│   ├── schema-validation.test.js        # Schema 验证测试
│   ├── documentation-consistency.test.js # 文档一致性测试
│   └── translation-quality.test.js      # 翻译质量测试
└── integration/                # 集成测试
    └── system-integration.test.js       # 系统集成测试
```

## 🧪 测试类型

### 单元测试 (Unit Tests)

#### Schema 验证测试
- **文件**: `unit/schema-validation.test.js`
- **目的**: 验证所有 JSON Schema 文件的有效性和示例文件的符合性
- **覆盖范围**:
  - Schema 文件存在性和有效性
  - Schema 符合 JSON Schema 规范
  - 示例文件与对应 Schema 的匹配性
  - Schema 索引文件的完整性

#### 文档一致性测试
- **文件**: `unit/documentation-consistency.test.js`
- **目的**: 确保多语言文档结构和内容的一致性
- **覆盖范围**:
  - 多语言目录结构一致性
  - 协议模块文档完整性
  - 文档内容结构验证
  - 交叉引用有效性

#### 翻译质量测试
- **文件**: `unit/translation-quality.test.js`
- **目的**: 验证多语言翻译的完整性和质量
- **覆盖范围**:
  - 翻译完整性检查
  - 技术术语一致性
  - 代码示例一致性
  - 语言特定格式规范

### 集成测试 (Integration Tests)

#### 系统集成测试
- **文件**: `integration/system-integration.test.js`
- **目的**: 验证整个系统各组件的协同工作
- **覆盖范围**:
  - 端到端协议验证
  - 文档与 Schema 同步性
  - 多语言一致性
  - 构建和发布流程
  - 开发工作流集成
  - 质量保证措施

## 🚀 运行测试

### 基本命令

```bash
# 运行所有测试
npm test

# 运行单元测试
npm run test:unit

# 运行集成测试
npm run test:integration

# 运行测试并生成覆盖率报告
npm run test:coverage

# 监视模式（开发时使用）
npm run test:watch

# CI 模式
npm run test:ci
```

### 使用测试运行脚本

```bash
# 使用自定义测试运行器
node scripts/run-tests.js [command] [options]

# 示例
node scripts/run-tests.js unit --coverage
node scripts/run-tests.js integration --watch
node scripts/run-tests.js all --coverage --ci
node scripts/run-tests.js pre-commit
```

### 可用选项

- `--coverage`: 生成覆盖率报告
- `--watch`: 监视文件变化并自动重新运行测试
- `--ci`: CI 模式，适用于持续集成环境
- `--verbose`: 详细输出

## 📊 测试报告

测试运行后，报告将生成在以下位置：

```
build/reports/
├── coverage/                   # 覆盖率报告
│   ├── lcov-report/           # HTML 覆盖率报告
│   ├── lcov.info              # LCOV 格式报告
│   └── coverage-summary.json  # 覆盖率摘要
├── tests/                     # 测试报告
│   └── test-results.json      # 测试结果摘要
└── jest-html-reporters-attach/ # Jest HTML 报告
```

### 查看报告

1. **覆盖率报告**: 打开 `build/reports/coverage/lcov-report/index.html`
2. **测试报告**: 查看 `build/reports/tests/test-results.json`
3. **HTML 测试报告**: 查看 `jest-html-reporters-attach/` 目录下的 HTML 文件

## ⚙️ 配置

### Jest 配置

测试配置位于 `config/testing/jest.config.js`，包含：

- **测试环境**: Node.js
- **测试文件匹配**: `**/*.test.js`, `**/*.spec.js`
- **覆盖率阈值**: 80%（全局）
- **超时设置**: 30秒
- **报告生成**: HTML 和 JSON 格式

### 全局测试工具

`setup.js` 提供了全局测试工具 `global.testUtils`：

```javascript
// 获取项目路径
const projectPath = global.testUtils.getProjectPath('docs', 'en');

// 读取 JSON 文件
const data = global.testUtils.readJsonFile(filePath);

// 写入 JSON 文件
global.testUtils.writeJsonFile(filePath, data);

// 检查文件存在
const exists = global.testUtils.fileExists(filePath);

// 获取目录下的文件列表
const files = global.testUtils.getFilesInDirectory(dirPath);

// 创建临时目录
const tempDir = global.testUtils.createTempDirectory();

// 清理临时文件
global.testUtils.cleanupTempFiles();
```

## 🔧 开发指南

### 添加新测试

1. **单元测试**: 在 `unit/` 目录下创建 `*.test.js` 文件
2. **集成测试**: 在 `integration/` 目录下创建 `*.test.js` 文件
3. **使用全局工具**: 利用 `global.testUtils` 进行文件操作
4. **遵循命名规范**: 使用描述性的测试名称

### 测试最佳实践

1. **独立性**: 每个测试应该独立运行，不依赖其他测试
2. **清晰性**: 测试名称应该清楚描述测试的目的
3. **完整性**: 测试应该覆盖正常情况和边界情况
4. **维护性**: 使用辅助函数避免重复代码
5. **性能**: 避免不必要的文件 I/O 操作

## 🚨 故障排除

### 常见问题

1. **测试超时**: 检查 `config/testing/jest.config.js` 中的 `testTimeout` 设置
2. **文件路径问题**: 使用 `global.testUtils.getProjectPath()` 获取正确路径
3. **覆盖率不足**: 检查 `coverageThreshold` 设置并添加更多测试
4. **依赖问题**: 运行 `npm ci` 重新安装依赖

## 🔄 持续集成

项目配置了 GitHub Actions 工作流，包含多 Node.js 版本测试、代码质量检查、安全扫描等。

### 预提交检查

```bash
node scripts/run-tests.js pre-commit
```

## 📈 质量指标

- **覆盖率目标**: ≥ 80%（行、函数、分支、语句）
- **测试通过率**: 100%
- **文档覆盖率**: 100%（所有协议模块）
- **翻译完整性**: 100%（所有支持语言）

## 测试规范

- 使用 Jest 作为测试框架
- 测试文件命名：`*.test.js` 或 `*.spec.js`
- 测试覆盖率目标：≥ 80%
- 所有新功能必须包含对应测试