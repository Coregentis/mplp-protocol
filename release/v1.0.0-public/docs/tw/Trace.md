> **翻譯狀態**: 已完成
> **原文檔**: docs/en/Trace.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

# MPLP.Trace — 追蹤協議

## 目的
此協議記錄多智能體系統中的所有動作、狀態和轉換，用於審計和除錯。

## 結構

MPLP.Trace 協議遵循此JSON架構:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Trace.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Trace Schema",
  "description": "用於記錄和查詢多智能體專案中所有可追蹤事件、狀態變更和轉換的架構。",
  "type": "object",
  "properties": {
    "traceId": {
      "type": "string",
      "description": "追蹤條目的唯一識別符。"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "事件記錄的時間。"
    },
    "source": {
      "type": "string",
      "description": "事件的來源（例如：Context、Execute、Learn、Test、外部API）。"
    },
    "agentId": {
      "type": "string",
      "description": "參與事件的可選智能體。"
    },
    "eventType": {
      "type": "string",
      "enum": ["state_change", "action", "error", "message", "confirmation", "execution_log", "external_call"],
      "description": "正在記錄的事件類型。"
    },
    "eventDetails": {
      "type": "object",
      "description": "關於事件的結構化詳細資訊。",
      "additionalProperties": true
    },
    "relatedObject": {
      "type": "string",
      "description": "關聯物件的可選參考（例如：taskId、executionId、learningId）。"
    },
    "tags": {
      "type": "array",
      "description": "用於查詢/過濾追蹤條目的可選標籤。",
      "items": {
        "type": "string"
      }
    },
    "severity": {
      "type": "string",
      "enum": ["debug", "info", "warning", "error", "critical"],
      "description": "事件的嚴重程度等級。"
    },
    "auditTrail": {
      "type": "object",
      "description": "用於合規性和除錯的審計追蹤資訊。",
      "properties": {
        "userId": {
          "type": "string",
          "description": "發起動作的使用者（如適用）。"
        },
        "sessionId": {
          "type": "string",
          "description": "用於分組相關事件的會話識別符。"
        },
        "requestId": {
          "type": "string",
          "description": "用於跨服務追蹤的請求識別符。"
        },
        "previousState": {
          "type": "object",
          "description": "事件發生前的狀態。"
        },
        "newState": {
          "type": "object",
          "description": "事件發生後的狀態。"
        }
      }
    }
  },
  "required": ["traceId", "timestamp", "source", "eventType"],
  "additionalProperties": true
}
```

### 關鍵組件:

- **traceId**: 每個追蹤條目的唯一識別符
- **timestamp**: 事件發生的ISO 8601時間戳
- **source**: 產生事件的來源系統或組件
- **eventType**: 事件分類（狀態變更、動作、錯誤等）
- **eventDetails**: 事件特定資料的彈性結構
- **auditTrail**: 包含狀態轉換的合規性和除錯資訊
- **tags**: 用於高效查詢和過濾的元資料
- **severity**: 用於監控和警報的事件重要性等級

## 建議執行模型
> 具有結構化事件捕獲和查詢功能的綜合日誌系統。
> 標準生命週期：捕獲 → 結構化 → 儲存 → 索引 → 查詢