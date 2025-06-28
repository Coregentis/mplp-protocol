---
version: v1.0.0
status: frozen
releaseDate: 2025-06-28
source: MPLP
license: MIT
---

# MPLP.Test 
 
 ## 1. Purpose  
 Defines the testing and validation protocol in the MPLP lifecycle. It ensures that outputs from agent workflows or execution pipelines meet expected quality standards through structured test cases and automated evaluation. 
 
 ## 2. Design Rationale  
 As multi-agent workflows grow in complexity, output verification becomes critical. This protocol introduces repeatable, structured tests aligned with planning and execution phases, facilitating continuous validation and quality assurance. 
 
 ## 3. Schema Field Explanation  
 - **testId** (string): Unique identifier for the test suite or test run.  
 - **relatedPlanId** (string): Reference to the plan or goal being validated.  
 - **agentId** (string): Agent responsible for executing the tests.  
 - **generatedAt** (string, ISO 8601): Time the test cases were generated.  
 - **testCases** (array): List of test case entries.  
   - **caseId** (string): Unique identifier for the test case.  
   - **description** (string): Human-readable description of the test scenario.  
   - **input** (object): Input data for the test case.  
   - **expectedOutput** (object): Expected result of the test case.  
   - **actualOutput** (object, optional): Result produced during the last execution.  
   - **status** (string): Test status (`pending`, `passed`, `failed`)  
 - **summary** (object): Aggregated result summary.  
   - **total** (integer): Total number of test cases.  
   - **passed** (integer): Number of passed cases.  
   - **failed** (integer): Number of failed cases. 
 
 ## 4. Interaction Flow  
 1. After planning or execution, a test agent receives or generates test cases.  
 2. The test agent runs the test cases against actual outputs.  
 3. Results are compared and statuses updated.  
 4. A test summary is generated and stored.  
 5. Test results trigger optional re-planning or learning modules if failed. 
 
 ## 5. Recommended Execution Model  
 - Tests should be generated as part of planning or confirmation.  
 - Reuse DSL specifications in tasks to generate input-output pairs.  
 - Tests may be run synchronously (on delivery) or asynchronously (batch mode).  
 - Integrate with Learn if failures persist. 
 
 ## 6. Example Usage  
 ```json 
 { 
   "testId": "test-235", 
   "relatedPlanId": "plan-883", 
   "agentId": "agent-validator", 
   "generatedAt": "2025-06-28T12:00:00Z", 
   "testCases": [ 
     { 
       "caseId": "case-001", 
       "description": "Verify product name extraction", 
       "input": { "html": "<h1>Smartphone X2</h1>" }, 
       "expectedOutput": { "name": "Smartphone X2" }, 
       "actualOutput": { "name": "Smartphone X2" }, 
       "status": "passed" 
     }, 
     { 
       "caseId": "case-002", 
       "description": "Check price parsing", 
       "input": { "html": "<span>$199.99</span>" }, 
       "expectedOutput": { "price": 199.99 }, 
       "actualOutput": { "price": 0 }, 
       "status": "failed" 
     } 
   ], 
   "summary": { 
     "total": 2, 
     "passed": 1, 
     "failed": 1 
   } 
 } 
 
 ##7. Notes & Extensions 
 Tests can also be used for regression validation between versions. 
 
 Consider attaching test suite metadata (e.g. generatedBy, scope). 
 
Future extensions may include human-in-the-loop validation, coverage metrics, or test prioritization.

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