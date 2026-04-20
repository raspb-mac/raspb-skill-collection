---
name: github
description: GitHub Integration für raspb. Verwende diesen Skill, um Repositories der Organisation raspb-webservices zu lesen/ändern, Issues/PRs zu verwalten und (nach Bestätigung) Commits zu erstellen.
category: business-management
---

# GitHub Skill

Nutze das Script `scripts/github_client.py` als zuverlässige API-Brücke.

## Quick Tests

- Auth prüfen:
  ```bash
  python3 skills/github/scripts/github_client.py user
  ```

- Org-Repos listen:
  ```bash
  python3 skills/github/scripts/github_client.py org_repos raspb-webservices
  ```

## Repository-Kontext (raspb)

- **raspb-webservices/main-site**: Das Haupt-Repository. Beinhaltet die Webseite [https://raspb.de](https://raspb.de), inklusive Produktkonfigurator und Kern-Logik.
- **raspb-webservices/cateringmaster**: Ein weiteres aktives Projekt der Organisation.
- **raspb-mac/play**: Privates Repository von Markus für Experimente und Tests.

**Wichtig:** Andere Repositories (wie evtl. `main-site-content`) sind aktuell nicht relevant oder nicht Teil des aktiven Fokus.
