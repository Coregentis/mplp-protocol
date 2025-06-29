> **翻譯狀態**: 已完成
> **原文檔**: docs/en/Workflow.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

# MPLP.Workflow 工作流程協議

## 目的
此協議定義多智能體專案開發的工作流程編排和流程管理，包括階段協調和流程控制機制。

## 結構

MPLP.Workflow 協議遵循此JSON架構:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Workflow.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Workflow Schema",
  "description": "多智能體系統中工作流程編排和流程管理的架構。",
  "type": "object",
  "properties": {
    "workflowId": {
      "type": "string",
      "description": "此工作流程實例的唯一識別符。"
    },
    "name": {
      "type": "string",
      "description": "工作流程的人類可讀名稱。"
    },
    "description": {
      "type": "string",
      "description": "工作流程目的和範圍的詳細描述。"
    },
    "stages": {
      "type": "array",
      "description": "工作流程執行中的順序階段。",
      "items": {
        "type": "object",
        "properties": {
          "stageId": {
            "type": "string",
            "description": "階段的唯一識別符。"
          },
          "name": {
            "type": "string",
            "description": "工作流程階段的名稱。"
          },
          "requiredRoles": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "參與此階段所需的角色。"
          },
          "deliverables": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "此階段的預期輸出。"
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
      "description": "工作流程執行所需的外部依賴。"
    },
    "triggers": {
      "type": "array",
      "items": {
        "type": "object"
      },
      "description": "可觸發工作流程執行的事件或條件。"
    },
    "status": {
      "type": "string",
      "enum": ["active", "suspended", "completed", "failed", "cancelled"],
      "description": "工作流程的當前執行狀態。"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "工作流程創建的時間戳。"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time",
      "description": "工作流程最後更新的時間戳。"
    }
  },
  "required": ["workflowId", "name", "stages", "status", "createdAt"],
  "additionalProperties": false
}
```

### 關鍵組件:

- **workflowId**: 每個工作流程實例的唯一識別符
- **name**: 人類可讀的工作流程名稱
- **stages**: 具有角色分配和交付物的順序階段
- **dependencies**: 工作流程執行的外部需求
- **triggers**: 啟動或控制工作流程進展的事件
- **status**: 工作流程執行的當前狀態

## 建議執行模型
> 基於狀態機的工作流程引擎，具有階段門控。
> 標準生命週期：初始化 → 執行 → 驗證 → 進展 → 完成