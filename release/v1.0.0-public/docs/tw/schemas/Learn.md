> **翻譯狀態: 已完成**
> **原文檔**: Learn.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

---
version: 1.0
created: 2025-06-28T20:38:47+08:00
last_updated: 2025-06-28T20:38:47+08:00
maintainer: MPLP開發團隊
applicable_scope: 多智能體項目生命週期協議
---

## MPLP.Learn Schema 類型

`object` ([MPLP.Learn Schema](definition.md))

# MPLP.Learn Schema 屬性

| 屬性                                  | 類型     | 必需 | 可為空       | 定義位置                                                                                                                                              |
| :---------------------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [learningId](#learningid)                 | `string` | 必需 | 不可為空 | [MPLP.Learn Schema](definition-properties-learningid.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/learningId")                 |
| [relatedExecutionId](#relatedexecutionid) | `string` | 必需 | 不可為空 | [MPLP.Learn Schema](definition-properties-relatedexecutionid.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/relatedExecutionId") |
| [agentId](#agentid)                       | `string` | 必需 | 不可為空 | [MPLP.Learn Schema](definition-properties-agentid.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/agentId")                       |
| [observations](#observations)             | `array`  | 必需 | 不可為空 | [MPLP.Learn Schema](definition-properties-observations.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/observations")             |
| [failureReason](#failurereason)           | `string` | 可選 | 不可為空 | [MPLP.Learn Schema](definition-properties-failurereason.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/failureReason")           |
| [adjustments](#adjustments)               | `array`  | 可選 | 不可為空 | [MPLP.Learn Schema](definition-properties-adjustments.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments")               |
| [knowledge](#knowledge)                   | `object` | 可選 | 不可為空 | [MPLP.Learn Schema](definition-properties-knowledge.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/knowledge")                   |
| [timestamp](#timestamp)                   | `string` | 必需 | 不可為空 | [MPLP.Learn Schema](definition-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/timestamp")                   |
| 附加屬性                     | Any      | 可選 | 可為空    |                                                                                                                                                         |

## learningId

學習記錄的唯一標識符。

`learningId`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Learn Schema](definition-properties-learningid.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/learningId")

### learningId 類型

`string`

## relatedExecutionId

觸發學習過程的執行實例。

`relatedExecutionId`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Learn Schema](definition-properties-relatedexecutionid.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/relatedExecutionId")

### relatedExecutionId 類型

`string`

## agentId

正在進行學習的智能體。

`agentId`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Learn Schema](definition-properties-agentid.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/agentId")

### agentId 類型

`string`

## observations

在執行期間/之後收集的觀察或信號列表。

`observations`

* 必需

* 類型: `string[]`

* 不可為空

* 定義位置: [MPLP.Learn Schema](definition-properties-observations.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/observations")

### observations 類型

`string[]`

## failureReason

可選的失敗原因或根本原因（如適用）。

`failureReason`

* 可選

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Learn Schema](definition-properties-failurereason.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/failureReason")

### failureReason 類型

`string`

## adjustments

對智能體行為、參數或策略所做的更改列表。

`adjustments`

* 可選

* 類型: `object[]` ([詳情](definition-properties-adjustments-items.md))

* 不可為空

* 定義位置: [MPLP.Learn Schema](definition-properties-adjustments.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments")

### adjustments 類型

`object[]` ([詳情](definition-properties-adjustments-items.md))

## knowledge

智能體存儲的可選更新知識或學習表示。

`knowledge`

* 可選

* 類型: `object` ([詳情](definition-properties-knowledge.md))

* 不可為空

* 定義位置: [MPLP.Learn Schema](definition-properties-knowledge.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/knowledge")

### knowledge 類型

`object` ([詳情](definition-properties-knowledge.md))

## timestamp

學習完成或更新的時間。

`timestamp`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Learn Schema](definition-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/timestamp")

### timestamp 類型

`string`

### timestamp 約束

**日期時間**: 字符串必須是日期時間字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")

## 附加屬性

允許附加屬性，不需要遵循特定的模式


## learningId 類型

`string`


## relatedExecutionId 類型

`string`


## agentId 類型

`string`


## observations 類型

`string[]`


## items 類型

`string`


## failureReason 類型

`string`


## adjustments 類型

`object[]` ([詳情](definition-properties-adjustments-items.md))


## items 類型

`object` ([詳情](definition-properties-adjustments-items.md))

# items 屬性

| 屬性                    | 類型     | 必需 | 可為空       | 定義位置                                                                                                                                                                                          |
| :-------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [target](#target)           | `string` | 必需 | 不可為空 | [MPLP.Learn Schema](definition-properties-adjustments-items-properties-target.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments/items/properties/target")           |
| [changeType](#changetype)   | `string` | 必需 | 不可為空 | [MPLP.Learn Schema](definition-properties-adjustments-items-properties-changetype.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments/items/properties/changeType")   |
| [description](#description) | `string` | 可選 | 不可為空 | [MPLP.Learn Schema](definition-properties-adjustments-items-properties-description.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments/items/properties/description") |

## target

正在調整的組件/行為。

`target`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Learn Schema](definition-properties-adjustments-items-properties-target.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments/items/properties/target")

### target 類型

`string`

## changeType

調整的類型。

`changeType`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Learn Schema](definition-properties-adjustments-items-properties-changetype.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments/items/properties/changeType")

### changeType 類型

`string`

### changeType 約束

**枚舉**: 此屬性的值必須等於以下值之一:

| 值         | 說明 |
| :------------ | :---------- |
| `"parameter"` | 參數            |
| `"workflow"`  | 工作流            |
| `"tool"`      | 工具            |
| `"strategy"`  | 策略            |

## description

更改的說明。

`description`

* 可選

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Learn Schema](definition-properties-adjustments-items-properties-description.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments/items/properties/description")

### description 類型

`string`


## target 類型

`string`


## changeType 類型

`string`

## changeType 約束

**枚舉**: 此屬性的值必須等於以下值之一:

| 值         | 說明 |
| :------------ | :---------- |
| `"parameter"` | 參數            |
| `"workflow"`  | 工作流            |
| `"tool"`      | 工具            |
| `"strategy"`  | 策略            |


## description 類型

`string`


## knowledge 類型

`object` ([詳情](definition-properties-knowledge.md))


## timestamp 類型

`string`

## timestamp 約束

**日期時間**: 字符串必須是日期時間字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")
