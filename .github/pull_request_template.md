# Pull Request

## 📋 变更概述 / Change Summary

<!-- 请简要描述这个 PR 的主要变更 / Please briefly describe the main changes in this PR -->

### 变更类型 / Change Type
<!-- 请选择适用的类型 / Please select the applicable type -->

- [ ] 🐛 错误修复 / Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ 新功能 / New feature (non-breaking change which adds functionality)
- [ ] 💥 破坏性变更 / Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 文档更新 / Documentation update
- [ ] 🔧 工具链改进 / Toolchain improvement
- [ ] 🎨 代码风格 / Code style (formatting, missing semi colons, etc; no code change)
- [ ] ♻️ 重构 / Refactoring (no functional changes, no api changes)
- [ ] ⚡ 性能优化 / Performance improvement
- [ ] 🧪 测试 / Tests (adding missing tests, refactoring tests; no production code change)
- [ ] 🔒 安全修复 / Security fix
- [ ] 🌐 国际化 / Internationalization
- [ ] 📦 依赖更新 / Dependency update
- [ ] 🚀 发布相关 / Release related
- [ ] 📊 监控改进 / Monitoring improvement

## 🎯 相关 Issue / Related Issues

<!-- 请链接相关的 Issues / Please link related issues -->

- Closes #(issue number)
- Fixes #(issue number)
- Related to #(issue number)

## 📝 详细描述 / Detailed Description

<!-- 详细描述您的变更，包括动机和上下文 / Describe your changes in detail, including motivation and context -->

### 问题描述 / Problem Description
<!-- 描述您要解决的问题 / Describe the problem you are solving -->

### 解决方案 / Solution
<!-- 描述您的解决方案 / Describe your solution -->

### 实现细节 / Implementation Details
<!-- 描述重要的实现细节 / Describe important implementation details -->

## 🧪 测试 / Testing

<!-- 描述您如何测试这些变更 / Describe how you tested these changes -->

### 测试类型 / Test Types
- [ ] 单元测试 / Unit tests
- [ ] 集成测试 / Integration tests
- [ ] 端到端测试 / End-to-end tests
- [ ] 手动测试 / Manual testing
- [ ] 性能测试 / Performance testing
- [ ] 安全测试 / Security testing

### 测试环境 / Test Environment
<!-- 列出测试环境信息 / List test environment information -->

- 操作系统 / OS: 
- Node.js 版本 / Node.js version: 
- 浏览器 / Browser: (如适用 / if applicable)

### 测试步骤 / Test Steps
<!-- 描述测试步骤 / Describe test steps -->

1. 
2. 
3. 

### 测试结果 / Test Results
<!-- 描述测试结果 / Describe test results -->

## 📸 截图 / Screenshots

<!-- 如果适用，请添加截图来说明您的变更 / If applicable, add screenshots to illustrate your changes -->

| 变更前 / Before | 变更后 / After |
|---|---|
| <!-- 截图 / Screenshot --> | <!-- 截图 / Screenshot --> |

## 📋 检查清单 / Checklist

### 代码质量 / Code Quality
- [ ] 我的代码遵循项目的代码风格指南 / My code follows the project's style guidelines
- [ ] 我已经进行了自我代码审查 / I have performed a self-review of my own code
- [ ] 我已经对代码进行了注释，特别是在难以理解的区域 / I have commented my code, particularly in hard-to-understand areas
- [ ] 我的变更没有产生新的警告 / My changes generate no new warnings
- [ ] 代码通过了所有现有的测试 / Code passes all existing tests

### 测试 / Testing
- [ ] 我已经添加了测试来证明我的修复是有效的或我的功能可以工作 / I have added tests that prove my fix is effective or that my feature works
- [ ] 新的和现有的单元测试在我的变更下都能通过 / New and existing unit tests pass locally with my changes
- [ ] 任何依赖的变更都已经合并和发布 / Any dependent changes have been merged and published

### 文档 / Documentation
- [ ] 我已经更新了相关文档 / I have updated relevant documentation
- [ ] 我已经更新了 README.md（如果需要）/ I have updated README.md (if needed)
- [ ] 我已经更新了 API 文档（如果需要）/ I have updated API documentation (if needed)
- [ ] 我已经添加了变更日志条目 / I have added a changelog entry

### Schema 变更 / Schema Changes
- [ ] 我已经验证了 Schema 变更的向后兼容性 / I have verified backward compatibility of schema changes
- [ ] 我已经更新了 Schema 版本（如果需要）/ I have updated schema version (if needed)
- [ ] 我已经运行了 Schema 影响分析 / I have run schema impact analysis
- [ ] 我已经更新了相关的示例和文档 / I have updated related examples and documentation

