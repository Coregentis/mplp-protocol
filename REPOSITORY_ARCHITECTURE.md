# MPLP 双仓库架构说明

## 📋 概述

多智能体项目生命周期协议（MPLP）采用**双仓库架构**来分离开发工作和协议发布，确保用户获得纯净、专业的协议体验。

## 🏗️ 仓库架构

### 🔧 开发仓库 (MPLP-Protocol-Dev)

**URL:** https://github.com/Coregentis/MPLP-Protocol-Dev

**用途：**
- 内部开发和测试
- 工程文件管理
- 版本控制和发布准备
- CI/CD 流程管理

**访问权限：** 私有/内部团队

**内容结构：**
```
MPLP-Protocol-Dev/
├── Core/                    # 协议核心内容
├── docs/                    # 开发文档
├── tests/                   # 测试文件
├── scripts/                 # 构建和同步脚本
├── tools/                   # 开发工具
├── config/                  # 配置文件
├── .github/                 # CI/CD 配置
├── release/                 # 发布版本存档
│   ├── v1.0.0/
│   ├── v1.1.0/
│   └── v1.2.0/
└── REPOSITORY_ARCHITECTURE.md
```

### 📦 协议仓库 (MPLP-Protocol)

**URL:** https://github.com/Coregentis/MPLP-Protocol

**用途：**
- 对外发布和展示
- 用户访问和下载
- 社区交流和反馈
- 协议标准分发

**访问权限：** 公开访问

**内容结构：**
```
MPLP-Protocol/
├── README.md               # 协议主页
├── CHANGELOG.md            # 版本历史
├── LICENSE                 # 许可证
├── VERSION.json            # 版本元数据
├── RELEASE_INFO.md         # 发布信息
├── protocols/              # 协议规范
├── schemas/                # JSON Schema
├── examples/               # 使用示例
├── docs/                   # 用户文档
└── rules/                  # 规则框架
```

## 🔄 工作流程

### 1. 开发阶段

```bash
# 在开发仓库中工作
cd MPLP-Protocol-Dev
git checkout develop
git pull origin develop

# 创建功能分支
git checkout -b feature/new-protocol
# 进行开发工作...
git add .
git commit -m "feat: add new protocol module"
git push origin feature/new-protocol

# 合并到开发分支
git checkout develop
git merge feature/new-protocol
```

### 2. 发布准备

```bash
# 创建发布分支
git checkout -b release/v1.2.0

# 执行发布准备（参考 docs/release/OPTIMIZED_RELEASE_GUIDE.md）
./scripts/prepare-release.sh v1.2.0

# 验证发布内容
./scripts/validate-release.sh v1.2.0

# 提交发布版本
git add release/v1.2.0/
git commit -m "🔖 Prepare release v1.2.0"
git push origin release/v1.2.0
```

### 3. 自动同步

#### 方式一：自动触发（推荐）

```bash
# 创建版本标签，自动触发 GitHub Actions
git tag -a v1.2.0 -m "MPLP v1.2.0"
git push origin v1.2.0

# GitHub Actions 将自动：
# 1. 验证发布内容
# 2. 同步到协议仓库
# 3. 创建发布标签
# 4. 生成发布报告
```

#### 方式二：手动同步

```bash
# 使用同步脚本
./scripts/sync-to-protocol-repo.sh v1.2.0

# 脚本将自动：
# 1. 克隆协议仓库
# 2. 清理现有内容
# 3. 复制发布内容
# 4. 提交并推送更新
```

### 4. 发布完成

```bash
# 合并到主分支
git checkout master
git merge release/v1.2.0
git tag -a v1.2.0-dev -m "Development version v1.2.0"
git push origin master
git push origin v1.2.0-dev

# 清理发布分支
git branch -d release/v1.2.0
git push origin --delete release/v1.2.0
```

## 🛠️ 配置要求

### GitHub Secrets

在开发仓库中配置以下 Secrets：

- `PROTOCOL_REPO_TOKEN`: 具有协议仓库写权限的 Personal Access Token

### 权限设置

1. **开发仓库权限：**
   - 内部团队：Admin/Write 权限
   - CI/CD Bot：Write 权限

2. **协议仓库权限：**
   - 公开读取权限
   - 仅通过 Token 写入

## 📊 版本管理

### 版本号规范

遵循 [语义化版本控制 2.0.0](https://semver.org/lang/zh-CN/)：

- **主版本号 (MAJOR)**：不兼容的 API 修改
- **次版本号 (MINOR)**：向下兼容的功能性新增
- **修订号 (PATCH)**：向下兼容的问题修正

### 标签策略

**开发仓库标签：**
- `v1.2.0-dev`: 开发版本
- `v1.2.0-alpha`: 内测版本
- `v1.2.0-beta`: 公测版本
- `v1.2.0-rc.1`: 发布候选版本

**协议仓库标签：**
- `v1.2.0`: 正式发布版本
- `v1.1.0`: 历史版本

## 🔍 监控和维护

### 同步状态检查

```bash
# 检查最新同步状态
gh workflow list --repo Coregentis/MPLP-Protocol-Dev
gh run list --workflow="sync-protocol-repo.yml" --repo Coregentis/MPLP-Protocol-Dev

# 查看同步日志
gh run view <run-id> --repo Coregentis/MPLP-Protocol-Dev
```

### 手动验证

```bash
# 验证协议仓库内容
git clone https://github.com/Coregentis/MPLP-Protocol.git
cd MPLP-Protocol

# 检查版本一致性
cat VERSION.json
git tag --list

# 验证文件完整性
ls -la protocols/ schemas/ examples/
```

## 🚨 故障排除

### 常见问题

1. **同步失败**
   - 检查 `PROTOCOL_REPO_TOKEN` 权限
   - 验证发布目录结构
   - 查看 GitHub Actions 日志

2. **版本不一致**
   - 确认标签推送成功
   - 检查自动化工作流状态
   - 手动执行同步脚本

3. **权限问题**
   - 更新 Personal Access Token
   - 检查仓库访问权限
   - 验证 Secrets 配置

### 紧急恢复

```bash
# 回滚协议仓库到上一版本
cd MPLP-Protocol
git reset --hard v1.1.0
git push --force origin main

# 删除错误标签
git tag -d v1.2.0
git push origin --delete v1.2.0
```

## 📞 支持联系

- **技术支持：** 开发团队内部沟通渠道
- **问题报告：** 在开发仓库创建 Issue
- **功能请求：** 通过内部需求管理流程

---

## 🎯 最佳实践

1. **定期同步：** 确保协议仓库内容及时更新
2. **版本验证：** 发布前充分测试和验证
3. **文档维护：** 保持发布指南和架构文档更新
4. **监控告警：** 设置同步失败通知
5. **备份策略：** 定期备份重要版本和配置

通过这种双仓库架构，MPLP 能够为开发团队提供完整的开发环境，同时为用户提供纯净、专业的协议访问体验。