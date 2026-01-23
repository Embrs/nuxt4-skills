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
        type: 'list',
        name: 'ide',
        message: '請問您使用的 IDE 或 Agent 環境是？',
        choices: [
          { name: 'Antigravity / Claude / VS Code (目標路徑: .agent/)', value: 'antigravity' },
          { name: 'Cursor (目標路徑: .cursor/rules/)', value: 'cursor' },
          { name: 'Windsurf (目標路徑: .windsurf/rules/)', value: 'windsurf' }
        ]
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
    
    // 定義目標路徑
    let destBase;
    
    if (answers.ide === 'antigravity') {
      destBase = path.join(targetRoot, '.agent');
    } else if (answers.ide === 'cursor') {
      destBase = path.join(targetRoot, '.cursor/rules');
    } else if (answers.ide === 'windsurf') {
      destBase = path.join(targetRoot, '.windsurf/rules');
    } else {
       spinner.fail('未知的 IDE 選項');
       process.exit(1);
    }

    // 確保結構:
    // root/.agent/skills
    // root/.agent/workflows
    
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

    spinner.succeed(chalk.green('安裝完成！'));
    console.log(chalk.dim(`\n檔案已安裝至:`));
    console.log(chalk.dim(`- ${destSkills}`));
    console.log(chalk.dim(`- ${destWorkflows}`));

    if (answers.ide === 'cursor') {
        console.log(chalk.cyan(`\n[提示] Cursor 使用者:`));
        console.log(chalk.cyan(`請確認 .cursor/rules 被包含在您的 Context 索引範圍內。`));
    }
    
    if (answers.ide === 'antigravity') {
        console.log(chalk.cyan(`\n[提示] Antigravity / Claude 使用者:`));
        console.log(chalk.cyan(`請確認您的 Prompt 或設定檔已指向 .agent 目錄。`));
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
