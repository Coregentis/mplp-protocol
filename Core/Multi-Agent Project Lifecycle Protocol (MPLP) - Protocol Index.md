# Multi-Agent Project Lifecycle Protocol (MPLP) - Protocol Index

This file provides quick navigation and core asset index for the Multi-Agent Project Lifecycle Protocol (MPLP).

## 🎯 Core Protocol Modules (10 modules)

| Module ID | Chinese Name | English Name | Protocol Document | Schema | Example | Status |
|-----------|--------------|--------------|-------------------|--------|---------|--------|
| MPLP.Context | 上下文协议 | Context Protocol | [protocols/Context.md](protocols/Context.md) | [schemas/Context.schema.json](schemas/Context.schema.json) | [examples/Context.example.json](examples/Context.example.json) | ✅ Complete |
| MPLP.Plan | 规划协议 | Planning Protocol | [protocols/Plan.md](protocols/Plan.md) | [schemas/Plan.schema.json](schemas/Plan.schema.json) | [examples/Plan.example.json](examples/Plan.example.json) | ✅ Complete |
| MPLP.Confirm | 确认协议 | Confirmation Protocol | [protocols/Confirm.md](protocols/Confirm.md) | [schemas/Confirm.schema.json](schemas/Confirm.schema.json) | [examples/Confirm.example.json](examples/Confirm.example.json) | ✅ Complete |
| MPLP.Execute | 执行协议 | Execution Protocol | [protocols/Execute.md](protocols/Execute.md) | [schemas/Execute.schema.json](schemas/Execute.schema.json) | [examples/Execute.example.json](examples/Execute.example.json) | ✅ Complete |
| MPLP.Learn | 学习协议 | Learning Protocol | [protocols/Learn.md](protocols/Learn.md) | [schemas/Learn.schema.json](schemas/Learn.schema.json) | [examples/Learn.example.json](examples/Learn.example.json) | ✅ Complete |
| MPLP.Trace | 追踪协议 | Traceability Protocol | [protocols/Trace.md](protocols/Trace.md) | [schemas/Trace.schema.json](schemas/Trace.schema.json) | [examples/Trace.example.json](examples/Trace.example.json) | ✅ Complete |
| MPLP.Test | 测试协议 | Testing Protocol | [protocols/Test.md](protocols/Test.md) | [schemas/Test.schema.json](schemas/Test.schema.json) | [examples/Test.example.json](examples/Test.example.json) | ✅ Complete |
| MPLP.Role | 角色管理协议 | Role Management Protocol | [protocols/Role.md](protocols/Role.md) | [schemas/Role.schema.json](schemas/Role.schema.json) | [examples/Role.example.json](examples/Role.example.json) | ✅ Complete |
| MPLP.Workflow | 工作流协议 | Workflow Protocol | [protocols/Workflow.md](protocols/Workflow.md) | [schemas/Workflow.schema.json](schemas/Workflow.schema.json) | [examples/Workflow.example.json](examples/Workflow.example.json) | ✅ Complete |
| MPLP.Delivery | 交付物协议 | Delivery Protocol | [protocols/Delivery.md](protocols/Delivery.md) | [schemas/Delivery.schema.json](schemas/Delivery.schema.json) | [examples/Delivery.example.json](examples/Delivery.example.json) | ✅ Complete |

## 🔧 MPLP Rules Framework (75 rules)

| Rule Category | Rule Count | Directory Location | Primary Responsibilities |
|---------------|------------|-------------------|-------------------------|
| Execution Rules | 30 rules | [rules/execution/](rules/execution/) | Control protocol execution, state transitions, and error handling |
| Validation Rules | 18 rules | [rules/validation/](rules/validation/) | Ensure data validation, schema compliance, and protocol compatibility |
| Integration Rules | 14 rules | [rules/integration/](rules/integration/) | Govern API integration, system integration, and external service connections |
| Business Rules | 8 rules | [rules/business/](rules/business/) | Define business processes, project governance, and organizational compliance |
| Quality Rules | 6 rules | [rules/quality/](rules/quality/) | Ensure quality standards, performance benchmarks, and code quality |
| Security Rules | 6 rules | [rules/security/](rules/security/) | Strengthen security policies, access control, and data protection |

