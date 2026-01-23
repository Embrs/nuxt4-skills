# $api 使用規範

## 基本用法

`$api` 是全局注入的 API 請求工具，已自動處理：
- Token 添加
- 錯誤統一處理
- 響應格式統一

```typescript
// 直接使用，無需引入
const res = await $api.GetUserList({ page: 1, pageSize: 10 });

// 檢查響應狀態
if (res.status.code === $enum.apiStatus.success) {
  tableData.value = res.data.items;
  total.value = res.data.total;
}
```

## 標準 API 函式寫法

```typescript
const ApiGetList = async (): Promise<boolean> => {
  isLoading.value = true;
  try {
    const res = await $api.GetUserList({
      page: page.value,
      pageSize: pageSize.value,
      searchKey: searchKey.value,
    });
    
    if (res.status.code !== $enum.apiStatus.success) {
      // 錯誤會自動顯示 ElMessage
      return false;
    }
    
    tableData.value = res.data.items;
    total.value = res.data.total;
    return true;
  } finally {
    isLoading.value = false;
  }
};
```

## 錯誤處理

`$api` 已內建錯誤處理：
- 401：自動跳轉登入頁
- 其他錯誤：自動顯示 ElMessage

```typescript
// 不需要額外處理常見錯誤
const res = await $api.SaveUser(formData.value);
if (res.status.code !== $enum.apiStatus.success) {
  // 錯誤訊息已自動顯示
  return false;
}
```

## 空值處理

> 完整規範見 [prisma-database/null-handling](../../prisma-database/items/null-handling.md)

### 前端清空
```typescript
// ElSelect 清空時設定為空字串
<ElSelect v-model="formData.companyId" clearable value-on-clear="">

// 表單重置時使用空字串
const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    companyId: '',  // 空字串，非 null
  };
};
```

### 接收後端資料
```typescript
// 後端返回空值時已轉為空字串
const user = res.data;
// user.companyId 可能是 '' 而非 null
```

## API 定義位置

app/protocol/fetch-api/api/
└── auth/           # 登入、登出
└── user/           # 用戶列表、用戶資訊、用戶新增、用戶刪除
```

## 新增 API 函式
// app/protocol/fetch-api/api/user/index.ts
export const GetUserList = (params: UserListParams) => {
  return $api.get('/nuxt-api/user', params);
};

export const CreateUser = (params: UserCreateParams) => {
  return $api.post('/nuxt-api/user', params);
};

export const UpdateUser = (id: number, params: UserUpdateParams) => {
  return $api.put(`/nuxt-api/user/${id}`, params);
};
```
