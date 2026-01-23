# 事務處理

## 使用 $transaction

多表操作必須使用事務，確保資料一致性：

```typescript
await prisma.$transaction(async (tx) => {
  // 建立使用者
  const user = await tx.user.create({
    data: {
      name: params.name,
      email: params.email,
      companyId: params.companyId,
    },
  });
  
  // 建立操作日誌
  await tx.operationLog.create({
    data: {
      action: 'CREATE_USER',
      targetId: user.id,
      createdBy: currentUserId,
    },
  });
  
  return user;
});
```

## 事務選項

```typescript
await prisma.$transaction(
  async (tx) => {
    // 事務操作
  },
  {
    maxWait: 5000,    // 最大等待時間（ms）
    timeout: 10000,   // 事務超時時間（ms）
    isolationLevel: 'Serializable', // 隔離級別
  }
);
```

## 批量操作事務

```typescript
// 多個獨立操作
const [users, roles] = await prisma.$transaction([
  prisma.user.findMany(),
  prisma.role.findMany(),
]);
```

## 錯誤處理

```typescript
try {
  await prisma.$transaction(async (tx) => {
    await tx.user.update({ where: { id }, data });
    await tx.log.create({ data: logData });
  });
} catch (error) {
  // 事務自動回滾
  if (error.code === 'P2002') {
    return unprocessableError({ zh_tw: '資料重複', ... });
  }
  throw error;
}
```

## 巢狀事務

```typescript
// 在事務中呼叫其他函式
await prisma.$transaction(async (tx) => {
  await createUser(tx, userData);
  await createLog(tx, logData);
});

// 輔助函式接收 tx
async function createUser(tx: PrismaClient, data: UserData) {
  return tx.user.create({ data });
}
```

## 使用場景

| 場景 | 是否需要事務 |
|------|-------------|
| 新增使用者 + 建立日誌 | ✅ 需要 |
| 轉帳（扣款 + 加款） | ✅ 需要 |
| 批量更新狀態 | ✅ 需要 |
| 單筆查詢 | ❌ 不需要 |
| 單筆更新 | ❌ 不需要 |

## 注意事項

1. 事務內避免耗時操作（如外部 API 呼叫）
2. 保持事務範圍最小化
3. 注意超時設定，預設 5 秒可能不夠
