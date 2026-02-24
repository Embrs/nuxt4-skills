#!/bin/bash
# 知識庫同步檢查腳本
# 用途：檢查 .memory/context/ 知識庫狀態與專案結構是否一致
# 適用：任何專案（不綁定特定框架）

echo "🔍 知識庫同步檢查"
echo "=================="

# 專案根目錄：優先使用 git root，否則用當前目錄
PROJECT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
MEMORY_DIR="$PROJECT_ROOT/.memory"
CONTEXT_DIR="$MEMORY_DIR/context"

echo "專案根目錄: $PROJECT_ROOT"
echo ""

# --- 知識庫狀態檢查 ---
echo "📂 知識庫狀態："

if [ ! -d "$MEMORY_DIR" ]; then
  echo "❌ .memory/ 不存在 — 尚未初始化知識庫"
  echo ""
  echo "提示：請透過 AI 執行 project-knowledge 技能的初始化流程"
  exit 0
fi

if [ ! -d "$CONTEXT_DIR" ]; then
  echo "❌ .memory/context/ 不存在 — 知識庫結構不完整"
  exit 1
fi

# 檢查核心知識文件
CORE_FILES=("INDEX.md" "architecture.md" "modules.md" "tech-decisions.md" "entry-points.md" "maintenance-log.md")
MISSING=0

for file in "${CORE_FILES[@]}"; do
  if [ -f "$CONTEXT_DIR/$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (缺失)"
    MISSING=$((MISSING + 1))
  fi
done

# 列出額外的業務知識文件
EXTRA_FILES=$(find "$CONTEXT_DIR" -maxdepth 1 -name "*.md" ! -name "INDEX.md" ! -name "architecture.md" ! -name "modules.md" ! -name "tech-decisions.md" ! -name "entry-points.md" ! -name "maintenance-log.md" 2>/dev/null | sort)
if [ -n "$EXTRA_FILES" ]; then
  echo ""
  echo "📋 業務知識文件："
  while IFS= read -r f; do
    echo "  📄 $(basename "$f")"
  done <<< "$EXTRA_FILES"
fi

# --- 專案結構統計 ---
echo ""
echo "📊 專案結構統計："

# 通用統計：按副檔名統計主要源碼文件
for ext in ts tsx js jsx vue py go rs java kt swift rb php; do
  COUNT=$(find "$PROJECT_ROOT" -name "*.${ext}" \
    -not -path "*/node_modules/*" \
    -not -path "*/.git/*" \
    -not -path "*/dist/*" \
    -not -path "*/build/*" \
    -not -path "*/.next/*" \
    -not -path "*/.nuxt/*" \
    -not -path "*/vendor/*" \
    2>/dev/null | wc -l | tr -d ' ')
  if [ "$COUNT" -gt 0 ]; then
    echo "  .${ext}: ${COUNT} 個文件"
  fi
done

# 歸檔統計
if [ -d "$MEMORY_DIR/archive" ]; then
  ARCHIVE_COUNT=$(find "$MEMORY_DIR/archive" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
  echo ""
  echo "🗄️  歸檔文件: ${ARCHIVE_COUNT} 個"
fi

# --- 總結 ---
echo ""
if [ "$MISSING" -gt 0 ]; then
  echo "⚠️  有 ${MISSING} 個核心知識文件缺失，建議補齊"
else
  echo "✅ 知識庫結構完整"
fi
echo ""
echo "提示：若檔案數量與 architecture.md 記錄差異顯著，建議更新知識庫"
