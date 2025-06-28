---
version: v1.0.0
status: frozen
releaseDate: 2025-06-28
source: MPLP
license: MIT
---

# MPLP.Context — 上下文协议

## 协议目的
定义多智能体项目中用于共享状态与上下文的数据池机制，所有协议模块与 Agent 皆可读取与更新此上下文。

## 协议结构（待补充）
> TODO：定义上下文结构、Context ID、内存格式等字段要求

## 建议执行模型
> 使用基于 JSON 的键值存储结构，配合持久化后端（如 Qdrant、Redis）
> 生命周期建议：初始化 → 更新 → 解析 → 持久化