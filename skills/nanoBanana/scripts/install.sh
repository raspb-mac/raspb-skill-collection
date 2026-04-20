#!/bin/bash
# NanoBanana Skill Installer

echo "🎨 NanoBanana Skill — Installing Dependencies"
echo "=============================================="
echo

# Try different pip installation methods
echo "Installing Python packages..."

# Method 1: pip3
if command -v pip3 &> /dev/null; then
  echo "Using pip3..."
  pip3 install google-generativeai requests
  if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
    exit 0
  fi
fi

# Method 2: python3 -m pip
if command -v python3 &> /dev/null; then
  echo "Using python3 -m pip..."
  python3 -m pip install --user google-generativeai requests
  if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
    exit 0
  fi
fi

# Method 3: apt (Debian/Ubuntu)
if command -v apt-get &> /dev/null; then
  echo "Using apt-get..."
  sudo apt-get update
  sudo apt-get install -y python3-pip
  pip3 install google-generativeai requests
  if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
    exit 0
  fi
fi

echo
echo "❌ Could not install dependencies automatically."
echo
echo "Manual installation:"
echo "  pip install google-generativeai requests"
echo
echo "Or try:"
echo "  pip3 install google-generativeai requests"
echo "  python3 -m pip install --user google-generativeai requests"
echo
exit 1
