---
version: v1.0.0
status: frozen
releaseDate: 2025-06-28
source: MPLP
license: MIT
---

# Context Protocol

## 1. Purpose
Defines the global shared context in a multi-agent project lifecycle. It acts as the system-wide memory and state manager for all participating agents.

## 2. Design Rationale
Multi-agent systems require a shared, queryable context to ensure consistency, coordination, and task awareness. The Context module enables agents to operate on common information, avoid duplication, and synchronize state transitions across different phases of the project lifecycle.

## 3. Schema Field Explanation
- **contextId** (string): Unique identifier for this context instance.
- **projectName** (string): Name of the project this context belongs to.
- **createdAt** (string, ISO 8601): Timestamp when this context was created.
- **agentStates** (array of objects): State records of each agent involved in the project. Each object contains:
  - **agentId** (string): Unique ID of the agent.
  - **role** (string): The functional role of the agent (e.g., planner, executor).
  - **status** (string): Current state (`idle`, `active`, `error`, `completed`).
- **memory** (object): Arbitrary shared key-value store used as a global memory layer.

## 4. Interaction Flow
1. Context is created before project planning.
2. New agents register into context upon joining.
3. Agent states are updated upon execution phase transition.
4. Context is referenced during planning, confirmation, execution, and learning phases.
5. Final context snapshot is stored for audit and learning.

## 5. Recommended Execution Model
- A persistent context store should be initialized at project creation.
- Context updates must be atomic and version-controlled.
- Each agent interaction should read from and write to this context, with optional locking or CRDT support.

## 6. Example Usage
```json
{
  "contextId": "ctx-98322",
  "projectName": "Autonomous Report Generator",
  "createdAt": "2025-06-28T09:01:00Z",
  "agentStates": [
    {
      "agentId": "agent-planner-001",
      "role": "planner",
      "status": "active"
    },
    {
      "agentId": "agent-writer-002",
      "role": "executor",
      "status": "idle"
    }
  ],
  "memory": {
    "currentPlanId": "plan-203",
    "lastConfirmed": "2025-06-28T09:02:00Z"
  }
}
```

## 7. Notes & Extensions
- memory field can be made hierarchical using nested objects.
- agentStates can optionally include performance metrics or last activity timestamps.
- Future versions may add support for distributed context synchronization across multiple runtimes.

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
