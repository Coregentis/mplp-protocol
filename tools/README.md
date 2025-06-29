# MPLP 开发工具

本目录包含 MPLP 项目开发过程中使用的监控和质量保证工具。

## 工具分类

```
tools/
└── monitoring/     # 监控和质量保证工具
    ├── doc-quality-monitor.js      # 文档质量监控
    ├── feedback-processor.js       # 反馈处理器
    ├── monitoring-dashboard.js     # 监控仪表板
    └── schema-impact-analyzer.js   # Schema 影响分析器
```

## 主要工具

### 监控工具
- `doc-quality-monitor.js` - 文档质量监控和评估
- `feedback-processor.js` - 用户反馈处理和分析
- `monitoring-dashboard.js` - 项目健康状况监控仪表板
- `schema-impact-analyzer.js` - Schema 变更影响分析

## 注意事项

大部分开发工具已迁移到 `scripts/` 目录下，包括：
- 构建和发布工具
- 文档生成和同步工具
- 翻译和验证工具
- 版本管理工具

如需使用这些工具，请参考 `scripts/` 目录或使用 `package.json` 中定义的 npm 脚本。

## 使用方法

```bash
# 运行特定工具
node tools/docs/doc-generator.js

# 通过 npm 脚本运行
npm run tools:validate
npm run tools:build
npm run tools:docs
```

## 开发新工具

1. 在相应分类目录下创建工具文件
2. 遵循现有工具的代码规范
3. 添加必要的文档和使用说明
4. 在 `package.json` 中添加对应的 npm 脚本
5. 编写单元测试