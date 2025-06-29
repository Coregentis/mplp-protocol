# MPLP.Workflow Protocol

## Purpose
This protocol defines workflow orchestration and process management for multi-agent project development, including phase coordination and flow control mechanisms.

## Structure

The MPLP.Workflow protocol follows this JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Workflow.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Workflow Schema",
  "description": "Schema for workflow orchestration and process management in multi-agent systems.",
  "type": "object",
  "properties": {
    "workflowId": {
      "type": "string",
      "description": "Unique identifier for this workflow instance."
    },
    "name": {
      "type": "string",
      "description": "Human-readable name of the workflow."
    },
    "description": {
      "type": "string",
      "description": "Detailed description of the workflow's purpose and scope."
    },
    "stages": {
      "type": "array",
      "description": "Sequential stages in the workflow execution.",
      "items": {
        "type": "object",
        "properties": {
          "stageId": {
            "type": "string",
            "description": "Unique identifier for the stage."
          },
          "name": {
            "type": "string",
            "description": "Name of the workflow stage."
          },
          "requiredRoles": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Roles required to participate in this stage."
          },
          "deliverables": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Expected outputs from this stage."
          }
        },
        "required": ["stageId", "name"]
      }
    },
    "dependencies": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "External dependencies required for workflow execution."
    },
    "triggers": {
      "type": "array",
      "items": {
        "type": "object"
      },
      "description": "Events or conditions that can trigger workflow execution."
    },
    "status": {
      "type": "string",
      "enum": ["active", "suspended", "completed", "failed", "cancelled"],
      "description": "Current execution status of the workflow."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the workflow was created."
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the workflow was last updated."
    }
  },
  "required": ["workflowId", "name", "stages", "status", "createdAt"],
  "additionalProperties": false
}
```

### Key Components:

- **workflowId**: Unique identifier for each workflow instance
- **name**: Human-readable workflow name
- **stages**: Sequential phases with role assignments and deliverables
- **dependencies**: External requirements for workflow execution
- **triggers**: Events that initiate or control workflow progression
- **status**: Current state of workflow execution

## Suggested Execution Model
> State machine-based workflow engine with phase gates.
> Standard lifecycle: initialize → execute → validate → progress → complete