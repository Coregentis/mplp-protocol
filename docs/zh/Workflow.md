---
翻译状态: 已完成
原文档: docs/en/Workflow.md
最后更新: 2025-06-28
翻译版本: 1.0
语言: zh
---

# MPLP.Workflow — Workflow Protocol

# MPLP.Workflow Protocol

## 目的
此协议定义了多智能体项目开发的工作流编排和流程管理，包括阶段协调和流程控制机制。

## 结构

The MPLP.Workflow protocol follows this JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Workflow.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Workflow Schema",
  "description": "Schema for workflow orchestration and process management in multi-agent systems.",
  "type": "object",
  "properties": {
    "workflowId": {
      "type": "string",
      "description": "Unique identifier for this workflow instance."
    },
    "name": {
      "type": "string",
      "description": "Human-readable name of the workflow."
    },
    "description": {
      "type": "string",
      "description": "Detailed description of the workflow's purpose and scope."
    },
    "stages": {
      "type": "array",
      "description": "Sequential stages in the workflow execution.",
      "items": {
        "type": "object",
        "properties": {
          "stageId": {
            "type": "string",
            "description": "Unique identifier for the stage."
          },
          "name": {
            "type": "string",
            "description": "Name of the workflow stage."
          },
          "requiredRoles": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Roles required to participate in this stage."
          },
          "deliverables": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Expected outputs from this stage."
          }
        },
        "required": ["stageId", "name"]
      }
    },
    "dependencies": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "External dependencies required for workflow execution."
    },
    "triggers": {
      "type": "array",
      "items": {
        "type": "object"
      },
      "description": "Events or conditions that can trigger workflow execution."
    },
    "status": {
      "type": "string",
      "enum": ["active", "suspended", "completed", "failed", "cancelled"],
      "description": "Current execution status of the workflow."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the workflow was created."
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the workflow was last updated."
    }
  },
  "required": ["workflowId", "name", "stages", "status", "createdAt"],
  "additionalProperties": false
}
```

### 关键组件:

- **workflowId**: 每个的唯一标识符 workflow instance
- **name**: Human-readable workflow name
- **stages**: Sequential phases with role assignments and deliverables
- **dependencies**: External requirements for workflow execution
- **triggers**: Events that initiate or control workflow progression
- **status**: Current state of workflow execution

## 建议执行模型
> 基于状态机的工作流引擎，具有阶段门控机制。
> 标准生命周期: initialize → execute → validate → progress → complete