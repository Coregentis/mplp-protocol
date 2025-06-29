---
翻译状态: 已完成
原文档: docs/en/Learn.md
最后更新: 2025-06-28
翻译版本: 1.0
语言: zh
---

# MPLP.Learn — Learn Protocol

# MPLP.Learn — Learning Protocol

## 目的
This protocol enables self-improvement, failure analysis, and strategy evolution for multi-agent systems.

## 结构

The MPLP.Learn protocol follows this JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Learn.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Learn Schema",
  "description": "Schema for representing learning processes, feedback, and strategy evolution in multi-agent environments.",
  "type": "object",
  "properties": {
    "learningId": {
      "type": "string",
      "description": "Unique identifier for the learning record."
    },
    "relatedExecutionId": {
      "type": "string",
      "description": "Execution instance that triggered the learning process."
    },
    "agentId": {
      "type": "string",
      "description": "Agent undergoing learning."
    },
    "observations": {
      "type": "array",
      "description": "List of observations or signals collected during/after execution.",
      "items": {
        "type": "string"
      }
    },
    "failureReason": {
      "type": "string",
      "description": "Optional reason or root cause of failure, if applicable."
    },
    "adjustments": {
      "type": "array",
      "description": "List of changes made to the agent's behavior, parameters, or strategy.",
      "items": {
        "type": "object",
        "properties": {
          "target": {
            "type": "string",
            "description": "What component/behavior is being adjusted."
          },
          "changeType": {
            "type": "string",
            "enum": ["parameter", "workflow", "tool", "strategy"],
            "description": "Type of adjustment."
          },
          "description": {
            "type": "string",
            "description": "Explanation of the change."
          },
          "beforeValue": {
            "description": "Previous value or state."
          },
          "afterValue": {
            "description": "New value or state."
          }
        },
        "required": ["target", "changeType", "description"]
      }
    },
    "knowledgeBase": {
      "type": "object",
      "description": "Structured knowledge repository for learned patterns and strategies.",
      "properties": {
        "patterns": {
          "type": "array",
          "description": "Identified patterns from execution history.",
          "items": {
            "type": "object",
            "properties": {
              "patternId": {
                "type": "string",
                "description": "Unique identifier for the pattern."
              },
              "description": {
                "type": "string",
                "description": "Human-readable description of the pattern."
              },
              "conditions": {
                "type": "array",
                "description": "Conditions under which this pattern applies.",
                "items": {
                  "type": "string"
                }
              },
              "confidence": {
                "type": "number",
                "minimum": 0,
                "maximum": 1,
                "description": "Confidence level in this pattern (0-1)."
              }
            },
            "required": ["patternId", "description", "confidence"]
          }
        },
        "strategies": {
          "type": "array",
          "description": "Learned strategies for different scenarios.",
          "items": {
            "type": "object",
            "properties": {
              "strategyId": {
                "type": "string",
                "description": "Unique identifier for the strategy."
              },
              "scenario": {
                "type": "string",
                "description": "Scenario or context where this strategy applies."
              },
              "actions": {
                "type": "array",
                "description": "Sequence of actions in this strategy.",
                "items": {
                  "type": "string"
                }
              },
              "effectiveness": {
                "type": "number",
                "minimum": 0,
                "maximum": 1,
                "description": "Measured effectiveness of this strategy (0-1)."
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
      "description": "Time when the learning process was completed."
    }
  },
  "required": ["learningId", "relatedExecutionId", "agentId", "observations", "timestamp"],
  "additionalProperties": false
}
```

### 关键组件:

- **learningId**: 每个的唯一标识符 learning instance
- **relatedExecutionId**: Links learning to specific execution that triggered it
- **observations**: Collected signals and data from execution
- **adjustments**: Specific changes made to agent behavior or parameters
- **knowledgeBase**: 结构d repository of learned patterns and strategies
- **patterns/strategies**: Identified behavioral patterns and effective strategies
- **confidence/effectiveness**: Quantitative measures of learning quality

## 建议执行模型
> Continuous learning cycle with failure analysis and strategy optimization.
> 标准生命周期: observe → analyze → learn → adapt → improve