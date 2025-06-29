> **翻译状态: 已完成**
> **原文档**: Confirm.md
> **最后更新**: 2025-06-28
> **翻译版本**: 1.0

---
version: 1.0
created: 2025-06-28T20:38:47+08:00
last_updated: 2025-06-28T20:38:47+08:00
maintainer: MPLP开发团队
applicable_scope: 多智能体项目生命周期协议
---

## MPLP.Confirm Schema 类型

`object` ([MPLP.Confirm Schema](definition.md))

# MPLP.Confirm Schema 属性

| 属性                          | 类型     | 必需 | 可为空       | 定义位置                                                                                                                                          |
| :-------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| [confirmId](#confirmid)           | `string` | 必需 | 不可为空 | [MPLP.Confirm Schema](definition-properties-confirmid.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/confirmId")           |
| [planId](#planid)                 | `string` | 必需 | 不可为空 | [MPLP.Confirm Schema](definition-properties-planid.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/planId")                 |
| [confirmedBy](#confirmedby)       | `string` | 必需 | 不可为空 | [MPLP.Confirm Schema](definition-properties-confirmedby.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/confirmedBy")       |
| [confirmedAt](#confirmedat)       | `string` | 必需 | 不可为空 | [MPLP.Confirm Schema](definition-properties-confirmedat.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/confirmedAt")       |
| [approvalStages](#approvalstages) | `array`  | 必需 | 不可为空 | [MPLP.Confirm Schema](definition-properties-approvalstages.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages") |
| 附加属性             | Any      | 可选 | 可为空    |                                                                                                                                                     |

## confirmId

确认实例的唯一标识符。

`confirmId`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Confirm Schema](definition-properties-confirmid.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/confirmId")

### confirmId 类型

`string`

## planId

被确认的关联计划标识符。

`planId`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Confirm Schema](definition-properties-planid.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/planId")

### planId 类型

`string`

## confirmedBy

执行确认的用户或智能体。

`confirmedBy`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Confirm Schema](definition-properties-confirmedby.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/confirmedBy")

### confirmedBy 类型

`string`

## confirmedAt

确认的时间戳。

`confirmedAt`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Confirm Schema](definition-properties-confirmedat.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/confirmedAt")

### confirmedAt 类型

`string`

### confirmedAt 约束

**日期时间**: 字符串必须是日期时间字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看规范")

## approvalStages

确认流程的多阶段审批流。

`approvalStages`

* 必需

* 类型: `object[]` ([详情](definition-properties-approvalstages-items.md))

* 不可为空

* 定义位置: [MPLP.Confirm Schema](definition-properties-approvalstages.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages")

### approvalStages 类型

`object[]` ([详情](definition-properties-approvalstages-items.md))

## 附加属性

允许附加属性，不需要遵循特定的模式


## confirmId 类型

`string`


## planId 类型

`string`


## confirmedBy 类型

`string`


## confirmedAt 类型

`string`

## confirmedAt 约束

**日期时间**: 字符串必须是日期时间字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看规范")


## approvalStages 类型

`object[]` ([详情](definition-properties-approvalstages-items.md))


## items 类型

`object` ([详情](definition-properties-approvalstages-items.md))

# items 属性

| 属性                | 类型     | 必需 | 可为空       | 定义位置                                                                                                                                                                                                |
| :---------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [stageId](#stageid)     | `string` | 必需 | 不可为空 | [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-stageid.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/stageId")     |
| [approver](#approver)   | `string` | 必需 | 不可为空 | [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-approver.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/approver")   |
| [status](#status)       | `string` | 必需 | 不可为空 | [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-status.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/status")       |
| [comment](#comment)     | `string` | 可选 | 不可为空 | [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-comment.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/comment")     |
| [timestamp](#timestamp) | `string` | 可选 | 不可为空 | [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/timestamp") |

## stageId

审批阶段的标识符。

`stageId`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-stageid.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/stageId")

### stageId 类型

`string`

## approver

负责审批此阶段的用户或智能体。

`approver`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-approver.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/approver")

### approver 类型

`string`

## status

此阶段的状态。

`status`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-status.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/status")

### status 类型

`string`

### status 约束

**枚举**: 此属性的值必须等于以下值之一:

| 值        | 说明 |
| :----------- | :---------- |
| `"pending"`  | 待处理            |
| `"approved"` | 已批准            |
| `"rejected"` | 已拒绝            |

## comment

审批者的可选评论或反馈。

`comment`

* 可选

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-comment.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/comment")

### comment 类型

`string`

## timestamp

审批或拒绝的时间戳。

`timestamp`

* 可选

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/timestamp")

### timestamp 类型

`string`

### timestamp 约束

**日期时间**: 字符串必须是日期时间字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看规范")


## stageId 类型

`string`


## approver 类型

`string`


## status 类型

`string`

## status 约束

**枚举**: 此属性的值必须等于以下值之一:

| 值        | 说明 |
| :----------- | :---------- |
| `"pending"`  | 待处理            |
| `"approved"` | 已批准            |
| `"rejected"` | 已拒绝            |


## comment 类型

`string`


## timestamp 类型

`string`

## timestamp 约束

**日期时间**: 字符串必须是日期时间字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看规范")
