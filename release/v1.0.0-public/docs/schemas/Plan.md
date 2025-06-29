---
version: 1.0
created: 2025-01-27T10:00:00+08:00
last_updated: 2025-01-27T10:00:00+08:00
maintainer: MPLP Development Team
applicable_scope: Multi-Agent Project Lifecycle Protocol
---

# MPLP.Plan Schema

## Overview

**MPLP.Plan** is the core planning module in multi-agent systems, responsible for defining project goals, task decomposition, agent assignment, and dependency management.

## Purpose

- **Project Planning**: Define clear project goals and success criteria
- **Task Decomposition**: Break down complex projects into manageable tasks
- **Agent Assignment**: Allocate tasks to appropriate agents based on capabilities
- **Dependency Management**: Establish task execution order and dependencies
- **Progress Tracking**: Monitor plan execution and completion status

## Schema Definition

### Basic Information

- **Schema ID**: `https://coregentis.org/schemas/v1.0/Plan.schema.json`
- **Version**: 1.0.0
- **Type**: `object`

### Property Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `planId` | `string` | ✓ | Unique identifier for the plan |
| `goal` | `string` | ✓ | Primary objective or goal of the plan |
| `createdAt` | `string` | ✓ | Plan creation timestamp (ISO 8601) |
| `tasks` | `array` | ✓ | List of tasks that comprise the plan |

### tasks Array Item Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `taskId` | `string` | ✓ | Unique identifier for the task |
| `description` | `string` | ✓ | Detailed description of the task |
| `dsl` | `string` | ✓ | Domain-specific language or instruction set |
| `assignedAgent` | `string` | ✗ | ID of the agent assigned to this task |
| `dependencies` | `array` | ✗ | List of task IDs that must complete before this task |

## Execution Model

### Plan Initialization

```json
{
  "planId": "plan_ecommerce_001",
  "goal": "Develop a complete e-commerce platform with user management, product catalog, and payment processing",
  "createdAt": "2025-01-27T10:00:00Z",
  "tasks": [
    {
      "taskId": "task_001",
      "description": "Design database schema for user management",
      "dsl": "CREATE_DATABASE_SCHEMA users, roles, permissions",
      "assignedAgent": "agent_database_designer",
      "dependencies": []
    },
    {
      "taskId": "task_002",
      "description": "Implement user authentication API",
      "dsl": "IMPLEMENT_API /auth/login, /auth/register, /auth/logout",
      "assignedAgent": "agent_backend_developer",
      "dependencies": ["task_001"]
    }
  ]
}
```

### Plan Execution Flow

1. **Plan Creation**: Initialize plan with goals and task breakdown
2. **Task Assignment**: Allocate tasks to available agents based on capabilities
3. **Dependency Resolution**: Ensure prerequisite tasks are completed before dependent tasks
4. **Execution Monitoring**: Track task progress and handle failures
5. **Plan Adaptation**: Modify plan based on execution feedback and changing requirements

### Recommended Implementation

- **Task Scheduling**: Implement topological sorting for dependency resolution
- **Agent Matching**: Use capability-based assignment algorithms
- **Progress Tracking**: Maintain task status and completion metrics
- **Error Handling**: Implement retry mechanisms and fallback strategies
- **Plan Versioning**: Support plan modifications and rollback capabilities

## Task DSL Guidelines

### DSL Format

The `dsl` field should contain structured instructions that agents can interpret:

- **API Development**: `IMPLEMENT_API endpoint_path, method, parameters`
- **Database Operations**: `CREATE_TABLE table_name, columns` or `QUERY_DATA conditions`
- **File Operations**: `CREATE_FILE path, content` or `MODIFY_FILE path, changes`
- **Testing**: `RUN_TESTS test_suite` or `VALIDATE_OUTPUT criteria`

### DSL Best Practices

- Use consistent command vocabulary across tasks
- Include necessary parameters and context
- Keep instructions atomic and specific
- Avoid ambiguous or overly complex commands

## Related Protocols

- **MPLP.Context**: Global project context and agent state management
- **MPLP.Role**: Agent capabilities and role definitions
- **MPLP.Execute**: Task execution and result reporting
- **MPLP.Trace**: Plan execution tracking and audit logs

## Notes

- Plans should be designed to be modular and adaptable
- Task dependencies should form a directed acyclic graph (DAG)
- Consider implementing plan templates for common project types
- Ensure task descriptions are clear and actionable for assigned agents
- Regularly review and update plans based on execution feedback