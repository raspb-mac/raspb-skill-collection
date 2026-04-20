# google

## Was macht dieser Skill?
Greift auf Gmail, Kalender, Drive, Docs, Sheets, Slides, YouTube und People zu.

## Voraussetzungen
- Google-Credentials laut `SKILL.md`
- Node.js
- `scripts/package.json` ist der aktive, portable Install-Standort

## Verwendung

### Über den Agent (empfohlen)
Nutze den Google-Skill für Mail-, Kalender-, Drive- und Docs-Workflows.

### Direkte Ausführung
```bash
node /home/node/.openclaw/workspace/skills/google/scripts/google_client.js gmail_list
```

Weitere Beispiele:
```bash
node /home/node/.openclaw/workspace/skills/google/scripts/google_client.js calendar_list
node /home/node/.openclaw/workspace/skills/google/scripts/google_client.js docs_get <documentId>
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| Action | z. B. `gmail_list`, `calendar_list`, `docs_get` | ja |
| API-Argumente | je nach Action | falls nötig |

## Output
Antworten aus Google APIs, meist als JSON oder lesbarer Text.

## Bekannte Einschränkungen
- Legacy: Root-level `node_modules`, bitte `scripts/` verwenden
- Root-level `package.json` ist veraltet, aktiv ist `scripts/package.json`
