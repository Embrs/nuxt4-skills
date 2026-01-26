# Nuxt4 Skills

專屬於 [nuxt4-base](https://github.com/Embrs/nuxt4-base) 的 Skills 套件

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

### MCP：mcp-feedback-collector-web 安裝與設定路徑

本套件內建 `user-feedback` skill，若您希望在 Claude Desktop / Cursor 等環境中使用互動式回饋視窗，請先安裝並設定 `mcp-feedback-collector-web` MCP 服務。

參考專案：
https://github.com/sanshao85/mcp-feedback-collector-web

#### 1) 安裝 Node.js 版本（推薦）

```bash
# 直接運行（推薦，無需全局安裝）
npx mcp-feedback-collector

# 或全局安裝
npm install -g mcp-feedback-collector
```

#### 2) 設定 Claude Desktop（claude_desktop_config.json 路徑）

- **macOS**：`~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**：`%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**：`~/.config/Claude/claude_desktop_config.json`

在檔案中加入（或合併）以下設定：

```json
{
  "mcpServers": {
    "mcp-feedback-collector": {
      "command": "npx",
      "args": ["-y", "mcp-feedback-collector@latest"],
      "env": {
        "MCP_API_KEY": "your_api_key_here",
        "MCP_API_BASE_URL": "https://api.ssopen.top",
        "MCP_DEFAULT_MODEL": "grok-3",
        "MCP_WEB_PORT": "5050",
        "MCP_DIALOG_TIMEOUT": "60000",
        "MCP_ENABLE_IMAGE_TO_TEXT": "true"
      }
    }
  }
}
```

**環境變數說明：**
- `MCP_API_KEY`: AI API 金鑰（必填）
- `MCP_API_BASE_URL`: API 基礎 URL
- `MCP_WEB_PORT`: Web 服務端口（預設 5000）
- `MCP_DIALOG_TIMEOUT`: 回饋收集超時時間（毫秒）
- `MCP_ENABLE_IMAGE_TO_TEXT`: 啟用圖片轉文字功能

完成後重啟 Claude Desktop。

## License

ISC
