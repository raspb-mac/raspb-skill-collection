# web-scraper

## Was macht dieser Skill?
Spiegelt interne Seiten einer Website als Markdown-Dateien in den Workspace.

## Voraussetzungen
- Python 3
- Ziel-URL mit erreichbaren internen Links

## Verwendung

### Über den Agent (empfohlen)
Nutze den Skill, wenn eine Website strukturiert ingestiert werden soll.

### Direkte Ausführung
```bash
python3 /home/node/.openclaw/workspace/skills/web-scraper/scripts/scraper.py   https://example.com 20
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| URL | Start-URL | ja |
| max_pages | Maximale Seitenanzahl | nein |

## Output
Markdown-Dateien unter `scrapes/<domain>/` im Workspace.

## Bekannte Einschränkungen
- Führt kein JavaScript aus
- Bleibt auf derselben Domain
