# MPLP.Plan — Planning Protocol

## Purpose
This protocol defines structured tasks, agent assignments, and DSL schemas for multi-agent project planning and coordination.

## Structure

The MPLP.Plan protocol follows this JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Plan.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Plan Schema",
  "description": "Schema for planning structured tasks and agent assignments in a multi-agent system.",
  "type": "object",
  "properties": {
    "planId": {
      "type": "string",
      "description": "Unique identifier for this plan instance."
    },
    "goal": {
      "type": "string",
      "description": "The main objective or high-level goal of the project plan."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the plan was created."
    },
    "tasks": {
      "type": "array",
      "description": "List of structured tasks included in the plan.",
      "items": {
        "type": "object",
        "properties": {
          "taskId": {
            "type": "string",
            "description": "Unique identifier for the task."
          },
          "description": {
            "type": "string",
            "description": "Human-readable description of the task."
          },
          "dsl": {
            "type": "string",
            "description": "Domain-specific language (DSL) used to specify task logic."
          },
          "assignedAgent": {
            "type": "string",
            "description": "ID of the agent assigned to execute this task."
          },
          "dependencies": {
            "type": "array",
            "description": "List of task IDs that this task depends on.",
            "items": {
              "type": "string"
            }
          },
          "priority": {
            "type": "integer",
            "minimum": 1,
            "maximum": 10,
            "description": "Priority level of the task (1=lowest, 10=highest)."
          },
          "estimatedDuration": {
            "type": "string",
            "description": "Estimated time to complete the task (ISO 8601 duration format)."
          }
        },
        "required": ["taskId", "description", "dsl", "assignedAgent"]
      }
    }
  },
  "required": ["planId", "goal", "createdAt", "tasks"],
  "additionalProperties": false
}
```

### Key Components:

- **planId**: Unique identifier for each plan instance
- **goal**: High-level objective of the project
- **createdAt**: ISO 8601 timestamp of plan creation
- **tasks**: Array of structured tasks with dependencies and assignments
- **DSL**: Domain-specific language for task specification
- **dependencies**: Task dependency graph for execution ordering
- **priority**: Task prioritization for resource allocation

## Suggested Execution Model
> Hierarchical task decomposition with agent capability matching.
> Standard lifecycle: analyze → decompose → assign → validate → execute