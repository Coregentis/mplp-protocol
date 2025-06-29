# MPLP Protocol Modules

This document defines the core protocol modules included in the Multi-Agent Project Lifecycle Protocol (MPLP). Each module handles specific responsibilities in the project lifecycle, with clear boundaries, data structures, and execution models.

**Important Note**: The execution of MPLP protocol modules is strictly constrained and guided by the **MPLP Rules Framework**. The rules framework is the fundamental principle for using the MPLP protocol suite, ensuring protocol consistency, quality, and security.

## Protocol Module Overview

MPLP contains **10 core protocol modules**, all of which are required modules that together form a complete multi-agent project lifecycle management framework.

### 🔧 MPLP Rules Framework

The rules framework is the governance core of the MPLP protocol suite, providing **75 rules** distributed across **6 major categories**:

- **Execution Rules**: 30 rules governing protocol execution, state transitions, and error handling
- **Validation Rules**: 18 rules ensuring data validation, schema compliance, and protocol compatibility
- **Integration Rules**: 14 rules governing API integration, system integration, and external service connections
- **Business Rules**: 8 rules defining business processes, project governance, and organizational compliance
- **Quality Rules**: 6 rules ensuring quality standards, performance benchmarks, and code quality
- **Security Rules**: 6 rules strengthening security policies, access control, and data protection

**Rules Framework Location**: The `dev/rules/` directory contains complete rule definitions and index files.

## Protocol Module List

| Module ID     | English Name            | Status | Schema | Docs | Examples | Description                                                   | Responsibility                                      |
|---------------|-------------------------|--------|--------|------|----------|---------------------------------------------------------------|-----------------------------------------------------|
| MPLP.Context  | Context Protocol        | ✅ Complete | ✅     | ✅   | ✅       | Maintains the global state and shared context for all agents. | Provides shared context pool for multi-agents throughout the project |
| MPLP.Plan     | Planning Protocol       | ✅ Complete | ✅     | ✅   | ✅       | Defines structured tasks, agent assignments, and DSL schemas. | Defines structured tasks and field specifications, agent scheduling and planning source |
| MPLP.Confirm  | Confirmation Protocol   | ✅ Complete | ✅     | ✅   | ✅       | Freezes intent and enables multi-round confirmation.          | Freezes plans before execution to prevent deviation, suitable for non-technical users |
| MPLP.Execute  | Execution Protocol      | ✅ Complete | ✅     | ✅   | ✅       | Handles execution, I/O normalization, and tool/API calls.     | Calls tools and external interfaces, standardizes input/output |
| MPLP.Learn    | Learning Protocol       | ✅ Complete | ✅     | ✅   | ✅       | Enables self-improvement, failure analysis, and strategy evolution. | Failure analysis and learning optimization mechanism, enhances agent growth capabilities |
| MPLP.Trace    | Traceability Protocol   | ✅ Complete | ✅     | ✅   | ✅       | Records all actions, states, and transitions for auditability. | Project process tracking, auditing, and retrospection |
| MPLP.Test     | Testing Protocol        | ✅ Complete | ✅     | ✅   | ✅       | Generates automated test cases and verifies output integrity. | Automatically generates test cases and regression verification, ensures task quality and security |
| MPLP.Role     | Role Management Protocol | ✅ Complete | ✅     | ✅   | ✅       | Defines agent roles, capabilities, and tool bindings for team coordination. | Defines agent roles, capabilities, and tool bindings, supports team collaboration |
| MPLP.Workflow | Workflow Protocol       | ✅ Complete | ✅     | ✅   | ✅       | Orchestrates standard development processes and flow control mechanisms. | Orchestrates standard development processes, provides process control and management mechanisms |
| MPLP.Delivery | Delivery Protocol       | ✅ Complete | ✅     | ✅   | ✅       | Manages project deliverables and cross-project dependency coordination. | Manages project deliverables and cross-project dependency coordination |

## Project Structure Mapping

### Rules Framework
The complete definition of the rules framework is located at:
```
dev/rules/
├── README.md                    # 规则框架总览
├── index.json                   # 规则索引（75条规则）
├── execution/                   # 执行规则（30条）
│   ├── protocol-execution.json
│   ├── state-transitions.json
│   └── error-handling.json
├── validation/                  # Validation Rules (18 rules)
│   ├── data-validation.json
│   └── protocol-compatibility.json
├── integration/                 # Integration Rules (14 rules)
│   ├── api-integration.json
│   └── system-integration.json
├── business/                    # Business Rules (8 rules)
│   ├── project-governance.json
│   └── business-processes.json
├── quality/                     # Quality Rules (6 rules)
│   ├── performance-standards.json
│   └── code-standards.json
└── security/                    # Security Rules (6 rules)
    ├── access-control.json
    └── data-protection.json
```

### Schema Definitions
JSON Schema definitions for all protocol modules are located at:
```
schemas/
├── Context.schema.json
├── Plan.schema.json
├── Confirm.schema.json
├── Execute.schema.json
├── Learn.schema.json
├── Trace.schema.json
├── Test.schema.json
├── Role.schema.json
├── Workflow.schema.json
├── Delivery.schema.json
└── index.json  # Protocol index file
```

### Multilingual Documentation
Each protocol module provides complete multilingual documentation support:
```
docs/
├── zh/          # Chinese Documentation
├── en/          # English Documentation
├── tw/          # Traditional Chinese Documentation
└── schemas/     # Schema Documentation
```

