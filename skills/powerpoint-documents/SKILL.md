---
name: powerpoint-documents
description: Create, edit, and manage PowerPoint presentations (.pptx) with template support, master slides, layouts, and styling. Use when: (1) creating new presentations from scratch, (2) generating slides from content, (3) applying consistent design via master slides/templates, (4) embedding images, charts, or media, (5) managing slide layouts and transitions, (6) ensuring brand consistency across slides using design templates.
category: office-documents
---

# powerpoint-documents

Create and edit professional PowerPoint presentations (.pptx files) with full support for templates, master slides, layouts, images, and consistent design.

## Quick start

### Create a new presentation

```bash
node scripts/pptx_generator.js create \
  --output presentation.pptx \
  --title "Q1 Results 2026" \
  --slides '[
    {"layout":"title","title":"Q1 Results","subtitle":"2026"},
    {"layout":"content","heading":"Revenue","content":"€250K YoY +15%"}
  ]'
```

### Create from template

```bash
node scripts/pptx_generator.js create \
  --template assets/raspb-slides.pptx \
  --output pitch.pptx \
  --slides '[
    {"layout":"title-slide","title":"AI Innovation","subtitle":"2026"},
    {"layout":"content-2col","left":"Features","right":"Benefits"}
  ]'
```

### Add slide to existing presentation

```bash
node scripts/pptx_generator.js add-slide \
  --input presentation.pptx \
  --output presentation.pptx \
  --layout content \
  --heading "New Slide" \
  --content "Slide content here"
```

### Apply master template

```bash
node scripts/pptx_generator.js apply-master \
  --input presentation.pptx \
  --output presentation-branded.pptx \
  --master assets/raspb-master.pptx
```

## Available Commands

### `create` - Create new presentation

```bash
node scripts/pptx_generator.js create [options]
```

**Options:**
- `--output <file>` (required) – Output file path (.pptx)
- `--title <text>` – Presentation title (optional)
- `--subtitle <text>` – Subtitle (optional)
- `--slides <json>` – Slide definitions as JSON array (optional)
- `--template <file>` – Base template/master slides (optional)
- `--width <inches>` – Slide width (default: 10)
- `--height <inches>` – Slide height (default: 7.5, standard 16:9)
- `--theme <name>` – Color theme: "light", "dark", "custom" (default: "light")

**Output:** Creates a `.pptx` file at the specified path

### `add-slide` - Add slide to presentation

```bash
node scripts/pptx_generator.js add-slide [options]
```

**Options:**
- `--input <file>` (required) – Source presentation
- `--output <file>` (required) – Output file path
- `--layout <type>` (required) – Layout type: title, content, 2col, 3col, blank (see Layouts below)
- `--heading <text>` – Slide heading/title
- `--content <text>` – Main content text
- `--position <number>` – Insert at slide index (default: end)

**Output:** Saves modified `.pptx` to output path

### `add-image` - Embed image or background

```bash
node scripts/pptx_generator.js add-image [options]
```

**Options:**
- `--input <file>` (required) – Source presentation
- `--output <file>` (required) – Output file path
- `--image <path>` (required) – Image file path (PNG, JPG)
- `--slide <number>` (required) – Slide index (0-based)
- `--width <cm>` – Image width in cm (default: 8)
- `--height <cm>` – Image height in cm (default: auto-scale)
- `--position <"top"|"center"|"bottom"|"fullscreen">` – Placement (default: center)
- `--caption <text>` – Image caption (optional)

**Output:** Saves modified `.pptx` to output path

### `apply-master` - Apply master slide template

```bash
node scripts/pptx_generator.js apply-master [options]
```

**Options:**
- `--input <file>` (required) – Source presentation
- `--output <file>` (required) – Output file path
- `--master <file>` (required) – Master slide template file
- `--preserve-content` – Keep existing slide content (default: true)
- `--theme <name>` – Override theme colors (optional)

**Output:** Saves branded `.pptx` to output path with master applied

### `list-templates` - Show available templates

```bash
node scripts/pptx_generator.js list-templates
```

**Output:** Lists all templates/masters in `assets/` directory with descriptions

### `create-template` - Create a new master slide template

```bash
node scripts/pptx_generator.js create-template [options]
```

