---
version: 1.0
created: 2025-01-27T10:00:00+08:00
last_updated: 2025-01-27T10:00:00+08:00
maintainer: MPLP Development Team
applicable_scope: Multi-Agent Project Lifecycle Protocol
---

# MPLP.Execute Schema

## Overview

**MPLP.Execute** defines the execution behavior and tool/API invocation patterns for tasks in multi-agent systems. It provides a standardized framework for tracking task execution, managing inputs/outputs, and handling execution lifecycle.

## Purpose

- **Execution Tracking**: Monitor task execution lifecycle from start to completion
- **Tool Integration**: Standardize how agents invoke tools and APIs
- **Input/Output Management**: Normalize data flow between tasks and agents
- **Error Handling**: Provide structured error reporting and recovery mechanisms
- **Performance Monitoring**: Track execution metrics and performance data

## Schema Definition

### Basic Information

- **Schema ID**: `https://coregentis.org/schemas/v1.0/Execute.schema.json`
- **Version**: 1.0.0
- **Type**: `object`

### Property Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `executionId` | `string` | ✓ | Unique identifier for the execution instance |
| `taskId` | `string` | ✓ | Reference to the task being executed |
| `agentId` | `string` | ✓ | Identifier of the agent performing the execution |
| `startTime` | `string` | ✓ | Start time of execution (ISO 8601) |
| `endTime` | `string` | ✗ | End time of execution (ISO 8601) |
| `status` | `string` | ✓ | Current status of the execution |
| `input` | `object` | ✓ | Normalized input data for the task |
| `output` | `object` | ✗ | Resulting output data from the execution |
| `tool` | `object` | ✓ | Tool or API used during execution |
| `error` | `string` | ✗ | Optional error message if execution fails |

### status Enumeration Values

- `pending`: Execution is queued but not yet started
- `running`: Execution is currently in progress
- `success`: Execution completed successfully
- `failed`: Execution failed with errors

### tool Object Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | ✓ | Name of the tool/API |
| `version` | `string` | ✗ | Tool/API version |
| `endpoint` | `string` | ✗ | API endpoint or function reference |

## Execution Model

### Execution Instance Example

```json
{
  "executionId": "exec_001_20250127_100000",
  "taskId": "task_create_user_api",
  "agentId": "agent_backend_dev_001",
  "startTime": "2025-01-27T10:00:00Z",
  "endTime": "2025-01-27T10:05:30Z",
  "status": "success",
  "input": {
    "endpoint": "/api/users",
    "method": "POST",
    "schema": {
      "username": "string",
      "email": "string",
      "password": "string"
    }
  },
  "output": {
    "files_created": [
      "src/routes/users.js",
      "src/models/User.js",
      "tests/users.test.js"
    ],
    "endpoints_implemented": ["/api/users"],
    "test_coverage": "95%"
  },
  "tool": {
    "name": "CodeGenerator",
    "version": "2.1.0",
    "endpoint": "mcp://coding.tools/generate"
  }
}
```

### Failed Execution Example

```json
{
  "executionId": "exec_002_20250127_101500",
  "taskId": "task_deploy_service",
  "agentId": "agent_devops_001",
  "startTime": "2025-01-27T10:15:00Z",
  "endTime": "2025-01-27T10:18:45Z",
  "status": "failed",
  "input": {
    "service_name": "user-service",
    "environment": "production",
    "config": {
      "replicas": 3,
      "memory": "512Mi"
    }
  },
  "output": {
    "partial_deployment": true,
    "deployed_replicas": 1,
    "failed_replicas": 2
  },
  "tool": {
    "name": "KubernetesDeployer",
    "version": "1.8.0",
    "endpoint": "kubectl://cluster.local"
  },
  "error": "Insufficient cluster resources: requested 1536Mi memory, available 512Mi"
}
```

### Execution Lifecycle

1. **Initialization**: Create execution instance with `pending` status
2. **Preparation**: Validate inputs and prepare execution environment
3. **Tool Invocation**: Execute task using specified tools/APIs
4. **Monitoring**: Track progress and update status
5. **Completion**: Record outputs and final status
6. **Cleanup**: Release resources and update dependencies

### Recommended Implementation

- **Execution Queue**: Implement task queuing and scheduling mechanisms
- **Resource Management**: Monitor and allocate computational resources
- **Retry Logic**: Implement automatic retry for transient failures
- **Logging**: Maintain detailed execution logs for debugging
- **Metrics Collection**: Gather performance and success metrics
- **Timeout Handling**: Implement execution timeouts and cancellation

## Input/Output Patterns

### Common Input Structures

```json
{
  "code_generation": {
    "language": "javascript",
    "framework": "express",
    "specifications": {...}
  },
  "api_testing": {
    "endpoint": "/api/endpoint",
    "test_cases": [...],
    "environment": "staging"
  },
  "deployment": {
    "service_config": {...},
    "target_environment": "production",
    "rollback_strategy": "immediate"
  }
}
```

### Common Output Structures

```json
{
  "artifacts": {
    "files_created": [...],
    "files_modified": [...],
    "files_deleted": [...]
  },
  "metrics": {
    "execution_time_ms": 5500,
    "memory_used_mb": 128,
    "success_rate": 0.95
  },
  "validation": {
    "tests_passed": 15,
    "tests_failed": 1,
    "coverage_percentage": 92
  }
}
```

## Error Handling

### Error Categories

- **Input Validation**: Invalid or missing input parameters
- **Tool Unavailable**: Required tool or API is not accessible
- **Resource Constraints**: Insufficient computational resources
- **External Dependencies**: Third-party service failures
- **Timeout**: Execution exceeded time limits

### Error Response Format

```json
{
  "error": "Tool execution failed: API rate limit exceeded",
  "error_code": "RATE_LIMIT_EXCEEDED",
  "retry_after": 300,
  "suggested_action": "retry_with_backoff"
}
```

## Related Protocols

- **MPLP.Plan**: Task definitions and execution requirements
- **MPLP.Role**: Agent capabilities and tool bindings
- **MPLP.Context**: Global execution context and state
- **MPLP.Trace**: Execution tracking and audit trails
- **MPLP.Test**: Validation and testing of execution results

## Notes

- Execution instances should be immutable once completed
- Implement proper timeout mechanisms to prevent hanging executions
- Consider implementing execution sandboxing for security
- Maintain execution history for debugging and optimization
- Ensure proper cleanup of resources after execution completion