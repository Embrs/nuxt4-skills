---
description: Git 提交 + 知識庫維護
---

# Git 提交流程

> 提交變更並維護專案知識庫（`.memory/context/`）。

---

## 🔴 職責分離

| 內容 | 本 Workflow 是否更新 |
|------|---------------------|
| 專案知識庫 | ✅ 若有架構/模組變更 |
| 業務規則 | ✅ 若有業務邏輯變更 |
| 維護日誌 | ✅ 記錄重要變更 |

---

## 執行步驟

### Step 1: 檢查狀態
// turbo
1. 檢查當前狀態：
   ```bash
   git status
   ```

### Step 2: 分析變更類型

2. 根據變更檔案分析是否需要更新知識庫：

#### 架構相關變更 → 更新 `.memory/context/`

| 變更類型 | 更新目標 |
|----------|----------|
| 新增模組/目錄 | `.memory/context/modules.md` |
| 目錄結構變更 | `.memory/context/architecture.md` |
| 技術棧/依賴升級 | `.memory/context/tech-decisions.md` |
| 重大架構決策 | `.memory/context/tech-decisions.md` |

#### 業務規則變更 → 更新 `.memory/context/`

| 變更類型 | 更新目標 |
|----------|----------|
| 新的業務流程 | `.memory/context/` 新增文件 |
| 業務邏輯變更 | 對應業務規則文件 |

3. 若需更新，執行對應更新並記錄到維護日誌

### Step 3: 更新維護日誌（若有知識庫變更）
4. 若有更新知識庫，記錄到：
   ```
   .memory/context/maintenance-log.md
   ```
   
   格式：
   ```markdown
   ### YYYY-MM-DD
   - **[類型]** `影響文件` - 變更描述
   ```

### Step 4: 更新版本號（預設執行）

5. **每次提交都更新版本號**（除非純文件 typo 修正）：

| 變更類型 | 版本更新 | 範例 |
|----------|----------|------|
| `fix` | patch +1 | 1.0.0 → 1.0.1 |
| `feat` | minor +1 | 1.0.0 → 1.1.0 |
| `modify` | patch +1 | 1.0.0 → 1.0.1 |
| `refactor` | patch +1 | 1.0.0 → 1.0.1 |
| `docs` | patch +1 | 1.0.0 → 1.0.1 |
| `style` | patch +1 | 1.0.0 → 1.0.1 |
| `test` | patch +1 | 1.0.0 → 1.0.1 |
| `chore` | patch +1 | 1.0.0 → 1.0.1 |
| 重大變更 | major +1 | 1.0.0 → 2.0.0 |

**例外情況**（不更新版本號）：
- 純文字錯字修正
- 註解調整
- 格式微調

```bash
# 使用 npm version（自動更新 package.json）
npm version patch --no-git-tag-version  # 或 minor / major
```

### Step 5: 暫存所有變更
6. 加入所有變更（包含原始變更 + 知識庫更新 + 版本更新）：
   ```bash
   git add .
   ```

### Step 5: 檢視變更
// turbo
6. 檢視變更內容：
   ```bash
   git diff --staged --stat
   ```

### Step 6: 生成 Commit 訊息

7. 根據 `git diff --staged` 生成 Conventional Commits 訊息：

**格式**：
```
<type>(<scope>): <描述>

[可選 body]
```

**類型**：
- `feat`: 新功能
- `fix`: Bug 修復
- `docs`: 文件更新
- `style`: 程式碼格式
- `refactor`: 重構
- `test`: 測試
- `chore`: 雜項

**語言**：繁體中文

### Step 7: 執行提交
```bash
git commit -m "你的提交訊息"
```

---

## 📌 知識庫更新提醒

### 觸發條件

| 觸發條件 | 更新位置 | 動作 |
|----------|----------|------|
| 新增功能模組 | `.memory/context/modules.md` | 添加模組描述 |
| 新增業務規則 | `.memory/context/{rule}.md` | 新增規則文件，更新 INDEX |
| 資料庫 Schema 變更 | `.memory/context/architecture.md` | 更新資料模型 |
| 技術決策變更 | `.memory/context/tech-decisions.md` | 記錄決策 |
| 重大變更完成 | `.memory/context/maintenance-log.md` | 記錄維護 |

### 內容歸屬判定

```
問：這個內容放哪裡？

├─ 是專案架構/結構？     → .memory/context/architecture.md
├─ 是功能模組描述？       → .memory/context/modules.md
├─ 是技術決策？           → .memory/context/tech-decisions.md
├─ 是開發入口/慣例？      → .memory/context/entry-points.md
├─ 是業務規則/領域知識？   → .memory/context/{描述性名稱}.md
├─ 是歷史記錄/已完成任務？ → .memory/archive/
└─ 以上皆非？             → 可能不需要記錄
```

---

## 🔄 與其他 Workflow 的關係

```
/task          → 建立並執行任務
/task-complete → 任務歸檔 + git commit
/git-commit    → 單純提交 + 知識庫維護 ← 你在這裡
```