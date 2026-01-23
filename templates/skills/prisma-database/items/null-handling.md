# 空值處理標準（跨層級主文件）

> [!IMPORTANT]
> 這是整個專案的空值處理標準，前端、後端、資料庫都需遵守。

## 流程概覽

```
前端清空         後端接收           資料庫           後端返回
   ↓               ↓                ↓                ↓
  ""      →    "" → null    →    NULL    →    null → ""
```

## 詳細規範

### 1. 前端清空 → `""`

```pug
//- ElSelect 清空時設為空字串
ElSelect(
  v-model="form.companyId"
  clearable
  value-on-clear=""
)

//- 表單重置
const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    companyId: '',  // 空字串，非 null
  };
};
```

### 2. 後端接收 → `""/0` 轉為 `null`

```typescript
// Zod Schema Transform
export const UserUpdateSchema = z.object({
  name: z.string().min(1).max(255),
  
  // 空字串 → null
  phone: z.string()
    .max(20)
    .optional()
    .transform(v => v === '' ? null : v),
  
  // 0 或空字串 → null（用於外鍵）
  companyId: z.union([z.number(), z.string()])
    .optional()
    .transform(v => {
      if (v === '' || v === 0 || v === null || v === undefined) {
        return null;
      }
      return typeof v === 'string' ? parseInt(v, 10) : v;
    }),
});
```

### 3. 資料庫 → 儲存 `NULL`

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  phone     String?  // 可為 NULL
  companyId Int?     // 可為 NULL
}
```

### 4. 後端返回 → `null` 轉為 `""`

```typescript
// 返回資料時轉換
const formatUser = (user: User) => ({
  id: user.id,
  name: user.name,
  phone: user.phone ?? '',        // null → ''
  companyId: user.companyId ?? '', // null → ''
  companyName: user.company?.name ?? '',
});

return successResponse(formatUser(user));
```

## 為什麼這樣設計

| 階段 | 原因 |
|------|------|
| 前端用 `""` | ElSelect 清空的預設行為，避免 v-model 問題 |
| 後端轉 `null` | 資料庫層面區分「未填」與「空字串」 |
| 返回用 `""` | 前端直接顯示，避免 `null` 出現在 UI |

## 常見問題

### Q: 如何判斷欄位是否有值？

```typescript
// 後端（處理 null）
if (user.companyId) {
  // 有值
}

// 前端（處理 ''）
if (formData.companyId !== '') {
  // 有值
}
```

### Q: 數字 0 怎麼處理？

```typescript
// 0 通常視為「無」，轉為 null
// 如果 0 是有效值（如優先順序），則另外處理
priority: z.number()
  .nullable()
  .transform(v => v === null ? 0 : v),  // null → 0
```
