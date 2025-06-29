> **翻譯狀態**: 已完成
> **原文檔**: docs/en/Delivery.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

# MPLP.Delivery 交付協議

## 目的
此協議定義多智能體系統的交付物管理和跨專案依賴協調，包括工件追蹤和交付編排。

## 結構

MPLP.Delivery 協議遵循此JSON架構:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Delivery.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Delivery Schema",
  "description": "多智能體系統中交付物管理和協調的架構。",
  "type": "object",
  "properties": {
    "deliveryId": {
      "type": "string",
      "description": "此交付實例的唯一識別符。"
    },
    "name": {
      "type": "string",
      "description": "交付的人類可讀名稱。"
    },
    "type": {
      "type": "string",
      "enum": ["document", "code", "data", "service", "artifact"],
      "description": "交付物的類別。"
    },
    "description": {
      "type": "string",
      "description": "交付內容和目的的詳細描述。"
    },
    "artifacts": {
      "type": "array",
      "description": "交付物工件和輸出的列表。",
      "items": {
        "type": "object",
        "properties": {
          "artifactId": {
            "type": "string",
            "description": "工件的唯一識別符。"
          },
          "name": {
            "type": "string",
            "description": "工件的名稱。"
          },
          "type": {
            "type": "string",
            "description": "工件的類型或格式。"
          },
          "location": {
            "type": "string",
            "description": "儲存位置或存取路徑。"
          },
          "version": {
            "type": "string",
            "description": "工件的版本識別符。"
          }
        },
        "required": ["artifactId", "name", "type"]
      }
    },
    "qualityMetrics": {
      "type": "object",
      "description": "交付的品質評估和驗證指標。",
      "additionalProperties": true
    },
    "status": {
      "type": "string",
      "enum": ["planned", "in_progress", "ready", "delivered", "accepted", "rejected"],
      "description": "交付的當前狀態。"
    },
    "deliveredBy": {
      "type": "string",
      "description": "負責交付的智能體或角色識別符。"
    },
    "deliveredAt": {
      "type": "string",
      "format": "date-time",
      "description": "交付完成的時間戳。"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "交付創建的時間戳。"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time",
      "description": "交付最後更新的時間戳。"
    }
  },
  "required": ["deliveryId", "name", "type", "artifacts", "status", "createdAt"],
  "additionalProperties": false
}
```

### 關鍵組件:

- **deliveryId**: 每個交付實例的唯一識別符
- **name**: 人類可讀的交付名稱
- **type**: 用於分類的交付物類別
- **artifacts**: 交付物項目和輸出的集合
- **qualityMetrics**: 評估標準和驗證結果
- **status**: 交付流程的當前狀態
- **deliveredBy**: 負責交付的智能體或角色

## 建議執行模型
> 具有依賴追蹤和交付編排的工件儲存庫。
> 標準生命週期：計劃 → 創建 → 驗證 → 交付 → 接受