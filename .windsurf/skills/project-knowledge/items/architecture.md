# 專案架構

> 目錄結構與分層設計

## 整體結構

```
nuxt4-skills/
├── bin/                    # CLI 執行檔
│   └── cli.js             # 主要 CLI 邏輯
├── templates/             # Skills 與 Workflows 模板
│   ├── skills/            # 8 大 Skills 模組
│   └── workflows/         # 通用工作流程
├── .windsurf/             # Windsurf 配置
│   ├── skills/            # 已安裝的 Skills
│   └── workflows/         # 已安裝的 Workflows
├── openspec/              # OpenSpec 規範
├── .github/               # GitHub Actions
└── package.json           # NPM 配置
```

## 核心模組

### CLI 核心模組
- **bin/cli.js**: 主要 CLI 入口點，支援多 IDE 環境安裝
- **templates/**: Skills 與 Workflows 模板庫

### Skills 模組 (8 個)
1. **debugging** - 調試技巧與 MCP 工具整合
2. **deployment** - Docker 與 Railway 部署規範  
3. **element-plus-ui** - UI 元件使用規範
4. **nuxt-backend** - Nuxt 4 Server Routes 開發規範
5. **nuxt-frontend** - Nuxt 4 + Vue 3 前端開發規範
6. **prisma-database** - 資料庫操作與 Schema 管理
7. **testing** - 測試策略與實施
8. **project-knowledge** - 專案結構與知識庫管理

### Workflows 模組
- **project-init** - 專案初始化
- **git-commit** - Git 提交規範
- **openspec-** 系列 - OpenSpec 相關流程

## 技術架構

### 程式語言
- **Node.js** - CLI 工具主體
- **JavaScript** - 主要開發語言

### 核心依賴
- **commander** - CLI 框架
- **inquirer** - 互動式提示
- **fs-extra** - 檔案系統操作
- **chalk** - 終端顏色
- **ora** - 載入動畫

### 設計模式
- **模板模式**: 動態替換不同 IDE 路徑
- **策略模式**: 支援多 IDE 環境安裝
- **工廠模式**: 統一的 Skills 與 Workflows 生成

## 部署架構

### NPM 發布
- 套件名稱: `@embrs/nuxt4-skills`
- 版本管理: 語義化版本
- 全域安裝支援: `npm install -g @embrs/nuxt4-skills`

### 多環境支援
- **Antigravity/Claude/VS Code** → `.agent/`
- **Cursor** → `.cursor/`
- **Windsurf** → `.windsurf/`
