---
name: project-knowledge
description: |
  專案知識庫管理技能。了解專案架構、查找模組位置、
  維護知識庫生命週期。回答「是什麼」「在哪裡」「為什麼」。
---

# 專案知識庫

> 跨 AI 工具的通用專案知識管理框架
> 所有知識內容統一存放於 `.memory/context/`，任何 AI 工具皆可讀取

## 核心原則

- **知識存放位置**：一律存於 `.memory/context/`（不依賴任何 AI 工具特定目錄）
- **本文件職責**：僅作為 AI 行為指令，不存放實際知識內容
- **跨工具共享**：Windsurf / Cursor / Claude 等皆透過 `.memory/` 存取同一份知識

## 知識庫結構

```
.memory/
├── context/                    # 專案知識（核心）
│   ├── INDEX.md               # 快速索引（必讀入口）
│   ├── architecture.md        # 目錄結構、分層設計
│   ├── modules.md             # 功能模組清單
│   ├── tech-decisions.md      # 技術決策記錄
│   ├── entry-points.md        # 開發入口點
│   ├── maintenance-log.md     # 維護日誌
│   └── {自訂}.md              # 業務規則、領域知識等
│
└── archive/                    # 歷史歸檔
```

## AI 行為指令

### 啟動時

1. **首先讀取** `.memory/context/INDEX.md` 了解專案全貌
2. 根據任務需求，讀取對應知識文件
3. 若 `.memory/context/` 不存在，執行「初始化流程」

### 初始化流程

當專案尚未建立知識庫時：

1. 建立 `.memory/context/` 目錄
2. 掃描專案結構，自動生成以下文件：
   - `INDEX.md` — 快速索引（參考 `templates/INDEX.md` 格式）
   - `architecture.md` — 根據實際目錄結構生成
   - `modules.md` — 根據實際功能模組生成
   - `tech-decisions.md` — 根據 `package.json`、配置檔推斷技術棧
   - `entry-points.md` — 根據框架慣例生成開發入口
   - `maintenance-log.md` — 初始化日誌
3. 建立 `.memory/archive/` 目錄
4. **不要照抄模板**，必須根據實際專案內容生成

### 知識維護

#### 觸發更新時機

| 觸發條件 | 更新位置 | 動作 |
|----------|----------|------|
| 新增功能模組 | `.memory/context/modules.md` | 添加模組描述 |
| 新增業務規則 | `.memory/context/{rule}.md` | 新增規則文件，更新 INDEX |
| 目錄結構變更 | `.memory/context/architecture.md` | 更新結構描述 |
| 技術決策變更 | `.memory/context/tech-decisions.md` | 記錄決策與原因 |
| 重大變更完成 | `.memory/context/maintenance-log.md` | 記錄維護日誌 |

#### 如何更新

1. 對照實際代碼更新對應知識文件
2. 更新 `INDEX.md` 中的索引（若新增或刪除文件）
3. 記錄到 `maintenance-log.md`

#### 過時檢測

AI 應主動識別並提示：
- 「架構文件與實際目錄結構不符，建議更新」
- 「發現新模組未記錄，建議添加到 modules.md」
- 「維護日誌超過 30 天未更新，建議檢查知識庫」

### 內容歸屬判定

```
問：這個知識放哪裡？

├─ 是專案架構/結構？     → .memory/context/architecture.md
├─ 是功能模組描述？       → .memory/context/modules.md
├─ 是技術決策？           → .memory/context/tech-decisions.md
├─ 是開發入口/慣例？      → .memory/context/entry-points.md
├─ 是業務規則/領域知識？   → .memory/context/{描述性名稱}.md
├─ 是歷史記錄/已完成任務？ → .memory/archive/
└─ 以上皆非？             → 可能不需要記錄
```

### 刪除/歸檔知識

1. 確認內容已過時或不再需要
2. 若有歷史價值：移至 `.memory/archive/`
3. 若無價值：直接刪除
4. 更新 `INDEX.md` 與 `maintenance-log.md`
