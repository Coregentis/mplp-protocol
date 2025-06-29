## MPLP.Workflow Schema Type

`object` ([MPLP.Workflow Schema](definition.md))

# MPLP.Workflow Schema Properties

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                          |
| :-------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| [workflowId](#workflowid)         | `string` | Required | cannot be null | [MPLP.Workflow Schema](definition-properties-workflowid.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/workflowId")     |
| [name](#name)                     | `string` | Required | cannot be null | [MPLP.Workflow Schema](definition-properties-name.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/name")                 |
| [description](#description)       | `string` | Required | cannot be null | [MPLP.Workflow Schema](definition-properties-description.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/description")   |
| [stages](#stages)                 | `array`  | Required | cannot be null | [MPLP.Workflow Schema](definition-properties-stages.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/stages")             |
| [dependencies](#dependencies)     | `array`  | Required | cannot be null | [MPLP.Workflow Schema](definition-properties-dependencies.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/dependencies") |
| [triggers](#triggers)             | `array`  | Required | cannot be null | [MPLP.Workflow Schema](definition-properties-triggers.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/triggers")         |
| [status](#status)                 | `string` | Required | cannot be null | [MPLP.Workflow Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/status")             |
| [createdAt](#createdat)           | `string` | Required | cannot be null | [MPLP.Workflow Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/createdAt")       |
| [updatedAt](#updatedat)           | `string` | Required | cannot be null | [MPLP.Workflow Schema](definition-properties-updatedat.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/updatedAt")       |
| Additional Properties             | Any      | Optional | can be null    |                                                                                                                                                     |

## workflowId

Unique identifier for the workflow.

`workflowId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Workflow Schema](definition-properties-workflowid.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/workflowId")

### workflowId Type

`string`

## name

Human-readable name of the workflow.

`name`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Workflow Schema](definition-properties-name.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/name")

### name Type

`string`

## description

Detailed description of the workflow's purpose and process.

`description`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Workflow Schema](definition-properties-description.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/description")

### description Type

`string`

## stages

Ordered list of workflow stages.

`stages`

* is required

* Type: `object[]` ([Stage](definition-properties-stages-stage.md))

* cannot be null

* defined in: [MPLP.Workflow Schema](definition-properties-stages.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/stages")

### stages Type

`object[]` ([Stage](definition-properties-stages-stage.md))

## dependencies

List of workflow dependencies and their relationships.

`dependencies`

* is required

* Type: `object[]` ([Dependency](definition-properties-dependencies-dependency.md))

* cannot be null

* defined in: [MPLP.Workflow Schema](definition-properties-dependencies.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/dependencies")

### dependencies Type

`object[]` ([Dependency](definition-properties-dependencies-dependency.md))

## triggers

List of events that can trigger this workflow.

`triggers`

* is required

* Type: `object[]` ([Trigger](definition-properties-triggers-trigger.md))

* cannot be null

* defined in: [MPLP.Workflow Schema](definition-properties-triggers.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/triggers")

### triggers Type

`object[]` ([Trigger](definition-properties-triggers-trigger.md))

## status

Current status of the workflow.

`status`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Workflow Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/status")

### status Type

`string`

### status Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value        | Explanation |
| :----------- | :---------- |
| `"draft"`    |             |
| `"active"`   |             |
| `"paused"`   |             |
| `"completed"` |             |
| `"failed"`   |             |

## createdAt

Timestamp when the workflow was created.

`createdAt`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Workflow Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/createdAt")

### createdAt Type

`string`

### createdAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## updatedAt

Timestamp when the workflow was last updated.

`updatedAt`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Workflow Schema](definition-properties-updatedat.md "https://coregentis.org/schemas/v1.0/Workflow.schema.json#/properties/updatedAt")

### updatedAt Type

`string`

### updatedAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")