---
name: testing
description: |
  測試驗證技能。包含前端 UI 測試（Chrome DevTools MCP）、
  後端 API 測試、整合測試。驗證功能正確性時使用此技能。
---

# 測試驗證技能

> 前端 UI 測試、後端 API 測試、整合測試

## 快速導航

| 文件 | 說明 |
|------|------|
| [frontend-testing.md](items/frontend-testing.md) | 前端 UI 測試流程 |
| [backend-testing.md](items/backend-testing.md) | 後端 API 測試 |
| [integration.md](items/integration.md) | 整合測試 |
| [browser-testing.md](items/browser-testing.md) | 瀏覽器自動化測試 |

## 測試流程速查

### 前端測試（Chrome DevTools MCP）
```
1. 開啟瀏覽器：open_browser_url
2. 取得快照：get_page_snapshot
3. 執行操作：click_element / fill_input_element
4. 驗證結果：get_page_snapshot 確認 UI 變化
```

### 後端測試
```
1. 準備測試資料
2. 呼叫 API 端點
3. 驗證響應格式與內容
4. 確認資料庫變更
```

## 測試帳號

> [!NOTE]
> 測試帳號由各專案的 `prisma/seed.ts` 定義，
> 請查閱專案 seed 腳本以獲取實際測試帳號。

**建議的帳號結構**：

| 角色 | 用途 |
|------|------|
| 超級管理員 | 全功能測試 |
| 公司管理員 | 權限測試 |
| 一般使用者 | 一般操作測試 |

## 測試優先級

| 優先級 | 類型 | 說明 |
|--------|------|------|
| P0 | 核心流程 | 登入、主要 CRUD |
| P1 | 業務邏輯 | 付款、狀態轉換 |
| P2 | 邊界情況 | 空值、錯誤處理 |
| P3 | UI/UX | 樣式、響應式 |

## 相關技能
- [debugging](../debugging/SKILL.md) - 測試發現問題時調試
- [nuxt-frontend](../nuxt-frontend/SKILL.md) - 前端相關
- [nuxt-backend](../nuxt-backend/SKILL.md) - 後端相關
