---
翻译状态: 已完成
原文档: docs/en/Plan.md
最后更新: 2025-06-28
翻译版本: 1.0
语言: zh
---

# MPLP.Plan — Plan Protocol

# MPLP.Plan — Planning Protocol

## 目的
此协议定义了多智能体项目规划和协调的结构化任务、智能体分配和 DSL 架构。

## 结构

MPLP.Plan 协议遵循以下 JSON 架构：

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Plan.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Plan Schema",
  "description": "Schema for planning structured tasks and agent assignments in a multi-agent system.",
  "type": "object",
  "properties": {
    "planId": {
      "type": "string",
      "description": "Unique identifier for this plan instance."
    },
    "goal": {
      "type": "string",
      "description": "The main objective or high-level goal of the project plan."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the plan was created."
    },
    "tasks": {
      "type": "array",
      "description": "List of structured tasks included in the plan.",
      "items": {
        "type": "object",
        "properties": {
          "taskId": {
            "type": "string",
            "description": "Unique identifier for the task."
          },
          "description": {
            "type": "string",
            "description": "Human-readable description of the task."
          },
          "dsl": {
            "type": "string",
            "description": "Domain-specific language (DSL) used to specify task logic."
          },
          "assignedAgent": {
            "type": "string",
            "description": "ID of the agent assigned to execute this task."
          },
          "dependencies": {
            "type": "array",
            "description": "List of task IDs that this task depends on.",
            "items": {
              "type": "string"
            }
          },
          "priority": {
            "type": "integer",
            "minimum": 1,
            "maximum": 10,
            "description": "Priority level of the task (1=lowest, 10=highest)."
          },
          "estimatedDuration": {
            "type": "string",
            "description": "Estimated time to complete the task (ISO 8601 duration format)."
          }
        },
        "required": ["taskId", "description", "dsl", "assignedAgent"]
      }
    }
  },
  "required": ["planId", "goal", "createdAt", "tasks"],
  "additionalProperties": false
}
```

### 关键组件:

- **planId**: 每个计划实例的唯一标识符
- **goal**: 项目的高级目标
- **createdAt**: 计划创建的 ISO 8601 时间戳
- **tasks**: 具有依赖关系和分配的结构化任务数组
- **DSL**: 用于任务规范的领域特定语言
- **dependencies**: 用于执行排序的任务依赖图
- **priority**: 用于资源分配的任务优先级

## 建议执行模型
> 分层任务分解与智能体能力匹配。
> 标准生命周期：分析 → 分解 → 分配 → 验证 → 执行