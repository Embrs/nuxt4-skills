# 表單組件規範

## ElInput

### 基本規則

```pug
//- 文字輸入：必須設定 maxlength
ElInput(v-model="form.name" maxlength="200" show-word-limit)

//- 多行文字：maxlength 設為 2000
ElInput(
  v-model="form.description"
  type="textarea"
  maxlength="2000"
  show-word-limit
  :rows="4"
)

//- 數字輸入：必須加 inputmode
ElInput(
  v-model="form.amount"
  type="number"
  inputmode="numeric"
)
```

### 常見配置

| 屬性 | 說明 | 預設值 |
|------|------|--------|
| `maxlength` | 最大長度（必填） | text=200, textarea=2000 |
| `show-word-limit` | 顯示字數限制 | 建議開啟 |
| `clearable` | 可清空 | 看情況 |
| `placeholder` | 提示文字 | 建議填寫 |

## ElSelect

### 基本規則

```pug
//- 必須設定 value-on-clear
ElSelect(
  v-model="form.companyId"
  clearable
  value-on-clear=""
  placeholder="請選擇"
)
  ElOption(
    v-for="item in companyList"
    :key="item.id"
    :label="item.name"
    :value="item.id"
  )
```

### 重要配置

| 屬性 | 說明 | 建議值 |
|------|------|--------|
| `value-on-clear` | 清空時的值 | `""` |
| `clearable` | 可清空 | 看情況 |
| `filterable` | 可搜尋 | 選項多時開啟 |

## ElDatePicker

```pug
//- 日期選擇
ElDatePicker(
  v-model="form.date"
  type="date"
  format="YYYY-MM-DD"
  value-format="YYYY-MM-DD"
  placeholder="選擇日期"
)

//- 日期時間
ElDatePicker(
  v-model="form.datetime"
  type="datetime"
  format="YYYY-MM-DD HH:mm"
  value-format="YYYY-MM-DD HH:mm:ss"
)

//- 日期範圍
ElDatePicker(
  v-model="dateRange"
  type="daterange"
  range-separator="至"
  start-placeholder="開始日期"
  end-placeholder="結束日期"
)
```

## ElFormItem

```pug
ElForm(ref="formRef" :model="form" :rules="rules" label-width="100px")
  ElFormItem(label="名稱" prop="name")
    ElInput(v-model="form.name" maxlength="200")
  
  ElFormItem(label="Email" prop="email")
    ElInput(v-model="form.email" maxlength="200")
  
  ElFormItem
    ElButton(type="primary" @click="submitForm") 送出
```

### 表單驗證

```typescript
const rules = {
  name: [
    { required: true, message: '請輸入名稱', trigger: 'blur' },
    { max: 200, message: '不可超過 200 字', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '請輸入 Email', trigger: 'blur' },
    { type: 'email', message: 'Email 格式錯誤', trigger: 'blur' },
  ],
};

const submitForm = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) return;
  // 繼續提交
};
```
