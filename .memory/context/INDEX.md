# 專案快速索引 (Project Index)

## 基本資訊
- **專案名稱**: `@embrs/nuxt4-skills`
- **專案類型**: Node.js CLI 工具
- **主要語言**: JavaScript
- **應用場景**: 互動式 CLI 安裝工具，可用於安裝初始化各類 AI Agent Skills 及 Workflows 至開發者的專案內，並自動適配並動態替換不同的 AI IDE 系統路徑（如 Cursor, Windsurf, GitHub Copilot 等）。

## 核心知識庫導覽

如果想要進一步理解此專案如何運作，請參閱以下說明：
- [目錄結構與分層 (Architecture)](./architecture.md): 了解專案的物理目錄 (`bin/`, `templates/`) 與邏輯架構。
- [功能模組 (Modules)](./modules.md): 了解 CLI 內負責掃描選單選項、解析操作目標與執行安裝與內容替換的核心代碼。
- [技術決策 (Tech Decisions)](./tech-decisions.md): 了解專案為何選用 Node CLI 及靜態模板替換機制。
- [開發入口 (Entry Points)](./entry-points.md): 了解該如何修改、新增 Skill、Workflow 並進行本機測試。
- [維護日誌 (Maintenance Log)](./maintenance-log.md): 後續開發維護以及升級日誌重點總結。

## 專案現況
- 目前支援目標：`antigravity` (`.agent`), `cursor` (`.cursor`), `windsurf` (`.windsurf`), `github copilot` (`.github`)
- 核心依賴：`chalk`, `commander`, `fs-extra`, `inquirer`, `ora`
