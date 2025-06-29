# 📦 MPLP 协议发布准备与版本打包冻结完整指南

> 本文档提供 Multi-Agent Project Lifecycle Protocol (MPLP) 项目的标准化发布流程，适用于每个新版本的准备、打包和发布工作。

---

## 🎯 发布流程概览

本指南将引导您完成从开发版本到正式发布的完整流程，确保版本的稳定性、一致性和国际化标准。

### 核心原则
- **版本冻结**：发布版本不可修改，确保稳定性
- **国际化优先**：所有基础文档使用英语编写
- **标准化命名**：严格遵循多语言文档命名规范
- **质量保证**：完整的验证和检查流程

---

## 📋 发布前准备清单

开始发布流程前，请确认以下准备工作：

- [ ] 确定新版本号（遵循语义化版本控制）
- [ ] 所有开发内容已完成并通过测试
- [ ] 准备发布说明和变更日志内容
- [ ] 备份当前工作状态
- [ ] 确认多语言文档内容同步

---

## 🏗️ 第一阶段：版本结构准备

### 🪜 步骤 1：创建版本目录结构

#### 版本号规范
- **格式**：`v{major}.{minor}.{patch}`（如 `v1.0.1`）
- **规则**：遵循[语义化版本控制](https://semver.org/)标准

#### 创建发布目录
```bash
mkdir -p release/v1.0.1/{schemas,examples,docs,protocols}
```

#### 复制开发内容到发布目录

| 内容类型 | 来源目录 | 目标目录 |
|---------|---------|----------|
| 协议模块文档 | `dev/protocols/*.md` | `release/v1.0.1/protocols/` |
| JSON Schema 文件 | `schemas/` | `release/v1.0.1/schemas/` |
| 示例 JSON 文件 | `examples/` | `release/v1.0.1/examples/` |
| 多语言文档 | `docs/` | `release/v1.0.1/docs/` |

### 🪜 步骤 2：添加版本元数据

为所有 `.md` 文件添加统一的 YAML Front Matter：

```yaml
---
version: v1.0.1
status: frozen
releaseDate: 2025-06-28
source: MPLP
license: MIT
---
```

**处理范围**：
- `protocols/*.md`
- `docs/*/*.md`

**⚠️ 重要**：发布版本中的所有基础文档必须使用英语编写，确保国际化标准。

---

## 📄 第二阶段：核心文档创建

### 🪜 步骤 3：创建版本信息文件

#### VERSION.json
在 `release/v1.0.1/` 目录下创建：

```json
{
  "version": "v1.0.1",
  "status": "frozen",
  "releaseDate": "2025-06-28",
  "commit": "",
  "compatibleWith": ["v1.0.0"],
  "deprecated": false,
  "notes": "Stable protocol documentation with improved documentation links"
}
```

#### CHANGELOG.md
在 `release/v1.0.1/` 目录下创建变更日志：

```markdown
# CHANGELOG

## [v1.0.1] - 2025-06-28

### Added
- Multi-language README documentation standardization management
- Enhanced release process validation checks

### Improved
- Optimized documentation link structure
- Enhanced cross-reference specifications

### Fixed
- Fixed documentation format inconsistency issues
```

**📝 注意**：CHANGELOG 必须使用英语编写，遵循 [Keep a Changelog](https://keepachangelog.com/) 标准格式。

### 🪜 步骤 4：更新版本总览文件

在项目根目录更新 `versions.json`：

```json
[
  {
    "version": "v1.0.1",
    "path": "release/v1.0.1/",
    "status": "frozen",
    "releaseDate": "2025-06-28",
    "default": true,
    "description": "Enhanced version with improved documentation structure"
  },
  {
    "version": "v1.0.0",
    "path": "release/v1.0.0/",
    "status": "frozen",
    "releaseDate": "2025-06-28",
    "default": false,
    "description": "Initial stable release"
  }
]
```

---

## 🌐 第三阶段：多语言文档标准化

### 🪜 步骤 5：更新多语言 README 文档

#### 5.1 发布版本主 README.md

更新 `release/v1.0.1/README.md`，确保包含：

```markdown
# Multi-Agent Project Lifecycle Protocol (MPLP) v1.0.1

[English](README.md) | [中文](docs/zh/README-zh.md) | [繁體中文](docs/tw/README-tw.md)

## Overview

This is the frozen release version v1.0.1 of the Multi-Agent Project Lifecycle Protocol.

## Quick Start

- **Protocol Documentation**: See `protocols/` directory
- **Examples**: See `examples/` directory  
- **Schemas**: See `schemas/` directory

## Language Versions

- **English** (Primary): [README.md](README.md)
- **简体中文**: [docs/zh/README-zh.md](docs/zh/README-zh.md)
- **繁體中文**: [docs/tw/README-tw.md](docs/tw/README-tw.md)

## Version Information

- **Version**: v1.0.1
- **Status**: Frozen
- **Release Date**: 2025-06-28
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)
```

**🔑 关键要求**：主 README.md 必须使用英语编写，作为项目的官方国际化文档。

#### 5.2 各语言目录 README 文档

按照标准化命名规范更新：

| 语言 | 文件路径 | 命名规范 |
|------|---------|----------|
| 英文 | `release/v1.0.1/docs/en/README.md` | `README.md` |
| 简体中文 | `release/v1.0.1/docs/zh/README-zh.md` | `README-zh.md` |
| 繁体中文 | `release/v1.0.1/docs/tw/README-tw.md` | `README-tw.md` |

**每个语言 README 必须包含**：
- YAML Front Matter（版本信息）
- 项目概述（对应语言）
- 协议模块列表和链接
- 其他语言文档的交叉引用链接
- 快速导航指南

#### 5.3 交叉引用链接标准化

确保各语言 README 中的交叉引用链接格式正确：

```markdown
## 🌐 多语言支持

- [English](../en/README.md)
- [简体中文](../zh/README-zh.md)
- [繁體中文](../tw/README-tw.md)
```

#### 5.4 项目根目录 README.md 更新

更新项目根目录的 `README.md`，确保：

- ✅ 指向最新发布版本的链接
- ✅ 多语言文档链接使用标准化格式
- ✅ 版本历史和兼容性说明
- ✅ 联系方式和社媒链接

**根目录多语言链接格式**：
```markdown
## 📚 文档

- [English Documentation](release/v1.0.1/docs/en/README.md)
- [简体中文文档](release/v1.0.1/docs/zh/README-zh.md)
- [繁體中文文檔](release/v1.0.1/docs/tw/README-tw.md)
```

---

## 🔒 第四阶段：安全与验证

### 🪜 步骤 6：生成校验文件

#### 确保校验脚本存在
确保项目中存在 `check-frozen-integrity.js` 脚本

#### 执行校验码生成
```bash
npm run check:frozen
```

**结果**：每个版本目录下生成 `.checksum` 文件（防篡改机制）

### 🪜 步骤 7：预览验证

#### 本地运行测试
```bash
npm run start
```

#### 功能验证清单
- [ ] `/` 自动重定向到最新版本 `/v1.0.1/`
- [ ] 所有链接具备版本感知（URL 带版本号）
- [ ] `/versions` 页面展示全部版本信息
- [ ] 文档底部 VersionFooter 正确展示版本状态
- [ ] 多语言 README 文档链接正确可访问
- [ ] 交叉引用链接指向正确的标准化文件名

---

## 🚀 第五阶段：发布与部署

### 🪜 步骤 8：代码提交

```bash
git add .
git commit -m "🔖 Release MPLP v1.0.1 - Stable protocol documentation"
```

### 🪜 步骤 9：版本标记与发布

#### 创建 Git Tag
```bash
git tag v1.0.1
git push origin v1.0.1
```

#### GitHub Release（可选）
在 GitHub 上创建 Release，附上 CHANGELOG 描述

---

## 📦 发布完成后的目录结构

```
📁 Multi_Agent_Project_Lifecycle_Protocol/
├── 📁 release/
│   ├── 📁 v1.0.0/
│   │   ├── 📄 VERSION.json
│   │   ├── 📄 CHANGELOG.md
│   │   ├── 📄 .checksum
│   │   ├── 📁 schemas/
│   │   ├── 📁 examples/
│   │   ├── 📁 docs/
│   │   └── 📁 protocols/
│   └── 📁 v1.0.1/
│       ├── 📄 VERSION.json
│       ├── 📄 CHANGELOG.md
│       ├── 📄 .checksum
│       ├── 📁 schemas/
│       ├── 📁 examples/
│       ├── 📁 docs/
│       └── 📁 protocols/
├── 📄 versions.json
└── 📄 README.md
```

---

## ✅ 质量保证检查清单

发布前必须完成以下全面检查：

### 📋 基础文件检查
- [ ] 所有文档包含正确的 YAML Front Matter
- [ ] VERSION.json 信息准确无误（英语描述）
- [ ] CHANGELOG.md 变更记录完整（英语编写）
- [ ] versions.json 已更新最新版本信息
- [ ] 校验文件 .checksum 已生成

### 🌐 多语言文档检查
- [ ] 发布版本根目录 README.md 已更新（英语主文档）
- [ ] 各语言 README 文档命名符合标准化规范
- [ ] 多语言交叉引用链接格式正确
- [ ] 项目根目录 README.md 指向最新版本
- [ ] 语言切换导航功能正常

### 🌍 国际化标准检查
- [ ] 所有基础文档（CHANGELOG、VERSION等）使用英语
- [ ] 文档截图和示例避免包含中文内容
- [ ] 代码注释和示例使用英语编写
- [ ] 主 README.md（英语）内容完整且符合国际化标准

### 🔧 技术验证检查
- [ ] 本地预览功能正常
- [ ] Git 提交信息规范
- [ ] 版本标签已创建
- [ ] 所有链接有效性验证通过

---

## ⚠️ 重要注意事项

### 核心原则
1. **版本冻结**：一旦版本发布，`release/` 目录下的内容不应再修改
2. **向后兼容**：新版本应保持与旧版本的兼容性
3. **文档完整性**：确保所有语言版本的文档都已更新
4. **国际化标准**：所有基础文档（CHANGELOG、VERSION、主README等）必须使用英语编写

### 质量标准
5. **README 标准化**：严格遵循多语言 README 文档的命名规范和链接格式
6. **链接一致性**：确保所有交叉引用链接指向正确的标准化文件名
7. **内容纯净性**：避免在文档、截图、示例中包含中文内容，确保发布版本的国际化标准
8. **测试验证**：发布前务必进行完整的功能测试，包括文档链接验证

### 流程规范
9. **分阶段执行**：严格按照五个阶段的顺序执行，不可跳跃
10. **检查清单**：每个阶段完成后必须进行相应的质量检查

---

## 📞 支持与反馈

如果在发布过程中遇到问题，请：

1. 检查本指南的相关章节
2. 验证是否遵循了所有质量检查清单
3. 确认国际化标准是否得到正确执行

---

*本指南遵循 MPLP 项目开发规范，确保发布流程的标准化、可重复性和国际化质量。*