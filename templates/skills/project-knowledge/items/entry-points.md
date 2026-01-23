# 開發入口點

## 前端開發

### 新增頁面
```
app/pages/bgm/{category}/{page-name}.vue
```
- 自動註冊路由
- 使用 `default` layout

### 新增組件
```
app/components/{category}/{ComponentName}.vue
```
- 全局自動導入
- 直接使用 `<ComponentName />`

### 新增彈窗
```
app/components/open/OpenDialog{Name}.vue
```
- 透過 `$open.OpenDialog{Name}()` 調用

### 新增 Composable
```
app/composables/{category}/Use{Name}.ts
```
- 全局自動導入
- 使用 `Use{Name}()`

### 新增 Store
```
app/stores/{number}.store-{name}.ts
```
- 編號確保載入順序
- 使用 `Store{Name}()`

## 後端開發

### 新增 API 端點
```
server/routes/nuxt-api/{module}/{endpoint}.[method].ts
```
- method: get, post, put, delete, patch

### 新增驗證 Schema
```
server/schemas/{module}.schema.ts
```
- 導出 Schema 和 Type

## 資料庫

### 修改資料模型
```
prisma/schema.prisma
```
- 修改後執行 `npx prisma migrate dev`

### 新增種子資料
```
prisma/seed.ts
```
- 執行 `npx prisma db seed`

## 共用類型

### API 類型
```
shared/types/api/{module}.ts
```
- 前後端共用的類型定義

## 快速開始模板

### 新增 CRUD 功能

1. **資料模型** - `prisma/schema.prisma`
2. **後端 API** - `server/routes/nuxt-api/{module}/`
3. **驗證 Schema** - `server/schemas/{module}.schema.ts`
4. **前端 Protocol** - `app/protocol/fetch-api/api/{module}/`
5. **前端頁面** - `app/pages/bgm/{category}/{page}.vue`
6. **前端彈窗** - `app/components/open/OpenDialog{Name}*.vue`
