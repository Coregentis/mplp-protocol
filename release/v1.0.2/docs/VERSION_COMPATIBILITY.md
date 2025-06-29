# MPLP Version Compatibility Matrix

## 概述

MPLP（Multi-Agent Project Lifecycle Protocol）版本兼容性矩阵是一个结构化的版本管理系统，用于跟踪和管理协议版本之间的兼容性关系。该系统确保不同版本之间的兼容性信息清晰可见，帮助开发者和用户做出明智的版本选择决策。

## 文件结构

### version-compatibility.json

位于项目根目录的 `version-compatibility.json` 文件包含完整的版本兼容性信息：

```json
{
  "latest": "v1.0.1",
  "matrix": [
    {
      "version": "v1.0.0",
      "status": "frozen",
      "compatibleWith": [],
      "breakingChanges": false,
      "deprecated": false,
      "notes": "Initial stable release with 7 core modules."
    },
    {
      "version": "v1.0.1",
      "status": "frozen",
      "compatibleWith": ["v1.0.0"],
      "breakingChanges": false,
      "deprecated": false,
      "notes": "Bug fixes and minor improvements, fully compatible with v1.0.0"
    }
  ]
}
```

### 字段说明

- **latest**: 当前最新的稳定版本
- **matrix**: 版本兼容性矩阵数组
  - **version**: 版本号（格式：vX.Y.Z）
  - **status**: 版本状态
    - `active`: 活跃开发中
    - `frozen`: 冻结版本，不再修改
    - `deprecated`: 已弃用
    - `beta`: 测试版本
    - `alpha`: 预览版本
  - **compatibleWith**: 兼容的版本列表
  - **breakingChanges**: 是否包含破坏性变更
  - **deprecated**: 是否已弃用
  - **notes**: 版本说明

## 管理脚本

### 可用命令

项目提供了自动化脚本来管理版本兼容性矩阵：

```bash
# 添加新版本
npm run compatibility:add
node scripts/update-compatibility-matrix.js add --version v1.1.0 --status active --compatible v1.0.0 --notes "New features added"

# 更新现有版本
npm run compatibility:update
node scripts/update-compatibility-matrix.js update v1.0.0 --status frozen

# 验证矩阵结构
npm run compatibility:validate
node scripts/update-compatibility-matrix.js validate

# 列出所有版本
npm run compatibility:list
node scripts/update-compatibility-matrix.js list
```

### 命令详解

#### 添加版本 (add)

```bash
node scripts/update-compatibility-matrix.js add [options]
```

**选项：**
- `--version <version>`: 版本号（必需，格式：vX.Y.Z）
- `--status <status>`: 版本状态（默认：active）
- `--compatible <version>`: 兼容版本（可多次使用）
- `--breaking <true|false>`: 是否包含破坏性变更（默认：false）
- `--deprecated <true|false>`: 是否已弃用（默认：false）
- `--notes <notes>`: 版本说明

**示例：**
```bash
# 添加新的活跃版本
node scripts/update-compatibility-matrix.js add --version v1.1.0 --status active --compatible v1.0.0 --compatible v1.0.1 --notes "Added new Context module features"

# 添加包含破坏性变更的版本
node scripts/update-compatibility-matrix.js add --version v2.0.0 --status beta --breaking true --notes "Major protocol restructure"
```

#### 更新版本 (update)

```bash
node scripts/update-compatibility-matrix.js update <version> [options]
```

**示例：**
```bash
# 将版本状态更改为冻结
node scripts/update-compatibility-matrix.js update v1.0.0 --status frozen

# 添加兼容性信息
node scripts/update-compatibility-matrix.js update v1.1.0 --compatible v1.0.2

# 标记为已弃用
node scripts/update-compatibility-matrix.js update v0.9.0 --deprecated true --notes "Please upgrade to v1.0.0 or later"
```

#### 验证矩阵 (validate)

验证功能检查：
- 最新版本是否存在于矩阵中
- 版本号格式是否正确
- 版本状态是否有效
- 兼容版本引用是否存在

#### 列出版本 (list)

显示格式化的版本信息，包括：
- 当前最新版本
- 所有版本的详细信息
- 兼容性关系
- 特殊标记（破坏性变更、已弃用等）

## 版本管理最佳实践

### 1. 版本号规范

- 使用语义化版本控制（Semantic Versioning）
- 格式：`vMAJOR.MINOR.PATCH`
- 主版本号：破坏性变更
- 次版本号：新功能，向后兼容
- 修订版本号：错误修复，向后兼容

### 2. 状态管理

- **开发阶段**：使用 `alpha` 或 `beta` 状态
- **稳定发布**：使用 `active` 状态
- **不再维护**：更改为 `frozen` 状态
- **安全问题**：标记为 `deprecated`

### 3. 兼容性声明

- 明确声明与哪些版本兼容
- 记录破坏性变更
- 提供详细的升级说明

### 4. 文档同步

- 每次版本更新后运行验证
- 确保 `release/` 目录与矩阵信息一致
- 更新相关文档和示例

## 集成到 CI/CD

### GitHub Actions 示例

```yaml
name: Version Compatibility Check

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  compatibility-check:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Validate compatibility matrix
      run: npm run compatibility:validate
    - name: Check frozen versions integrity
      run: npm run check:frozen
```

## 故障排除

### 常见错误

1. **版本格式错误**
   ```
   ❌ Invalid version format. Expected: vX.Y.Z
   ```
   解决：确保版本号以 'v' 开头，后跟三个数字，用点分隔

2. **兼容版本不存在**
   ```
   ❌ Compatible version v1.0.2 does not exist
   ```
   解决：先添加被引用的版本，或检查版本号拼写

3. **重复版本**
   ```
   ❌ Version v1.0.0 already exists
   ```
   解决：使用 `update` 命令而不是 `add` 命令

### 修复损坏的矩阵

如果矩阵文件损坏，可以：

1. 备份当前文件
2. 从 Git 历史恢复
3. 手动重建矩阵结构
4. 运行验证确保正确性

## 相关文件

- `version-compatibility.json`: 主要兼容性矩阵文件
- `scripts/update-compatibility-matrix.js`: 管理脚本
- `scripts/check-frozen-integrity.js`: 冻结版本完整性检查
- `release/`: 发布版本目录
- `public/versions.json`: 前端版本选择器数据源

## 更多信息

- [MPLP 协议文档](../README.md)
- [版本发布流程](./RELEASE_PROCESS.md)
- [贡献指南](../CONTRIBUTING.md)