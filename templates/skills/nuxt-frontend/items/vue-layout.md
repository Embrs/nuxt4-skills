# 標準頁面結構模式

## 管理頁面結構

大部分管理頁面遵循以下標準模式：

```pug
.PageName
  //- -- 上方操作區 --
  .PageName__actions
    //- 篩選表單
    LyFilterSearchKey(v-model="searchKey")
    LyFilterCompany(v-model="companyId") 
    //- 操作按鈕
    LyCtrlBtns
      ElButton(type="primary" @click="ClickCreate") 新增

  //- -- 資料列表 --
  .PageName__table
    ElTable(:data="tableData" v-loading="isLoading")
      ElTableColumn(prop="name" label="名稱")
      ElTableColumn(prop="status" label="狀態")
        template(#default="{ row }")
          ElTag(:type="getStatusType(row.status)") {{ row.statusText }}
      ElTableColumn(label="操作" width="150")
        template(#default="{ row }")
          ElButton(link @click="ClickDetail(row.id)") 詳情
          ElButton(link @click="ClickEdit(row.id)") 編輯

  //- -- 分頁 --
  .PageName__pagination
    ElPagination(
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next, sizes"
      @change="onPageChange"
    )
```

## 組件組合

### 篩選組件
- `LyFilterSearchKey` - 關鍵字搜尋
- `LyFilterCompany` - 公司篩選
- `LyFilterDateRange` - 日期範圍
- `LyFilterStatus` - 狀態篩選

### 操作按鈕容器
- `LyCtrlBtns` - 統一的按鈕容器，自動處理間距

## Dialog 模式

### 三種標準 Dialog
1. **Info Dialog** - 唯讀檢視
   - Footer：刪除、編輯、其他業務按鈕、關閉
   
2. **Edit Dialog** - 編輯模式
   - 所有欄位可編輯 + 表單驗證
   - Footer：取消、確定儲存
   
3. **Create Dialog** - 新增模式
   - 欄位為空或預設值
   - Footer：取消、確定新增

### Dialog 開啟方式
```typescript
// 使用 $open 系統
ClickDetail(id: number) {
  $open.OpenDialogCustomerInfo({ id });
}

ClickCreate() {
  $open.OpenDialogCustomerCreate();
}
```

## 權限控制

```pug
//- 按鈕級權限
ElButton(
  v-if="StoreSelf().HasRule('customer:create')"
  @click="ClickCreate"
) 新增

//- 或使用 v-show
ElButton(
  v-show="canEdit"
  @click="ClickEdit"
) 編輯
```

```typescript
// Script 中檢查權限
const canEdit = computed(() => StoreSelf().HasRule('customer:edit'));
```
