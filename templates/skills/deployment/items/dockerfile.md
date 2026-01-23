# Dockerfile 配置

## 完整 Dockerfile

```dockerfile
# 建構階段
FROM node:20-alpine AS builder

WORKDIR /app

# 複製依賴檔案
COPY package*.json ./
COPY prisma ./prisma

# 安裝依賴
RUN npm ci

# 複製源碼
COPY . .

# 生成 Prisma Client（重要！）
RUN npx prisma generate

# 建構應用
RUN npm run build

# 運行階段
FROM node:20-alpine

WORKDIR /app

# 複製建構成果
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# 曝露端口
EXPOSE 3000

# 啟動命令
CMD ["node", ".output/server/index.mjs"]
```

## 關鍵步驟說明

### 1. Prisma Generate

```dockerfile
RUN npx prisma generate
```
- 必須在 `npm run build` **之前**執行
- 生成 Prisma Client 供 Nuxt 建構使用

### 2. 多階段建構

```dockerfile
FROM node:20-alpine AS builder
# ... 建構階段

FROM node:20-alpine
# ... 運行階段
```
- 減少最終映像大小
- 只保留運行必要檔案

### 3. Prisma 目錄複製

```dockerfile
COPY --from=builder /app/prisma ./prisma
```
- 運行時需要 `schema.prisma`
- 遷移時需要 `migrations/`

## 優化建議

### 快取層優化
```dockerfile
# 先複製 package.json，利用快取
COPY package*.json ./
RUN npm ci

# 再複製其他檔案
COPY . .
```

### 清理不必要檔案
```dockerfile
# .dockerignore
node_modules
.git
.nuxt
.output
*.md
```

## 本地測試

```bash
# 建構映像
docker build -t enjoy-sleep-bgm .

# 運行容器
docker run -p 3000:3000 --env-file .env enjoy-sleep-bgm
```
