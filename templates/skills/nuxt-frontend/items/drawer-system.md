# $open 彈窗系統

## 概述

`$open` 是全局彈窗管理工具，統一管理所有業務彈窗的開啟。

## 基本用法

```typescript
// 開啟 Info Dialog
ClickDetail(id: number) {
  $open.OpenDialogCustomerInfo({ id });
}

// 開啟 Create Dialog
ClickCreate() {
  $open.OpenDialogCustomerCreate();
}

// 開啟 Edit Dialog（帶回調）
ClickEdit(id: number) {
  $open.OpenDialogCustomerEdit({ 
    id,
    onSuccess: () => {
      ApiGetList();  // 重新載入列表
    }
  });
}
```

## Dialog 組件命名規範

```
components/open/
├── OpenDialogCustomerInfo.vue     # 客戶資訊（唯讀）
├── OpenDialogCustomerEdit.vue     # 客戶編輯
├── OpenDialogCustomerCreate.vue   # 客戶新增
├── OpenDialogOrderDetail.vue      # 訂單詳情
└── ...
```

命名規則：`OpenDialog{業務名稱}{模式}.vue`

## 彈窗內部結構

```vue
<script setup lang="ts">
// Props
const props = defineProps<{
  id?: number;
}>();

// Emit
const emit = defineEmits<{
  close: [];
  refresh: [];
}>();

// 開啟方法
const Open = async () => {
  visible.value = true;
  if (props.id) {
    await ApiGetDetail(props.id);
  }
};

// 關閉方法
const Close = () => {
  visible.value = false;
  emit('close');
};

// 暴露方法
defineExpose({ open });
</script>

<template lang="pug">
ElDialog(v-model="visible" title="客戶資訊" width="600px")
  //- 內容
  template(#footer)
    ElButton(@click="close") 關閉
    ElButton(type="primary" @click="ClickSave") 儲存
</template>
```

## 使用 $dialog 開啟彈窗

`$dialog` 提供了更直接的彈窗開啟方式：

```typescript
// 在組件中使用
$dialog.OpenDialogCustomerCreate();

// 傳遞參數
$dialog.OpenDialogCustomerInfo({ id: 123 });

// 監聽事件
$dialog.OpenDialogCustomerEdit({
  id: 123,
  onRefresh: () => {
    fetchList();
  }
});
```

## 彈窗與頁面關係

```
pages/customer-management.vue
  ├── 使用 $open.OpenDialogCustomerCreate()
  ├── 使用 $open.OpenDialogCustomerInfo({ id })
  └── 使用 $open.OpenDialogCustomerEdit({ id })
```

## 禁止事項

- ❌ 禁止直接使用 `ElMessageBox.confirm`
- ❌ 禁止在彈窗內開啟另一個全屏彈窗
- ✅ 使用 `UseAsk()` 進行簡單確認
