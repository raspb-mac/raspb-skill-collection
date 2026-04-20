# file-transfer

## Was macht dieser Skill?
Kopiert Dateien in den öffentlichen Transfer-Ordner und erzeugt einen Download-Link.

## Voraussetzungen
- Die Quelldatei existiert bereits
- Python 3

## Verwendung

### Über den Agent (empfohlen)
Wenn eine Datei an Markus geliefert werden soll, zuerst in den Workspace legen, dann den Transfer auslösen.

### Direkte Ausführung
```bash
python3 /home/node/.openclaw/workspace/skills/file-transfer/scripts/transfer_file.py /home/node/.openclaw/workspace/transfers/results/datei.pdf
```

## Parameter
| Parameter | Beschreibung | Pflicht |
|---|---|---|
| Source path | Absoluter Pfad zur Datei | ja |

## Output
Die Datei landet in `transfers/downloads/` und wird als `https://claw.raspb.eu/downloads/<dateiname>` erreichbar.

## Bekannte Einschränkungen
- Kopiert nur vorhandene Dateien
- Dateiname bleibt unverändert
