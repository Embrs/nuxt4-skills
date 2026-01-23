---
name: prisma-database
description: |
  Prisma ORM 資料庫操作技能。包含查詢模式、事務處理、
  空值處理標準（重要）、軟刪除。操作資料庫時使用此技能。
---

# Prisma Database 技能

> Prisma ORM 資料庫操作規範

## 快速導航

| 文件 | 說明 |
|------|------|
| [query-patterns.md](items/query-patterns.md) | 查詢模式與避免 N+1 |
| [transaction.md](items/transaction.md) | 事務處理 |
| [null-handling.md](items/null-handling.md) | **空值處理標準（主文件）** |
| [soft-delete.md](items/soft-delete.md) | 軟刪除機制 |
| [migration.md](items/migration.md) | 資料庫遷移 |

## 核心規則速查

### 引入 Prisma

```typescript
import { prisma } from '@@/utils/prisma';
```

### 查詢避免 N+1

```typescript
// ✅ 正確：使用 include
const users = await prisma.user.findMany({
  include: { company: true, role: true },
});

// ❌ 錯誤：迴圈查詢
for (const user of users) {
  const company = await prisma.company.findUnique({ where: { id: user.companyId } });
}
```

### 事務處理

```typescript
await prisma.$transaction(async (tx) => {
  await tx.user.create({ data: userData });
  await tx.log.create({ data: logData });
});
```

### 軟刪除

```typescript
// 標記刪除
await prisma.user.update({
  where: { id },
  data: { isDeleted: true, deletedAt: new Date() },
});

// 查詢時排除已刪除
await prisma.user.findMany({
  where: { isDeleted: false },
});
```

## ⚠️ 空值處理（跨層級標準）

> [!IMPORTANT]
> 這是整個專案的空值處理標準，前後端都需遵守。

| 階段 | 格式 | 說明 |
|------|------|------|
| 前端清空 | `""` | ElSelect 的 `value-on-clear=""` |
| 後端接收 | `""/0` → `null` | Zod transform 處理 |
| 資料庫 | `null` | SQL NULL |
| 後端返回 | `null` → `""` | 物件空值轉為空字串 |

## 相關技能
- [nuxt-backend](../nuxt-backend/SKILL.md) - API 中使用 Prisma
- [nuxt-frontend](../nuxt-frontend/SKILL.md) - 前端空值處理
