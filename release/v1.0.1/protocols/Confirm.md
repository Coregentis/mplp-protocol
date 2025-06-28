---
version: v1.0.0
status: frozen
releaseDate: 2025-06-28
source: MPLP
license: MIT
---

# MPLP.Confirm

## 1. Purpose
Defines the confirmation phase in the multi-agent lifecycle, allowing one or more human or agent participants to review, validate, and formally lock a proposed plan before execution begins.

## 2. Design Rationale
Multi-agent projects require a governance mechanism to prevent uncontrolled or misaligned execution. Confirmation ensures that all stakeholders agree on the intent and responsibilities before any irreversible action is taken.

## 3. Schema Field Explanation
- **confirmId** (string): Unique identifier for this confirmation process.
- **planId** (string): Reference to the plan being confirmed.
- **confirmedBy** (string): ID of the agent or user confirming the plan.
- **confirmedAt** (string, ISO 8601): Timestamp of confirmation.
- **approvalStages** (array of objects): Optional staged approval model. Each stage contains:
  - **stageId** (string): Unique ID of the approval stage.
  - **approver** (string): User or agent responsible for this stage.
  - **status** (string): Current status of this stage (`pending` | `approved` | `rejected`).
  - **comment** (string, optional): Optional remarks or rationale.
  - **timestamp** (string): Time when the stage was completed.

## 4. Interaction Flow
1. Plan is submitted to the Confirm module.
2. System checks if staged approval is required.
3. Each stage approver reviews and approves/rejects.
4. If all stages pass, confirmation is complete.
5. Confirmed plan is locked and passed to Execute phase.

## 5. Recommended Execution Model
- Use confirmation timeouts to prevent stale plans.
- If any stage is rejected, plan must return to planning.
- Support both manual (human-in-the-loop) and automated approval logic.

## 6. Example Usage
```json
{
  "confirmId": "confirm-202",
  "planId": "plan-902",
  "confirmedBy": "agent-reviewer-007",
  "confirmedAt": "2025-06-28T11:00:00Z",
  "approvalStages": [
    {
      "stageId": "stage-1",
      "approver": "manager-A",
      "status": "approved",
      "timestamp": "2025-06-28T10:45:00Z"
    },
    {
      "stageId": "stage-2",
      "approver": "qa-bot",
      "status": "approved",
      "timestamp": "2025-06-28T10:50:00Z"
    }
  ]
}
```

## 7. Notes & Extensions
- Future support may include multi-party signatures or blockchain proofs.
- Rejected plans should carry forward the reason into learning logs.
- Confirmation can optionally freeze context or schedule downstream actions.

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

---

## Contact & Feedback

If you would like to participate in protocol evolution, provide feedback, or suggest improvements, please feel free to contact us through the following channels:

- Email: team@coregentis.ai
- Project Homepage: `https://x.com/CoregentisAI`
- Content Publishing Platform: `https://medium.com/coregentisai`

---

