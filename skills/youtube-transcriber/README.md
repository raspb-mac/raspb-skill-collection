# youtube-transcriber

## Was macht dieser Skill?
Erstellt exakte YouTube-Transkripte, bevorzugt aus Captions, sonst aus Audio via Whisper.

## Voraussetzungen
- `yt-dlp`
- `ffmpeg`
- OpenAI Whisper API / Key
- Cookies oder lokale YouTube-Härtung gemäß `SKILL.md`

## Verwendung

### Über den Agent (empfohlen)
Gib eine YouTube-URL, der Skill liefert ein Markdown-Transkript.

### Direkte Ausführung
```bash
python3 /home/node/.openclaw/workspace/skills/youtube-transcriber/scripts/transcribe_youtube.py   https://www.youtube.com/watch?v=VIDEO_ID --language de
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| URL | YouTube-Video-URL | ja |
| `--language` | Zielsprache | nein |
| `--out` | Ausgabedatei | nein |

## Output
Markdown-Datei in `transfers/results/` plus Download-Link.

## Bekannte Einschränkungen
- Captions werden vor Whisper bevorzugt
- Längere Videos können in Chunks gesplittet werden
