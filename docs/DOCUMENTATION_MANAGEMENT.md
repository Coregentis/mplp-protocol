# 文档管理系统

本项目实现了一个全面的文档管理系统，用于自动化文档版本控制、质量监控、多语言同步和持续集成。

## 系统概述

文档管理系统包含以下核心组件：

### 1. 文档版本管理器 (`scripts/docs-version-manager.js`)
- 跟踪文档版本和变更
- 检测文档修改和依赖关系
- 管理多语言同步状态
- 生成版本报告

### 2. 文档质量监控器 (`scripts/docs-quality-monitor.js`)
- 评估文档质量指标
- 检测内容、结构和链接问题
- 验证翻译质量
- 生成质量报告

### 3. 增强型文档同步器 (`scripts/docs-sync-enhanced.js`)
- 智能多语言文档同步
- 冲突检测和解决
- 同步状态验证
- 增量同步优化

### 4. 配置管理
- `config/docs-quality.config.js` - 质量检查配置
- `config/docs-version.config.js` - 版本控制配置

## 快速开始

### 安装依赖
```bash
npm install
```

### 初始化文档版本控制
```bash
npm run docs:version:init
```

### 检查文档状态
```bash
npm run docs:version:status
```

### 运行质量检查
```bash
npm run docs:quality:check
```

### 同步多语言文档
```bash
npm run docs:sync
```

## 可用命令

### 文档版本管理
- `npm run docs:version:init` - 初始化版本控制
- `npm run docs:version:status` - 查看版本状态
- `npm run docs:version:update` - 更新文档版本
- `npm run docs:version:report` - 生成版本报告
- `npm run docs:version:changes` - 检测文档变更

### 文档质量监控
- `npm run docs:quality:check` - 运行质量检查
- `npm run docs:quality:report` - 生成质量报告
- `npm run docs:quality:file <file>` - 检查单个文件
- `npm run docs:quality:config` - 查看配置信息

### 文档同步
- `npm run docs:sync` - 同步所有语言
- `npm run docs:sync:status` - 查看同步状态
- `npm run docs:sync:verify` - 验证同步结果
- `npm run docs:sync:config` - 查看同步配置

### 综合管理
- `npm run docs:manage` - 运行完整文档管理流程
- `npm run docs:update` - 更新和同步文档

## 工作流集成

### GitHub Actions
文档管理系统通过 `.github/workflows/docs-management.yml` 工作流自动运行：

- **触发条件**：
  - 包含 `docs:` 的提交
  - Pull Request
  - 定时任务（每日）
  - 手动触发

- **执行步骤**：
  1. 文档版本控制检查
  2. 文档质量评估
  3. 多语言同步验证
  4. 文档结构验证
  5. 性能检查
  6. 自动版本更新（如需要）
  7. 生成综合报告

### CI/CD 集成
文档管理工作流已集成到主 CI 流程中，在以下情况下自动运行：
- 文档相关提交
- Pull Request
- 定时检查

## 配置说明

### 质量检查配置
在 `config/docs-quality.config.js` 中配置：
- 内容长度要求
- 结构验证规则
- 链接检查设置
- 翻译质量标准
- 报告生成选项

### 版本控制配置
在 `config/docs-version.config.js` 中配置：
- 版本号规则
- 变更检测敏感度
- 多语言同步设置
- 依赖跟踪规则
- 质量门禁标准

## 报告和输出

### 报告位置
- 版本报告：`docs/reports/version/`
- 质量报告：`docs/reports/quality/`
- 同步报告：`docs/reports/sync/`

### 报告格式
- JSON 格式：机器可读，用于 CI/CD 集成
- Markdown 格式：人类可读，用于文档和审查
- HTML 格式：可视化报告，用于展示

## 最佳实践

### 1. 文档编写
- 遵循项目文档结构
- 使用清晰的标题层次
- 包含必要的元数据
- 保持内容简洁明了

### 2. 多语言管理
- 主语言（英文）优先更新
- 使用翻译标记和状态
- 定期检查翻译质量
- 保持语言版本同步

### 3. 版本控制
- 使用语义化版本号
- 记录重要变更
- 定期生成版本报告
- 跟踪文档依赖关系

### 4. 质量保证
- 定期运行质量检查
- 修复检测到的问题
- 监控质量趋势
- 设置合理的质量门禁

## 故障排除

### 常见问题

1. **版本初始化失败**
   - 检查文件权限
   - 确保目录结构正确
   - 验证配置文件语法

2. **质量检查报错**
   - 检查文档格式
   - 验证链接有效性
   - 确认翻译状态标记

3. **同步失败**
   - 检查目标语言目录
   - 验证文件编码
   - 确认同步规则配置

### 调试模式
设置环境变量启用详细日志：
```bash
DEBUG=docs:* npm run docs:manage
```

## 扩展和自定义

### 添加新语言
1. 在配置中添加语言代码
2. 创建对应的文档目录
3. 更新同步规则
4. 配置翻译质量检查

### 自定义质量规则
1. 修改 `config/docs-quality.config.js`
2. 添加新的检查函数
3. 更新报告模板
4. 测试新规则

### 集成外部工具
1. 在配置中添加工具设置
2. 实现工具接口
3. 更新工作流
4. 添加相应测试

## 贡献指南

1. 遵循现有代码风格
2. 添加适当的测试
3. 更新相关文档
4. 提交前运行完整检查

## 许可证

本文档管理系统遵循项目主许可证。