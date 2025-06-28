<!-- JP Translation Placeholder -->

## MPLP.Execute Schema Type

`object` ([MPLP.Execute Schema](definition.md))

# MPLP.Execute Schema Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                                                                                    |
| :-------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| [executionId](#executionid) | `string` | Required | cannot be null | [MPLP.Execute Schema](definition-properties-executionid.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/executionId") |
| [taskId](#taskid)           | `string` | Required | cannot be null | [MPLP.Execute Schema](definition-properties-taskid.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/taskId")           |
| [agentId](#agentid)         | `string` | Required | cannot be null | [MPLP.Execute Schema](definition-properties-agentid.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/agentId")         |
| [startTime](#starttime)     | `string` | Required | cannot be null | [MPLP.Execute Schema](definition-properties-starttime.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/startTime")     |
| [endTime](#endtime)         | `string` | Optional | cannot be null | [MPLP.Execute Schema](definition-properties-endtime.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/endTime")         |
| [status](#status)           | `string` | Required | cannot be null | [MPLP.Execute Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/status")           |
| [input](#input)             | `object` | Required | cannot be null | [MPLP.Execute Schema](definition-properties-input.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/input")             |
| [output](#output)           | `object` | Optional | cannot be null | [MPLP.Execute Schema](definition-properties-output.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/output")           |
| [tool](#tool)               | `object` | Required | cannot be null | [MPLP.Execute Schema](definition-properties-tool.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool")               |
| [error](#error)             | `string` | Optional | cannot be null | [MPLP.Execute Schema](definition-properties-error.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/error")             |
| Additional Properties       | Any      | Optional | can be null    |                                                                                                                                               |

## executionId

Unique identifier for the execution instance.

`executionId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-executionid.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/executionId")

### executionId Type

`string`

## taskId

Reference to the task being executed.

`taskId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-taskid.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/taskId")

### taskId Type

`string`

## agentId

Identifier of the agent performing the execution.

`agentId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-agentid.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/agentId")

### agentId Type

`string`

## startTime

Start time of execution.

`startTime`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-starttime.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/startTime")

### startTime Type

`string`

### startTime Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## endTime

End time of execution.

`endTime`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-endtime.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/endTime")

### endTime Type

`string`

### endTime Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## status

Current status of the execution.

`status`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/status")

### status Type

`string`

### status Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | :---------- |
| `"pending"` |             |
| `"running"` |             |
| `"success"` |             |
| `"failed"`  |             |

## input

Normalized input data for the task.

`input`

* is required

* Type: `object` ([Details](definition-properties-input.md))

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-input.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/input")

### input Type

`object` ([Details](definition-properties-input.md))

## output

Resulting output data from the execution.

`output`

* is optional

* Type: `object` ([Details](definition-properties-output.md))

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-output.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/output")

### output Type

`object` ([Details](definition-properties-output.md))

## tool

Tool or API used during execution.

`tool`

* is required

* Type: `object` ([Details](definition-properties-tool.md))

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-tool.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool")

### tool Type

`object` ([Details](definition-properties-tool.md))

## error

Optional error message if execution fails.

`error`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-error.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/error")

### error Type

`string`

## Additional Properties

Additional properties are allowed and do not have to follow a specific schema


## executionId Type

`string`


## taskId Type

`string`


## agentId Type

`string`


## startTime Type

`string`

## startTime Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")


## endTime Type

`string`

## endTime Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")


## status Type

`string`

## status Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | :---------- |
| `"pending"` |             |
| `"running"` |             |
| `"success"` |             |
| `"failed"`  |             |


## input Type

`object` ([Details](definition-properties-input.md))


## output Type

`object` ([Details](definition-properties-output.md))


## tool Type

`object` ([Details](definition-properties-tool.md))

# tool Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                              |
| :-------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [name](#name)         | `string` | Required | cannot be null | [MPLP.Execute Schema](definition-properties-tool-properties-name.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool/properties/name")         |
| [version](#version)   | `string` | Optional | cannot be null | [MPLP.Execute Schema](definition-properties-tool-properties-version.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool/properties/version")   |
| [endpoint](#endpoint) | `string` | Optional | cannot be null | [MPLP.Execute Schema](definition-properties-tool-properties-endpoint.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool/properties/endpoint") |

## name

Name of the tool/API.

`name`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-tool-properties-name.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool/properties/name")

### name Type

`string`

## version

Tool/API version.

`version`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-tool-properties-version.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool/properties/version")

### version Type

`string`

## endpoint

API endpoint or function reference.

`endpoint`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Execute Schema](definition-properties-tool-properties-endpoint.md "https://coregentis.org/schemas/v1.0/Execute.schema.json#/properties/tool/properties/endpoint")

### endpoint Type

`string`


## name Type

`string`


## version Type

`string`


## endpoint Type

`string`


## error Type

`string`
