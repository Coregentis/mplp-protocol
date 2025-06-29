---
翻译状态: 已完成
原文档: docs/en/Test.md
最后更新: 2025-06-28
翻译版本: 1.0
语言: zh
---

# MPLP.Test — Test Protocol

# MPLP.Test — Testing Protocol

## 目的
此协议生成自动化测试用例并验证输出完整性，以确保多智能体系统的质量和安全性。

## 结构

MPLP.Test 协议遵循以下 JSON 架构：

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

### 关键组件:

- **testId**: 每个测试用例的唯一标识符
- **relatedTaskId**: 将测试链接到特定任务或 DSL 节点
- **testType**: 测试分类（单元测试、集成测试、回归测试、架构验证）
- **input/expectedOutput**: 测试数据和预期结果
- **executionStatus**: 当前测试执行状态
- **validationRules**: 可配置的验证标准
- **result**: 用于比较的实际测试执行输出

## 建议执行模型
> 自动化测试生成，配合持续验证和回归测试。
> 标准生命周期：生成 → 执行 → 验证 → 报告 → 迭代