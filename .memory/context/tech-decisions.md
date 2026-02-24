# 技術決策記錄 (Tech Decisions)

1. **開發語言與環境**:
   - 選擇 **Node.js** + **JavaScript** 作為 CLI 開發語言，因為安裝於前端或 JS 專案中最為常見且相容。沒有使用 TypeScript 是為了保持腳本輕量且無需額外編譯，確保執行迅速。

2. **命令列互動工具**:
   - 使用 **Inquirer.js** 提供 Checkbox 等互動 UI，優化使用者體驗。同時搭配 **Ora** 和 **Chalk** 提供安裝過程的視覺反饋 (進度指示、顏色高亮)。

3. **IDE 路徑相容性 (Path Replacement)**:
   - 解決痛點：不同的 AI IDE 使用不同的專案設定目錄（Cursor 使用 `.cursor`, Windsurf 使用 `.windsurf`, GitHub Copilot 使用 `.github`）。
   - 決策：基於開源標準考慮，基礎撰寫參考 `.agent`。在執行安裝複製檔案時 (`copyAndReplacePaths`) 使用正則表達式動態替換文件內容中的對應路徑，以確保各 IDE 能夠完全識別對應的 Skills 和 Workflows。

4. **純靜態模板設計**:
   - `templates/` 目錄被設計為全靜態的結構，不包含過度複雜的動態生成指令碼。透過標準化的 `SKILL.md` 等格式，來適應不同 AI 助理與編輯器的讀取規範。
