#!/usr/bin/env node

/**
 * pptx_generator.js
 * 
 * PowerPoint presentation (.pptx) creation and manipulation via python-pptx
 * 
 * Usage:
 *   node pptx_generator.js create --output file.pptx [--title "..."] [--slides '[{...}]']
 *   node pptx_generator.js add-slide --input in.pptx --output out.pptx --layout content --heading "..."
 *   node pptx_generator.js add-image --input in.pptx --output out.pptx --slide 0 --image logo.png
 *   node pptx_generator.js apply-master --input in.pptx --output out.pptx --master master.pptx
 *   node pptx_generator.js create-template --output template.pptx --name "..." [--primary-color "#003366"]
 *   node pptx_generator.js list-templates
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SCRIPT_DIR = __dirname;
const ASSETS_DIR = path.join(SCRIPT_DIR, '..', 'assets');
const PYTHON_SCRIPT = path.join(SCRIPT_DIR, 'pptx_generator.py');

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
    case 'add-slide':
      handleAddSlide(opts);
      break;
    case 'add-image':
      handleAddImage(opts);
      break;
    case 'apply-master':
      handleApplyMaster(opts);
      break;
    case 'create-template':
      handleCreateTemplate(opts);
      break;
    case 'list-templates':
      handleListTemplates(opts);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.error('Available commands: create, add-slide, add-image, apply-master, create-template, list-templates');
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
    opts.subtitle ? `--subtitle "${opts.subtitle}"` : '',
    opts.slides ? `--slides '${opts.slides}'` : '',
    opts.template ? `--template "${opts.template}"` : '',
    opts.width ? `--width ${opts.width}` : '',
    opts.height ? `--height ${opts.height}` : '',
    opts.theme ? `--theme "${opts.theme}"` : ''
  ].filter(Boolean).join(' ');

  console.log(`[powerpoint-documents] Creating presentation: ${opts.output}`);
  execSync(pythonCmd, { stdio: 'inherit' });
  console.log(`[powerpoint-documents] ✅ Presentation created: ${opts.output}`);
}

function handleAddSlide(opts) {
  if (!opts.input) throw new Error('--input is required');
  if (!opts.output) throw new Error('--output is required');
  if (!opts.layout) throw new Error('--layout is required');

  const pythonCmd = [
    `${PYTHON_BIN} ${PYTHON_SCRIPT}`,
    `add-slide`,
    `--input "${opts.input}"`,
    `--output "${opts.output}"`,
    `--layout "${opts.layout}"`,
    opts.heading ? `--heading "${opts.heading}"` : '',
    opts.content ? `--content "${opts.content}"` : '',
    opts.position ? `--position ${opts.position}` : ''
  ].filter(Boolean).join(' ');

  console.log(`[powerpoint-documents] Adding slide with layout: ${opts.layout}`);
  execSync(pythonCmd, { stdio: 'inherit' });
  console.log(`[powerpoint-documents] ✅ Slide added: ${opts.output}`);
}

function handleAddImage(opts) {
  if (!opts.input) throw new Error('--input is required');
  if (!opts.output) throw new Error('--output is required');
  if (!opts.image) throw new Error('--image is required');
  if (opts.slide === undefined && opts.slide === null) throw new Error('--slide is required');

  const pythonCmd = [
    `${PYTHON_BIN} ${PYTHON_SCRIPT}`,
    `add-image`,
    `--input "${opts.input}"`,
    `--output "${opts.output}"`,
    `--image "${opts.image}"`,
    `--slide ${opts.slide}`,
    opts.width ? `--width ${opts.width}` : '',
    opts.height ? `--height ${opts.height}` : '',
    opts.position ? `--position "${opts.position}"` : '',
    opts.caption ? `--caption "${opts.caption}"` : ''
  ].filter(Boolean).join(' ');

  console.log(`[powerpoint-documents] Adding image to slide ${opts.slide}`);
  execSync(pythonCmd, { stdio: 'inherit' });
  console.log(`[powerpoint-documents] ✅ Image added: ${opts.output}`);
}

function handleApplyMaster(opts) {
  if (!opts.input) throw new Error('--input is required');
  if (!opts.output) throw new Error('--output is required');
  if (!opts.master) throw new Error('--master is required');

  const pythonCmd = [
    `${PYTHON_BIN} ${PYTHON_SCRIPT}`,
    `apply-master`,
    `--input "${opts.input}"`,
    `--output "${opts.output}"`,
    `--master "${opts.master}"`,
    opts['preserve-content'] !== undefined ? `--preserve-content ${opts['preserve-content']}` : '',
    opts.theme ? `--theme "${opts.theme}"` : ''
  ].filter(Boolean).join(' ');

  console.log(`[powerpoint-documents] Applying master slide template`);
  execSync(pythonCmd, { stdio: 'inherit' });
  console.log(`[powerpoint-documents] ✅ Master applied: ${opts.output}`);
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
    opts['primary-color'] ? `--primary-color "${opts['primary-color']}"` : '',
    opts['secondary-color'] ? `--secondary-color "${opts['secondary-color']}"` : '',
    opts['accent-color'] ? `--accent-color "${opts['accent-color']}"` : '',
    opts['font-family'] ? `--font-family "${opts['font-family']}"` : '',
    opts.logo ? `--logo "${opts.logo}"` : '',
    opts['company-name'] ? `--company-name "${opts['company-name']}"` : ''
  ].filter(Boolean).join(' ');

  console.log(`[powerpoint-documents] Creating template: ${opts.name}`);
  execSync(pythonCmd, { stdio: 'inherit' });
  console.log(`[powerpoint-documents] ✅ Template created: ${opts.output}`);
}

function handleListTemplates(opts) {
  const pythonCmd = `${PYTHON_BIN} ${PYTHON_SCRIPT} list-templates`;
  execSync(pythonCmd, { stdio: 'inherit' });
}
