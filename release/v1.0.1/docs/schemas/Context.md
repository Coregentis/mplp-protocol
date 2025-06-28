---
version: v1.0.0
status: frozen
releaseDate: 2025-06-28
source: MPLP
license: MIT
---

# Context Schema Documentation

## MPLP.Context Schema Type

`object` ([MPLP.Context Schema](definition.md))

# MPLP.Context Schema Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                                                                                    |
| :-------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| [contextId](#contextid)     | `string` | Required | cannot be null | [MPLP.Context Schema](definition-properties-contextid.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/contextId")     |
| [projectName](#projectname) | `string` | Required | cannot be null | [MPLP.Context Schema](definition-properties-projectname.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/projectName") |
| [createdAt](#createdat)     | `string` | Required | cannot be null | [MPLP.Context Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/createdAt")     |
| [agentStates](#agentstates) | `array`  | Required | cannot be null | [MPLP.Context Schema](definition-properties-agentstates.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates") |
| [memory](#memory)           | `object` | Optional | cannot be null | [MPLP.Context Schema](definition-properties-memory.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/memory")           |
| Additional Properties       | Any      | Optional | can be null    |                                                                                                                                               |

## contextId

A unique identifier for this context instance.

`contextId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Context Schema](definition-properties-contextid.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/contextId")

### contextId Type

`string`

## projectName

The name of the project associated with this context.

`projectName`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Context Schema](definition-properties-projectname.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/projectName")

### projectName Type

`string`

## createdAt

Timestamp when the context was initialized.

`createdAt`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Context Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/createdAt")

### createdAt Type

`string`

### createdAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## agentStates

List of agent states active in the current context.

`agentStates`

* is required

* Type: `object[]` ([Details](definition-properties-agentstates-items.md))

* cannot be null

* defined in: [MPLP.Context Schema](definition-properties-agentstates.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates")

### agentStates Type

`object[]` ([Details](definition-properties-agentstates-items.md))

## memory

Arbitrary shared memory or key-value data store.

`memory`

* is optional

* Type: `object` ([Details](definition-properties-memory.md))

* cannot be null

* defined in: [MPLP.Context Schema](definition-properties-memory.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/memory")

### memory Type

`object` ([Details](definition-properties-memory.md))

## Additional Properties

Additional properties are allowed and do not have to follow a specific schema


## contextId Type

`string`


## projectName Type

`string`


## createdAt Type

`string`

## createdAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")


## agentStates Type

`object[]` ([Details](definition-properties-agentstates-items.md))


## items Type

`object` ([Details](definition-properties-agentstates-items.md))

# items Properties

| Property            | Type     | Required | Nullable       | Defined by                                                                                                                                                                                      |
| :------------------ | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [agentId](#agentid) | `string` | Required | cannot be null | [MPLP.Context Schema](definition-properties-agentstates-items-properties-agentid.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates/items/properties/agentId") |
| [role](#role)       | `string` | Required | cannot be null | [MPLP.Context Schema](definition-properties-agentstates-items-properties-role.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates/items/properties/role")       |
| [status](#status)   | `string` | Required | cannot be null | [MPLP.Context Schema](definition-properties-agentstates-items-properties-status.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates/items/properties/status")   |

## agentId

Unique identifier of the agent.

`agentId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Context Schema](definition-properties-agentstates-items-properties-agentid.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates/items/properties/agentId")

### agentId Type

`string`

## role

Role of the agent in the project.

`role`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Context Schema](definition-properties-agentstates-items-properties-role.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates/items/properties/role")

### role Type

`string`

## status

Current operational status of the agent.

`status`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Context Schema](definition-properties-agentstates-items-properties-status.md "https://coregentis.org/schemas/v1.0/Context.schema.json#/properties/agentStates/items/properties/status")

### status Type

`string`

### status Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | :---------- |
| `"idle"`      |             |
| `"active"`    |             |
| `"error"`     |             |
| `"completed"` |             |


## agentId Type

`string`


## role Type

`string`


## status Type

`string`

## status Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | :---------- |
| `"idle"`      |             |
| `"active"`    |             |
| `"error"`     |             |
| `"completed"` |             |


## memory Type

`object` ([Details](definition-properties-memory.md))

# memory Properties

| Property              | Type | Required | Nullable    | Defined by |
| :-------------------- | :--- | :------- | :---------- | :--------- |
| Additional Properties | Any  | Optional | can be null |            |

## Additional Properties

Additional properties are allowed and do not have to follow a specific schema
