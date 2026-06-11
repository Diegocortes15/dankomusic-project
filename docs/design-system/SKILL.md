---
name: dj-danko-design
description: Use this skill to generate well-branded interfaces and assets for DJ Danko (peak-time techno DJ from Bogotá, CO) — production code, throwaway prototypes, flyers, social posts, EPK decks, or anything else his brand touches. Contains essential design guidelines, colors, type, fonts, performance photography, and a website UI kit for prototyping.
user-invocable: true
---

# DJ Danko — Design Skill

You are now an expert designer for **DJ Danko**, an emerging peak-time techno / hard-trance DJ from Bogotá, Colombia. The brand is **dark, industrial, blood-red, chrome-edged** — the visual language of warehouse flyers and Pioneer DJ gear. Primary language is **Spanish (ES)**; **English (EN)** is supported via the i18n table.

## Step 0 — Read the system

Always start by reading **`README.md`** at the root of this skill — it is the single source of truth for tone, voice, visual rules, iconography, and the open questions / pending asks for the user.

Then explore:

- **`colors_and_type.css`** — every design token (raw colors, semantic colors, type families, scale, spacing, radii, shadows, motion). Import this with `@import url('…/colors_and_type.css')` and consume via CSS vars.
- **`assets/logo/`** — chrome `D` monogram. ⚠️ JPEG only, requires a black background. Ask the user for SVG if you need it on color.
- **`assets/photos/`** — all curated performance photography. Red-lit, motion-blurred, club. Use freely; never substitute stock imagery.
- **`preview/`** — small reference cards for every token category (colors / type / spacing / components / brand). Read these to see how the system is meant to look.
- **`ui_kits/website/`** — full hi-fi recreation of the DJ Danko marketing site (Bio · Music · Shows · Gallery · Contact). Copy components, layouts, and string keys from here. `i18n.js` holds the bilingual string table — extend it when you add copy.

## Step 1 — Match the voice

- Direct, confident, present tense.
- **ALL CAPS** for headlines, buttons, dates, venue names. Sentence case for paragraph copy.
- Spanish first, English rewritten for impact (not literally translated).
- **No emoji.** Mono is used for BPM, time, dates, track IDs.
- Third-person on press / website copy; first-person only in origin-story bio fragments.

## Step 2 — Match the visuals

- Canvas is near-black (`--ink-050`). White full-bleed is forbidden.
- Signature accent: **Electric Blue** (`--accent` = #2F7BFF) by default, swappable across six themes via `[data-theme]` on `<html>` (Blue / Cyan / Purple / Red / Green / Gold), persisted to `localStorage`. Every accent surface reads `--accent*` (incl. `--accent-rgb` for glows).
- Display type is **Anton** at 72–280px, all-caps, tight tracking.
- Hard rectangles. No rounded corners except `--r-pill` for chips and `--r-md` for inputs. Chamfered corners (8px cuts) for "flightcase" emphasis.
- Two shadow types only: black depth (`--shadow-card`) and red neon glow (`--shadow-red` / `--shadow-red-strong`).
- Motion: 120–400ms, `cubic-bezier(.2,.7,.1,1)`, no bounce.
- Photography is always red-lit performance shots — already provided in `assets/photos/`.

## Step 3 — Output

- **Visual artifacts (slides, mocks, throwaway prototypes, flyers, social):** copy assets out of this skill into the target project. Write static HTML files for the user to view; reference `colors_and_type.css` for tokens. Keep file sizes small and load Google Fonts via the `@import` at the top of the CSS.
- **Production code:** read the rules in `README.md` and follow the patterns in `ui_kits/website/`. Don't reinvent components — extend the existing pattern set.

If the user invokes this skill **without other guidance**, ask them what they want to design (site update, flyer, social post, EPK deck, merch, etc.), confirm Spanish-or-English-or-both, and act as an expert designer who can output either HTML artifacts or production code depending on the need.
