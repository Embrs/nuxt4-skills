# 查詢模式

## 基本查詢

### findMany - 列表查詢

```typescript
const users = await prisma.user.findMany({
  where: {
    companyId: 1,
    isDeleted: false,
  },
  orderBy: { createdAt: 'desc' },
  skip: (page - 1) * pageSize,
  take: pageSize,
});
```

### findUnique - 單筆查詢

```typescript
const user = await prisma.user.findUnique({
  where: { id: userId },
});

if (!user) {
  return notFoundError({ zh_tw: '使用者不存在', ... });
}
```

### findFirst - 條件查詢第一筆

```typescript
const existingUser = await prisma.user.findFirst({
  where: { email: params.email },
});
```

## 使用 include 避免 N+1

### ✅ 正確：一次查詢所有關聯

```typescript
const users = await prisma.user.findMany({
  where: { companyId },
  include: {
    company: true,      // 關聯公司
    role: true,         // 關聯角色
    createdByUser: {    // 巢狀關聯
      select: { id: true, name: true },
    },
  },
});

// 直接存取關聯資料
users.forEach(user => {
  console.log(user.company?.name);
  console.log(user.role?.name);
});
```

### ❌ 錯誤：迴圈查詢（N+1 問題）

```typescript
const users = await prisma.user.findMany();

for (const user of users) {
  // ❌ 每個使用者都執行一次查詢
  const company = await prisma.company.findUnique({
    where: { id: user.companyId },
  });
}
```

## 使用 select 限制欄位

```typescript
// 只取需要的欄位
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
});
```

## 分頁查詢

```typescript
const [items, total] = await Promise.all([
  prisma.user.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
    include: { company: true },
  }),
  prisma.user.count({ where }),
]);

return successResponse({
  items,
  total,
  page,
  pageSize,
});
```

## 搜尋條件

```typescript
const where = {
  isDeleted: false,
  ...(searchKey && {
    OR: [
      { name: { contains: searchKey } },
      { email: { contains: searchKey } },
    ],
  }),
  ...(companyId && { companyId }),
  ...(status !== undefined && { status }),
};
```

## 聚合查詢

```typescript
// 計數
const count = await prisma.user.count({ where });

// 群組計數
const groupCounts = await prisma.user.groupBy({
  by: ['status'],
  _count: true,
  where: { companyId },
});
```
