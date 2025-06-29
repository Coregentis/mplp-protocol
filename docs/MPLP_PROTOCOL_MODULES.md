# MPLP Protocol Modules（协议模块结构定义）

本文件定义了 Multi-Agent Project Lifecycle Protocol（MPLP）所包含的核心协议模块。每个模块承担项目生命周期中的特定职责，具有清晰的边界、数据结构与执行模型。

**重要说明**：MPLP 协议模块的执行受到 **MPLP Rules Framework（规则框架）** 的严格约束和指导。规则框架是使用 MPLP 协议簇的根本原则，确保协议的一致性、质量和安全性。

## 协议模块概览

MPLP 包含 **10 个核心协议模块**，所有模块均为必需模块，共同构成完整的多智能体项目生命周期管理框架。

### 🔧 MPLP Rules Framework（规则框架）

规则框架是 MPLP 协议簇的治理核心，提供了 **75 条规则** 分布在 **6 个主要类别** 中：

- **执行规则 (Execution Rules)**：30 条规则，管控协议执行、状态转换和错误处理
- **验证规则 (Validation Rules)**：18 条规则，确保数据验证、模式合规和协议兼容性
- **集成规则 (Integration Rules)**：14 条规则，治理 API 集成、系统集成和外部服务连接
- **业务规则 (Business Rules)**：8 条规则，定义业务流程、项目治理和组织合规
- **质量规则 (Quality Rules)**：6 条规则，保障质量标准、性能基准和代码质量
- **安全规则 (Security Rules)**：6 条规则，强化安全策略、访问控制和数据保护

**规则框架位置**：`dev/rules/` 目录包含完整的规则定义和索引文件。

## 协议模块列表

| Module ID     | English Name            | 中文名称         | Status | Schema | Docs | Examples | Description (EN)                                              | 中文职责说明                                        |
|---------------|-------------------------|------------------|--------|--------|------|----------|---------------------------------------------------------------|-----------------------------------------------------|
| MPLP.Context  | Context Protocol        | 上下文协议       | ✅ 完成 | ✅     | ✅   | ✅       | Maintains the global state and shared context for all agents. | 提供多 Agent 共享的上下文池，贯穿项目始终           |
| MPLP.Plan     | Planning Protocol       | 规划协议         | ✅ 完成 | ✅     | ✅   | ✅       | Defines structured tasks, agent assignments, and DSL schemas. | 定义结构化任务与字段规范，Agent 调度与计划来源       |
| MPLP.Confirm  | Confirmation Protocol   | 确认协议         | ✅ 完成 | ✅     | ✅   | ✅       | Freezes intent and enables multi-round confirmation.          | 执行前冻结计划，防跑偏，适配非技术用户               |
| MPLP.Execute  | Execution Protocol      | 执行协议         | ✅ 完成 | ✅     | ✅   | ✅       | Handles execution, I/O normalization, and tool/API calls.     | 调用工具和外部接口，标准化输入输出                   |
| MPLP.Learn    | Learning Protocol       | 学习协议         | ✅ 完成 | ✅     | ✅   | ✅       | Enables self-improvement, failure analysis, and strategy evolution. | 失败分析与学习优化机制，增强 Agent 成长能力      |
| MPLP.Trace    | Traceability Protocol   | 追踪协议         | ✅ 完成 | ✅     | ✅   | ✅       | Records all actions, states, and transitions for auditability. | 项目流程追踪、审计与回溯                             |
| MPLP.Test     | Testing Protocol        | 测试协议         | ✅ 完成 | ✅     | ✅   | ✅       | Generates automated test cases and verifies output integrity. | 自动生成测试用例与回归验证，保障任务质量与安全性      |
| MPLP.Role     | Role Management Protocol | 角色管理协议     | ✅ 完成 | ✅     | ✅   | ✅       | Defines agent roles, capabilities, and tool bindings for team coordination. | 定义 Agent 角色、能力与工具绑定，支持团队协作        |
| MPLP.Workflow | Workflow Protocol       | 工作流协议       | ✅ 完成 | ✅     | ✅   | ✅       | Orchestrates standard development processes and flow control mechanisms. | 编排标准开发流程，提供流程控制与管理机制             |
| MPLP.Delivery | Delivery Protocol       | 交付物协议       | ✅ 完成 | ✅     | ✅   | ✅       | Manages project deliverables and cross-project dependency coordination. | 管理项目交付物与跨项目依赖协调                       |

## 项目结构映射

### Rules Framework（规则框架）
规则框架的完整定义位于：
```
dev/rules/
├── README.md                    # 规则框架总览
├── index.json                   # 规则索引（75条规则）
├── execution/                   # 执行规则（30条）
│   ├── protocol-execution.json
│   ├── state-transitions.json
│   └── error-handling.json
├── validation/                  # 验证规则（18条）
│   ├── data-validation.json
│   └── protocol-compatibility.json
├── integration/                 # 集成规则（14条）
│   ├── api-integration.json
│   └── system-integration.json
├── business/                    # 业务规则（8条）
│   ├── project-governance.json
│   └── business-processes.json
├── quality/                     # 质量规则（6条）
│   ├── performance-standards.json
│   └── code-standards.json
└── security/                    # 安全规则（6条）
    ├── access-control.json
    └── data-protection.json
```

