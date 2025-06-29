---
翻译状态: 已完成
原文档: docs/en/Delivery.md
最后更新: 2025-06-28
翻译版本: 1.0
语言: zh
---

# MPLP.Delivery — Delivery Protocol

# MPLP.Delivery Protocol

## 目的
此协议定义了 deliverable management and cross-project dependency coordination for multi-agent systems, including artifact tracking and delivery orchestration.

## 结构

The MPLP.Delivery protocol follows this JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Delivery.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Delivery Schema",
  "description": "Schema for deliverable management and coordination in multi-agent systems.",
  "type": "object",
  "properties": {
    "deliveryId": {
      "type": "string",
      "description": "Unique identifier for this delivery instance."
    },
    "name": {
      "type": "string",
      "description": "Human-readable name of the delivery."
    },
    "type": {
      "type": "string",
      "enum": ["document", "code", "data", "service", "artifact"],
      "description": "Category of the deliverable."
    },
    "description": {
      "type": "string",
      "description": "Detailed description of the delivery content and purpose."
    },
    "artifacts": {
      "type": "array",
      "description": "List of deliverable artifacts and outputs.",
      "items": {
        "type": "object",
        "properties": {
          "artifactId": {
            "type": "string",
            "description": "Unique identifier for the artifact."
          },
          "name": {
            "type": "string",
            "description": "Name of the artifact."
          },
          "type": {
            "type": "string",
            "description": "Type or format of the artifact."
          },
          "location": {
            "type": "string",
            "description": "Storage location or access path."
          },
          "version": {
            "type": "string",
            "description": "Version identifier of the artifact."
          }
        },
        "required": ["artifactId", "name", "type"]
      }
    },
    "qualityMetrics": {
      "type": "object",
      "description": "Quality assessment and validation metrics for the delivery.",
      "additionalProperties": true
    },
    "status": {
      "type": "string",
      "enum": ["planned", "in_progress", "ready", "delivered", "accepted", "rejected"],
      "description": "Current status of the delivery."
    },
    "deliveredBy": {
      "type": "string",
      "description": "Identifier of the agent or role responsible for delivery."
    },
    "deliveredAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the delivery was completed."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the delivery was created."
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the delivery was last updated."
    }
  },
  "required": ["deliveryId", "name", "type", "artifacts", "status", "createdAt"],
  "additionalProperties": false
}
```

### 关键组件:

- **deliveryId**: 每个的唯一标识符 delivery instance
- **name**: Human-readable delivery name
- **type**: Category of deliverable for classification
- **artifacts**: Collection of deliverable items and outputs
- **qualityMetrics**: Assessment criteria and validation results
- **status**: Current state of delivery process
- **deliveredBy**: Responsible agent or role for delivery

## 建议执行模型
> Artifact repository with dependency tracking and delivery orchestration.
> 标准生命周期: plan → create → validate → deliver → accept