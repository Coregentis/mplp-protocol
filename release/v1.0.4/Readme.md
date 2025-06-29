<div align="center">

# Multi-Agent Project Lifecycle Protocol (MPLP)

## *The TCP/IP of Multi-Agent AI Collaboration*

[![Version](https://img.shields.io/badge/version-1.0.4-blue.svg)](https://github.com/Coregentis/MPLP-Protocol/releases/tag/v1.0.4)
[![License](https://img.shields.io/badge/license-Apache%202.0%20%2B%20MIT-green.svg)](License/LICENSING_STRATEGY.md)
[![Language](https://img.shields.io/badge/languages-EN%20%7C%20ZH%20%7C%20TW-orange.svg)](docs/)
[![Status](https://img.shields.io/badge/status-stable-brightgreen.svg)](VERSION.json)

**Making multi-agent AI collaboration as standardized and reliable as the internet itself.**

[📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🌍 Multi-Language](#-multi-language-support) • [🤝 Contributing](#-contributing) • [📞 Support](#-support--community)

</div>

---

## 🎯 What is MPLP?

**Multi-Agent Project Lifecycle Protocol (MPLP)** is the foundational communication standard for multi-agent AI systems, designed to become the TCP/IP protocol of AI collaboration.

Just as TCP/IP enabled the global internet by standardizing how computers communicate, MPLP enables seamless multi-agent AI collaboration by standardizing how AI agents work together across different systems, platforms, and implementations.

### 🌟 Core Features

- **🔧 10 Core Protocol Modules**: Complete lifecycle management for multi-agent projects
- **📋 75+ Governance Rules**: Comprehensive rule framework across 6 categories
- **✅ JSON Schema Validation**: Strict data structure definitions based on Draft 2020-12
- **📚 Reference Examples**: Production-ready implementation examples
- **⚖️ Dual Licensing**: Apache 2.0 for protocols, MIT for implementations
- **🌍 Multi-Language Support**: Complete support for English, Simplified Chinese, Traditional Chinese
- **🏗️ Modular Design**: Choose protocol modules based on your needs
- **🔄 Continuous Learning**: Built-in feedback loops and knowledge retention

---

## 📚 Documentation

### Core Protocol Modules

| Protocol Module | Purpose | Documentation | Schema | Example |
|-----------------|---------|---------------|--------|---------|
| **[Role Protocol](protocols/Role.md)** | Agent role definition | [📖 Docs](docs/en/Role.md) | [📄 Schema](schemas/Role.schema.json) | [💡 Example](examples/Role.example.json) |
| **[Context Protocol](protocols/Context.md)** | Project context setup | [📖 Docs](docs/en/Context.md) | [📄 Schema](schemas/Context.schema.json) | [💡 Example](examples/Context.example.json) |
| **[Plan Protocol](protocols/Plan.md)** | Project planning | [📖 Docs](docs/en/Plan.md) | [📄 Schema](schemas/Plan.schema.json) | [💡 Example](examples/Plan.example.json) |
| **[Execute Protocol](protocols/Execute.md)** | Task execution | [📖 Docs](docs/en/Execute.md) | [📄 Schema](schemas/Execute.schema.json) | [💡 Example](examples/Execute.example.json) |
| **[Test Protocol](protocols/Test.md)** | Quality assurance | [📖 Docs](docs/en/Test.md) | [📄 Schema](schemas/Test.schema.json) | [💡 Example](examples/Test.example.json) |
| **[Delivery Protocol](protocols/Delivery.md)** | Project delivery | [📖 Docs](docs/en/Delivery.md) | [📄 Schema](schemas/Delivery.schema.json) | [💡 Example](examples/Delivery.example.json) |
| **[Learn Protocol](protocols/Learn.md)** | Knowledge acquisition | [📖 Docs](docs/en/Learn.md) | [📄 Schema](schemas/Learn.schema.json) | [💡 Example](examples/Learn.example.json) |
| **[Confirm Protocol](protocols/Confirm.md)** | Validation & approval | [📖 Docs](docs/en/Confirm.md) | [📄 Schema](schemas/Confirm.schema.json) | [💡 Example](examples/Confirm.example.json) |
| **[Trace Protocol](protocols/Trace.md)** | Activity tracking | [📖 Docs](docs/en/Trace.md) | [📄 Schema](schemas/Trace.schema.json) | [💡 Example](examples/Trace.example.json) |
| **[Workflow Protocol](protocols/Workflow.md)** | Process orchestration | [📖 Docs](docs/en/Workflow.md) | [📄 Schema](schemas/Workflow.schema.json) | [💡 Example](examples/Workflow.example.json) |

### Governance Framework

| Category | Rules | Purpose | Documentation |
|----------|-------|---------|---------------|
| **Communication** | 15+ rules | Inter-agent communication standards | [📖 Rules](rules/communication/) |
| **Quality** | 12+ rules | Quality assurance requirements | [📖 Rules](rules/quality/) |
| **Security** | 10+ rules | Security protocols and best practices | [📖 Rules](rules/security/) |
| **Performance** | 8+ rules | Performance optimization guidelines | [📖 Rules](rules/performance/) |
| **Compliance** | 15+ rules | Regulatory and compliance requirements | [📖 Rules](rules/compliance/) |
| **Integration** | 15+ rules | System integration standards | [📖 Rules](rules/integration/) |

---

## 🚀 Quick Start

### 1. Choose Your Protocol Modules

```bash
# Basic workflow
Role → Context → Plan → Execute → Test → Delivery → Learn → Confirm

# Advanced workflow with tracking
Role → Context → Plan → Execute → Test → Delivery → Learn → Confirm → Trace → Workflow
```

### 2. Use Reference Examples

```bash
# Copy example files to your project
cp examples/Role.example.json your-project/
cp examples/Context.example.json your-project/
cp examples/Plan.example.json your-project/
```

### 3. Validate Against Schemas

```bash
# Validate your implementation
npm install ajv-cli
ajv validate -s schemas/Role.schema.json -d your-project/role.json
```

### 4. Follow the Workflow

```
Role → Context → Plan → Execute → Test → Delivery → Learn → Confirm
```

---

## 🌍 Multi-Language Support

| Language | Status | Documentation | Examples | Schemas |
|----------|--------|---------------|----------|----------|
| **English** | ✅ Complete | [docs/en/](docs/en/) | ✅ Available | ✅ Available |
| **简体中文** | ✅ Complete | [docs/zh/](docs/zh/) | ✅ Available | ✅ Available |
| **繁體中文** | ✅ Complete | [docs/tw/](docs/tw/) | ✅ Available | ✅ Available |

---

## 中文

### 🎯 什么是 MPLP？

**多智能体项目生命周期协议 (MPLP)** 是多智能体AI系统的基础通信标准，旨在成为AI协作领域的TCP/IP协议。

正如TCP/IP通过标准化计算机通信方式实现了全球互联网，MPLP通过标准化AI智能体协作方式，确保不同系统、平台和实现之间的无缝交互。

### 🌟 核心特性

- **🔧 10个核心协议模块**：多智能体项目的完整生命周期管理
- **📋 75+治理规则**：跨6个类别的综合规则框架
- **✅ JSON Schema验证**：基于Draft 2020-12的严格数据结构定义
- **📚 参考示例**：生产就绪的实现示例
- **⚖️ 双重许可**：协议使用Apache 2.0，实现使用MIT
- **🌍 多语言支持**：完整支持英文、简体中文、繁体中文
- **🏗️ 模块化设计**：根据需求选择协议模块
- **🔄 持续学习**：内置反馈循环和知识保留

### 📚 中文文档导航

| 协议模块 | 用途 | 中文文档 | Schema | 示例 |
|----------|------|----------|--------|----------|
| **[角色协议](protocols/Role.md)** | 智能体角色定义 | [📖 中文文档](docs/zh/Role.md) | [📄 Schema](schemas/Role.schema.json) | [💡 示例](examples/Role.example.json) |
| **[上下文协议](protocols/Context.md)** | 项目上下文设置 | [📖 中文文档](docs/zh/Context.md) | [📄 Schema](schemas/Context.schema.json) | [💡 示例](examples/Context.example.json) |
| **[计划协议](protocols/Plan.md)** | 项目规划 | [📖 中文文档](docs/zh/Plan.md) | [📄 Schema](schemas/Plan.schema.json) | [💡 示例](examples/Plan.example.json) |
| **[执行协议](protocols/Execute.md)** | 任务执行 | [📖 中文文档](docs/zh/Execute.md) | [📄 Schema](schemas/Execute.schema.json) | [💡 示例](examples/Execute.example.json) |
| **[测试协议](protocols/Test.md)** | 质量保证 | [📖 中文文档](docs/zh/Test.md) | [📄 Schema](schemas/Test.schema.json) | [💡 示例](examples/Test.example.json) |
| **[交付协议](protocols/Delivery.md)** | 项目交付 | [📖 中文文档](docs/zh/Delivery.md) | [📄 Schema](schemas/Delivery.schema.json) | [💡 示例](examples/Delivery.example.json) |
| **[学习协议](protocols/Learn.md)** | 知识获取 | [📖 中文文档](docs/zh/Learn.md) | [📄 Schema](schemas/Learn.schema.json) | [💡 示例](examples/Learn.example.json) |
| **[确认协议](protocols/Confirm.md)** | 验证与批准 | [📖 中文文档](docs/zh/Confirm.md) | [📄 Schema](schemas/Confirm.schema.json) | [💡 示例](examples/Confirm.example.json) |
| **[追踪协议](protocols/Trace.md)** | 活动跟踪 | [📖 中文文档](docs/zh/Trace.md) | [📄 Schema](schemas/Trace.schema.json) | [💡 示例](examples/Trace.example.json) |
| **[工作流协议](protocols/Workflow.md)** | 流程编排 | [📖 中文文档](docs/zh/Workflow.md) | [📄 Schema](schemas/Workflow.schema.json) | [💡 示例](examples/Workflow.example.json) |

---

## 繁體中文

### 🎯 什麼是 MPLP？

**多智能體項目生命週期協議 (MPLP)** 是多智能體AI系統的基礎通信標準，旨在成為AI協作領域的TCP/IP協議。

正如TCP/IP通過標準化計算機通信方式實現了全球互聯網，MPLP通過標準化AI智能體協作方式，確保不同系統、平台和實現之間的無縫交互。

### 🌟 核心特性

- **🔧 10個核心協議模組**：多智能體項目的完整生命週期管理
- **📋 75+治理規則**：跨6個類別的綜合規則框架
- **✅ JSON Schema驗證**：基於Draft 2020-12的嚴格數據結構定義
- **📚 參考示例**：生產就緒的實現示例
- **⚖️ 雙重許可**：協議使用Apache 2.0，實現使用MIT
- **🌍 多語言支持**：完整支持英文、簡體中文、繁體中文
- **🏗️ 模組化設計**：根據需求選擇協議模組
- **🔄 持續學習**：內建反饋循環和知識保留

### 📚 繁體中文文檔導航

| 協議模組 | 用途 | 繁體中文文檔 | Schema | 示例 |
|----------|------|-------------|--------|----------|
| **[角色協議](protocols/Role.md)** | 智能體角色定義 | [📖 繁體中文文檔](docs/tw/Role.md) | [📄 Schema](schemas/Role.schema.json) | [💡 示例](examples/Role.example.json) |
| **[上下文協議](protocols/Context.md)** | 項目上下文設置 | [📖 繁體中文文檔](docs/tw/Context.md) | [📄 Schema](schemas/Context.schema.json) | [💡 示例](examples/Context.example.json) |
| **[計劃協議](protocols/Plan.md)** | 項目規劃 | [📖 繁體中文文檔](docs/tw/Plan.md) | [📄 Schema](schemas/Plan.schema.json) | [💡 示例](examples/Plan.example.json) |
| **[執行協議](protocols/Execute.md)** | 任務執行 | [📖 繁體中文文檔](docs/tw/Execute.md) | [📄 Schema](schemas/Execute.schema.json) | [💡 示例](examples/Execute.example.json) |
| **[測試協議](protocols/Test.md)** | 質量保證 | [📖 繁體中文文檔](docs/tw/Test.md) | [📄 Schema](schemas/Test.schema.json) | [💡 示例](examples/Test.example.json) |
| **[交付協議](protocols/Delivery.md)** | 項目交付 | [📖 繁體中文文檔](docs/tw/Delivery.md) | [📄 Schema](schemas/Delivery.schema.json) | [💡 示例](examples/Delivery.example.json) |
| **[學習協議](protocols/Learn.md)** | 知識獲取 | [📖 繁體中文文檔](docs/tw/Learn.md) | [📄 Schema](schemas/Learn.schema.json) | [💡 示例](examples/Learn.example.json) |
| **[確認協議](protocols/Confirm.md)** | 驗證與批准 | [📖 繁體中文文檔](docs/tw/Confirm.md) | [📄 Schema](schemas/Confirm.schema.json) | [💡 示例](examples/Confirm.example.json) |
| **[追蹤協議](protocols/Trace.md)** | 活動跟蹤 | [📖 繁體中文文檔](docs/tw/Trace.md) | [📄 Schema](schemas/Trace.schema.json) | [💡 示例](examples/Trace.example.json) |
| **[工作流協議](protocols/Workflow.md)** | 流程編排 | [📖 繁體中文文檔](docs/tw/Workflow.md) | [📄 Schema](schemas/Workflow.schema.json) | [💡 示例](examples/Workflow.example.json) |

---

## 📦 Package Structure

```
MPLP-v1.0.4/
├── README.md                    # This file - Project homepage
├── VERSION.json                 # Version metadata
├── CHANGELOG.md                 # Release notes
├── .checksum                    # Integrity verification
├── License/                     # Licensing information
├── protocols/                   # Core protocol modules (10)
├── schemas/                     # JSON Schema definitions (10)
├── examples/                    # Reference examples (10)
├── rules/                       # Governance rules (75+)
├── docs/                        # Multi-language documentation
│   ├── en/                     # English documentation
│   ├── zh/                     # Simplified Chinese documentation
│   └── tw/                     # Traditional Chinese documentation
└── architecture/                # System architecture
```

---

## 📜 Licensing Strategy

**Dual License Approach**:

- **Apache License 2.0**: Core protocol documents, JSON Schema definitions, governance rules, architecture documentation
- **MIT License**: Example code, SDK implementations, reference tools, test code

See [License/LICENSING_STRATEGY.md](License/LICENSING_STRATEGY.md) for details.

---

## 🤝 Contributing

We welcome contributions! Please see our contribution guidelines:

- **🐛 Bug Reports**: [GitHub Issues](https://github.com/Coregentis/MPLP-Protocol/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/Coregentis/MPLP-Protocol/discussions)
- **📝 Documentation**: Help improve our multi-language docs
- **🔧 Protocol Enhancements**: Propose new protocol modules
- **🌍 Translations**: Add support for new languages

---

## 📞 Support & Community

- **📧 Email**: support@coregentis.com
- **💬 Discord**: [Join our community](https://discord.gg/mplp)
- **📖 Documentation**: [docs/](docs/)
- **🐛 Issues**: [GitHub Issues](https://github.com/Coregentis/MPLP-Protocol/issues)
- **📊 Roadmap**: [Project Roadmap](https://github.com/Coregentis/MPLP-Protocol/projects)

---

<div align="center">

**Built with ❤️ by the Coregentis Team**

*Making multi-agent AI collaboration as standardized and reliable as the internet itself.*

**Version**: 1.0.4 | **Release Date**: 2025-06-29 | **License**: Apache 2.0 + MIT

[⭐ Star us on GitHub](https://github.com/Coregentis/MPLP-Protocol) | [📖 Read the Docs](docs/) | [🚀 Get Started](#-quick-start)

</div>