# 全局工具使用

## $dayjs - 日期處理

```typescript
// 格式化日期（靜態方法）
$dayjs.FormatDate(date, 'YYYY-MM-DD')           // 2024-01-15
$dayjs.FormatDate(date, 'YYYY-MM-DD HH:mm:ss')  // 2024-01-15 14:30:00

// 原生 dayjs 方法
$dayjs().format('YYYY-MM-DD')           // 當前日期
$dayjs(date).format('YYYY-MM-DD')       // 指定日期

// 日期計算
$dayjs().add(7, 'day')
$dayjs().subtract(1, 'month')
$dayjs().startOf('month')
$dayjs().endOf('week')

// 比較
$dayjs(date1).isBefore(date2)
$dayjs(date1).isAfter(date2)
$dayjs(date1).isSame(date2, 'day')

// 取得日曆（靜態方法）
$dayjs.CreateCalendar(2024, 1)  // 取得 2024 年 1 月的日曆
```

## $enum - 枚舉常數

```typescript
// API 狀態碼
$enum.apiCode.success        // 200
$enum.apiCode.badRequest     // 400
$enum.apiCode.unauthorized   // 401
$enum.apiCode.notFound       // 404
```

## $tool - 通用工具

```typescript
// 判斷類型
$tool.IsArray(value)
$tool.IsObject(value)
$tool.IsString(value)
$tool.IsNumber(value)
$tool.IsEmpty(value)         // 空值（不含 0）
$tool.HasKey(object, key)

// 生成 UUID
$tool.CreateUUID()

// 金額格式化
$tool.NumToMoney(1234567)    // '1,234,567'
$tool.MoneyToNum('1,234')    // 1234

// 複製文字到剪貼板
await $tool.CopyText('text to copy')

// 下載檔案
await $tool.DownloadLinkFile(url, 'filename.xlsx')

// 等待（async）
await $tool.Wait(1000)       // 等待 1 秒

// 滾動
$tool.ScrollTop('.container')
$tool.ScrollToTag('#section-id')

// 補零
$tool.Zero(5, 3)             // '005'

// 首字母大寫
$tool.FirstUpper('hello')    // 'Hello'
```

## $lodash - Lodash 工具

```typescript
// 深拷貝
$lodash.cloneDeep(object)

// 防抖
$lodash.debounce(fn, 300)

// 節流
$lodash.throttle(fn, 300)

// 物件操作
$lodash.pick(obj, ['name', 'email'])   // 選取指定 key
$lodash.omit(obj, ['password'])        // 移除指定 key
```

## 使用注意事項

1. 這些工具已全局注入，**無需 import**
2. 在 `<script setup>` 中直接使用即可
3. TypeScript 類型已自動推斷
