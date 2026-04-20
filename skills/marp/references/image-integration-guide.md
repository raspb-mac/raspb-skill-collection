# Image & Visual Integration Guide for Agents

Guide für KI-Agenten zur Integration von Bildern und Grafiken in MARP-Präsentationen.

## Quick Start: Image Options

### Option 1: Picsum (Free Stock Images)

**Syntax in Markdown:**
```markdown
![Beschreibung](https://picsum.photos/800/600?random=1)
```

**Für Agenten (Script-Integration):**
```bash
# Hole 5 zufällige Bilder (800x600)
python3 /home/node/.openclaw/workspace/skills/picsum-generator/scripts/generate.py \
  --count 5 \
  --width 800 \
  --height 600 \
  --output /tmp/images/
```

**Vorteil:**
- ✅ Kostenlos
- ✅ Keine Registrierung
- ✅ Sofort einsatzbereit
- ❌ Allgemeine Stock-Bilder (nicht brandspezifisch)

---

### Option 2: AI-Generated Images (nanoBanana Skill)

**Skill-Integration:**
```bash
# Rufe den nanoBanana Skill auf
python3 /home/node/.openclaw/workspace/skills/nanoBanana/scripts/generate.py \
  --prompt "Modern office workers using AI tools, minimal style, raspb colors" \
  --output /tmp/images/ai-generated.png
```

**Von Agent direkt verwendbar:**
```markdown
![Agent-generated visual](https://generated.example.com/image.png)
```

**Vorteil:**
- ✅ Custom-generiert nach Prompt
- ✅ Brand-aligned (Prompts mit raspb-Farben schreiben)
- ✅ Einzigartig
- ⚠️ Qualität abhängig vom Prompt

---

### Option 3: Tech/Brand Icons

**Quelle 1: CDN (Internet)**
```markdown
![Node.js](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg)
![SvelteKit](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg)
![n8n](https://avatars.githubusercontent.com/u/61928823)
```

**Quelle 2: Local Assets (im Skill)**
```markdown
![raspb Logo](./assets/raspb-logo.svg)
![Tech Stack](./assets/tech-stack.png)
```

**Vorteil:**
- ✅ Schnell
- ✅ Professionell
- ✅ Lizenzfrei (meist)

---

### Option 4: Mermaid Diagrams (Built-in)

**Kein Bild nötig – Markdown direkt:**
```markdown
\`\`\`mermaid
graph TB
    A["Agent Start"] -->|Process| B["LLM"]
    B -->|Decision| C["Output"]
\`\`\`
```

**Vorteil:**
- ✅ Keine externen Tools
- ✅ Text-basiert (einfach zu ändern)
- ✅ Responsive
- ✅ Sauberer Code

---

## Agent Workflow: Bilder in Präsentationen

### Szenario 1: Sales Pitch mit Stock-Bildern

```
Agent Process:
1. Schreibe Markdown-Outline
2. Für jede Folie: 
   a. Erkenne wenn Bild nötig ist
   b. Rufe Picsum auf (kostenlos) oder nanoBanana (custom)
   c. Füge `![alt](url)` ein
3. Konvertiere zu PDF mit marp-convert.sh
4. Speichere in /transfers/results/
```

**Beispiel-Code (Pseudo):**
```python
# Agent schreibt Präsentation mit Bildern
slides = """
---
marp: true
theme: raspb
---

# Sales Pitch

![Placeholder für Hero-Bild](https://picsum.photos/800/400?random=1)

---

## Problem

![Illustration des Problems](https://picsum.photos/400/400?random=2)

---

## Lösung

![Lösungs-Visualisierung](https://picsum.photos/800/300?random=3)
"""

# Speichere und konvertiere
with open('/tmp/sales-pitch.md', 'w') as f:
    f.write(slides)

os.system('marp-convert.sh /tmp/sales-pitch.md pdf raspb /transfers/results/')
```

---

### Szenario 2: Technical Architecture mit Diagrammen

```
Agent Process:
1. Parse Code-Repo für Komponenten
2. Generiere Mermaid-Diagramme (keine Bilder nötig!)
3. Ergänze mit Icons (CDN-Links)
4. Kein Picsum nötig – reiner Text
```

**Beispiel:**
```markdown
## System Architecture

\`\`\`mermaid
graph LR
    A["Data Source"] --> B["Agent"]
    B --> C["LLM Model"]
    C --> D["Output"]
\`\`\`

### Tech Stack
![Node.js](https://cdn.jsdelivr.net/...)
![SvelteKit](https://cdn.jsdelivr.net/...)
```

---

### Szenario 3: Daily Report mit Metriken & Bildern

```
Agent Process:
1. Hole Metriken aus Datenbank
2. Erstelle Tabellen + Diagramme (Mermaid oder Charts)
3. Nutze Picsum für allgemeine Illustrationen
4. Keine AI-Generierung nötig (zu zeitintensiv)
```

---

## Image Best Practices für Agenten

### Größe & Format

