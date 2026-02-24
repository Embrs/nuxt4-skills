# 專案架構概覽 (Architecture)

## 目錄結構
- `bin/` - CLI 執行檔存放處
  - `cli.js` - 工具主程式，處理使用者互動、參數解析及安裝邏輯
- `templates/` - Skills 與 Workflows 模板庫
  - `skills/` - 各項 Agent Skills 的定義與腳本 (例如 project-knowledge, user-feedback)
  - `workflows/` - 各項自動化工作流文件 (例如 git-commit)
- `docs/` 和 `openspec/` - 專案文件與規格說明
- `package.json` - Node.js 專案配置與 CLI 入口設定

## 分層設計
1. **互動層 (CLI)**:
   - 使用 `inquirer` 元件負責與使用者進行文字選單互動。
   - 使用 `commander` (雖未深度使用，但在 package 依賴中) 及 `ora` 處理進度動畫。
2. **邏輯處理層**:
   - 負責獲取 `templates` 內的可用 Skills 與 Workflows 列表。
   - 執行安裝邏輯，複製模板至使用者的專案目錄 (`.agent`, `.cursor`, `.windsurf`, `.github` 等不同 IDE 對應路徑)。
3. **資料層 (Templates)**:
   - 靜態的 Skills (`SKILL.md` 及腳本) 與 Workflows 文件，供安裝程式動態讀取及替換路徑。
