---
description: 初始化專案架構（Agent Skills 版）
---

# 專案初始化

> 掃描專案並生成 `.agent/skills/` 與 `.memory/` 知識庫結構。

---

## 🔴 核心原則

1. **Skills 系統**：技能文件存放於 `.agent/skills/`，可按需載入
2. **知識分離**：通用框架放 `.agent/skills/`，專案特定內容放 `.memory/`
3. **專案分析先行**：先分析專案結構，再生成適合的技能文件

---

## 目錄結構

```
.agent/
├── skills/                     # Agent Skills（可跨專案複用）
│   └── project-knowledge/      # 專案知識庫管理
│       ├── SKILL.md            # 主文件
│       ├── items/              # 知識項目
│       │   ├── architecture.md # 目錄結構
│       │   ├── modules.md      # 功能模組
│       │   ├── tech-decisions.md # 技術決策
│       │   └── entry-points.md # 開發入口
│       └── references/         # 參考資料
│           └── maintenance-log.md # 維護日誌
└── workflows/                  # 工作流程

.memory/
├── context/                    # 專案特定業務規則
│   └── BUSINESS_OVERVIEW.md    # 業務概覽
└── archive/                    # 歷史歸檔
```

---

## 執行步驟

### Phase 1: 探索專案
// turbo
1. 列出根目錄結構
// turbo
2. 讀取配置檔（優先：`package.json` > `Cargo.toml` > `pyproject.toml` > `go.mod`）
// turbo
3. 識別框架類型、程式語言、主要模組
// turbo
4. 抽樣 3-5 個代表性程式碼檔案，推斷：
   - 縮排風格、引號風格、分號使用
   - 命名慣例、註解語言
   - 框架特殊慣例

### Phase 2: 創建目錄結構
// turbo
5. 創建所有目錄：
   ```bash
   mkdir -p .agent/skills/project-knowledge/{items,references,scripts} .memory/{context,archive}
   ```

### Phase 3: 創建知識庫文件
// turbo
6. 創建 `.agent/skills/project-knowledge/SKILL.md`
// turbo
7. 創建 `items/architecture.md`
// turbo
8. 創建 `items/modules.md`
// turbo
9. 創建 `items/tech-decisions.md`
// turbo
10. 創建 `items/entry-points.md`
// turbo
11. 創建 `references/maintenance-log.md`

### Phase 4: 創建業務文件（專案特定）
// turbo
12. 創建 `.memory/context/BUSINESS_OVERVIEW.md`

### Phase 5: 填充內容
13. 根據 Phase 1 結果更新：
    - `items/architecture.md`：目錄結構、分層設計
    - `items/modules.md`：功能模組清單
    - `items/tech-decisions.md`：技術決策記錄
    - `items/entry-points.md`：開發入口點
    - `.memory/context/BUSINESS_OVERVIEW.md`：專案業務概覽

### Phase 6: 驗證
// turbo
14. 驗證：
    - [ ] `project-knowledge/SKILL.md` 存在且格式正確
    - [ ] `items/` 包含 4 個核心檔案
    - [ ] `references/maintenance-log.md` 已初始化
    - [ ] `.memory/context/BUSINESS_OVERVIEW.md` 存在

### Phase 7: 回覆摘要
15. 回覆專案概覽：語言、框架、技術棧、模組數量、創建檔案

---

## 📄 模板

### 模板 A：SKILL.md

```markdown
---
name: project-knowledge
description: |
  專案知識庫管理技能。了解專案架構、查找模組位置、
  維護知識庫生命週期。回答「是什麼」「在哪裡」「為什麼」。
---

# 專案知識庫

> 通用專案知識管理框架

## 快速導航

| 文件 | 說明 |
|------|------|
| [architecture.md](items/architecture.md) | 目錄結構、分層設計 |
| [modules.md](items/modules.md) | 功能模組清單 |
| [tech-decisions.md](items/tech-decisions.md) | 技術決策記錄 |
| [entry-points.md](items/entry-points.md) | 開發入口點 |

## 業務內容索引

> 專案特定的業務邏輯存放於 `.memory/context/`

| 業務類型 | 位置 |
|----------|------|
| 業務概覽 | `.memory/context/BUSINESS_OVERVIEW.md` |
| 業務規則 | `.memory/context/*.md` |
| 歷史歸檔 | `.memory/archive/` |

## 知識維護

### 觸發更新時機

| 觸發條件 | 更新位置 | 動作 |
|----------|----------|------|
| 新增功能模組 | `items/modules.md` | 添加模組描述 |
| 新增業務規則 | `.memory/context/` | 新增規則文件 |
| 資料庫 Schema 變更 | `items/architecture.md` | 更新資料模型 |
| 技術決策變更 | `items/tech-decisions.md` | 記錄決策 |
```

### 模板 B：maintenance-log.md

```markdown
# 知識庫維護日誌

> 記錄所有知識庫變更歷史

## YYYY-MM

### YYYY-MM-DD
- **[新增]** `文件名` - 描述

---

## 記錄格式

### 變更類型
- `[新增]` - 新增文件或內容
- `[更新]` - 更新現有內容
- `[刪除]` - 刪除文件
- `[歸檔]` - 移至歸檔
- `[重構]` - 結構調整
```

### 模板 C：BUSINESS_OVERVIEW.md

```markdown
# 專案業務概覽

> 專案特定的業務邏輯與概念，供 AI 參考。

## 專案定位

**[專案名稱]**
- **定位**：[一句話描述]
- **技術棧**：[主要技術]
- **部署**：[部署平台]

## 關鍵概念速查

<!-- 根據專案填充 -->

## 業務規則索引

| 規則 | 文件 |
|------|------|
| - | - |
```

---

## 🔄 與舊結構的對應

| 舊結構 (`.project/`) | 新結構 |
|---------------------|--------|
| `ARCHITECTURE.md` | `.agent/skills/project-knowledge/SKILL.md` |
| `architecture/*.md` | `.agent/skills/project-knowledge/items/*.md` |
| `CONVENTIONS.md` | `.agent/skills/*/SKILL.md` (分散到各技能) |
| `PROJECT_STATE.md` | 由 OpenSpec + `/task` workflow 管理 |
| `business/*.md` | `.memory/context/*.md` |
| `archive/*.md` | `.memory/archive/*.md` |