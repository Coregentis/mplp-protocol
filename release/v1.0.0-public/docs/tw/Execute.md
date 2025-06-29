> **翻譯狀態**: 已完成
> **原文檔**: docs/en/Execute.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

# MPLP.Execute — 執行協議

## 目的
此協議處理多智能體任務實作的執行、I/O 標準化和工具/API 呼叫。

## 結構

MPLP.Execute 協議遵循以下 JSON 架構：

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Execute.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Execute Schema",
  "description": "用於定義多智能體系統中任務執行行為和工具/API調用的架構。",
  "type": "object",
  "properties": {
    "executionId": {
      "type": "string",
      "description": "執行實例的唯一識別符。"
    },
    "taskId": {
      "type": "string",
      "description": "對正在執行任務的引用。"
    },
    "agentId": {
      "type": "string",
      "description": "執行任務的智能體識別符。"
    },
    "startTime": {
      "type": "string",
      "format": "date-time",
      "description": "執行開始時間。"
    },
    "endTime": {
      "type": "string",
      "format": "date-time",
      "description": "執行結束時間。"
    },
    "status": {
      "type": "string",
      "enum": ["pending", "running", "success", "failed"],
      "description": "執行的當前狀態。"
    },
    "input": {
      "type": "object",
      "description": "任務的標準化輸入資料。"
    },
    "output": {
      "type": "object",
      "description": "執行產生的結果輸出資料。"
    },
    "tool": {
      "type": "object",
      "description": "執行期間使用的工具或API。",
      "properties": {
        "name": {
          "type": "string",
          "description": "工具/API的名稱。"
        },
        "version": {
          "type": "string",
          "description": "工具/API的版本。"
        },
        "parameters": {
          "type": "object",
          "description": "傳遞給工具/API的參數。"
        }
      },
      "required": ["name"]
    },
    "error": {
      "type": "object",
      "description": "執行失敗時的錯誤資訊。",
      "properties": {
        "code": {
          "type": "string",
          "description": "錯誤代碼。"
        },
        "message": {
          "type": "string",
          "description": "人類可讀的錯誤訊息。"
        },
        "details": {
          "type": "object",
          "description": "額外的錯誤詳細資訊。"
        }
      }
    }
  },
  "required": ["executionId", "taskId", "agentId", "startTime", "status"],
  "additionalProperties": false
}
```

### 關鍵組件:

- **executionId**: 每個執行實例的唯一識別符
- **taskId**: 從規劃協議中引用正在執行的任務
- **agentId**: 執行智能體的識別符
- **status**: 當前執行狀態（待處理、執行中、成功、失敗）
- **input/output**: 任務 I/O 的標準化資料結構
- **tool**: 工具或 API 介面規範
- **error**: 結構化錯誤處理和報告

## 建議執行模型
> 標準化執行引擎，配合標準化輸入/輸出和錯誤處理。
> 標準生命週期：準備 → 執行 → 監控 → 驗證 → 報告