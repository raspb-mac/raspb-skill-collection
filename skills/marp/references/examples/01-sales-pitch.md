---
marp: true
title: KI-Agenten für KMU – Pitch Deck
author: raspb webservices
theme: raspb
paginate: true
---

# KI-Agenten statt Mitarbeiter

### Wie KMU mit autonomen Systemen 10× schneller wachsen

![right width:400px](https://picsum.photos/400/300?random=1)

---

## Das Problem

- **Zeitaufwand:** Dein Team sitzt an repetitiven Aufgaben fest
- **Kosten:** Jeder zusätzliche Mitarbeiter ist eine Fixkostenfalle
- **Skalierung:** Ohne New Hires = keine neuen Projekte
- **Qualität:** Manuelle Prozesse = menschliche Fehler

![right width:350px](https://picsum.photos/400/300?random=2)

---

## Die Lösung: Autonome KI-Agenten

**Was ist ein Agent?**
- 🤖 Nicht nur ChatGPT im Browser
- 🔧 Eigenständig arbeitet mit deinen Tools und Daten
- 💾 Lernt Prozesse, führt sie aus, dokumentiert
- 🚀 24/7 verfügbar, ohne Kaffeepausen

---

## Use Cases (Jetzt einsetzbar)

| Bereich | Task | Zeiteinsparung |
|---------|------|-----------------|
| **Vertrieb** | Lead-Qualifizierung | 15h/Woche |
| **Admin** | Rechnungen & Verträge | 12h/Woche |
| **Support** | Ticket-Vorqualifizierung | 10h/Woche |
| **Technik** | Dokumentation generieren | 8h/Woche |
| **Daten** | ETL-Pipelines | 20h/Woche |

---

## Praktisches Beispiel: E-Mail-Agent

```
🔄 Workflow:
1. Agent liest alle Mails (Gmail/Outlook)
2. Kategorisiert: Vertrieb / Support / Admin
3. Erstellt Angebote (Draft)
4. Speichert in CRM
5. Du reviewst & schickst ab
```

**Resultat:** 4 Stunden Tagesarbeit → 15 Minuten Review

---

## Variante: Dokumenten-Agent

![left width:350px](https://picsum.photos/400/300?random=3)

**Automatische Rechnungserfassung**
- Scanned PDFs → strukturierte Daten
- Validiert gegen Kontoplan
- Bucht automatisch
- Flag bei Unstimmigkeiten

**Kosten:** €890/Monat
**ROI:** 8 Wochen

---

## Tech-Stack (Dein Setup)

![width:800px](https://picsum.photos/800/200?random=4)

- **Basis:** OpenAI / Claude / Gemini (deine Wahl)
- **Orchestration:** n8n (Open-Source, selbstgehostet)
- **Integration:** Deine bestehenden Tools (Zapier / Make / n8n)
- **Human in the Loop:** Immer ein Kontrollpunkt, bevor es live geht

---

## Pricing: Paketierte Festpreise

### Corporate Basic
**€890/Monat**
- 1 Standard-Agent (z.B. E-Mail)
- Bis 500 Transaktionen/Monat
- Support: Email
- Update monatlich

### Corporate Standard
**€2.490/Monat**
- 3 Agenten
- Bis 5.000 Transaktionen/Monat
- Priority Support
- Wöchentliche Optimierung

### Enterprise (Custom)
**Auf Anfrage**
- Unlimited Agenten
- Custom Workflow-Architektur
- Dedicated Account Manager

---

## Warum raspb?

✅ **20 Jahre Expertise** in Web-Engineering + KI  
✅ **Fixpreise, keine Spielerei** – du weißt was du zahlst  
✅ **Human in the Loop** – echte Menschen checken Qualität  
✅ **Full Ownership** – dein Code, deine Daten, deine Rules  
✅ **DSGVO-konform** – selbstgehostet oder EU-Cloud  

![right width:300px](https://picsum.photos/300/300?random=5)

---

## Nächste Schritte

**1. Projekt-Kickoff**
- Prozess analysieren (2 Stunden)
- Anforderungen definieren
- Budget & Timeline

**2. MVP Entwicklung**
- Agent-Setup & Training
- Testing & Optimierung
- Go-Live

**3. Ongoing Optimization**
- Performance Monitoring
- Kontinuierliche Verbesserung

---

## Starten heute?

### 📅 **15-Minuten Discovery Call**

Lass uns über deine Top-3-Schmerzpunkte sprechen.

**Ergebnis:** Du erhältst eine konkrete Machbarkeitsstudie + ROI-Kalkulation

### 🔗 **Termin buchen**
[projekte.raspb.eu/termin](https://projekte.raspb.eu/termin)

---

# Danke!

**raspb webservices**
KI-Agenten für den Mittelstand

📧 kontakt@raspb.de
📞 +49 6732 9648113
🌐 raspb.eu

---

## Appendix: Agent-Beispiel JSON

```json
{
  "name": "Email Processor",
  "trigger": "on_email_received",
  "actions": [
    "classify_by_category",
    "extract_entities",
    "generate_draft_response",
    "log_to_crm"
  ],
  "approval_required": true,
  "sla_hours": 2
}
```
