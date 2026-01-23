# Embrs Skills CLI 工具包

這是一個用於快速安裝標準化 Agent Skills 與 Workflows 的命令列工具。
旨在幫助開發者將通用的 AI 協作規範（Agentic Standards）快速導入到任何專案中。

## 功能特色

- **多環境支援**：自動適配不同 AI 編輯器的設定路徑。
  - ✅ **Antigravity / Claude / VS Code** (安裝至 `.agent/`)
  - ✅ **Cursor** (安裝至 `.cursor/rules/`)
  - ✅ **Windsurf** (安裝至 `.windsurf/rules/`)
- **智能過濾**：僅安裝通用的 Workflows（如 Git Commit 規範），自動排除專案特定的 OpenSpec 流程。
- **標準化技能**：內建所有經過驗證的標準 Skills (Debugging, Deployment, Nuxt, Testing 等)。

## 安裝與使用

### 方法一：直接使用 (無需安裝)

如果您已將此包發布到 npm，可以直接使用 `npx` 運行：

```bash
npx @your-org/agent-skills-cli
```

### 方法二：本地開發與連結

如果您正在開發此工具或想在本地測試：

1. **安裝依賴**
   ```bash
   cd agent-skills-cli
   npm install
   ```

2. **建立全域連結**
   ```bash
   npm link
   ```

3. **在任何專案中使用**
   進入您的目標專案目錄，執行：
   ```bash
   install-skills
   ```

### 方法三：手動執行腳本

您也可以直接透過 node 執行腳本：

```bash
nodepath/to/agent-skills-cli/bin/cli.js
```

## 安裝後的設定建議

### Cursor 使用者
請確保您的 Cursor 設定中有啟用 `.cursor/rules` 作為上下文索引的一部分，這樣 AI 才能正確讀取這些規則。

### Antigravity / Claude 使用者
工具會將檔案安裝至 `.agent/` 目錄。請確保您的 `.agent/skills` 下的 `SKILL.md` 能夠被您的 Agent 讀取。

## 包含的 Skills

- **debugging**: 調試技巧與 MCP 工具整合
- **deployment**: Docker 與 Railway 部署規範
- **element-plus-ui**: UI 元件使用規範
- **nuxt-backend**: Nuxt 4 Server Routes 開發規範
- **nuxt-frontend**: Nuxt 4 + Vue 3 前端開發規範
- **prisma-database**: 資料庫操作與 Schema 管理
- **testing**: 測試策略與實施
- **project-knowledge**: 專案結構與知識庫管理
