---
翻译状态: 已完成
原文档: docs/en/Execute.md
最后更新: 2025-06-28
翻译版本: 1.0
语言: zh
---

# MPLP.Execute — Execute Protocol

# MPLP.Execute — Execution Protocol

## 目的
此协议处理多智能体任务实现的执行、I/O 标准化和工具/API 调用。

## 结构

MPLP.Execute 协议遵循以下 JSON 架构：

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Execute.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Execute Schema",
  "description": "Schema for defining task execution behavior and tool/API invocation in multi-agent systems.",
  "type": "object",
  "properties": {
    "executionId": {
      "type": "string",
      "description": "Unique identifier for the execution instance."
    },
    "taskId": {
      "type": "string",
      "description": "Reference to the task being executed."
    },
    "agentId": {
      "type": "string",
      "description": "Identifier of the agent performing the execution."
    },
    "startTime": {
      "type": "string",
      "format": "date-time",
      "description": "Start time of execution."
    },
    "endTime": {
      "type": "string",
      "format": "date-time",
      "description": "End time of execution."
    },
    "status": {
      "type": "string",
      "enum": ["pending", "running", "success", "failed"],
      "description": "Current status of the execution."
    },
    "input": {
      "type": "object",
      "description": "Normalized input data for the task."
    },
    "output": {
      "type": "object",
      "description": "Resulting output data from the execution."
    },
    "tool": {
      "type": "object",
      "description": "Tool or API used during execution.",
      "properties": {
        "name": {
          "type": "string",
          "description": "Name of the tool/API."
        },
        "version": {
          "type": "string",
          "description": "Version of the tool/API."
        },
        "parameters": {
          "type": "object",
          "description": "Parameters passed to the tool/API."
        }
      },
      "required": ["name"]
    },
    "error": {
      "type": "object",
      "description": "Error information if execution fails.",
      "properties": {
        "code": {
          "type": "string",
          "description": "Error code."
        },
        "message": {
          "type": "string",
          "description": "Human-readable error message."
        },
        "details": {
          "type": "object",
          "description": "Additional error details."
        }
      }
    }
  },
  "required": ["executionId", "taskId", "agentId", "startTime", "status"],
  "additionalProperties": false
}
```

### 关键组件:

- **executionId**: 每个执行实例的唯一标识符
- **taskId**: 从计划协议中引用正在执行的任务
- **agentId**: 执行智能体的标识符
- **status**: 当前执行状态（待处理、运行中、成功、失败）
- **input/output**: 任务 I/O 的标准化数据结构
- **tool**: 工具或 API 接口规范
- **error**: 结构化错误处理和报告

## 建议执行模型
> 标准化执行引擎，配合标准化输入/输出和错误处理。
> 标准生命周期：准备 → 执行 → 监控 → 验证 → 报告