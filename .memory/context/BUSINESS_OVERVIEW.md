# 專案業務概覽

> 專案特定的業務邏輯與概念，供 AI 參考。

## 專案定位

**@embrs/nuxt4-skills**
- **定位**: CLI 工具，用於安裝和管理 Agent Skills 與 Workflows
- **技術棧**: Node.js, JavaScript, NPM
- **部署**: NPM Registry, GitHub Releases
- **目標用戶**: 使用 AI 助手的開發者團隊

## 關鍵概念速查

### Skills 系統
- **定義**: 可重複使用的 AI 技能模組
- **目的**: 標準化開發流程，提升 AI 協作效率
- **載入方式**: 根據任務類型自動或手動載入

### Workflows 系統  
- **定義**: 結構化的工作流程指引
- **觸發**: 透過斜線指令（如 `/project-init`）
- **特色**: 步驟化執行，確保流程完整性

### 多環境支援
- **Antigravity/Claude/VS Code** → `.agent/`
- **Cursor** → `.cursor/`
- **Windsurf** → `.windsurf/`

## 業務規則索引

| 規則 | 文件 |
|------|------|
| Skills 開發規範 | `templates/skills/*/SKILL.md` |
| Workflow 設計規範 | `templates/workflows/*.md` |
| 版本發布流程 | `package.json` + GitHub Actions |
| 路徑替換規則 | `bin/cli.js` 中的 pathReplacements |

## 核心業務邏輯

### 安裝流程
1. **環境選擇**: 使用者選擇目標 IDE 環境
2. **路徑替換**: 根據 IDE 類型動態替換檔案路徑
3. **檔案複製**: 遞歸複製 templates 到目標目錄
4. **完成提示**: 顯示安裝結果與後續設定建議

### 模板管理
- **單一來源**: 所有 Skills 與 Workflows 來自 templates/
- **動態適配**: 透過路徑替換支援不同 IDE
- **版本同步**: 模板更新透過 NPM 版本管理

### 擴展機制
- **新增 Skills**: 在 templates/skills/ 下建立新目錄
- **新增 Workflows**: 在 templates/workflows/ 下建立新檔案
- **自動發布**: 透過 GitHub Actions 自動化

## 使用場景

### 新專案啟動
- 使用 `/project-init` 初始化專案知識庫
- 自動分析專案結構並生成對應文檔

### 日常開發
- 根據任務類型載入對應 Skills
- 使用標準化工作流程提升效率

### 團隊協作
- 統一的開發規範與最佳實踐
- 共享的知識庫與工作流程

## 技術限制

### 當前限制
- **測試覆蓋**: 尚未建立完整測試套件
- **錯誤處理**: 基礎錯誤處理機制
- **國際化**: 僅支援繁體中文介面

### 未來改進
- **測試自動化**: 建立完整測試流程
- **錯誤恢復**: 更強健的錯誤處理
- **多語言支援**: 英文介面支援

## 相關生態

### 上游專案
- **nuxt4-base**: 目標應用框架
- **user-feedback**: 回饋收集工具 (https://www.npmjs.com/package/@embrs/user-feedback)

### 下游用戶
- **開發者團隊**: 使用 AI 助手進行開發
- **專案管理者**: 需要標準化開發流程
- **AI 助手**: 需要結構化知識指導

## 維護策略

### 定期維護
- **依賴更新**: 定期更新 npm 依賴
- **模板優化**: 根據用戶反饋改進模板
- **文檔同步**: 保持文檔與實際功能一致

### 社群貢獻
- **Issue 回報**: 透過 GitHub Issues
- **Pull Request**: 歡迎社群貢獻
- **功能請求**: 透過 Discussions 討論
