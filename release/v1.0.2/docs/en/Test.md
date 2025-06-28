# MPLP.Test — Testing Protocol

## Purpose
This protocol generates automated test cases and verifies output integrity to ensure quality and safety in multi-agent systems.

## Structure

The MPLP.Test protocol follows this JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Test.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Test Schema",
  "description": "Schema for defining automated test cases, test execution metadata, and result validation for multi-agent systems.",
  "type": "object",
  "properties": {
    "testId": {
      "type": "string",
      "description": "Unique identifier for the test case."
    },
    "relatedTaskId": {
      "type": "string",
      "description": "Reference to the task or DSL node being tested."
    },
    "input": {
      "type": "object",
      "description": "Input data for the test case.",
      "additionalProperties": true
    },
    "expectedOutput": {
      "type": "object",
      "description": "Expected output data for validation.",
      "additionalProperties": true
    },
    "testType": {
      "type": "string",
      "enum": ["unit", "integration", "regression", "schema_validation"],
      "description": "Type of test being conducted."
    },
    "executionStatus": {
      "type": "string",
      "enum": ["pending", "running", "passed", "failed"],
      "description": "Status of the test execution."
    },
    "result": {
      "type": "object",
      "description": "Actual result captured during test execution.",
      "additionalProperties": true
    },
    "errorMessage": {
      "type": "string",
      "description": "Optional error message if test fails."
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "Time the test was executed or completed."
    },
    "validationRules": {
      "type": "array",
      "description": "List of validation rules applied to the test.",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string",
            "description": "Field being validated."
          },
          "rule": {
            "type": "string",
            "description": "Validation rule type."
          },
          "expected": {
            "description": "Expected value or pattern."
          }
        },
        "required": ["field", "rule"]
      }
    }
  },
  "required": ["testId", "relatedTaskId", "input", "expectedOutput", "testType", "executionStatus"],
  "additionalProperties": false
}
```

### Key Components:

- **testId**: Unique identifier for each test case
- **relatedTaskId**: Links test to specific task or DSL node
- **testType**: Classification of test (unit, integration, regression, schema_validation)
- **input/expectedOutput**: Test data and expected results
- **executionStatus**: Current test execution state
- **validationRules**: Configurable validation criteria
- **result**: Actual test execution output for comparison

## Suggested Execution Model
> Automated test generation with continuous validation and regression testing.
> Standard lifecycle: generate → execute → validate → report → iterate