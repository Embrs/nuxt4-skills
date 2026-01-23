# 表格使用模式

## 標準表格結構

```pug
.PageName__table
  ElTable(
    :data="tableData"
    v-loading="isLoading"
    border
    stripe
  )
    //- 索引列
    ElTableColumn(type="index" width="50" label="#")
    
    //- 資料列
    ElTableColumn(prop="name" label="名稱" min-width="150")
    ElTableColumn(prop="email" label="Email" min-width="200")
    
    //- 狀態列（使用 slot）
    ElTableColumn(prop="status" label="狀態" width="100")
      template(#default="{ row }")
        ElTag(:type="getStatusType(row.status)") {{ row.statusText }}
    
    //- 日期列
    ElTableColumn(prop="createdAt" label="建立時間" width="180")
      template(#default="{ row }")
        span {{ formatDate(row.createdAt) }}
    
    //- 操作列（固定寬度）
    ElTableColumn(label="操作" width="150" fixed="right")
      template(#default="{ row }")
        ElButton(link type="primary" @click="ClickDetail(row.id)") 詳情
        ElButton(link type="primary" @click="ClickEdit(row.id)") 編輯
```

## 分頁整合

```pug
.PageName__pagination
  ElPagination(
    v-model:current-page="page"
    v-model:page-size="pageSize"
    :total="total"
    :page-sizes="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    @change="onPageChange"
  )
```

```typescript
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);

const onPageChange = () => {
  ApiGetList();
};
```

## 表格配置

### 常用屬性

| 屬性 | 說明 | 建議值 |
|------|------|--------|
| `v-loading` | 載入狀態 | 綁定 `isLoading` |
| `border` | 邊框 | 通常開啟 |
| `stripe` | 斑馬紋 | 通常開啟 |
| `empty-text` | 空資料文字 | `"暫無資料"` |

### 列配置

| 屬性 | 說明 | 注意事項 |
|------|------|----------|
| `width` | 固定寬度 | 用於固定內容（狀態、操作） |
| `min-width` | 最小寬度 | 用於可變內容（名稱、描述） |
| `fixed` | 固定列 | 操作列通常 `fixed="right"` |

## 狀態標籤顏色

```typescript
const getStatusType = (status: number) => {
  const map: Record<number, string> = {
    1: 'success',   // 啟用
    2: 'danger',    // 停用
    3: 'warning',   // 待審核
    4: 'info',      // 其他
  };
  return map[status] || 'info';
};
```

## 可展開行

```pug
ElTable(:data="tableData")
  ElTableColumn(type="expand")
    template(#default="{ row }")
      .expand-content
        p 詳細資訊: {{ row.detail }}
```

## 選擇功能

```pug
ElTable(:data="tableData" @selection-change="onSelectionChange")
  ElTableColumn(type="selection" width="55")
```

```typescript
const selectedRows = ref<Item[]>([]);

const onSelectionChange = (rows: Item[]) => {
  selectedRows.value = rows;
};
```
