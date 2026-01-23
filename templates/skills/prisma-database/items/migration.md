# 資料庫遷移

## 遷移流程

### 1. 修改 Schema

```prisma
// prisma/schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  phone     String?  // 新增欄位
}
```

### 2. 建立遷移

```bash
# 建立遷移檔案
npx prisma migrate dev --name add_phone_to_user

# 只產生遷移檔案（不執行）
npx prisma migrate dev --create-only --name add_phone_to_user
```

### 3. 套用遷移（生產環境）

```bash
npx prisma migrate deploy
```

## 常用指令

| 指令 | 說明 |
|------|------|
| `npx prisma migrate dev` | 開發環境：建立並套用遷移 |
| `npx prisma migrate deploy` | 生產環境：套用遷移 |
| `npx prisma migrate reset` | 重置資料庫（刪除所有資料） |
| `npx prisma generate` | 重新產生 Prisma Client |
| `npx prisma db push` | 推送 Schema 變更（不建立遷移） |

## 遷移檔案

```
prisma/migrations/
├── 20240115_init/
│   └── migration.sql
├── 20240120_add_phone_to_user/
│   └── migration.sql
└── migration_lock.toml
```

## 自訂遷移

```sql
-- prisma/migrations/xxx/migration.sql
-- 手動修改 SQL

-- 資料遷移
UPDATE "User" SET phone = '' WHERE phone IS NULL;

-- 加入約束
ALTER TABLE "User" ALTER COLUMN phone SET NOT NULL;
```

## 注意事項

### 破壞性變更

```prisma
// ❌ 危險：直接刪除欄位會遺失資料
model User {
  id    Int    @id
  // name  String  // 刪除欄位
}

// ✅ 安全：先備份資料，再執行遷移
```

### 修改欄位類型

```prisma
// ❌ 危險：直接修改類型可能失敗
model User {
  age  String  // 原本是 Int
}

// ✅ 安全：建立新欄位 → 遷移資料 → 刪除舊欄位
```

## 回滾遷移

Prisma 不支援自動回滾，需手動處理：

```bash
# 1. 找到要回滾的遷移
# 2. 手動執行反向 SQL
# 3. 刪除遷移記錄
npx prisma migrate resolve --rolled-back 20240120_add_phone_to_user
```
