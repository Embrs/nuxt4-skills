---
name: debugging
description: |
  調試技能。包含 Chrome DevTools MCP 操作、前後端調試技巧。
  遇到 Bug 或需要調試時使用此技能。
---

# 調試技能

> 前端/後端調試技巧與 Chrome DevTools MCP 操作

## 快速導航

| 文件 | 說明 |
|------|------|
| [chrome-devtools.md](items/chrome-devtools.md) | Chrome DevTools MCP 操作 |
| [frontend-debug.md](items/frontend-debug.md) | 前端調試技巧 |
| [backend-debug.md](items/backend-debug.md) | 後端 API 調試 |

## 調試流程速查

### 前端問題
```
1. 取得頁面快照：get_page_snapshot
2. 確認元素狀態
3. 檢查 Console 錯誤
4. 驗證網路請求
5. 定位問題代碼
```

### 後端問題
```
1. 檢查 API 響應格式
2. 確認資料庫資料
3. 查看伺服器日誌
4. 追蹤代碼執行流程
5. 修復並測試
```

## Chrome DevTools MCP 重點

> [!WARNING]
> **Snapshot UID 會在 DOM 變更後失效！**

- 每次 DOM 變化後需重新 `get_page_snapshot`
- 不要快取舊的 UID
- 操作失敗時優先重新取得快照

## 常見問題速查

| 問題類型 | 調試方向 |
|----------|----------|
| UI 不顯示 | 檢查 v-if 條件、資料是否載入 |
| API 404 | 確認路由路徑、方法是否正確 |
| 權限錯誤 | 檢查 Token、權限點 |
| 資料不對 | 檢查 API 響應、資料轉換 |
| 樣式問題 | 檢查 scoped、class 名稱 |

## 相關技能
- [testing](../testing/SKILL.md) - 測試發現問題
- [nuxt-frontend](../nuxt-frontend/SKILL.md) - 前端代碼
- [nuxt-backend](../nuxt-backend/SKILL.md) - 後端代碼
