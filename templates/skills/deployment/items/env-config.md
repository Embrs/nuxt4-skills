# 環境變數配置

## .env 結構

```env
# 資料庫
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# 應用
NUXT_PUBLIC_API_BASE="/nuxt-api"
NODE_ENV="development"

# 外部服務（如使用）
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME=""
```

## 環境說明

### 開發環境
- 檔案：`.env`
- Git：**不納入版控**（已在 .gitignore）

### 生產環境
- 在 Railway Dashboard 設定
- 不要提交到代碼庫

## 必要變數

| 變數 | 必要性 | 說明 |
|------|--------|------|
| `DATABASE_URL` | 必要 | PostgreSQL 連線字串 |
| `JWT_SECRET` | 必要 | JWT 簽名密鑰 |
| `NODE_ENV` | 建議 | 環境識別 |

## 變數使用

### 伺服器端
```typescript
// 使用 process.env
const secret = process.env.JWT_SECRET;

// 使用 useRuntimeConfig
const config = useRuntimeConfig();
const dbUrl = config.databaseUrl;
```

### 客戶端
```typescript
// 只有 NUXT_PUBLIC_ 前綴的變數可在客戶端使用
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
```

## Nuxt 配置

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    // 伺服器端（不曝露給客戶端）
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    
    // 客戶端可存取
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/nuxt-api',
    },
  },
});
```

## 安全注意事項

> [!CAUTION]
> **絕對禁止**將敏感資訊提交到 Git！

- ❌ 不要提交 `.env` 檔案
- ❌ 不要在代碼中硬編碼密鑰
- ✅ 使用環境變數管理敏感資訊
- ✅ 確保 `.gitignore` 包含 `.env`
