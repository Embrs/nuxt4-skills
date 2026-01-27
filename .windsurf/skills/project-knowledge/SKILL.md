---
name: project-knowledge
description: |
  專案知識庫管理技能。了解專案架構、查找模組位置、
  維護知識庫生命週期。回答「是什麼」「在哪裡」「為什麼」。
---

# 專案知識庫

> 通用專案知識管理框架

## 快速導航

| 文件 | 說明 |
|------|------|
| [architecture.md](items/architecture.md) | 目錄結構、分層設計 |
| [modules.md](items/modules.md) | 功能模組清單 |
| [tech-decisions.md](items/tech-decisions.md) | 技術決策記錄 |
| [entry-points.md](items/entry-points.md) | 開發入口點 |

## 業務內容索引

> 專案特定的業務邏輯存放於 `.memory/context/`

| 業務類型 | 位置 |
|----------|------|
| 業務概覽 | `.memory/context/BUSINESS_OVERVIEW.md` |
| 業務規則 | `.memory/context/*.md` |
| 歷史歸檔 | `.memory/archive/` |

## 知識維護

### 觸發更新時機

| 觸發條件 | 更新位置 | 動作 |
|----------|----------|------|
| 新增功能模組 | `items/modules.md` | 添加模組描述 |
| 新增業務規則 | `.memory/context/` | 新增規則文件 |
| 資料庫 Schema 變更 | `items/architecture.md` | 更新資料模型 |
| 技術決策變更 | `items/tech-decisions.md` | 記錄決策 |

### 如何更新

1. 確認需要更新的文件類型（通用 vs 專案特定）
2. 對照實際代碼更新內容
3. 記錄到 `references/maintenance-log.md`

### 過時檢測

AI 應主動識別並提示以下情況：
- 「架構文件中的數量與實際不符，建議更新」
- 「發現新模組，建議添加到 modules.md」
- 「發現新業務規則，建議添加到 .memory/context/」

## 相關技能

開發時根據任務類型選擇對應技能：

| 任務類型 | 技能 |
|----------|------|
| CLI 工具開發 | [debugging](../debugging/SKILL.md) |
| 部署相關 | [deployment](../deployment/SKILL.md) |
| 測試驗證 | [testing](../testing/SKILL.md) |
