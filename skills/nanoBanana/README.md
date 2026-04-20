# NanoBanana Skill

## Was macht dieser Skill?
Erzeugt Bilder mit Googles Nano Banana 2, direkt per CLI oder über den Agent.

## Voraussetzungen
- Google/Gemini-Zugang oder API-Key
- Python 3 oder Node.js, je nach Script
- `google-generativeai` und `requests` für das Python-Script

## Verwendung

### Über den Agent (empfohlen)
Beschreibe das gewünschte Bild einfach natürlichsprachlich, der Agent ruft das passende Generator-Script auf.

### Direkte Ausführung
```bash
node /home/node/.openclaw/workspace/skills/nanoBanana/scripts/generate_image.js   --prompt "A red cat sitting on the moon"
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| `--prompt` | Bildprompt | ja |
| `--aspect-ratio` | Seitenverhältnis | nein |
| `--resolution` | Auflösung | nein |
| `--seed` | Reproduzierbarkeit | nein |
| `--output-dir` | Zielordner | nein |

## Output
PNG-Datei und Metadaten im Workspace-Transferbereich.

## Bekannte Einschränkungen
- API-Zugang muss funktionieren
- Sicherheitsfilter können Prompts ablehnen
