---
version: 1.0
created: 2025-01-27T10:00:00+08:00
last_updated: 2025-01-27T10:00:00+08:00
maintainer: MPLP Development Team
applicable_scope: Multi-Agent Project Lifecycle Protocol
---

# MPLP.Context Schema

## Overview

**MPLP.Context** is the core module for global shared context protocol in multi-agent systems, designed to manage project-level state information, agent state tracking, and shared memory storage.

## Purpose

- **Global State Management**: Maintains global state information for the entire multi-agent project
- **Agent Coordination**: Tracks current status and role assignments of all participating agents
- **Shared Memory**: Provides unified interface for data sharing and communication between agents
- **Project Context**: Stores project metadata and lifecycle information

## Schema Definition

### Basic Information

- **Schema ID**: `https://coregentis.org/schemas/v1.0/Context.schema.json`
- **Version**: 1.0.0
- **Type**: `object`

### Property Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `contextId` | `string` | ✓ | Unique identifier for the context instance |
| `projectName` | `string` | ✓ | Name of the associated project |
| `createdAt` | `string` | ✓ | Context initialization timestamp (ISO 8601) |
| `agentStates` | `array` | ✓ | List of currently active agent states |
| `memory` | `object` | ✗ | Arbitrary shared memory or key-value data storage |

### agentStates Array Item Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `agentId` | `string` | ✓ | Unique identifier for the agent |
| `role` | `string` | ✓ | Agent's role in the project |
| `status` | `string` | ✓ | Agent's current operational status |

#### status Enumeration Values

- `idle`: Idle state
- `active`: Actively executing
- `error`: Error state
- `completed`: Completed

## Execution Model

### Context Initialization

```json
{
  "contextId": "ctx_project_001",
  "projectName": "E-commerce Platform",
  "createdAt": "2025-01-27T10:00:00Z",
  "agentStates": [
    {
      "agentId": "agent_planner_001",
      "role": "project_planner",
      "status": "active"
    }
  ],
  "memory": {
    "project_phase": "planning",
    "total_tasks": 0
  }
}
```

### State Update Flow

1. **Agent Registration**: Update `agentStates` when new agents join
2. **State Synchronization**: Periodically update agent status information
3. **Memory Management**: Share project data through the `memory` object
4. **Lifecycle Tracking**: Record key information for each project phase

### Recommended Implementation

- **Storage**: Use in-memory database or distributed cache
- **Synchronization**: Implement publish-subscribe pattern for state broadcasting
- **Persistence**: Periodic snapshot saving to persistent storage
- **Access Control**: Role-based read/write permission management for agents

## Related Protocols

- **MPLP.Role**: Defines agent roles and permissions
- **MPLP.Plan**: Project planning and task allocation
- **MPLP.Trace**: Operation tracking and audit logs

## Notes

- Context data should remain lightweight, avoiding storage of large business data
- Ensure thread-safe operations when multiple agents access shared context
- Consider implementing context versioning for rollback capabilities