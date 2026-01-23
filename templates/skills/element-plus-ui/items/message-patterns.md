# 訊息與確認框

## ElMessage

### 基本用法

```typescript
import { ElMessage } from 'element-plus';

// 成功訊息
ElMessage.success('操作成功');

// 警告訊息
ElMessage.warning('請注意');

// 錯誤訊息
ElMessage.error('操作失敗');

// 一般訊息
ElMessage.info('提示訊息');
```

### 配置選項

```typescript
ElMessage({
  message: '這是一條訊息',
  type: 'success',
  duration: 3000,      // 顯示時間（毫秒）
  showClose: true,     // 顯示關閉按鈕
  grouping: true,      // 合併相同訊息
});
```

## UseAsk 確認框

> [!IMPORTANT]
> **禁止直接使用 `ElMessageBox.confirm`**，必須使用 `UseAsk()`

### UseAsk 用法

```typescript
import { UseAsk } from '~/composables/tool/UseAsk';

const ask = UseAsk();

// 刪除確認
const ClickDelete = async () => {
  const confirmed = await ask.Delete();
  if (!confirmed) return;
  
  await ApiDelete(id);
};

// 自定義確認
const ClickAction = async () => {
  const confirmed = await ask.Confirm({
    title: '確認執行',
    message: '確定要執行此操作嗎？',
  });
  if (!confirmed) return;
  
  await ApiAction();
};
```

### UseAsk 方法

| 方法 | 說明 | 使用場景 |
|------|------|----------|
| `ask.Delete()` | 刪除確認 | 刪除資料前 |
| `ask.Cancel()` | 取消確認 | 取消操作前 |
| `ask.Confirm(options)` | 自定義確認 | 其他確認場景 |

### Confirm 選項

```typescript
interface ConfirmOptions {
  title?: string;       // 標題
  message: string;      // 訊息內容
  confirmText?: string; // 確認按鈕文字
  cancelText?: string;  // 取消按鈕文字
  type?: 'warning' | 'info' | 'success' | 'error';
}
```

## 禁止用法

```typescript
// ❌ 禁止：直接使用 ElMessageBox
import { ElMessageBox } from 'element-plus';

await ElMessageBox.confirm('確定刪除嗎？', '提示');

// ✅ 正確：使用 UseAsk
const ask = UseAsk();
await ask.Delete();
```

## 為什麼禁止 ElMessageBox.confirm

1. **統一風格**：UseAsk 提供統一的確認框樣式
2. **國際化**：UseAsk 已處理多語言
3. **簡化代碼**：預設配置減少重複代碼
4. **維護性**：集中管理便於修改樣式
