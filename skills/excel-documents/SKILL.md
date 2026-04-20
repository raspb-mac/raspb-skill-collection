---
name: excel-documents
description: Create professional Excel spreadsheets (.xlsx) with raspb styling, formulas, formatting, and multi-sheet support. Use when: (1) creating new Excel files from data, (2) generating financial reports or tables as .xlsx, (3) exporting structured data to spreadsheets, (4) creating formatted Excel documents with formulas (SUM, AVG, etc.), (5) building dashboards or data overviews as Excel files.
category: office-documents
---

# excel-documents

## Quick Start

1. Create a JSON config file at `/tmp/excel_data.json` describing the spreadsheet structure
2. Run the generator:
```bash
python3 /home/node/.openclaw/workspace/skills/excel-documents/scripts/create_excel.py \
  --json /tmp/excel_data.json \
  --output /tmp/output.xlsx
```
3. Deliver via file-transfer Skill

## JSON Config Format

```json
{
  "title": "Dokumenttitel",
  "author": "raspb Webservices UG",
  "sheets": [
    {
      "name": "Tabelle1",
      "headers": ["Spalte A", "Spalte B", "Spalte C"],
      "rows": [
        ["Text", 100, "2026-03-20"],
        ["Text2", 200, "2026-03-21"]
      ],
      "column_widths": [30, 15, 20],
      "number_formats": {"B": "#,##0.00 €", "C": "DD.MM.YYYY"},
      "formulas": {"B": "SUM"},
      "freeze_panes": "A2",
      "autofilter": true
    }
  ]
}
```

### Sheet Options

| Option | Type | Description |
|---|---|---|
| `name` | string | Sheet tab name |
| `headers` | string[] | Column headers (row 1) |
| `rows` | any[][] | Data rows |
| `column_widths` | number[] | Column widths (auto if omitted) |
| `number_formats` | object | Column letter → Excel format (`#,##0.00 €`, `DD.MM.YYYY`, `0.00%`) |
| `formulas` | object | Column letter → formula type (`SUM`, `AVG`, `COUNT`, `MIN`, `MAX`) or custom formula |
| `freeze_panes` | string | Cell ref to freeze at (e.g. `A2` freezes header row) |
| `autofilter` | bool | Enable dropdown filters on headers |

## Styling

Automatic raspb Design System styling:
- **Headers:** Pink (#E8458B) background, white bold text, centered
- **Data:** Calibri 11pt, dark grey, alternating row shading
- **Summary row:** Bold iconic blue on light grey background
- **Borders:** Thin #DDDDDD on all cells
- **Print:** Landscape, fit to width

## Dependencies

`openpyxl` must be installed:
```bash
pip3 install openpyxl --break-system-packages
```

## INSTALL Note

Add to INSTALL.md if openpyxl is missing:
```bash
pip3 install openpyxl --break-system-packages
```
