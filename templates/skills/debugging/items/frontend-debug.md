# 前端調試技巧

## 常見問題

### 1. 資料不顯示

**檢查點：**
1. API 是否成功呼叫
2. 響應資料格式是否正確
3. 資料綁定是否正確
4. v-if 條件是否滿足

**調試步驟：**
```javascript
// 檢查資料
console.log('tableData:', tableData.value);
console.log('isLoading:', isLoading.value);
```

### 2. 按鈕無法點擊

**檢查點：**
1. disabled 屬性
2. v-if / v-show 條件
3. z-index 被覆蓋
4. 事件綁定是否正確

**調試方法：**
```javascript
// 檢查元素狀態
const btn = document.querySelector('.el-button');
console.log('disabled:', btn.disabled);
console.log('display:', getComputedStyle(btn).display);
```

### 3. 樣式問題

**檢查點：**
1. scoped 樣式是否生效
2. class 名稱是否正確
3. 是否被其他樣式覆蓋
4. :deep() 是否正確使用

### 4. 表單驗證失敗

**檢查點：**
1. required 規則
2. 資料類型是否正確
3. 空值處理

**調試：**
```typescript
const formRef = ref();
console.log(await formRef.value?.validate());
```

## 調試工具

### Vue Devtools
- 檢查組件狀態
- 追蹤資料變化
- 查看事件流

### Console 技巧
```javascript
// 追蹤 reactive 資料
console.log(toRaw(formData.value));

// 追蹤 computed
console.log(filteredList.value);
```

## 常見錯誤

| 錯誤訊息 | 可能原因 |
|----------|----------|
| `Cannot read property of undefined` | 資料未載入完成 |
| `Maximum call stack exceeded` | 無限迴圈（watch/computed） |
| `Component not found` | 組件未正確引入 |
| `Invalid prop type` | 傳入類型錯誤 |

## 調試流程

```
1. 確認問題範圍（哪個組件）
2. 檢查 Console 錯誤
3. 確認資料狀態
4. 追蹤事件流程
5. 定位問題代碼
6. 修復並測試
```
