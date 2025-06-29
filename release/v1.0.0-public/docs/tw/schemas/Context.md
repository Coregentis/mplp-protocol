> **翻譯狀態: 已完成**
> **原文檔**: Context.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

---
version: 1.0
created: 2025-06-28T20:38:47+08:00
last_updated: 2025-06-28T20:38:47+08:00
maintainer: MPLP 開發團隊
applicable_scope: 多代理專案生命週期協議
---

## MPLP.Context 架構類型

`object` ([MPLP.Context 架構](definition.md))

# MPLP.Context 架構屬性

| 屬性                    | 類型     | 必需 | 可為空       | 定義位置                                                                                                                                    |
| :-------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| [contextId](#contextid)     | `string` | 必需 | 不可為空 | [MPLP.Context 架構](definition-properties-contextid.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/contextId")     |
| [projectName](#projectname) | `string` | 必需 | 不可為空 | [MPLP.Context 架構](definition-properties-projectname.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/projectName") |
| [createdAt](#createdat)     | `string` | 必需 | 不可為空 | [MPLP.Context 架構](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/createdAt")     |
| [agentStates](#agentstates) | `array`  | 必需 | 不可為空 | [MPLP.Context 架構](definition-properties-agentstates.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates") |
| [memory](#memory)           | `object` | 可選 | 不可為空 | [MPLP.Context 架構](definition-properties-memory.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/memory")           |
| 附加屬性       | Any      | 可選 | 可為空    |                                                                                                                                               |

## contextId

此上下文實例的唯一識別符。

`contextId`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Context 架構](definition-properties-contextid.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/contextId")

### contextId 類型

`string`

## projectName

與此上下文關聯的專案名稱。

`projectName`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Context 架構](definition-properties-projectname.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/projectName")

### projectName 類型

`string`

## createdAt

上下文初始化時的時間戳記。

`createdAt`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Context 架構](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/createdAt")

### createdAt 類型

`string`

### createdAt 約束

**日期時間**: 字串必須是日期時間字串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")

## agentStates

當前上下文中活躍的代理狀態列表。

`agentStates`

* 必需

* 類型: `object[]` ([詳情](definition-properties-agentstates-items.md))

* 不可為空

* 定義位置: [MPLP.Context 架構](definition-properties-agentstates.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates")

### agentStates 類型

`object[]` ([詳情](definition-properties-agentstates-items.md))

## memory

任意共享記憶體或鍵值資料儲存。

`memory`

* 可選

* 類型: `object` ([詳情](definition-properties-memory.md))

* 不可為空

* 定義位置: [MPLP.Context 架構](definition-properties-memory.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/memory")

### memory 類型

`object` ([詳情](definition-properties-memory.md))

## 附加屬性

允許附加屬性，不需要遵循特定的模式


## contextId 類型

`string`


## projectName 類型

`string`


## createdAt 類型

`string`

## createdAt 約束

**日期時間**: 字串必須是日期時間字串，符合 [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "查看規範")


## agentStates 類型

`object[]` ([詳情](definition-properties-agentstates-items.md))


## items 類型

`object` ([詳情](definition-properties-agentstates-items.md))


| 屬性            | 類型     | 必需 | 可為空       | 定義位置                                                                                                                                                                                      |
| :------------------ | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [agentId](#agentid) | `string` | 必需 | 不可為空 | [MPLP.Context 架構](definition-properties-agentstates-items-properties-agentid.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates/items/properties/agentId") |
| [role](#role)       | `string` | 必需 | 不可為空 | [MPLP.Context 架構](definition-properties-agentstates-items-properties-role.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates/items/properties/role")       |
| [status](#status)   | `string` | 必需 | 不可為空 | [MPLP.Context 架構](definition-properties-agentstates-items-properties-status.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates/items/properties/status")   |

## agentId

代理的唯一識別符。

`agentId`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Context 架構](definition-properties-agentstates-items-properties-agentid.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates/items/properties/agentId")

### agentId 類型

`string`

## 角色

代理在專案中的角色。

`role`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Context 架構](definition-properties-agentstates-items-properties-role.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates/items/properties/role")

### 角色 類型

`string`

## status

代理的當前運行狀態。

`status`

* 必需

* 類型: `string`

* 不可為空

* 定義位置: [MPLP.Context 架構](definition-properties-agentstates-items-properties-status.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates/items/properties/status")

### status 類型

`string`

### status 約束

**枚舉**: 此屬性的值必須等於以下值之一:

| 值         | 說明 |
| :------------ | :---------- |
| `"idle"`      | 閒置            |
| `"active"`    | 活躍            |
| `"error"`     | 錯誤            |
| `"completed"` | 已完成            |


## agentId 類型

`string`


## 角色 類型

`string`


## status 類型

`string`

## status 約束

**枚舉**: 此屬性的值必須等於以下值之一:

| 值         | 說明 |
| :------------ | :---------- |
| `"idle"`      | 閒置            |
| `"active"`    | 活躍            |
| `"error"`     | 錯誤            |
| `"completed"` | 已完成            |


## memory 類型

`object` ([詳情](definition-properties-memory.md))

# memory 屬性

| 屬性              | 類型 | 必需 | 可為空    | 定義位置 |
| :-------------------- | :--- | :------- | :---------- | :--------- |
| 附加屬性 | Any  | 可選 | 可為空 |            |

## 附加屬性

允許附加屬性，不需要遵循特定的模式
