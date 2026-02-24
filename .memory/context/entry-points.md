# 開發與執行入口點 (Entry Points)

## 使用者執行入口

- **指令名稱**: `npx @embrs/nuxt4-skills` 或 `install-skills` (package.json 內的 bin 設定)
- **實體檔案**: `bin/cli.js`
- **啟動方式**:
  ```bash
  # 若在專案內開發：
  node bin/cli.js
  # 若以全域或 npx 方式：
  npx @embrs/nuxt4-skills
  ```

## 開發者測試與修改流程

1. 核心邏輯修改：主要針對 `bin/cli.js` 中調整路徑對應、新增選單選項或處理新的依賴工具。
2. 新增 Skill：在 `templates/skills/` 下添加新的技能目錄及 `SKILL.md` 規範檔案即可。
3. 新增 Workflow：在 `templates/workflows/` 下添加對應的自動化工作流 `.md` 檔案。
4. 驗證擴充：本機測試執行 `node bin/cli.js` 確認 CLI 的互動選單是否能正常辨識並勾選新增的目錄與名稱，最後確認安裝邏輯中的路徑替換功能是否正確運作。
