#!/bin/bash
# 知識庫同步檢查腳本
# 用途：檢查實際目錄結構與知識庫描述是否一致

echo "🔍 知識庫同步檢查"
echo "=================="

# 專案根目錄（從 .windsurf/skills/project-knowledge/scripts/ 往上 4 層）
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"

# 檢查目錄是否存在
check_dir_exists() {
  if [ -d "$1" ]; then
    echo "✅ $2"
  else
    echo "❌ $2 (不存在: $1)"
  fi
}

echo ""
echo "📁 目錄結構檢查："
check_dir_exists "$PROJECT_ROOT/app/pages" "app/pages/"
check_dir_exists "$PROJECT_ROOT/app/components" "app/components/"
check_dir_exists "$PROJECT_ROOT/server/routes" "server/routes/"
check_dir_exists "$PROJECT_ROOT/prisma" "prisma/"
check_dir_exists "$PROJECT_ROOT/.memory" ".memory/"

echo ""
echo "📊 數量統計："

# 頁面數量
if [ -d "$PROJECT_ROOT/app/pages" ]; then
  PAGE_COUNT=$(find "$PROJECT_ROOT/app/pages" -name "*.vue" | wc -l | tr -d ' ')
  echo "頁面 (.vue): $PAGE_COUNT 個"
fi

# 組件數量
if [ -d "$PROJECT_ROOT/app/components" ]; then
  COMPONENT_COUNT=$(find "$PROJECT_ROOT/app/components" -name "*.vue" | wc -l | tr -d ' ')
  echo "組件 (.vue): $COMPONENT_COUNT 個"
fi

# API 端點數量
if [ -d "$PROJECT_ROOT/server/routes" ]; then
  API_COUNT=$(find "$PROJECT_ROOT/server/routes" -name "*.ts" | wc -l | tr -d ' ')
  echo "API 端點 (.ts): $API_COUNT 個"
fi

# Store 數量
if [ -d "$PROJECT_ROOT/app/stores" ]; then
  STORE_COUNT=$(find "$PROJECT_ROOT/app/stores" -name "*.ts" | wc -l | tr -d ' ')
  echo "Store (.ts): $STORE_COUNT 個"
fi

echo ""
echo "✅ 檢查完成"
echo ""
echo "提示：若數量與 architecture.md 記錄差異 > 20%，建議更新知識庫"
