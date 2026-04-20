# playwright-screenshot

## Was macht dieser Skill?
Erstellt Screenshots von Webseiten per Playwright.

## Voraussetzungen
- Node.js
- `playwright`
- Chromium-Abhängigkeiten auf dem Host

## Verwendung

### Über den Agent (empfohlen)
Nutze den Skill, wenn eine URL visuell geprüft oder als PNG gespeichert werden soll.

### Direkte Ausführung
```bash
node /home/node/.openclaw/workspace/skills/playwright-screenshot/scripts/take_screenshot.js   https://example.com example.png
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| URL | Zielseite | ja |
| Output | Dateiname | nein |

## Output
PNG-Datei im Transfer-Ordner.

## Bekannte Einschränkungen
- Requires Node.js + playwright package
- Manche Seiten brauchen zusätzliche Chromium-Libs
