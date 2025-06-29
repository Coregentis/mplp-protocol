---
version: 1.0
created: 2025-01-27T10:00:00+08:00
last_updated: 2025-01-27T10:00:00+08:00
maintainer: MPLP Development Team
applicable_scope: Multi-Agent Project Lifecycle Protocol
---

# MPLP.Trace Schema

## Overview

**MPLP.Trace** provides a standardized framework for recording and querying all traceable events, state changes, and transitions in a multi-agent project. It serves as the audit trail and observability layer for the entire system.

## Purpose

- **Audit Trail**: Maintain a complete record of all system events and changes
- **Debugging**: Enable detailed troubleshooting of system behavior
- **Observability**: Provide visibility into agent actions and system state
- **Compliance**: Support regulatory and governance requirements
- **Analytics**: Enable analysis of system behavior and performance patterns

## Schema Definition

### Basic Information

- **Schema ID**: `https://coregentis.org/schemas/v1.0/Trace.schema.json`
- **Version**: 1.0.0
- **Type**: `object`

### Property Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `traceId` | `string` | ✓ | Unique identifier for the trace entry |
| `timestamp` | `string` | ✓ | Time at which the event was recorded (ISO 8601) |
| `source` | `string` | ✓ | Origin of the event |
| `agentId` | `string` | ✗ | Optional agent involved in the event |
| `eventType` | `string` | ✓ | Type of event being recorded |
| `eventDetails` | `object` | ✗ | Structured details about the event |
| `relatedObject` | `string` | ✗ | Optional reference to an associated object |
| `tags` | `array` | ✗ | Optional tags for querying/filtering trace entries |

### eventType Enumeration Values

- `state_change`: System or agent state transitions
- `action`: Agent actions or operations
- `error`: Error conditions or exceptions
- `message`: Inter-agent or system communications
- `confirmation`: Approval or verification events
- `execution_log`: Task execution details
- `external_call`: Interactions with external systems

## Execution Model

### Trace Entry Examples

#### State Change Event

```json
{
  "traceId": "trace_20250127_100000_001",
  "timestamp": "2025-01-27T10:00:00Z",
  "source": "Context",
  "agentId": "agent_planner_001",
  "eventType": "state_change",
  "eventDetails": {
    "previous_state": "idle",
    "new_state": "active",
    "reason": "Task assignment received",
    "context_id": "ctx_project_001"
  },
  "relatedObject": "task_001",
  "tags": ["state_transition", "agent_activation"]
}
```

#### Action Event

```json
{
  "traceId": "trace_20250127_100130_002",
  "timestamp": "2025-01-27T10:01:30Z",
  "source": "Execute",
  "agentId": "agent_backend_dev_001",
  "eventType": "action",
  "eventDetails": {
    "action_type": "code_generation",
    "files_created": ["src/models/User.js"],
    "execution_time_ms": 1250,
    "tool_used": "CodeGenerator"
  },
  "relatedObject": "exec_001_20250127_100000",
  "tags": ["code_generation", "model_creation"]
}
```

#### Error Event

```json
{
  "traceId": "trace_20250127_101845_003",
  "timestamp": "2025-01-27T10:18:45Z",
  "source": "Execute",
  "agentId": "agent_devops_001",
  "eventType": "error",
  "eventDetails": {
    "error_code": "RESOURCE_CONSTRAINT",
    "error_message": "Insufficient cluster resources: requested 1536Mi memory, available 512Mi",
    "severity": "high",
    "recovery_action": "scale_down_request"
  },
  "relatedObject": "exec_002_20250127_101500",
  "tags": ["deployment_error", "resource_constraint"]
}
```

### Tracing Flow

1. **Event Detection**: Identify system events that require tracing
2. **Trace Creation**: Generate trace entries with relevant metadata
3. **Storage**: Persist trace entries to a durable store
4. **Indexing**: Index traces for efficient querying
5. **Retention**: Apply retention policies based on importance
6. **Analysis**: Process traces for insights and debugging

### Recommended Implementation

- **Distributed Tracing**: Implement trace context propagation across agents
- **Sampling**: Apply intelligent sampling for high-volume events
- **Structured Logging**: Use consistent formats for event details
- **Correlation**: Maintain parent-child relationships between traces
- **Visualization**: Provide timeline and dependency visualizations
- **Search**: Implement powerful search capabilities across trace data

## Query Patterns

### Time-based Queries

```json
{
  "query_type": "time_range",
  "start_time": "2025-01-27T10:00:00Z",
  "end_time": "2025-01-27T11:00:00Z",
  "limit": 100
}
```

### Agent-based Queries

```json
{
  "query_type": "agent_activity",
  "agent_id": "agent_backend_dev_001",
  "event_types": ["action", "error"],
  "limit": 50
}
```

### Object-based Queries

```json
{
  "query_type": "related_object",
  "related_object": "task_001",
  "include_children": true
}
```

### Tag-based Queries

```json
{
  "query_type": "tags",
  "tags": ["deployment", "error"],
  "operator": "AND"
}
```

## Trace Aggregation

### Trace Spans

```json
{
  "span_id": "span_task_001_execution",
  "parent_span": "span_project_001_planning",
  "start_trace": "trace_20250127_100000_001",
  "end_trace": "trace_20250127_100530_010",
  "duration_ms": 5300,
  "child_spans": [
    "span_code_generation",
    "span_testing"
  ]
}
```

### Trace Metrics

```json
{
  "metric_type": "execution_performance",
  "time_period": "2025-01-27",
  "aggregation": {
    "total_executions": 156,
    "successful_executions": 142,
    "failed_executions": 14,
    "average_duration_ms": 3250,
    "p95_duration_ms": 8500,
    "error_rate": 0.09
  }
}
```

## Related Protocols

- **MPLP.Context**: Global state that generates state change events
- **MPLP.Execute**: Task execution that generates action and error events
- **MPLP.Test**: Test execution that generates validation events
- **MPLP.Confirm**: Approval workflows that generate confirmation events
- **MPLP.Learn**: Learning processes that generate training events

## Notes

- Trace data can grow rapidly; implement appropriate retention policies
- Consider privacy and security implications of trace data
- Balance tracing detail with performance impact
- Implement trace data compression for efficient storage
- Consider implementing trace data encryption for sensitive information
- Provide mechanisms for trace data export and backup