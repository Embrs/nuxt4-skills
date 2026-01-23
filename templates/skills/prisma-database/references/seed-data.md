# 種子資料

## 概述

種子資料（Seed Data）用於初始化資料庫，包含預設角色、權限、測試帳號等。

## 執行種子

```bash
# 執行種子腳本
npx prisma db seed

# 或使用專案腳本
npm run db:seed
```

## 種子檔案位置

```
prisma/
├── schema.prisma
└── seed.ts        # 種子腳本
```

## 種子資料內容

### 預設角色

| ID | 角色名稱 | 說明 |
|----|----------|------|
| 1 | 超級管理員 | 擁有所有權限 |
| 2 | 公司管理員 | 管理公司資料 |
| 3 | 一般使用者 | 基本操作權限 |

### 測試帳號

> [!NOTE]
> 測試帳號由各專案自行定義於 `prisma/seed.ts`

**建議的帳號結構**：

| 角色 | 建議 Email 格式 | 用途 |
|------|-----------------|------|
| 超級管理員 | admin@example.com | 全功能測試 |
| 公司管理員 | manager@example.com | 權限測試 |
| 一般使用者 | user@example.com | 一般操作測試 |

## 種子腳本範例

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 建立角色
  await prisma.role.createMany({
    data: [
      { id: 1, name: '超級管理員' },
      { id: 2, name: '公司管理員' },
      { id: 3, name: '一般使用者' },
    ],
    skipDuplicates: true,
  });

  // 建立測試帳號（請自行設定 email 和密碼）
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: '測試管理員',
      password: hashedPassword,  // 需加密
      roleId: 1,
    },
  });

  console.log('Seed completed');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

## package.json 配置

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

## 注意事項

1. 種子資料應為**冪等**（可重複執行）
2. 使用 `upsert` 或 `skipDuplicates` 避免重複
3. 生產環境謹慎執行種子
4. 密碼需加密後儲存