### 安全 / Security
- [ ] 我的变更没有引入安全漏洞 / My changes do not introduce security vulnerabilities
- [ ] 我已经检查了敏感信息的暴露 / I have checked for exposure of sensitive information
- [ ] 我已经验证了输入验证和清理 / I have verified input validation and sanitization

### 性能 / Performance
- [ ] 我已经考虑了性能影响 / I have considered performance implications
- [ ] 我已经进行了性能测试（如果适用）/ I have conducted performance testing (if applicable)
- [ ] 我的变更没有显著降低性能 / My changes do not significantly degrade performance

## 🔄 破坏性变更 / Breaking Changes

<!-- 如果这是破坏性变更，请详细描述 / If this is a breaking change, please describe in detail -->

### 变更内容 / What Changed
<!-- 描述具体的破坏性变更 / Describe the specific breaking changes -->

### 迁移指南 / Migration Guide
<!-- 提供从旧版本迁移的指南 / Provide guidance for migrating from the old version -->

### 影响评估 / Impact Assessment
<!-- 评估这些变更的影响范围 / Assess the scope of impact of these changes -->

## 📦 依赖变更 / Dependency Changes

<!-- 如果您添加、更新或删除了依赖，请列出 / If you added, updated, or removed dependencies, please list them -->

### 新增依赖 / Added Dependencies
- 

### 更新依赖 / Updated Dependencies
- 

### 删除依赖 / Removed Dependencies
- 

## 🚀 部署注意事项 / Deployment Notes

<!-- 部署这些变更时需要注意的事项 / Things to note when deploying these changes -->

- [ ] 需要数据库迁移 / Requires database migration
- [ ] 需要配置更新 / Requires configuration updates
- [ ] 需要重启服务 / Requires service restart
- [ ] 需要清除缓存 / Requires cache clearing
- [ ] 需要更新环境变量 / Requires environment variable updates

## 📊 监控和指标 / Monitoring and Metrics

<!-- 描述如何监控这些变更的影响 / Describe how to monitor the impact of these changes -->

### 关键指标 / Key Metrics
- 

### 监控点 / Monitoring Points
- 

### 回滚计划 / Rollback Plan
- 

## 👥 审查者 / Reviewers

<!-- 请求特定的审查者 / Request specific reviewers -->

- @reviewer1
- @reviewer2

### 审查重点 / Review Focus
<!-- 请审查者特别关注的方面 / Aspects for reviewers to focus on -->

- [ ] 代码逻辑 / Code logic
- [ ] 性能影响 / Performance impact
- [ ] 安全考虑 / Security considerations
- [ ] 用户体验 / User experience
- [ ] API 设计 / API design
- [ ] 文档完整性 / Documentation completeness

## 💬 附加说明 / Additional Notes

<!-- 任何其他相关信息 / Any other relevant information -->

---

## 📋 审查者检查清单 / Reviewer Checklist

<!-- 供审查者使用的检查清单 / Checklist for reviewers -->

### 代码审查 / Code Review
- [ ] 代码逻辑正确且易于理解 / Code logic is correct and easy to understand
- [ ] 代码风格符合项目标准 / Code style follows project standards
- [ ] 没有明显的性能问题 / No obvious performance issues
- [ ] 错误处理适当 / Error handling is appropriate
- [ ] 安全考虑充分 / Security considerations are adequate

### 功能审查 / Functional Review
- [ ] 功能按预期工作 / Feature works as expected
- [ ] 边界情况得到处理 / Edge cases are handled
- [ ] 用户体验良好 / User experience is good
- [ ] 与现有功能集成良好 / Integrates well with existing features

### 测试审查 / Test Review
- [ ] 测试覆盖率充分 / Test coverage is adequate
- [ ] 测试用例有意义 / Test cases are meaningful
- [ ] 测试通过 / Tests pass
- [ ] 测试易于维护 / Tests are maintainable

### 文档审查 / Documentation Review
- [ ] 文档准确且完整 / Documentation is accurate and complete
- [ ] 示例代码有效 / Example code works
- [ ] API 文档更新 / API documentation is updated
- [ ] 变更日志更新 / Changelog is updated

---

**感谢您的贡献！/ Thank you for your contribution!** 🎉

请确保您已经阅读了我们的 [贡献指南](../CONTRIBUTING.md) 和 [行为准则](../CODE_OF_CONDUCT.md)。

Please make sure you have read our [Contributing Guide](../CONTRIBUTING.md) and [Code of Conduct](../CODE_OF_CONDUCT.md).