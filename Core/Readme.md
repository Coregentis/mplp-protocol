# Multi-Agent Project Lifecycle Protocol (MPLP) - Readme

This documentation describes all core components of the Multi-Agent Project Lifecycle Protocol (MPLP), serving as the central asset collection for the protocol.

## 📁 Directory Structure

```
MPLP-Core/
├── Multi-Agent Project Lifecycle Protocol (MPLP) - Core Documentation.md  # This file - MPLP core documentation
├── protocols/                   # Protocol module definitions
│   ├── Context.md              # Context protocol
│   ├── Plan.md                 # Planning protocol
│   ├── Confirm.md              # Confirmation protocol
│   ├── Execute.md              # Execution protocol
│   ├── Learn.md                # Learning protocol
│   ├── Trace.md                # Tracing protocol
│   ├── Test.md                 # Testing protocol
│   ├── Role.md                 # Role management protocol
│   ├── Workflow.md             # Workflow protocol
│   └── Delivery.md             # Delivery protocol
├── rules/                       # MPLP rules framework (75 rules)
│   ├── README.md               # Rules framework overview
│   ├── index.json              # Rules index
│   ├── execution/              # Execution rules (30 rules)
│   ├── validation/             # Validation rules (18 rules)
│   ├── integration/            # Integration rules (14 rules)
│   ├── business/               # Business rules (8 rules)
│   ├── quality/                # Quality rules (6 rules)
│   └── security/               # Security rules (6 rules)
├── schemas/                     # JSON Schema definitions
│   ├── Context.schema.json     # Context protocol schema
│   ├── Plan.schema.json        # Planning protocol schema
│   ├── Confirm.schema.json     # Confirmation protocol schema
│   ├── Execute.schema.json     # Execution protocol schema
│   ├── Learn.schema.json       # Learning protocol schema
│   ├── Trace.schema.json       # Tracing protocol schema
│   ├── Test.schema.json        # Testing protocol schema
│   ├── Role.schema.json        # Role management protocol schema
│   ├── Workflow.schema.json    # Workflow protocol schema
│   ├── Delivery.schema.json    # Delivery protocol schema
│   └── index.json              # Schema index file
├── examples/                    # Standard example files
│   ├── Context.example.json    # Context protocol example
│   ├── Plan.example.json       # Planning protocol example
│   ├── Confirm.example.json    # Confirmation protocol example
│   ├── Execute.example.json    # Execution protocol example
│   ├── Learn.example.json      # Learning protocol example
│   ├── Trace.example.json      # Tracing protocol example
│   ├── Test.example.json       # Testing protocol example
│   ├── Role.example.json       # Role management protocol example
│   ├── Workflow.example.json   # Workflow protocol example
│   └── Delivery.example.json   # Delivery Protocol example
└── docs/                        # Core documentation
    ├── MPLP_PROTOCOL_MODULES.md # Protocol module structure definition
    └── mplp-dev-plan.md        # MPLP open source protocol release plan
```

## 🎯 Core Components Overview

### 1. Protocol Modules (protocols/)
Contains MPLP's 10 core protocol modules, each handling specific responsibilities in the project lifecycle:

- **Context Protocol**: Provides shared context pool for multi-agent systems
- **Planning Protocol**: Defines structured tasks and field specifications
- **Confirmation Protocol**: Freezes plans before execution to prevent deviation
- **Execution Protocol**: Handles tool invocation and external interfaces with standardized I/O
- **Learning Protocol**: Failure analysis and learning optimization mechanisms
- **Traceability Protocol**: Project flow tracking, auditing, and retrospection
- **Testing Protocol**: Automated test case generation and regression validation
- **Role Management Protocol**: Defines agent roles, capabilities, and tool bindings
- **Workflow Protocol**: Orchestrates standard development processes
- **Delivery Protocol**: Manages project deliverables and cross-project dependency coordination

