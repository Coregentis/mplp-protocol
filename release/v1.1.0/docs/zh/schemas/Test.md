> **翻译状态: 已完成**
> **原文档**: Test.md
> **最后更新**: 2025-06-28
> **翻译版本**: 1.0

---
version: 1.0
created: 2025-06-28T20:38:47+08:00
last_updated: 2025-06-28T20:38:47+08:00
maintainer: MPLP開發團隊
applicable_scope: 多智能體項目生命週期協議
---

## MPLP.Test Schema 類型

`object` ([MPLP.Test Schema](definition.md))

# MPLP.Test Schema 屬性

| 屬性                            | 類型     | 必需 | 可為空       | 定義位置                                                                                                                                      |
| :---------------------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| [testId](#testid)                   | `string` | 必需 | 不可為空 | [MPLP.Test Schema](definition-properties-testid.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/testId")                   |
| [relatedTaskId](#relatedtaskid)     | `string` | 必需 | 不可為空 | [MPLP.Test Schema](definition-properties-relatedtaskid.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/relatedTaskId")     |
| [input](#input)                     | `object` | 必需 | 不可為空 | [MPLP.Test Schema](definition-properties-input.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/input")                     |
| [expectedOutput](#expectedoutput)   | `object` | 必需 | 不可為空 | [MPLP.Test Schema](definition-properties-expectedoutput.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/expectedOutput")   |
| [testType](#testtype)               | `string` | 必需 | 不可為空 | [MPLP.Test Schema](definition-properties-testtype.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/testType")               |
| [executionStatus](#executionstatus) | `string` | 可選 | 不可為空 | [MPLP.Test Schema](definition-properties-executionstatus.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/executionStatus") |
| [result](#result)                   | `object` | 可選 | 不可為空 | [MPLP.Test Schema](definition-properties-result.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/result")                   |
| [errorMessage](#errormessage)       | `string` | 可選 | 不可為空 | [MPLP.Test Schema](definition-properties-errormessage.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/errorMessage")       |
| [timestamp](#timestamp)             | `string` | 可選 | 不可為空 | [MPLP.Test Schema](definition-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/timestamp")             |
| 附加屬性               | Any      | 可選 | 可為空    |                                                                                                                                                 |

## testId

測試案例的唯一標識符。

`testId`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Test Schema](definition-properties-testid.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/testId")

### testId 類型

`string`

## relatedTaskId

對正在測試的任務或DSL節點的引用。

`relatedTaskId`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Test Schema](definition-properties-relatedtaskid.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/relatedTaskId")

### relatedTaskId 類型

`string`

## input

測試案例的輸入數據。

`input`

* 必需

* 類型: `object` ([詳情](definition-properties-input.md))

* 不可為空

* 定義位置: [MPLP.Test Schema](definition-properties-input.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/input")

### input 類型

`object` ([詳情](definition-properties-input.md))

## expectedOutput

用於驗證的預期輸出數據。

`expectedOutput`

* 必需

* 類型: `object` ([詳情](definition-properties-expectedoutput.md))

* 不可為空

* 定義位置: [MPLP.Test Schema](definition-properties-expectedoutput.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/expectedOutput")

### expectedOutput 類型

`object` ([詳情](definition-properties-expectedoutput.md))

## testType

正在進行的測試類型。

`testType`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Test Schema](definition-properties-testtype.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/testType")

### testType 類型

`string`

### testType 約束

**枚舉**: 此屬性的值必須等於以下值之一：

| 值                 | 說明 |
| :-------------------- | :---------- |
| `"unit"`              | 單元測試            |
| `"integration"`       | 整合測試            |
| `"regression"`        | 回歸測試            |
| `"schema_validation"` | 模式驗證            |

## executionStatus

測試執行的狀態。

`executionStatus`

* 可選

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Test Schema](definition-properties-executionstatus.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/executionStatus")

### executionStatus 類型

`string`

### executionStatus 約束

**枚舉**: 此屬性的值必須等於以下值之一：

| 值       | 說明 |
| :---------- | :---------- |
| `"pending"` | 待定            |
| `"running"` | 執行中            |
| `"passed"`  | 通過            |
| `"failed"`  | 失敗            |

## result

在測試執行期間捕獲的實際結果。

`result`

* 可選

* 類型: `object` ([詳情](definition-properties-result.md))

* 不可為空

* 定義位置: [MPLP.Test Schema](definition-properties-result.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/result")

### result 類型

`object` ([詳情](definition-properties-result.md))

## errorMessage

測試失敗時的可選錯誤訊息。

`errorMessage`

* 可選

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Test Schema](definition-properties-errormessage.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/errorMessage")

### errorMessage 類型

`string`

## timestamp

測試執行或完成的時間。

`timestamp`

* 可選

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Test Schema](definition-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/timestamp")

### timestamp 類型

`string`

### timestamp 約束

**日期時間**: 字符串必須是日期時間字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")

## 附加屬性

允許附加屬性，不需要遵循特定的模式


## testId 類型

`string`


## relatedTaskId 類型

`string`


## input 類型

`object` ([詳情](definition-properties-input.md))

# input 屬性

| 屬性              | 類型 | 必需 | 可為空    | 定義位置 |
| :-------------------- | :--- | :------- | :---------- | :--------- |
| 附加屬性 | Any  | 可選 | 可為空 |            |

## 附加屬性

允許附加屬性，不需要遵循特定的模式


## expectedOutput 類型

`object` ([詳情](definition-properties-expectedoutput.md))

# expectedOutput 屬性

| 屬性              | 類型 | 必需 | 可為空    | 定義位置 |
| :-------------------- | :--- | :------- | :---------- | :--------- |
| 附加屬性 | Any  | 可選 | 可為空 |            |

## 附加屬性

允許附加屬性，不需要遵循特定的模式


## testType 類型

`string`

## testType 約束

**枚舉**: 此屬性的值必須等於以下值之一：

| 值                 | 說明 |
| :-------------------- | :---------- |
| `"unit"`              | 單元測試            |
| `"integration"`       | 整合測試            |
| `"regression"`        | 回歸測試            |
| `"schema_validation"` | 模式驗證            |


## executionStatus 類型

`string`

## executionStatus 約束

**枚舉**: 此屬性的值必須等於以下值之一：

| 值       | 說明 |
| :---------- | :---------- |
| `"pending"` | 待定            |
| `"running"` | 執行中            |
| `"passed"`  | 通過            |
| `"failed"`  | 失敗            |


## result 類型

`object` ([詳情](definition-properties-result.md))

# result 屬性

| 屬性              | 類型 | 必需 | 可為空    | 定義位置 |
| :-------------------- | :--- | :------- | :---------- | :--------- |
| 附加屬性 | Any  | 可選 | 可為空 |            |

## 附加屬性

允許附加屬性，不需要遵循特定的模式


## errorMessage 類型

`string`


## timestamp 類型

`string`

## timestamp 約束

**日期時間**: 字符串必須是日期時間字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")
