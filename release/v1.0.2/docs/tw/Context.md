> **翻譯狀態**: 已完成
> **原文檔**: docs/en/Context.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

# MPLP.Context — 上下文協議

## 目的
此協議定義多智能體專案中所有智能體的全域狀態管理和共享上下文機制。

## 結構

MPLP.Context 協議遵循以下 JSON 架構：

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
      "description": "此上下文實例的唯一識別符。"
    },
    "projectName": {
      "type": "string",
      "description": "與此上下文關聯的專案名稱。"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "上下文初始化的時間戳。"
    },
    "agentStates": {
      "type": "array",
      "description": "當前上下文中活躍的智能體狀態列表。",
      "items": {
        "type": "object",
        "properties": {
          "agentId": {
            "type": "string",
            "description": "智能體的唯一識別符。"
          },
          "role": {
            "type": "string",
            "description": "智能體在專案中的角色。"
          },
          "status": {
            "type": "string",
            "enum": ["idle", "active", "error", "completed"],
            "description": "智能體的當前操作狀態。"
          }
        },
        "required": ["agentId", "role", "status"]
      }
    },
    "memory": {
      "type": "object",
      "description": "任意共享記憶體或鍵值資料存儲。",
      "additionalProperties": true
    }
  },
  "required": ["contextId", "projectName", "createdAt", "agentStates", "memory"],
  "additionalProperties": false
}
```

### 關鍵組件:

- **contextId**: 每個上下文實例的唯一識別符
- **projectName**: 人類可讀的專案名稱
- **createdAt**: 上下文初始化的 ISO 8601 時間戳
- **agentStates**: 追蹤所有活躍智能體及其當前狀態的陣列
- **memory**: 智能體間共享資料的靈活鍵值存儲

## 建議執行模型
> 基於 JSON 的鍵值池，配合記憶體後端（例如：Qdrant、Redis）。
> 標準生命週期：初始化 → 更新 → 解析 → 持久化