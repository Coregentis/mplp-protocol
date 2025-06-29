## MPLP.Role Schema Type

`object` ([MPLP.Role Schema](definition.md))

# MPLP.Role Schema Properties

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                          |
| :-------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| [roleId](#roleid)                 | `string` | Required | cannot be null | [MPLP.Role Schema](definition-properties-roleid.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/roleId")                     |
| [name](#name)                     | `string` | Required | cannot be null | [MPLP.Role Schema](definition-properties-name.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/name")                         |
| [type](#type)                     | `string` | Required | cannot be null | [MPLP.Role Schema](definition-properties-type.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/type")                         |
| [description](#description)       | `string` | Required | cannot be null | [MPLP.Role Schema](definition-properties-description.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/description")           |
| [capabilities](#capabilities)     | `array`  | Required | cannot be null | [MPLP.Role Schema](definition-properties-capabilities.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/capabilities")         |
| [responsibilities](#responsibilities) | `array`  | Required | cannot be null | [MPLP.Role Schema](definition-properties-responsibilities.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/responsibilities") |
| [permissions](#permissions)       | `array`  | Required | cannot be null | [MPLP.Role Schema](definition-properties-permissions.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/permissions")           |
| [status](#status)                 | `string` | Required | cannot be null | [MPLP.Role Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/status")                     |
| [createdAt](#createdat)           | `string` | Required | cannot be null | [MPLP.Role Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/createdAt")               |
| [updatedAt](#updatedat)           | `string` | Required | cannot be null | [MPLP.Role Schema](definition-properties-updatedat.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/updatedAt")               |
| Additional Properties             | Any      | Optional | can be null    |                                                                                                                                                     |

## roleId

Unique identifier for the role.

`roleId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Role Schema](definition-properties-roleid.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/roleId")

### roleId Type

`string`

## name

Human-readable name of the role.

`name`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Role Schema](definition-properties-name.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/name")

### name Type

`string`

## type

Type of the role (e.g., 'agent', 'human', 'system').

`type`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Role Schema](definition-properties-type.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value      | Explanation |
| :--------- | :---------- |
| `"agent"`  |             |
| `"human"`  |             |
| `"system"` |             |

## description

Detailed description of the role's purpose and function.

`description`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Role Schema](definition-properties-description.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/description")

### description Type

`string`

## capabilities

List of capabilities that this role possesses.

`capabilities`

* is required

* Type: `string[]`

* cannot be null

* defined in: [MPLP.Role Schema](definition-properties-capabilities.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/capabilities")

### capabilities Type

`string[]`

## responsibilities

List of responsibilities assigned to this role.

`responsibilities`

* is required

* Type: `string[]`

* cannot be null

* defined in: [MPLP.Role Schema](definition-properties-responsibilities.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/responsibilities")

### responsibilities Type

`string[]`

## permissions

List of permissions granted to this role.

`permissions`

* is required

* Type: `string[]`

* cannot be null

* defined in: [MPLP.Role Schema](definition-properties-permissions.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/permissions")

### permissions Type

`string[]`

## status

Current status of the role.

`status`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Role Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/status")

### status Type

`string`

### status Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value        | Explanation |
| :----------- | :---------- |
| `"active"`   |             |
| `"inactive"` |             |
| `"pending"`  |             |

## createdAt

Timestamp when the role was created.

`createdAt`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Role Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/createdAt")

### createdAt Type

`string`

### createdAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## updatedAt

Timestamp when the role was last updated.

`updatedAt`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Role Schema](definition-properties-updatedat.md "https://coregentis.org/schemas/v1.0/Role.schema.json#/properties/updatedAt")

### updatedAt Type

`string`

### updatedAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")