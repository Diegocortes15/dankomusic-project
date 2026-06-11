# DANKØ — Website UI Kit

Hi-fi recreation of the **DANKØ** artist website. Electric-Blue identity, dark/techno aesthetic, bilingual (ES default / EN), with a live theme switcher.

## Sections (single long-scroll page)

1. **Hero** — name (DANKØ), primary slogan, genre chips, SoundCloud + WhatsApp CTAs, featured-event banner.
2. **About / Perfil** — artist description + futuristic stat cards (Sets · BPM range · Experience).
3. **Journey / Trayectoria** — featured event (Get Tickets → WhatsApp) + interactive vertical timeline. Event status (Upcoming/Completed) is **auto-computed from today's date**; venue cards open **Google Maps** in a new tab. Includes the Drop V Booking residency statement.
4. **Gallery / Galería** — broken photo grid with an in-page **lightbox** (Esc, ←/→, swipe, click-out).
5. **SoundCloud** — primary platform, large section before the footer, embedded player + CTA.
6. **Contact / Contacto** — WhatsApp (primary), email, Instagram cards. No booking form (per brief).

Plus: fixed nav (ES/EN + theme switcher + WhatsApp CTA), themed custom scrollbar, footer.

## Theme switcher

Six accent palettes — **Electric Blue** (default), Neon Cyan, Deep Purple, Techno Red, Acid Green, Dark Gold — swapped via `[data-theme]` on `<html>`, persisted to `localStorage` (`danko-theme`). An inline `<head>` script applies the saved theme before first paint. Every accent surface (buttons, links, icons, borders, hovers, scrollbar, glows) reads `--accent*`.

## Files

| File | Purpose |
|---|---|
| `index.html` | Entry. Early theme init + React/Babel + all scripts. |
| `styles.css` | Page scaffolding, background FX, reveal system. |
| `sections.css` | Nav, hero, base section styles. |
| `redesign.css` | Electric-Blue layer: scrollbar, theme switcher, stat cards, featured event, timeline, lightbox, SoundCloud, contact cards. |
| `responsive.css` | Mobile/tablet breakpoints. |
| `i18n.js` | `t(key, lang)` ES/EN strings (plain JS). |
| `data.js` | Events, venues, slogans, contact, WhatsApp/Maps link builders, `eventStatus()` (plain JS). |
| `themes.js` | Theme list + `<ThemeSwitcher>` + persistence (Babel/JSX). |
| `ui.jsx` | Atoms: `<Button>`, `<SectionStarter>`, `<Eyebrow>`, `<Icon>`. |
| `motion.jsx` | `<BackgroundFX>`, `<Reveal>` (capture-safe scroll reveal), `useParallax`. |
| `Nav/Hero/Bio/Journey/Gallery/SoundCloud/Contact/Footer.jsx` | Sections. |
| `App.jsx` | Shell: language + active-section tracking. |

## Real data wired in

- **SoundCloud:** soundcloud.com/daniel-beltran-101291848 (embed + links)
- **WhatsApp:** +57 315 208 5980 (CTAs + ticket request with prefilled message)
- **Email:** didami1013@gmail.com · **Instagram:** @danko_d.j
- **Events/venues:** real timeline (Saint Tropez, RadioBerlin, Antisistema 225, Solarte Hostel) with Maps addresses.

## What's NOT real

The SoundCloud embed renders empty in a sandbox (loads in a real browser). The chrome **D** logo is a JPEG (black bg only) — an SVG/transparent PNG is still needed.
