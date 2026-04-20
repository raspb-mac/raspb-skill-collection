# MARP Markdown Syntax Guide

Complete reference for writing MARP presentations using Markdown.

## Slide Structure

### Basic Slide Break
Use `---` on a line by itself to separate slides:

```markdown
# Slide 1 Title

Content here.

---

# Slide 2 Title

More content.
```

### Front Matter (Metadata)
Add YAML front matter at the beginning of your presentation:

```markdown
---
marp: true
title: My Presentation
author: Your Name
theme: raspb
paginate: true
---

# First Slide

Your content starts here.
```

**Common front matter keys:**
- `title` – Presentation title
- `author` – Author name
- `created` – Creation date
- `theme` – Theme name (default, gaia, uncover, raspb)
- `paginate` – Enable slide numbering (true/false)
- `class` – CSS class for styling
- `backgroundColor` – Slide background color
- `backgroundImage` – Background image URL
- `backgroundSize` – Size of background image (cover, contain, auto)

## Text Formatting

### Headings
```markdown
# H1 – Page Title
## H2 – Section Header
### H3 – Subsection
#### H4 – Minor header
```

### Emphasis
```markdown
**bold text**
*italic text*
***bold italic***
~~strikethrough~~
`inline code`
```

### Paragraphs
```markdown
This is a paragraph.

This is a new paragraph (separated by blank line).
```

## Lists

### Unordered Lists
```markdown
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3
```

### Ordered Lists
```markdown
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item
```

### Mixed Lists
```markdown
- Bullet point
  1. Ordered sub-item
  2. Another sub-item
- Another bullet
```

## Code & Technical Content

### Inline Code
```markdown
Use `npm install` to install packages.
```

### Code Blocks
```markdown
\`\`\`javascript
console.log('Hello, Marp!');
\`\`\`

\`\`\`bash
npm run build
\`\`\`

\`\`\`python
print("Marp is awesome")
\`\`\`
```

### Shell/Bash Commands
```markdown
\`\`\`bash
$ marp slides.md -o slides.pdf
$ npm install -g @marp-team/marp-cli
\`\`\`
```

## Links & References

### Inline Links
```markdown
[Link text](https://example.com)
```

### Reference Links
```markdown
This is a [link][ref1] with a reference.

[ref1]: https://example.com
```

### Email Links
```markdown
[Email me](mailto:contact@example.com)
```

## Images

### Basic Image
```markdown
![Alt text](https://example.com/image.png)
```

### Image with Width Control
```markdown
![Alt text](image.png)
<!-- Add custom width via HTML -->
<img src="image.png" width="300" />
```

### Image with Caption (HTML)
```markdown
<figure>
  <img src="image.png" alt="Description" />
  <figcaption>Image caption here</figcaption>
</figure>
```

### Image Positioning
MARP supports Markdown image syntax. Use HTML for more control:

```markdown
![Right-aligned image](image.png)

Or with HTML (right side):
<img src="image.png" align="right" width="400" />
```

## Tables

### Basic Table
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Table with Alignment
```markdown
| Left | Center | Right |
|:-----|:-------:|------:|
| A    |   B    |   C   |
| 1    |   2    |   3   |
```

## Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
>
> And multiple paragraphs.
```

## Horizontal Rules

```markdown
---

or

***

or

___
```

## MARP-Specific Features

### Scoped Styles (Per-Slide CSS)
Apply CSS to specific slides:

```markdown
---

# Styled Slide

<style scoped>
h1 {
  color: red;
  font-size: 60px;
}
</style>
```

### Background Images
```markdown
---
backgroundImage: url('https://example.com/bg.png')
backgroundSize: cover
---

# Slide with Background
```

### Custom Colors
```markdown
---
backgroundColor: #F84B8A
color: white
---

# Pink Slide with White Text
```

### Slide Classes
```markdown
---
class: highlight
---

# Highlighted Slide
<!-- Uses .highlight CSS class from theme -->
```

### Two-Column Layout
Using HTML/CSS:

```markdown
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

<div>

## Left Column

- Point 1
- Point 2

</div>

<div>

## Right Column

