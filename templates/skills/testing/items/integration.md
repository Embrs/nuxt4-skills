# 整合測試

## 概念

整合測試驗證多個組件協同工作的正確性，包含：
- 前端 → API → 資料庫 完整流程
- 多個 API 的連續操作
- 業務流程的端對端測試

## 測試流程

### 完整 CRUD 流程
```
1. 登入取得 Token
2. 取得列表（確認初始狀態）
3. 新增資料
4. 取得列表（確認新增成功）
5. 編輯資料
6. 取得詳情（確認編輯成功）
7. 刪除資料
8. 取得列表（確認刪除成功）
```

### 業務流程測試
```
CT 拍攝流程：
1. 建立拍攝單
2. 預約時段
3. 報到
4. 上傳檔案
5. 提交分析
6. 確認報告生成
```

## 測試環境

### 隔離測試資料
- 使用專用測試帳號
- 測試資料加上特定前綴（如 `TEST_`）
- 測試後清理資料

### 資料庫重置
```bash
# 重置資料庫（開發環境）
npx prisma migrate reset
npx prisma db seed
```

## 測試案例模板

### 端對端測試
```typescript
describe('使用者管理', () => {
  it('完整 CRUD 流程', async () => {
    // 1. 登入
    const token = await login('<測試帳號 email>', '<測試帳號密碼>');
    
    // 2. 新增
    const createRes = await api.post('/user', { name: 'Test' }, token);
    expect(createRes.status.code).toBe(200);
    const userId = createRes.data.id;
    
    // 3. 查詢
    const getRes = await api.get(`/user/${userId}`, token);
    expect(getRes.data.name).toBe('Test');
    
    // 4. 更新
    await api.put(`/user/${userId}`, { name: 'Updated' }, token);
    
    // 5. 驗證
    const verifyRes = await api.get(`/user/${userId}`, token);
    expect(verifyRes.data.name).toBe('Updated');
    
    // 6. 刪除
    await api.delete(`/user/${userId}`, token);
  });
});
```

## 注意事項

1. 整合測試較慢，謹慎選擇測試案例
2. 注意測試順序依賴
3. 確保測試環境與生產環境隔離
4. 定期執行回歸測試
