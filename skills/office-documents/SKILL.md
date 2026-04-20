---
name: office-documents
description: Create, edit, and manage Word documents (.docx) with template support, formatting, images, and styling. Use when: (1) creating new Word documents from scratch, (2) adding content to existing templates, (3) applying professional formatting (fonts, colors, styles), (4) embedding images or logos, (5) managing document structure (sections, headings, lists), (6) applying or creating document templates with consistent styling.
category: office-documents
---

# office-documents

## ⚡ Bevorzugtes Modell
**`codex53`** (GPT-5.3 Codex) via Override.

---

## 🏆 Markdown → Word (Gold-Standard)

**Referenz-Skript** (EINZIG AUSTRORISIERTE METHODE – niemals den JS-Generator für Markdown nutzen):
```bash
python3 /home/node/.openclaw/workspace/skills/office-documents/scripts/md2docx_raspb.py \
  --md_path "/pfad/zu/file.md" \
  --template_path "/home/node/.openclaw/workspace/skills/office-documents/assets/raspb-letter-v2.docx" \
  --output_path "/tmp/output.docx"
```

**Kritisch:**
1. Der `docx_generator.js` darf NUR für einfache Titel/Content Ersetzungen ohne Markdown-Parsing genutzt werden.
2. Für semantisch korrekte raspb Dokumente IMMER das Python-Skript verwenden.
3. **Python-Dependencies** (`python-docx`, `markdown-it-py`) müssen installiert sein. Falls `ModuleNotFoundError` auftritt: `PYTHONPATH=/home/node/.local/lib/python3.11/site-packages` setzen oder Pakete nachinstallieren. NIEMALS auf den JS-Generator ausweichen!

---

## 📋 Notion → Word Workflow (Verbindlicher Ablauf)

### ⚡ One-Shot (BEVORZUGT – ein einziger Befehl, keine Entscheidungen):
```bash
/home/node/.openclaw/workspace/skills/office-documents/scripts/notion2docx.sh <PAGE_ID> <OUTPUT_NAME>
```
Beispiel:
```bash
/home/node/.openclaw/workspace/skills/office-documents/scripts/notion2docx.sh 31a39d9c-996f-819e-b374-c833f28f0bf4 Projektauftrag
```
Das Skript exportiert die Notion-Seite als Markdown, konvertiert sie in ein raspb Word-Dokument und stellt den Download-Link bereit. **Immer diesen Weg nutzen.**

### Manueller Ablauf (nur wenn das One-Shot-Skript fehlschlägt):

1. **Notion-Export als Markdown** (Block-Typen erhalten!):
```bash
python3 /home/node/.openclaw/workspace/skills/notion/scripts/notion_client.py page <PAGE_ID> --format=markdown > /tmp/content.md
```

2. **Markdown → Word** (Gold-Standard-Skript):
```bash
PYTHONPATH=/home/node/.local/lib/python3.11/site-packages python3 /home/node/.openclaw/workspace/skills/office-documents/scripts/md2docx_raspb.py \
  --md_path /tmp/content.md \
  --template_path /home/node/.openclaw/workspace/skills/office-documents/assets/raspb-letter-v2.docx \
  --output_path /tmp/output.docx
```

3. **Download-Link** via file-transfer Skill posten.

**⚠️ NIEMALS das Markdown manuell schreiben**, wenn eine Notion-Quelle existiert. Immer `--format=markdown` nutzen, um Block-Typ-Informationen (Bullet vs. Numbered, Bold in Tabellen) 1:1 zu erhalten.

---

## 📐 raspb Design-Regeln (Kurzreferenz)

| Element | Farbe | Größe | Style |
|---|---|---|---|
| H1 | Pink `#E8458B` | 24pt | Bold |
| H2 | Iconic Blue `#121D33` | 18pt | Bold |
| H3–H4 | Iconic Blue `#121D33` | 14–12pt | Bold |
| Fließtext | Dark Grey `#333333` | 11pt | — |
| Tabellen-Header | Pink `#E8458B`, BG `#EEEEEE` | 10pt | Bold |
| Schrift | Plus Jakarta Sans | — | — |

- **Template:** `assets/raspb-letter-v2.docx` – Logo erhalten, Text/Platzhalter entfernen, top-margin 4 cm
- **Headings:** Word-Formatvorlage `Heading N` (semantisch), keine Emojis, keine `**`-Artefakte
- **Listen:** Einzug per `w:ind` XML forcen. Formel: `left = G×(depth+1)`, `hanging = G` (G=284 Twips). Spacer-Paragraph (4pt) nach jeder Liste. **Strikt:** Nummerierte Listen im Markdown MÜSSEN im Word als nummerierte Liste erscheinen (`List Number` Style), Bullet-Listen als `List Bullet`.
- **Tabellen:** Echte `doc.add_table`, Zell-Padding via `w:tcMar`, Rahmen `#DDDDDD`, 20pt Abstand danach
- **HR (`---`):** `w:bottom` border, Farbe `#CCCCCC`, 14pt before/after

---

## ✅ Qualitäts-Checkliste
- [ ] Logo in Kopfzeile vorhanden, kein `©`-Text
- [ ] Überschriften als `Heading N`-Formatvorlage gesetzt
- [ ] Tabellen sind echte Word-Tabellen (nicht `|`-Text)
- [ ] Listen korrekt eingerückt, keine Duplikate
- [ ] **Bullet-Listen als `List Bullet`, nummerierte Listen als `List Number`** (1:1 wie im Quell-Markdown)
- [ ] Download-Link via file-transfer Skill gepostet

---

## 🔧 Einfache Dokumente (ohne Markdown)
```bash
node /home/node/.openclaw/workspace/skills/office-documents/scripts/docx_generator.js create \
  --template /home/node/.openclaw/workspace/skills/office-documents/assets/raspb-letter-v2.docx \
  --output /tmp/output.docx --title "Titel"
```