| Zweck | Format | Größe | Empfehlung |
|-------|--------|-------|------------|
| Hero-Bilder | JPG | 1200×600 | Picsum/nanoBanana |
| Icons | SVG/PNG | 100×100 | CDN/Local |
| Diagramme | SVG/PNG | 800×400 | Mermaid (native) |
| Screenshots | PNG | 1024×768 | Local files |

**Picsum-URL-Generator:**
```markdown
<!-- Zufälliges Bild, 800x600 -->
https://picsum.photos/800/600?random=N

<!-- Mit Seed (gleich jedes Mal) -->
https://picsum.photos/800/600?random=42

<!-- Grayscale -->
https://picsum.photos/800/600?random=1&grayscale
```

---

### Prompt Engineering für AI-Bilder (nanoBanana)

**Gute Prompts:**
```
"Modern office with AI setup, minimal design, pink and lavender colors (#F84B8A, #D4C5F9), professional"

"Tech stack visualization: Node.js, SvelteKit, n8n, Docker, clean graphic style"

"Dashboard screenshot showing metrics and KPIs, corporate design, dark blue background"
```

**Schlechte Prompts:**
```
"office"  # Zu vage
"bild"    # Englisch erwartet
"make it pop"  # Vage Anweisung
```

---

## Integration mit anderen Skills

### Picsum Skill
```bash
# Direkt aufrufen (erzeugt ZIP mit Bildern)
python3 /home/node/.openclaw/workspace/skills/picsum-generator/scripts/generate.py \
  --count 10 \
  --width 800 \
  --height 600 \
  --output ./images/
```

### nanoBanana Skill
```bash
# AI-Bildgenerierung
python3 /home/node/.openclaw/workspace/skills/nanoBanana/scripts/generate.py \
  --prompt "your-custom-prompt" \
  --output ./generated-image.png
```

### Image Analysis Skill
```bash
# Optional: Vorhandenes Bild analysieren
python3 /home/node/.openclaw/workspace/skills/image/scripts/analyze.py \
  --image ./image.png
```

---

## Beispiel: Complete Agent Flow

```python
#!/usr/bin/env python3
# Agent: Präsentations-Generator mit Bildern

import os
import subprocess
from datetime import datetime

class PresentationAgent:
    def __init__(self, title, theme="raspb"):
        self.title = title
        self.theme = theme
        self.slides = []
    
    def add_slide_with_image(self, slide_content, image_url=None):
        """Füge Folie mit optionalem Bild hinzu"""
        slide = slide_content
        if image_url:
            slide += f"\n\n![](({image_url}))"
        self.slides.append(slide)
    
    def generate_presentation(self, format="pdf"):
        """Generiere finale Präsentation"""
        
        # Frontmatter
        markdown = f"""---
marp: true
title: {self.title}
theme: {self.theme}
---

"""
        
        # Folien zusammenfügen
        markdown += "\n\n---\n\n".join(self.slides)
        
        # Speichere .md Datei
        md_file = f"/tmp/{self.title.lower().replace(' ', '_')}.md"
        with open(md_file, 'w') as f:
            f.write(markdown)
        
        # Konvertiere mit MARP
        output_file = f"/transfers/results/{self.title}.{format}"
        cmd = f"marp-convert.sh {md_file} {format} {self.theme} /transfers/results/"
        subprocess.run(cmd, shell=True, check=True)
        
        print(f"✅ Präsentation erstellt: {output_file}")
        return output_file


# Agent-Aufruf:
agent = PresentationAgent("Sales Pitch 2026")

agent.add_slide_with_image("""
# KI-Agenten für KMU

Dein Weg zu 10x Produktivität
""", image_url="https://picsum.photos/1200/400?random=1")

agent.add_slide_with_image("""
## Problem

Manuelle Prozesse fressen deine Zeit
""", image_url="https://picsum.photos/800/600?random=2")

agent.add_slide_with_image("""
## Lösung

Autonome KI-Agenten 24/7
""", image_url="https://picsum.photos/800/600?random=3")

output = agent.generate_presentation("pdf")
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Bilder nicht sichtbar | Falscher URL | Überprüfe URL in Browser |
| MARP konvertiert nicht | Markdown-Syntax | Überprüfe `![alt](url)` Format |
| Bilder zu groß | Falsche Auflösung | Nutze `width="400"` HTML-Attribut |
| Picsum antwortet nicht | Internet/API | Fallback: `https://via.placeholder.com/800x600` |
| nanoBanana zu langsam | AI-Generierung dauert | Plane Zeit ein (~30-60 Sekunden) |

---

## Zusammenfassung für Agenten

**Einfache Regel:**
```
Nutze Picsum für schnelle, kostenlose Stock-Bilder.
Nutze nanoBanana für custom, brand-aligned Bilder.
Nutze Mermaid für Diagramme (keine Bilder nötig).
Nutze CDN-Icons für Tech-Logos.
```

**Kosten-Überblick:**
- Picsum: Kostenlos
- Mermaid: Kostenlos
- nanoBanana: ~€0.05-0.15 pro Bild
- CDN-Icons: Kostenlos

**Speed-Überblick:**
- Picsum: <1 Sekunde
- Mermaid: <1 Sekunde
- nanoBanana: 30-60 Sekunden
- CDN-Icons: <1 Sekunde
