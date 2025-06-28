---
version: v1.0.0
status: frozen
releaseDate: 2025-06-28
source: MPLP
license: MIT
---
<!-- IT Translation Placeholder -->

## MPLP.Test Schema Type

`object` ([MPLP.Test Schema](definition.md))

# MPLP.Test Schema Properties

| Property                            | Type     | Required | Nullable       | Defined by                                                                                                                                      |
| :---------------------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| [testId](#testid)                   | `string` | Required | cannot be null | [MPLP.Test Schema](definition-properties-testid.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/testId")                   |
| [relatedTaskId](#relatedtaskid)     | `string` | Required | cannot be null | [MPLP.Test Schema](definition-properties-relatedtaskid.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/relatedTaskId")     |
| [input](#input)                     | `object` | Required | cannot be null | [MPLP.Test Schema](definition-properties-input.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/input")                     |
| [expectedOutput](#expectedoutput)   | `object` | Required | cannot be null | [MPLP.Test Schema](definition-properties-expectedoutput.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/expectedOutput")   |
| [testType](#testtype)               | `string` | Required | cannot be null | [MPLP.Test Schema](definition-properties-testtype.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/testType")               |
| [executionStatus](#executionstatus) | `string` | Optional | cannot be null | [MPLP.Test Schema](definition-properties-executionstatus.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/executionStatus") |
| [result](#result)                   | `object` | Optional | cannot be null | [MPLP.Test Schema](definition-properties-result.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/result")                   |
| [errorMessage](#errormessage)       | `string` | Optional | cannot be null | [MPLP.Test Schema](definition-properties-errormessage.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/errorMessage")       |
| [timestamp](#timestamp)             | `string` | Optional | cannot be null | [MPLP.Test Schema](definition-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/timestamp")             |
| Additional Properties               | Any      | Optional | can be null    |                                                                                                                                                 |

## testId

Unique identifier for the test case.

`testId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Test Schema](definition-properties-testid.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/testId")

### testId Type

`string`

## relatedTaskId

Reference to the task or DSL node being tested.

`relatedTaskId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Test Schema](definition-properties-relatedtaskid.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/relatedTaskId")

### relatedTaskId Type

`string`

## input

Input data for the test case.

`input`

* is required

* Type: `object` ([Details](definition-properties-input.md))

* cannot be null

* defined in: [MPLP.Test Schema](definition-properties-input.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/input")

### input Type

`object` ([Details](definition-properties-input.md))

## expectedOutput

Expected output data for validation.

`expectedOutput`

* is required

* Type: `object` ([Details](definition-properties-expectedoutput.md))

* cannot be null

* defined in: [MPLP.Test Schema](definition-properties-expectedoutput.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/expectedOutput")

### expectedOutput Type

`object` ([Details](definition-properties-expectedoutput.md))

## testType

Type of test being conducted.

`testType`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Test Schema](definition-properties-testtype.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/testType")

### testType Type

`string`

### testType Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | :---------- |
| `"unit"`              |             |
| `"integration"`       |             |
| `"regression"`        |             |
| `"schema_validation"` |             |

## executionStatus

Status of the test execution.

`executionStatus`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Test Schema](definition-properties-executionstatus.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/executionStatus")

### executionStatus Type

`string`

### executionStatus Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | :---------- |
| `"pending"` |             |
| `"running"` |             |
| `"passed"`  |             |
| `"failed"`  |             |

## result

Actual result captured during test execution.

`result`

* is optional

* Type: `object` ([Details](definition-properties-result.md))

* cannot be null

* defined in: [MPLP.Test Schema](definition-properties-result.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/result")

### result Type

`object` ([Details](definition-properties-result.md))

## errorMessage

Optional error message if test fails.

`errorMessage`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Test Schema](definition-properties-errormessage.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/errorMessage")

### errorMessage Type

`string`

## timestamp

Time the test was executed or completed.

`timestamp`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Test Schema](definition-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Test.schema.json#/properties/timestamp")

### timestamp Type

`string`

### timestamp Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## Additional Properties

Additional properties are allowed and do not have to follow a specific schema


## testId Type

`string`


## relatedTaskId Type

`string`


## input Type

`object` ([Details](definition-properties-input.md))

# input Properties

| Property              | Type | Required | Nullable    | Defined by |
| :-------------------- | :--- | :------- | :---------- | :--------- |
| Additional Properties | Any  | Optional | can be null |            |

## Additional Properties

Additional properties are allowed and do not have to follow a specific schema


## expectedOutput Type

`object` ([Details](definition-properties-expectedoutput.md))

# expectedOutput Properties

| Property              | Type | Required | Nullable    | Defined by |
| :-------------------- | :--- | :------- | :---------- | :--------- |
| Additional Properties | Any  | Optional | can be null |            |

## Additional Properties

Additional properties are allowed and do not have to follow a specific schema


## testType Type

`string`

## testType Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | :---------- |
| `"unit"`              |             |
| `"integration"`       |             |
| `"regression"`        |             |
| `"schema_validation"` |             |


## executionStatus Type

`string`

## executionStatus Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | :---------- |
| `"pending"` |             |
| `"running"` |             |
| `"passed"`  |             |
| `"failed"`  |             |


## result Type

`object` ([Details](definition-properties-result.md))

# result Properties

| Property              | Type | Required | Nullable    | Defined by |
| :-------------------- | :--- | :------- | :---------- | :--------- |
| Additional Properties | Any  | Optional | can be null |            |

## Additional Properties

Additional properties are allowed and do not have to follow a specific schema


## errorMessage Type

`string`


## timestamp Type

`string`

## timestamp Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")
