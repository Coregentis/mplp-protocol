# MPLP.Role Protocol

## Purpose
This protocol defines role management and agent assignment mechanisms for multi-agent project teams, including capabilities, responsibilities, and tool bindings.

## Structure

The MPLP.Role protocol follows this JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Role.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Role Schema",
  "description": "Schema for role management and agent assignment in multi-agent systems.",
  "type": "object",
  "properties": {
    "roleId": {
      "type": "string",
      "description": "Unique identifier for this role definition."
    },
    "name": {
      "type": "string",
      "description": "Human-readable name of the role."
    },
    "type": {
      "type": "string",
      "enum": ["management", "development", "testing", "operations", "analysis"],
      "description": "Category of the role."
    },
    "description": {
      "type": "string",
      "description": "Detailed description of the role's purpose and scope."
    },
    "capabilities": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of core capabilities this role provides."
    },
    "responsibilities": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Primary responsibilities and duties of this role."
    },
    "permissions": {
      "type": "object",
      "description": "Access permissions and authorization levels for this role.",
      "additionalProperties": true
    },
    "status": {
      "type": "string",
      "enum": ["active", "inactive", "suspended"],
      "description": "Current operational status of the role."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the role was created."
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the role was last updated."
    }
  },
  "required": ["roleId", "name", "type", "capabilities", "responsibilities", "status", "createdAt"],
  "additionalProperties": false
}
```

### Key Components:

- **roleId**: Unique identifier for each role definition
- **name**: Human-readable role name (e.g., "Product Manager", "Developer")
- **type**: Role category for organizational purposes
- **capabilities**: Core skills and abilities the role provides
- **responsibilities**: Primary duties and accountabilities
- **permissions**: Access control and authorization settings
- **status**: Current operational state of the role

## Suggested Execution Model
> Role-based access control with capability matching.
> Standard lifecycle: define → assign → activate → monitor → update