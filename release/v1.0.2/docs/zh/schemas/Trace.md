> **翻译状态: 已完成**
> **原文档**: Trace.md
> **最后更新**: 2025-06-28
> **翻译版本**: 1.0

---
version: "1.0.0"
created: "2025-06-28T20:35:44+08:00"
last_updated: "2025-06-28T20:35:44+08:00"
maintainer: "MPLP Development Team"
scope: "多智能体 项目 生命周期 Protocol - Trace Schema Documentation"
---

# MPLP.Trace Schema

`object` ([MPLP.Trace Schema](definition.md))

# MPLP.Trace Schema 属性

| 属性                            | 类型     | 必需     | 可为空         | 定义位置                                                                                                                                      |
| :------------------------------ | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| [traceId](#traceid)             | `string` | 必需     | 不可为空       | [MPLP.Trace Schema](definition-properties-traceid.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/traceId")             |
| [timestamp](#timestamp)         | `string` | 必需     | 不可为空       | [MPLP.Trace Schema](definition-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/timestamp")         |
| [source](#source)               | `string` | 必需     | 不可为空       | [MPLP.Trace Schema](definition-properties-source.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/source")               |
| [agentId](#agentid)             | `string` | 可选     | 不可为空       | [MPLP.Trace Schema](definition-properties-agentid.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/agentId")             |
| [eventType](#eventtype)         | `string` | 必需     | 不可为空       | [MPLP.Trace Schema](definition-properties-eventtype.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/eventType")         |
| [eventDetails](#eventdetails)   | `object` | 可选     | 不可为空       | [MPLP.Trace Schema](definition-properties-eventdetails.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/eventDetails")   |
| [relatedObject](#relatedobject) | `string` | 可选     | 不可为空       | [MPLP.Trace Schema](definition-properties-relatedobject.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/relatedObject") |
| [tags](#tags)                   | `array`  | 可选     | 不可为空       | [MPLP.Trace Schema](definition-properties-tags.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/tags")                   |
| 附加属性                        | Any      | 可选     | 可为空         |                                                                                                                                               |

## traceId

跟踪条目的唯一标识符。

`traceId`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Trace Schema](definition-properties-traceid.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/traceId")

### traceId 类型

`string`

## timestamp

事件记录的时间。

`timestamp`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Trace Schema](definition-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/timestamp")

### timestamp 类型

`string`

### timestamp 约束

**日期时间**: 字符串必须是日期时间字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看规范") 标准

## source

事件的来源（例如：Context、执行、学习、测试、外部API）。

`source`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Trace Schema](definition-properties-source.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/source")

### source 类型

`string`

## agentId

参与事件的可选智能体。

`agentId`

* 可选

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Trace Schema](definition-properties-agentid.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/agentId")

### agentId 类型

`string`

## eventType

正在记录的事件类型。

`eventType`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Trace Schema](definition-properties-eventtype.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/eventType")

### eventType 类型

`string`

### eventType 约束

**枚举**: 此属性的值必须等于以下值之一：

| 值                | 说明 |
| :---------------- | :--- |
| `"state_change"`  |      |
| `"action"`        |      |
| `"error"`         |      |
| `"message"`       |      |
| `"confirmation"`  |      |
| `"execution_log"` |      |
| `"external_call"` |      |

## eventDetails

关于事件的结构化详细信息。

`eventDetails`

* 可选

* 类型: `object` ([详细信息](definition-properties-eventdetails.md))

* 不可为空

* 定义位置: [MPLP.Trace Schema](definition-properties-eventdetails.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/eventDetails")

### eventDetails 类型

`object` ([详细信息](definition-properties-eventdetails.md))

## relatedObject

对关联对象的可选引用（例如：taskId、executionId、learningId）。

`relatedObject`

* 可选

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Trace Schema](definition-properties-relatedobject.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/relatedObject")

### relatedObject 类型

`string`

## tags

用于查询/过滤跟踪条目的可选标签。

`tags`

* 可选

* 类型: `string[]`

* 不可为空

* 定义位置: [MPLP.Trace Schema](definition-properties-tags.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/tags")

### tags 类型

`string[]`

## 附加属性

允许附加属性，不需要遵循特定的模式

## traceId 类型

`string`

## timestamp 类型

`string`

## timestamp 约束

**日期时间**: 字符串必须是日期时间字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看规范") 标准

## source 类型

`string`

## agentId 类型

`string`

## eventType 类型

`string`

## eventType 约束

**枚举**: 此属性的值必须等于以下值之一：

| 值                | 说明 |
| :---------------- | :--- |
| `"state_change"`  |      |
| `"action"`        |      |
| `"error"`         |      |
| `"message"`       |      |
| `"confirmation"`  |      |
| `"execution_log"` |      |
| `"external_call"` |      |

## eventDetails 类型

`object` ([详细信息](definition-properties-eventdetails.md))

# eventDetails 属性

| 属性              | 类型 | 必需 | 可为空      | 定义位置 |
| :---------------- | :--- | :--- | :---------- | :------- |
| 附加属性          | Any  | 可选 | 可为空      |          |

## 附加属性

允许附加属性，不需要遵循特定的模式

## relatedObject 类型

`string`

## tags 类型

`string[]`

## items 类型

`string`
