---
name: deep-research
description: Führt eine tiefgehende Online-Recherche mit dem spezialisierten Perplexity Modell "sonar-deep-research" durch. Verwende diesen Skill, wenn der User explizit nach "Deep Research", einer "tiefgehenden Recherche" oder einer "ausführlichen Analyse" fragt.
category: search-knowledge
---

# Deep Research Skill

Dieser Skill optimiert die Recherchequalität durch Nutzung des leistungsfähigsten Perplexity-Modells.

## Workflow

1. **Trigger:** Der User verlangt explizit nach "Deep Research".
2. **Modell-Wahl:** Für alle `web_search` Aufrufe innerhalb dieser Aufgabe **MUSS** das Modell `sonar-deep-research` verwendet werden.
3. **Analyse:** Die Ergebnisse von `sonar-deep-research` sind wesentlich ausführlicher als die der Standard-Suche. Verarbeite diese entsprechend detailliert.

## Technische Anweisung für Haley

Wenn dieser Skill aktiv ist, überschreibe den Standard-Provider-Parameter im `web_search` Tool Call:

- **Standard:** `sonar-pro`
- **Deep Research:** `sonar-deep-research`

Beispiel für den Tool-Aufruf:
`web_search(query="...", model="sonar-deep-research")`
