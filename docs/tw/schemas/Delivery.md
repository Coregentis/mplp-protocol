> **翻譯狀態: 已完成**
> **原文檔**: Delivery.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

---
version: 1.0
created: 2025-06-28T20:38:47+08:00
last_updated: 2025-06-28T20:38:47+08:00
maintainer: MPLP开发团队
applicable_scope: 多智能体项目生命周期协议
---

## MPLP.Delivery Schema 类型

`object` ([MPLP.Delivery Schema](definition.md))

# MPLP.Delivery Schema 属性

| 属性                          | 类型     | 必需 | 可为空       | 定义位置                                                                                                                                          |
| :-------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deliveryId](#deliveryid)         | `string` | 必需 | 不可为空 | [MPLP.Delivery Schema](definition-properties-deliveryid.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/deliveryId")     |
| [name](#name)                     | `string` | 必需 | 不可为空 | [MPLP.Delivery Schema](definition-properties-name.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/name")                 |
| [type](#type)                     | `string` | 必需 | 不可为空 | [MPLP.Delivery Schema](definition-properties-type.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/type")                 |
| [description](#description)       | `string` | 必需 | 不可为空 | [MPLP.Delivery Schema](definition-properties-description.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/description")   |
| [artifacts](#artifacts)           | `array`  | 必需 | 不可为空 | [MPLP.Delivery Schema](definition-properties-artifacts.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/artifacts")       |
| [qualityMetrics](#qualitymetrics) | `object` | 必需 | 不可为空 | [MPLP.Delivery Schema](definition-properties-qualitymetrics.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/qualityMetrics") |
| [status](#status)                 | `string` | 必需 | 不可为空 | [MPLP.Delivery Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/status")             |
| [deliveredBy](#deliveredby)       | `string` | 必需 | 不可为空 | [MPLP.Delivery Schema](definition-properties-deliveredby.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/deliveredBy")   |
| [deliveredAt](#deliveredat)       | `string` | 必需 | 不可为空 | [MPLP.Delivery Schema](definition-properties-deliveredat.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/deliveredAt")   |
| [createdAt](#createdat)           | `string` | 必需 | 不可为空 | [MPLP.Delivery Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/createdAt")       |
| [updatedAt](#updatedat)           | `string` | 必需 | 不可为空 | [MPLP.Delivery Schema](definition-properties-updatedat.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/updatedAt")       |
| 附加属性             | Any      | 可选 | 可为空    |                                                                                                                                                     |

## deliveryId

交付的唯一标识符。

`deliveryId`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Delivery Schema](definition-properties-deliveryid.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/deliveryId")

### deliveryId 类型

`string`

## name

交付的人类可读名称。

`name`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Delivery Schema](definition-properties-name.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/name")

### name 类型

`string`

## type

交付的类型（例如：'code'、'documentation'、'artifact'）。

`type`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Delivery Schema](definition-properties-type.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/type")

### type 类型

`string`

### type 约束

**枚举**: 此属性的值必须等于以下值之一:

| 值             | 说明 |
| :---------------- | :---------- |
| `"code"`          | 代码            |
| `"documentation"` | 文档            |
| `"artifact"`      | 制品            |
| `"report"`        | 报告            |
| `"model"`         | 模型            |

## description

交付内容和目的的详细描述。

`description`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Delivery Schema](definition-properties-description.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/description")

### description 类型

`string`

## artifacts

此交付中包含的制品列表。

`artifacts`

* 必需

* 类型: `object[]` ([制品](definition-properties-artifacts-artifact.md))

* 不可为空

* 定义位置: [MPLP.Delivery Schema](definition-properties-artifacts.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/artifacts")

### artifacts 类型

`object[]` ([制品](definition-properties-artifacts-artifact.md))

## qualityMetrics

交付的质量指标和评估结果。

`qualityMetrics`

* 必需

* 类型: `object` ([质量指标](definition-properties-qualitymetrics.md))

* 不可为空

* 定义位置: [MPLP.Delivery Schema](definition-properties-qualitymetrics.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/qualityMetrics")

### qualityMetrics 类型

`object` ([质量指标](definition-properties-qualitymetrics.md))

## status

交付的当前状态。

`status`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Delivery Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/status")

### status 类型

`string`

### status 约束

**枚举**: 此属性的值必须等于以下值之一:

| 值        | 说明 |
| :----------- | :---------- |
| `"pending"`  | 待处理            |
| `"delivered"` | 已交付            |
| `"accepted"` | 已接受            |
| `"rejected"` | 已拒绝            |

## deliveredBy

交付此项目的智能体或实体的标识符。

`deliveredBy`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Delivery Schema](definition-properties-deliveredby.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/deliveredBy")

### deliveredBy 类型

`string`

## deliveredAt

交付完成时的时间戳。

`deliveredAt`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Delivery Schema](definition-properties-deliveredat.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/deliveredAt")

### deliveredAt 类型

`string`

### deliveredAt 约束

**日期时间**: 字符串必须是日期时间字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看规范")

## createdAt

交付创建时的时间戳。

`createdAt`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Delivery Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/createdAt")

### createdAt 类型

`string`

### createdAt 约束

**日期时间**: 字符串必须是日期时间字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看规范")

## updatedAt

交付最后更新时的时间戳。

`updatedAt`

* 必需

* 类型: `string`

* 不可为空

* 定义位置: [MPLP.Delivery Schema](definition-properties-updatedat.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/updatedAt")

### updatedAt 类型

`string`

### updatedAt 约束

**日期时间**: 字符串必须是日期时间字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看规范")