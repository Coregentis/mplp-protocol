---
version: v1.0.0
status: frozen
releaseDate: 2025-06-28
source: MPLP
license: MIT
---
<!-- JP Translation Placeholder -->

## MPLP.Confirm Schema Type

`object` ([MPLP.Confirm Schema](definition.md))

# MPLP.Confirm Schema Properties

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                          |
| :-------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| [confirmId](#confirmid)           | `string` | Required | cannot be null | [MPLP.Confirm Schema](definition-properties-confirmid.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/confirmId")           |
| [planId](#planid)                 | `string` | Required | cannot be null | [MPLP.Confirm Schema](definition-properties-planid.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/planId")                 |
| [confirmedBy](#confirmedby)       | `string` | Required | cannot be null | [MPLP.Confirm Schema](definition-properties-confirmedby.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/confirmedBy")       |
| [confirmedAt](#confirmedat)       | `string` | Required | cannot be null | [MPLP.Confirm Schema](definition-properties-confirmedat.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/confirmedAt")       |
| [approvalStages](#approvalstages) | `array`  | Required | cannot be null | [MPLP.Confirm Schema](definition-properties-approvalstages.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages") |
| Additional Properties             | Any      | Optional | can be null    |                                                                                                                                                     |

## confirmId

Unique identifier for the confirmation instance.

`confirmId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Confirm Schema](definition-properties-confirmid.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/confirmId")

### confirmId Type

`string`

## planId

Associated plan identifier being confirmed.

`planId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Confirm Schema](definition-properties-planid.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/planId")

### planId Type

`string`

## confirmedBy

User or agent that performed the confirmation.

`confirmedBy`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Confirm Schema](definition-properties-confirmedby.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/confirmedBy")

### confirmedBy Type

`string`

## confirmedAt

Timestamp of the confirmation.

`confirmedAt`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Confirm Schema](definition-properties-confirmedat.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/confirmedAt")

### confirmedAt Type

`string`

### confirmedAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## approvalStages

Multi-stage approval flow for the confirmation process.

`approvalStages`

* is required

* Type: `object[]` ([Details](definition-properties-approvalstages-items.md))

* cannot be null

* defined in: [MPLP.Confirm Schema](definition-properties-approvalstages.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages")

### approvalStages Type

`object[]` ([Details](definition-properties-approvalstages-items.md))

## Additional Properties

Additional properties are allowed and do not have to follow a specific schema


## confirmId Type

`string`


## planId Type

`string`


## confirmedBy Type

`string`


## confirmedAt Type

`string`

## confirmedAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")


## approvalStages Type

`object[]` ([Details](definition-properties-approvalstages-items.md))


## items Type

`object` ([Details](definition-properties-approvalstages-items.md))

# items Properties

| Property                | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                |
| :---------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [stageId](#stageid)     | `string` | Required | cannot be null | [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-stageid.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/stageId")     |
| [approver](#approver)   | `string` | Required | cannot be null | [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-approver.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/approver")   |
| [status](#status)       | `string` | Required | cannot be null | [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-status.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/status")       |
| [comment](#comment)     | `string` | Optional | cannot be null | [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-comment.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/comment")     |
| [timestamp](#timestamp) | `string` | Optional | cannot be null | [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/timestamp") |

## stageId

Identifier of the approval stage.

`stageId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-stageid.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/stageId")

### stageId Type

`string`

## approver

User or agent responsible for approving this stage.

`approver`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-approver.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/approver")

### approver Type

`string`

## status

Status of this stage.

`status`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-status.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/status")

### status Type

`string`

### status Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value        | Explanation |
| :----------- | :---------- |
| `"pending"`  |             |
| `"approved"` |             |
| `"rejected"` |             |

## comment

Optional comment or feedback from the approver.

`comment`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-comment.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/comment")

### comment Type

`string`

## timestamp

Timestamp of approval or rejection.

`timestamp`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Confirm Schema](definition-properties-approvalstages-items-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Confirm.schema.json#/properties/approvalStages/items/properties/timestamp")

### timestamp Type

`string`

### timestamp Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")


## stageId Type

`string`


## approver Type

`string`


## status Type

`string`

## status Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value        | Explanation |
| :----------- | :---------- |
| `"pending"`  |             |
| `"approved"` |             |
| `"rejected"` |             |


## comment Type

`string`


## timestamp Type

`string`

## timestamp Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")
