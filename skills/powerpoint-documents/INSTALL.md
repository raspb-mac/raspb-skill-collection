# powerpoint-documents Skill — Installation

## Requirements

- Python 3.8+
- Node.js 18+
- pip package manager

## Python Dependencies

Install required Python packages:

```bash
pip install python-pptx pillow jinja2
```

**Package versions:**
- `python-pptx>=0.6.21` – PPTX file manipulation
- `pillow>=9.0.0` – Image handling
- `jinja2>=3.0.0` – Template variable substitution

## Setup

### 1. Verify Python is available

```bash
python3 --version
python3 -m pip --version
```

### 2. Install Python packages

```bash
pip install python-pptx pillow jinja2
```

### 3. Make scripts executable

```bash
chmod +x scripts/pptx_generator.js
chmod +x scripts/pptx_generator.py
```

### 4. Test the installation

```bash
node scripts/pptx_generator.js list-templates
```

Expected output:
```
No templates found (assets directory empty)
```

## Quick Test

Create a simple presentation:

```bash
node scripts/pptx_generator.js create \
  --output test.pptx \
  --title "Test Presentation" \
  --subtitle "Created by powerpoint-documents skill"
```

Check that `test.pptx` was created in the current directory. You should be able to open it in PowerPoint, Google Slides, or LibreOffice Impress.

## Troubleshooting

### Python not found

```
Error: python3: command not found
```

**Solution:** Install Python 3.8+ or add it to PATH

### Import error: No module named 'pptx'

```
ModuleNotFoundError: No module named 'pptx'
```

**Solution:** Run `pip install python-pptx`

### Permission denied on scripts

```
bash: ./scripts/pptx_generator.js: Permission denied
```

**Solution:** Run `chmod +x scripts/pptx_generator.js`

## Notes

- Scripts are compatible with Node.js 18+ and Python 3.8+
- All output files are saved as valid Microsoft Office .pptx format (Open XML)
- Presentations can be opened in PowerPoint 2010+, Google Slides, LibreOffice Impress
- Master slide templates ensure consistent branding across presentations
- Standard slide size is 10" × 7.5" (16:9 aspect ratio)
