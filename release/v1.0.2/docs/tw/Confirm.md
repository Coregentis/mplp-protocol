> **翻譯狀態**: 已完成
> **原文檔**: docs/en/Confirm.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

# MPLP.Confirm — 確認協議

## 目的
此協議凍結意圖並啟用多輪確認，以防止執行偏移並確保與使用者期望保持一致。

## 結構

MPLP.Confirm 協議遵循此JSON架構:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Confirm.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Confirm Schema",
  "description": "用於在多智能體工作流程中凍結和確認任務計劃的架構。",
  "type": "object",
  "properties": {
    "confirmId": {
      "type": "string",
      "description": "確認實例的唯一識別符。"
    },
    "planId": {
      "type": "string",
      "description": "正在確認的關聯計劃識別符。"
    },
    "confirmedBy": {
      "type": "string",
      "description": "執行確認的使用者或智能體。"
    },
    "confirmedAt": {
      "type": "string",
      "format": "date-time",
      "description": "確認的時間戳。"
    },
    "approvalStages": {
      "type": "array",
      "description": "確認流程的多階段審批流程。",
      "items": {
        "type": "object",
        "properties": {
          "stageId": {
            "type": "string",
            "description": "審批階段的識別符。"
          },
          "approver": {
            "type": "string",
            "description": "負責審批此階段的使用者或智能體。"
          },
          "status": {
            "type": "string",
            "enum": ["pending", "approved", "rejected"],
            "description": "此階段的狀態。"
          },
          "comment": {
            "type": "string",
            "description": "審批者的可選評論或回饋。"
          },
          "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "階段完成的時間。"
          }
        },
        "required": ["stageId", "approver", "status"]
      }
    },
    "rollbackPlan": {
      "type": "object",
      "description": "用於撤銷已確認變更的回滾機制。",
      "properties": {
        "rollbackId": {
          "type": "string",
          "description": "回滾計劃的唯一識別符。"
        },
        "steps": {
          "type": "array",
          "description": "回滾步驟的有序列表。",
          "items": {
            "type": "object",
            "properties": {
              "stepId": {
                "type": "string",
                "description": "回滾步驟的識別符。"
              },
              "action": {
                "type": "string",
                "description": "回滾期間要執行的動作。"
              },
              "target": {
                "type": "string",
                "description": "要回滾的目標資源或狀態。"
              }
            },
            "required": ["stepId", "action", "target"]
          }
        }
      }
    },
    "finalStatus": {
      "type": "string",
      "enum": ["pending", "confirmed", "rejected", "rolled_back"],
      "description": "確認流程的最終狀態。"
    }
  },
  "required": ["confirmId", "planId", "confirmedBy", "confirmedAt", "finalStatus"],
  "additionalProperties": false
}
```

### 關鍵組件:

- **confirmId**: 每個確認實例的唯一識別符
- **planId**: 正在確認的計劃參考
- **approvalStages**: 具有狀態追蹤的多階段審批工作流程
- **rollbackPlan**: 用於撤銷已確認變更的結構化機制
- **finalStatus**: 整體確認狀態（待處理、已確認、已拒絕、已回滾）
- **confirmedBy/confirmedAt**: 確認動作的審計追蹤

## 建議執行模型
> 具有檢查點和使用者審批門控的多階段確認。
> 標準生命週期：捕獲 → 凍結 → 審查 → 審批 → 進行