**Rules Framework Overview**: [rules/README.md](rules/README.md)  
**Rules Index File**: [rules/index.json](rules/index.json)

## 📚 Core Documentation

| Document Name | File Path | Description |
|---------------|-----------|-------------|
| Protocol Module Structure Definition | [docs/MPLP_PROTOCOL_MODULES.md](docs/MPLP_PROTOCOL_MODULES.md) | Defines MPLP's 10 core protocol modules and rules framework |
| Open Source Protocol Release Plan | [docs/mplp-dev-plan.md](docs/mplp-dev-plan.md) | MPLP open source ecosystem development and release strategy |
| Core Directory Documentation | [README.md](README.md) | Core directory structure and usage guide |

## 📄 License Strategy

| License Type | Applicable Content | License File | Description |
|--------------|-------------------|--------------|-------------|
| Apache 2.0 | Protocol specifications, Schema, rules framework | [LICENSE-APACHE-2.0](License/LICENSE-APACHE-2.0) | Core protocol content with patent protection |
| MIT | Example code, SDK implementations, reference tools | [LICENSE-MIT](License/LICENSE-MIT) | Implementation code for maximum compatibility |

**License Related Documents**:
- [License Strategy Details](License/LICENSING_STRATEGY.md) - Complete dual-license strategy explanation
- [License Notice](License/LICENSE_NOTICE.md) - File type to license mapping

## 🔗 Schema Index

**Schema Index File**: [schemas/index.json](schemas/index.json)

All protocol module JSON Schema definitions follow JSON Schema Draft 2020-12 standard, with namespace: `https://coregentis.org/schemas/v1.0/`

## 📋 Quick Access

### Developer Quick Start
1. 📖 Read [README.md](README.md) - Understand Core directory structure
2. 📋 Reference [docs/MPLP_PROTOCOL_MODULES.md](docs/MPLP_PROTOCOL_MODULES.md) - Learn protocol modules
3. 🔧 Follow [rules/README.md](rules/README.md) - Understand rules framework
4. 💡 Check [examples/](examples/) - Reference standard examples

### Protocol Implementers
1. 📊 Use [schemas/](schemas/) - For data validation
2. 📝 Reference [protocols/](protocols/) - Understand protocol details
3. ⚙️ Follow [rules/](rules/) - Ensure compliant implementation
4. 🧪 Test [examples/](examples/) - Verify implementation correctness

### Project Managers
1. 📈 Review [docs/mplp-dev-plan.md](docs/mplp-dev-plan.md) - Understand release plan
2. 🎯 Reference [rules/business/](rules/business/) - Understand business rules
3. 🔒 Monitor [rules/security/](rules/security/) - Ensure security compliance
4. 📊 Track [rules/quality/](rules/quality/) - Maintain quality standards

## 🎨 Protocol Dependency Relationships

```
**MPLP Rules Framework (Governance Layer)**
- Execution Rules
- Validation Rules  
- Integration Rules
- Business Rules
- Quality Rules
- Security Rules

↓ *(Cross-cutting Constraints)*

**Protocol Module Execution Layer**

```
Context (Global State)
    ↓
Role (Role Definition) → Plan (Task Planning)
    ↓                       ↓
Workflow (Process Orchestration) → Confirm (Confirmation Freeze)
    ↓                                  ↓
Delivery (Delivery Management) → Execute (Execution)
    ↓                               ↓
Test (Testing Verification) ← Learn (Learning Optimization)
    ↓                           ↓
Trace (Tracking Records) ←──────┘
```
```

## 📊 Statistics

- **Protocol Modules**: 10 modules (all complete)
- **Total Rules**: 75 rules (distributed across 6 categories)
- **Schema Files**: 11 files (10 protocols + 1 index)
- **Example Files**: 10 files (one per protocol)
- **Protocol Documents**: 10 documents (one per protocol)
- **Core Documents**: 3 documents (module definition, release plan, usage guide)

---

> **Version Information**: MPLP Core v1.0.0 | Last Updated: 2025-06-29
> 
> **Important Note**: This index file provides complete navigation for the Core directory. All paths are relative paths based on the Core directory.