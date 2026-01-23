# 常見問題解決方案

## 前端問題

### ElTable 資料不顯示
**症狀**：表格顯示但沒有資料

**檢查步驟**：
1. 確認 `tableData` 陣列有資料
2. 確認 `:data` 綁定正確
3. 檢查 `v-if` / `v-show` 條件

**解決方案**：
```typescript
// 確認 API 響應
console.log('API response:', res);
console.log('tableData:', tableData.value);
```

### 彈窗無法開啟
**症狀**：點擊按鈕沒反應

**檢查步驟**：
1. 確認 `$open` 方法名稱正確
2. 確認彈窗組件已註冊
3. 確認傳入參數正確

### 權限按鈕不顯示
**症狀**：按鈕消失

**檢查步驟**：
1. 確認權限點名稱正確
2. 確認使用者有權限
3. 檢查 `StoreSelf().HasRule()` 返回值

## 後端問題

### Prisma 連線失敗
**症狀**：`ECONNREFUSED`

**解決方案**：
1. 確認 PostgreSQL 服務運行
2. 確認 DATABASE_URL 正確
3. 確認網路連通

### Token 驗證失敗
**症狀**：所有 API 返回 401

**檢查步驟**：
1. 確認 JWT_SECRET 設定
2. 確認 Token 未過期
3. 確認 Authorization Header 格式

### 空值處理錯誤
**症狀**：Cannot read property of null

**解決方案**：
1. 確認 Zod transform 正確
2. 使用可選鏈 `?.`
3. 提供預設值

## 部署問題

### Railway 建構失敗
**常見原因**：
1. Prisma generate 未執行
2. 依賴缺失
3. 記憶體不足

**解決方案**：
```dockerfile
# 確保 prisma generate 在 build 之前
RUN npx prisma generate
RUN npm run build
```

### 資料庫遷移失敗
**症狀**：新欄位不存在

**解決方案**：
```bash
# 手動執行遷移
DATABASE_URL="..." npx prisma migrate deploy
```
