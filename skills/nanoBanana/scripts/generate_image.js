#!/usr/bin/env node

/**
 * NanoBanana Image Generation Script
 * Generates images using Google's Nano Banana 2 (Gemini 3.1 Flash Image)
 * 
 * Usage:
 *   node generate_image.js --prompt "A red cat on the moon"
 *   node generate_image.js --prompt "..." --aspect-ratio "16:9" --resolution "2048"
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Parse command-line arguments
const args = process.argv.slice(2);
const options = {
  prompt: null,
  aspectRatio: '1:1',
  resolution: 1024,
  seed: null,
  safetyLevel: 'moderate',
  outputDir: path.join(process.env.HOME, '.openclaw/workspace/transfers'),
};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--prompt' && i + 1 < args.length) {
    options.prompt = args[++i];
  } else if (arg === '--aspect-ratio' && i + 1 < args.length) {
    options.aspectRatio = args[++i];
  } else if (arg === '--resolution' && i + 1 < args.length) {
    options.resolution = parseInt(args[++i], 10);
  } else if (arg === '--seed' && i + 1 < args.length) {
    options.seed = parseInt(args[++i], 10);
  } else if (arg === '--safety-level' && i + 1 < args.length) {
    options.safetyLevel = args[++i];
  } else if (arg === '--output-dir' && i + 1 < args.length) {
    options.outputDir = args[++i];
  }
}

// Validate
if (!options.prompt) {
  console.error('Error: --prompt is required');
  process.exit(1);
}

// Create output directory
if (!fs.existsSync(options.outputDir)) {
  fs.mkdirSync(options.outputDir, { recursive: true });
}

/**
 * Main function: Generate image via Google Gemini API
 */
async function generateImage() {
  try {
    // Call Python script to handle API interaction
    // (Using Python because Google's Python SDK is more stable)
    const pythonScript = path.join(__dirname, 'generate_image.py');
    
    const pythonArgs = [
      pythonScript,
      '--prompt', options.prompt,
      '--aspect-ratio', options.aspectRatio,
      '--resolution', options.resolution.toString(),
      '--safety-level', options.safetyLevel,
      '--output-dir', options.outputDir,
    ];

    if (options.seed) {
      pythonArgs.push('--seed', options.seed.toString());
    }

    // Execute Python script
    const result = await new Promise((resolve, reject) => {
      let stdout = '';
      let stderr = '';

      const python = spawn('python3', pythonArgs, {
        env: process.env,
      });

      python.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      python.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      python.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python script failed: ${stderr}`));
        } else {
          resolve(stdout);
        }
      });
    });

    // Parse JSON response from Python
    const response = JSON.parse(result);
    
    // Output result
    console.log(JSON.stringify(response, null, 2));
    
    if (response.status === 'success') {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error(JSON.stringify({
      status: 'error',
      error: error.message,
      details: error.stack,
    }, null, 2));
    process.exit(1);
  }
}

// Run
generateImage().catch((error) => {
  console.error(JSON.stringify({
    status: 'error',
    error: error.message,
  }, null, 2));
  process.exit(1);
});
