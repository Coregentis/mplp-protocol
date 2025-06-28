# MPLP Protocol Modules（协议模块结构定义）

本文件定义了 Multi-Agent Project Lifecycle Protocol（MPLP）所包含的核心协议模块，每个模块承担一个不可替代的生命周期职责，具有清晰的边界、职责与数据流要求。

| Module ID     | English Name            | 中文名称         | Required | Description (EN)                                              | 中文职责说明                                        |
|---------------|-------------------------|------------------|----------|---------------------------------------------------------------|-----------------------------------------------------|
| MPLP.Context  | Context Protocol        | 上下文协议       | ✅ 必须   | Maintains the global state and shared context for all agents. | 提供多 Agent 共享的上下文池，贯穿项目始终           |
| MPLP.Plan     | Planning Protocol       | 规划协议         | ✅ 必须   | Defines structured tasks, agent assignments, and DSL schemas. | 定义结构化任务与字段规范，Agent 调度与计划来源       |
| MPLP.Confirm  | Confirmation Protocol   | 确认协议         | ✅ 必须   | Freezes intent and enables multi-round confirmation.          | 执行前冻结计划，防跑偏，适配非技术用户               |
| MPLP.Execute  | Execution Protocol      | 执行协议         | ✅ 必须   | Handles execution, I/O normalization, and tool/API calls.     | 调用工具和外部接口，标准化输入输出                   |
| MPLP.Learn    | Learning Protocol       | 学习协议         | ✅ 必须   | Enables self-improvement, failure analysis, and strategy evolution. | 失败分析与学习优化机制，增强 Agent 成长能力      |
| MPLP.Trace    | Traceability Protocol   | 追踪协议         | ✅ 必须   | Records all actions, states, and transitions for auditability. | 项目流程追踪、审计与回溯                             |
| MPLP.Test     | Testing Protocol        | 测试协议         | ✅ 必须   | Generates automated test cases and verifies output integrity. | 自动生成测试用例与回归验证，保障任务质量与安全性      |