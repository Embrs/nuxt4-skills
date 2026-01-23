# Store 概覽

## 14 個 Pinia Store

| # | Store 檔案 | 功能 |
|---|------------|------|
| 0 | `store-env.ts` | 環境變數管理 |
| 1 | `store-tool.ts` | 工具函數 |
| 2 | `store-theme.ts` | 主題配置（深淺模式） |
| 3 | `store-route.ts` | 路由狀態管理 |
| 4 | `store-route-current.ts` | 當前路由資訊 |
| 5 | `store-self.ts` | **使用者資訊（重要）** |
| 6 | `store-menu.ts` | 側邊欄選單狀態 |
| 7 | `store-option.ts` | 下拉選單選項快取 |
| 8 | `store-upload.ts` | 上傳狀態管理 |
| 9 | `store-open.ts` | 彈窗狀態管理 |
| - | 其他業務 Store | 依需求擴展 |

## 主要 Store 說明

### StoreSelf（使用者資訊）

```typescript
// 使用方式
StoreSelf().userInfo          // 使用者資訊
StoreSelf().userInfo.id       // 使用者 ID
StoreSelf().userInfo.name     // 使用者名稱
StoreSelf().userInfo.companyId
StoreSelf().userInfo.roleId
StoreSelf().token             // JWT Token
StoreSelf().isLogin           // 是否已登入

// 權限檢查
StoreSelf().HasRule('customer:view')  // boolean
```

### StoreOption（選項資料）

```typescript
// 快取下拉選單選項，避免重複請求
StoreOption().companyList     // 公司列表
StoreOption().roleList        // 角色列表
StoreOption().statusOptions   // 狀態選項

// 重新載入
StoreOption().LoadCompanyList()
```

### StoreMenu（選單狀態）

```typescript
// 側邊欄控制
StoreMenu().isCollapse        // 是否收合
StoreMenu().menuList          // 選單列表
StoreMenu().activeMenu        // 當前選中選單
```

### StoreRoute（路由狀態）

```typescript
// 路由管理
StoreRoute().tabs             // 已開啟的標籤頁
StoreRoute().currentRoute     // 當前路由
StoreRoute().breadcrumbs      // 麵包屑導航
```

## Store 使用規範

1. 在 `<script setup>` 中直接使用 Store 函式
2. Store 相關操作放在組件的 Action 層
3. 避免在 Store 中直接呼叫 API（應由組件呼叫後更新 Store）
