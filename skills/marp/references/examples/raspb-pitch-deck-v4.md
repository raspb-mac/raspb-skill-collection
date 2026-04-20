---
marp: true
theme: raspb
paginate: true
footer: " "
---

<!-- _class: hero -->
<!-- _footer: '' -->
<!-- _paginate: false -->

![bg brightness:0.28](https://images.unsplash.com/photo-1645451355833-631b4e51b07b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080)

<div style="position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding: 0 80px;">
  <span class="tag-pink" style="background:rgba(248,75,138,0.18); border-color:rgba(248,75,138,0.35); color:#fff; font-size:0.55rem; margin-bottom:22px;">KI-Agenten für den Mittelstand</span>
  <div style="font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:4rem; color:#fff; line-height:1; letter-spacing:-0.04em; max-width:820px;">
    Autonome KI-Agenten,<br>die wirklich arbeiten.
  </div>
  <div style="margin-top:22px; font-size:1rem; color:rgba(255,255,255,0.75); font-weight:300; max-width:560px; line-height:1.6;">
    Spezialisiert. Transparent. Human in the Loop.<br>
    raspb baut digitale Arbeitskraft für KMU.
  </div>
  <div style="margin-top:36px; display:flex; gap:12px; justify-content:center;">
    <span style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:99px; padding:6px 18px; font-size:0.55rem; color:rgba(255,255,255,0.8); font-weight:700; letter-spacing:0.05em;">Markus Härtig — Gründer & CEO</span>
    <span style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:99px; padding:6px 18px; font-size:0.55rem; color:rgba(255,255,255,0.8); font-weight:700; letter-spacing:0.05em;">April 2026</span>
  </div>
</div>

---

## Das Problem: Mittelstand 2026

<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-top:14px;">
  <div class="metric-card">
    <div class="label">Repetitive Arbeit</div>
    <div class="value" style="color:#F84B8A;">40%</div>
    <div style="margin-top:8px; color:var(--c-muted); font-size:0.68rem; line-height:1.5;">der Arbeitszeit in KMU verschwindet in E-Mails, Datenpflege und Koordination.</div>
  </div>
  <div class="metric-card">
    <div class="label">Neue Mitarbeiter</div>
    <div class="value">€3–5k</div>
    <div style="margin-top:8px; color:var(--c-muted); font-size:0.68rem; line-height:1.5;">Fixkosten pro Monat — dazu 3 Monate Recruiting, Einarbeitung, Risiko.</div>
  </div>
  <div class="metric-card">
    <div class="label">Low-Code Tools</div>
    <div class="value" style="color:#6B6B80;">Mauer</div>
    <div style="margin-top:8px; color:var(--c-muted); font-size:0.68rem; line-height:1.5;">Skalierungsgrenzen, kein Support, keine echte Prozesslogik.</div>
  </div>
</div>

<div style="margin-top:20px; display:grid; grid-template-columns:1.2fr 0.8fr; gap:18px; align-items:center;">
  <div>
    <h3>Die eigentliche Frage</h3>
    <ul>
      <li>Wie ersetzt man wiederkehrende Arbeit — ohne Kontrolle zu verlieren?</li>
      <li>Wie skaliert man Prozesse — ohne neue Fixkosten?</li>
      <li>Wie bleibt man Herr über die eigene Logik und Daten?</li>
    </ul>
  </div>
  <div style="background:var(--c-light); border:1px solid var(--c-line); border-radius:16px; padding:20px; text-align:center;">
    <div style="font-size:2.8rem; font-weight:800; color:#F84B8A; letter-spacing:-0.04em; line-height:1;">KMU</div>
    <div style="font-size:0.65rem; color:var(--c-muted); margin-top:6px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">braucht eine dritte Option</div>
  </div>
</div>

---

<!-- _class: dark -->

## Unsere Antwort: raspb

<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:16px; align-items:start;">
  <div>
    <div style="font-size:1.1rem; font-weight:300; color:rgba(232,232,240,0.8); line-height:1.7; margin-bottom:20px;">
      Wir bauen <strong>spezialisierte KI-Agenten</strong> — keine Chatbots, keine Demo-Tools. Systeme, die eigenständig Arbeit erledigen und dabei vollständig transparent bleiben.
    </div>
    <ul>
      <li><strong>Spezialisiert</strong> — auf ein konkretes Problem maßgeschneidert</li>
      <li><strong>Autonom</strong> — laufen 24/7, treffen regelbasierte Entscheidungen</li>
      <li><strong>Transparent</strong> — Human in the Loop, volle Kontrolle</li>
      <li><strong>Ownership</strong> — vollständiger Code, keine Vendor-Lock-ins</li>
    </ul>
  </div>
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
    <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px;">
      <div style="font-size:0.55rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#D4C5F9; margin-bottom:8px;">Erreichbarkeit</div>
      <div style="font-size:1.6rem; font-weight:800; color:#fff; line-height:1;">24/7</div>
      <div style="font-size:0.65rem; color:rgba(232,232,240,0.5); margin-top:6px;">Kein Urlaub, keine Ausfälle</div>
    </div>
    <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px;">
      <div style="font-size:0.55rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#D4C5F9; margin-bottom:8px;">Projektstart</div>
      <div style="font-size:1.6rem; font-weight:800; color:#fff; line-height:1;">4W</div>
      <div style="font-size:0.65rem; color:rgba(232,232,240,0.5); margin-top:6px;">statt 3–6 Monate Agentur</div>
    </div>
    <div style="background:rgba(248,75,138,0.12); border:1px solid rgba(248,75,138,0.25); border-radius:14px; padding:16px;">
      <div style="font-size:0.55rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#F84B8A; margin-bottom:8px;">Festpreis</div>
      <div style="font-size:1.6rem; font-weight:800; color:#fff; line-height:1;">immer</div>
      <div style="font-size:0.65rem; color:rgba(232,232,240,0.5); margin-top:6px;">Budget vor Projektstart fest</div>
    </div>
    <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px;">
      <div style="font-size:0.55rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#D4C5F9; margin-bottom:8px;">Kosten</div>
      <div style="font-size:1.6rem; font-weight:800; color:#fff; line-height:1;">-80%</div>
      <div style="font-size:0.65rem; color:rgba(232,232,240,0.5); margin-top:6px;">vs. menschliche Ressource</div>
    </div>
  </div>
</div>

---

## Use Case: Lead-Qualifizierung

<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:14px; align-items:start;">
  <div>
    <h3>Das Problem</h3>
    <p style="color:var(--c-muted); font-size:0.8rem; line-height:1.6;">Sales-Teams ertrinken in unqualifizierten Anfragen. Jede Antwort kostet Zeit — auch die, die sowieso nichts werden.</p>
    <div style="margin-top:16px; display:flex; flex-direction:column; gap:10px;">
      <div style="display:flex; align-items:center; gap:10px; background:var(--c-light); border:1px solid var(--c-line); border-radius:12px; padding:12px 16px;">
        <div style="width:8px; height:8px; border-radius:50%; background:#ef4444; flex-shrink:0;"></div>
        <span style="font-size:0.72rem; color:var(--c-text);">Antwortzeit: <strong>4–8 Stunden</strong></span>
      </div>
      <div style="display:flex; align-items:center; gap:10px; background:var(--c-light); border:1px solid var(--c-line); border-radius:12px; padding:12px 16px;">
        <div style="width:8px; height:8px; border-radius:50%; background:#ef4444; flex-shrink:0;"></div>
        <span style="font-size:0.72rem; color:var(--c-text);">Aufwand Sales: <strong>20h/Woche</strong></span>
      </div>
      <div style="display:flex; align-items:center; gap:10px; background:var(--c-light); border:1px solid var(--c-line); border-radius:12px; padding:12px 16px;">
        <div style="width:8px; height:8px; border-radius:50%; background:#ef4444; flex-shrink:0;"></div>
        <span style="font-size:0.72rem; color:var(--c-text);">Lead-Qualität: <strong>gemischt</strong></span>
      </div>
    </div>
  </div>
  <div>
    <h3>Mit KI-Agent</h3>
    <div style="display:flex; flex-direction:column; gap:10px; margin-top:4px;">
      <div style="display:flex; align-items:center; gap:10px; background:rgba(18,146,74,0.06); border:1px solid rgba(18,146,74,0.2); border-radius:12px; padding:12px 16px;">
        <div style="width:8px; height:8px; border-radius:50%; background:#22c55e; flex-shrink:0;"></div>
        <span style="font-size:0.72rem; color:var(--c-text);">Antwortzeit: <strong style="color:#12924A;">&lt; 5 Minuten</strong></span>
      </div>
      <div style="display:flex; align-items:center; gap:10px; background:rgba(18,146,74,0.06); border:1px solid rgba(18,146,74,0.2); border-radius:12px; padding:12px 16px;">
        <div style="width:8px; height:8px; border-radius:50%; background:#22c55e; flex-shrink:0;"></div>
        <span style="font-size:0.72rem; color:var(--c-text);">Aufwand Sales: <strong style="color:#12924A;">6h/Woche</strong></span>
      </div>
      <div style="display:flex; align-items:center; gap:10px; background:rgba(18,146,74,0.06); border:1px solid rgba(18,146,74,0.2); border-radius:12px; padding:12px 16px;">
        <div style="width:8px; height:8px; border-radius:50%; background:#22c55e; flex-shrink:0;"></div>
        <span style="font-size:0.72rem; color:var(--c-text);">Lead-Qualität: <strong style="color:#12924A;">gefiltert & bewertet</strong></span>
      </div>
    </div>
    <div class="metric-card" style="margin-top:14px;">
      <div class="label">Einsparung</div>
      <div class="value" style="color:#F84B8A;">14h</div>
      <div class="delta">pro Woche · sofort wirksam</div>
    </div>
  </div>
</div>

---

## Use Case: Rechnungsverarbeitung

<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:14px; align-items:start;">
  <div>
    <h3>Ausgangssituation</h3>
    <p style="color:var(--c-muted); font-size:0.8rem; line-height:1.6;">Buchhaltung sitzt täglich an gescannten PDFs, tippt Daten ab, prüft manuell gegen den Kontoplan.</p>
    <svg width="100%" height="180" viewBox="0 0 400 180" style="margin-top:12px;">
      <rect x="0" y="0" width="400" height="180" rx="14" fill="#F8F8FC" stroke="#EBEBF5"/>
      <!-- Before bar -->
      <rect x="40" y="30" width="60" height="120" rx="8" fill="#EBEBF5"/>
      <text x="70" y="24" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="11" fill="#6B6B80">Vorher</text>
      <text x="70" y="164" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="11" fill="#6B6B80">4h/Tag</text>
      <!-- After bar -->
      <rect x="140" y="135" width="60" height="15" rx="8" fill="#F84B8A"/>
      <text x="170" y="24" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="11" fill="#6B6B80">Nachher</text>
      <text x="170" y="164" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="11" fill="#12924A" font-weight="700">30m/Tag</text>
      <!-- Savings -->
      <rect x="250" y="0" width="1" height="180" fill="#EBEBF5"/>
      <text x="320" y="70" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="28" font-weight="800" fill="#F84B8A">-88%</text>
      <text x="320" y="90" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="11" fill="#6B6B80">Zeitersparnis</text>
      <text x="320" y="120" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="22" font-weight="800" fill="#121D33">€3.000</text>
      <text x="320" y="140" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="11" fill="#6B6B80">gespart/Monat</text>
    </svg>
  </div>
  <div>
    <h3>Was der Agent tut</h3>
    <div style="display:flex; flex-direction:column; gap:18px; margin-top:8px;">
      <div style="display:flex; align-items:flex-start; gap:14px;">
        <svg width="28" height="28" viewBox="0 0 28 28" flex-shrink="0" style="flex-shrink:0; margin-top:1px;"><circle cx="14" cy="14" r="13" fill="#F84B8A" opacity="0.12" stroke="#F84B8A" stroke-width="1.5"/><text x="14" y="19" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="12" font-weight="800" fill="#F84B8A">1</text></svg>
        <div><div style="font-weight:700; color:var(--c-dark); font-size:0.78rem;">Lesen</div><div style="color:var(--c-muted); font-size:0.68rem; margin-top:2px; line-height:1.5;">PDF-Rechnungen automatisch einlesen & OCR</div></div>
      </div>
      <div style="display:flex; align-items:flex-start; gap:14px;">
        <svg width="28" height="28" viewBox="0 0 28 28" style="flex-shrink:0; margin-top:1px;"><circle cx="14" cy="14" r="13" fill="#F84B8A" opacity="0.12" stroke="#F84B8A" stroke-width="1.5"/><text x="14" y="19" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="12" font-weight="800" fill="#F84B8A">2</text></svg>
        <div><div style="font-weight:700; color:var(--c-dark); font-size:0.78rem;">Extrahieren</div><div style="color:var(--c-muted); font-size:0.68rem; margin-top:2px; line-height:1.5;">Betrag, Datum, Lieferant, Kostenstelle</div></div>
      </div>
      <div style="display:flex; align-items:flex-start; gap:14px;">
        <svg width="28" height="28" viewBox="0 0 28 28" style="flex-shrink:0; margin-top:1px;"><circle cx="14" cy="14" r="13" fill="#F84B8A" opacity="0.12" stroke="#F84B8A" stroke-width="1.5"/><text x="14" y="19" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="12" font-weight="800" fill="#F84B8A">3</text></svg>
        <div><div style="font-weight:700; color:var(--c-dark); font-size:0.78rem;">Validieren</div><div style="color:var(--c-muted); font-size:0.68rem; margin-top:2px; line-height:1.5;">Abgleich gegen Kontoplan & Regeln</div></div>
      </div>
      <div style="display:flex; align-items:flex-start; gap:14px;">
        <svg width="28" height="28" viewBox="0 0 28 28" style="flex-shrink:0; margin-top:1px;"><circle cx="14" cy="14" r="13" fill="#F84B8A" opacity="0.12" stroke="#F84B8A" stroke-width="1.5"/><text x="14" y="19" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="12" font-weight="800" fill="#F84B8A">4</text></svg>
        <div><div style="font-weight:700; color:var(--c-dark); font-size:0.78rem;">Buchen oder eskalieren</div><div style="color:var(--c-muted); font-size:0.68rem; margin-top:2px; line-height:1.5;">Klare Fälle direkt buchen — Ausnahmen ans Team</div></div>
      </div>
    </div>
    <div class="metric-card" style="margin-top:16px;">
      <div class="label">Amortisation</div>
      <div class="value" style="color:#F84B8A;">&lt; 8W</div>
      <div class="delta">Typische Projekte</div>
    </div>
  </div>
</div>

---

## ROI auf einen Blick

<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:14px;">
  <div class="metric-card">
    <div class="label">Zeitersparnis</div>
    <div class="value">14h</div>
    <div class="delta">pro Woche im Sales</div>
  </div>
  <div class="metric-card">
    <div class="label">Antwortzeit</div>
    <div class="value">&lt;5m</div>
    <div class="delta">statt 4–8 Stunden</div>
  </div>
  <div class="metric-card">
    <div class="label">Monatseinsparung</div>
    <div class="value">€3k</div>
    <div class="delta">in der Buchhaltung</div>
  </div>
  <div class="metric-card">
    <div class="label">Verfügbarkeit</div>
    <div class="value">24/7</div>
    <div class="delta">ohne Mehrkosten</div>
  </div>
</div>

<div style="margin-top:20px; display:grid; grid-template-columns:1.1fr 0.9fr; gap:18px; align-items:stretch;">
  <div>
    <h3>Mensch vs. KI-Agent</h3>
    <div style="display:flex; flex-direction:column; gap:6px; margin-top:8px;">
      <div style="display:flex; align-items:center; gap:12px; font-size:0.72rem; padding:8px 0; border-bottom:1px solid var(--c-line);">
        <div style="flex:1.5; color:var(--c-muted);">Kosten/Monat</div>
        <div style="flex:1; color:#ef4444; font-weight:700;">€3–5k fix</div>
        <div style="flex:1; color:#12924A; font-weight:700;">€200–1k skalierbar</div>
      </div>
      <div style="display:flex; align-items:center; gap:12px; font-size:0.72rem; padding:8px 0; border-bottom:1px solid var(--c-line);">
        <div style="flex:1.5; color:var(--c-muted);">Recruiting</div>
        <div style="flex:1; color:#ef4444; font-weight:700;">3 Monate</div>
        <div style="flex:1; color:#12924A; font-weight:700;">entfällt</div>
      </div>
      <div style="display:flex; align-items:center; gap:12px; font-size:0.72rem; padding:8px 0; border-bottom:1px solid var(--c-line);">
        <div style="flex:1.5; color:var(--c-muted);">Urlaub / Krankheit</div>
        <div style="flex:1; color:#ef4444; font-weight:700;">ja</div>
        <div style="flex:1; color:#12924A; font-weight:700;">nein</div>
      </div>
      <div style="display:flex; align-items:center; gap:12px; font-size:0.72rem; padding:8px 0;">
        <div style="flex:1.5; color:var(--c-muted);">Skalierung</div>
        <div style="flex:1; color:#ef4444; font-weight:700;">+1 Person = +Kosten</div>
        <div style="flex:1; color:#12924A; font-weight:700;">linear ohne Mehrkosten</div>
      </div>
    </div>
  </div>
  <div style="background:var(--g-pink); border-radius:18px; padding:22px; display:flex; flex-direction:column; justify-content:center; color:#fff;">
    <div style="font-size:0.6rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; opacity:0.75; margin-bottom:10px;">Das Paradigma</div>
    <div style="font-size:1.05rem; font-weight:800; line-height:1.3;">KI-Agenten sind keine Automatisierung. Sie sind eine neue Arbeitskraftklasse.</div>
  </div>
</div>

---

## Der Markt ist bereit

<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:14px; align-items:start;">
  <div>
    <div style="background:var(--c-light); border:1px solid var(--c-line); border-radius:18px; padding:20px;">
      <h3>Marktgröße KMU DACH</h3>
      <svg width="100%" height="200" viewBox="0 0 440 200">
        <!-- Grid -->
        <line x1="40" y1="10" x2="40" y2="170" stroke="#EBEBF5" stroke-width="1"/>
        <line x1="40" y1="170" x2="420" y2="170" stroke="#EBEBF5" stroke-width="1"/>
        <line x1="40" y1="130" x2="420" y2="130" stroke="#F2F2FA" stroke-width="1" stroke-dasharray="4,4"/>
        <line x1="40" y1="90" x2="420" y2="90" stroke="#F2F2FA" stroke-width="1" stroke-dasharray="4,4"/>
        <line x1="40" y1="50" x2="420" y2="50" stroke="#F2F2FA" stroke-width="1" stroke-dasharray="4,4"/>
        <!-- Bars -->
        <rect x="60" y="130" width="48" height="40" rx="6" fill="#D4C5F9"/>
        <rect x="140" y="110" width="48" height="60" rx="6" fill="#D4C5F9"/>
        <rect x="220" y="80" width="48" height="90" rx="6" fill="#F84B8A"/>
        <rect x="300" y="55" width="48" height="115" rx="6" fill="#F84B8A"/>
        <rect x="380" y="22" width="48" height="148" rx="6" fill="#121D33"/>
        <!-- Labels -->
        <text x="84" y="188" text-anchor="middle" fill="#6B6B80" font-family="Plus Jakarta Sans" font-size="11">2022</text>
        <text x="164" y="188" text-anchor="middle" fill="#6B6B80" font-family="Plus Jakarta Sans" font-size="11">2023</text>
        <text x="244" y="188" text-anchor="middle" fill="#6B6B80" font-family="Plus Jakarta Sans" font-size="11">2024</text>
        <text x="324" y="188" text-anchor="middle" fill="#6B6B80" font-family="Plus Jakarta Sans" font-size="11">2025</text>
        <text x="404" y="188" text-anchor="middle" fill="#121D33" font-family="Plus Jakarta Sans" font-size="11" font-weight="800">2026</text>
        <!-- Y Labels -->
        <text x="32" y="133" text-anchor="end" fill="#ABABBB" font-family="Plus Jakarta Sans" font-size="10">25%</text>
        <text x="32" y="93" text-anchor="end" fill="#ABABBB" font-family="Plus Jakarta Sans" font-size="10">50%</text>
        <text x="32" y="53" text-anchor="end" fill="#ABABBB" font-family="Plus Jakarta Sans" font-size="10">75%</text>
      </svg>
      <div style="font-size:0.62rem; color:var(--c-muted); margin-top:4px;">KMU-Nachfrage nach KI-Automatisierung wächst jährlich um 30–40%</div>
    </div>
  </div>
  <div>
    <h3>Unsere Zielgruppe</h3>
    <ul>
      <li>Unternehmen mit <strong>10–200 Mitarbeitern</strong></li>
      <li>Branchen: Handel, Immobilien, Dienstleistung, Beratung</li>
      <li>Schmerz: repetitive Prozesse, knappes IT-Budget</li>
    </ul>
    <div style="margin-top:18px;">
      <h3>Unser Moat</h3>
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
        <div style="background:var(--c-light); border:1px solid var(--c-line); border-radius:12px; padding:12px 16px; font-size:0.72rem;">
          <strong>Spezialisierung</strong> — kein generischer Chatbot, sondern dedizierte Agenten-Logik
        </div>
        <div style="background:var(--c-light); border:1px solid var(--c-line); border-radius:12px; padding:12px 16px; font-size:0.72rem;">
          <strong>Human in the Loop</strong> — Entscheidungen bleiben beim Kunden
        </div>
        <div style="background:var(--c-light); border:1px solid var(--c-line); border-radius:12px; padding:12px 16px; font-size:0.72rem;">
          <strong>Code-Ownership</strong> — kein Vendor-Lock-in, volle Kontrolle
        </div>
      </div>
    </div>
  </div>
</div>

---

<!-- _class: highlight -->

## Jetzt starten.

### 15-Minuten Discovery-Call — wir finden deinen Use Case.

<div style="margin-top:28px; display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
  <div style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); border-radius:99px; padding:8px 22px; font-size:0.62rem; color:#fff;">📅 raspb.de/appointment</div>
  <div style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); border-radius:99px; padding:8px 22px; font-size:0.62rem; color:#fff;">📧 kontakt@raspb.de</div>
  <div style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); border-radius:99px; padding:8px 22px; font-size:0.62rem; color:#fff;">📞 +49 6732 9648113</div>
</div>

---

<!-- _class: hero -->
<!-- _footer: '' -->
<!-- _paginate: false -->

![bg brightness:0.25](https://images.unsplash.com/photo-1631727498371-dcbbd6d5b2fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080)

<div style="position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:0 80px;">
  <div style="font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:3.6rem; color:#fff; line-height:1; letter-spacing:-0.04em;">Danke.</div>
  <div style="width:48px; height:3px; background:#F84B8A; border-radius:2px; margin:22px auto;"></div>
  <div style="font-size:0.85rem; color:rgba(255,255,255,0.65); font-weight:300; line-height:1.8;">
    raspb webservices UG · Am Eselsborn 4a · 55286 Sulzheim<br>
    kontakt@raspb.de · raspb.de · agentenwerk.ai
  </div>
</div>
