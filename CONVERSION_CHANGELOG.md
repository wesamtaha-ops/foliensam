# Conversion-Update Service-Seiten – Changelog

Stand: 16.10.2026 · nicht committed, nicht deployed

## Geänderte / neue Dateien

| Datei | Änderung |
|---|---|
| `src/data/conversion.ts` (neu) | Zentrale Konfiguration: WhatsApp-Nummer, `tel:`-Link, Google-Profil, service-spezifische WhatsApp-Texte, Leistung je Seite, Hero-Foto + Galerie (6 Fotos) je Seite, `splitIntro()` (max. 2 Sätze im Hero, Rest wird verschoben, nichts gelöscht). |
| `src/components/conversion/CtaButtons.tsx` (neu) | „Angebot per WhatsApp“ (`<a href="https://wa.me/4915750000505?text=…">`) + „Jetzt anrufen“ (`<a href="tel:+4915750000505">`); mobil gestapelt, Desktop nebeneinander. |
| `src/components/conversion/TrustLine.tsx` (neu) | „★ 5,0 bei Google · 5 Jahre Garantie · 12+ Jahre Erfahrung“, Google-Teil verlinkt (`target="_blank" rel="noopener"`), keine Bewertungsanzahl. |
| `src/components/conversion/ReferenceGallery.tsx` (neu) | 6 Projektfotos direkt nach dem Hero: mobil horizontal scrollbar, Desktop 3er-Grid, `loading="lazy"`, Alt-Texte auf Deutsch, Link „Alle Referenzen ansehen“ → `/referenzen`. |
| `src/components/ContactForm.tsx` (neu) | Gemeinsames Formular: Name*, Telefon* (`type="tel"`), E-Mail (optional), Fahrzeug, Leistung (vorausgewählt), Nachricht; deutsche Fehlermeldungen; Honeypot; Datenschutzhinweis direkt über dem Absenden-Button; WhatsApp-Foto-Hinweis; Erfolgsmeldung behält `.bg-green-50.border-green-200`; `dataLayer.push({event:'lead_form_success', …})` genau einmal nach EmailJS-Status 200. |
| `src/components/Contact.tsx` | Inline-Formular durch `ContactForm` ersetzt (Startseite + /kontakt). |
| `src/components/seo/SeoPageHero.tsx` | Neuer Conversion-Hero für Service-Seiten: H1 und Breadcrumb unverändert, Intro gekürzt, CTAs, Trust-Line, Referenzfoto (WebP, srcset 480/800/1200, `width`/`height`, `loading="eager"`, `fetchpriority="high"`), bestehende Trust-Badges darunter. Andere Seiten unverändert. |
| `src/components/seo/SeoPageLayout.tsx` | Conversion-Hero + Galerie auf den 6 Service-Seiten; restlicher Intro-Text als erster Abschnitt im Inhalt; Leistung + WhatsApp-Text an den Angebotsblock. |
| `src/components/seo/SeoCtaSidebar.tsx` | Block „Kostenloses Angebot“: Formular eingebettet, WhatsApp/Telefon/E-Mail-Buttons bleiben (E-Mail jetzt `mailto:`), nicht mehr sticky (Formular zu hoch). Link „Jetzt Angebot anfragen“ → /kontakt entfernt, weil das Formular jetzt direkt im Block sitzt. |
| `src/components/WhatsAppButton.tsx` | Desktop: Floating-Pill mit Label „WhatsApp“. Mobil: Sticky-Leiste „WhatsApp“ + „Anrufen“, erscheint, sobald die Hero-CTAs aus dem Bild gescrollt sind (Floating-Button mobil ausgeblendet). Service-spezifischer Text auf Service-Seiten, sonst generisch. |
| `src/components/Hero.tsx` | Startseite: „Angebot per WhatsApp“ primär, „Showreel ansehen“ sekundär, „Kontakt“ bleibt; Trust-Line; Überlauf-Fix (384-px-Kreis → `w-72 sm:w-96`, `grid-cols-1`, `min-w-0`). |
| `src/components/About.tsx` | Überlauf-Fix (`-inset-6`-Glow ragte rechts heraus → `overflow-hidden`). |
| `src/components/Gallery.tsx` | Überlauf-Fix: Tab-Leiste mobil kompakter. |
| `src/components/Datenschutz.tsx`, `src/components/Impressum.tsx` | Überlauf-Fix: langes H1-Wort bricht um (`break-words hyphens-auto`). |
| `src/components/TikTokProfileEmbed.tsx` | SociableKIT-Script lädt erst, wenn das Widget in die Nähe des Viewports kommt (IntersectionObserver, 300 px Vorlauf). |
| `src/index.css` | Styles für den Conversion-Hero, Formular-Card, `overflow-x: clip` als Sicherheitsnetz, Platz unter der Sticky-Leiste. |
| `src/i18n/locales/{de,en,ar,tr,ru}.json` | „946+“ → „900+“. |
| `scripts/prerender.mjs` | **Ursache des doppelten GTM und des 127.0.0.1-Links behoben** (Details unten). |
| `public/img/projekte/*.webp` (neu) | 13 echte FolienSam-Projektfotos aus der Galerie, je 480/800/1200 px WebP (insgesamt 2,4 MB, 46–60 KB pro 800-px-Datei). |
| `.claude/launch.json` (neu) | Nur lokale Vorschau (`vite preview` auf Port 4180). Kann ignoriert/gelöscht werden. |

