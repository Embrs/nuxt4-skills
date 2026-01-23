# 錯誤處理規範

## 核心原則

**使用 `return` 而非 `throw`**

```typescript
// ✅ 正確：使用 return
if (!user) {
  return notFoundError({
    zh_tw: '使用者不存在',
    en: 'User not found',
    ja: 'ユーザーが見つかりません',
  });
}

// ❌ 錯誤：使用 throw
if (!user) {
  throw notFoundError({ zh_tw: '使用者不存在' });  // 禁止！
}
```

## 錯誤函式

```typescript
import { 
  notFoundError,
  badRequestError,
  forbiddenError,
  unauthorizedError,
  unprocessableError,
  serverError
} from '@@/utils/response';
```

### 使用場景

| 函式 | 狀態碼 | 使用場景 |
|------|--------|----------|
| `notFoundError` | 404 | 資源不存在 |
| `badRequestError` | 400 | 參數錯誤、格式錯誤 |
| `forbiddenError` | 403 | 無權限操作 |
| `unauthorizedError` | 401 | 未登入、Token 過期 |
| `unprocessableError` | 422 | 業務規則衝突 |
| `serverError` | 999 | 未預期錯誤 |

## 三語言訊息（必填）

```typescript
return notFoundError({
  zh_tw: '使用者不存在',        // 繁體中文（必填）
  en: 'User not found',        // 英文（必填）
  ja: 'ユーザーが見つかりません', // 日文（必填）
});
```

## 常見錯誤處理模式

### 資源不存在

```typescript
const user = await prisma.user.findUnique({ where: { id } });

if (!user) {
  return notFoundError({
    zh_tw: '使用者不存在',
    en: 'User not found',
    ja: 'ユーザーが見つかりません',
  });
}
```

### 權限檢查

```typescript
const { companyId } = event.context.user;

if (user.companyId !== companyId) {
  return forbiddenError({
    zh_tw: '無權限存取此資源',
    en: 'Access denied',
    ja: 'アクセス権限がありません',
  });
}
```

### 業務規則檢查

```typescript
const existingUser = await prisma.user.findUnique({
  where: { email: params.email },
});

if (existingUser) {
  return unprocessableError({
    zh_tw: '此 Email 已被使用',
    en: 'Email already exists',
    ja: 'このメールアドレスは既に使用されています',
  });
}
```

### Prisma 錯誤處理

```typescript
try {
  await prisma.user.create({ data: params });
} catch (error) {
  if (error.code === 'P2002') {
    return unprocessableError({
      zh_tw: '資料重複',
      en: 'Duplicate entry',
      ja: '重複データ',
    });
  }
  throw error;  // 重新拋出未處理的錯誤
}
```

## 禁止事項

- ❌ 禁止省略任何語言的訊息
- ❌ 禁止使用 `throw` 拋出業務錯誤
- ❌ 禁止返回原始 Error 物件
- ❌ 禁止在錯誤訊息中包含敏感資訊（如密碼、Token）
