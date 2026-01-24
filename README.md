# Embrs Skills CLI

一鍵安裝標準化 Agent Skills 與 Workflows 的命令列工具。

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

## License

ISC
