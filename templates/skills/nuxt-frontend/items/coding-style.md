# SFC 結構與命名規範

## SFC 區塊順序

所有 Vue 組件必須遵循以下結構順序：

```vue
<script setup lang="ts">
// ========== 1. Imports ==========
import type { SomeType } from '~/types';
import SomeComponent from '~/components/SomeComponent.vue';

// ========== 2. Props/Refs/State ==========
const props = defineProps<{
  id: number;
}>();

const formData = ref({
  name: '',
  email: '',
});

// ========== 3. Watch/Event Handlers ==========
watch(() => props.id, (newId) => {
  fetchData(newId);
});

const ClickSave = () => {
  SaveFlow();
};

// ========== 4. Flow Control ==========
const SaveFlow = async (): Promise<boolean> => {
  if (!formData.value.name) return false;
  const success = await ApiSave();
  if (!success) return false;
  emit('refresh');
  return true;
};

// ========== 5. Helpers ==========
const formatDate = (date: string) => {
  return $dayjs(date).format('YYYY-MM-DD');
};

// ========== 6. API Requests ==========
const ApiSave = async (): Promise<boolean> => {
  const res = await $api.SaveData(formData.value);
  if (res.status.code !== $enum.apiStatus.success) {
    return false;
  }
  return true;
};

// ========== 7. Lifecycle ==========
onMounted(() => {
  fetchData(props.id);
});

// ========== 8. Emits ==========
const emit = defineEmits<{
  refresh: [];
}>();

// ========== 9. Expose ==========
defineExpose({
  SaveFlow,
});
</script>

<template lang="pug">
.ComponentName
  //- 內容
</template>

<style lang="scss" scoped>
.ComponentName {
  // 樣式
}
</style>
```

## 命名規範

### 函式命名
| 類型 | 前綴 | 範例 |
|------|------|------|
| 點擊事件 | `Click*` | `ClickSave`, `ClickDelete` |
| 流程控制 | `*Flow` | `SaveFlow`, `DeleteFlow` |
| API 呼叫 | `Api*` | `ApiSave`, `ApiGetList` |
| 輔助函式 | 動詞開頭 | `formatDate`, `validateForm` |

### 變數命名
| 類型 | 慣例 | 範例 |
|------|------|------|
| ref | camelCase | `formData`, `isLoading` |
| props | camelCase | `userId`, `showHeader` |
| computed | camelCase | `filteredList`, `totalCount` |
| 常數 | UPPER_SNAKE | `MAX_LENGTH`, `API_TIMEOUT` |

## 禁止事項

- ❌ 禁止從 `vue` 匯入已自動引入的函式
- ❌ 禁止使用 `ElMessageBox.confirm`（使用 `UseAsk`）
- ❌ 禁止在 `<script>` 中直接操作 DOM
