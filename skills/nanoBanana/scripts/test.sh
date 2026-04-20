#!/bin/bash
# Quick test of NanoBanana skill setup

echo "🔍 NanoBanana Skill — Setup Check"
echo "=================================="
echo

# Check Node.js
if command -v node &> /dev/null; then
  echo "✅ Node.js: $(node -v)"
else
  echo "❌ Node.js: NOT FOUND"
fi

# Check Python 3
if command -v python3 &> /dev/null; then
  echo "✅ Python 3: $(python3 --version)"
else
  echo "❌ Python 3: NOT FOUND"
fi

# Check Google credentials
CREDS_PATH="$HOME/.openclaw/agents/main/agent/google_credentials.json"
if [ -f "$CREDS_PATH" ]; then
  echo "✅ Google Credentials: FOUND"
else
  echo "⚠️  Google Credentials: NOT FOUND (you may need to initialize Google Skill)"
fi

echo
echo "📦 Python Modules:"
python3 -c "import google.generativeai; print('✅ google-generativeai')" 2>/dev/null || echo "❌ google-generativeai: NOT INSTALLED"
python3 -c "import requests; print('✅ requests')" 2>/dev/null || echo "❌ requests: NOT INSTALLED"

echo
echo "📁 Skill Files:"
ls -1 ~/.openclaw/workspace/skills/nanoBanana/ | grep -E "SKILL.md|EXAMPLES.md|README.md"

echo
echo "To install Python dependencies:"
echo "  pip install --user google-generativeai requests"
echo
echo "To generate your first image:"
echo "  node ~/.openclaw/workspace/skills/nanoBanana/scripts/generate_image.js --prompt 'A red cat on the moon'"
