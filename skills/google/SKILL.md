---
name: google
description: Zugriff auf Google-Dienste (Gmail, Kalender, Drive, Docs, Sheets, Slides, YouTube, People, Drive Activity)
category: calendar-scheduling
---

# Google Skill (v2.0 – erweitert)

Ermöglicht den Zugriff auf Google-Dienste für raspb Automation & Integration.

**APIs aktiviert (25.02.2026):**
- ✅ Gmail API (read, compose)
- ✅ Google Calendar API (read, events)
- ✅ Google Drive API (metadata readonly)
- ✅ Google Drive Activity API (audit trails)
- ✅ Google Docs API (read, create, update)
- ✅ Google Sheets API (read, write, formatting)
- ✅ Google Slides API (read, create, update presentations)
- ✅ YouTube API (read channel info, search)
- ✅ Google People API (contacts, connections)

## Setup

- **Credentials:** `google_credentials.json` (Project: gen-lang-client-0446401254)
- **Token:** `google_token.json` (wird beim ersten Authentifizieren generiert)
- **Auth-Scope:** Alle 9 APIs sind im Authentifizierungs-Prozess enthalten

## Befehle (Stabile Pfade)
Haupt-Client: `node /home/node/.openclaw/workspace/skills/google/scripts/google_client.js <action> <args>`

### Gmail
- `gmail_list [query] [maxResults]`
- `gmail_get <messageId>`
- `gmail_send <to> <subject> <text> [html]`

### Kalender
- `calendar_list [timeMinISO] [timeMaxISO] [maxResults]`
- `calendar_add <summary> <description> <startISO> <endISO>`

## 🧠 Model-Instruction
Nutze IMMER den absoluten Pfad zum JS-Client. Wenn ein Befehl fehlschlägt, lösche NICHT den Token, sondern melde den Fehler Markus.

### Google Drive
- `drive_list [maxResults]`: Listet Dateien im Drive

### Google Docs (NEU)
- `docs_get <documentId>`: Liest komplettes Dokument
- `docs_create <title>`: Erstellt neues Dokument (returns documentId)
- `docs_append <documentId> <text>`: Text an Dokument anhängen

### Google Sheets (NEU)
- `sheets_list [maxResults]`: Listet Spreadsheets im Drive
- `sheets_get <spreadsheetId> [range]`: Liest Daten aus Spreadsheet
- `sheets_update <spreadsheetId> <range> <values>`: Schreibt Daten
- `sheets_append <spreadsheetId> <range> <values>`: Hängt Zeilen an

### Google Slides (NEU)
- `slides_get <presentationId>`: Liest Presentation
- `slides_create <title>`: Erstellt neue Presentation (returns presentationId)

### YouTube (NEU)
- `youtube_channel_info`: Gibt Info über dein YouTube-Channel
- `youtube_search <query> [maxResults]`: Sucht Videos

### Google People (NEU)
- `people_connections_list [maxResults]`: Listet deine Kontakte

### Google Drive Activity (NEU)
- `drive_activity_query [maxResults]`: Audit-Trail: Wer hat was verändert?

## Use Cases für raspb

1. **Automatische Angebots-Generierung:** Template in Docs → ausfüllen → PDF exportieren
2. **Client-Datenbank:** Sheets + n8n Automation
3. **Meeting-Notizen:** Automatically Docs erstellen & mit Drive Activity tracken
4. **CRM-Integration:** Google People API + raspb-KI
5. **Content-Repurposing:** YouTube + KI für Transcripts & SEO-Artikel

## Troubleshooting

| Problem | Lösung |
|---------|--------|
| `unauthorized_client` oder API-Fehler | `google_token.json` löschen + neuen Auth-Flow durchlaufen |
| `Access denied` für spezifische API | OAuth-Scope fehlt (alle Scopes sind in `test-apis-full.js` definiert) |
| Alte Credentials ungültig | Neue OAuth Credentials vom Google Cloud Project herunterladen |
| API nicht aktiviert | In Google Cloud Console aktivieren + 1-2 Min warten |

## Testing

Führe den vollständigen API-Test aus:
```bash
cd /home/node/.openclaw/workspace/skills/google
node test-apis-full.js
```

Alle 9 APIs sollten ✅ OK sein.

## Refresh Token

Der Token wird automatisch refreshed, wenn er abläuft. Der `refresh_token` ist mit 7 Tagen Gültigkeit versehen.
