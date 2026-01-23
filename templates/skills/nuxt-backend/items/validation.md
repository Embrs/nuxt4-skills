# Zod Schema 驗證

## 基本用法

```typescript
import { validateBody, validateQuery, validateParams } from '@@/utils/validation';
import { z } from 'zod';

// Body 驗證
const params = await validateBody(event, UserCreateSchema);

// Query 驗證
const query = validateQuery(event, ListQuerySchema);

// 路徑參數驗證
const { id } = validateParams(event, z.object({ id: z.coerce.number() }));
```

## Schema 定義

### 基本 Schema

```typescript
// server/schemas/user.schema.ts
import { z } from 'zod';

/**
 * 新增使用者 Schema
 */
export const UserCreateSchema = z.object({
  name: z.string().min(1, '名稱必填').max(255),
  email: z.string().email('Email 格式錯誤'),
  password: z.string().min(8, '密碼至少 8 字元'),
  companyId: z.number().int().positive(),
  roleId: z.number().int().positive(),
});

export type UserCreateParams = z.infer<typeof UserCreateSchema>;
```

### 更新 Schema（部分欄位可選）

```typescript
export const UserUpdateSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(20).optional(),
});

export type UserUpdateParams = z.infer<typeof UserUpdateSchema>;
```

## 空值處理 Transform

```typescript
/**
 * 將空字串轉為 null
 */
export const UserUpdateSchema = z.object({
  name: z.string().min(1).max(255),
  
  // 空字串 → null
  phone: z.string()
    .max(20)
    .optional()
    .transform(v => v === '' ? null : v),
  
  // 數字類型：0 或空字串 → null
  companyId: z.union([z.number(), z.string()])
    .optional()
    .transform(v => {
      if (v === '' || v === 0 || v === null) return null;
      return typeof v === 'string' ? parseInt(v, 10) : v;
    }),
});
```

## 常用驗證規則

```typescript
// 字串
z.string()
z.string().min(1)           // 非空
z.string().max(255)         // 最大長度
z.string().email()          // Email 格式
z.string().url()            // URL 格式
z.string().uuid()           // UUID 格式
z.string().regex(/^[0-9]+$/) // 正則

// 數字
z.number()
z.number().int()            // 整數
z.number().positive()       // 正數
z.number().min(0)           // 最小值
z.number().max(100)         // 最大值
z.coerce.number()           // 字串自動轉數字

// 布林
z.boolean()
z.coerce.boolean()          // 字串 "true"/"false" 轉換

// 陣列
z.array(z.string())
z.array(z.number()).min(1)  // 至少一個元素

// 列舉
z.enum(['active', 'inactive'])
z.nativeEnum(UserStatus)    // TypeScript enum

// 日期
z.string().datetime()       // ISO 日期字串
z.coerce.date()             // 自動轉 Date
```

## Query 分頁 Schema

```typescript
export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  searchKey: z.string().optional(),
});
```
