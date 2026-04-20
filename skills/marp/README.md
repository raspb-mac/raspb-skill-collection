# MARP Skill – raspb Slides v4

## Was macht dieser Skill?
Erstellt raspb-branded Marp-Decks als HTML, PDF, PPTX oder PNG, inklusive Theme und visueller Hilfsskripte.

## Voraussetzungen
- Node.js + `npx`
- Marp CLI per `npx @marp-team/marp-cli@latest`
- Optional: `UNSPLASH_KEY` und `SVG_MAKER_KEY`

## Verwendung

### Über den Agent (empfohlen)
Nutze den Skill für Slide-Erstellung, Conversion und Showcase-Deployment.

### Direkte Ausführung
```bash
/home/node/.openclaw/workspace/skills/marp/scripts/marp-convert.sh slides.md pdf raspb
```

### Neuer Orchestrator
```bash
python3 /home/node/.openclaw/workspace/skills/marp/scripts/marp_deck_builder.py deploy slides.md --name deck.html
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| Input | Markdown-Datei | ja |
| Output-Format | `html`, `pdf`, `pptx`, `png` | ja für `marp-convert.sh` |
| Theme | `raspb`, `gaia`, `default`, `uncover` | nein |
| Showcase-Name | Zielname für Deployment | nein |

## Output
Gerenderte Slides in `transfers/results/` oder als Showcase-URL.

## Bekannte Einschränkungen
- Für Hero-Slides `<!-- _class: hero -->`, `_footer: ''` und `_paginate: false` nutzen
- Standard-Setup für raspb ist `theme: raspb` plus `footer: " "` zum Unterdrücken des Footers
- Seitenzahlen sind im raspb-Theme standardmäßig aus
