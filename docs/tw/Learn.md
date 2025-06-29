> **翻譯狀態**: 已完成
> **原文檔**: docs/en/Learn.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

# MPLP.Learn — 學習協議

## 目的
此協議為多智能體系統提供自我改進、失敗分析和策略演化功能。

## 結構

MPLP.Learn 協議遵循此JSON架構:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Learn.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Learn Schema",
  "description": "在多智能體環境中表示學習過程、回饋和策略演化的架構。",
  "type": "object",
  "properties": {
    "learningId": {
      "type": "string",
      "description": "學習記錄的唯一識別符。"
    },
    "relatedExecutionId": {
      "type": "string",
      "description": "觸發學習過程的執行實例。"
    },
    "agentId": {
      "type": "string",
      "description": "正在學習的智能體。"
    },
    "observations": {
      "type": "array",
      "description": "在執行期間/之後收集的觀察或信號列表。",
      "items": {
        "type": "string"
      }
    },
    "failureReason": {
      "type": "string",
      "description": "失敗的可選原因或根本原因（如適用）。"
    },
    "adjustments": {
      "type": "array",
      "description": "對智能體行為、參數或策略所做的變更列表。",
      "items": {
        "type": "object",
        "properties": {
          "target": {
            "type": "string",
            "description": "正在調整的組件/行為。"
          },
          "changeType": {
            "type": "string",
            "enum": ["parameter", "workflow", "tool", "strategy"],
            "description": "調整的類型。"
          },
          "description": {
            "type": "string",
            "description": "變更的說明。"
          },
          "beforeValue": {
            "description": "先前的值或狀態。"
          },
          "afterValue": {
            "description": "新的值或狀態。"
          }
        },
        "required": ["target", "changeType", "description"]
      }
    },
    "knowledgeBase": {
      "type": "object",
      "description": "學習模式和策略的結構化知識庫。",
      "properties": {
        "patterns": {
          "type": "array",
          "description": "從執行歷史中識別的模式。",
          "items": {
            "type": "object",
            "properties": {
              "patternId": {
                "type": "string",
                "description": "模式的唯一識別符。"
              },
              "description": {
                "type": "string",
                "description": "模式的人類可讀描述。"
              },
              "conditions": {
                "type": "array",
                "description": "此模式適用的條件。",
                "items": {
                  "type": "string"
                }
              },
              "confidence": {
                "type": "number",
                "minimum": 0,
                "maximum": 1,
                "description": "此模式的信心水準（0-1）。"
              }
            },
            "required": ["patternId", "description", "confidence"]
          }
        },
        "strategies": {
          "type": "array",
          "description": "針對不同情境的學習策略。",
          "items": {
            "type": "object",
            "properties": {
              "strategyId": {
                "type": "string",
                "description": "策略的唯一識別符。"
              },
              "scenario": {
                "type": "string",
                "description": "此策略適用的情境或上下文。"
              },
              "actions": {
                "type": "array",
                "description": "此策略中的動作序列。",
                "items": {
                  "type": "string"
                }
              },
              "effectiveness": {
                "type": "number",
                "minimum": 0,
                "maximum": 1,
                "description": "此策略的測量有效性（0-1）。"
              }
            },
            "required": ["strategyId", "scenario", "actions", "effectiveness"]
          }
        }
      }
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "學習過程完成的時間。"
    }
  },
  "required": ["learningId", "relatedExecutionId", "agentId", "observations", "timestamp"],
  "additionalProperties": false
}
```

### 關鍵組件:

- **learningId**: 每個學習實例的唯一識別符
- **relatedExecutionId**: 將學習連結到觸發它的特定執行
- **observations**: 從執行中收集的信號和資料
- **adjustments**: 對智能體行為或參數所做的具體變更
- **knowledgeBase**: 學習模式和策略的結構化儲存庫
- **patterns/strategies**: 識別的行為模式和有效策略
- **confidence/effectiveness**: 學習品質的量化測量

## 建議執行模型
> 具有失敗分析和策略優化的持續學習循環。
> 標準生命週期：觀察 → 分析 → 學習 → 適應 → 改進