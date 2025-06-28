---
version: 1.0
created: 2025-01-27T10:00:00+08:00
last_updated: 2025-01-27T10:00:00+08:00
maintainer: MPLP Development Team
applicable_scope: Multi-Agent Project Lifecycle Protocol
---

# MPLP.Confirm Schema

## Overview

**MPLP.Confirm** provides a standardized framework for freezing and confirming task plans in multi-agent workflows. It implements a multi-stage approval process to ensure proper governance and validation before plan execution.

## Purpose

- **Plan Validation**: Ensure plans are thoroughly reviewed before execution
- **Governance**: Implement approval workflows for compliance and quality control
- **Accountability**: Track who approved what and when
- **Risk Management**: Prevent execution of unvalidated or risky plans
- **Audit Trail**: Maintain records of approval decisions and rationale

## Schema Definition

### Basic Information

- **Schema ID**: `https://coregentis.org/schemas/v1.0/Confirm.schema.json`
- **Version**: 1.0.0
- **Type**: `object`

### Property Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `confirmId` | `string` | ✓ | Unique identifier for the confirmation instance |
| `planId` | `string` | ✓ | Associated plan identifier being confirmed |
| `confirmedBy` | `string` | ✓ | User or agent that performed the confirmation |
| `confirmedAt` | `string` | ✓ | Timestamp of the confirmation (ISO 8601) |
| `approvalStages` | `array` | ✓ | Multi-stage approval flow for the confirmation process |

### approvalStages Array Item Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `stageId` | `string` | ✓ | Identifier of the approval stage |
| `approver` | `string` | ✓ | User or agent responsible for approving this stage |
| `status` | `string` | ✓ | Status of this stage |
| `comment` | `string` | ✗ | Optional comment or feedback from the approver |
| `timestamp` | `string` | ✗ | Timestamp of approval or rejection (ISO 8601) |

### status Enumeration Values

- `pending`: Stage is awaiting approval
- `approved`: Stage has been approved
- `rejected`: Stage has been rejected

## Execution Model

### Single-Stage Approval Example

```json
{
  "confirmId": "confirm_20250127_100000_001",
  "planId": "plan_project_001_v1",
  "confirmedBy": "project_manager_001",
  "confirmedAt": "2025-01-27T10:00:00Z",
  "approvalStages": [
    {
      "stageId": "stage_final_approval",
      "approver": "project_manager_001",
      "status": "approved",
      "comment": "Plan looks comprehensive and well-structured. Approved for execution.",
      "timestamp": "2025-01-27T10:00:00Z"
    }
  ]
}
```

### Multi-Stage Approval Example

```json
{
  "confirmId": "confirm_20250127_100000_002",
  "planId": "plan_enterprise_001_v2",
  "confirmedBy": "system_orchestrator",
  "confirmedAt": "2025-01-27T10:30:00Z",
  "approvalStages": [
    {
      "stageId": "stage_technical_review",
      "approver": "tech_lead_001",
      "status": "approved",
      "comment": "Technical approach is sound. Architecture review passed.",
      "timestamp": "2025-01-27T09:45:00Z"
    },
    {
      "stageId": "stage_security_review",
      "approver": "security_officer_001",
      "status": "approved",
      "comment": "Security requirements are adequately addressed.",
      "timestamp": "2025-01-27T10:15:00Z"
    },
    {
      "stageId": "stage_business_approval",
      "approver": "business_owner_001",
      "status": "approved",
      "comment": "Aligns with business objectives. Budget approved.",
      "timestamp": "2025-01-27T10:30:00Z"
    }
  ]
}
```

### Rejected Approval Example

```json
{
  "confirmId": "confirm_20250127_100000_003",
  "planId": "plan_project_002_v1",
  "confirmedBy": "system_orchestrator",
  "confirmedAt": "2025-01-27T11:00:00Z",
  "approvalStages": [
    {
      "stageId": "stage_technical_review",
      "approver": "tech_lead_002",
      "status": "rejected",
      "comment": "Insufficient error handling in the proposed architecture. Please revise and resubmit.",
      "timestamp": "2025-01-27T11:00:00Z"
    },
    {
      "stageId": "stage_security_review",
      "approver": "security_officer_001",
      "status": "pending",
      "comment": null,
      "timestamp": null
    }
  ]
}
```

### Confirmation Flow

1. **Plan Submission**: A plan is submitted for confirmation
2. **Stage Initialization**: Approval stages are defined based on plan complexity
3. **Sequential Approval**: Each stage is processed in order
4. **Stakeholder Review**: Designated approvers review and provide feedback
5. **Decision Recording**: Approval or rejection decisions are recorded
6. **Final Confirmation**: All stages must be approved for plan confirmation
7. **Execution Authorization**: Confirmed plans are authorized for execution

### Recommended Implementation

- **Workflow Engine**: Implement automated workflow management
- **Notification System**: Alert approvers when their review is required
- **Timeout Handling**: Implement timeouts for pending approvals
- **Escalation**: Provide escalation paths for delayed approvals
- **Audit Logging**: Maintain detailed logs of all approval activities
- **Role-Based Access**: Ensure only authorized users can approve stages

## Approval Patterns

### Sequential Approval

```json
{
  "pattern": "sequential",
  "description": "Each stage must be approved before the next begins",
  "stages": [
    "technical_review",
    "security_review",
    "business_approval"
  ]
}
```

### Parallel Approval

```json
{
  "pattern": "parallel",
  "description": "Multiple stages can be approved simultaneously",
  "stages": {
    "group_1": ["technical_review", "security_review"],
    "group_2": ["business_approval"]
  }
}
```

### Conditional Approval

```json
{
  "pattern": "conditional",
  "description": "Approval stages depend on plan characteristics",
  "conditions": {
    "high_risk": ["technical_review", "security_review", "risk_assessment", "business_approval"],
    "standard": ["technical_review", "business_approval"],
    "low_risk": ["technical_review"]
  }
}
```

## Integration Points

### Plan Freezing

```json
{
  "action": "freeze_plan",
  "plan_id": "plan_project_001_v1",
  "frozen_at": "2025-01-27T09:30:00Z",
  "reason": "Submitted for confirmation",
  "immutable_hash": "sha256:a1b2c3d4e5f6..."
}
```

### Execution Authorization

```json
{
  "action": "authorize_execution",
  "plan_id": "plan_project_001_v1",
  "confirmation_id": "confirm_20250127_100000_001",
  "authorized_at": "2025-01-27T10:00:00Z",
  "execution_window": {
    "start": "2025-01-27T10:00:00Z",
    "end": "2025-01-28T10:00:00Z"
  }
}
```

## Related Protocols

- **MPLP.Plan**: Plans that require confirmation before execution
- **MPLP.Context**: Global state updated with confirmation status
- **MPLP.Execute**: Execution that requires confirmed plans
- **MPLP.Trace**: Audit trail of confirmation activities
- **MPLP.Role**: Role-based approval authority definitions

## Notes

- Confirmation creates an immutable snapshot of the plan
- Rejected confirmations require plan revision and resubmission
- Approval stages can be customized based on organizational requirements
- Consider implementing approval delegation for unavailable approvers
- Maintain clear separation between confirmation and execution phases
- Implement proper access controls for approval authority