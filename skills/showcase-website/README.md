# showcase-website

## Was macht dieser Skill?
Stellt HTML-Dateien als dauerhafte Showcase-Links bereit.

## Voraussetzungen
- HTML-Datei im Workspace
- Python 3

## Verwendung

### Über den Agent (empfohlen)
Nutze den Skill, wenn eine HTML-Datei als öffentliche Showcase-URL veröffentlicht werden soll.

### Direkte Ausführung
```bash
python3 /home/node/.openclaw/workspace/skills/showcase-website/scripts/expose_showcase.py /tmp/deck.html
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| Source | HTML-Datei | ja |
| `--name` | Optionaler Zielname | nein |

## Output
Eine URL im Format `https://claw.raspb.eu/showcase/<datei>.html`.

## Bekannte Einschränkungen
- Nur HTML-Dateien sind sinnvoll
- Datei wird in den Showcase-Transferbereich kopiert
