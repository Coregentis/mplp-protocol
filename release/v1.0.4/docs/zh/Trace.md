---
翻译状态: 已完成
原文档: docs/en/Trace.md
最后更新: 2025-06-28
翻译版本: 1.0
语言: zh
---

# MPLP.Trace — Trace Protocol

# MPLP.Trace — Traceability Protocol

## 目的
该协议记录多智能体系统中的所有操作、状态和转换，用于审计和调试。

## 结构

The MPLP.Trace protocol follows this JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Trace.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Trace Schema",
  "description": "Schema for recording and querying all traceable events, state changes, and transitions in a multi-agent project.",
  "type": "object",
  "properties": {
    "traceId": {
      "type": "string",
      "description": "Unique identifier for the trace entry."
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "Time at which the event was recorded."
    },
    "source": {
      "type": "string",
      "description": "Origin of the event (e.g., Context, Execute, Learn, Test, external API)."
    },
    "agentId": {
      "type": "string",
      "description": "Optional agent involved in the event."
    },
    "eventType": {
      "type": "string",
      "enum": ["state_change", "action", "error", "message", "confirmation", "execution_log", "external_call"],
      "description": "Type of event being recorded."
    },
    "eventDetails": {
      "type": "object",
      "description": "Structured details about the event.",
      "additionalProperties": true
    },
    "relatedObject": {
      "type": "string",
      "description": "Optional reference to an associated object (e.g., taskId, executionId, learningId)."
    },
    "tags": {
      "type": "array",
      "description": "Optional tags for querying/filtering trace entries.",
      "items": {
        "type": "string"
      }
    },
    "severity": {
      "type": "string",
      "enum": ["debug", "info", "warning", "error", "critical"],
      "description": "Severity level of the event."
    },
    "auditTrail": {
      "type": "object",
      "description": "Audit trail information for compliance and debugging.",
      "properties": {
        "userId": {
          "type": "string",
          "description": "User who initiated the action (if applicable)."
        },
        "sessionId": {
          "type": "string",
          "description": "Session identifier for grouping related events."
        },
        "requestId": {
          "type": "string",
          "description": "Request identifier for tracing across services."
        },
        "previousState": {
          "type": "object",
          "description": "State before the event occurred."
        },
        "newState": {
          "type": "object",
          "description": "State after the event occurred."
        }
      }
    }
  },
  "required": ["traceId", "timestamp", "source", "eventType"],
  "additionalProperties": true
}
```

### 关键组件:

- **traceId**: 每个跟踪条目的唯一标识符
- **timestamp**: 事件发生的 ISO 8601 时间戳
- **source**: 生成事件的源系统或组件
- **eventType**: 事件分类（状态变更、操作、错误等）
- **eventDetails**: 事件特定数据的灵活结构
- **auditTrail**: 合规性和调试信息，包含状态转换
- **tags**: 用于高效查询和过滤的元数据
- **severity**: 用于监控和告警的事件重要性级别

## 建议执行模型
> 具有结构化事件捕获和查询功能的综合日志系统。
> 标准生命周期：捕获 → 结构化 → 存储 → 索引 → 查询