# MPLP 配置文件

本目录包含 MPLP 项目的各种配置文件。

## 配置文件结构

### 核心配置文件
- `docs-quality.config.js` - 文档质量检查配置
- `docs-version.config.js` - 文档版本控制配置
- `monitoring-config.json` - 项目监控配置

### 分类配置目录

#### 代码质量 (`lint/`)
- `.lintstagedrc.json` - Git staged 文件检查配置
- `.markdownlint.json` - Markdown 文件检查配置
- `commitlint.config.js` - 提交信息规范配置

#### 发布管理 (`release/`)
- `release-config.json` - 发布流程配置
- `release-approval-config.json` - 发布审批配置

#### 安全策略 (`security/`)
- `.security-config.json` - 安全扫描和策略配置

#### 测试配置 (`testing/`)
- `jest.config.js` - Jest 测试框架配置

## 配置说明

### 构建配置 (build.config.js)
- 编译选项
- 输出目录设置
- 资源处理规则
- 优化选项

### 测试配置 (test.config.js)
- 测试框架设置
- 覆盖率配置
- 测试环境变量
- 模拟数据配置

### 文档配置 (docs.config.js)
- 文档生成规则
- 模板设置
- 输出格式配置
- 多语言支持设置

### 发布配置 (release.config.js)
- 版本控制策略
- 发布渠道设置
- 自动化流程配置
- 通知设置

## 环境配置

项目支持多环境配置：

- **development**: 开发环境配置
- **staging**: 预发布环境配置
- **production**: 生产环境配置

## 配置使用

```javascript
// 加载配置
const config = require('./config/build.config.js');

// 环境特定配置
const envConfig = require(`./config/environments/${process.env.NODE_ENV}.js`);
```

## 配置管理原则

1. **安全性**: 敏感信息使用环境变量
2. **可维护性**: 配置文件结构清晰
3. **灵活性**: 支持环境特定覆盖
4. **文档化**: 每个配置项都有清晰说明