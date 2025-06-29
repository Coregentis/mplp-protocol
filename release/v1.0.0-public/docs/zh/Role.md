---
翻译状态: 已完成
原文档: docs/en/Role.md
最后更新: 2025-06-28
翻译版本: 1.0
语言: zh
---

# MPLP.Role — Role Protocol

# MPLP.Role Protocol

## 目的
此协议定义了多智能体项目团队的角色管理和智能体分配机制，包括能力、职责和工具绑定。

## 结构

MPLP.Role 协议遵循以下 JSON 架构：

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Role.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Role Schema",
  "description": "Schema for role management and agent assignment in multi-agent systems.",
  "type": "object",
  "properties": {
    "roleId": {
      "type": "string",
      "description": "Unique identifier for this role definition."
    },
    "name": {
      "type": "string",
      "description": "Human-readable name of the role."
    },
    "type": {
      "type": "string",
      "enum": ["management", "development", "testing", "operations", "analysis"],
      "description": "Category of the role."
    },
    "description": {
      "type": "string",
      "description": "Detailed description of the role's purpose and scope."
    },
    "capabilities": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of core capabilities this role provides."
    },
    "responsibilities": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Primary responsibilities and duties of this role."
    },
    "permissions": {
      "type": "object",
      "description": "Access permissions and authorization levels for this role.",
      "additionalProperties": true
    },
    "status": {
      "type": "string",
      "enum": ["active", "inactive", "suspended"],
      "description": "Current operational status of the role."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the role was created."
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the role was last updated."
    }
  },
  "required": ["roleId", "name", "type", "capabilities", "responsibilities", "status", "createdAt"],
  "additionalProperties": false
}
```

### 关键组件:

- **roleId**: 每个角色定义的唯一标识符
- **name**: 人类可读的角色名称（例如："产品经理"、"开发者"）
- **type**: 用于组织目的的角色类别
- **capabilities**: 该角色提供的核心技能和能力
- **responsibilities**: 主要职责和义务
- **permissions**: 访问权限和授权级别
- **status**: 角色的当前运行状态

## 建议执行模型
> 基于角色的访问控制与能力匹配。
> 标准生命周期：定义 → 分配 → 激活 → 监控 → 更新