**Options:**
- `--output <file>` (required) – Output template path (.pptx)
- `--name <text>` (required) – Template name
- `--description <text>` – Template description
- `--primary-color <hex>` – Primary color (default: "#003366")
- `--secondary-color <hex>` – Secondary color (default: "#00AA99")
- `--accent-color <hex>` – Accent color (default: "#FF6B35")
- `--font-family <name>` – Font name (default: "Calibri")
- `--logo <path>` – Logo image path (optional)
- `--company-name <text>` – Company name for footer (optional)
- `--layouts <json>` – Custom layout definitions (optional)

**Output:** Creates a reusable `.pptx` master template

## Slide Layouts

Pre-built layouts available:

| Layout | Purpose | Fields |
|--------|---------|--------|
| `title` | Title slide | `title`, `subtitle` |
| `title-only` | Single title | `title` |
| `content` | Single content area | `heading`, `content` |
| `2col` | Two-column layout | `left_heading`, `left_content`, `right_heading`, `right_content` |
| `3col` | Three-column layout | `col1`, `col2`, `col3` |
| `image-right` | Content left, image right | `heading`, `content`, `image` |
| `image-left` | Image left, content right | `heading`, `content`, `image` |
| `fullscreen-image` | Full-slide image background | `image`, `overlay_text` (optional) |
| `blank` | Empty slide for custom content | – |

**Example slide JSON:**
```json
[
  {
    "layout": "title",
    "title": "AI Innovation 2026",
    "subtitle": "Transforming Business"
  },
  {
    "layout": "content",
    "heading": "Market Opportunity",
    "content": "€500M market, 40% YoY growth"
  },
  {
    "layout": "2col",
    "left_heading": "Benefits",
    "left_content": "• Time savings\n• Cost reduction\n• Better accuracy",
    "right_heading": "Features",
    "right_content": "• AI-powered\n• Cloud-based\n• Real-time analytics"
  }
]
```

## Template Variables

Templates can include placeholders for dynamic content:

```bash
node scripts/pptx_generator.js create \
  --template assets/raspb-pitch.pptx \
  --output pitch-acme.pptx \
  --variables '{
    "company_name": "Acme Inc",
    "presenter": "Jane Doe",
    "date": "2026-03-02"
  }'
```

Placeholders in templates use format: `{{variable_name}}`

## Output

All commands produce `.pptx` files (Microsoft PowerPoint format, Open XML standard) that can be:
- Opened in PowerPoint, Google Slides, LibreOffice Impress
- Presented directly
- Downloaded via file-transfer skill
- Used as templates for future presentations
- Exported to PDF

## Typical Workflow

1. **Option A – Template-based:**
   ```bash
   # Use existing master template
   node scripts/pptx_generator.js create \
     --template assets/raspb-slides.pptx \
     --output pitch.pptx \
     --slides '[
       {"layout":"title","title":"Pitch","subtitle":"Q1 2026"},
       {"layout":"content","heading":"Problem","content":"..."}
     ]'
   ```

2. **Option B – From scratch + apply master:**
   ```bash
   # Create presentation
   node scripts/pptx_generator.js create \
     --output pitch.pptx \
     --slides '[{"layout":"title","title":"Pitch"}]'
   
   # Add more slides
   node scripts/pptx_generator.js add-slide \
     --input pitch.pptx \
     --output pitch.pptx \
     --layout content \
     --heading "Market" \
     --content "Growth story"
   
   # Apply master template for consistent branding
   node scripts/pptx_generator.js apply-master \
     --input pitch.pptx \
     --output pitch-branded.pptx \
     --master assets/raspb-master.pptx
   ```

3. **Option C – Custom template creation:**
   ```bash
   # Create custom master with raspb branding
   node scripts/pptx_generator.js create-template \
     --output assets/raspb-master.pptx \
     --name "raspb Corporate" \
     --primary-color "#003366" \
     --secondary-color "#00AA99" \
     --logo assets/raspb-logo.png \
     --company-name "raspb webservices"
   ```

## Dependencies

- `python-pptx` – PPTX file creation and manipulation
- `Pillow` – Image handling for embedded images
- Node.js environment for script execution

Install via:
```bash
pip install python-pptx pillow
```

## Notes

- Master slide application preserves existing slide content by default
- Templates use Jinja2 syntax for variable substitution
- All font names should match system-available or embedded fonts
- Images are embedded directly (file size increases with images)
- Hex colors should be in format `#RRGGBB` (e.g., `#003366` for dark blue)
- Presentations follow Open XML standard for maximum compatibility
- Standard slide size is 10" × 7.5" (16:9 aspect ratio)
