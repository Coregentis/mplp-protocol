---
version: v1.0.0
status: frozen
releaseDate: 2025-06-28
source: MPLP
license: MIT
---
<!-- FR Translation Placeholder -->

## MPLP.Plan Schema Type

`object` ([MPLP.Plan Schema](definition.md))

# MPLP.Plan Schema Properties

| Property                | Type     | Required | Nullable       | Defined by                                                                                                                          |
| :---------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| [planId](#planid)       | `string` | Required | cannot be null | [MPLP.Plan Schema](definition-properties-planid.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/planId")       |
| [goal](#goal)           | `string` | Required | cannot be null | [MPLP.Plan Schema](definition-properties-goal.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/goal")           |
| [createdAt](#createdat) | `string` | Required | cannot be null | [MPLP.Plan Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/createdAt") |
| [tasks](#tasks)         | `array`  | Required | cannot be null | [MPLP.Plan Schema](definition-properties-tasks.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks")         |
| Additional Properties   | Any      | Optional | can be null    |                                                                                                                                     |

## planId

Unique identifier for this plan instance.

`planId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Plan Schema](definition-properties-planid.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/planId")

### planId Type

`string`

## goal

The main objective or high-level goal of the project plan.

`goal`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Plan Schema](definition-properties-goal.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/goal")

### goal Type

`string`

## createdAt

Timestamp when the plan was created.

`createdAt`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Plan Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/createdAt")

### createdAt Type

`string`

### createdAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## tasks

List of structured tasks included in the plan.

`tasks`

* is required

* Type: `object[]` ([Details](definition-properties-tasks-items.md))

* cannot be null

* defined in: [MPLP.Plan Schema](definition-properties-tasks.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks")

### tasks Type

`object[]` ([Details](definition-properties-tasks-items.md))

## Additional Properties

Additional properties are allowed and do not have to follow a specific schema


## planId Type

`string`


## goal Type

`string`


## createdAt Type

`string`

## createdAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")


## tasks Type

`object[]` ([Details](definition-properties-tasks-items.md))


## items Type

`object` ([Details](definition-properties-tasks-items.md))

# items Properties

| Property                        | Type     | Required | Nullable       | Defined by                                                                                                                                                                                |
| :------------------------------ | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [taskId](#taskid)               | `string` | Required | cannot be null | [MPLP.Plan Schema](definition-properties-tasks-items-properties-taskid.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/taskId")               |
| [description](#description)     | `string` | Required | cannot be null | [MPLP.Plan Schema](definition-properties-tasks-items-properties-description.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/description")     |
| [dsl](#dsl)                     | `string` | Required | cannot be null | [MPLP.Plan Schema](definition-properties-tasks-items-properties-dsl.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/dsl")                     |
| [assignedAgent](#assignedagent) | `string` | Required | cannot be null | [MPLP.Plan Schema](definition-properties-tasks-items-properties-assignedagent.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/assignedAgent") |
| [dependencies](#dependencies)   | `array`  | Optional | cannot be null | [MPLP.Plan Schema](definition-properties-tasks-items-properties-dependencies.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/dependencies")   |

## taskId

Unique identifier for the task.

`taskId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Plan Schema](definition-properties-tasks-items-properties-taskid.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/taskId")

### taskId Type

`string`

## description

Human-readable description of the task.

`description`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Plan Schema](definition-properties-tasks-items-properties-description.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/description")

### description Type

`string`

## dsl

Domain-specific language (DSL) used to specify task logic.

`dsl`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Plan Schema](definition-properties-tasks-items-properties-dsl.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/dsl")

### dsl Type

`string`

## assignedAgent

ID of the agent assigned to execute this task.

`assignedAgent`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Plan Schema](definition-properties-tasks-items-properties-assignedagent.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/assignedAgent")

### assignedAgent Type

`string`

## dependencies

List of task IDs that this task depends on.

`dependencies`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [MPLP.Plan Schema](definition-properties-tasks-items-properties-dependencies.md "https://coregentis.org/schemas/v1.0/Plan.schema.json#/properties/tasks/items/properties/dependencies")

### dependencies Type

`string[]`


## taskId Type

`string`


## description Type

`string`


## dsl Type

`string`


## assignedAgent Type

`string`


## dependencies Type

`string[]`


## items Type

`string`
