---
翻译状态: 已完成
原文档: docs/en/Context.md
最后更新: 2025-06-28
翻译版本: 1.0
语言: zh
---

# MPLP.Context — Context Protocol

# MPLP.Context — Context Protocol

## 目的
此协议定义了多智能体项目中所有智能体的全局状态管理和共享上下文机制。

## 结构

MPLP.Context 协议遵循以下 JSON 架构：

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Context.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Context Schema",
  "description": "Schema for the global shared context protocol in a multi-agent system.",
  "type": "object",
  "properties": {
    "contextId": {
      "type": "string",
      "description": "A unique identifier for this context instance."
    },
    "projectName": {
      "type": "string",
      "description": "The name of the project associated with this context."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the context was initialized."
    },
    "agentStates": {
      "type": "array",
      "description": "List of agent states active in the current context.",
      "items": {
        "type": "object",
        "properties": {
          "agentId": {
            "type": "string",
            "description": "Unique identifier of the agent."
          },
          "role": {
            "type": "string",
            "description": "Role of the agent in the project."
          },
          "status": {
            "type": "string",
            "enum": ["idle", "active", "error", "completed"],
            "description": "Current operational status of the agent."
          }
        },
        "required": ["agentId", "role", "status"]
      }
    },
    "memory": {
      "type": "object",
      "description": "Arbitrary shared memory or key-value data store.",
      "additionalProperties": true
    }
  },
  "required": ["contextId", "projectName", "createdAt", "agentStates", "memory"],
  "additionalProperties": false
}
```

### 关键组件:

- **contextId**: 每个上下文实例的唯一标识符
- **projectName**: 人类可读的项目名称
- **createdAt**: 上下文初始化的 ISO 8601 时间戳
- **agentStates**: 跟踪所有活跃智能体及其当前状态的数组
- **memory**: 智能体之间共享数据的灵活键值存储

## 建议执行模型
> 基于 JSON 的键值池，配合内存后端（例如：Qdrant、Redis）。
> 标准生命周期：初始化 → 更新 → 解析 → 持久化