### Schema 定义
所有协议模块的 JSON Schema 定义位于：
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
└── index.json  # 协议索引文件
```

### 多语言文档
每个协议模块提供完整的多语言文档支持：
```
docs/
├── zh/          # 中文文档
├── en/          # 英文文档
├── tw/          # 繁体中文文档
└── schemas/     # Schema 说明文档
```

### 示例文件
每个协议模块提供标准示例：
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

## 协议模块依赖关系

### 🎯 规则框架治理层
**MPLP Rules Framework** 作为治理层，对所有协议模块提供横向约束：
- **执行治理**：所有协议模块的执行都受执行规则约束
- **验证治理**：所有数据流转都受验证规则检查
- **集成治理**：跨模块交互都受集成规则管控
- **业务治理**：业务逻辑都受业务规则规范
- **质量治理**：所有输出都受质量规则保障
- **安全治理**：所有操作都受安全规则保护

### 核心依赖链
1. **Context** → 所有其他模块（提供全局上下文）
2. **Role** → Plan, Execute, Workflow（定义执行主体）
3. **Plan** → Confirm, Execute（任务规划与执行）
4. **Confirm** → Execute（确认后执行）
5. **Execute** → Learn, Trace, Test（执行产生学习、追踪、测试数据）
6. **Workflow** → Plan, Execute, Delivery（流程编排）
7. **Delivery** → Test, Trace（交付物验证与追踪）

### 数据流向
```
                    🔧 MPLP Rules Framework (治理层)
                    ├── Execution Rules (执行规则)
                    ├── Validation Rules (验证规则)
                    ├── Integration Rules (集成规则)
                    ├── Business Rules (业务规则)
                    ├── Quality Rules (质量规则)
                    └── Security Rules (安全规则)
                              ↓ (横向约束)
    ┌─────────────────────────────────────────────────────────────┐
    │                    协议模块执行层                            │
    │                                                             │
    │  Context (全局状态)                                          │
    │      ↓                                                      │
    │  Role (角色定义) → Plan (任务规划) → Confirm (确认冻结)        │
    │      ↓                ↓                ↓                    │
    │  Workflow (流程编排) → Execute (执行) → Learn (学习优化)       │
    │      ↓                ↓                ↓                    │
    │  Delivery (交付管理) ← Test (测试验证) ← Trace (追踪记录)      │
    └─────────────────────────────────────────────────────────────┘
```

## 协议版本信息

- **当前版本**：v1.0.0
- **Schema 标准**：JSON Schema Draft 2020-12
- **命名空间**：`https://coregentis.org/schemas/v1.0/`
- **最后更新**：2025-06-28

## 协议特性

### ✅ 已实现特性
- [x] 完整的 10 个核心协议模块
- [x] **MPLP Rules Framework（75 条治理规则）**
- [x] JSON Schema 规范定义
- [x] 多语言文档支持（中文、英文、繁体中文）
- [x] 标准化示例文件
- [x] 协议索引与版本管理
- [x] 模块间依赖关系定义
- [x] **规则驱动的协议执行治理**
- [x] **6 大类规则覆盖所有协议模块**

### 🔄 协议设计原则
1. **模块化**：每个协议模块职责单一，边界清晰
2. **标准化**：统一的 JSON Schema 规范
3. **可扩展**：支持自定义字段与扩展
4. **多语言**：完整的国际化支持
5. **版本化**：严格的版本管理与兼容性保证
6. **工具中立**：不绑定特定实现技术
7. **🎯 规则驱动**：所有协议执行受规则框架严格治理
8. **🔒 安全优先**：内置安全规则确保数据保护和访问控制
9. **📊 质量保障**：质量规则确保协议实施的高标准
10. **🔄 持续改进**：学习规则支持协议和实施的持续优化

## 使用指南

### 🔧 规则框架集成
在实施 MPLP 协议时，必须集成规则框架：
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

### 协议引用
```json
{
  "$schema": "https://coregentis.org/schemas/v1.0/Context.schema.json",
  "contextId": "project-001",
  "projectName": "Multi-Agent System"
}
```

### 文档查阅
- **规则框架**：`dev/rules/README.md` 和 `dev/rules/index.json`
- **中文文档**：`docs/zh/{ModuleName}.md`
- **英文文档**：`docs/en/{ModuleName}.md`
- **Schema 说明**：`docs/schemas/{ModuleName}.md`
- **示例参考**：`examples/{ModuleName}.example.json`
- **规则定义**：`dev/rules/{category}/{rule-file}.json`

---

> **重要提醒**：
> 
> 1. **规则框架是核心**：MPLP Rules Framework 是使用 MPLP 协议簇的根本原则，任何协议实施都必须遵循规则框架的约束。
> 
> 2. **完整性保证**：本文档反映了 MPLP 项目的当前实际状态。所有协议模块均已完成基础定义，具备完整的 Schema、文档、示例和规则支持。
> 
> 3. **治理优先**：在开发 MPLP 兼容系统时，请优先参考 `dev/rules/` 目录中的治理规则，确保实施符合 MPLP 标准。