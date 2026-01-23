# API 響應格式設計

## 統一響應結構

所有 API 必須返回統一格式：

```typescript
{
  data: T,
  status: {
    code: number,
    message: {
      zh_tw: string,
      en: string,
      ja: string
    }
  }
}
```

## 狀態碼定義

| 狀態碼 | 含義 | 使用場景 |
|--------|------|----------|
| 200 | 成功 | 請求處理成功 |
| 400 | 錯誤請求 | 參數驗證失敗 |
| 401 | 未授權 | Token 無效或過期 |
| 403 | 禁止訪問 | 無權限執行操作 |
| 404 | 找不到 | 資源不存在 |
| 422 | 無法處理 | 業務邏輯錯誤 |
| 999 | 系統錯誤 | 未預期的伺服器錯誤 |

## 響應工具函式

```typescript
import { 
  successResponse, 
  notFoundError, 
  badRequestError,
  forbiddenError,
  unauthorizedError,
  unprocessableError,
  serverError
} from '@@/utils/response';
```

### 成功響應

```typescript
// 單一資料
return successResponse(
  { id: 1, name: 'Test' },
  { zh_tw: '成功', en: 'Success', ja: '成功' }
);

// 列表資料（含分頁）
return successResponse({
  items: users,
  total: totalCount,
  page: params.page,
  pageSize: params.pageSize,
});

// 無資料返回
return successResponse(
  null,
  { zh_tw: '刪除成功', en: 'Deleted successfully', ja: '削除成功' }
);
```

### 錯誤響應

```typescript
// 找不到資源
return notFoundError({
  zh_tw: '使用者不存在',
  en: 'User not found',
  ja: 'ユーザーが見つかりません',
});

// 參數錯誤
return badRequestError({
  zh_tw: '參數格式錯誤',
  en: 'Invalid parameters',
  ja: 'パラメータが無効です',
});

// 無權限
return forbiddenError({
  zh_tw: '無權限執行此操作',
  en: 'Permission denied',
  ja: '権限がありません',
});
```

## 空值處理

> 完整規範見 [prisma-database/null-handling](../../prisma-database/items/null-handling.md)

### 返回資料時

```typescript
// 將 null 轉為空字串
const formatUser = (user: User) => ({
  id: user.id,
  name: user.name ?? '',
  email: user.email ?? '',
  phone: user.phone ?? '',          // null → ''
  companyId: user.companyId ?? '',  // null → ''
});

return successResponse(formatUser(user));
```
