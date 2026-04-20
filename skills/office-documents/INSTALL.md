# office-documents Skill — Installation

## Requirements

- Python 3.8+
- Node.js 18+
- pip package manager

## Python Dependencies

Install required Python packages:

```bash
pip install python-docx pillow jinja2
```

**Package versions:**
- `python-docx>=0.8.11` – DOCX file manipulation
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
pip install python-docx pillow jinja2
```

### 3. Make scripts executable

```bash
chmod +x scripts/docx_generator.js
chmod +x scripts/docx_generator.py
```

### 4. Test the installation

```bash
node scripts/docx_generator.js list-templates
```

Expected output:
```
No templates found (assets directory empty)
```

## Quick Test

Create a simple document:

```bash
node scripts/docx_generator.js create \
  --output test.docx \
  --title "Test Document" \
  --content "This is a test document created by office-documents skill."
```

Check that `test.docx` was created in the current directory.

## Troubleshooting

### Python not found

```
Error: python3: command not found
```

**Solution:** Install Python 3.8+ or add it to PATH

### Import error: No module named 'docx'

```
ModuleNotFoundError: No module named 'docx'
```

**Solution:** Run `pip install python-docx`

### Permission denied on scripts

```
bash: ./scripts/docx_generator.js: Permission denied
```

**Solution:** Run `chmod +x scripts/docx_generator.js`

## Notes

- Scripts are compatible with Node.js 18+ and Python 3.8+
- All output files are saved as valid Microsoft Office .docx format
- Templates can be reused and customized for recurring document types
