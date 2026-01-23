# 認證與授權

## JWT 認證

### 自動處理
JWT 認證由 `server/middleware/auth.ts` 自動處理：
- 驗證 Token 有效性
- 解析使用者資訊
- 注入到 `event.context.user`

### 取得當前使用者

```typescript
export default defineEventHandler(async (event) => {
  // 從 context 取得使用者資訊
  const { userId, companyId, roleId } = event.context.user;
  
  // 使用完整物件
  const currentUser = event.context.user;
  console.log(currentUser.userId);
  console.log(currentUser.companyId);
  console.log(currentUser.roleId);
  console.log(currentUser.permissions);
});
```

### User Context 結構

```typescript
interface UserContext {
  userId: number;       // 使用者 ID
  companyId: number;    // 所屬公司 ID
  roleId: number;       // 角色 ID
  permissions: string[]; // 權限點列表
}
```

## 權限檢查

### 基本權限檢查

```typescript
export default defineEventHandler(async (event) => {
  const { permissions } = event.context.user;
  
  // 檢查是否有特定權限
  if (!permissions.includes('user:create')) {
    return forbiddenError({
      zh_tw: '無權限新增使用者',
      en: 'No permission to create user',
      ja: 'ユーザー作成権限がありません',
    });
  }
  
  // 繼續業務邏輯
});
```

### 公司層級檢查

```typescript
export default defineEventHandler(async (event) => {
  const { companyId } = event.context.user;
  
  // 確認目標資源屬於同一公司
  const targetUser = await prisma.user.findUnique({ where: { id: params.id } });
  
  if (targetUser?.companyId !== companyId) {
    return forbiddenError({
      zh_tw: '無權限存取其他公司資源',
      en: 'Cannot access resources from other company',
      ja: '他社のリソースにアクセスできません',
    });
  }
});
```

## 公開路由

無需認證的路由需在中間件中排除：

```typescript
// server/middleware/auth.ts
const publicPaths = [
  '/nuxt-api/base/login',
  '/nuxt-api/base/refresh-token',
  '/nuxt-api/health',
];
```

## 禁止事項

- ❌ **嚴禁**使用前端傳來的 userId/companyId 作為身份依據
- ❌ **嚴禁**在公開路由中進行敏感操作
- ❌ **嚴禁**將 Token 記錄到日誌

```typescript
// ❌ 錯誤：信任前端傳來的 ID
const { userId } = await validateBody(event, CreateSchema);
await prisma.log.create({ data: { createdBy: userId } });

// ✅ 正確：使用 context 中的 ID
const { userId } = event.context.user;
await prisma.log.create({ data: { createdBy: userId } });
```
