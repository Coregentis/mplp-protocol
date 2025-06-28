> **翻譯狀態**: 已完成
> **原文檔**: docs/en/Role.md
> **最後更新**: 2025-06-28
> **翻譯版本**: 1.0

# MPLP.Role — 角色協議

## 目的
此協議定義多智能體專案團隊的角色管理和智能體分配機制，包括能力、職責和工具綁定。

## 結構

MPLP.Role 協議遵循以下 JSON 架構：

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://coregentis.org/schemas/v1.0/Role.schema.json",
  "version": "1.0.0",
  "title": "MPLP.Role Schema",
  "description": "多智能體系統中角色管理和智能體分配的架構。",
  "type": "object",
  "properties": {
    "roleId": {
      "type": "string",
      "description": "此角色定義的唯一識別符。"
    },
    "name": {
      "type": "string",
      "description": "角色的人類可讀名稱。"
    },
    "type": {
      "type": "string",
      "enum": ["management", "development", "testing", "operations", "analysis"],
      "description": "角色的類別。"
    },
    "description": {
      "type": "string",
      "description": "角色目的和範圍的詳細描述。"
    },
    "capabilities": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "此角色提供的核心能力列表。"
    },
    "responsibilities": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "此角色的主要職責和義務。"
    },
    "permissions": {
      "type": "object",
      "description": "此角色的存取權限和授權級別。",
      "additionalProperties": true
    },
    "status": {
      "type": "string",
      "enum": ["active", "inactive", "suspended"],
      "description": "角色的當前運作狀態。"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "角色創建的時間戳。"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time",
      "description": "角色最後更新的時間戳。"
    }
  },
  "required": ["roleId", "name", "type", "capabilities", "responsibilities", "status", "createdAt"],
  "additionalProperties": false
}
```

### 關鍵組件:

- **roleId**: 每個角色定義的唯一識別符
- **name**: 人類可讀的角色名稱（例如：「產品經理」、「開發者」）
- **type**: 用於組織目的的角色類別
- **capabilities**: 角色提供的核心技能和能力
- **responsibilities**: 主要職責和責任
- **permissions**: 存取控制和授權設定
- **status**: 角色的當前運作狀態

## 建議執行模型
> 基於角色的存取控制，配合能力匹配。
> 標準生命週期：定義 → 分配 → 啟動 → 監控 → 更新