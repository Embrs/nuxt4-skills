# 功能模組清單 (Modules)

| 模組名稱 | 路徑 | 主要職責 | 關鍵依賴 |
|---------|------|---------|---------|
| CLI 進入點 | `bin/cli.js` | 應用程式入口，處理命令列執行與錯誤捕捉 | `chalk`, `ora` |
| 使用者互動模組 | `bin/cli.js` (內部 `inquirer.prompt`) | 提供文字介面選單，讓使用者勾選欲安裝的 IDE、Skills 與 Workflows | `inquirer` |
| 模板掃描模組 | `bin/cli.js` (`getAvailableSkills`, `getAvailableWorkflows`) | 讀取專案內建的 `templates` 目錄以產生可安裝清單 | `fs-extra`, `path` |
| 安裝與替換模組 | `bin/cli.js` (`copySelectedSkills`, `copySelectedWorkflows`, `copyAndReplacePaths`) | 複製靜態檔案至目標專案，並根據不同的 IDE (如 Cursor, Windsurf, Copilot) 動態替換路徑引用 | `fs-extra` |
| 模板庫 | `templates/` | 提供標準化的 Skills 與 Workflows 給其他 AI Agent 使用 | 無 |
