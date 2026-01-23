---
name: nuxt-backend
description: |
  Nuxt Server Routes 後端開發技能。包含 API 響應格式、
  錯誤處理（return 非 throw）、Zod 驗證、JWT 認證。
  開發 /nuxt-api/* 端點時使用此技能。
---

# Nuxt Backend 技能

> Nuxt Server Routes 開發規範

## 快速導航

| 文件 | 說明 |
|------|------|
| [coding-style.md](items/coding-style.md) | 後端代碼風格 |
| [api-design.md](items/api-design.md) | API 響應格式設計 |
| [validation.md](items/validation.md) | Zod Schema 驗證 |
| [error-handling.md](items/error-handling.md) | 錯誤處理規範 |
| [auth-context.md](items/auth-context.md) | 認證與授權 |

## 核心規則速查

### API 響應格式
```typescript
{
  data: T,
  status: {
    code: number,      // 200, 400, 401, 404, 422, 999
    message: {
      zh_tw: string,   // 繁體中文
      en: string,      // 英文
      ja: string       // 日文
    }
  }
}
```

### 錯誤處理（關鍵）
```typescript
// ✅ 正確：使用 return
if (!resource) {
  return notFoundError({ zh_tw: '找不到', en: 'Not found', ja: '見つかりません' });
}

// ❌ 錯誤：使用 throw
if (!resource) {
  throw notFoundError({ zh_tw: '找不到' });  // 禁止！
}
```

### 標準工具
```typescript
import { successResponse, notFoundError, badRequestError } from '@@/utils/response';
import { prisma } from '@@/utils/prisma';
import { validateBody, validateQuery, validateParams } from '@@/utils/validation';
```

### 空值處理
> 詳見 [prisma-database](../prisma-database/SKILL.md)

## 相關技能
- [prisma-database](../prisma-database/SKILL.md) - 資料庫操作時
- [nuxt-frontend](../nuxt-frontend/SKILL.md) - 前端調用 API 時
