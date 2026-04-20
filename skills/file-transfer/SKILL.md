---
name: file-transfer
description: Bietet Dateien aus dem Workspace zum Download an, indem sie in den öffentlichen Transfer-Ordner kopiert werden. Verwende diesen Skill immer dann, wenn der User eine Datei herunterladen möchte oder du ihm eine erstellte/bearbeitete Datei zur Verfügung stellen sollst.
category: file-management-storage
---

# File Transfer Skill (Stable)

Dieser Skill stellt Dateien über `https://claw.raspb.eu/downloads/<dateiname>` bereit.

## Befehle (Absolute Pfade)
```bash
python3 /home/node/.openclaw/workspace/skills/file-transfer/scripts/transfer_file.py <QUELL_PFAD>
```

## 🧠 Model-Instruction
1. Kopiere die Datei **zuerst** in den Quellpfad innerhalb des Workspaces.
2. Führe das Skript mit dem **absoluten Pfad** zur Quelldatei aus.
3. Poste den Link als Inline-Markdown: `https://claw.raspb.eu/downloads/<filename>`.
4. Packe den Link **NIEMALS** in Code-Blöcke oder Backticks.
