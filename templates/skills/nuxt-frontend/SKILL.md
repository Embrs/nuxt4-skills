---
name: nuxt-frontend
description: |
  Nuxt 4 + Vue 3 前端開發技能。包含 SFC 結構規範、
  全局工具（$api/$open/$dayjs）使用、SCSS 樣式。
  開發 Vue 組件、頁面時使用此技能。
---

# Nuxt Frontend 技能

> Nuxt 4 前端開發規範與最佳實踐

## 快速導航

| 文件 | 說明 |
|------|------|
| [coding-style.md](items/coding-style.md) | SFC 區塊順序、命名規範 |
| [vue-layout.md](items/vue-layout.md) | 標準頁面結構模式 |
| [api-usage.md](items/api-usage.md) | $api 使用與空值處理 |
| [drawer-system.md](items/drawer-system.md) | $open 彈窗系統 |
| [global-utils.md](items/global-utils.md) | $dayjs/$enum/$tool/$lodash |
| [i18n.md](items/i18n.md) | 國際化使用限制 |
| [rbac.md](items/rbac.md) | 權限控制 |
| [scss-guide.md](items/scss-guide.md) | SCSS 樣式規範 |

## 核心規則速查

### SFC 結構順序（必須遵守）
1. **Imports** - 引入
2. **Props/Refs/State** - 資料
3. **Watch/Event Handlers** - 接收事件
4. **Flow Control** - 流程
5. **Helpers** - 函式
6. **API Requests** - Api
7. **Lifecycle** - 生命週期
8. **Emits** - 發送事件
9. **Expose** - 對外暴露

### 自動引入
- Nuxt 4 已自動引入 `ref`, `computed`, `onMounted` 等
- **禁止**從 `vue` 重複匯入

### 全局工具
| 工具 | 用途 |
|------|------|
| `$api` | 後端請求 |
| `$dayjs` | 日期處理 |
| `$open` | 開啟業務彈窗 |
| `$tool` | 通用工具 |
| `$enum` | 枚舉常數 |

### 空值處理
> 詳見 [prisma-database](../prisma-database/SKILL.md)

## 相關技能
- [element-plus-ui](../element-plus-ui/SKILL.md) - 使用 ElementPlus 組件時
- [nuxt-backend](../nuxt-backend/SKILL.md) - 開發 API 端點時
- [prisma-database](../prisma-database/SKILL.md) - 空值處理完整規範