## C1/C2: Ursache doppeltes GTM + 127.0.0.1

`index.html` hatte schon nur **ein** GTM-Snippet. Die Duplikate entstanden im Build: `prerender.mjs` hat jede Seite in Chrome geöffnet und das fertige DOM gespeichert, inklusive der `<script src="…gtm.js">`-Tags, die GTM selbst einfügt, und des CSS-Links, den das SociableKIT-Widget mit der lokalen Adresse `http://127.0.0.1:4173` einfügt. Außerdem wurde jede Unterseite aus der bereits vorgerenderten Startseite erzeugt, sodass sich das von Seite zu Seite aufsummierte. Live hatte z. B. `/vollfolierung-berlin` 2 eingebettete `gtm.js`-Tags plus das Snippet, also bis zu 3 Container-Ladevorgänge.

Fix: Jede Seite wird aus der Original-Shell gerendert; alle Drittanbieter-Requests (GTM, GA4, Ads, SociableKIT, YouTube, EmailJS) werden beim Prerender blockiert, sodass Prerender-Besuche auch nicht mehr in GA4 landen; eingefügte Tags werden vor dem Speichern entfernt. Der Build **bricht ab**, wenn eine Seite noch ein eingebettetes `gtm.js` oder `127.0.0.1`/`localhost` enthält.

## QA-Ergebnisse (lokal, `vite preview` + Headless Chrome, Drittanbieter blockiert)

| Prüfpunkt | Ergebnis |
|---|---|
| 1. WhatsApp + Anruf ohne Scrollen bei 375×812 | ✅ alle 6 Service-Seiten (Unterkante Anruf-Button bei 476–527 px) |
| 2. Kein horizontales Scrollen bei 360/375/390/430 px | ✅ alle 12 Routen, gemessen **ohne** das `overflow-x: clip`-Sicherheitsnetz |
| 3. Hero-Foto + 6 Galeriefotos | ✅ alle 6 Service-Seiten, Galerie lazy |
| 4. Formular + Datenschutzhinweis unten | ✅ alle 6 Service-Seiten, Leistung vorausgewählt |
| 5. Ein GTM-Snippet, kein 127.0.0.1/localhost | ✅ alle 12 vorgerenderten HTML-Dateien: 1 Snippet, 0 eingebettete `gtm.js`, 1 noscript-iframe, 0 lokale Adressen |
| Formular: Validierung / Honeypot / Erfolg | ✅ deutsche Fehlermeldungen; Honeypot befüllt → kein Request, keine Erfolgsmeldung; Erfolg (EmailJS gemockt) → `.bg-green-50.border-green-200` sichtbar, `lead_form_success` **genau 1×** |
| Sticky-Leiste mobil | ✅ ausgeblendet im Hero, sichtbar nach dem Scrollen, echte `wa.me`-/`tel:`-Links |
| TikTok lazy | ✅ 0 SociableKIT-Requests beim Laden, 1 nach dem Scrollen zur Galerie |
| CLS | ✅ 0 auf allen Service-Seiten (375 und 1440 px) |
| LCP | Lokal ohne Drosselung ~0,2 s (LCP-Element = Hero-Foto). **Kein** echter Lighthouse-Mobile-Wert: nach dem Deploy mit PageSpeed Insights prüfen. |
| 6. GTM Preview / Tag Assistant | ⚠️ **Nicht getestet**: muss gegen die Live- oder Preview-Domain laufen (siehe unten). |
| Canonical | ✅ jede Seite selbstreferenzierend auf `https://www.foliensam.de/…` |

