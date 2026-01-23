# API 檔案命名規則

## Nuxt Server Routes 命名慣例

Nuxt 使用檔案系統路由，檔案名稱決定 HTTP 方法和路徑。

## 命名對照表

| HTTP 方法 | URL 路徑 | 檔案路徑 |
|----------|---------|---------|
| GET | `/nuxt-api/user` | `server/routes/nuxt-api/user/index.get.ts` |
| POST | `/nuxt-api/user` | `server/routes/nuxt-api/user/index.post.ts` |
| GET | `/nuxt-api/user/:id` | `server/routes/nuxt-api/user/[id].get.ts` |
| PUT | `/nuxt-api/user/:id` | `server/routes/nuxt-api/user/[id].put.ts` |
| DELETE | `/nuxt-api/user/:id` | `server/routes/nuxt-api/user/[id].delete.ts` |
| PATCH | `/nuxt-api/user/:id/status` | `server/routes/nuxt-api/user/[id]/status.patch.ts` |

## 命名規則

### 檔案名稱格式
```
[路徑].[HTTP方法].ts
```

### 動態參數
使用 `[paramName]` 表示動態參數：
```
[id].get.ts        → GET  /user/:id
[userId].put.ts    → PUT  /user/:userId
```

### 巢狀路由
```
server/routes/nuxt-api/
├── user/
│   ├── index.get.ts           # GET /nuxt-api/user
│   ├── index.post.ts          # POST /nuxt-api/user
│   ├── [id].get.ts            # GET /nuxt-api/user/:id
│   ├── [id].put.ts            # PUT /nuxt-api/user/:id
│   ├── [id].delete.ts         # DELETE /nuxt-api/user/:id
│   └── [id]/
│       ├── status.patch.ts    # PATCH /nuxt-api/user/:id/status
│       └── password.put.ts    # PUT /nuxt-api/user/:id/password
```

## 範例：CRUD API 結構

```
server/routes/nuxt-api/customer/
├── index.get.ts       # 列表查詢 + 分頁
├── index.post.ts      # 新增
├── [id].get.ts        # 取得詳情
├── [id].put.ts        # 完整更新
├── [id].delete.ts     # 軟刪除
└── [id]/
    └── status.patch.ts # 更新狀態
```

## 取得路徑參數

```typescript
// [id].get.ts
export default defineEventHandler(async (event) => {
  // 方法 1：直接取得
  const id = getRouterParam(event, 'id');
  
  // 方法 2：使用 validateParams
  const { id } = validateParams(event, z.object({ 
    id: z.coerce.number() 
  }));
});
```
