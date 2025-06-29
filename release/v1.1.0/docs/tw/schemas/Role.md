> **翻譯狀態: 已完成**
> **原文檔**: Role.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

---
version: 1.0
created: 2025-06-28T20:38:47+08:00
last_updated: 2025-06-28T20:38:47+08:00
maintainer: MPLP開發團隊
applicable_scope: 多智能體項目生命週期協議
---

## MPLP.Role Schema 類型

`object` ([MPLP.Role Schema](definition.md))

# MPLP.Role Schema 屬性

| 屬性                          | 類型     | 必需 | 可為空       | 定義位置                                                                                                                                          |
| :-------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| [roleId](#roleid)                 | `string` | 必需 | 不可為空 | [MPLP.Role Schema](definition-properties-roleid.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/roleId")                     |
| [name](#name)                     | `string` | 必需 | 不可為空 | [MPLP.Role Schema](definition-properties-name.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/name")                         |
| [type](#type)                     | `string` | 必需 | 不可為空 | [MPLP.Role Schema](definition-properties-type.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/type")                         |
| [description](#description)       | `string` | 必需 | 不可為空 | [MPLP.Role Schema](definition-properties-description.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/description")           |
| [capabilities](#capabilities)     | `array`  | 必需 | 不可為空 | [MPLP.Role Schema](definition-properties-capabilities.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/capabilities")         |
| [responsibilities](#responsibilities) | `array`  | 必需 | 不可為空 | [MPLP.Role Schema](definition-properties-responsibilities.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/responsibilities") |
| [permissions](#permissions)       | `array`  | 必需 | 不可為空 | [MPLP.Role Schema](definition-properties-permissions.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/permissions")           |
| [status](#status)                 | `string` | 必需 | 不可為空 | [MPLP.Role Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/status")                     |
| [createdAt](#createdat)           | `string` | 必需 | 不可為空 | [MPLP.Role Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/createdAt")               |
| [updatedAt](#updatedat)           | `string` | 必需 | 不可為空 | [MPLP.Role Schema](definition-properties-updatedat.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/updatedAt")               |
| 附加屬性             | Any      | 可選 | 可為空    |                                                                                                                                                     |

## roleId

角色的唯一標識符。

`roleId`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Role Schema](definition-properties-roleid.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/roleId")

### roleId 類型

`string`

## name

角色的人類可讀名稱。

`name`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Role Schema](definition-properties-name.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/name")

### name 類型

`string`

## type

角色的類型（例如：'agent'、'human'、'system'）。

`type`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Role Schema](definition-properties-type.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/type")

### type 類型

`string`

### type 約束

**枚舉**: 此屬性的值必須等於以下值之一：

| 值      | 說明 |
| :--------- | :---------- |
| `"agent"`  | 智能體            |
| `"human"`  | 人類            |
| `"system"` | 系統            |

## description

角色目的和功能的詳細描述。

`description`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Role Schema](definition-properties-description.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/description")

### description 類型

`string`

## capabilities

此角色擁有的能力列表。

`capabilities`

* 必需

* 類型: `string[]`

* 不可為空

* 定義位置: [MPLP.Role Schema](definition-properties-capabilities.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/capabilities")

### capabilities 類型

`string[]`

## responsibilities

分配給此角色的職責列表。

`responsibilities`

* 必需

* 類型: `string[]`

* 不可為空

* 定義位置: [MPLP.Role Schema](definition-properties-responsibilities.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/responsibilities")

### responsibilities 類型

`string[]`

## permissions

授予此角色的權限列表。

`permissions`

* 必需

* 類型: `string[]`

* 不可為空

* 定義位置: [MPLP.Role Schema](definition-properties-permissions.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/permissions")

### permissions 類型

`string[]`

## status

角色的當前狀態。

`status`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Role Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/status")

### status 類型

`string`

### status 約束

**枚舉**: 此屬性的值必須等於以下值之一：

| 值        | 說明 |
| :----------- | :---------- |
| `"active"`   | 活躍            |
| `"inactive"` | 非活躍            |
| `"pending"`  | 待定            |

## createdAt

角色創建時的時間戳。

`createdAt`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Role Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/createdAt")

### createdAt 類型

`string`

### createdAt 約束

**日期時間**: 字符串必須是日期時間字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")

## updatedAt

角色最後更新時的時間戳。

`updatedAt`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Role Schema](definition-properties-updatedat.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/updatedAt")

### updatedAt 類型

`string`

### updatedAt 約束

**日期時間**: 字符串必須是日期時間字符串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")