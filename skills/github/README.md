# github

## Was macht dieser Skill?
Greift per Skript auf GitHub zu, für Repos, Issues, PRs und sonstige Repo-Operationen.

## Voraussetzungen
- GitHub-Zugangsdaten bzw. Token laut `SKILL.md`
- Python- oder Node-Abhängigkeiten je nach Aktion

## Verwendung

### Über den Agent (empfohlen)
Nutze den Skill für Repository-Abfragen, PR-Arbeit oder Issue-Verwaltung in `raspb-webservices`.

### Direkte Ausführung
```bash
python3 /home/node/.openclaw/workspace/skills/github/scripts/github_client.py user
```

Weitere typische Aufrufe:
```bash
python3 /home/node/.openclaw/workspace/skills/github/scripts/github_client.py org_repos raspb-webservices
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| Action | z. B. `user`, `org_repos`, Repo-spezifische Kommandos | ja |
| Org/Repo-Argumente | je nach Action | falls nötig |

## Output
JSON oder textuelle GitHub-Antworten direkt im Terminal.

## Bekannte Einschränkungen
- Auth muss vorhanden sein
- Nicht jeder GitHub-Workflow ist im CLI abgebildet
