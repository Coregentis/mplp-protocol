---
title: MPLP.Plan Schema
version: 1.0
created: 2025-06-28 20:38:47 UTC+8
last_updated: 2025-06-28 20:38:47 UTC+8
maintainer: MPLP Development Team
scope: Multi-Agent Project Lifecycle Protocol
---

# MPLP.Plan Schema

## MPLP.Plan Schema 類型

`object` ([MPLP.Plan Schema](definition.md))

# MPLP.Plan Schema 屬性

| 屬性                    | 類型     | 必需     | 可為空         | 定義位置                                                                                                                          |
| :---------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| [planId](#planid)       | `string` | 必需     | 不可為空       | [MPLP.Plan Schema](definition-properties-planid.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/planId")       |
| [goal](#goal)           | `string` | 必需     | 不可為空       | [MPLP.Plan Schema](definition-properties-goal.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/goal")           |
| [createdAt](#createdat) | `string` | 必需     | 不可為空       | [MPLP.Plan Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/createdAt") |
| [tasks](#tasks)         | `array`  | 必需     | 不可為空       | [MPLP.Plan Schema](definition-properties-tasks.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks")         |
| 額外屬性                | Any      | 可選     | 可為空         |                                                                                                                                     |

## planId

此計劃實例的唯一識別符。

`planId`

* 必需

* 類型：`string`

* 不可為空

* 定義位置：[MPLP.Plan Schema](definition-properties-planid.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/planId")

### planId 類型

`string`

## goal

項目計劃的主要目標或高層次目標。

`goal`

* 必需

* 類型：`string`

* 不可為空

* 定義位置：[MPLP.Plan Schema](definition-properties-goal.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/goal")

### goal 類型

`string`

## createdAt

計劃創建時的時間戳。

`createdAt`

* 必需

* 類型：`string`

* 不可為空

* 定義位置：[MPLP.Plan Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/createdAt")

### createdAt 類型

`string`

### createdAt 約束

**日期時間**：字符串必須是日期時間字符串，根據 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")

## tasks

計劃中包含的結構化任務列表。

`tasks`

* 必需

* 類型：`object[]` ([詳細信息](definition-properties-tasks-items.md))

* 不可為空

* 定義位置：[MPLP.Plan Schema](definition-properties-tasks.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks")

### tasks 類型

`object[]` ([詳細信息](definition-properties-tasks-items.md))

## 額外屬性

允許額外屬性，不需要遵循特定的模式

# tasks 項目屬性

| 屬性                        | 類型     | 必需     | 可為空         | 定義位置                                                                                                                                                                                |
| :------------------------------ | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [taskId](#taskid)               | `string` | 必需     | 不可為空       | [MPLP.Plan Schema](definition-properties-tasks-items-properties-taskid.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/taskId")               |
| [description](#description)     | `string` | 必需     | 不可為空       | [MPLP.Plan Schema](definition-properties-tasks-items-properties-description.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/description")     |
| [dsl](#dsl)                     | `string` | 必需     | 不可為空       | [MPLP.Plan Schema](definition-properties-tasks-items-properties-dsl.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/dsl")                     |
| [assignedAgent](#assignedagent) | `string` | 必需     | 不可為空       | [MPLP.Plan Schema](definition-properties-tasks-items-properties-assignedagent.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/assignedAgent") |
| [dependencies](#dependencies)   | `array`  | 可選     | 不可為空       | [MPLP.Plan Schema](definition-properties-tasks-items-properties-dependencies.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/dependencies")   |

## taskId

任務的唯一識別符。

`taskId`

* 必需

* 類型：`string`

* 不可為空

* 定義位置：[MPLP.Plan Schema](definition-properties-tasks-items-properties-taskid.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/taskId")

### taskId 類型

`string`

## description

任務的人類可讀描述。

`description`

* 必需

* 類型：`string`

* 不可為空

* 定義位置：[MPLP.Plan Schema](definition-properties-tasks-items-properties-description.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/description")

### description 類型

`string`

## dsl

用於指定任務邏輯的領域特定語言（DSL）。

`dsl`

* 必需

* 類型：`string`

* 不可為空

* 定義位置：[MPLP.Plan Schema](definition-properties-tasks-items-properties-dsl.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/dsl")

### dsl 類型

`string`

## assignedAgent

分配執行此任務的代理ID。

`assignedAgent`

* 必需

* 類型：`string`

* 不可為空

* 定義位置：[MPLP.Plan Schema](definition-properties-tasks-items-properties-assignedagent.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/assignedAgent")

### assignedAgent 類型

`string`

## dependencies

此任務依賴的任務ID列表。

`dependencies`

* 可選

* 類型：`string[]`

* 不可為空

* 定義位置：[MPLP.Plan Schema](definition-properties-tasks-items-properties-dependencies.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/dependencies")

### dependencies 類型

`string[]`
