# Railway 部署

## 部署流程

### 1. 初始設定
1. 連接 GitHub Repository
2. 設定環境變數
3. 配置 Railway.toml

### 2. 自動部署
```
推送代碼 → Railway 偵測 → 建構 → 部署 → 上線
```

### 3. 手動部署
- Railway Dashboard → 選擇 Service → Deploy

## Railway.toml 配置

```toml
[build]
builder = "dockerfile"
dockerfilePath = "Dockerfile"

[deploy]
restartPolicy = "always"
healthcheckPath = "/api/health"
healthcheckTimeout = 30
```

## 環境變數設定

在 Railway Dashboard 設定：

| 變數 | 說明 |
|------|------|
| `DATABASE_URL` | PostgreSQL 連線字串 |
| `JWT_SECRET` | JWT 簽名密鑰 |
| `NUXT_PUBLIC_API_BASE` | API 基礎路徑 |

## 資料庫設定

### 使用 Railway PostgreSQL
1. Add Service → Database → PostgreSQL
2. 複製 `DATABASE_URL` 到環境變數
3. 執行遷移：`npx prisma migrate deploy`

### 遷移方式
```bash
# 本地連接 Railway 資料庫執行
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

## 監控與日誌

### 查看日誌
- Railway Dashboard → Deployments → View Logs

### 常見錯誤
| 錯誤 | 解決方案 |
|------|----------|
| `ECONNREFUSED` | 檢查 DATABASE_URL |
| `Prisma not found` | 確認 prisma generate 執行 |
| `OOM Killed` | 增加記憶體配額 |

## 回滾

如需回滾：
1. Railway Dashboard → Deployments
2. 選擇之前的成功部署
3. Redeploy

## 相關文檔

詳細部署指南：
- `.agent/skills/deployment/items/dockerfile.md`
- `.agent/skills/deployment/items/env-config.md`
