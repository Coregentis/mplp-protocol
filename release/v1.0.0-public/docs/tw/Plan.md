> **翻譯狀態**: 已完成
> **原文檔**: docs/en/Plan.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

# MPLP.Plan — 規劃協議

## 目的
此協議定義多智能體專案規劃和協調的結構化任務、智能體分配和 DSL 架構。

## 結構

MPLP.Plan 協議遵循以下 JSON 架構：

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Plan.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Plan Schema",
  "description": "在多智能體系統中規劃結構化任務和智能體分配的架構。",
  "type": "object",
  "properties": {
    "planId": {
      "type": "string",
      "description": "此規劃實例的唯一識別符。"
    },
    "goal": {
      "type": "string",
      "description": "專案規劃的主要目標或高層次目標。"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "規劃創建的時間戳。"
    },
    "tasks": {
      "type": "array",
      "description": "規劃中包含的結構化任務列表。",
      "items": {
        "type": "object",
        "properties": {
          "taskId": {
            "type": "string",
            "description": "任務的唯一識別符。"
          },
          "description": {
            "type": "string",
            "description": "任務的人類可讀描述。"
          },
          "dsl": {
            "type": "string",
            "description": "用於指定任務邏輯的領域特定語言（DSL）。"
          },
          "assignedAgent": {
            "type": "string",
            "description": "分配執行此任務的智能體ID。"
          },
          "dependencies": {
            "type": "array",
            "description": "此任務依賴的任務ID列表。",
            "items": {
              "type": "string"
            }
          },
          "priority": {
            "type": "integer",
            "minimum": 1,
            "maximum": 10,
            "description": "任務的優先級（1=最低，10=最高）。"
          },
          "estimatedDuration": {
            "type": "string",
            "description": "完成任務的預估時間（ISO 8601 持續時間格式）。"
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

### 關鍵組件:

- **planId**: 每個規劃實例的唯一識別符
- **goal**: 專案的高層級目標
- **createdAt**: 規劃建立的 ISO 8601 時間戳
- **tasks**: 具有依賴關係和分配的結構化任務陣列
- **DSL**: 任務規範的領域特定語言
- **dependencies**: 執行順序的任務依賴圖
- **priority**: 資源分配的任務優先順序

## 建議執行模型
> 階層式任務分解，配合智能體能力匹配。
> 標準生命週期：分析 → 分解 → 分配 → 驗證 → 執行