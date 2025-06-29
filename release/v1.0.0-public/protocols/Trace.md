# MPLP.Trace — Traceability Protocol

## Purpose
This protocol records all actions, states, and transitions for auditability and debugging in multi-agent systems.

## Structure

The MPLP.Trace protocol follows this JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Trace.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Trace Schema",
  "description": "Schema for recording and querying all traceable events, state changes, and transitions in a multi-agent project.",
  "type": "object",
  "properties": {
    "traceId": {
      "type": "string",
      "description": "Unique identifier for the trace entry."
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "Time at which the event was recorded."
    },
    "source": {
      "type": "string",
      "description": "Origin of the event (e.g., Context, Execute, Learn, Test, external API)."
    },
    "agentId": {
      "type": "string",
      "description": "Optional agent involved in the event."
    },
    "eventType": {
      "type": "string",
      "enum": ["state_change", "action", "error", "message", "confirmation", "execution_log", "external_call"],
      "description": "Type of event being recorded."
    },
    "eventDetails": {
      "type": "object",
      "description": "Structured details about the event.",
      "additionalProperties": true
    },
    "relatedObject": {
      "type": "string",
      "description": "Optional reference to an associated object (e.g., taskId, executionId, learningId)."
    },
    "tags": {
      "type": "array",
      "description": "Optional tags for querying/filtering trace entries.",
      "items": {
        "type": "string"
      }
    },
    "severity": {
      "type": "string",
      "enum": ["debug", "info", "warning", "error", "critical"],
      "description": "Severity level of the event."
    },
    "auditTrail": {
      "type": "object",
      "description": "Audit trail information for compliance and debugging.",
      "properties": {
        "userId": {
          "type": "string",
          "description": "User who initiated the action (if applicable)."
        },
        "sessionId": {
          "type": "string",
          "description": "Session identifier for grouping related events."
        },
        "requestId": {
          "type": "string",
          "description": "Request identifier for tracing across services."
        },
        "previousState": {
          "type": "object",
          "description": "State before the event occurred."
        },
        "newState": {
          "type": "object",
          "description": "State after the event occurred."
        }
      }
    }
  },
  "required": ["traceId", "timestamp", "source", "eventType"],
  "additionalProperties": true
}
```

### Key Components:

- **traceId**: Unique identifier for each trace entry
- **timestamp**: ISO 8601 timestamp of event occurrence
- **source**: Origin system or component that generated the event
- **eventType**: Classification of event (state_change, action, error, etc.)
- **eventDetails**: Flexible structure for event-specific data
- **auditTrail**: Compliance and debugging information with state transitions
- **tags**: Metadata for efficient querying and filtering
- **severity**: Event importance level for monitoring and alerting

## Suggested Execution Model
> Comprehensive logging system with structured event capture and query capabilities.
> Standard lifecycle: capture → structure → store → index → query