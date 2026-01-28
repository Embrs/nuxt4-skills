# 功能模組

> 專案功能模組清單與說明

## CLI 核心模組

### bin/cli.js
**主要 CLI 入口點**
- **功能**: 安裝 Skills 與 Workflows 到多種 IDE 環境，支援多選安裝
- **特色**: 
  - 支援多 IDE 環境同時安裝
  - 動態路徑替換機制
  - 互動式安裝精靈
  - **新增**: 支援多選 Skills 與 Workflows 安裝
  - **新增**: 預設選擇 project-knowledge、user-feedback、git-commit
- **依賴**: commander, inquirer, fs-extra, chalk, ora

## Skills 模組庫

### debugging/
**調試技巧與 MCP 工具整合**
- 適用場景: 程式碼調試、問題排查
- 核心功能: MCP 工具使用指南、調試策略

### deployment/
**Docker 與 Railway 部署規範**
- 適用場景: 應用部署、容器化
- 核心功能: Docker 配置、CI/CD 流程

### element-plus-ui/
**UI 元件使用規範**
- 適用場景: ElementPlus 元件開發
- 核心功能: 元件規範、最佳實踐

### nuxt-backend/
**Nuxt 4 Server Routes 開發規範**
- 適用場景: 後端 API 開發
- 核心功能: Server Routes、API 設計

### nuxt-frontend/
**Nuxt 4 + Vue 3 前端開發規範**
- 適用場景: 前端頁面開發
- 核心功能: Vue 3 組件、Nuxt 4 特性

### prisma-database/
**資料庫操作與 Schema 管理**
- 適用場景: 資料庫設計、ORM 操作
- 核心功能: Prisma 使用、Schema 設計

### testing/
**測試策略與實施**
- 適用場景: 測試編寫、品質保證
- 核心功能: 測試框架、測試策略

### project-knowledge/
**專案結構與知識庫管理**
- 適用場景: 專案架構、知識管理
- 核心功能: 架構文檔、模組管理

## Workflows 模組庫

### project-init.md
**專案初始化工作流程**
- 功能: 掃描專案並生成知識庫結構
- 適用: 新專案啟動時使用

### git-commit.md
**Git 提交規範工作流程**
- 功能: 標準化 Git 提交訊息
- 適用: 日常開發提交

### openspec-*.md
**OpenSpec 相關工作流程**
- openspec-proposal: 規格提案
- openspec-apply: 規格應用
- openspec-archive: 規格歸檔

## 技術特性

### 多環境支援
- **路徑替換機制**: 自動適配不同 IDE 目錄結構
- **模板系統**: 統一的 Skills 與 Workflows 模板
- **批量安裝**: 支援同時安裝到多個 IDE 環境

### 擴展性設計
- **模組化結構**: Skills 可獨立開發與維護
- **模板驅動**: 新增 Skills 只需添加模板
- **版本管理**: 支援 NPM 語義化版本

## 使用場景

### 開發者工作流程
1. **新專案**: 使用 `project-init` 初始化知識庫
2. **日常開發**: 根據任務類型載入對應 Skills
3. **程式碼提交**: 使用 `git-commit` 規範提交
4. **問題排查**: 使用 `debugging` 技巧

### 團隊協作
- **統一規範**: 透過 Skills 統一開發標準
- **知識沉澱**: 透過 project-knowledge 維護專案文檔
- **流程標準化**: 透過 Workflows 標準化工作流程
