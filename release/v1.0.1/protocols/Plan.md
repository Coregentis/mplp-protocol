---
version: v1.0.0
status: frozen
releaseDate: 2025-06-28
source: MPLP
license: MIT
---

# MPLP.Plan

## 1. Purpose
Defines the planning phase of a multi-agent project lifecycle, where high-level goals are broken down into executable tasks and assigned to specific agents.

## 2. Design Rationale
A structured planning phase ensures that all agents are aligned on project goals, dependencies, and responsibilities. By explicitly describing tasks in a domain-specific format and tracking inter-task dependencies, the system becomes both auditable and explainable.

## 3. Schema Field Explanation
- **planId** (string): Unique identifier for the plan instance.
- **goal** (string): Human-readable statement of the main objective.
- **createdAt** (string, ISO 8601): Timestamp of plan creation.
- **tasks** (array of objects): Breakdown of the goal into actionable tasks. Each task includes:
  - **taskId** (string): Unique identifier of the task.
  - **description** (string): Natural language description of the task.
  - **dsl** (string): Domain-Specific Language expression describing logic or intent.
  - **assignedAgent** (string): ID of the agent assigned to execute this task.
  - **dependencies** (array of strings, optional): List of taskIds that must complete before this task begins.

## 4. Interaction Flow
1. Goal is submitted or derived from context.
2. Agent(s) generate a structured task plan from the goal.
3. Tasks are assigned to agents with dependencies resolved.
4. Plan is submitted to confirmation module.
5. Once confirmed, plan becomes immutable and ready for execution.

## 5. Recommended Execution Model
- Planning agents should validate the feasibility and ordering of tasks.
- Plans should support re-planning if confirmation is rejected.
- DSL expressions can be interpreted by the execution engine or agents.

## 6. Example Usage
```json
{
  "planId": "plan-902",
  "goal": "Generate a market research report for Q2 2025",
  "createdAt": "2025-06-28T10:30:00Z",
  "tasks": [
    {
      "taskId": "task-1",
      "description": "Gather sales data from internal database",
      "dsl": "fetch(sales_db.q2_2025)",
      "assignedAgent": "agent-data-001"
    },
    {
      "taskId": "task-2",
      "description": "Analyze customer feedback trends",
      "dsl": "nlp_analyze(feedback.q2)",
      "assignedAgent": "agent-analyst-002",
      "dependencies": ["task-1"]
    }
  ]
}
```

## 7. Notes & Extensions
- DSL syntax should be documented separately.
- Future versions may add task cost estimation, confidence scores, or expected duration.
- AssignedAgent may be an agent pool or dynamically resolved function.

---

## Contact Us & Content Platforms

**Contact Information:**
- **Twitter/X**: [https://x.com/CoregentisAI](https://x.com/CoregentisAI)
- **Email**: team@coregentis.ai

**Product & Community:**
- **Product Hunt**: [https://www.producthunt.com/@coregentis_ai](https://www.producthunt.com/@coregentis_ai)

**Content Platforms:**
- **Medium**: [https://medium.com/coregentisai](https://medium.com/coregentisai)
- **Substack**: [https://substack.com/@coregentisai](https://substack.com/@coregentisai)
- **Dev.to**: [https://dev.to/jearonwong](https://dev.to/jearonwong)
- **Hacker News**: [https://news.ycombinator.com/user?id=CoregentisAI](https://news.ycombinator.com/user?id=CoregentisAI)
