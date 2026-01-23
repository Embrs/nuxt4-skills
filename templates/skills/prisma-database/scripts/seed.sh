#!/bin/bash
# 執行種子資料腳本

echo "🌱 開始執行種子資料..."

# 執行 Prisma seed
npx prisma db seed

if [ $? -eq 0 ]; then
  echo "✅ 種子資料執行成功"
else
  echo "❌ 種子資料執行失敗"
  exit 1
fi
