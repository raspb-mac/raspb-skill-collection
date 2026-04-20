# heygen

## Was macht dieser Skill?
Erstellt, prüft und lädt HeyGen-Videos über die REST API und lokale Helferskripte.

## Voraussetzungen
- `HEYGEN_API_KEY`
- Python 3

## Verwendung

### Über den Agent (empfohlen)
Nutze den Skill für Avatar-Auswahl, Video-Generierung, Status-Polling und Download.

### Direkte Ausführung
```bash
python3 /home/node/.openclaw/workspace/skills/heygen/scripts/heygen_client.py list-avatars
```

Weitere Beispiele:
```bash
python3 /home/node/.openclaw/workspace/skills/heygen/scripts/heygen_client.py create   --script "Hallo Welt" --avatar <avatar_id> --voice <voice_id>

python3 /home/node/.openclaw/workspace/skills/heygen/scripts/heygen_client.py poll   --video-id <video_id>
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| `--script` | Gesprochener Text | bei `create` |
| `--avatar` | Avatar-ID | bei `create` |
| `--voice` | Voice-ID | bei `create` |
| `--video-id` | ID eines gerenderten Videos | bei `poll` |
| `--url` | Video-URL zum Download | bei `download` |
| `--output` | Zielpfad für den Download | bei `download` |

## Output
Video-ID, Status oder MP4-Datei in `transfers/results/`.

## Bekannte Einschränkungen
- Rendern ist asynchron, Polling nötig
- API-Key muss gesetzt sein
