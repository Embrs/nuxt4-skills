# 禁止事項

## 禁止直接使用的組件

### ElMessageBox.confirm

```typescript
// ❌ 禁止
import { ElMessageBox } from 'element-plus';
await ElMessageBox.confirm('確定刪除嗎？', '提示', {
  confirmButtonText: '確定',
  cancelButtonText: '取消',
  type: 'warning',
});

// ✅ 正確：使用專案封裝（若已實現）
// 範例：專案可建立 UseAsk composable
import { UseAsk } from '~/composables/tool/UseAsk';
const ask = UseAsk();
await ask.Delete();
```

### ElMessageBox.prompt

```typescript
// ❌ 禁止
await ElMessageBox.prompt('請輸入內容', '提示');

// ✅ 正確：使用專案封裝的 Dialog 組件（若已實現）
// 範例：專案可建立 $open 系統
$open.OpenDialogInputPrompt({
  title: '請輸入內容',
  onConfirm: (value) => { ... }
});
```

## 禁止的寫法

### ElInput 缺少 maxlength

```pug
//- ❌ 禁止：缺少 maxlength
ElInput(v-model="form.name")

//- ✅ 正確
ElInput(v-model="form.name" maxlength="200")
```

### ElSelect 缺少 value-on-clear

```pug
//- ❌ 禁止：clearable 但沒設定 value-on-clear
ElSelect(v-model="form.type" clearable)

//- ✅ 正確
ElSelect(v-model="form.type" clearable value-on-clear="")
```

### 數字輸入缺少 inputmode

```pug
//- ❌ 禁止
ElInput(v-model="form.amount" type="number")

//- ✅ 正確
ElInput(v-model="form.amount" type="number" inputmode="numeric")
```

## 禁止的樣式修改

### 全局覆蓋 Element Plus 樣式

```scss
// ❌ 禁止：全局修改
.el-button {
  border-radius: 0;
}

// ✅ 正確：只在組件內 scoped 修改
<style lang="scss" scoped>
:deep(.el-button) {
  border-radius: 0;
}
</style>
```

## 替代方案對照表

| 禁止用法 | 替代方案 |
|----------|----------|
| `ElMessageBox.confirm` | `UseAsk()` |
| `ElMessageBox.prompt` | 自定義 Dialog |
| `ElMessageBox.alert` | `ElMessage.warning()` |
| 全局修改 EP 樣式 | scoped + `:deep()` |
