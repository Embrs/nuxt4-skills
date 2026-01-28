#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');

const TEMPLATE_DIR = path.join(__dirname, '../templates');

/**
 * 獲取可用的 skills 列表
 */
async function getAvailableSkills() {
  const skillsDir = path.join(TEMPLATE_DIR, 'skills');
  const skills = [];
  
  if (await fs.pathExists(skillsDir)) {
    const items = await fs.readdir(skillsDir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        skills.push({
          name: item.name,
          value: item.name,
          checked: ['project-knowledge', 'user-feedback'].includes(item.name)
        });
      }
    }
  }
  
  return skills;
}

/**
 * 獲取可用的 workflows 列表
 */
async function getAvailableWorkflows() {
  const workflowsDir = path.join(TEMPLATE_DIR, 'workflows');
  const workflows = [];
  
  if (await fs.pathExists(workflowsDir)) {
    const items = await fs.readdir(workflowsDir, { withFileTypes: true });
    for (const item of items) {
      if (item.isFile() && item.name.endsWith('.md')) {
        const name = item.name.replace('.md', '');
        workflows.push({
          name: name,
          value: name,
          checked: ['git-commit', 'user-feedback'].includes(name)
        });
      }
    }
  }
  
  return workflows;
}

/**
 * 複製指定的 skills
 */
async function copySelectedSkills(selectedSkills, destSkillsDir, targetIde) {
  await fs.ensureDir(destSkillsDir);
  
  for (const skill of selectedSkills) {
    const srcSkill = path.join(TEMPLATE_DIR, 'skills', skill);
    const destSkill = path.join(destSkillsDir, skill);
    
    if (await fs.pathExists(srcSkill)) {
      await copyAndReplacePaths(srcSkill, destSkill, targetIde);
    }
  }
}

/**
 * 複製指定的 workflows
 */
async function copySelectedWorkflows(selectedWorkflows, destWorkflowsDir, targetIde) {
  await fs.ensureDir(destWorkflowsDir);
  
  for (const workflow of selectedWorkflows) {
    const srcWorkflow = path.join(TEMPLATE_DIR, 'workflows', `${workflow}.md`);
    const destWorkflow = path.join(destWorkflowsDir, `${workflow}.md`);
    
    if (await fs.pathExists(srcWorkflow)) {
      let content = await fs.readFile(srcWorkflow, 'utf8');
      
      // 根據 IDE 替換路徑引用
      const pathReplacements = {
        antigravity: {
          '.agent': '.agent',
          '.cursor': '.agent',
          '.windsurf': '.agent'
        },
        cursor: {
          '.agent': '.cursor',
          '.cursor': '.cursor',
          '.windsurf': '.cursor'
        },
        windsurf: {
          '.agent': '.windsurf',
          '.cursor': '.windsurf',
          '.windsurf': '.windsurf'
        }
      };
      
      const replacements = pathReplacements[targetIde];
      for (const [oldPath, newPath] of Object.entries(replacements)) {
        const regex = new RegExp(`\\${oldPath}`, 'g');
        content = content.replace(regex, newPath);
      }
      
      await fs.writeFile(destWorkflow, content);
    }
  }
}

/**
 * 複製目錄並動態替換路徑引用
 */
async function copyAndReplacePaths(srcDir, destDir, targetIde) {
  await fs.ensureDir(destDir);
  
  // IDE 路徑替換映射
  const pathReplacements = {
    antigravity: {
      '.agent': '.agent',
      '.cursor': '.agent',
      '.windsurf': '.agent'
    },
    cursor: {
      '.agent': '.cursor',
      '.cursor': '.cursor',
      '.windsurf': '.cursor'
    },
    windsurf: {
      '.agent': '.windsurf',
      '.cursor': '.windsurf',
      '.windsurf': '.windsurf'
    }
  };

  const replacements = pathReplacements[targetIde];
  
  // 遞歸處理所有檔案
  const items = await fs.readdir(srcDir, { withFileTypes: true });
  
  for (const item of items) {
    const srcPath = path.join(srcDir, item.name);
    const destPath = path.join(destDir, item.name);
    
    if (item.isDirectory()) {
      await copyAndReplacePaths(srcPath, destPath, targetIde);
    } else {
      // 讀取檔案內容
      let content = await fs.readFile(srcPath, 'utf8');
      
      // 替換路徑引用
      for (const [oldPath, newPath] of Object.entries(replacements)) {
        const regex = new RegExp(`\\${oldPath}`, 'g');
        content = content.replace(regex, newPath);
      }
      
      // 寫入檔案
      await fs.writeFile(destPath, content);
    }
  }
}

async function main() {
  console.log(chalk.bold.blue('\n🔥  Embrs Skills Toolkit 安裝程式 \n'));

  try {
    // 獲取可用的 skills 和 workflows
    const [availableSkills, availableWorkflows] = await Promise.all([
      getAvailableSkills(),
      getAvailableWorkflows()
    ]);

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
        type: 'checkbox',
        name: 'skills',
        message: '請選擇要安裝的 Skills（可複選，使用空白鍵選取）：',
        choices: availableSkills,
        validate: (input) => input.length > 0 || '請至少選擇一個 Skill'
      },
      {
        type: 'checkbox',
        name: 'workflows',
        message: '請選擇要安裝的 Workflows（可複選，使用空白鍵選取）：',
        choices: availableWorkflows,
        validate: (input) => input.length > 0 || '請至少選擇一個 Workflow'
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: '即將安裝選定的 Skills 與 Workflows，確定繼續嗎？',
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

      // 複製選定的 Skills
      await copySelectedSkills(answers.skills, destSkills, ide);

      // 複製選定的 Workflows
      await copySelectedWorkflows(answers.workflows, destWorkflows, ide);

      installedPaths.push(destBase);
    }

    spinner.succeed(chalk.green('安裝完成！'));
    console.log(chalk.dim('\n檔案已安裝至:'));
    installedPaths.forEach(p => console.log(chalk.dim(`  • ${p}`)));

    // 顯示安裝的項目
    console.log(chalk.cyan('\n已安裝的 Skills:'));
    answers.skills.forEach(skill => console.log(chalk.cyan(`  • ${skill}`)));
    
    console.log(chalk.cyan('\n已安裝的 Workflows:'));
    answers.workflows.forEach(workflow => console.log(chalk.cyan(`  • ${workflow}`)));

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
