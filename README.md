# Dankø — Website

Bilingual (ES/EN) website for DJ Dankø — Peak Time Techno · Hard Trance · Bogotá.

## Stack

- **Next.js 15** (App Router) + TypeScript strict
- **Tailwind CSS v4** for layout utilities; brand styles live as semantic CSS in `src/app/globals.css`
- **next-intl v4** — locales: `es` (default), `en`
- **Anton / Oswald / Inter / JetBrains Mono** via `next/font/google`
- Custom motion: CSS animations, IntersectionObserver-based `Reveal`, rAF-based parallax & cursor spotlight (no framer-motion runtime)
- **Vitest + React Testing Library** for units · **Playwright** for E2E

## Develop

```bash
npm install
npm run dev          # http://localhost:3000 (redirects to /es)
```

Routes: `/es` (default — `/` redirects here when the browser prefers Spanish), `/en`.

## Test

```bash
npm test             # unit (Vitest)
npm run test:e2e     # E2E (Playwright) — runs against a production build
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint flat config
```

`test:e2e` runs against `next build && next start` rather than `next dev` because Next 15.5 + React 19 cold-compilation under Playwright's parallel requests produces flaky React Client Manifest errors on the dev server. The trade-off is an ~80s build before the suite runs.

## Edit content

All content lives in `src/content/` and `src/i18n/messages/`:

| File | What |
|------|------|
| `src/content/sets.ts` | SoundCloud track list. First entry is the featured card; the rest fill the grid. Includes profile URL constant. |
| `src/content/shows.ts` | `upcomingShows` and `pastShows`. Each entry has `day`, `mon`, `venue`, `city`, `meta`, `status` (`tickets` / `soldout` / `tba`), optional `ticketUrl`. |
| `src/content/releases.ts` | Upcoming releases. **Section + nav entry auto-hide when this array is empty.** |
| `src/content/gallery.ts` | Photo mosaic. Supports `span: "wide" \| "tall"` for asymmetric tiles. |
| `src/content/util.ts` | `toLocalIsoDate`, `formatTrackDate`, `formatLongDate` helpers. |
| `src/i18n/messages/es.json` | Spanish UI strings + bio. |
| `src/i18n/messages/en.json` | English UI strings + bio. |

Proper names (venues, set titles, track names) are **not** translated — they live in the data files in their flyer-voice form and appear verbatim in both locales.

## Replace before launch

- `BOOKING_EMAIL` constant in `src/components/sections/Contact.tsx` (currently `bookings@danko.dj`) — set to the real booking inbox.
- `NEXT_PUBLIC_SITE_URL` env var — set to the production domain. Used by `sitemap.xml`, `robots.txt`, JSON-LD, and `metadataBase` for OG image absolutising.
- Upcoming `shows` data — the in-tree entries from Jun-Oct are placeholders inherited from the design kit. Replace with confirmed bookings before public launch.
- `tracks` plays/likes — refreshed at design time. Treat as cosmetic; refresh occasionally from SoundCloud.

## Deploy

Vercel:

1. Push to GitHub/GitLab.
2. Import the repo in Vercel.
3. Set the env var `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`.
4. Deploy. SSL is automatic; CNAME the apex/`www` to Vercel when the domain is decided.

## Project structure

```
src/
  app/
    [locale]/                # bilingual routes
      layout.tsx             # locale shell, fonts, metadata, JSON-LD, BackgroundFX
      page.tsx               # single-page composition of all sections
      not-found.tsx
    layout.tsx               # root passthrough
    not-found.tsx            # root 404 (paths without a locale prefix)
    sitemap.ts               # /sitemap.xml
    robots.ts                # /robots.txt
    globals.css              # Tailwind + design tokens + all section styles
  components/
    nav/                     # Nav + LocaleSwitcher
    fx/                      # BackgroundFX (drift + cursor + grain)
    sections/                # Hero, Bio, Music, Releases, Shows, Gallery, Contact, Footer
    ui/                      # Reveal, Icon, Button, SectionStarter, Eyebrow
  content/                   # editable data + types
  i18n/                      # next-intl routing, request, messages
  lib/                       # fonts (next/font), seo (JSON-LD), useParallax
  middleware.ts              # next-intl locale routing
public/assets/               # brand photography
tests/
  unit/                      # Vitest specs
  e2e/                       # Playwright specs
```