### Example Files
Each protocol module provides standard examples:
```
examples/
├── Context.example.json
├── Plan.example.json
├── Confirm.example.json
├── Execute.example.json
├── Learn.example.json
├── Trace.example.json
├── Test.example.json
├── Role.example.json
├── Workflow.example.json
└── Delivery.example.json
```

## Protocol Module Dependencies

### 🎯 Rules Framework Governance Layer
**MPLP Rules Framework** serves as the governance layer, providing horizontal constraints for all protocol modules:
- **Execution Governance**: All protocol module executions are constrained by execution rules
- **Validation Governance**: All data flows are checked by validation rules
- **Integration Governance**: Cross-module interactions are controlled by integration rules
- **Business Governance**: Business logic is regulated by business rules
- **Quality Governance**: All outputs are ensured by quality rules
- **Security Governance**: All operations are protected by security rules

### Core Dependency Chain
1. **Context** → All other modules (provides global context)
2. **Role** → Plan, Execute, Workflow (defines execution entities)
3. **Plan** → Confirm, Execute (task planning and execution)
4. **Confirm** → Execute (execution after confirmation)
5. **Execute** → Learn, Trace, Test (execution generates learning, tracking, and testing data)
6. **Workflow** → Plan, Execute, Delivery (process orchestration)
7. **Delivery** → Test, Trace (deliverable verification and tracking)

### Data Flow
```
                    🔧 MPLP Rules Framework (Governance Layer)
                    ├── Execution Rules
                    ├── Validation Rules
                    ├── Integration Rules
                    ├── Business Rules
                    ├── Quality Rules
                    └── Security Rules
                              ↓ (Horizontal Constraints)
    ┌─────────────────────────────────────────────────────────────┐
    │                    Protocol Module Execution Layer          │
    │                                                             │
    │  Context (Global State)                                     │
    │      ↓                                                      │
    │  Role (Role Definition) → Plan (Task Planning) → Confirm (Confirmation Freeze) │
    │      ↓                ↓                ↓                    │
    │  Workflow (Process Orchestration) → Execute (Execution) → Learn (Learning Optimization) │
    │      ↓                ↓                ↓                    │
    │  Delivery (Delivery Management) ← Test (Testing Verification) ← Trace (Tracking Records) │
    └─────────────────────────────────────────────────────────────┘
```

## Protocol Version Information

- **Current Version**: v1.0.0
- **Schema Standard**: JSON Schema Draft 2020-12
- **Namespace**: `https://coregentis.org/schemas/v1.0/`
- **Last Updated**: 2025-06-28

## Protocol Features

### ✅ Implemented Features
- [x] Complete 10 core protocol modules
- [x] **MPLP Rules Framework (75 governance rules)**
- [x] JSON Schema specification definitions
- [x] Multilingual documentation support (Chinese, English, Traditional Chinese)
- [x] Standardized example files
- [x] Protocol indexing and version management
- [x] Inter-module dependency definitions
- [x] **Rule-driven protocol execution governance**
- [x] **6 major rule categories covering all protocol modules**

### 🔄 Protocol Design Principles
1. **Modularity**: Each protocol module has a single responsibility with clear boundaries
2. **Standardization**: Unified JSON Schema specifications
3. **Extensibility**: Support for custom fields and extensions
4. **Multilingual**: Complete internationalization support
5. **Versioning**: Strict version management and compatibility guarantees
6. **Tool Neutrality**: Not bound to specific implementation technologies
7. **🎯 Rule-Driven**: All protocol execution is strictly governed by the rules framework
8. **🔒 Security First**: Built-in security rules ensure data protection and access control
9. **📊 Quality Assurance**: Quality rules ensure high standards for protocol implementation
10. **🔄 Continuous Improvement**: Learning rules support continuous optimization of protocols and implementation

## Usage Guide

### 🔧 Rules Framework Integration
When implementing MPLP protocols, the rules framework must be integrated:
```json
{
  "ruleEngine": {
    "enabled": true,
    "rulesPath": "dev/rules/",
    "categories": ["execution", "validation", "integration", "business", "quality", "security"],
    "enforcement": "mandatory"
  }
}
```

### Protocol Reference
```json
{
  "$schema": "https://coregentis.org/schemas/v1.0/Context.schema.json",
  "contextId": "project-001",
  "projectName": "Multi-Agent System"
}
```

### Documentation Reference
- **Rules Framework**: `dev/rules/README.md` and `dev/rules/index.json`
- **Chinese Documentation**: `docs/zh/{ModuleName}.md`
- **English Documentation**: `docs/en/{ModuleName}.md`
- **Schema Documentation**: `docs/schemas/{ModuleName}.md`
- **Example Reference**: `examples/{ModuleName}.example.json`
- **Rule Definitions**: `dev/rules/{category}/{rule-file}.json`

---

> **Important Reminders**:
> 
> 1. **Rules Framework is Core**: MPLP Rules Framework is the fundamental principle for using the MPLP protocol suite. Any protocol implementation must follow the constraints of the rules framework.
> 
> 2. **Completeness Guarantee**: This document reflects the current actual state of the MPLP project. All protocol modules have completed basic definitions with complete Schema, documentation, examples, and rule support.
> 
> 3. **Governance Priority**: When developing MPLP-compatible systems, please prioritize referring to the governance rules in the `dev/rules/` directory to ensure implementation complies with MPLP standards.