---
version: 1.0
created: 2025-01-27T10:00:00+08:00
last_updated: 2025-01-27T10:00:00+08:00
maintainer: MPLP Development Team
applicable_scope: Multi-Agent Project Lifecycle Protocol
---

# MPLP.Role Schema

## Overview

**MPLP.Role** defines the capabilities, responsibilities, and tool bindings for agents in multi-agent systems. It establishes a standardized framework for agent specialization, collaboration, and dependency management.

## Purpose

- **Agent Specialization**: Define distinct roles with specific capabilities and responsibilities
- **Tool Integration**: Standardize how agents access and utilize tools
- **Dependency Management**: Establish relationships and collaboration patterns between roles
- **Capability Mapping**: Document what each role can and cannot do
- **Framework Compatibility**: Ensure interoperability with existing agent frameworks

## Schema Definition

### Basic Information

- **Schema ID**: `https://coregentis.org/schemas/v1.0/Role.schema.json`
- **Version**: 1.0.0
- **Type**: `object`

### Property Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `roleId` | `string` | ✓ | Unique identifier for the role definition |
| `roleName` | `string` | ✓ | Human-readable name of the role |
| `roleType` | `string` | ✓ | Type of role: basic, composite, or specialized |
| `capabilities` | `array` | ✓ | List of capabilities this role provides |
| `toolBindings` | `object` | ✓ | Tools associated with this role |
| `dependencies` | `array` | ✗ | Other roles this role depends on |
| `metaGPTCompatibility` | `object` | ✗ | MetaGPT framework compatibility information |
| `createdAt` | `string` | ✓ | Timestamp when the role was defined |
| `version` | `string` | ✗ | Version of the role definition |

### roleType Enumeration Values

- `basic`: Single responsibility role
- `composite`: Role with multiple capabilities
- `specialized`: Domain-specific role

### capabilities Array Item Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `capabilityId` | `string` | ✓ | Unique identifier for the capability |
| `name` | `string` | ✓ | Name of the capability |
| `description` | `string` | ✗ | Description of what this capability does |
| `category` | `string` | ✓ | Category of the capability |

#### capability category Enumeration Values

- `planning`: Project and task planning capabilities
- `execution`: Task execution and implementation
- `analysis`: Data analysis and evaluation
- `communication`: Inter-agent and external communication
- `coordination`: Multi-agent coordination and management

### toolBindings Object Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `necessary` | `array` | ✓ | Essential tools required for basic role functionality |
| `recommended` | `array` | ✗ | Tools that enhance role performance |
| `custom` | `array` | ✗ | Project-specific or domain-specific tools |

### dependencies Array Item Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `roleId` | `string` | ✓ | ID of the dependent role |
| `dependencyType` | `string` | ✓ | Type of dependency relationship |
| `description` | `string` | ✗ | Description of the dependency |

#### dependencyType Enumeration Values

- `requires`: This role requires the dependent role to function
- `collaborates`: This role works together with the dependent role
- `supervises`: This role oversees the dependent role
- `reports_to`: This role reports to the dependent role

## Execution Model

### Role Definition Example

```json
{
  "roleId": "role_backend_developer",
  "roleName": "Backend Developer",
  "roleType": "specialized",
  "capabilities": [
    {
      "capabilityId": "cap_api_design",
      "name": "API Design",
      "description": "Design RESTful APIs and service endpoints",
      "category": "planning"
    },
    {
      "capabilityId": "cap_database_integration",
      "name": "Database Integration",
      "description": "Implement database models and queries",
      "category": "execution"
    }
  ],
  "toolBindings": {
    "necessary": [
      {
        "toolId": "tool_code_generation",
        "toolName": "Code Generator",
        "mcpServer": "mcp.coding.tools",
        "bindingType": "required"
      }
    ],
    "recommended": [
      {
        "toolId": "tool_api_testing",
        "toolName": "API Tester",
        "mcpServer": "mcp.testing.tools",
        "priority": 8
      }
    ]
  },
  "dependencies": [
    {
      "roleId": "role_database_designer",
      "dependencyType": "collaborates",
      "description": "Works with database designer for schema integration"
    }
  ],
  "createdAt": "2025-01-27T10:00:00Z",
  "version": "1.0.0"
}
```

### Role Assignment Flow

1. **Role Definition**: Create role specifications with capabilities and tool requirements
2. **Agent Matching**: Match agent capabilities to role requirements
3. **Tool Provisioning**: Ensure agents have access to necessary tools
4. **Dependency Resolution**: Establish connections between interdependent roles
5. **Role Activation**: Initialize agent with role-specific context and instructions

### Recommended Implementation

- **Role Registry**: Maintain a central repository of role definitions
- **Capability Matching**: Implement algorithms to match agent capabilities to roles
- **Tool Management**: Provide mechanisms for tool discovery and access
- **Dependency Tracking**: Monitor and manage inter-role dependencies
- **Role Versioning**: Support evolution of roles over time

## Related Protocols

- **MPLP.Context**: Global project context and agent state management
- **MPLP.Plan**: Task planning and assignment
- **MPLP.Execute**: Task execution based on role capabilities
- **MPLP.Workflow**: Multi-agent workflow orchestration

## Notes

- Roles should be designed to be modular and composable
- Consider the principle of least privilege when defining tool bindings
- Maintain clear separation of concerns between different roles
- Document role dependencies to facilitate effective collaboration
- Ensure compatibility with existing agent frameworks when possible