> **翻译状态: 已完成**
> **原文档**: Workflow.md
> **最后更新**: 2025-06-28
> **翻译版本**: 1.0

---
version: "1.0.0"
created: "2025-06-28T20:36:41+08:00"
last_updated: "2025-06-28T20:38:47+08:00"
maintainer: "MPLP 開發團隊"
scope: "多代理專案生命週期協議 - 工作流程架構文件"
---

# MPLP.Workflow 架構

`object` ([MPLP.Workflow 架構](definition.md))

# MPLP.Workflow 架構屬性

| 屬性                              | 類型     | 必需     | 可為空         | 定義位置                                                                                                                                          |
| :-------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| [workflowId](#workflowid)         | `string` | 必需     | 不可為空       | [MPLP.Workflow 架構](definition-properties-workflowid.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/workflowId")     |
| [name](#name)                     | `string` | 必需     | 不可為空       | [MPLP.Workflow 架構](definition-properties-name.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/name")                 |
| [description](#description)       | `string` | 必需     | 不可為空       | [MPLP.Workflow 架構](definition-properties-description.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/description")   |
| [stages](#stages)                 | `array`  | 必需     | 不可為空       | [MPLP.Workflow 架構](definition-properties-stages.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/stages")             |
| [dependencies](#dependencies)     | `array`  | 必需     | 不可為空       | [MPLP.Workflow 架構](definition-properties-dependencies.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/dependencies") |
| [triggers](#triggers)             | `array`  | 必需     | 不可為空       | [MPLP.Workflow 架構](definition-properties-triggers.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/triggers")         |
| [status](#status)                 | `string` | 必需     | 不可為空       | [MPLP.Workflow 架構](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/status")             |
| [createdAt](#createdat)           | `string` | 必需     | 不可為空       | [MPLP.Workflow 架構](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/createdAt")       |
| [updatedAt](#updatedat)           | `string` | 必需     | 不可為空       | [MPLP.Workflow 架構](definition-properties-updatedat.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/updatedAt")       |
| 附加屬性                          | Any      | 可選     | 可為空         |                                                                                                                                                     |

## workflowId

工作流程的唯一識別符。

`workflowId`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Workflow 架構](definition-properties-workflowid.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/workflowId")

### workflowId 類型

`string`

## name

工作流程的人類可讀名稱。

`name`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Workflow 架構](definition-properties-name.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/name")

### name 類型

`string`

## description

工作流程目的和過程的詳細描述。

`description`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Workflow 架構](definition-properties-description.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/description")

### description 類型

`string`

## stages

工作流程階段的有序列表。

`stages`

* 必需

* 類型: `object[]` ([階段](definition-properties-stages-stage.md))

* 不可為空

* 定義位置: [MPLP.Workflow 架構](definition-properties-stages.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/stages")

### stages 類型

`object[]` ([階段](definition-properties-stages-stage.md))

## dependencies

工作流程依賴關係及其關係的列表。

`dependencies`

* 必需

* 類型: `object[]` ([依賴關係](definition-properties-dependencies-dependency.md))

* 不可為空

* 定義位置: [MPLP.Workflow 架構](definition-properties-dependencies.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/dependencies")

### dependencies 類型

`object[]` ([依賴關係](definition-properties-dependencies-dependency.md))

## triggers

可以觸發此工作流程的事件列表。

`triggers`

* 必需

* 類型: `object[]` ([觸發器](definition-properties-triggers-trigger.md))

* 不可為空

* 定義位置: [MPLP.Workflow 架構](definition-properties-triggers.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/triggers")

### triggers 類型

`object[]` ([觸發器](definition-properties-triggers-trigger.md))

## status

工作流程的當前狀態。

`status`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Workflow 架構](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/status")

### status 類型

`string`

### status 約束

**枚舉**: 此屬性的值必須等於以下值之一：

| 值            | 說明 |
| :------------ | :--- |
| `"draft"`     |      |
| `"active"`    |      |
| `"paused"`    |      |
| `"completed"` |      |
| `"failed"`    |      |

## createdAt

工作流程建立時的時間戳記。

`createdAt`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Workflow 架構](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/createdAt")

### createdAt 類型

`string`

### createdAt 約束

**日期時間**: 字串必須是日期時間字串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範") 標準

## updatedAt

工作流程最後更新時的時間戳記。

`updatedAt`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Workflow 架構](definition-properties-updatedat.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/updatedAt")

### updatedAt 類型

`string`

### updatedAt 約束

**日期時間**: 字串必須是日期時間字串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範") 標準