# picsum-generator

## Was macht dieser Skill?
Lädt Platzhalterbilder von Lorem Picsum und packt sie optional als ZIP.

## Voraussetzungen
- Python 3
- Internetzugang zu `picsum.photos`

## Verwendung

### Über den Agent (empfohlen)
Nutze den Skill für Mockups, Tests oder schnelle Bildsets.

### Direkte Ausführung
```bash
python3 /home/node/.openclaw/workspace/skills/picsum-generator/scripts/generate.py   --count 10 --width 1200 --height 720 --zip
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| `--count` | Anzahl Bilder | nein |
| `--width` | Bildbreite | nein |
| `--height` | Bildhöhe | nein |
| `--output` | Zielordner | nein |
| `--zip` | ZIP-Archiv erzeugen | nein |
| `--zip-path` | ZIP-Zielpfad | nein |

## Output
JPEGs im Output-Ordner, optional ein ZIP-Archiv.

## Bekannte Einschränkungen
- Benötigt Online-Zugriff
- Bilder sind generische Platzhalter
