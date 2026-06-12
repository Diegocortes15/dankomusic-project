# Dankø — Website

Bilingual (ES/EN) marketing site for DJ **Dankø** — Peak Time Techno · Bogotá.

## Stack

- **Next.js 15** (App Router) + TypeScript strict
- **Tailwind CSS v4** for layout utilities; brand styles live as semantic CSS in `src/app/globals.css`
- **next-intl v4** — locales: `es` (default), `en`
- **Anton / Oswald / Inter / JetBrains Mono** via `next/font/google`
- Custom motion only: CSS animations, IntersectionObserver-based `Reveal`, rAF parallax + cursor spotlight, no `framer-motion` runtime
- **6-theme accent switcher** (Electric Blue default + Cyan / Purple / Red / Green / Gold), persisted in localStorage, recoloured live across the page and the SoundCloud embed
- **Vitest + React Testing Library** for unit tests · **Playwright** for E2E

## Develop

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /es)
```

Routes: `/es` (default; `/` redirects here), `/en`.

If `next dev` fails to bind port 3000 with *"Port in use"*, there's a stale
node process from a previous session. Kill it with:

```powershell
Get-Process node | Stop-Process -Force
```

## Test

```bash
npm test           # unit (Vitest)
npm run test:e2e   # E2E (Playwright) — runs against a production build
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint flat config
```

`test:e2e` runs against `next build && next start` (not `next dev`) because
Next 15.5 + React 19 cold compilation under Playwright's parallel requests
occasionally trips a React Client Manifest error.

## Edit content

Everything that anyone might want to update without touching component code
lives in `src/config/` and `src/i18n/messages/`:

| File | What |
|------|------|
| `src/config/site.ts` | WhatsApp, email, Instagram, SoundCloud + `waLink` / `mapsLink` / `mailto` builders |
| `src/config/events.ts` | Timeline events — append entries here, status auto-computed against today, `featured: true` marks the hero strip event |
| `src/config/venues.ts` | Venue catalogue with addresses (rendered into Google Maps links) |
| `src/config/gallery.ts` | Photo mosaic — `span: "wide" \| "tall"` for asymmetric tiles |
| `src/config/themes.ts` | The 6 accent themes (id, label, swatch) |
| `src/config/slogans.ts` | Hero slogan, alt slogans, genre chips, stat cards, residency callout |
| `src/i18n/messages/{es,en}.json` | All UI strings, bio prose, lede paragraphs |

Proper names (venues, set titles, residency) stay in flyer voice in the data
files and appear verbatim in both locales.

## Replace before / after launch

- `NEXT_PUBLIC_SITE_URL` env var in Vercel — the production domain. Drives
  `sitemap.xml`, `robots.txt`, JSON-LD, and `metadataBase` so the OG image
  URL is absolute.
- Vercel Deployment Protection — disable for production in Settings →
  Deployment Protection if the site needs to be reachable without auth.

## Deploy

Vercel:

1. Push to GitHub.
2. Import the repo in Vercel (framework preset is detected as Next.js).
3. Settings → Environment Variables → add
   `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`.
4. Deploy. Vercel issues SSL automatically. CNAME the apex / `www` once the
   domain is connected.

## Project structure

```
src/
  app/
    [locale]/
      layout.tsx        # locale shell, fonts, metadata, JSON-LD, BackgroundFX, preloader
      page.tsx          # composition: Nav → Hero → Bio → Shows → Gallery → SoundCloud → Contact → Footer
      not-found.tsx
    layout.tsx          # root passthrough
    not-found.tsx       # root 404 for paths without a locale prefix
    page.tsx            # / → defensive redirect to /es (middleware also does this)
    sitemap.ts          # /sitemap.xml
    robots.ts           # /robots.txt
    globals.css         # tokens, 6 theme palettes, all section styles, preloader, lightbox
  components/
    nav/                # Nav + LocaleSwitcher + ThemeSwitcher
    fx/                 # BackgroundFX (drift + cursor + grain) + LoaderDismiss
    sections/           # Hero · Bio · Shows · Gallery · SoundCloud · Contact · Footer
    ui/                 # Reveal · Icon · Button · SectionStarter · Eyebrow · Lightbox
  config/               # editable data (see "Edit content" above)
  i18n/                 # next-intl routing, request, message catalogues
  lib/                  # fonts (next/font), seo (JSON-LD), useParallax, theme-state
  middleware.ts         # next-intl locale routing
public/assets/          # brand photography (logo + 8 performance shots)
tests/
  unit/                 # Vitest specs (events partition, locale switcher)
  e2e/                  # Playwright specs (navigation, locale switch)
```
