#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');

const TEMPLATE_DIR = path.join(__dirname, '../templates');

async function main() {
  console.log(chalk.bold.blue('\n🔥  Embrs Skills Toolkit 安裝程式 \n'));

  try {
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'ides',
        message: '請選擇要安裝的 IDE 環境（可複選，使用空白鍵選取）：',
        choices: [
          { name: 'Antigravity / Claude / VS Code → .agent/', value: 'antigravity', checked: true },
          { name: 'Cursor → .cursor/', value: 'cursor' },
          { name: 'Windsurf → .windsurf/', value: 'windsurf' }
        ],
        validate: (input) => input.length > 0 || '請至少選擇一個環境'
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: '即將安裝 Skills 與 Workflows，確定繼續嗎？',
        default: true
      }
    ]);

    if (!answers.confirm) {
      console.log(chalk.yellow('已取消安裝。'));
      process.exit(0);
    }

    const spinner = ora('正在安裝 Skills 與 Workflows...').start();
    const targetRoot = process.cwd();
    const installedPaths = [];
    
    // IDE 路徑對應表
    const idePathMap = {
      antigravity: '.agent',
      cursor: '.cursor',
      windsurf: '.windsurf'
    };

    // 遍歷所有選擇的 IDE 環境進行安裝
    for (const ide of answers.ides) {
      const destBase = path.join(targetRoot, idePathMap[ide]);
      const destSkills = path.join(destBase, 'skills');
      const destWorkflows = path.join(destBase, 'workflows');

      // 確保目錄存在
      await fs.ensureDir(destSkills);
      await fs.ensureDir(destWorkflows);

      // 複製 Skills
      const srcSkills = path.join(TEMPLATE_DIR, 'skills');
      if (await fs.pathExists(srcSkills)) {
        await fs.copy(srcSkills, destSkills, { overwrite: true });
      }

      // 複製 Workflows
      const srcWorkflows = path.join(TEMPLATE_DIR, 'workflows');
      if (await fs.pathExists(srcWorkflows)) {
        await fs.copy(srcWorkflows, destWorkflows, { overwrite: true });
      }

      installedPaths.push(destBase);
    }

    spinner.succeed(chalk.green('安裝完成！'));
    console.log(chalk.dim('\n檔案已安裝至:'));
    installedPaths.forEach(p => console.log(chalk.dim(`  • ${p}`)));

    // 顯示對應的提示
    if (answers.ides.includes('cursor')) {
      console.log(chalk.cyan('\n[提示] Cursor 使用者:'));
      console.log(chalk.cyan('請確認 .cursor/rules 被包含在您的 Context 索引範圍內。'));
    }
    
    if (answers.ides.includes('antigravity')) {
      console.log(chalk.cyan('\n[提示] Antigravity / Claude 使用者:'));
      console.log(chalk.cyan('請確認您的 Prompt 或設定檔已指向 .agent 目錄。'));
    }

  } catch (err) {
    if(err.isTtyError) {
        console.log(chalk.red("目前的環境無法顯示互動選單"));
    } else {
        console.error(chalk.red('發生錯誤:'), err);
    }
    process.exit(1);
  }
}

main();
