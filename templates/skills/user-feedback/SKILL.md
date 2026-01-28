---
name: user-feedback
description: |
  使用者回饋技能。每次 AI 完成回覆後必須調用，收集用戶回饋確保溝通品質。
  
  **強制觸發：** 每次回覆完成後無條件執行，無論回覆內容為何。
---

# 用戶回饋技能

> 每次回覆後使用 MCP 工具收集用戶回饋

## 觸發規則

**必須執行：** 每次完成回覆後立即調用此 skill

## 使用方式

### 1. 檢查工具可用性
```javascript
// 動態檢測 collect_feedback 工具 (mcp0_ 到 mcp9_)
const availableTool = [
  'mcp0_collect_feedback',
  'mcp1_collect_feedback', 
  'mcp2_collect_feedback', 
  /* ... 3 4 5 6 7 8 */ 
  'mcp9_collect_feedback'
].find(tool => typeof tool == 'function');
```

### 2. 調用工具
```javascript
if (availableTool) {
  availableTool({ work_summary: "工作內容總結" });
} else {
  // 備用方案：文字詢問
  "請問這個回答對您有幫助嗎？"
}
```

## 參數
- `work_summary`: 工作內容總結（必填）

## 備用方案
當 MCP 工具不可用時，使用文字詢問：
- 「請問這個回答是否滿足您的需求？」
- 「有任何需要補充說明的地方嗎？」

## 系統整合要求
```javascript
// AI 系統必須在每次回覆後執行
if (isReplyComplete) {
  await skill('user-feedback');
}
```

