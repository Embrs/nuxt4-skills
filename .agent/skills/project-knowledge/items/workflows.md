# Workflows 系統

## 概述
專案使用 workflow 系統來標準化 AI 工作流程，存放於 `templates/workflows/` 目錄。

## 核心 workflows

### 1. git-commit
- **路徑**: `templates/workflows/git-commit.md`
- **用途**: Git 提交流程 + 知識庫維護
- **特色**: Conventional Commits + 自動知識庫更新

### 2. mcp-test
- **路徑**: `templates/workflows/mcp-test.md`
- **用途**: MCP 工具可用性測試
- **特色**: 工具存在性檢查 + 錯誤處理
- **測試工具**: chrome-devtools, mcp-feedback-collector

### 3. user-feedback
- **路徑**: `templates/workflows/user-feedback.md`
- **用途**: 用戶回饋收集流程
- **特色**: 4個明確觸發時機 + 結構化執行步驟

### 4. project-init
- **路徑**: `templates/workflows/project-init.md`
- **用途**: 專案架構初始化
- **特色**: Skills 系統 + 知識分離原則

## Workflow 設計原則

1. **標準化結構**: YAML frontmatter + Markdown 內容
2. **觸發明確**: 清楚定義何時使用
3. **步驟詳細**: 提供可執行的具體步驟
4. **工具整合**: 與 MCP 工具無縫配合
5. **知識維護**: 自動更新相關知識庫

## 版本記錄
- v1.1.12: 優化 mcp-test 和 user-feedback workflows
- v1.1.11: 初始 workflow 系統建立
