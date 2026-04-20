---
name: playwright-screenshot
description: Erstellt Screenshots von Webseiten mittels Playwright. Verwende diesen Skill, wenn der User nach einem Screenshot einer URL fragt oder eine visuelle Überprüfung einer Seite benötigt.
category: coding-development
---

# Screenshot Skill (Stable)

Erstellt professionelle Screenshots von URLs.

## Befehle (Absolute Pfade)
```bash
node /home/node/.openclaw/workspace/skills/playwright-screenshot/scripts/take_screenshot.js <URL> [output_name.png]
```

## 🧠 Model-Instruction
1. Screenshots werden standardmäßig in `/home/node/.openclaw/workspace/transfers/` gespeichert.
2. Nutze den `file-transfer` Skill, um Markus den Link zu generieren oder sende direkt `https://claw.raspb.eu/download/[output_name.png]`.
3. Bei Fehlern prüfe, ob Chromium-Abhängigkeiten (z.B. libnspr4) auf dem Host installiert sind.
