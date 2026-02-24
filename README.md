# Nuxt4 Skills

專屬於 [nuxt4-base](https://github.com/Embrs/nuxt4-base) 的 Skills 套件

### 相關專
- **本專案 NPM 連結**: https://www.npmjs.com/package/@embrs/nuxt4-skills
- **user-feedback**: https://www.npmjs.com/package/@embrs/user-feedback

## 快速開始

```bash
npx @embrs/nuxt4-skills@latest
```

執行後會引導您選擇目標 IDE 環境，支援多選同時安裝到多個位置。

## 功能特色

- **多環境支援**：支援同時安裝至多個 IDE 環境
  - ✅ **Antigravity / Claude / VS Code** → `.agent/`
  - ✅ **Cursor** → `.cursor/`
  - ✅ **Windsurf** → `.windsurf/`
  - ✅ **GitHub Copilot** → `.github/`
- **標準化技能**：內建經過驗證的 8 大 Skills 模組
- **通用 Workflows**：Git Commit 規範、專案初始化等

## 包含的 Skills

| Skill | 說明 |
|-------|------|
| `debugging` | 調試技巧與 MCP 工具整合 |
| `deployment` | Docker 與 Railway 部署規範 |
| `element-plus-ui` | UI 元件使用規範 |
| `nuxt-backend` | Nuxt 4 Server Routes 開發規範 |
| `nuxt-frontend` | Nuxt 4 + Vue 3 前端開發規範 |
| `prisma-database` | 資料庫操作與 Schema 管理 |
| `testing` | 測試策略與實施 |
| `project-knowledge` | 專案結構與知識庫管理 |

## 安裝後設定

### Cursor 使用者
確保 `.cursor/rules` 被包含在 Context 索引範圍內。

### Antigravity / Claude 使用者
確保 Prompt 或設定檔已指向 `.agent` 目錄。

### GitHub Copilot 使用者
確保您的設定或 Workspace 已包含 `.github` 目錄，您可以藉由在 `.github/skills/` 放置技能來供 Copilot 讀取。

### User Feedback 技能安裝與使用

本套件內建 `user-feedback` skill，提供互動式回饋收集功能。若您希望在 Claude Desktop / Cursor 等環境中使用，請安裝對應的 MCP 服務。

**NPM 套件**: https://www.npmjs.com/package/@embrs/user-feedback

#### 1) 安裝 User Feedback

```bash
# 全局安裝
npm install -g @embrs/user-feedback
```

#### 2) 設定 Claude Desktop（claude_desktop_config.json 路徑）

- **macOS**：`~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**：`%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**：`~/.config/Claude/claude_desktop_config.json`

在檔案中加入（或合併）以下設定：

```json
{
  "mcpServers": {
    "user-feedback": {
      "command": "npx",
      "args": ["-y", "@embrs/user-feedback@latest"]
    }
  }
}
```

**注意**：以上設定為基本配置，如需其他環境變數請參考 @embrs/user-feedback 套件文檔。

**設定說明**：
- `command`: 使用 npx 執行套件
- `args`: 指定套件名稱與版本
- 如需 API 金鑰或其他配置，請參考套件官方文檔

完成後重啟 Claude Desktop。

## License

ISC
