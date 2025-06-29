> **翻譯狀態: 已完成**
> **原文檔**: Execute.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

---
version: 1.0
created: 2025-06-28T20:38:47+08:00
last_updated: 2025-06-28T20:38:47+08:00
maintainer: MPLP開發團隊
applicable_scope: 多智能體項目生命週期協議
---

## MPLP.Execute Schema 類型

`object` ([MPLP.Execute Schema](definition.md))

# MPLP.Execute Schema 屬性

| 屬性                          | 類型     | 必需 | 可為空       | 定義位置                                                                                                                                          |
| :-------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| [executionId](#executionid)       | `string` | 必需 | 不可為空 | [MPLP.Execute Schema](definition-properties-executionid.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/executionId") |
| [taskId](#taskid)                 | `string` | 必需 | 不可為空 | [MPLP.Execute Schema](definition-properties-taskid.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/taskId")           |
| [agentId](#agentid)               | `string` | 必需 | 不可為空 | [MPLP.Execute Schema](definition-properties-agentid.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/agentId")         |
| [startTime](#starttime)           | `string` | 必需 | 不可為空 | [MPLP.Execute Schema](definition-properties-starttime.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/startTime")     |
| [endTime](#endtime)               | `string` | 可選 | 不可為空 | [MPLP.Execute Schema](definition-properties-endtime.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/endTime")         |
| [status](#status)                 | `string` | 必需 | 不可為空 | [MPLP.Execute Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/status")           |
| [input](#input)                   | `object` | 必需 | 不可為空 | [MPLP.Execute Schema](definition-properties-input.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/input")             |
| [output](#output)                 | `object` | 可選 | 不可為空 | [MPLP.Execute Schema](definition-properties-output.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/output")           |
| [tool](#tool)                     | `object` | 必需 | 不可為空 | [MPLP.Execute Schema](definition-properties-tool.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool")               |
| [error](#error)                   | `string` | 可選 | 不可為空 | [MPLP.Execute Schema](definition-properties-error.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/error")             |
| 附加屬性             | Any      | 可選 | 可為空    |                                                                                                                                                     |

## executionId

執行實例的唯一標識符。

`executionId`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-executionid.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/executionId")

### executionId 類型

`string`

## taskId

正在執行的任務的引用。

`taskId`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-taskid.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/taskId")

### taskId 類型

`string`

## agentId

執行任務的智能體標識符。

`agentId`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-agentid.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/agentId")

### agentId 類型

`string`

## startTime

執行開始時間。

`startTime`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-starttime.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/startTime")

### startTime 類型

`string`

### startTime 約束

**日期時間**: 字符串必須是日期時間字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")

## endTime

執行結束時間。

`endTime`

* 可選

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-endtime.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/endTime")

### endTime 類型

`string`

### endTime 約束

**日期時間**: 字符串必須是日期時間字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")

## status

執行的當前狀態。

`status`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/status")

### status 類型

`string`

### status 約束

**枚舉**: 此屬性的值必須等於以下值之一:

| 值        | 說明 |
| :----------- | :---------- |
| `"pending"` | 待處理            |
| `"running"` | 運行中            |
| `"success"` | 成功            |
| `"failed"`  | 失敗            |

## input

任務的標準化輸入數據。

`input`

* 必需

* 類型: `object` ([詳情](definition-properties-input.md))

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-input.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/input")

### input 類型

`object` ([詳情](definition-properties-input.md))

## output

執行產生的結果輸出數據。

`output`

* 可選

* 類型: `object` ([詳情](definition-properties-output.md))

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-output.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/output")

### output 類型

`object` ([詳情](definition-properties-output.md))

## tool

執行期間使用的工具或API。

`tool`

* 必需

* 類型: `object` ([詳情](definition-properties-tool.md))

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-tool.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool")

### tool 類型

`object` ([詳情](definition-properties-tool.md))

## error

執行失敗時的可選錯誤消息。

`error`

* 可選

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-error.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/error")

### error 類型

`string`

## 附加屬性

允許附加屬性，不需要遵循特定的模式


## executionId 類型

`string`


## taskId 類型

`string`


## agentId 類型

`string`


## startTime 類型

`string`

## startTime 約束

**日期時間**: 字符串必須是日期時間字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")


## endTime 類型

`string`

## endTime 約束

**日期時間**: 字符串必須是日期時間字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")


## status 類型

`string`

## status 約束

**枚舉**: 此屬性的值必須等於以下值之一:

| 值        | 說明 |
| :----------- | :---------- |
| `"pending"` | 待處理            |
| `"running"` | 運行中            |
| `"success"` | 成功            |
| `"failed"`  | 失敗            |


## input 類型

`object` ([詳情](definition-properties-input.md))


## output 類型

`object` ([詳情](definition-properties-output.md))


## tool 類型

`object` ([詳情](definition-properties-tool.md))

# tool 屬性

| 屬性                | 類型     | 必需 | 可為空       | 定義位置                                                                                                                                                                                |
| :---------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [name](#name)           | `string` | 必需 | 不可為空 | [MPLP.Execute Schema](definition-properties-tool-properties-name.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool/properties/name")         |
| [version](#version)     | `string` | 可選 | 不可為空 | [MPLP.Execute Schema](definition-properties-tool-properties-version.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool/properties/version")   |
| [endpoint](#endpoint)   | `string` | 可選 | 不可為空 | [MPLP.Execute Schema](definition-properties-tool-properties-endpoint.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool/properties/endpoint") |

## name

工具/API的名稱。

`name`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-tool-properties-name.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool/properties/name")

### name 類型

`string`

## version

工具/API版本。

`version`

* 可選

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-tool-properties-version.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool/properties/version")

### version 類型

`string`

## endpoint

API端點或函數引用。

`endpoint`

* 可選

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Execute Schema](definition-properties-tool-properties-endpoint.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool/properties/endpoint")

### endpoint 類型

`string`


## name 類型

`string`


## version 類型

`string`


## endpoint 類型

`string`


## error 類型

`string`
