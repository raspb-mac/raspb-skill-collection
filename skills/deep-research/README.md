# deep-research

## Was macht dieser Skill?
Führt eine tiefgehende Webrecherche mit Perplexity **sonar-deep-research** durch.

## Voraussetzungen
- `web_search` ist verfügbar
- Kein lokales Python- oder Node-Script nötig

## Verwendung

### Über den Agent (empfohlen)
Bitte explizit eine **Deep-Research**-Recherche anstoßen. Der Agent ruft dann `web_search` im Deep-Research-Modus auf.

### Direkte Ausführung
Kein CLI-Script. Dieser Skill wird direkt über den Agent und das `web_search`-Tool benutzt.

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| Query | Recherchefrage | ja |

## Output
Eine strukturierte, quellenbasierte Recherche als Antwort im Chat.

## Bekannte Einschränkungen
- Kein eigener Dateiauswurf
- Nur so gut wie die Webquellen und die Suchabdeckung
