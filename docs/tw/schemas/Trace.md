<!-- TW Translation Placeholder -->

## MPLP.Trace Schema Type

`object` ([MPLP.Trace Schema](definition.md))

# MPLP.Trace Schema Properties

| Property                        | Type     | Required | Nullable       | Defined by                                                                                                                                    |
| :------------------------------ | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| [traceId](#traceid)             | `string` | Required | cannot be null | [MPLP.Trace Schema](definition-properties-traceid.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/traceId")             |
| [timestamp](#timestamp)         | `string` | Required | cannot be null | [MPLP.Trace Schema](definition-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/timestamp")         |
| [source](#source)               | `string` | Required | cannot be null | [MPLP.Trace Schema](definition-properties-source.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/source")               |
| [agentId](#agentid)             | `string` | Optional | cannot be null | [MPLP.Trace Schema](definition-properties-agentid.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/agentId")             |
| [eventType](#eventtype)         | `string` | Required | cannot be null | [MPLP.Trace Schema](definition-properties-eventtype.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/eventType")         |
| [eventDetails](#eventdetails)   | `object` | Optional | cannot be null | [MPLP.Trace Schema](definition-properties-eventdetails.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/eventDetails")   |
| [relatedObject](#relatedobject) | `string` | Optional | cannot be null | [MPLP.Trace Schema](definition-properties-relatedobject.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/relatedObject") |
| [tags](#tags)                   | `array`  | Optional | cannot be null | [MPLP.Trace Schema](definition-properties-tags.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/tags")                   |
| Additional Properties           | Any      | Optional | can be null    |                                                                                                                                               |

## traceId

Unique identifier for the trace entry.

`traceId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Trace Schema](definition-properties-traceid.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/traceId")

### traceId Type

`string`

## timestamp

Time at which the event was recorded.

`timestamp`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Trace Schema](definition-properties-timestamp.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/timestamp")

### timestamp Type

`string`

### timestamp Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## source

Origin of the event (e.g., Context, Execute, Learn, Test, external API).

`source`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Trace Schema](definition-properties-source.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/source")

### source Type

`string`

## agentId

Optional agent involved in the event.

`agentId`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Trace Schema](definition-properties-agentid.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/agentId")

### agentId Type

`string`

## eventType

Type of event being recorded.

`eventType`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Trace Schema](definition-properties-eventtype.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/eventType")

### eventType Type

`string`

### eventType Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | :---------- |
| `"state_change"`  |             |
| `"action"`        |             |
| `"error"`         |             |
| `"message"`       |             |
| `"confirmation"`  |             |
| `"execution_log"` |             |
| `"external_call"` |             |

## eventDetails

Structured details about the event.

`eventDetails`

* is optional

* Type: `object` ([Details](definition-properties-eventdetails.md))

* cannot be null

* defined in: [MPLP.Trace Schema](definition-properties-eventdetails.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/eventDetails")

### eventDetails Type

`object` ([Details](definition-properties-eventdetails.md))

## relatedObject

Optional reference to an associated object (e.g., taskId, executionId, learningId).

`relatedObject`

* is optional

* Type: `string`

* cannot be null

* defined in: [MPLP.Trace Schema](definition-properties-relatedobject.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/relatedObject")

### relatedObject Type

`string`

## tags

Optional tags for querying/filtering trace entries.

`tags`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [MPLP.Trace Schema](definition-properties-tags.md "https://coregentis.org/schemas/v1.0/Trace.schema.json#/properties/tags")

### tags Type

`string[]`

## Additional Properties

Additional properties are allowed and do not have to follow a specific schema


## traceId Type

`string`


## timestamp Type

`string`

## timestamp Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")


## source Type

`string`


## agentId Type

`string`


## eventType Type

`string`

## eventType Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | :---------- |
| `"state_change"`  |             |
| `"action"`        |             |
| `"error"`         |             |
| `"message"`       |             |
| `"confirmation"`  |             |
| `"execution_log"` |             |
| `"external_call"` |             |


## eventDetails Type

`object` ([Details](definition-properties-eventdetails.md))

# eventDetails Properties

| Property              | Type | Required | Nullable    | Defined by |
| :-------------------- | :--- | :------- | :---------- | :--------- |
| Additional Properties | Any  | Optional | can be null |            |

## Additional Properties

Additional properties are allowed and do not have to follow a specific schema


## relatedObject Type

`string`


## tags Type

`string[]`


## items Type

`string`
