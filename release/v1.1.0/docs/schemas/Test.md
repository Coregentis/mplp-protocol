---
version: 1.0
created: 2025-01-27T10:00:00+08:00
last_updated: 2025-01-27T10:00:00+08:00
maintainer: MPLP Development Team
applicable_scope: Multi-Agent Project Lifecycle Protocol
---

# MPLP.Test Schema

## Overview

**MPLP.Test** defines automated test cases, test execution metadata, and result validation for multi-agent systems. It provides a standardized framework for ensuring quality and correctness of agent-generated outputs and system behaviors.

## Purpose

- **Quality Assurance**: Ensure agent outputs meet specified requirements
- **Automated Testing**: Define repeatable test cases for continuous validation
- **Result Validation**: Compare actual outputs against expected results
- **Regression Prevention**: Detect when changes break existing functionality
- **Schema Compliance**: Validate outputs conform to defined schemas

## Schema Definition

### Basic Information

- **Schema ID**: `https://coregentis.org/schemas/v1.0/Test.schema.json`
- **Version**: 1.0.0
- **Type**: `object`

### Property Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `testId` | `string` | ✓ | Unique identifier for the test case |
| `relatedTaskId` | `string` | ✓ | Reference to the task or DSL node being tested |
| `input` | `object` | ✓ | Input data for the test case |
| `expectedOutput` | `object` | ✓ | Expected output data for validation |
| `testType` | `string` | ✓ | Type of test being conducted |
| `executionStatus` | `string` | ✗ | Status of the test execution |
| `result` | `object` | ✗ | Actual result captured during test execution |
| `errorMessage` | `string` | ✗ | Optional error message if test fails |
| `timestamp` | `string` | ✗ | Time the test was executed or completed |

### testType Enumeration Values

- `unit`: Tests individual components or functions
- `integration`: Tests interaction between multiple components
- `regression`: Tests to ensure existing functionality still works
- `schema_validation`: Tests to validate output schema compliance

### executionStatus Enumeration Values

- `pending`: Test is queued but not yet executed
- `running`: Test is currently being executed
- `passed`: Test completed successfully
- `failed`: Test failed validation

## Execution Model

### Unit Test Example

```json
{
  "testId": "test_user_api_creation",
  "relatedTaskId": "task_create_user_api",
  "input": {
    "endpoint": "/api/users",
    "method": "POST",
    "schema": {
      "username": "string",
      "email": "string",
      "password": "string"
    }
  },
  "expectedOutput": {
    "files_created": [
      "src/routes/users.js",
      "src/models/User.js",
      "tests/users.test.js"
    ],
    "endpoints_implemented": ["/api/users"],
    "validation_rules": ["email_format", "password_strength"]
  },
  "testType": "unit",
  "executionStatus": "passed",
  "result": {
    "files_created": [
      "src/routes/users.js",
      "src/models/User.js",
      "tests/users.test.js"
    ],
    "endpoints_implemented": ["/api/users"],
    "validation_rules": ["email_format", "password_strength"],
    "code_quality_score": 0.92
  },
  "timestamp": "2025-01-27T10:05:30Z"
}
```

### Integration Test Example

```json
{
  "testId": "test_user_workflow_integration",
  "relatedTaskId": "workflow_user_management",
  "input": {
    "workflow_steps": [
      "create_user_api",
      "setup_authentication",
      "configure_permissions"
    ],
    "test_data": {
      "username": "testuser",
      "email": "test@example.com",
      "role": "user"
    }
  },
  "expectedOutput": {
    "workflow_completed": true,
    "user_created": true,
    "auth_configured": true,
    "permissions_set": ["read_profile", "update_profile"]
  },
  "testType": "integration",
  "executionStatus": "passed",
  "result": {
    "workflow_completed": true,
    "user_created": true,
    "auth_configured": true,
    "permissions_set": ["read_profile", "update_profile"],
    "execution_time_ms": 2500
  },
  "timestamp": "2025-01-27T10:08:15Z"
}
```

### Failed Test Example

```json
{
  "testId": "test_database_schema_validation",
  "relatedTaskId": "task_create_database_schema",
  "input": {
    "tables": ["users", "products", "orders"],
    "relationships": [
      {"from": "orders", "to": "users", "type": "many_to_one"},
      {"from": "orders", "to": "products", "type": "many_to_many"}
    ]
  },
  "expectedOutput": {
    "schema_valid": true,
    "tables_created": 3,
    "foreign_keys": 2,
    "indexes_created": ["idx_user_email", "idx_product_sku"]
  },
  "testType": "schema_validation",
  "executionStatus": "failed",
  "result": {
    "schema_valid": false,
    "tables_created": 2,
    "foreign_keys": 1,
    "indexes_created": ["idx_user_email"]
  },
  "errorMessage": "Missing foreign key constraint between orders and products tables",
  "timestamp": "2025-01-27T10:12:45Z"
}
```

### Test Execution Flow

1. **Test Definition**: Create test cases with inputs and expected outputs
2. **Test Scheduling**: Queue tests for execution based on task completion
3. **Test Execution**: Run tests against actual agent outputs
4. **Result Comparison**: Compare actual results with expected outputs
5. **Status Update**: Record test results and execution status
6. **Reporting**: Generate test reports and failure notifications

### Recommended Implementation

- **Test Automation**: Integrate tests into CI/CD pipelines
- **Parallel Execution**: Run independent tests concurrently
- **Test Data Management**: Maintain test datasets and fixtures
- **Result Archival**: Store test results for historical analysis
- **Failure Analysis**: Implement detailed failure reporting and debugging
- **Test Coverage**: Track which tasks and scenarios are tested

## Test Types and Patterns

### Unit Tests

- Test individual agent capabilities
- Validate single task outputs
- Check schema compliance
- Verify error handling

### Integration Tests

- Test multi-agent workflows
- Validate cross-task dependencies
- Check data flow between agents
- Verify system-level behaviors

### Regression Tests

- Ensure existing functionality remains intact
- Test against known good outputs
- Validate backward compatibility
- Check performance benchmarks

### Schema Validation Tests

- Verify output conforms to defined schemas
- Check required fields are present
- Validate data types and formats
- Ensure constraint compliance

## Validation Strategies

### Exact Match Validation

```json
{
  "validation_type": "exact_match",
  "expected": {"status": "success", "count": 5},
  "actual": {"status": "success", "count": 5},
  "result": "passed"
}
```

### Pattern Matching Validation

```json
{
  "validation_type": "pattern_match",
  "expected_patterns": {
    "email": "^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$",
    "phone": "^\\+?[1-9]\\d{1,14}$"
  },
  "actual": {
    "email": "user@example.com",
    "phone": "+1234567890"
  },
  "result": "passed"
}
```

### Threshold-based Validation

```json
{
  "validation_type": "threshold",
  "expected_min": 0.8,
  "expected_max": 1.0,
  "actual": 0.92,
  "metric": "code_quality_score",
  "result": "passed"
}
```

## Related Protocols

- **MPLP.Execute**: Task execution that generates outputs to test
- **MPLP.Plan**: Task definitions that require testing
- **MPLP.Trace**: Execution tracking for test correlation
- **MPLP.Confirm**: Validation and approval workflows
- **MPLP.Learn**: Learning from test results and failures

## Notes

- Tests should be deterministic and repeatable
- Consider implementing test data isolation and cleanup
- Maintain test cases alongside task definitions
- Use meaningful test identifiers for easy debugging
- Implement proper timeout handling for long-running tests
- Consider implementing test result caching for performance