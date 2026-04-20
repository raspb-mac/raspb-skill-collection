# office-documents

## Was macht dieser Skill?
Erstellt und konvertiert professionelle Word-Dokumente aus Markdown oder Notion-Inhalten.

## Voraussetzungen
- Siehe `INSTALL.md`
- Python-Dependencies wie `python-docx` und `markdown-it-py`

## Verwendung

### Über den Agent (empfohlen)
Nutze den Skill für Word-Dokumente aus Markdown oder Notion-Seiten.

### Direkte Ausführung
```bash
python3 /home/node/.openclaw/workspace/skills/office-documents/scripts/md2docx_raspb.py   --md_path /tmp/content.md   --template_path /home/node/.openclaw/workspace/skills/office-documents/assets/raspb-letter-v2.docx   --output_path /tmp/output.docx
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| `--md_path` | Eingabe-Markdown | ja |
| `--template_path` | Word-Template | ja |
| `--output_path` | Ziel-DOCX | ja |

## Output
Eine `.docx`-Datei im angegebenen Zielpfad.

## Bekannte Einschränkungen
- Setup und Installationsschritte stehen in `INSTALL.md`
- Für Notion-Workflows ist der Notion-Client vorher zu nutzen
