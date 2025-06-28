# 📦 MPLP 协议发布准备与版本打包冻结完整指南

> 本文档提供 Multi-Agent Project Lifecycle Protocol (MPLP) 项目的标准化发布流程，适用于每个新版本的准备、打包和发布工作。

---

## 📋 发布前准备清单

- [ ] 确定新版本号（如 v1.0.1）
- [ ] 准备发布说明和变更日志
- [ ] 确保所有开发内容已完成并测试
- [ ] 备份当前工作状态

---

## 🪜 第 1 步：准备新版本号和目录结构

### 版本号规范
- **示例版本**：`v1.0.0` 或 `v1.0.1`
- **命名规则**：遵循语义化版本控制（Semantic Versioning）

### 创建版本目录
```bash
mkdir -p release/v1.0.1/{schemas,examples,docs,protocols}
```

### 复制开发内容
将以下内容从开发目录复制到发布目录：

| 内容类型 | 来源目录 | 目标目录 |
|---------|---------|----------|
| 协议模块文档 | `dev/protocols/*.md` | `release/v1.0.1/protocols/` |
| JSON Schema 文件 | `schemas/` | `release/v1.0.1/schemas/` |
| 示例 JSON 文件 | `examples/` | `release/v1.0.1/examples/` |
| 多语言文档 | `docs/` | `release/v1.0.1/docs/` |

---

## 🪜 第 2 步：添加元数据（YAML Front Matter）

为所有 `.md` 文件统一添加 YAML Front Matter 块（如未添加）：

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

---

## 🪜 第 3 步：创建 VERSION.json 文件

在 `release/v1.0.1/` 目录下创建版本信息文件：

```json
{
  "version": "v1.0.1",
  "status": "frozen",
  "releaseDate": "2025-06-28",
  "commit": "",
  "compatibleWith": ["v1.0.0"],
  "deprecated": false,
  "notes": "初步稳定协议文档，新增文档链接优化"
}
```

---

## 🪜 第 4 步：更新版本总览文件 versions.json

在项目根目录更新或创建 `versions.json`：

```json
[
  {
    "version": "v1.0.1",
    "path": "release/v1.0.1/",
    "status": "frozen",
    "releaseDate": "2025-06-28",
    "default": true,
    "description": "包含版本感知机制与目录重构的修订版本"
  },
  {
    "version": "v1.0.0",
    "path": "release/v1.0.0/",
    "status": "frozen",
    "releaseDate": "2025-06-28",
    "default": false,
    "description": "初始发布版本"
  }
]
```

---

## 🪜 第 5 步：生成校验文件 .checksum（防篡改机制）

### 确保校验脚本存在
确保项目中存在 `check-frozen-integrity.js` 脚本

### 执行校验码生成
```bash
npm run check:frozen
```

**结果**：每个版本目录下应生成 `.checksum` 文件（不可被 Git 忽略）

---

## 🪜 第 6 步：更新 README.md 文件

项目根目录的 `README.md` 应包含：

- ✅ 当前版本说明
- ✅ 发布时间、版本状态
- ✅ 快速使用路径 `/release/v1.0.1/`
- ✅ 社媒链接、联系方式（如 X / Medium / team@ 邮箱）

---

## 🪜 第 7 步：预览验证（Docusaurus 或其他文档平台）

### 本地运行测试
```bash
npm run start
```

### 验证功能清单
- [ ] `/` 能自动重定向到最新版本 `/v1.0.1/`
- [ ] 所有链接具备版本感知（URL 带 `/v1.0.1/`）
- [ ] `/versions` 页面能展示全部版本信息
- [ ] 文档底部 VersionFooter 正确展示版本状态

---

## 🪜 第 8 步：提交代码并打包准备

```bash
git add .
git commit -m "🔖 打包发布 MPLP v1.0.1 协议文档"
```

---

## 🪜 第 9 步：可选 – 添加 Git Tag 和 GitHub Release

### 创建 Git Tag
```bash
git tag v1.0.1
git push origin v1.0.1
```

### GitHub Release
在 GitHub 上发布 Release 并附上 changelog 描述。

---

## 📦 完成后的目录结构

```
📁 release/
│
├── v1.0.0/
│   ├── VERSION.json
│   ├── .checksum
│   ├── schemas/
│   ├── examples/
│   ├── docs/
│   └── protocols/
│
├── v1.0.1/
│   ├── VERSION.json
│   ├── .checksum
│   ├── schemas/
│   ├── examples/
│   ├── docs/
│   └── protocols/
│
📄 versions.json
📄 README.md
```

---

## 🔍 质量检查清单

发布前请确认以下项目：

- [ ] 所有文档包含正确的 YAML Front Matter
- [ ] VERSION.json 信息准确无误
- [ ] versions.json 已更新最新版本信息
- [ ] 校验文件 .checksum 已生成
- [ ] 本地预览功能正常
- [ ] Git 提交信息规范
- [ ] 版本标签已创建

---

## 📝 注意事项

1. **版本冻结**：一旦版本发布，`release/` 目录下的内容不应再修改
2. **向后兼容**：新版本应保持与旧版本的兼容性
3. **文档完整性**：确保所有语言版本的文档都已更新
4. **测试验证**：发布前务必进行完整的功能测试

---

*本指南遵循 MPLP 项目开发规范，确保发布流程的标准化和可重复性。*