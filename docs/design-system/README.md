# DJ Danko — Design System

> **Peak Time Techno · Hard Trance · Bogotá, CO**
> Emerging DJ. Dark room, red lights, chrome edges, 140+ BPM.

This is the brand and design system for **DJ Danko**, an emerging techno DJ from Bogotá, Colombia. The system supports the production of his marketing website (primary language **Spanish**, prepared for **English** via i18n) and any future digital surfaces — show flyers, social posts, EPK decks, merch.

---

## SOURCES & MATERIALS

These are the inputs the system was built from. Some are external links — the reader may not have access; they are recorded for traceability.

| Source | Type | Notes |
|---|---|---|
| `uploads/danko_logo.jpeg` | Brand mark | Silver/chrome **D** monogram with sharp blade-like serifs on a pure black field. The primary brand asset. |
| `uploads/danko_*.jpeg` (×8) | Performance & lifestyle photography | All shots are red/amber club-lit, motion-blurred, on Pioneer DJ gear. Two are cooler / violet-lit. |
| https://www.instagram.com/danko_d.j/ | Style reference | Aesthetic & feed reference. Not scraped — used as mood. |
| https://soundcloud.com/daniel-beltran-101291848/tracks | Music | Track library — sets the BPM/energy expectation (peak-time techno / hard trance). |
| https://martingarrix.com/ | UX reference | Big-name DJ site as a layout reference — full-bleed hero video, brutal display type, dark theme, sections for Bio/Music/Shows/Gallery/Contact. |

**Genre:** Peak Time Techno · Hard Trance
**Markets:** ES primary, EN secondary

---

## CONTENT FUNDAMENTALS

The brand voice is **confident, lean, and physical**. It speaks like a flyer — short, declarative, all-caps, present tense. It does not explain itself.

### Tone
- **Direct & physical.** "Pista llena." not "El público estuvo muy receptivo."
- **Confident, never apologetic.** No "creo que", no "tal vez". Statements only.
- **Genre-coded.** Borrows the vocabulary of techno culture: *set, drop, BPM, b2b, peak time, warehouse, underground, rave, line-up.*
- **Bilingual but never translated literally.** Spanish first; English version rewrites for impact, doesn't translate word-for-word.

### Casing
- **ALL CAPS** for hero/display, section starters, button labels, navigation, dates, venue names.
- **Sentence case** for body copy.
- **lowercase** is occasionally used as a stylistic flex on social posts ("peak time. bogotá. ahora.") — never in long copy.

### Person
- Mostly **third-person** ("Danko mezcla…") on the website / bios — feels like a press kit.
- **First-person** ("Mezclo techno desde…") only on the bio page when telling origin story.
- Never "tú/you" lectures. The audience is invited, not instructed.

### Emoji & Symbols
- **No emoji.** Ever. Emoji breaks the aesthetic.
- **Unicode symbols allowed sparingly:** `·` (middle dot as separator), `→` (arrow), `/` (slash), `—` (em dash), `×` (multiply, e.g. *Danko × Brandon*).
- Tracklists, dates and BPM are written in **mono**: `01 — 142 BPM — TRACK ID`.

### Vibe
The voice is the voice of a flyer pasted to a warehouse door: short, dark, urgent. It assumes you already know what techno is.

### Examples

> ✅ **"PEAK TIME TECHNO DESDE BOGOTÁ."** *(hero)*
> ✅ **"PRÓXIMA FECHA · 14 JUN · CLUB UNDERGROUND BOGOTÁ"** *(shows list)*
> ✅ **"Set de 2 horas. Pioneer CDJ-3000. 140 BPM en adelante."** *(bio fragment)*
> ✅ **"Danko × Brandon — b2b en Radio Berlin."** *(gallery caption)*
> ❌ "¡Bienvenidos a mi página! 🎧🔥 Soy un DJ apasionado…" — too soft, emoji, exclamation
> ❌ "Ven y disfruta de una noche inolvidable" — generic event-promoter copy
> ❌ "Click here to listen to my music" — instructive / weak

---

## VISUAL FOUNDATIONS

The aesthetic is **industrial, nocturnal, and high-contrast**. Black canvas, red heat, chrome edges. Nothing soft. Nothing rounded. Nothing decorative-for-decoration's-sake.

### Colors

