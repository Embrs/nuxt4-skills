# 後端 API 測試

## 測試方法

### 使用 cURL

```bash
# GET 請求
curl -X GET "http://localhost:3000/nuxt-api/user" \
  -H "Authorization: Bearer {token}"

# POST 請求
curl -X POST "http://localhost:3000/nuxt-api/user" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{"name": "測試", "email": "<email>"}'
```

### 使用 fetch

```typescript
const response = await fetch('http://localhost:3000/nuxt-api/user', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
const data = await response.json();
```

## 測試案例

### 成功案例
```typescript
// 預期響應
{
  data: { id: 1, name: "測試" },
  status: {
    code: 200,
    message: { zh_tw: "成功", en: "Success", ja: "成功" }
  }
}
```

### 錯誤案例
```typescript
// 404 Not Found
{
  data: null,
  status: {
    code: 404,
    message: { zh_tw: "找不到資源", en: "Not found", ja: "見つかりません" }
  }
}

// 400 Bad Request
{
  data: null,
  status: {
    code: 400,
    message: { zh_tw: "參數錯誤", en: "Invalid params", ja: "パラメータエラー" }
  }
}
```

## 測試檢查清單

### 成功流程
- [ ] 正確的狀態碼（200）
- [ ] 正確的資料格式
- [ ] 資料內容正確
- [ ] 資料庫已更新

### 錯誤處理
- [ ] 缺少必填參數 → 400
- [ ] 資源不存在 → 404
- [ ] 無權限 → 403
- [ ] 未認證 → 401
- [ ] 錯誤訊息三語言完整

### 驗證
- [ ] Schema 驗證生效
- [ ] 空值處理正確
- [ ] 類型轉換正確

## 取得測試 Token

```bash
# 登入取得 Token
curl -X POST "http://localhost:3000/nuxt-api/base/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "<測試帳號 email>", "password": "<測試帳號密碼>"}'
```