- Point 3
- Point 4

</div>

</div>
```

## Diagrams (Mermaid)

MARP supports Mermaid diagrams:

### Flowchart
```markdown
\`\`\`mermaid
graph LR
  A[Start] --> B{Decision}
  B -->|Yes| C[Success]
  B -->|No| D[Try Again]
  C --> E[End]
\`\`\`
```

### Sequence Diagram
```markdown
\`\`\`mermaid
sequenceDiagram
  participant Agent
  participant API
  Agent->>API: Request data
  API-->>Agent: Response
\`\`\`
```

### Gantt Chart
```markdown
\`\`\`mermaid
gantt
  title Project Timeline
  section Tasks
  Task 1 :t1, 0, 30d
  Task 2 :t2, after t1, 20d
\`\`\`
```

## HTML & Advanced Features

### Inline HTML
If enabled (`allowHTML: true`), use HTML directly:

```markdown
<p style="color: blue; font-size: 24px;">
  Custom HTML paragraph
</p>

<div class="custom-box">
  <h3>Custom Box</h3>
  <p>Content here</p>
</div>
```

### Embedding Media
```markdown
<video width="400" controls>
  <source src="video.mp4" type="video/mp4">
</video>

<iframe width="400" height="300" src="https://example.com"></iframe>
```

## Tips for Agents

### Keep It Simple
```markdown
---
marp: true
theme: raspb
paginate: true
---

# Main Title

- Bullet 1
- Bullet 2
- Bullet 3

---

## Details Slide

Paragraph of explanation text here.

> Important quote or highlight
```

### Recommended Markdown Structure
1. **Title Slide** – `---` + `# Title` + optional subtitle
2. **Content Slides** – `##` headers + bullet points
3. **Emphasis Slides** – Single key message or quote
4. **Data Slides** – Tables or images
5. **Call-to-Action** – Final slide with next steps

### Common Pitfalls
- ❌ Don't use `---` in headings (confuses parser)
- ❌ Avoid very long lines (readability issue)
- ❌ Don't mix code blocks and lists without blank lines
- ✅ Always add blank line between sections
- ✅ Use consistent indentation (2 spaces for nesting)

## Front Matter Reference

```yaml
---
# Presentation metadata
marp: true                          # Enable Marp processing
title: Presentation Title          # Browser tab title
author: Your Name                  # Author name
description: Brief description     # Meta description
created: 2026-04-17               # Creation date
modified: 2026-04-17              # Last modified

# Theme & styling
theme: raspb                        # Theme name
paginate: true                      # Show page numbers
footer: "©2026 raspb"              # Footer text
class: lead                         # CSS class

# Appearance
backgroundColor: #F84B8A           # Slide background
backgroundImage: url(...)          # Background image
backgroundSize: cover              # Image sizing
color: white                        # Text color

# Advanced
allowHTML: true                    # Allow HTML in Markdown
math: mathjax                       # Math rendering
---
```

## Full Example Presentation

```markdown
---
marp: true
title: KI for Business
author: Agent Smith
theme: raspb
paginate: true
---

# KI für Geschäftsprozesse

Automatisierung leicht gemacht

---

## Problem

- Manuelle Prozesse sind zeitaufwendig
- Fehlerquote ist hoch
- Skalierbarkeit begrenzt

---

## Lösung: KI-Agenten

**Automatische Datenverarbeitung**
- E-Mail-Klassifizierung
- Dokumentenerfassung
- Workflow-Automation

---

## Ergebnisse

| Metrik | Vorher | Nachher |
|--------|--------|---------|
| Zeit   | 10h    | 1h      |
| Fehler | 15%    | 1%      |
| Kosten | €5000  | €500    |

---

## Nächste Schritte

> Bereit für KI-Automation?

1. Kontaktieren Sie uns
2. Kostenlose Konsultation
3. Projekt starten

---

# Vielen Dank!

Kontakt: contact@raspb.de
```

## Resources

- **Official MARP Docs**: https://marp.app
- **Marpit Framework**: https://marpit.marp.app
- **Mermaid Diagrams**: https://mermaid.js.org
