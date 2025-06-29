> **翻譯狀態**: 已完成
> **原文檔**: docs/en/Test.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

# MPLP.Test — 測試協議

## 目的
此協議產生自動化測試案例並驗證輸出完整性，以確保多智能體系統的品質和安全性。

## 結構

MPLP.Test 協議遵循以下 JSON 架構：

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Test.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Test Schema",
  "description": "Schema for defining automated test cases, test execution metadata, and result validation for multi-agent systems.",
  "type": "object",
  "properties": {
    "testId": {
      "type": "string",
      "description": "測試案例的唯一識別符。"
    },
    "relatedTaskId": {
      "type": "string",
      "description": "對被測試任務或DSL節點的引用。"
    },
    "input": {
      "type": "object",
      "description": "測試案例的輸入資料。",
      "additionalProperties": true
    },
    "expectedOutput": {
      "type": "object",
      "description": "用於驗證的預期輸出資料。",
      "additionalProperties": true
    },
    "testType": {
      "type": "string",
      "enum": ["unit", "integration", "regression", "schema_validation"],
      "description": "正在進行的測試類型。"
    },
    "executionStatus": {
      "type": "string",
      "enum": ["pending", "running", "passed", "failed"],
      "description": "測試執行的狀態。"
    },
    "result": {
      "type": "object",
      "description": "測試執行期間捕獲的實際結果。",
      "additionalProperties": true
    },
    "errorMessage": {
      "type": "string",
      "description": "測試失敗時的可選錯誤訊息。"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "測試執行或完成的時間。"
    },
    "validationRules": {
      "type": "array",
      "description": "應用於測試的驗證規則清單。",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string",
            "description": "正在驗證的欄位。"
          },
          "rule": {
            "type": "string",
            "description": "驗證規則類型。"
          },
          "expected": {
            "description": "預期值或模式。"
          }
        },
        "required": ["field", "rule"]
      }
    }
  },
  "required": ["testId", "relatedTaskId", "input", "expectedOutput", "testType", "executionStatus"],
  "additionalProperties": false
}
```

### 關鍵組件:

- **testId**: 每個測試案例的唯一識別符
- **relatedTaskId**: 將測試連結到特定任務或 DSL 節點
- **testType**: 測試分類（單元測試、整合測試、回歸測試、架構驗證）
- **input/expectedOutput**: 測試資料和預期結果
- **executionStatus**: 當前測試執行狀態
- **validationRules**: 可配置的驗證標準
- **result**: 用於比較的實際測試執行輸出

## 建議執行模型
> 自動化測試產生，配合持續驗證和回歸測試。
> 標準生命週期：產生 → 執行 → 驗證 → 報告 → 迭代