# 軟刪除機制

## 概述

專案使用軟刪除（Soft Delete）機制，資料不會真正刪除，而是標記為已刪除。

## 資料模型

```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String
  // ...其他欄位
  
  // 軟刪除欄位
  isDeleted Boolean   @default(false)
  deletedAt DateTime?
  deletedBy Int?
}
```

## 刪除操作

### 標記刪除

```typescript
await prisma.user.update({
  where: { id },
  data: {
    isDeleted: true,
    deletedAt: new Date(),
    deletedBy: currentUserId,
  },
});
```

### 批量刪除

```typescript
await prisma.user.updateMany({
  where: { id: { in: ids } },
  data: {
    isDeleted: true,
    deletedAt: new Date(),
    deletedBy: currentUserId,
  },
});
```

## 查詢過濾

### 排除已刪除資料

```typescript
// 查詢時必須過濾
const users = await prisma.user.findMany({
  where: {
    isDeleted: false,  // 排除已刪除
    companyId,
  },
});
```

### 標準查詢模板

```typescript
// 封裝基本 where 條件
const baseWhere = {
  isDeleted: false,
};

const users = await prisma.user.findMany({
  where: {
    ...baseWhere,
    companyId,
  },
});
```

## 復原刪除

```typescript
// 取消刪除標記
await prisma.user.update({
  where: { id },
  data: {
    isDeleted: false,
    deletedAt: null,
    deletedBy: null,
  },
});
```

## 真實刪除（謹慎使用）

```typescript
// 只在必要時使用，如 GDPR 合規
await prisma.user.delete({
  where: { id },
});
```

## 關聯資料處理

```typescript
// 刪除使用者時，同時標記相關資料
await prisma.$transaction(async (tx) => {
  // 標記使用者刪除
  await tx.user.update({
    where: { id },
    data: { isDeleted: true, deletedAt: new Date() },
  });
  
  // 標記使用者的訂單刪除（如果需要）
  await tx.order.updateMany({
    where: { userId: id },
    data: { isDeleted: true, deletedAt: new Date() },
  });
});
```

## 注意事項

1. **查詢時永遠記得過濾** `isDeleted: false`
2. **唯一約束**：考慮是否需要複合唯一（含 isDeleted）
3. **索引優化**：在 `isDeleted` 上建立索引
4. **定期清理**：設定排程清理過期的已刪除資料
