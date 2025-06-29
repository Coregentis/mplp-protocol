## MPLP.Delivery Schema Type

`object` ([MPLP.Delivery Schema](definition.md))

# MPLP.Delivery Schema Properties

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                          |
| :-------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deliveryId](#deliveryid)         | `string` | Required | cannot be null | [MPLP.Delivery Schema](definition-properties-deliveryid.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/deliveryId")     |
| [name](#name)                     | `string` | Required | cannot be null | [MPLP.Delivery Schema](definition-properties-name.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/name")                 |
| [type](#type)                     | `string` | Required | cannot be null | [MPLP.Delivery Schema](definition-properties-type.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/type")                 |
| [description](#description)       | `string` | Required | cannot be null | [MPLP.Delivery Schema](definition-properties-description.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/description")   |
| [artifacts](#artifacts)           | `array`  | Required | cannot be null | [MPLP.Delivery Schema](definition-properties-artifacts.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/artifacts")       |
| [qualityMetrics](#qualitymetrics) | `object` | Required | cannot be null | [MPLP.Delivery Schema](definition-properties-qualitymetrics.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/qualityMetrics") |
| [status](#status)                 | `string` | Required | cannot be null | [MPLP.Delivery Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/status")             |
| [deliveredBy](#deliveredby)       | `string` | Required | cannot be null | [MPLP.Delivery Schema](definition-properties-deliveredby.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/deliveredBy")   |
| [deliveredAt](#deliveredat)       | `string` | Required | cannot be null | [MPLP.Delivery Schema](definition-properties-deliveredat.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/deliveredAt")   |
| [createdAt](#createdat)           | `string` | Required | cannot be null | [MPLP.Delivery Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/createdAt")       |
| [updatedAt](#updatedat)           | `string` | Required | cannot be null | [MPLP.Delivery Schema](definition-properties-updatedat.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/updatedAt")       |
| Additional Properties             | Any      | Optional | can be null    |                                                                                                                                                     |

## deliveryId

Unique identifier for the delivery.

`deliveryId`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Delivery Schema](definition-properties-deliveryid.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/deliveryId")

### deliveryId Type

`string`

## name

Human-readable name of the delivery.

`name`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Delivery Schema](definition-properties-name.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/name")

### name Type

`string`

## type

Type of the delivery (e.g., 'code', 'documentation', 'artifact').

`type`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Delivery Schema](definition-properties-type.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | :---------- |
| `"code"`          |             |
| `"documentation"` |             |
| `"artifact"`      |             |
| `"report"`        |             |
| `"model"`         |             |

## description

Detailed description of the delivery content and purpose.

`description`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Delivery Schema](definition-properties-description.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/description")

### description Type

`string`

## artifacts

List of artifacts included in this delivery.

`artifacts`

* is required

* Type: `object[]` ([Artifact](definition-properties-artifacts-artifact.md))

* cannot be null

* defined in: [MPLP.Delivery Schema](definition-properties-artifacts.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/artifacts")

### artifacts Type

`object[]` ([Artifact](definition-properties-artifacts-artifact.md))

## qualityMetrics

Quality metrics and assessment results for the delivery.

`qualityMetrics`

* is required

* Type: `object` ([Quality Metrics](definition-properties-qualitymetrics.md))

* cannot be null

* defined in: [MPLP.Delivery Schema](definition-properties-qualitymetrics.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/qualityMetrics")

### qualityMetrics Type

`object` ([Quality Metrics](definition-properties-qualitymetrics.md))

## status

Current status of the delivery.

`status`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Delivery Schema](definition-properties-status.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/status")

### status Type

`string`

### status Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value        | Explanation |
| :----------- | :---------- |
| `"pending"`  |             |
| `"delivered"` |             |
| `"accepted"` |             |
| `"rejected"` |             |

## deliveredBy

Identifier of the agent or entity that delivered this item.

`deliveredBy`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Delivery Schema](definition-properties-deliveredby.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/deliveredBy")

### deliveredBy Type

`string`

## deliveredAt

Timestamp when the delivery was completed.

`deliveredAt`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Delivery Schema](definition-properties-deliveredat.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/deliveredAt")

### deliveredAt Type

`string`

### deliveredAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## createdAt

Timestamp when the delivery was created.

`createdAt`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Delivery Schema](definition-properties-createdat.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/createdAt")

### createdAt Type

`string`

### createdAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## updatedAt

Timestamp when the delivery was last updated.

`updatedAt`

* is required

* Type: `string`

* cannot be null

* defined in: [MPLP.Delivery Schema](definition-properties-updatedat.md "https://coregentis.org/schemas/v1.0/Delivery.schema.json#/properties/updatedAt")

### updatedAt Type

`string`

### updatedAt Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")