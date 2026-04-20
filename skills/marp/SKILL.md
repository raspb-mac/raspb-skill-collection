---
name: raspb-slides
description: Create raspb-branded MARP slide decks end-to-end, including image orchestration, HTML export, and showcase deployment. Use when building or revising pitch decks, reports, workshops, or learning decks in Marp, especially when you need to source visuals from Unsplash, SVG generators, nanoBanana, Picsum fallback, or publish the final HTML to the showcase site.
category: office-documents
---

# raspb Slides v5

## Goal
Produce a complete, production-ready Marp deck from brief to published HTML, without follow-up questions unless a critical input is missing.

## Design system
- Primary: `#F84B8A`
- Secondary: `#D4C5F9`
- Dark: `#121D33`
- Light: `#F8F8FC`
- Font: `Plus Jakarta Sans` with weights `200 / 400 / 700 / 800`
- Prefer big headlines, generous whitespace, and one idea per slide.
- Prefer cards, charts, and short lists over dense tables.

## Slide classes
- `hero`, full-bleed image slide with minimal text.
- `split`, image on one side and content on the other.
- `highlight`, one strong statement only.
- `dark`, dark background for contrast or breaks.
- `compact`, use only when content would otherwise overflow.

## Required deck brief
Confirm only the essentials:
- deck type, pitch / report / workshop / learning
- core message
- audience
- length or slide count
- delivery target, HTML showcase by default

If the brief is incomplete, infer reasonable defaults and keep moving.

## Production workflow
1. Clarify the deck brief, type, core message, audience, and length.
2. Choose the deck structure, Pitch / Report / Workshop / Learning.
3. Source visuals before writing slides.
4. Write Marp Markdown with real image URLs.
5. Export to HTML.
6. Deploy HTML via showcase.
7. Return the final URL.

## Visual orchestration
Choose images per slide before writing the slide body.

### Use these tools
- `fetch-unsplash.sh <keyword>` → returns one image URL, insert directly as `![bg](url)`.
- `fetch-svg.sh "<prompt>"` → returns one SVG URL, embed in HTML with `<img src="url">`.
- `image_generate` tool, nanoBanana → branded illustrations, concepts, product visuals.
- Picsum → fallback when no API key, no time, or a placeholder is acceptable.

### Decision tree
- Hero slide, always Unsplash, emotional and real.
- Metric or dashboard slide, always SVG.
- Concept or explanation slide, nanoBanana or SVG.
- Placeholder or speed-first slide, Picsum.

### Image rules
- Use landscape assets only.
- Never use `source.unsplash.com`, it is deprecated.
- For hero slides, use `brightness:0.25` to `brightness:0.35`.
- Keep one visual focal point per slide.

## Frontmatter, mandatory for every deck
```yaml
---
marp: true
theme: raspb
paginate: false
footer: " "
---
```
Rules:
- `footer` must always be a single space, never empty, never real text.
- Footer branding is theme-driven, and the domain must stay `raspb.de`, never `raspb.eu`.
- Do not add Mermaid, it does not render in Marp HTML.

## Structure selection
Pick one structure and keep it simple.

### Pitch
1. Hero
2. Problem
3. Solution
4. Why now
5. Value / ROI
6. Offer
7. CTA

### Report
1. Cover
2. Summary metrics
3. Wins
4. Risks
5. Charts
6. Next actions
7. Appendix

### Workshop
1. Context
2. Goals
3. State
4. Exercises
5. Breakouts
6. Decisions
7. Next steps

### Learning
1. Promise
2. Concepts
3. Examples
4. Practice
5. Pitfalls
6. Summary
7. CTA

## Slide construction rules
- Max 6 bullets per slide.
- Prefer 3 to 5 bullets.
- Keep each slide focused on one question.
- Use short headlines with a clear claim.
- Use HTML cards and SVG for metrics, comparisons, and process slides.
- Use `hero`, `split`, `highlight`, `dark`, and `compact` intentionally.
- Keep hero copy very short.

## Visual and layout patterns
- `hero`: full-bleed image, minimal text, dark overlay.
- `split`: one strong image plus concise text.
- `highlight`: one big statement, no clutter.
- `compact`: only when overflow would otherwise happen.

Use raw HTML when you need precise layout control, especially for SVG charts, metric cards, timelines, and before/after blocks.

### Copy-ready patterns
- Metric card, for KPI slides.
- Donut / bar / sparkline SVG, for dashboards.
- Timeline, for process or roadmap slides.
- Before / after grid, for transformation stories.

Keep visual systems consistent inside one deck.

## Export
Use this production command for final export:
```bash
npx @marp-team/marp-cli@latest \
  --theme /home/node/.openclaw/workspace/skills/marp/assets/themes/raspb-theme.css \
  --allow-local-files \
  --html \
  --output /home/node/.openclaw/workspace/transfers/showcase/<dateiname>.html \
  <input.md>
```
If you use the helper script, keep the same constraints and output path semantics.

## Deploy
Always publish the HTML through showcase deployment:
```bash
python3 /home/node/.openclaw/workspace/skills/showcase-website/scripts/expose_showcase.py <HTML_DATEI>
```
Return the showcase URL, which is served from `claw.raspb.eu/showcase/`.

## Content rules
- Put the strongest claim first.
- Annotate charts in plain language.
- Avoid mixing too many visual systems in one deck.
- Prefer numbers with context, not naked metrics.
- Turn tables with more than 5 rows into cards or charts.
- Keep call-to-action slides short and clean.

## SVG and HTML components
Use the existing pattern library in `references/` for metric cards, charts, timelines, and comparisons.
If needed, create custom inline SVG only when it is simpler than hunting for a reference.

## Reference index
Read these when you need ready-made patterns:
- `references/examples/raspb-pitch-deck-v4.md`
- `references/examples/marp_facebook-ads.md`
- `references/examples/marp_hero.md`
- `references/examples/marp_comparison.md`
- `references/examples/marp_coffee.md`
- `references/examples/marp_fitness.md`
- `references/examples/01-sales-pitch.md`
- `references/examples/02-technical-architecture.md`
- `references/examples/03-daily-report.md`

## Quick start workflow
1. Pick the deck type and one key message.
2. Choose the structure.
3. Source images first, then write headlines.
4. Build slides with HTML cards, SVG charts, and short bullets.
5. Export with Marp CLI.
6. Deploy through showcase.
7. Return the URL.

## Frequent mistakes
- Using too much text.
- Forgetting local-file export support.
- Putting footer text into the deck body.
- Making hero images too bright.
- Using portrait imagery in landscape layouts.
- Reaching for Mermaid instead of HTML or SVG.
- Relying on defaults for spacing.
- Using deprecated Unsplash endpoints.

## Delivery standard
A finished deck must include:
- a clear brief interpretation
- sourced visuals or explicit placeholder choice
- valid Marp Markdown
- exported HTML
- showcase URL
