# MPLP Scripts Directory

本目录包含 Multi-Agent Project Lifecycle Protocol (MPLP) 项目的核心脚本工具。

## 核心脚本分类

### 📦 发布管理
- **release-enhanced.js** - 增强版发布管理器，提供企业级发布流程
- **quick-release.bat/sh** - 快速发布脚本（Windows/Unix）
- **version-manager.js** - 版本管理统一接口
- **version-updater.js** - versions.json 版本更新器
- **changelog-generator.js** - 自动化多语言变更日志生成器

### 📚 文档管理
- **docs-manager.js** - 文档管理系统统一入口
- **docs-sync-enhanced.js** - 增强版文档同步系统
- **docs-version-manager.js** - 文档版本控制管理器
- **translate-all-docs.js** - 完整文档翻译系统（9种语言）
- **translate-updated-docs.js** - 智能增量文档翻译
- **translation-quality-check.js** - 翻译质量检查工具
- **generate-schema-docs.js** - Schema 文档生成器

### 🔍 验证与测试
- **validate-examples.js** - 示例文件验证器
- **run-tests.js** - 统一测试执行器
- **compatibility-checker.js** - 向后兼容性检查器
- **update-compatibility-matrix.js** - 兼容性矩阵管理器
- **check-frozen-integrity.js** - 冻结版本完整性检查

## 脚本使用指南

### 发布流程
```bash
# 标准发布
node scripts/release-enhanced.js --type minor

# 快速发布
./scripts/quick-release.sh --type patch
```

### 文档管理
```bash
# 文档同步
node scripts/docs-manager.js sync

# 翻译所有文档
node scripts/translate-all-docs.js

# 检查翻译质量
node scripts/translation-quality-check.js
```

### 验证测试
```bash
# 运行所有测试
node scripts/run-tests.js

# 验证示例文件
node scripts/validate-examples.js

# 检查兼容性
node scripts/compatibility-checker.js
```

## 清理说明

本次清理删除了以下重复或冗余脚本：
- `release.js` - 被 `release-enhanced.js` 替代
- `update-version-compatibility.js` - 功能合并到 `update-compatibility-matrix.js`
- `duplicate-docs-to-languages.js` - 功能合并到翻译系统
- `generate-schema-graph.js` - 非核心功能
- `start-monitoring.js` - 监控功能暂不需要
- `.translation-hashes.json` - 临时文件

## 维护建议

1. **定期检查** - 每次发布前运行验证脚本
2. **文档同步** - 修改协议后及时同步多语言文档
3. **版本管理** - 使用统一的版本管理工具
4. **测试覆盖** - 确保所有示例文件通过验证

---

*最后更新: 2024年*
*维护者: MPLP 开发团队*