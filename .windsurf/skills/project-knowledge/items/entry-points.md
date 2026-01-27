# 開發入口點

> 專案開發的各種入口點與使用方式

## CLI 入口點

### 全域安裝使用
```bash
# 安裝
npm install -g @embrs/nuxt4-skills

# 執行
install-skills
```

### npx 直接執行
```bash
# 無需全域安裝
npx @embrs/nuxt4-skills@latest
```

### 本地開發
```bash
# 克隆專案
git clone https://github.com/Embrs/nuxt4-skills.git
cd nuxt4-skills

# 安裝依賴
npm install

# 執行
node bin/cli.js
```

## 核心檔案入口

### bin/cli.js
**主要 CLI 程式入口**
- **功能**: 處理使用者互動、檔案複製、路徑替換
- **啟動方式**: `node bin/cli.js` 或透過 npm scripts
- **主要函數**:
  - `copyAndReplacePaths()`: 遞歸複製並替換路徑
  - `main()`: 主要程式邏輯

### package.json
**NPM 套件配置入口**
- **bin 指令**: `install-skills` 指向 `./bin/cli.js`
- **main 檔案**: `bin/cli.js`
- **scripts**: 目前只有基礎測試指令

## Skills 使用入口

### 載入 Skills
AI 助手透過以下方式載入 Skills：
1. **自動偵測**: 根據任務類型自動選擇對應 Skills
2. **手動指定**: 明確指定使用特定 Skills
3. **情境觸發**: 根據專案類型觸發相關 Skills

### Skills 目錄結構
```
.windsurf/skills/
├── debugging/SKILL.md
├── deployment/SKILL.md
├── element-plus-ui/SKILL.md
├── nuxt-backend/SKILL.md
├── nuxt-frontend/SKILL.md
├── prisma-database/SKILL.md
├── testing/SKILL.md
└── project-knowledge/SKILL.md
```

## Workflows 使用入口

### 觸發方式
1. **斜線指令**: 在對話中使用 `/workflow-name`
2. **自動建議**: AI 根據情境建議使用
3. **手動選擇**: 從可用 workflows 列表選擇

### 常用 Workflows
- `/project-init`: 專案初始化
- `/git-commit`: Git 提交規範
- `/openspec-proposal`: OpenSpec 提案
- `/openspec-apply`: OpenSpec 應用
- `/openspec-archive`: OpenSpec 歸檔
- `/user-feedback`: 用戶反饋收集

## 開發環境入口

### 本地開發設定
```bash
# 1. Fork 並克隆專案
git clone https://github.com/YOUR_USERNAME/nuxt4-skills.git
cd nuxt4-skills

# 2. 安裝依賴
npm install

# 3. 建立開發連結
npm link

# 4. 測試 CLI
install-skills --help
```

### 測試環境
```bash
# 建立測試目錄
mkdir test-project
cd test-project

# 執行安裝測試
install-skills
```

## 模板開發入口

### 新增 Skills
1. 在 `templates/skills/` 下建立新目錄
2. 建立 `SKILL.md` 主檔案
3. 添加相關子檔案與資源
4. 更新 `README.md` 說明

### 新增 Workflows
1. 在 `templates/workflows/` 下建立新 `.md` 檔案
2. 遵循 YAML frontmatter 格式
3. 添加詳細的執行步驟
4. 測試工作流程

## 部署入口

### NPM 發布
```bash
# 1. 更新版本
npm version patch|minor|major

# 2. 發布到 NPM
npm publish

# 3. 推送標籤
git push --tags
```

### GitHub Actions
專案使用 GitHub Actions 進行自動化：
- **CI/CD**: 自動測試與發布
- **Release**: 自動建立 GitHub Release
- **Documentation**: 自動更新文檔

## 除錯入口

### CLI 除錯
```bash
# 啟用詳細輸出
DEBUG=* install-skills

# 或使用 Node.js 除錯模式
node --inspect bin/cli.js
```

### 常見問題排查
1. **權限問題**: 確保目錄有寫入權限
2. **路徑問題**: 檢查 templates 目錄是否存在
3. **依賴問題**: 重新安裝 node_modules
4. **IDE 設定**: 確認 IDE 支援 .windsurf 目錄

## 社群貢獻入口

### Issue 回報
- **Bug 回報**: GitHub Issues
- **功能請求**: GitHub Discussions
- **文件問題**: 直接 PR 修正

### 貢獻流程
1. Fork 專案
2. 建立功能分支
3. 提交變更
4. 建立 Pull Request
5. 等待審查與合併

## 相關資源入口

### 文檔連結
- **GitHub Repository**: https://github.com/Embrs/nuxt4-skills
- **NPM Package**: https://www.npmjs.com/package/@embrs/nuxt4-skills
- **Issues**: https://github.com/Embrs/nuxt4-skills/issues

### 相關專案
- **nuxt4-base**: https://github.com/Embrs/nuxt4-base
- **user-feedback**: https://www.npmjs.com/package/@embrs/user-feedback
