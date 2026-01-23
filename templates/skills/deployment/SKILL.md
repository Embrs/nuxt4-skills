---
name: deployment
description: |
  專案部署技能。包含 Dockerfile 配置、Railway 部署、
  環境變數設定。準備部署或解決部署問題時使用此技能。
---

# 部署技能

> Dockerfile 配置與 Railway 部署

## 快速導航

| 文件 | 說明 |
|------|------|
| [dockerfile.md](items/dockerfile.md) | Dockerfile 配置 |
| [railway.md](items/railway.md) | Railway 部署流程 |
| [env-config.md](items/env-config.md) | 環境變數設定 |

## 部署流程速查

```
1. 本地測試通過
2. 推送代碼到 Git
3. Railway 自動觸發構建
4. 監控構建日誌
5. 驗證部署成功
```

## 關鍵配置

### Dockerfile
```dockerfile
# 建構階段
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# 運行階段
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

### Railway.toml
```toml
[build]
builder = "dockerfile"

[deploy]
restartPolicy = "always"
```

## 部署前檢查清單

- [ ] 本地 `npm run build` 成功
- [ ] 環境變數已配置
- [ ] 資料庫遷移已執行
- [ ] Prisma Client 正確生成
- [ ] 測試通過

## 常見問題

| 問題 | 解決方案 |
|------|----------|
| Prisma Client 找不到 | 確認 Dockerfile 包含 `prisma generate` |
| 記憶體不足 | 增加 Railway 資源配額 |
| 構建超時 | 優化依賴，移除不必要套件 |

## 相關技能
- [debugging](../debugging/SKILL.md) - 部署問題調試
