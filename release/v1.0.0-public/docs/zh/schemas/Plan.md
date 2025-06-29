> **翻译状态: 已完成**
> **原文档**: Plan.md
> **最后更新**: 2025-06-28
> **翻译版本**: 1.0

---
version: 1.0
created: 2025-06-28T20:38:47+08:00
last_updated: 2025-06-28T20:38:47+08:00
maintainer: MPLP开发团队
applicable_scope: 多智能体项目生命周期协议
---

## MPLP.Plan Schema 类型

`object` ([MPLP.Plan Schema](definition.md))

# MPLP.Plan Schema 属性

| 属性                | 类型     | 必需 | 可为空       | 定义位置                                                                                                                          |
| :---------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| [planId](#planid)       | `string` | 必需 | 不可为空 | [MPLP.Plan Schema](definition-properties-planid.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/planId")       |
| [goal](#goal)           | `string` | 必需 | 不可为空 | [MPLP.Plan Schema](definition-properties-goal.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/goal")           |
| [createdAt](#createdat) | `string` | 必需 | 不可为空 | [MPLP.Plan Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/createdAt") |
| [tasks](#tasks)         | `array`  | 必需 | 不可为空 | [MPLP.Plan Schema](definition-properties-tasks.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks")         |
| 附加属性   | Any      | 可选 | 可为空    |                                                                                                                                     |

## planId

此计划实例的唯一标识符。

`planId`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Plan Schema](definition-properties-planid.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/planId")

### planId 类型

`string`

## goal

项目计划的主要目标或高级目标。

`goal`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Plan Schema](definition-properties-goal.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/goal")

### goal 类型

`string`

## createdAt

计划创建时的时间戳。

`createdAt`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Plan Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/createdAt")

### createdAt 类型

`string`

### createdAt 约束

**日期时间**: 字符串必须是日期时间字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看规范")

## tasks

计划中包含的结构化任务列表。

`tasks`

* 必需

* 类型: `object[]` ([详情](definition-properties-tasks-items.md))

* 不可为空

* 定义位置: [MPLP.Plan Schema](definition-properties-tasks.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks")

### tasks 类型

`object[]` ([详情](definition-properties-tasks-items.md))

## 附加属性

允许附加属性，不需要遵循特定的模式


## planId 类型

`string`


## goal 类型

`string`


## createdAt 类型

`string`

## createdAt 约束

**日期时间**: 字符串必须是日期时间字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看规范")


## tasks 类型

`object[]` ([详情](definition-properties-tasks-items.md))


## items 类型

`object` ([详情](definition-properties-tasks-items.md))

# items 属性

| 属性                        | 类型     | 必需 | 可为空       | 定义位置                                                                                                                                                                                |
| :------------------------------ | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [taskId](#taskid)               | `string` | 必需 | 不可为空 | [MPLP.Plan Schema](definition-properties-tasks-items-properties-taskid.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/taskId")               |
| [description](#description)     | `string` | 必需 | 不可为空 | [MPLP.Plan Schema](definition-properties-tasks-items-properties-description.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/description")     |
| [dsl](#dsl)                     | `string` | 必需 | 不可为空 | [MPLP.Plan Schema](definition-properties-tasks-items-properties-dsl.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/dsl")                     |
| [assignedAgent](#assignedagent) | `string` | 必需 | 不可为空 | [MPLP.Plan Schema](definition-properties-tasks-items-properties-assignedagent.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/assignedAgent") |
| [dependencies](#dependencies)   | `array`  | 可选 | 不可为空 | [MPLP.Plan Schema](definition-properties-tasks-items-properties-dependencies.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/dependencies")   |

## taskId

任务的唯一标识符。

`taskId`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Plan Schema](definition-properties-tasks-items-properties-taskid.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/taskId")

### taskId 类型

`string`

## description

任务的人类可读描述。

`description`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Plan Schema](definition-properties-tasks-items-properties-description.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/description")

### description 类型

`string`

## dsl

用于指定任务逻辑的领域特定语言（DSL）。

`dsl`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Plan Schema](definition-properties-tasks-items-properties-dsl.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/dsl")

### dsl 类型

`string`

## assignedAgent

分配执行此任务的智能体ID。

`assignedAgent`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Plan Schema](definition-properties-tasks-items-properties-assignedagent.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/assignedAgent")

### assignedAgent 类型

`string`

## dependencies

此任务依赖的任务ID列表。

`dependencies`

* 可选

* 类型: `string[]`

* 不可为空

* 定义位置: [MPLP.Plan Schema](definition-properties-tasks-items-properties-dependencies.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/dependencies")

### dependencies 类型

`string[]`


## taskId 类型

`string`


## description 类型

`string`


## dsl 类型

`string`


## assignedAgent 类型

`string`


## dependencies 类型

`string[]`


## items 类型

`string`