## Screenshots (`qa-screenshots/`)

Mobil 375×812: `home-375.png`, `autofolierung-berlin-375.png`, `vollfolierung-berlin-375.png`, `scheibentoenung-berlin-375.png`, `lackschutzfolie-berlin-375.png`, `felgenfolierung-berlin-375.png`, `fahrzeugbeschriftung-berlin-375.png`
Desktop 1440×900: dieselben Seiten als `*-1440.png`
Extra: `sticky-bar-375.png`, `form-validation-375.png`, `form-success-375.png`

Hinweis: In den Screenshots fehlen Logo und einige externe Bilder, weil die QA externe Hosts blockiert hat; auf der echten Seite ist das nicht so.

## Offene Punkte (außerhalb des Codes / nicht von mir erledigt)

1. **„946+“ kommt live trotzdem noch**: Die Übersetzungen auf `files.foliensam.de` (Admin → Übersetzungen) überschreiben `hero.stats.projects` in allen 5 Sprachen mit „946+“. Bitte dort auf „900+ …“ ändern.
2. **EmailJS-Dashboard (D2)**: Allowed Origins auf `https://www.foliensam.de` und `https://foliensam.de` beschränken, Rate-Limit aktivieren.
3. **EmailJS-Template**: Das Formular sendet zusätzlich `phone`, `vehicle`, `service`, `page`. Das bestehende Template zeigt sie schon über `{{message}}` an (dort stehen Telefon/Fahrzeug/Leistung/Seite oben). E-Mail ist jetzt optional: falls im Template `Reply-To = {{email}}` gesetzt ist, einmal eine echte Testanfrage ohne E-Mail senden.
4. **C4 Weiterleitung**: `foliensam.de` → `www.foliensam.de` funktioniert bereits (Vercel, Status **308** = permanent; Google behandelt 308 wie 301). Falls ausdrücklich 301 gewünscht: Vercel → Settings → Domains → foliensam.de → Redirect auf 301 stellen.
5. **Fotos**: Alle 13 Galerie-Fotos zeigen Farbfolierungen. Scheibentönung, Lackschutzfolie, Felgen und Beschriftung verwenden diese Fotos mit neutralen Alt-Texten (Fahrzeug + „FolienSam Berlin“, keine falsche Leistungsangabe). Passende Fotos einfach in `public/img/projekte/` ablegen und in `src/data/conversion.ts` eintragen.
6. **Tag-Assistant-Test (QA 6)** nach dem Deploy auf jeder Service-Seite: WhatsApp-Klick, Anruf-Klick, Formular-Testanfrage.
7. **Lokaler Build**: `npm run build` findet lokal kein Puppeteer-Chrome. Entweder `npx puppeteer browsers install chrome` oder mit `PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"` bauen. Auf Vercel (Linux) läuft der bestehende `@sparticuz/chromium`-Pfad.
8. Andere Sprachen: Neue Texte (Buttons, Formular) sind Deutsch fest im Code. Bei EN/AR/TR/RU erscheint deshalb deutscher Button-Text.
