
# ✅ MPLP 协议发布流程 Checklist（release-checklist.md）

> 适用于 Multi-Agent Project Lifecycle Protocol (MPLP) 项目的版本发布与冻结流程  
> 版本示例：v1.0.1，文档状态：Frozen（冻结版本）

---

## 📦 阶段一：版本打包准备

- [x] 确认 dev/ 下所有模块文档（Context/Plan/...）编写完毕
- [x] 确保 examples/ 与 schemas/ 中的 JSON 示例与 Schema 完整
- [x] 多语言文档 docs/ 全部生成，包含 10 种语言版本
- [x] 完成 schema-graph.mmd 图示文件

---

## 📁 阶段二：版本打包目录结构生成

- [x] 创建 `release/vX.Y.Z/` 目录（如 `release/v1.0.1/`）
- [x] 拷贝以下内容：
  - [x] `schemas/` → `release/vX.Y.Z/schemas/`
  - [x] `examples/` → `release/vX.Y.Z/examples/`
  - [x] `dev/protocols/*.md` → `release/vX.Y.Z/protocols/`
  - [x] `docs/` → `release/vX.Y.Z/docs/`

---

## 🧾 阶段三：元信息与版本标识文件

- [x] 创建 `release/vX.Y.Z/README.md`，描述本版本内容
- [x] 创建 `release/vX.Y.Z/VERSION.json`，包含：
  - version, status, releaseDate, deprecated, notes, compatibleWith, commit
- [x] 更新根目录 `versions.json`：
  - 加入当前版本记录
  - 若为默认版本，设置 `"default": true`

---

## 🔖 阶段四：YAML Front Matter 元数据统一添加

- [x] 所有 `.md` 文件添加如下区块（自动化脚本处理）：

```yaml
---
version: v1.0.1
status: frozen
releaseDate: 2025-06-28
source: MPLP
license: Apache-2.0  # 示例/SDK 目录为 MIT
---
````

---

## 🛡️ 阶段五：开源许可策略

* [x] Apache License 2.0：用于核心协议文档、Schema、规则说明
* [x] MIT License：用于 SDK、工具、示例代码
* [x] 每个子目录添加 `LICENSE-Apache` / `LICENSE-MIT` 文件
* [x] 在根目录 README.md 添加双协议说明段落

---

## 🧪 阶段六：完整性校验（Frozen 版本）

* [x] 运行 `npm run check:frozen` 脚本

  * 自动生成 `release/vX.Y.Z/.checksum` 文件
  * 后续对比验证是否被修改
* [x] 支持 CI 中自动执行，确保冻结版本不被篡改

---

## 🔧 阶段七：Pre-commit 代码质量保障

* [x] 安装并配置 `.pre-commit-config.yaml`

  * Markdown lint、YAML 格式检查、JSON Schema 校验
* [x] 安装 pre-commit：`pip install pre-commit`
* [x] 安装 hook：`pre-commit install`
* [x] 确保 Git 提交前所有内容自动格式化验证

---

## 🤖 阶段八：CI/CD 自动发布流程（GitHub Actions）

* [x] 在 `.github/workflows/release.yml` 添加以下内容：

```yaml
name: Release Build + Frozen Check

on:
  push:
    tags:
      - "v*.*.*"

jobs:
  release-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run check:frozen
```

---

## 🌐 阶段九：文档网站发布更新（Docusaurus）

* [x] 注入版本切换下拉菜单（`docusaurus.config.js`）
* [x] 首页路径 `/` 自动重定向至 `versions.json` 中 default 版本
* [x] 添加版本总览页 `/versions`，展示所有版本状态
* [x] 插入 VersionFooter 组件，页面底部展示版本状态
* [x] 链接实现版本感知（useVersionedPath）

---

## 📤 阶段十：正式发布步骤

* [x] 创建 Git 标签：`git tag v1.0.1 && git push origin v1.0.1`
* [x] 发布 GitHub Release，上传 `release/v1.0.1/` 所有文件打包压缩（zip/tar.gz）
* [x] Medium / Substack / X / Product Hunt / Dev.to 发布公告
* [x] 更新项目主页（如 Docusaurus 网站首页）展示当前默认版本
* [x] 引导用户使用版本切换器浏览旧版本文档

---

## ✅ 完整版本结构示例（release/v1.0.1）

```
release/v1.0.1/
├── LICENSE-Apache
├── LICENSE-MIT
├── README.md
├── VERSION.json
├── .checksum
├── schemas/
├── examples/
├── protocols/
├── docs/
```

---

*文档由 Coregentis 项目自动发布系统构建（2025-06-28 更新）*

```

---

是否也需要我为该内容导出为 `.md` 文件供你下载？或者复制进 GitHub 仓库？
```