- **Canvas is always near-black.** `--ink-050` (#0a0a0c) is the page background; `--ink-000` (#000) is reserved for hero / void moments. White full-bleed pages are forbidden.
- **Signature color: Electric Blue.** `--accent` (#2F7BFF) is the default accent — buttons, links, glows, scrollbar, borders, highlights, the timeline spine, the next-event markers. The palette is inspired by Optimus Prime / lightsaber blues: power, precision, presence.
- **Theme system.** The accent is swappable via `[data-theme]` on `<html>` across six palettes — **Electric Blue** (default), **Neon Cyan**, **Deep Purple**, **Techno Red**, **Acid Green**, **Dark Gold**. Every accent surface reads `--accent`, `--accent-hover`, `--accent-press`, `--accent-100`, `--accent-rgb` (the rgb triplet for `rgba()` glows). A theme switcher in the website persists the choice to `localStorage` (`danko-theme`).
- **Steel/chrome** is the secondary "color" — used as a gradient on the logo and on metallic ribbon dividers. Never flat steel; always a vertical gradient `--steel-gradient`.
- **Avoid:** flat SaaS gradients, pastels, beige. Imagery stays warm/red-lit (the photos) against the cool blue UI — the contrast is intentional.

### Type

Three-font system. See `colors_and_type.css`.

- **Display:** Anton — condensed, all-caps, brutal. Used at 72–220px for the hero name and section starters. *Substitute for a custom display face.*
- **Heading:** Oswald — narrower than Inter, supports the display feel at smaller H2/H3 sizes.
- **Body:** Inter — handles ES + EN paragraph copy reliably. Diacritics are correct.
- **Mono:** JetBrains Mono — used for **BPM**, **timestamps**, **track IDs**, **dates** in lists. Mono signals "data" and reinforces the technical/equipment-coded brand.

> ⚠️ **FONT SUBSTITUTION** — No custom logotype font was provided. Anton (Google Fonts) is the closest free match for the brutal-condensed display aesthetic of the existing logo. **Please send the typeface used in the chrome logo** (or the .ttf/.otf of any commissioned face) and we will swap it in.

### Spacing

8-px base scale (`--s-2` = 8px). Large slabs of negative space are core to the look — the website breathes. Section padding on desktop is `--s-9` to `--s-10` (96–128px) top & bottom. Inside cards, padding is generous: never less than `--s-5` (24px).

### Backgrounds

- **Default:** flat near-black `--ink-050`.
- **Hero sections:** full-bleed photo, dimmed with a black 50–70% overlay so type stays legible. Photos are always the warm red-lit performance shots.
- **Glow halos:** the hero name has a faint accent radial glow behind it (`radial-gradient(ellipse, rgba(var(--accent-rgb),.35), transparent 60%)`).
- **Grain / noise:** a very subtle film-grain texture (4% opacity) can sit on top of large flat areas to break up the digital flatness.
- **No gradients as decorative fills.** No mesh gradients. No SaaS bluish-purple.

### Animation

- **Snappy, on-beat, no bounce.** All transitions 120–400ms. Easing is `--ease-snap` (steep ease-out).
- **Entry:** elements fade up with a small Y translation (`translateY(12px) → 0`, opacity 0 → 1, 400ms).
- **Hover on cards:** image scales `1.0 → 1.04` over 400ms with a subtle red vignette.
- **No looping background animations** except in two places: (1) the hero glow gently pulses (4s sine, opacity .8 ↔ 1.0) and (2) the BPM counter on the bio page ticks.
- **No parallax** beyond a very subtle 1.05× background photo translation on scroll.

### Hover states

- **Buttons (primary):** background goes from `--accent` → `--accent-hover` (darker red), and the shadow gains a red glow ring.
- **Buttons (ghost/outline):** border stays, background fills with `--accent` and text inverts to white.
- **Links:** underline appears (1px, `--accent`), color shifts to red.
- **Cards (gallery / shows):** image scales 1.04, a faint red 1px border appears on the bottom edge, caption slides up.

### Press states

- **Buttons:** translateY(1px) + slightly darker bg (`--accent-press`), no shrink/scale. The press feels like a button on a Pioneer CDJ — definite click, no give.

### Borders

- **1px hairline** in `--border` (#2a2a31) is the default divider.
- **2px** in `--accent` (red) is used for active tabs, focus rings, and to wrap the "NEXT SHOW" feature card.
- **Chamfered corners (4–8px cuts at corners)** are used on a few key surfaces (the "tickets" button, the show date chips) to evoke flightcase / rack-mount hardware. Not on everything — used as punctuation.

### Shadows

- **No soft drop shadows.** The system uses two shadow types only:
  - **Black depth shadow** for cards: `--shadow-card` — sharp, dark, evokes spotlights.
  - **Red neon glow** for primary CTAs and the brand mark: `--shadow-red` / `--shadow-red-strong`. Always centered, never offset.
- **Inset steel highlight** on metallic elements: `--shadow-steel` — 1px white inset top, 1px black inset bottom.

### Protection gradients

Photo hero sections use a bottom-up dark protection gradient (`linear-gradient(180deg, transparent 30%, rgba(0,0,0,.85) 100%)`) so text laid over photos stays legible. Capsules / pill backgrounds behind text on imagery are reserved for tiny eyebrow labels — text bodies use gradients.

### Layout rules

- **Fixed top nav** on the website — slim (56px), pure black with a 1px bottom hairline that turns red on scroll past hero.
- **No sidebars.** Single column, full-bleed.
- **Asymmetric, broken grids** are encouraged in the gallery and shows sections — feels less corporate, more flyer.
- **Numbered section markers** (01 BIO, 02 MUSIC, 03 SHOWS, 04 GALLERY, 05 CONTACT) anchor the long scroll.

### Transparency & blur

- **Backdrop blur** is used on the **fixed top nav** when the user scrolls past the hero (`backdrop-filter: blur(16px) saturate(140%)`, bg `rgba(10,10,12,.7)`).
- **Otherwise no blur.** Solid surfaces are the rule.

### Imagery vibe

- **Warm red, motion-blurred, low-light, club photography.** Every photo in the system has the same DNA: heavy red wash, smoke, Pioneer DJ gear, shallow DOF. A couple of cooler violet-lit shots provide variation.
- **No stock photography.** No B&W. No "studio portrait on white".
- **Photos can bleed off the canvas.** Trim aggressively — half-frames, tight crops.

### Corner radii

- **`--r-0` (0px)** is the default. Hard rectangles everywhere.
- **`--r-md` (4px)** on small inputs and tags only.
- **`--r-pill`** for genre / date chips.
- **No `border-radius: 50%`** circles for avatars or imagery — keep it square or chamfered.

### Cards

A "card" in this system is a **hard-edged rectangle on `--bg-card` (#1a1a1f)** with a 1px `--border` outline and `--shadow-card`. Hover lifts the photo (scale) and tints the bottom edge red. No rounded corners. No glassmorphism.

---

## ICONOGRAPHY

The system uses **Lucide Icons** (loaded from CDN) as its primary icon library. Lucide's clean 1.5px stroke, hard joins, and minimal visual weight match the industrial aesthetic without competing with the heavy type. Stroke weight matches Oswald's regular weight.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="play" class="icon"></i>
<script>lucide.createIcons();</script>
```

Common icons used across the site:
- `play`, `pause` — player controls
- `instagram`, `youtube` — social
- `arrow-up-right` — outgoing links (Beatport, SoundCloud, tickets)
- `calendar`, `map-pin`, `clock` — show metadata
- `volume-2`, `mic` — audio
- `chevron-right`, `chevron-down` — navigation
- `mail` — contact / booking

### Rules

- **Stroke weight:** Lucide default (1.5–2px). Never filled.
- **Color:** inherits from `currentColor` — `--fg-muted` by default, `--accent` on hover, `--fg` when active.
- **Size:** 16/20/24/32 — match adjacent text x-height for inline icons.
- **No emoji** anywhere in the product. Emoji is hard-banned.
- **No unicode symbol icons** (e.g. ★ for favorite) — always use Lucide.

### Brand mark

The only "branded" icon is the chrome **D monogram** (`assets/logo/danko_logo.jpeg`). It is treated like a hallmark — appears in the nav bar (24px), as a watermark at the bottom of email signatures (32px), and full-bleed on the hero (animated glow, 200–400px). We have a **JPEG only** — no vector. **Action:** request an SVG/PNG-with-alpha of the logo so it can sit on non-black backgrounds.

> ⚠️ **ICON SUBSTITUTION** — No icon set was provided by the brand. Lucide is the closest match for the stripped-back, technical mood. Open to swapping to a custom set or to Phosphor (Duotone / Bold) if the user prefers more weight.

---

## INDEX (manifest of this design system)

Root files:

| File | What's in it |
|---|---|
| `README.md` | This file. Brand context, voice, visual rules, iconography. |
| `SKILL.md` | Agent-skill entry point — read this when you start a new design session. |
| `colors_and_type.css` | All CSS vars: colors (raw + semantic), type families & scale, spacing, radii, shadows, motion. |
| `assets/logo/` | Brand mark (chrome D monogram). |
| `assets/photos/` | Curated performance photography. All red-lit club shots — use freely. |
| `preview/` | Small HTML cards that populate the Design System tab (Type, Colors, Spacing, Components, Brand). |
| `ui_kits/website/` | Hi-fi recreation of the DJ Danko marketing website (the primary product). See its own README. |

UI kits available:

- **`ui_kits/website/`** — The marketing site. Sections: Bio · Music · Shows · Gallery · Contact. Hero + nav + show list + gallery + footer recreated as JSX components.

---

## OPEN QUESTIONS / ASKS FOR THE USER

1. **Logo file.** Send a **vector (SVG)** or transparent **PNG** version of the chrome D monogram. The JPEG forces us to keep a black background everywhere the logo appears.
2. **Type.** Confirm whether the chrome wordmark uses a known typeface or is custom-drawn. Anton is the placeholder display face.
3. **Music embeds.** Confirm the preferred player — SoundCloud (link is in sources) or Beatport? Affects the Music section UI.
4. **Show data.** Send 2–3 upcoming gigs (date, venue, city, ticket URL) so the Shows section can render real content instead of placeholders.
5. **Press shots.** Studio / portrait shots (if any) to balance the all-performance imagery.
