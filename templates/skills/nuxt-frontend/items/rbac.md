# RBAC 權限控制

## 權限系統概述

專案使用 RBAC（Role-Based Access Control）權限系統：
- 使用者 → 角色 → 權限點
- 權限檢查透過 `StoreSelf().HasRule()` 進行

## 權限點格式

```
{module}:{action}

例如：
- customer:view     # 檢視客戶
- customer:create   # 新增客戶
- customer:edit     # 編輯客戶
- customer:delete   # 刪除客戶
```

## 前端權限控制

### 按鈕級控制

```pug
//- 使用 v-if
ElButton(
  v-if="StoreSelf().HasRule('customer:create')"
  type="primary"
  @click="ClickCreate"
) 新增客戶

//- 使用 computed
ElButton(
  v-if="canEdit"
  @click="ClickEdit"
) 編輯
```

```typescript
// Script 中
const canEdit = computed(() => StoreSelf().HasRule('customer:edit'));
const canDelete = computed(() => StoreSelf().HasRule('customer:delete'));
```

### 頁面級控制

路由中間件自動處理：
```typescript
// middleware/permission.ts
// 自動檢查使用者是否有權訪問頁面
```

## StoreSelf 常用方法

```typescript
// 檢查權限
StoreSelf().HasRule('customer:view')  // boolean

// 取得使用者資訊
StoreSelf().userInfo.id
StoreSelf().userInfo.name
StoreSelf().userInfo.companyId
StoreSelf().userInfo.roleId

// 檢查登入狀態
StoreSelf().isLogin  // boolean

// 取得 Token
StoreSelf().token
```

## 權限點清單

### 客戶管理
- `customer:view` - 檢視客戶列表
- `customer:create` - 新增客戶
- `customer:edit` - 編輯客戶
- `customer:delete` - 刪除客戶

### CT 拍攝
- `ct-shooting:view` - 檢視拍攝單
- `ct-shooting:create` - 新增拍攝單
- `ct-shooting:edit` - 編輯拍攝單
- `ct-shooting:upload` - 上傳檔案

### 系統管理
- `user:view` - 檢視使用者
- `user:create` - 新增使用者
- `role:view` - 檢視角色
- `role:edit` - 編輯角色

## 注意事項

1. **前端權限僅為 UI 控制**，後端 API 必須再次驗證
2. 權限點名稱使用小寫加冒號分隔
3. 新增權限點需同步更新後端和資料庫
