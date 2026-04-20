---
name: web-scraper
description: Scrape an entire website (internal links) and save each subpage as a separate Markdown file in the workspace. Use when the user says "scrape die seite [URL]" or needs to ingest multiple pages from a domain.
category: search-knowledge
---

# Web Scraper Skill

This skill allows for systematic scraping of a website's internal pages, converting them to Markdown and storing them in the workspace.

## Workflow

1. **Identify the target URL**: Ensure it is a valid absolute URL.
2. **Execute the scraper**: Use the bundled Python script.
3. **Storage**: Files are saved in `scrapes/[domain_name]/`.

## Usage (Absolute Pfade)

```bash
python3 /home/node/.openclaw/workspace/skills/web-scraper/scripts/scraper.py <URL> [max_pages]
```

## 🧠 Model-Instruction
1. Scrapes landen in `/home/node/.openclaw/workspace/scrapes/[domain]/`.
2. Informiere Markus nach Abschluss über den genauen Pfad der Markdown-Dateien.

Default `max_pages` is 20. Adjust based on the site size and user needs.

## Limitations

- Does not execute JavaScript (click events, dynamic loads).
- Respects internal links only (stays on the same domain).
- Basic HTML-to-Markdown conversion (strips nav, header, footer).
