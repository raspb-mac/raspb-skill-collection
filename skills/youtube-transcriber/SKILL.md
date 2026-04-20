---
name: youtube-transcriber
description: Erstellt exakte Wort-für-Wort-Transkripte von YouTube-Videos unter Verwendung von Whisper AI. Verwende diesen Skill, wenn der User nach einem Transkript, dem exakten Inhalt oder einer detaillierten Analyse eines YouTube-Videos fragt.
category: media-generation
---

# YouTube Transcriber Skill

YouTube-Transkripte als Markdown erzeugen, bevorzugt aus Untertiteln, sonst aus Audio via Whisper.

## Workflow

1. URL nehmen.
2. Erst Untertitel/Auto-Captions mit yt-dlp probieren.
3. Wenn keine brauchbaren Captions kommen, die niedrigste sinnvolle Audio-Variante laden.
4. Audio bei Bedarf in 10-Minuten-Chunks splitten.
5. Jeden Chunk mit `/app/skills/openai-whisper-api/scripts/transcribe.sh` transkribieren.
6. Ergebnis als `.md` in `transfers/results/` speichern und den Download-Link ausgeben.

## Wichtige Regeln

- Nutze immer die lokale YouTube-Härtung: `yt-dlp`, `ffmpeg`, Node.js, bgutil-PO-Token-Server und die aktuellen Cookie-Exports.
- Aktuelle Cookies liegen bevorzugt in `transfers/www.youtube.com_cookies.json`; der Helper konvertiert sie automatisch nach Netscape-Format.
- Wenn Captions verfügbar sind, nimm sie vor Whisper. Wenn nicht, transkribiere Audio.
- Formatiere den Text in Absätzen, nicht als dumpes Cue-Listing.
- Für deutsche Videos: wenn der User nichts anderes sagt, transkribiere in der Originalsprache.

## Befehle (Absolute Pfade)
```bash
python3 /home/node/.openclaw/workspace/skills/youtube-transcriber/scripts/transcribe_youtube.py <VIDEO_URL> [--language de] [--out /path/to/result.md]
```

## Voraussetzungen

- `yt-dlp` im `scripts/` Ordner.
- `ffmpeg` im `scripts/` Ordner.
- Node.js im System-Pfad.
- OpenAI API Key für Whisper.

## Output

- Hauptausgabe: Markdown-Datei in `transfers/results/`
- Optional: zusätzliche Übersetzung als separate Markdown-Datei, wenn der User sie verlangt.

## Model-Instruction

- Nach der Transkription den Download-Link per `file-transfer` Skill anbieten.
- Wenn YouTube blockt, zuerst Download/Captions weiter versuchen, erst danach auf den nächsten Fallback wechseln.
