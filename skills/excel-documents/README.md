# excel-documents

## Was macht dieser Skill?
Erstellt professionell formatierte `.xlsx`-Dateien mit raspb-Styling, Formeln und mehreren Tabellenblättern.

## Voraussetzungen
- `openpyxl`
- Python 3

## Verwendung

### Über den Agent (empfohlen)
Gib Daten als JSON-Konfiguration, der Agent rendert daraus die Excel-Datei.

### Direkte Ausführung
```bash
python3 /home/node/.openclaw/workspace/skills/excel-documents/scripts/create_excel.py   --json /tmp/excel_data.json   --output /tmp/output.xlsx
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| `--json` | Pfad zur JSON-Konfiguration | ja |
| `--output` | Zielpfad der `.xlsx` | ja |
| `--template` | Optionales Excel-Template | nein |

## Output
Eine Excel-Datei am angegebenen Output-Pfad.

## Bekannte Einschränkungen
- `openpyxl` muss installiert sein
- Erwartet die JSON-Struktur aus `SKILL.md`
