# 彈窗模式

## 三種標準 Dialog 模式

### 1. Info Dialog（資訊檢視）

- **用途**：唯讀顯示詳細資訊
- **Footer**：刪除、編輯、其他業務按鈕、關閉

```pug
ElDialog(v-model="visible" title="客戶資訊" width="600px")
  //- 內容區：唯讀顯示
  ElDescriptions(:column="2" border)
    ElDescriptionsItem(label="名稱") {{ data.name }}
    ElDescriptionsItem(label="Email") {{ data.email }}
    ElDescriptionsItem(label="狀態")
      ElTag(:type="getStatusType(data.status)") {{ data.statusText }}
  
  template(#footer)
    ElButton(type="danger" @click="ClickDelete") 刪除
    ElButton(type="primary" @click="ClickEdit") 編輯
    ElButton(@click="close") 關閉
```

### 2. Edit Dialog（編輯）

- **用途**：編輯現有資料
- **Footer**：取消、確定儲存

```pug
ElDialog(v-model="visible" title="編輯客戶" width="600px")
  ElForm(ref="formRef" :model="form" :rules="rules" label-width="100px")
    ElFormItem(label="名稱" prop="name")
      ElInput(v-model="form.name" maxlength="200")
    ElFormItem(label="Email" prop="email")
      ElInput(v-model="form.email" maxlength="200")
  
  template(#footer)
    ElButton(@click="close") 取消
    ElButton(type="primary" :loading="saving" @click="ClickSave") 儲存
```

### 3. Create Dialog（新增）

- **用途**：新增資料
- **Footer**：取消、確定新增

```pug
ElDialog(v-model="visible" title="新增客戶" width="600px")
  ElForm(ref="formRef" :model="form" :rules="rules" label-width="100px")
    ElFormItem(label="名稱" prop="name")
      ElInput(v-model="form.name" maxlength="200")
    ElFormItem(label="Email" prop="email")
      ElInput(v-model="form.email" maxlength="200")
  
  template(#footer)
    ElButton(@click="close") 取消
    ElButton(type="primary" :loading="saving" @click="ClickCreate") 新增
```

## Dialog 組件結構

```vue
<script setup lang="ts">
const props = defineProps<{
  id?: number;
}>();

const emit = defineEmits<{
  close: [];
  refresh: [];
}>();

const visible = ref(false);
const form = ref({});

const open = async () => {
  visible.value = true;
  if (props.id) {
    await ApiGetDetail(props.id);
  }
};

const close = () => {
  visible.value = false;
  emit('close');
};

defineExpose({ open });
</script>
```

## Dialog 配置

| 屬性 | 說明 | 建議值 |
|------|------|--------|
| `width` | 寬度 | 小型 400px / 中型 600px / 大型 800px |
| `destroy-on-close` | 關閉後銷毀 | 表單 Dialog 建議開啟 |
| `close-on-click-modal` | 點擊遮罩關閉 | 表單 Dialog 建議關閉 |

## 使用 $open 開啟

```typescript
// 在頁面中使用
ClickDetail(id: number) {
  $open.OpenDialogCustomerInfo({ id });
}

ClickCreate() {
  $open.OpenDialogCustomerCreate({
    onRefresh: () => ApiGetList()
  });
}
```
