# Chrome DevTools MCP 操作

## 基本工具

| 工具 | 用途 |
|------|------|
| `open_browser_url` | 開啟指定 URL |
| `get_page_snapshot` | 取得頁面快照與元素 UID |
| `click_element` | 點擊元素 |
| `fill_input_element` | 填寫輸入框 |
| `select_option` | 選擇下拉選項 |
| `execute_javascript` | 執行 JavaScript |
| `get_console_logs` | 取得 Console 日誌 |

## 調試流程

### 1. 開啟頁面

```
open_browser_url: http://localhost:3000/bgm/customer-related/customer-management
```

### 2. 取得快照

```
get_page_snapshot
```
- 取得當前 DOM 結構
- 取得所有元素 UID

### 3. 檢查 Console

```
get_console_logs
```
- 查看錯誤訊息
- 確認警告資訊

### 4. 執行操作

```
click_element: uid-123
fill_input_element: uid-456, "測試文字"
```

### 5. 重新取得快照

> [!IMPORTANT]
> DOM 變化後 UID 會失效，必須重新取得！

```
get_page_snapshot  # 重新取得
```

## UID 注意事項

### 常見錯誤
```
Error: Element with UID xxx not found
```

### 原因
- 頁面重新渲染
- 元素被刪除
- 動態內容載入

### 解決方案
```
1. 重新執行 get_page_snapshot
2. 使用新的 UID
3. 確認元素存在後再操作
```

## 調試技巧

### 檢查元素狀態
```javascript
// execute_javascript
document.querySelector('.ElButton').disabled
```

### 檢查資料
```javascript
// 取得 Vue 組件資料
__nuxt_app__.payload
```

### 觸發事件
```javascript
document.querySelector('button').click()
```

## 常見問題排查

| 問題 | 檢查點 |
|------|--------|
| 按鈕無法點擊 | disabled 屬性、z-index |
| 看不到元素 | v-if 條件、display 樣式 |
| 資料不顯示 | API 是否返回、資料綁定 |
| 表單無法送出 | 驗證規則、必填欄位 |