### 2. Rules Framework (rules/)
MPLP Rules Framework serves as the governance core of the protocol suite, containing 75 rules distributed across 6 major categories:

- **Execution Rules (30 rules)**: Control protocol execution, state transitions, and error handling
- **Validation Rules (18 rules)**: Ensure data validation, schema compliance, and protocol compatibility
- **Integration Rules (14 rules)**: Govern API integration, system integration, and external service connections
- **Business Rules (8 rules)**: Define business processes, project governance, and organizational compliance
- **Quality Rules (6 rules)**: Ensure quality standards, performance benchmarks, and code quality
- **Security Rules (6 rules)**: Strengthen security policies, access control, and data protection

### 3. Schema Definitions (schemas/)
JSON Schema definitions for all protocol modules, following JSON Schema Draft 2020-12 standard, providing:
- Data structure validation
- Type constraints
- Field specifications
- Version compatibility

### 4. Example Files (examples/)
Standard examples for each protocol module, demonstrating:
- Correct data formats
- Typical use cases
- Best practices
- Integration approaches

### 5. Core Documentation (docs/)
Contains core design documents for the project:
- Protocol module structure definitions
- Open source protocol release plans

## 🔧 Usage Guide

### Protocol Reference
```json
{
  "$schema": "https://coregentis.org/schemas/v1.0/Context.schema.json",
  "contextId": "project-001",
  "projectName": "Multi-Agent System"
}
```

### Rules Framework Integration
```json
{
  "ruleEngine": {
    "rulesPath": "Core/rules/",
    "categories": ["execution", "validation", "integration", "business", "quality", "security"],
    "enforcement": "mandatory"
  }
}
```

## 📋 Version Information

- **Current Version**: v1.0.0
- **Schema Standard**: JSON Schema Draft 2020-12
- **Namespace**: `https://coregentis.org/schemas/v1.0/`
- **Last Updated**: 2025-06-29

## 📄 Licensing Strategy

MPLP adopts a dual licensing strategy, balancing openness with commercial friendliness:

### Apache License 2.0
Applies to core protocol content:
- 📋 Protocol modules (`protocols/`)
- 🔧 JSON Schema (`schemas/`) 
- 📏 Governance rules (`rules/`)
- 📚 Specification documents (`docs/`)

### MIT License
Applies to implementation code:
- 💻 Example code (`examples/`)
- 🛠️ SDK implementations
- 🔧 Reference tools

**License Files**:
- [Apache License 2.0](./License/LICENSE-APACHE-2.0)
- [MIT License](./License/LICENSE-MIT)
- [Licensing Strategy Details](./License/LICENSING_STRATEGY.md)
- [License Notice](./License/LICENSE_NOTICE.md)

## 🎨 Design Principles

1. **Modularity**: Each protocol module has single responsibility with clear boundaries
2. **Standardization**: Unified JSON Schema specifications
3. **Extensibility**: Support for custom fields and extensions
4. **Rule-Driven**: All protocol execution is strictly governed by the rules framework
5. **Security First**: Built-in security rules ensure data protection and access control
6. **Quality Assurance**: Quality rules ensure high standards in protocol implementation
7. **Continuous Improvement**: Learning rules support continuous optimization of protocols and implementations

## 🚀 Quick Start

1. **Understand Architecture**: Read `architecture/ARCHITECTURE.md`
2. **Learn Protocols**: Review `docs/MPLP_PROTOCOL_MODULES.md`
3. **View Examples**: Reference standard examples in `examples/` directory
4. **Validate Schema**: Use JSON Schema in `schemas/` directory for validation
5. **Follow Rules**: Reference governance rules in `rules/` directory

---

> **Important Notes**: 
> 
> 1. **Rules Framework is Core**: MPLP Rules Framework is the fundamental principle for using MPLP protocol suite
> 2. **Completeness Guarantee**: This Core directory contains all core assets of the MPLP project
> 3. **Governance Priority**: When developing MPLP-compatible systems, prioritize constraints from the rules framework