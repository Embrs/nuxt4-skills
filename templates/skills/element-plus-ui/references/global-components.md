# 全局組件 (Ly*)

## 概述

專案封裝了一系列 `Ly*` 開頭的全局組件，統一處理常見 UI 模式。

## 篩選組件

### LyFilterSearchKey

搜尋關鍵字輸入框：

```pug
LyFilterSearchKey(v-model="searchKey" @search="onSearch")
```

**Props:**
- `modelValue`: 綁定值
- `placeholder`: 提示文字（預設：「請輸入關鍵字」）

### LyFilterCompany

公司下拉選擇：

```pug
LyFilterCompany(v-model="companyId")
```

**Props:**
- `modelValue`: 綁定值
- `clearable`: 是否可清空（預設：true）

### LyFilterDateRange

日期範圍選擇：

```pug
LyFilterDateRange(v-model="dateRange")
```

**Props:**
- `modelValue`: [startDate, endDate]

### LyFilterStatus

狀態篩選：

```pug
LyFilterStatus(v-model="status" :options="statusOptions")
```

## 操作容器

### LyCtrlBtns

操作按鈕容器，自動處理間距：

```pug
LyCtrlBtns
  ElButton(type="primary" @click="ClickCreate") 新增
  ElButton(@click="ClickExport") 匯出
```

### LyTableActions

表格操作列容器：

```pug
ElTableColumn(label="操作" width="150")
  template(#default="{ row }")
    LyTableActions
      ElButton(link @click="ClickDetail(row.id)") 詳情
      ElButton(link @click="ClickEdit(row.id)") 編輯
```

## 顯示組件

### LyStatusTag

統一的狀態標籤：

```pug
LyStatusTag(:status="row.status" :text="row.statusText")
```

### LyEmptyData

空資料提示：

```pug
LyEmptyData(v-if="!tableData.length" text="暫無資料")
```

## 使用注意

1. 這些組件已全局註冊，無需手動 import
2. 優先使用封裝組件，確保 UI 一致性
3. 如需自定義，可參考原始組件實作
