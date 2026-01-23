# 後端 API 調試

## 常見問題

### 1. API 404 Not Found

**檢查點：**
1. 路由路徑是否正確
2. HTTP 方法是否正確
3. 檔案命名是否符合規範

**範例：**
```
GET /nuxt-api/user → server/routes/nuxt-api/user/index.get.ts
POST /nuxt-api/user → server/routes/nuxt-api/user/index.post.ts
GET /nuxt-api/user/123 → server/routes/nuxt-api/user/[id].get.ts
```

### 2. 401 Unauthorized

**檢查點：**
1. Token 是否過期
2. Token 格式是否正確
3. 路由是否在白名單

### 3. 400 Bad Request

**檢查點：**
1. Schema 驗證規則
2. 請求參數格式
3. 必填欄位

**調試：**
```typescript
try {
  const params = await validateBody(event, UserSchema);
} catch (error) {
  console.error('Validation error:', error.errors);
}
```

### 4. 資料庫錯誤

**檢查點：**
1. Prisma 查詢語法
2. 關聯資料是否存在
3. 唯一約束

## 調試方法

### Console 日誌
```typescript
export default defineEventHandler(async (event) => {
  console.log('Request body:', await readBody(event));
  console.log('Query:', getQuery(event));
  console.log('Params:', event.context.params);
  console.log('User:', event.context.user);
  
  // 業務邏輯
});
```

### 查看錯誤詳情
```typescript
try {
  const user = await prisma.user.create({ data });
} catch (error) {
  console.error('Prisma error:', error.code, error.message);
  throw error;
}
```

## 常見 Prisma 錯誤

| 錯誤碼 | 含義 | 解決方案 |
|--------|------|----------|
| P2002 | 唯一約束衝突 | 檢查重複資料 |
| P2025 | 記錄不存在 | 檢查 ID 是否正確 |
| P2003 | 外鍵約束失敗 | 確認關聯資料存在 |

## 調試流程

```
1. 確認請求參數
2. 檢查認證狀態
3. 追蹤業務邏輯
4. 檢查資料庫操作
5. 驗證響應格式
6. 修復並測試
```

## 日誌查看

### 本地開發
```bash
# 開發伺服器會輸出日誌
npm run dev
```

### 生產環境（Railway）
```
Railway Dashboard → Deployments → View Logs
```
