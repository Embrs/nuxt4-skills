# API 路徑對應

## 命名規則

### 前端 Protocol → 後端 Route

```
$api.{Action}{Entity}  →  {METHOD} /nuxt-api/{entity}
```

| 前端 Protocol | 後端 Route |
|--------------|------------|
| `$api.GetUserList` | `GET /nuxt-api/user` |
| `$api.GetUser` | `GET /nuxt-api/user/:id` |
| `$api.CreateUser` | `POST /nuxt-api/user` |
| `$api.UpdateUser` | `PUT /nuxt-api/user/:id` |
| `$api.DeleteUser` | `DELETE /nuxt-api/user/:id` |
| `$api.UpdateUserStatus` | `PATCH /nuxt-api/user/:id/status` |

### Action 前綴對應

| Action | HTTP Method | 用途 |
|--------|-------------|------|
| Get | GET | 查詢 |
| Create | POST | 新增 |
| Update | PUT | 完整更新 |
| Patch | PATCH | 部分更新 |
| Delete | DELETE | 刪除 |

## 主要 API 清單

### 使用者模組
- `GET /nuxt-api/user` - 列表
- `POST /nuxt-api/user` - 新增
- `GET /nuxt-api/user/:id` - 詳情
- `PUT /nuxt-api/user/:id` - 更新
- `DELETE /nuxt-api/user/:id` - 刪除

### CT 拍攝模組
- `GET /nuxt-api/ct-shooting` - 列表
- `POST /nuxt-api/ct-shooting` - 新增
- `GET /nuxt-api/ct-shooting/:id` - 詳情
- `PUT /nuxt-api/ct-shooting/:id` - 更新
- `PATCH /nuxt-api/ct-shooting/:id/status` - 更新狀態

### 公司模組
- `GET /nuxt-api/company` - 列表
- `POST /nuxt-api/company` - 新增

> 更多 API 詳情請參考 `server/routes/nuxt-api/` 目錄結構
