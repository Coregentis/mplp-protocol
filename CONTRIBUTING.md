# Contributing to MPLP Protocol

🎉 Thank you for your interest in contributing to the Multi-Agent Project Lifecycle Protocol (MPLP)! 

MPLP is designed to be the foundational communication standard for multi-agent AI systems, and we welcome contributions from developers, researchers, and organizations worldwide.

## 🌍 Multi-Language Support

[English](#english) | [中文](#中文) | [繁體中文](#繁體中文)

---

## English

### 🎯 Ways to Contribute

#### 🐛 Bug Reports
- **Where**: [GitHub Issues](https://github.com/Coregentis/MPLP-Protocol/issues)
- **What to include**:
  - Clear description of the issue
  - Steps to reproduce
  - Expected vs actual behavior
  - Protocol module affected
  - Schema validation errors (if applicable)

#### 💡 Feature Requests
- **Where**: [GitHub Discussions](https://github.com/Coregentis/MPLP-Protocol/discussions)
- **Categories**:
  - New protocol modules
  - Enhanced governance rules
  - Schema improvements
  - Documentation enhancements
  - Language support additions

#### 📝 Documentation Improvements
- **Protocol Documentation**: Clarify specifications, add examples
- **Multi-language Support**: Translate or improve existing translations
- **Implementation Guides**: Share best practices and use cases
- **API Documentation**: Enhance schema documentation

#### 🔧 Protocol Enhancements
- **New Protocol Modules**: Propose additional lifecycle protocols
- **Rule Framework**: Suggest new governance rules
- **Schema Definitions**: Improve JSON Schema specifications
- **Example Implementations**: Provide reference implementations

#### 🌍 Language Support
- **New Languages**: Add support for additional languages
- **Translation Quality**: Improve existing translations
- **Cultural Adaptation**: Adapt examples for different regions

### 📋 Contribution Guidelines

#### 1. Before You Start
- Check existing issues and discussions
- Review the [Protocol Documentation](docs/)
- Understand the [Governance Rules](rules/)
- Familiarize yourself with [JSON Schema Draft 2020-12](https://json-schema.org/)

#### 2. Development Process

##### For Protocol Changes:
1. **Discuss First**: Open a discussion for significant changes
2. **Follow Standards**: Adhere to JSON Schema Draft 2020-12
3. **Multi-language**: Provide translations for all supported languages
4. **Validation**: Ensure schema validation passes
5. **Examples**: Include reference examples
6. **Documentation**: Update relevant documentation

##### For Documentation:
1. **Clarity**: Write clear, concise documentation
2. **Consistency**: Follow existing style and structure
3. **Examples**: Include practical examples
4. **Multi-language**: Maintain consistency across languages

##### For Translations:
1. **Accuracy**: Ensure technical accuracy
2. **Consistency**: Use consistent terminology
3. **Cultural Sensitivity**: Adapt for local context
4. **Completeness**: Translate all relevant sections

#### 3. Code Standards

##### JSON Schema:
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/YourProtocol.schema.json",
  "title": "Your Protocol",
  "description": "Clear description of the protocol",
  "type": "object",
  "properties": {
    // Your schema definition
  },
  "required": ["essential", "fields"],
  "additionalProperties": false
}
```

##### Documentation Structure:
```markdown
# Protocol Name

## Overview
[Brief description]

## Purpose
[Why this protocol exists]

## Schema
[Link to schema file]

## Examples
[Reference examples]

## Implementation Notes
[Important considerations]
```

#### 4. Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Make** your changes following the guidelines
4. **Test** your changes:
   - Validate JSON schemas
   - Check documentation formatting
   - Verify examples work
5. **Commit** with clear messages:
   ```
   feat: add new protocol module for X
   docs: improve Y protocol documentation
   fix: correct schema validation for Z
   ```
6. **Push** to your fork: `git push origin feature/your-feature`
7. **Submit** a pull request with:
   - Clear title and description
   - Reference to related issues/discussions
   - Summary of changes
   - Testing performed

#### 5. Review Process

- **Technical Review**: Schema validation, protocol compliance
- **Documentation Review**: Clarity, completeness, accuracy
- **Language Review**: Translation quality, consistency
- **Community Review**: Feedback from protocol users

### 🏆 Recognition

Contributors will be recognized in:
- **CONTRIBUTORS.md**: List of all contributors
- **Release Notes**: Major contributions highlighted
- **Documentation**: Author attribution where appropriate

### 📞 Getting Help

- **Questions**: [GitHub Discussions](https://github.com/Coregentis/MPLP-Protocol/discussions)
- **Real-time Chat**: [Community Discord](https://discord.gg/mplp-protocol)
- **Email**: contributors@coregentis.com

---

## 中文

### 🎯 贡献方式

#### 🐛 错误报告
- **位置**: [GitHub Issues](https://github.com/Coregentis/MPLP-Protocol/issues)
- **包含内容**:
  - 问题的清晰描述
  - 重现步骤
  - 期望与实际行为对比
  - 受影响的协议模块
  - Schema验证错误（如适用）

#### 💡 功能请求
- **位置**: [GitHub Discussions](https://github.com/Coregentis/MPLP-Protocol/discussions)
- **类别**:
  - 新协议模块
  - 增强治理规则
  - Schema改进
  - 文档增强
  - 语言支持添加

#### 📝 文档改进
- **协议文档**: 澄清规范，添加示例
- **多语言支持**: 翻译或改进现有翻译
- **实现指南**: 分享最佳实践和用例
- **API文档**: 增强schema文档

#### 🔧 协议增强
- **新协议模块**: 提议额外的生命周期协议
- **规则框架**: 建议新的治理规则
- **Schema定义**: 改进JSON Schema规范
- **示例实现**: 提供参考实现

#### 🌍 语言支持
- **新语言**: 添加对其他语言的支持
- **翻译质量**: 改进现有翻译
- **文化适应**: 为不同地区调整示例

### 📋 贡献指南

#### 1. 开始之前
- 检查现有问题和讨论
- 查看[协议文档](docs/)
- 了解[治理规则](rules/)
- 熟悉[JSON Schema Draft 2020-12](https://json-schema.org/)

#### 2. 开发流程

##### 协议变更:
1. **先讨论**: 对重大变更开启讨论
2. **遵循标准**: 遵守JSON Schema Draft 2020-12
3. **多语言**: 为所有支持的语言提供翻译
4. **验证**: 确保schema验证通过
5. **示例**: 包含参考示例
6. **文档**: 更新相关文档

##### 文档:
1. **清晰**: 编写清晰、简洁的文档
2. **一致性**: 遵循现有风格和结构
3. **示例**: 包含实用示例
4. **多语言**: 保持跨语言一致性

##### 翻译:
1. **准确性**: 确保技术准确性
2. **一致性**: 使用一致的术语
3. **文化敏感性**: 适应本地语境
4. **完整性**: 翻译所有相关部分

### 🤝 贡献

我们欢迎各种形式的贡献！请查看我们的详细贡献指南。

---

## 繁體中文

### 🎯 貢獻方式

#### 🐛 錯誤報告
- **位置**: [GitHub Issues](https://github.com/Coregentis/MPLP-Protocol/issues)
- **包含內容**:
  - 問題的清晰描述
  - 重現步驟
  - 期望與實際行為對比
  - 受影響的協議模組
  - Schema驗證錯誤（如適用）

#### 💡 功能請求
- **位置**: [GitHub Discussions](https://github.com/Coregentis/MPLP-Protocol/discussions)
- **類別**:
  - 新協議模組
  - 增強治理規則
  - Schema改進
  - 文檔增強
  - 語言支持添加

#### 📝 文檔改進
- **協議文檔**: 澄清規範，添加示例
- **多語言支持**: 翻譯或改進現有翻譯
- **實現指南**: 分享最佳實踐和用例
- **API文檔**: 增強schema文檔

#### 🔧 協議增強
- **新協議模組**: 提議額外的生命週期協議
- **規則框架**: 建議新的治理規則
- **Schema定義**: 改進JSON Schema規範
- **示例實現**: 提供參考實現

#### 🌍 語言支持
- **新語言**: 添加對其他語言的支持
- **翻譯質量**: 改進現有翻譯
- **文化適應**: 為不同地區調整示例

### 🤝 貢獻

我們歡迎各種形式的貢獻！請查看我們的詳細貢獻指南。

---

## 📄 License

By contributing to MPLP Protocol, you agree that your contributions will be licensed under:

- **Protocol Specifications**: Apache License 2.0
- **Implementation Examples**: MIT License
- **Documentation**: Apache License 2.0

---

## 🙏 Thank You

Every contribution, no matter how small, helps make MPLP better for the entire multi-agent AI community. Thank you for being part of this journey!

---

*For more information, visit [https://github.com/Coregentis/MPLP-Protocol](https://github.com/Coregentis/MPLP-Protocol)*