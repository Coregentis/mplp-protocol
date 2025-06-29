<div align="center">

# Multi-Agent Project Lifecycle Protocol (MPLP)

**🌐 The TCP/IP of Multi-Agent AI Collaboration**

*A comprehensive, open-source protocol framework for standardizing multi-agent AI project development, execution, and lifecycle management.*

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./VERSION.json)
[![Status](https://img.shields.io/badge/status-stable-green.svg)](./VERSION.json)
[![License](https://img.shields.io/badge/license-Apache%202.0%20%2B%20MIT-blue.svg)](./License/)
[![Protocol](https://img.shields.io/badge/protocol-MPLP-orange.svg)](./protocols/)
[![Schema](https://img.shields.io/badge/schema-v1.0-green.svg)](./schemas/)
[![Language](https://img.shields.io/badge/languages-EN%20%7C%20中文%20%7C%20繁體-brightgreen.svg)](#-multi-language-support)

[English](#english) | [中文](#中文) | [繁體中文](#繁體中文)

</div>

---

## English

### 🎯 What is MPLP?

**Multi-Agent Project Lifecycle Protocol (MPLP)** is the foundational communication standard for multi-agent AI systems, designed to be as fundamental to AI collaboration as TCP/IP is to internet communication.

Just as TCP/IP enabled the global internet by standardizing how computers communicate, MPLP standardizes how AI agents collaborate, ensuring seamless interaction across different systems, platforms, and implementations.

### 🌟 Key Features

- **🔧 10 Core Protocol Modules**: Complete lifecycle management for multi-agent projects
- **📋 75+ Governance Rules**: Comprehensive rule framework across 6 categories
- **✅ JSON Schema Validation**: Strict data structure definitions with Draft 2020-12
- **📚 Reference Examples**: Production-ready implementation examples
- **⚖️ Dual Licensing**: Apache 2.0 for protocols, MIT for implementations
- **🌍 Multi-Language**: Full support for English, Simplified Chinese, Traditional Chinese
- **🏗️ Modular Design**: Pick and choose protocols based on your needs
- **🔄 Continuous Learning**: Built-in feedback loops and knowledge retention

### 🚀 Quick Start

#### 1. Choose Your Entry Point

| **For Developers** | **For Project Managers** | **For AI Researchers** |
|-------------------|-------------------------|------------------------|
| Start with [Role Protocol](protocols/Role.md) | Begin with [Plan Protocol](protocols/Plan.md) | Explore [Learn Protocol](protocols/Learn.md) |
| Define agent responsibilities | Structure project planning | Understand knowledge capture |

#### 2. Core Protocol Modules

| Protocol | Purpose | Documentation | Schema | Example |
|----------|---------|---------------|--------|---------|
| **[Role](protocols/Role.md)** | Agent role definition | [📖 Docs](docs/en/Role.md) | [📄 Schema](schemas/Role.schema.json) | [💡 Example](examples/Role.example.json) |
| **[Context](protocols/Context.md)** | Project context setup | [📖 Docs](docs/en/Context.md) | [📄 Schema](schemas/Context.schema.json) | [💡 Example](examples/Context.example.json) |
| **[Plan](protocols/Plan.md)** | Project planning | [📖 Docs](docs/en/Plan.md) | [📄 Schema](schemas/Plan.schema.json) | [💡 Example](examples/Plan.example.json) |
| **[Execute](protocols/Execute.md)** | Task execution | [📖 Docs](docs/en/Execute.md) | [📄 Schema](schemas/Execute.schema.json) | [💡 Example](examples/Execute.example.json) |
| **[Test](protocols/Test.md)** | Quality assurance | [📖 Docs](docs/en/Test.md) | [📄 Schema](schemas/Test.schema.json) | [💡 Example](examples/Test.example.json) |
| **[Delivery](protocols/Delivery.md)** | Project delivery | [📖 Docs](docs/en/Delivery.md) | [📄 Schema](schemas/Delivery.schema.json) | [💡 Example](examples/Delivery.example.json) |
| **[Learn](protocols/Learn.md)** | Knowledge capture | [📖 Docs](docs/en/Learn.md) | [📄 Schema](schemas/Learn.schema.json) | [💡 Example](examples/Learn.example.json) |
| **[Confirm](protocols/Confirm.md)** | Validation & approval | [📖 Docs](docs/en/Confirm.md) | [📄 Schema](schemas/Confirm.schema.json) | [💡 Example](examples/Confirm.example.json) |
| **[Trace](protocols/Trace.md)** | Activity tracking | [📖 Docs](docs/en/Trace.md) | [📄 Schema](schemas/Trace.schema.json) | [💡 Example](examples/Trace.example.json) |
| **[Workflow](protocols/Workflow.md)** | Process orchestration | [📖 Docs](docs/en/Workflow.md) | [📄 Schema](schemas/Workflow.schema.json) | [💡 Example](examples/Workflow.example.json) |

#### 3. Implementation Guide

```bash
# 1. Validate your implementation
npm install ajv
node validate-schema.js your-data.json

# 2. Use reference examples
cp examples/Role.example.json your-project/

# 3. Follow the workflow
Role → Context → Plan → Execute → Test → Delivery → Learn → Confirm
```

### 🌍 Multi-Language Support

| Language | Status | Documentation | Examples | Schemas |
|----------|--------|---------------|----------|---------|
| **English** | ✅ Complete | [docs/en/](docs/en/) | ✅ Available | ✅ Available |
| **简体中文** | ✅ Complete | [docs/zh/](docs/zh/) | ✅ Available | ✅ Available |
| **繁體中文** | ✅ Complete | [docs/tw/](docs/tw/) | ✅ Available | ✅ Available |

### 🤝 Contributing

We welcome contributions! Please see our contribution guidelines:

- **🐛 Bug Reports**: [GitHub Issues](https://github.com/Coregentis/MPLP-Protocol/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/Coregentis/MPLP-Protocol/discussions)
- **📝 Documentation**: Help improve our multi-language docs
- **🔧 Protocol Enhancements**: Propose new protocol modules
- **🌍 Translations**: Add support for new languages

### 📞 Support & Community

- **📧 Email**: support@coregentis.com
- **💬 Discussions**: [GitHub Discussions](https://github.com/Coregentis/MPLP-Protocol/discussions)
- **📖 Documentation**: [Protocol Documentation](docs/)
- **🔗 Website**: [https://mplp.coregentis.com](https://mplp.coregentis.com)

---

## 中文

### 🎯 什么是MPLP？

**多智能体项目生命周期协议（MPLP）**是多智能体AI系统的基础通信标准，旨在成为AI协作领域的TCP/IP协议。

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

### 🚀 快速开始

#### 1. 选择入口点

| **开发者** | **项目经理** | **AI研究者** |
|-----------|-------------|-------------|
| 从[角色协议](protocols/Role.md)开始 | 从[计划协议](protocols/Plan.md)开始 | 探索[学习协议](protocols/Learn.md) |
| 定义智能体职责 | 构建项目规划 | 理解知识捕获 |

#### 2. 核心协议模块

| 协议 | 用途 | 文档 | Schema | 示例 |
|------|------|------|--------|---------|
| **[Role](protocols/Role.md)** | 智能体角色定义 | [📖 文档](docs/zh/Role.md) | [📄 Schema](schemas/Role.schema.json) | [💡 示例](examples/Role.example.json) |
| **[Context](protocols/Context.md)** | 项目上下文设置 | [📖 文档](docs/zh/Context.md) | [📄 Schema](schemas/Context.schema.json) | [💡 示例](examples/Context.example.json) |
| **[Plan](protocols/Plan.md)** | 项目规划 | [📖 文档](docs/zh/Plan.md) | [📄 Schema](schemas/Plan.schema.json) | [💡 示例](examples/Plan.example.json) |
| **[Execute](protocols/Execute.md)** | 任务执行 | [📖 文档](docs/zh/Execute.md) | [📄 Schema](schemas/Execute.schema.json) | [💡 示例](examples/Execute.example.json) |
| **[Test](protocols/Test.md)** | 质量保证 | [📖 文档](docs/zh/Test.md) | [📄 Schema](schemas/Test.schema.json) | [💡 示例](examples/Test.example.json) |
| **[Delivery](protocols/Delivery.md)** | 项目交付 | [📖 文档](docs/zh/Delivery.md) | [📄 Schema](schemas/Delivery.schema.json) | [💡 示例](examples/Delivery.example.json) |
| **[Learn](protocols/Learn.md)** | 知识捕获 | [📖 文档](docs/zh/Learn.md) | [📄 Schema](schemas/Learn.schema.json) | [💡 示例](examples/Learn.example.json) |
| **[Confirm](protocols/Confirm.md)** | 验证与批准 | [📖 文档](docs/zh/Confirm.md) | [📄 Schema](schemas/Confirm.schema.json) | [💡 示例](examples/Confirm.example.json) |
| **[Trace](protocols/Trace.md)** | 活动跟踪 | [📖 文档](docs/zh/Trace.md) | [📄 Schema](schemas/Trace.schema.json) | [💡 示例](examples/Trace.example.json) |
| **[Workflow](protocols/Workflow.md)** | 流程编排 | [📖 文档](docs/zh/Workflow.md) | [📄 Schema](schemas/Workflow.schema.json) | [💡 示例](examples/Workflow.example.json) |

### 🤝 贡献

我们欢迎贡献！请查看我们的贡献指南：

- **🐛 错误报告**: [GitHub Issues](https://github.com/Coregentis/MPLP-Protocol/issues)
- **💡 功能请求**: [GitHub Discussions](https://github.com/Coregentis/MPLP-Protocol/discussions)
- **📝 文档**: 帮助改进我们的多语言文档
- **🔧 协议增强**: 提议新的协议模块
- **🌍 翻译**: 添加新语言支持

---

## 繁體中文

### 🎯 什麼是MPLP？

**多智能體項目生命週期協議（MPLP）**是多智能體AI系統的基礎通信標準，旨在成為AI協作領域的TCP/IP協議。

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

### 🚀 快速開始

#### 1. 選擇入口點

| **開發者** | **項目經理** | **AI研究者** |
|-----------|-------------|-------------|
| 從[角色協議](protocols/Role.md)開始 | 從[計劃協議](protocols/Plan.md)開始 | 探索[學習協議](protocols/Learn.md) |
| 定義智能體職責 | 構建項目規劃 | 理解知識捕獲 |

#### 2. 核心協議模組

| 協議 | 用途 | 文檔 | Schema | 示例 |
|------|------|------|--------|---------|
| **[Role](protocols/Role.md)** | 智能體角色定義 | [📖 文檔](docs/tw/Role.md) | [📄 Schema](schemas/Role.schema.json) | [💡 示例](examples/Role.example.json) |
| **[Context](protocols/Context.md)** | 項目上下文設置 | [📖 文檔](docs/tw/Context.md) | [📄 Schema](schemas/Context.schema.json) | [💡 示例](examples/Context.example.json) |
| **[Plan](protocols/Plan.md)** | 項目規劃 | [📖 文檔](docs/tw/Plan.md) | [📄 Schema](schemas/Plan.schema.json) | [💡 示例](examples/Plan.example.json) |
| **[Execute](protocols/Execute.md)** | 任務執行 | [📖 文檔](docs/tw/Execute.md) | [📄 Schema](schemas/Execute.schema.json) | [💡 示例](examples/Execute.example.json) |
| **[Test](protocols/Test.md)** | 質量保證 | [📖 文檔](docs/tw/Test.md) | [📄 Schema](schemas/Test.schema.json) | [💡 示例](examples/Test.example.json) |
| **[Delivery](protocols/Delivery.md)** | 項目交付 | [📖 文檔](docs/tw/Delivery.md) | [📄 Schema](schemas/Delivery.schema.json) | [💡 示例](examples/Delivery.example.json) |
| **[Learn](protocols/Learn.md)** | 知識捕獲 | [📖 文檔](docs/tw/Learn.md) | [📄 Schema](schemas/Learn.schema.json) | [💡 示例](examples/Learn.example.json) |
| **[Confirm](protocols/Confirm.md)** | 驗證與批准 | [📖 文檔](docs/tw/Confirm.md) | [📄 Schema](schemas/Confirm.schema.json) | [💡 示例](examples/Confirm.example.json) |
| **[Trace](protocols/Trace.md)** | 活動跟蹤 | [📖 文檔](docs/tw/Trace.md) | [📄 Schema](schemas/Trace.schema.json) | [💡 示例](examples/Trace.example.json) |
| **[Workflow](protocols/Workflow.md)** | 流程編排 | [📖 文檔](docs/tw/Workflow.md) | [📄 Schema](schemas/Workflow.schema.json) | [💡 示例](examples/Workflow.example.json) |

### 🤝 貢獻

我們歡迎貢獻！請查看我們的貢獻指南：

- **🐛 錯誤報告**: [GitHub Issues](https://github.com/Coregentis/MPLP-Protocol/issues)
- **💡 功能請求**: [GitHub Discussions](https://github.com/Coregentis/MPLP-Protocol/discussions)
- **📝 文檔**: 幫助改進我們的多語言文檔
- **🔧 協議增強**: 提議新的協議模組
- **🌍 翻譯**: 添加新語言支持

---

## 📄 License

This project is dual-licensed:

- **Protocol Specifications**: [Apache License 2.0](License/LICENSE-APACHE-2.0)
- **Implementation Examples**: [MIT License](License/LICENSE-MIT)

See [License Directory](License/) for complete licensing information.

---

## 📊 Version Information

- **Version**: 1.0.0
- **Release Date**: 2024-12-29
- **Protocol Modules**: 10
- **Governance Rules**: 75+
- **Supported Languages**: 3 (EN, ZH, TW)
- **Schema Standard**: JSON Schema Draft 2020-12

---

*© 2024 Coregentis. All rights reserved. Licensed under Apache 2.0 and MIT.*
