# SCSS 樣式規範

## 基本規則

### Scoped 樣式
```vue
<style lang="scss" scoped>
.ComponentName {
  // 樣式
}
</style>
```

### 類名規範

**禁止嵌套寫法：**
```scss
// ❌ 錯誤
.Form {
  &__input {
    // ...
  }
}

// ✅ 正確
.Form {
  // form styles
}
.Form__input {
  // input styles
}
```

### 類名命名
使用 BEM 變體：
- `.ComponentName` - 組件容器
- `.ComponentName__element` - 子元素
- `.ComponentName__element--modifier` - 修飾符

## SCSS 工具

全局注入的 mixin（無需 import）：

### 響應式設計
```scss
.PageName {
  @include rwd-pc {
    // 桌面版（>= 1024px）
  }
  
  @include rwd-tablet {
    // 平板（768px - 1023px）
  }
  
  @include rwd-mobile {
    // 手機（< 768px）
  }
}
```

### Flexbox
```scss
.Container {
  @include flex-center;        // 水平垂直居中
  @include flex-between;       // 兩端對齊
  @include flex-column;        // 垂直排列
}
```

### 文字處理
```scss
.Title {
  @include text-ellipsis;      // 單行省略
  @include text-ellipsis-2;    // 雙行省略
}
```

## 顏色變數

```scss
// 主題色
$color-primary: #409EFF;
$color-success: #67C23A;
$color-warning: #E6A23C;
$color-danger: #F56C6C;
$color-info: #909399;

// 文字色
$text-primary: #303133;
$text-regular: #606266;
$text-secondary: #909399;
$text-placeholder: #C0C4CC;

// 邊框色
$border-base: #DCDFE6;
$border-light: #E4E7ED;

// 背景色
$bg-base: #F5F7FA;
$bg-light: #FAFAFA;
```

## 樣式結構

```scss
// ---- 佈局 ----
.PageName {
  padding: 20px;
}

.PageName__header {
  margin-bottom: 20px;
}

.PageName__content {
  // ...
}

// ---- 組件 ----
.PageName__table {
  // 表格樣式
}

.PageName__pagination {
  margin-top: 20px;
  text-align: right;
}
```

## 禁止事項

- ❌ 禁止使用 `!important`（除非覆蓋第三方庫）
- ❌ 禁止使用內聯樣式
- ❌ 禁止使用 `@import`（已全局注入）
- ❌ 禁止直接修改 ElementPlus 全局樣式
