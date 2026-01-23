# 前端 UI 測試

## Chrome DevTools MCP 測試流程

### 基本流程

```
1. 開啟頁面
2. 取得快照
3. 執行操作（點擊、輸入）
4. 驗證結果
5. 重複直到測試完成
```

### 常用工具

| 工具 | 用途 |
|------|------|
| `open_browser_url` | 開啟指定 URL |
| `get_page_snapshot` | 取得頁面快照與元素 UID |
| `click_element` | 點擊元素 |
| `fill_input_element` | 填寫輸入框 |
| `select_option` | 選擇下拉選項 |

### 範例：登入測試

```
1. open_browser_url: http://localhost:3000/sign-in
2. get_page_snapshot: 確認登入表單
3. fill_input_element: 填寫 email
4. fill_input_element: 填寫 password
5. click_element: 點擊登入按鈕
6. get_page_snapshot: 確認跳轉到首頁
```

## UID 注意事項

> [!WARNING]
> Snapshot UID 會在 DOM 變更後失效！

### 常見問題
- 操作後 DOM 改變，UID 會變
- 需要重新 `get_page_snapshot` 取得新 UID
- 不要快取舊的 UID

### 正確做法
```
1. get_page_snapshot → 取得元素 UID
2. click_element(uid) → 執行操作
3. get_page_snapshot → 重新取得快照（DOM 可能已變）
4. 使用新的 UID 繼續操作
```

## 測試案例模板

### CRUD 測試
1. **列表顯示**：確認資料正確載入
2. **新增**：填寫表單、送出、確認新增成功
3. **編輯**：開啟編輯、修改、確認更新
4. **刪除**：確認刪除、驗證消失

### 表單測試
1. **必填驗證**：空白送出、確認錯誤提示
2. **格式驗證**：錯誤格式、確認驗證訊息
3. **成功送出**：正確資料、確認成功

## 測試檢查清單

- [ ] 頁面正常載入
- [ ] 資料正確顯示
- [ ] 表單驗證正常
- [ ] 操作回饋正確
- [ ] 錯誤處理妥當
- [ ] 權限控制正確
