# MPLP.Confirm — Confirmation Protocol

## Purpose
This protocol freezes intent and enables multi-round confirmation to prevent execution drift and ensure alignment with user expectations.

## Structure

The MPLP.Confirm protocol follows this JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Confirm.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Confirm Schema",
  "description": "Schema for freezing and confirming task plans in multi-agent workflows.",
  "type": "object",
  "properties": {
    "confirmId": {
      "type": "string",
      "description": "Unique identifier for the confirmation instance."
    },
    "planId": {
      "type": "string",
      "description": "Associated plan identifier being confirmed."
    },
    "confirmedBy": {
      "type": "string",
      "description": "User or agent that performed the confirmation."
    },
    "confirmedAt": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of the confirmation."
    },
    "approvalStages": {
      "type": "array",
      "description": "Multi-stage approval flow for the confirmation process.",
      "items": {
        "type": "object",
        "properties": {
          "stageId": {
            "type": "string",
            "description": "Identifier of the approval stage."
          },
          "approver": {
            "type": "string",
            "description": "User or agent responsible for approving this stage."
          },
          "status": {
            "type": "string",
            "enum": ["pending", "approved", "rejected"],
            "description": "Status of this stage."
          },
          "comment": {
            "type": "string",
            "description": "Optional comment or feedback from the approver."
          },
          "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time of stage completion."
          }
        },
        "required": ["stageId", "approver", "status"]
      }
    },
    "rollbackPlan": {
      "type": "object",
      "description": "Rollback mechanism for undoing confirmed changes.",
      "properties": {
        "rollbackId": {
          "type": "string",
          "description": "Unique identifier for the rollback plan."
        },
        "steps": {
          "type": "array",
          "description": "Ordered list of rollback steps.",
          "items": {
            "type": "object",
            "properties": {
              "stepId": {
                "type": "string",
                "description": "Identifier for the rollback step."
              },
              "action": {
                "type": "string",
                "description": "Action to perform during rollback."
              },
              "target": {
                "type": "string",
                "description": "Target resource or state to rollback."
              }
            },
            "required": ["stepId", "action", "target"]
          }
        }
      }
    },
    "finalStatus": {
      "type": "string",
      "enum": ["pending", "confirmed", "rejected", "rolled_back"],
      "description": "Final status of the confirmation process."
    }
  },
  "required": ["confirmId", "planId", "confirmedBy", "confirmedAt", "finalStatus"],
  "additionalProperties": false
}
```

### Key Components:

- **confirmId**: Unique identifier for each confirmation instance
- **planId**: Reference to the plan being confirmed
- **approvalStages**: Multi-stage approval workflow with status tracking
- **rollbackPlan**: Structured mechanism for undoing confirmed changes
- **finalStatus**: Overall confirmation state (pending, confirmed, rejected, rolled_back)
- **confirmedBy/confirmedAt**: Audit trail for confirmation actions

## Suggested Execution Model
> Multi-stage confirmation with checkpoints and user approval gates.
> Standard lifecycle: capture → freeze → review → approve → proceed