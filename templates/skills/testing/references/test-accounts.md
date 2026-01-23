# 測試帳號

## 環境資訊

| 環境 | URL |
|------|-----|
| 本地開發 | http://localhost:3000 |
| 測試環境 | 依專案配置 |
| 生產環境 | 依專案配置 |

## 測試帳號

> [!NOTE]
> 測試帳號由 `prisma/seed.ts` 定義，請查閱專案 seed 腳本。

**建議的帳號結構**：

### 超級管理員
- **Email**: （由 seed 定義）
- **密碼**: （由 seed 定義）
- **權限**: 所有權限
- **用途**: 全功能測試

### 公司管理員
- **Email**: （由 seed 定義）
- **密碼**: （由 seed 定義）
- **權限**: 公司管理權限
- **用途**: 權限測試

### 一般使用者
- **Email**: （由 seed 定義）
- **密碼**: （由 seed 定義）
- **權限**: 基本操作權限
- **用途**: 一般操作測試

## 登入流程

### 前端登入
```
1. 開啟 /sign-in 頁面
2. 輸入 Email 和密碼
3. 點擊登入按鈕
4. 自動跳轉到 /bgm/dashboard
```

### API 登入
```bash
curl -X POST "http://localhost:3000/nuxt-api/base/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "<測試帳號 email>",
    "password": "<測試帳號密碼>"
  }'
```

### 響應格式
```json
{
  "data": {
    "token": "eyJhbG...",
    "user": {
      "id": 1,
      "name": "使用者名稱",
      "email": "user@example.com"
    }
  },
  "status": {
    "code": 200,
    "message": {
      "zh_tw": "登入成功",
      "en": "Login success",
      "ja": "ログイン成功"
    }
  }
}
```

## 重置密碼

如需重置測試帳號密碼：
```bash
npx prisma db seed
```
