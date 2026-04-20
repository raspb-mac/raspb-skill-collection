#!/usr/bin/env node

/**
 * docx_generator.js
 * 
 * Word document (.docx) creation and manipulation via python-docx
 * 
 * Usage:
 *   node docx_generator.js create --output file.docx [--title "..."] [--content "..."]
 *   node docx_generator.js add-section --input in.docx --output out.docx --heading "..." --content "..."
 *   node docx_generator.js add-image --input in.docx --output out.docx --image logo.png [--width 5]
 *   node docx_generator.js apply-template --input in.docx --output out.docx --template template.docx [--variables {...}]
 *   node docx_generator.js create-template --output template.docx --name "..." [--primary-color "#003366"]
 *   node docx_generator.js list-templates
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SCRIPT_DIR = __dirname;
const ASSETS_DIR = path.join(SCRIPT_DIR, '..', 'assets');
const PYTHON_SCRIPT = path.join(SCRIPT_DIR, 'docx_generator.py');

// Try to use virtual environment Python if available
const VENV_PYTHON = path.join(process.env.HOME || '/root', '.openclaw', 'python-env', 'bin', 'python3');
const PYTHON_BIN = require('fs').existsSync(VENV_PYTHON) ? VENV_PYTHON : 'python3';

// Ensure assets directory exists
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const command = process.argv[2];
const args = process.argv.slice(3);

// Parse arguments
const opts = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].substring(2);
    const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
    opts[key] = value;
    if (value !== true) i++;
  }
}

// Route commands
try {
  switch (command) {
    case 'create':
      handleCreate(opts);
      break;
    case 'add-section':
      handleAddSection(opts);
      break;
    case 'add-image':
      handleAddImage(opts);
      break;
    case 'apply-template':
      handleApplyTemplate(opts);
      break;
    case 'create-template':
      handleCreateTemplate(opts);
      break;
    case 'list-templates':
      handleListTemplates(opts);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.error('Available commands: create, add-section, add-image, apply-template, create-template, list-templates');
      process.exit(1);
  }
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}

function handleCreate(opts) {
  if (!opts.output) throw new Error('--output is required');

  const pythonCmd = [
    `${PYTHON_BIN} ${PYTHON_SCRIPT}`,
    `create`,
    `--output "${opts.output}"`,
    opts.title ? `--title "${opts.title}"` : '',
    opts.content ? `--content "${opts.content}"` : '',
    opts.template ? `--template "${opts.template}"` : '',
    opts.variables ? `--variables '${opts.variables}'` : '',
    opts.font ? `--font "${opts.font}"` : '',
    opts.size ? `--size ${opts.size}` : '',
    opts.color ? `--color "${opts.color}"` : ''
  ].filter(Boolean).join(' ');

  console.log(`[office-documents] Creating document: ${opts.output}`);
  execSync(pythonCmd, { stdio: 'inherit' });
  console.log(`[office-documents] ✅ Document created: ${opts.output}`);
}

function handleAddSection(opts) {
  if (!opts.input) throw new Error('--input is required');
  if (!opts.output) throw new Error('--output is required');
  if (!opts.heading) throw new Error('--heading is required');
  if (!opts.content) throw new Error('--content is required');

  const pythonCmd = [
    `${PYTHON_BIN} ${PYTHON_SCRIPT}`,
    `add-section`,
    `--input "${opts.input}"`,
    `--output "${opts.output}"`,
    `--heading "${opts.heading}"`,
    `--content "${opts.content}"`,
    opts.level ? `--level ${opts.level}` : '',
    opts.position ? `--position ${opts.position}` : ''
  ].filter(Boolean).join(' ');

  console.log(`[office-documents] Adding section: ${opts.heading}`);
  execSync(pythonCmd, { stdio: 'inherit' });
  console.log(`[office-documents] ✅ Section added: ${opts.output}`);
}

function handleAddImage(opts) {
  if (!opts.input) throw new Error('--input is required');
  if (!opts.output) throw new Error('--output is required');
  if (!opts.image) throw new Error('--image is required');

  const pythonCmd = [
    `${PYTHON_BIN} ${PYTHON_SCRIPT}`,
    `add-image`,
    `--input "${opts.input}"`,
    `--output "${opts.output}"`,
    `--image "${opts.image}"`,
    opts.width ? `--width ${opts.width}` : '',
    opts.height ? `--height ${opts.height}` : '',
    opts.caption ? `--caption "${opts.caption}"` : '',
    opts.position ? `--position ${opts.position}` : ''
  ].filter(Boolean).join(' ');

  console.log(`[office-documents] Adding image to document`);
  execSync(pythonCmd, { stdio: 'inherit' });
  console.log(`[office-documents] ✅ Image added: ${opts.output}`);
}

function handleApplyTemplate(opts) {
  if (!opts.input) throw new Error('--input is required');
  if (!opts.output) throw new Error('--output is required');
  if (!opts.template) throw new Error('--template is required');

  const pythonCmd = [
    `${PYTHON_BIN} ${PYTHON_SCRIPT}`,
    `apply-template`,
    `--input "${opts.input}"`,
    `--output "${opts.output}"`,
    `--template "${opts.template}"`,
    opts.variables ? `--variables '${opts.variables}'` : ''
  ].filter(Boolean).join(' ');

  console.log(`[office-documents] Applying template styling`);
  execSync(pythonCmd, { stdio: 'inherit' });
  console.log(`[office-documents] ✅ Template applied: ${opts.output}`);
}

function handleCreateTemplate(opts) {
  if (!opts.output) throw new Error('--output is required');
  if (!opts.name) throw new Error('--name is required');

  const pythonCmd = [
    `${PYTHON_BIN} ${PYTHON_SCRIPT}`,
    `create-template`,
    `--output "${opts.output}"`,
    `--name "${opts.name}"`,
    opts.description ? `--description "${opts.description}"` : '',
    opts.font ? `--font "${opts.font}"` : '',
    opts['primary-color'] ? `--primary-color "${opts['primary-color']}"` : '',
    opts['secondary-color'] ? `--secondary-color "${opts['secondary-color']}"` : '',
    opts.logo ? `--logo "${opts.logo}"` : '',
    opts['company-name'] ? `--company-name "${opts['company-name']}"` : ''
  ].filter(Boolean).join(' ');

  console.log(`[office-documents] Creating template: ${opts.name}`);
  execSync(pythonCmd, { stdio: 'inherit' });
  console.log(`[office-documents] ✅ Template created: ${opts.output}`);
}

function handleListTemplates(opts) {
  const pythonCmd = `${PYTHON_BIN} ${PYTHON_SCRIPT} list-templates`;
  execSync(pythonCmd, { stdio: 'inherit' });
}
