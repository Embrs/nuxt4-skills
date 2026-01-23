---
name: element-plus-ui
description: |
  Element Plus UI 組件使用技能。包含表單/表格/彈窗組件
  的使用規範與限制。當使用 ElInput、ElTable、ElDialog、
  ElMessageBox 等組件時使用此技能。
---

# Element Plus UI 技能

> Element Plus 組件使用規範與限制

## 快速導航

| 文件 | 說明 |
|------|------|
| [form-components.md](items/form-components.md) | 表單組件規範 |
| [table-patterns.md](items/table-patterns.md) | 表格使用模式 |
| [dialog-patterns.md](items/dialog-patterns.md) | 彈窗模式 |
| [message-patterns.md](items/message-patterns.md) | 訊息與確認框 |
| [forbidden.md](items/forbidden.md) | 禁止事項 |

## ⚠️ 關鍵禁止事項

> [!CAUTION]
> 以下組件**禁止直接使用**，必須使用專案封裝：
> - ❌ `ElMessageBox.confirm` → ✅ 使用 `UseAsk()`
> - ❌ `ElMessageBox.prompt` → ✅ 使用自定義 Dialog

## 核心規則速查

### ElInput
- 必須設定 `maxlength`（text=200, textarea=2000）
- `type="number"` 必須加 `inputmode="numeric"`

### ElSelect
- 清空時使用 `value-on-clear=""`

### ElTable
- 使用 `v-loading` 顯示載入狀態
- 操作列固定寬度

### ElDialog
- 三種模式：Info、Edit、Create
- 使用 `$open` 系統管理

## 自定義組件

| 組件 | 說明 |
|------|------|
| `LyFilterSearchKey` | 搜尋關鍵字輸入 |
| `LyFilterCompany` | 公司下拉選擇 |
| `LyFilterDateRange` | 日期範圍選擇 |
| `LyCtrlBtns` | 操作按鈕容器 |

## 相關技能
- [nuxt-frontend](../nuxt-frontend/SKILL.md) - 前端開發規範
