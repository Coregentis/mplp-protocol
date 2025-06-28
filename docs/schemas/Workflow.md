# MPLP.Workflow Schema

## Overview

The `MPLP.Workflow` schema defines the structure for workflow orchestration, process management, and execution flow in multi-agent systems. This schema enables the definition of complex workflows with various execution patterns, suspension/resumption capabilities, and change management features.

## Purpose

This schema is used to:
- Define workflow execution patterns and stages
- Manage workflow lifecycle and state transitions
- Configure recursive problem-solving workflows
- Handle workflow suspension and resumption
- Manage demand changes during workflow execution
- Coordinate multi-agent collaboration workflows

## Schema Definition

### Core Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `workflowId` | string | Yes | Unique identifier for the workflow instance |
| `workflowName` | string | Yes | Human-readable name of the workflow |
| `workflowType` | string | Yes | Type of workflow execution pattern |
| `status` | string | Yes | Current status of the workflow |
| `stages` | array | Yes | Ordered list of workflow stages |
| `recursiveConfig` | object | No | Configuration for recursive workflows |
| `suspensionConfig` | object | No | Configuration for workflow suspension |
| `changeManagement` | object | No | Configuration for handling demand changes |
| `createdAt` | string | Yes | Timestamp when workflow was created |
| `updatedAt` | string | No | Timestamp when workflow was last updated |
| `version` | string | No | Version of the workflow definition |

### Workflow Type Enumeration

- `sequential`: Stages execute in order
- `parallel`: Stages execute simultaneously
- `conditional`: Stages execute based on conditions
- `recursive`: Workflow supports recursive execution
- `hybrid`: Combination of multiple execution patterns

### Workflow Status Enumeration

- `draft`: Workflow is being designed
- `active`: Workflow is currently executing
- `suspended`: Workflow execution is paused
- `completed`: Workflow has finished successfully
- `failed`: Workflow execution failed
- `cancelled`: Workflow was cancelled

### Stages Array Structure

Each stage in the `stages` array contains:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `stageId` | string | Yes | Unique identifier for the stage |
| `stageName` | string | Yes | Name of the stage |
| `stageType` | string | Yes | Type of stage in the workflow |
| `assignedRoles` | array | Yes | Roles responsible for this stage |
| `dependencies` | array | No | Stage IDs that must complete first |
| `conditions` | object | No | Conditions for stage execution |
| `timeouts` | object | No | Timeout configurations |
| `status` | string | No | Current status of the stage |

#### Stage Type Enumeration

- `planning`: Planning and design stage
- `execution`: Implementation and execution stage
- `validation`: Testing and validation stage
- `learning`: Learning and optimization stage
- `coordination`: Coordination and synchronization stage

#### Stage Status Enumeration

- `pending`: Stage is waiting to start
- `running`: Stage is currently executing
- `completed`: Stage has finished successfully
- `failed`: Stage execution failed
- `skipped`: Stage was skipped

#### Conditions Structure

The `conditions` object contains:
- `preconditions`: Array of conditions that must be met before execution
- `postconditions`: Array of conditions that must be met after completion

Each condition has:
- `condition`: Condition expression or description
- `type`: Type of condition (enumerated values)

**Precondition Types:**
- `data_available`: Required data is available
- `role_ready`: Assigned role is ready
- `resource_available`: Required resources are available
- `custom`: Custom condition type

**Postcondition Types:**
- `output_generated`: Required output was generated
- `quality_check`: Quality checks passed
- `approval_received`: Required approval was received
- `custom`: Custom condition type

## Execution Models

### Sequential Workflow Example

```json
{
  "workflowId": "wf-001",
  "workflowName": "Document Processing Workflow",
  "workflowType": "sequential",
  "status": "active",
  "stages": [
    {
      "stageId": "stage-001",
      "stageName": "Document Analysis",
      "stageType": "planning",
      "assignedRoles": ["analyst"],
      "status": "completed"
    },
    {
      "stageId": "stage-002",
      "stageName": "Content Generation",
      "stageType": "execution",
      "assignedRoles": ["writer"],
      "dependencies": ["stage-001"],
      "status": "running"
    }
  ],
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### Recursive Workflow Example

```json
{
  "workflowId": "wf-002",
  "workflowName": "Problem Decomposition Workflow",
  "workflowType": "recursive",
  "status": "active",
  "stages": [
    {
      "stageId": "decompose",
      "stageName": "Problem Decomposition",
      "stageType": "planning",
      "assignedRoles": ["architect"]
    },
    {
      "stageId": "solve",
      "stageName": "Subproblem Solution",
      "stageType": "execution",
      "assignedRoles": ["solver"]
    }
  ],
  "recursiveConfig": {
    "maxDepth": 5,
    "decompositionStrategy": "divide_and_conquer",
    "convergenceCriteria": [
      {
        "criterion": "problem_complexity",
        "threshold": 0.1
      }
    ]
  },
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### Workflow with Suspension Points

```json
{
  "workflowId": "wf-003",
  "workflowName": "Long-Running Analysis",
  "workflowType": "sequential",
  "status": "suspended",
  "stages": [
    {
      "stageId": "data-prep",
      "stageName": "Data Preparation",
      "stageType": "execution",
      "assignedRoles": ["data-engineer"]
    }
  ],
  "suspensionConfig": {
    "suspensionPoints": [
      {
        "pointId": "sp-001",
        "stageId": "data-prep",
        "condition": "resource_unavailable",
        "resumptionRequirements": ["resource_allocation"]
      }
    ],
    "statePreservation": {
      "preserveContext": true,
      "preserveIntermediateResults": true,
      "preserveAgentStates": true
    }
  },
  "createdAt": "2024-01-15T10:00:00Z"
}
```

## Workflow Patterns

### Sequential Execution
- Stages execute one after another
- Each stage waits for previous stage completion
- Suitable for dependent operations

### Parallel Execution
- Multiple stages execute simultaneously
- Independent stages can run concurrently
- Improves overall execution time

### Conditional Execution
- Stages execute based on runtime conditions
- Dynamic workflow paths
- Adaptive execution based on results

### Recursive Execution
- Workflow can call itself with subproblems
- Supports divide-and-conquer strategies
- Includes convergence criteria and depth limits

### Hybrid Execution
- Combines multiple execution patterns
- Complex workflows with varied requirements
- Flexible execution strategies

## Change Management

### Change Points
- Defined points where changes can be incorporated
- Specify allowed change types at each point
- Control approval requirements

### Change Types
- `requirement_change`: Changes to requirements
- `scope_change`: Changes to project scope
- `priority_change`: Changes to priorities
- `resource_change`: Changes to resource allocation

### Impact Assessment
- Criteria for assessing change impact
- Rollback strategies for failed changes
- Risk mitigation approaches

## Suspension and Resumption

### Suspension Points
- Predefined points where workflow can be paused
- Conditions that trigger suspension
- Requirements for resumption

### State Preservation
- Context preservation during suspension
- Intermediate results preservation
- Agent state preservation

## Related Protocols

- **MPLP.Plan**: Workflows implement planned activities
- **MPLP.Execute**: Workflow stages contain execution details
- **MPLP.Confirm**: Workflow changes require confirmation
- **MPLP.Trace**: Workflow execution generates traces
- **MPLP.Learn**: Workflow outcomes inform learning

## Implementation Notes

- Workflows should be designed with clear stage boundaries
- Suspension points should be strategically placed
- Change management should balance flexibility with control
- Recursive workflows require careful depth management
- State preservation is critical for long-running workflows
- Timeout configurations prevent indefinite blocking
- Condition evaluation should be deterministic and reliable