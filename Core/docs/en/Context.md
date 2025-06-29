# MPLP.Context — Context Protocol

## Purpose
This protocol defines the global state management and shared context mechanism for all agents within a multi-agent project.

## Structure

The MPLP.Context protocol follows this JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Context.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Context Schema",
  "description": "Schema for the global shared context protocol in a multi-agent system.",
  "type": "object",
  "properties": {
    "contextId": {
      "type": "string",
      "description": "A unique identifier for this context instance."
    },
    "projectName": {
      "type": "string",
      "description": "The name of the project associated with this context."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the context was initialized."
    },
    "agentStates": {
      "type": "array",
      "description": "List of agent states active in the current context.",
      "items": {
        "type": "object",
        "properties": {
          "agentId": {
            "type": "string",
            "description": "Unique identifier of the agent."
          },
          "role": {
            "type": "string",
            "description": "Role of the agent in the project."
          },
          "status": {
            "type": "string",
            "enum": ["idle", "active", "error", "completed"],
            "description": "Current operational status of the agent."
          }
        },
        "required": ["agentId", "role", "status"]
      }
    },
    "memory": {
      "type": "object",
      "description": "Arbitrary shared memory or key-value data store.",
      "additionalProperties": true
    }
  },
  "required": ["contextId", "projectName", "createdAt", "agentStates", "memory"],
  "additionalProperties": false
}
```

### Key Components:

- **contextId**: Unique identifier for each context instance
- **projectName**: Human-readable project name
- **createdAt**: ISO 8601 timestamp of context initialization
- **agentStates**: Array tracking all active agents and their current status
- **memory**: Flexible key-value store for shared data between agents

## Suggested Execution Model
> JSON-based key-value pool, with memory backend (e.g., Qdrant, Redis).
> Standard lifecycle: initialize → update → resolve → persist