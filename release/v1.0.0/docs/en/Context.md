---
version: v1.0.0
status: frozen
releaseDate: 2025-06-28
source: MPLP
license: MIT
---

# Context Protocol

## Purpose
This protocol defines the global state management and shared context mechanism for all agents within a multi-agent project.

## Structure (TBD)
> TODO: Define context schema, context ID, memory format, etc.

## Suggested Execution Model
> JSON-based key-value pool, with memory backend (e.g., Qdrant, Redis).
> Standard lifecycle: initialize → update → resolve → persist