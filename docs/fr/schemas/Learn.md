<!-- FR Translation Placeholder -->

## MPLP.Learn Schema Type

`object` ([MPLP.Learn Schema](definition.md))

# MPLP.Learn Schema Properties

| Property                                  | Type     | Required | Nullable       | Defined by                                                                                                                                              |
| :---------------------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [learningId](#learningid)                 | `string` | Required | cannot be null | [MPLP.Learn Schema](definition-properties-learningid.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/learningId")                 |
| [relatedExecutionId](#relatedexecutionid) | `string` | Required | cannot be null | [MPLP.Learn Schema](definition-properties-relatedexecutionid.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/relatedExecutionId") |
| [agentId](#agentid)                       | `string` | Required | cannot be null | [MPLP.Learn Schema](definition-properties-agentid.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/agentId")                       |
| [observations](#observations)             | `array`  | Required | cannot be null | [MPLP.Learn Schema](definition-properties-observations.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/observations")             |
| [failureReason](#failurereason)           | `string` | Optional | cannot be null | [MPLP.Learn Schema](definition-properties-failurereason.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/failureReason")           |
| [adjustments](#adjustments)               | `array`  | Optional | cannot be null | [MPLP.Learn Schema](definition-properties-adjustments.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments")               |
| [knowledge](#knowledge)                   | `object` | Optional | cannot be null | [MPLP.Learn Schema](definition-properties-knowledge.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/knowledge")                   |
| [timestamp](#timestamp)                   | `string` | Required | cannot be null | [MPLP.Learn Schema](definition-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/timestamp")                   |
| Additional Properties                     | Any      | Optional | can be null    |                                                                                                                                                         |

## learningId

Unique identifier for the learning record.

`learningId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Learn Schema](definition-properties-learningid.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/learningId")

### learningId Type

`string`

## relatedExecutionId

Execution instance that triggered the learning process.

`relatedExecutionId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Learn Schema](definition-properties-relatedexecutionid.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/relatedExecutionId")

### relatedExecutionId Type

`string`

## agentId

Agent undergoing learning.

`agentId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Learn Schema](definition-properties-agentid.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/agentId")

### agentId Type

`string`

## observations

List of observations or signals collected during/after execution.

`observations`

* is required

* Type: `string[]`

* cannot be null

* defined in: [MPLP.Learn Schema](definition-properties-observations.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/observations")

### observations Type

`string[]`

## failureReason

Optional reason or root cause of failure, if applicable.

`failureReason`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Learn Schema](definition-properties-failurereason.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/failureReason")

### failureReason Type

`string`

## adjustments

List of changes made to the agent's behavior, parameters, or strategy.

`adjustments`

* is optional

* Type: `object[]` ([Details](definition-properties-adjustments-items.md))

* cannot be null

* defined in: [MPLP.Learn Schema](definition-properties-adjustments.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments")

### adjustments Type

`object[]` ([Details](definition-properties-adjustments-items.md))

## knowledge

Optional updated knowledge or learned representation stored by the agent.

`knowledge`

* is optional

* Type: `object` ([Details](definition-properties-knowledge.md))

* cannot be null

* defined in: [MPLP.Learn Schema](definition-properties-knowledge.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/knowledge")

### knowledge Type

`object` ([Details](definition-properties-knowledge.md))

## timestamp

Time of learning completion or update.

`timestamp`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Learn Schema](definition-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/timestamp")

### timestamp Type

`string`

### timestamp Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## Additional Properties

Additional properties are allowed and do not have to follow a specific schema


## learningId Type

`string`


## relatedExecutionId Type

`string`


## agentId Type

`string`


## observations Type

`string[]`


## items Type

`string`


## failureReason Type

`string`


## adjustments Type

`object[]` ([Details](definition-properties-adjustments-items.md))


## items Type

`object` ([Details](definition-properties-adjustments-items.md))

# items Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                          |
| :-------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [target](#target)           | `string` | Required | cannot be null | [MPLP.Learn Schema](definition-properties-adjustments-items-properties-target.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments/items/properties/target")           |
| [changeType](#changetype)   | `string` | Required | cannot be null | [MPLP.Learn Schema](definition-properties-adjustments-items-properties-changetype.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments/items/properties/changeType")   |
| [description](#description) | `string` | Optional | cannot be null | [MPLP.Learn Schema](definition-properties-adjustments-items-properties-description.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments/items/properties/description") |

## target

What component/behavior is being adjusted.

`target`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Learn Schema](definition-properties-adjustments-items-properties-target.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments/items/properties/target")

### target Type

`string`

## changeType

Type of adjustment.

`changeType`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Learn Schema](definition-properties-adjustments-items-properties-changetype.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments/items/properties/changeType")

### changeType Type

`string`

### changeType Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | :---------- |
| `"parameter"` |             |
| `"workflow"`  |             |
| `"tool"`      |             |
| `"strategy"`  |             |

## description

Explanation of the change.

`description`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Learn Schema](definition-properties-adjustments-items-properties-description.md "https://coregentis.org/schemas/v1.0/Learn.schema.json#/properties/adjustments/items/properties/description")

### description Type

`string`


## target Type

`string`


## changeType Type

`string`

## changeType Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | :---------- |
| `"parameter"` |             |
| `"workflow"`  |             |
| `"tool"`      |             |
| `"strategy"`  |             |


## description Type

`string`


## knowledge Type

`object` ([Details](definition-properties-knowledge.md))


## timestamp Type

`string`

## timestamp Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")
