# MPLP.Learn 
 
 ## 1. Purpose  
 Defines the learning phase in the MPLP lifecycle. This module captures observations, failure reasons, and adjustments after task execution, enabling agents to adapt over time. 
 
 ## 2. Design Rationale  
 Continuous improvement in multi-agent systems requires structured feedback loops. Learn module formalizes the process of extracting insights and adjusting behaviors after execution. 
 
 ## 3. Schema Field Explanation  
 - **learningId** (string): Unique identifier for this learning instance.  
 - **relatedExecutionId** (string): Links this learning record to a specific execution.  
 - **agentId** (string): The agent performing or receiving learning updates.  
 - **observations** (array): List of structured observations collected during or after execution.  
 - **failureReason** (string, optional): Root cause if the execution failed.  
 - **adjustments** (array, optional): Modifications made to behavior or tools. Each item includes:  
   - **target** (string): The component being adjusted.  
   - **changeType** (string): Type of change (`parameter` | `workflow` | `tool` | `strategy`).  
   - **description** (string): Explanation of the change.  
 - **knowledge** (object, optional): Structured learned knowledge (e.g., extracted patterns, rules).  
 - **timestamp** (string, ISO 8601): Time when the learning was recorded. 
 
 ## 4. Interaction Flow  
 1. Execution completes (success or failure).  
 2. Agent analyzes observations and identifies any issues.  
 3. Adjustments are applied to agent or system configuration.  
 4. Knowledge is optionally stored in memory or external systems.  
 5. Learning record is finalized and stored for traceability. 
 
 ## 5. Recommended Execution Model  
 - Learning should be asynchronous and non-blocking to avoid slowing real-time pipelines.  
 - Use centralized memory or vector databases to persist long-term learning.  
 - Adjustments can trigger agent re-planning or role reassignment. 
 
 ## 6. Example Usage  
 ```json 
 { 
   "learningId": "learn-8890", 
   "relatedExecutionId": "exec-3001", 
   "agentId": "agent-data-scraper", 
   "observations": [ 
     "Missing data fields on 10% of items", 
     "Page structure inconsistent across products" 
   ], 
   "failureReason": "HTML parsing error due to unexpected DOM changes", 
   "adjustments": [ 
     { 
       "target": "parserModule", 
       "changeType": "strategy", 
       "description": "Switched from DOM selector to ML-based pattern detection" 
     } 
   ], 
   "knowledge": { 
     "pattern": "New product listings use class `.item-v2` instead of `.item`" 
   }, 
   "timestamp": "2025-06-28T13:35:00Z" 
 } 
 ``` 
 
 ## 7. Notes & Extensions 
 Observations may include structured logs, metrics, or embeddings. 
 
 Adjustments should be auditable and reversible. 
 
 Future versions may link Learn to autonomous agent retraining or fine-tuning triggers.