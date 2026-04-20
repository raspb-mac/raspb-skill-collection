---
name: social-media-publisher
description: >
category: communication-content
  Veröffentlicht Social-Media-Posts vollautomatisch via Upload-Post API — kein Browser, kein
  Login erforderlich. Unterstützt Text, Foto und Video auf LinkedIn, Facebook, X (Twitter),
  Instagram, Threads, Bluesky, TikTok und Pinterest. Zwei Accounts: "markus" (Markus Härtig,
  persönliches LinkedIn + Facebook) und "raspb" (raspb Webservices Company Page auf LinkedIn).
  Links immer als --comment übergeben, nie im Post-Text. Verwende diesen Skill immer wenn
  Social-Media-Posts erstellt, geplant oder veröffentlicht werden sollen — auch unattended
  ohne Nutzer-Bestätigung.
---

# social-media-publisher

## INTRO

Vollautomatisches Social-Media-Publishing via [Upload-Post API](https://upload-post.com).
Die Authentifizierung läuft serverseitig — kein Browser, keine Session-Cookies, kein Login.
Ein Agent kann diesen Skill ohne Rückfrage beim User nutzen.

---

## Verbundene Accounts

| Key | Profil | Plattformen |
|---|---|---|
| `markus` | Markus Härtig (persönlich) | `linkedin`, `facebook`, `x` (@MarkusAtRaspb), `instagram` (markus_haertig) |
| `raspb` | raspb Webservices (Company Page) | `linkedin` |

> Neue Plattformen (X, Instagram, TikTok etc.) werden in Upload-Post Dashboard verbunden.
> Danach `ACCOUNTS`-Dict in `scripts/config.py` ergänzen (Eintrag `'instagram': True` o.ä.).
> Der `user`-Wert bleibt immer `"raspb"` — das ist der Upload-Post Account-Username.

---

## Unterstützte Plattformen

`linkedin` · `facebook` · `x` · `twitter` · `threads` · `bluesky` · `instagram` · `tiktok` · `pinterest`

---

## Regeln für Agents (wichtig)

1. **Links nie in `--text`** — immer via `--comment "https://..."` (LinkedIn-Algorithmus bestraft Link-Posts)
2. **Account-Wahl:**
   - Persönlicher Post als Markus → `--account markus`
   - Im Namen von raspb als Unternehmen → `--account raspb`
3. **Zeilenumbrüche** im Text: `\n` verwenden (wird automatisch konvertiert)
4. **Nach dem Post:** `request_id` aus dem Output für Status-Check verwenden
5. **Dry-Run zuerst** wenn unsicher: `--dry-run` zeigt Payload ohne zu posten
6. **Fehler:** Bei HTTP-Fehler → erneut versuchen. Nach 3 Fehlern → an Markus eskalieren mit Screenshot/Log.

---

## Verwendung

### Text-Post (sofort)

```bash
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/post.py \
  --account markus \
  --platform linkedin \
  --text "Dein Post-Text\n\nZeile 2\n\n#Hashtag #raspb"
```

### Foto-Post

```bash
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/post.py \
  --account markus \
  --platform linkedin facebook \
  --text "Caption zum Bild" \
  --image /home/node/.openclaw/workspace/transfers/bild.jpg
```

### Video-Post

```bash
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/post.py \
  --account markus \
  --platform linkedin \
  --text "Caption zum Video" \
  --video /home/node/.openclaw/workspace/transfers/video.mp4
```

### Mit Link als Kommentar

```bash
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/post.py \
  --account markus \
  --platform linkedin \
  --text "Spannender Artikel über KI-Automatisierung 👇" \
  --comment "https://raspb.de/blog/artikel"
```

### Als raspb Company Page

```bash
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/post.py \
  --account raspb \
  --platform linkedin \
  --text "raspb News: KI-Voicebot für KMU ab sofort verfügbar."
```

### Geplanter Post (Scheduling)

```bash
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/post.py \
  --account markus \
  --platform linkedin \
  --text "Guten Morgen! ☀️" \
  --schedule "2026-04-17T09:00:00"
# Timezone ist immer Europe/Berlin (Standard)
```

### Multi-Plattform

```bash
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/post.py \
  --account markus \
  --platform linkedin facebook \
  --text "Auf allen Kanälen gleichzeitig"
```

### Dry-Run (Payload prüfen ohne zu posten)

```bash
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/post.py \
  --account markus --platform linkedin --text "Test" --dry-run
```

---

## Status & Scheduling verwalten

```bash
# Status eines Posts prüfen (nach request_id aus post.py Output)
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/status.py \
  check --request-id <request_id>

# Alle geplanten Posts anzeigen
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/status.py scheduled

# Geplanten Post abbrechen
python3 /home/node/.openclaw/workspace/skills/social-media-publisher/scripts/status.py \
  cancel --job-id <job_id>
```

---

## Agent-Workflow (Schritt für Schritt)

```
1. Text formulieren
   → Emojis ✅, Hashtags ✅, Zeilenumbrüche als \n ✅
   → Links NICHT im Text — als --comment übergeben

2. Account + Plattform(en) wählen
   → Persönlich: --account markus --platform linkedin
   → Company:    --account raspb  --platform linkedin
   → Multi:      --account markus --platform linkedin facebook

3. post.py aufrufen (exec)
   → Output enthält request_id

4. Nach 15–30s: Status prüfen
   → python3 status.py check --request-id <id>
   → success: true → fertig ✅
   → success: false → Fehler loggen, ggf. retry

5. Bei Scheduling: job_id merken
   → Kann mit status.py cancel abgebrochen werden
```

---

## Dateistruktur

```
social-media-publisher/
├── SKILL.md              ← diese Datei (Skill-Beschreibung + Agent-Guide)
├── scripts/
│   ├── config.py         ← API-Key + Account-Mapping (hier neue Accounts eintragen)
│   ├── api.py            ← Upload-Post SDK Wrapper (upload_post v2.1.1)
│   ├── post.py           ← CLI: Post veröffentlichen
│   └── status.py         ← CLI: Status / Scheduling verwalten
└── references/
    └── api-docs.md       ← API-Kurzreferenz (Offline-Fallback)
```

---

## Neue Plattformen hinzufügen

1. Upload-Post Dashboard → **Connect Account** → gewünschte Plattform verbinden
2. `scripts/config.py` öffnen → im `ACCOUNTS`-Dict ergänzen:
   ```python
   'markus': {
       ...
       'instagram': True,   # neu
       'x': True,           # neu
   }
   ```
3. Fertig — kein Code-Änderung sonst nötig

---

## Fehlerbehandlung

| Fehler | Ursache | Lösung |
|---|---|---|
| `HTTP 400` | Falsches Feld / fehlender Parameter | `--dry-run` prüfen, SKILL.md Parameter checken |
| `HTTP 401` | API-Key ungültig | Key in `config.py` prüfen |
| `HTTP 429` | Rate-Limit (Free: 10/Monat) | Plan upgraden auf upload-post.com |
| `success: false` im Status | Plattform hat Post abgelehnt | Fehlertext im Status-JSON lesen |
| Plattform nicht verbunden | Account nicht in Upload-Post verknüpft | Dashboard → Connect Account |
