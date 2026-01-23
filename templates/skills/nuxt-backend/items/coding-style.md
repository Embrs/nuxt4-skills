# 後端代碼風格

## 標準 API 端點結構

```typescript
// server/routes/nuxt-api/user/index.post.ts
import { successResponse, badRequestError } from '@@/utils/response';
import { prisma } from '@@/utils/prisma';
import { validateBody } from '@@/utils/validation';
import { UserCreateSchema } from '@@/schemas/user.schema';

/**
 * 新增使用者
 */
export default defineEventHandler(async (event) => {
  // 1. 驗證參數
  const params = await validateBody(event, UserCreateSchema);
  
  // 2. 取得當前使用者
  const { userId, companyId } = event.context.user;
  
  // 3. 業務邏輯
  const user = await prisma.user.create({
    data: {
      ...params,
      createdBy: userId,
    },
  });
  
  // 4. 返回響應
  return successResponse(
    { id: user.id },
    {
      zh_tw: '建立成功',
      en: 'Created successfully',
      ja: '作成成功',
    }
  );
});
```

## 註解規範

```typescript
/**
 * 取得使用者列表
 * @description 支援分頁與關鍵字搜尋
 */
export default defineEventHandler(async (event) => {
  // ...
});
```

## 檔案組織

```
server/
├── routes/nuxt-api/
│   ├── user/
│   │   ├── index.get.ts      # GET /nuxt-api/user（列表）
│   │   ├── index.post.ts     # POST /nuxt-api/user（新增）
│   │   ├── [id].get.ts       # GET /nuxt-api/user/:id（詳情）
│   │   ├── [id].put.ts       # PUT /nuxt-api/user/:id（更新）
│   │   └── [id].delete.ts    # DELETE /nuxt-api/user/:id（刪除）
├── schemas/
│   └── user.schema.ts        # Zod Schema
└── utils/
    ├── response.ts           # 響應工具
    ├── prisma.ts             # 資料庫工具
    └── validation.ts         # 驗證工具
```

## 函式命名

| 類型 | 慣例 | 範例 |
|------|------|------|
| API Handler | `defineEventHandler` | - |
| 輔助函式 | camelCase + 動詞 | `formatUser`, `validateEmail` |
| Schema | PascalCase + 用途 | `UserCreateSchema`, `UserUpdateSchema` |

## 禁止事項

- ❌ 禁止使用 `throw` 拋出錯誤
- ❌ 禁止使用硬編碼 ID（使用 `event.context.user`）
- ❌ 禁止省略三語言錯誤訊息
- ❌ 禁止直接返回 Prisma 原始資料（應包裝在 `successResponse` 中）
