# social-media-publisher

## Was macht dieser Skill?
Veröffentlicht Posts über die Upload-Post API, inklusive Text, Bild, Video und Planung.

## Voraussetzungen
- API-Zugang laut `SKILL.md`
- Python 3

## Verwendung

### Über den Agent (empfohlen)
Nutze den Skill für LinkedIn, Facebook, X und weitere angebundene Plattformen.

### Direkte Ausführung
```bash
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/post.py   --account markus --platform linkedin --text "Mein Post"
```

### Status prüfen
```bash
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/status.py scheduled
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| `--account` | `markus` oder `raspb` | ja |
| `--platform` | Zielplattform(en) | ja |
| `--text` | Post-Text | ja |
| `--image` | Bildpfad | nein |
| `--video` | Videopfad | nein |
| `--comment` | Kommentar oder Link | nein |
| `--schedule` | ISO-8601 Zeitpunkt | nein |
| `--dry-run` | Nur Payload anzeigen | nein |

## Output
Request-ID, Job-ID und Statusinfos direkt im Terminal.

## Bekannte Einschränkungen
- Links immer als Kommentar, nie im Post-Text
- Scheduling hängt von der API ab
