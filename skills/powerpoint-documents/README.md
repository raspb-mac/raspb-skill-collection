# powerpoint-documents

## Was macht dieser Skill?
Erstellt und bearbeitet PowerPoint-Präsentationen mit Templates, Layouts und Branding.

## Voraussetzungen
- Siehe `INSTALL.md`
- Python-/Node-Dependencies für die Generator-Skripte

## Verwendung

### Über den Agent (empfohlen)
Nutze den Skill für neue Präsentationen, Template-basierte Decks und Slides aus Daten.

### Direkte Ausführung
```bash
node /home/node/.openclaw/workspace/skills/powerpoint-documents/scripts/pptx_generator.js create   --output presentation.pptx   --title "Q1 Results 2026"
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| Aktion | `create`, `add-slide`, `apply-master` etc. | ja |
| `--output` | Ziel-PPTX | je nach Aktion |
| `--template` | Template-Datei | nein |

## Output
`.pptx`-Dateien im Zielpfad.

## Bekannte Einschränkungen
- Setup-Anweisungen stehen in `INSTALL.md`
- Je nach Layout sind Eingabefelder unterschiedlich
