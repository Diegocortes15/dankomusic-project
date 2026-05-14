# Danko — Website

Bilingual (ES/EN) website for DJ Danko — Peak Time Techno · Bogotá.

## Stack

- Next.js 15 (App Router) + TypeScript strict
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- next-intl v4 — locales: `es` (default), `en`
- framer-motion
- Vitest + React Testing Library · Playwright

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

Note: `test:e2e` uses `next build && next start` rather than `next dev` because Next 15.5 + React 19 cold-compilation under Playwright's parallel requests produces flaky React Client Manifest errors on the dev server. The trade-off is an ~80s build before the suite runs.

## Edit content

All content lives in `src/content/` and `src/i18n/messages/`:

| File | What |
|------|------|
| `src/content/releases.ts` | Upcoming releases. Section auto-hides when empty. |
| `src/content/shows.ts` | Shows. Auto-split into upcoming/past by date. |
| `src/content/sets.ts` | SoundCloud sets. First entry is the featured set. |
| `src/content/util.ts` | `toLocalIsoDate` — local-timezone date helper used by filters. |
| `src/i18n/messages/es.json` | Spanish UI strings + bio. |
| `src/i18n/messages/en.json` | English UI strings + bio. |

Proper names (venues, set titles, track names) are not translated — they live in the data files and appear verbatim in both locales.

## Replace before launch

- `BOOKING_EMAIL` constant in `src/components/sections/Contact.tsx` — set to the real booking address.
- `NEXT_PUBLIC_SITE_URL` env var — set to the production domain (used by `sitemap.xml`, `robots.txt`, JSON-LD, and `metadataBase` for OG images).

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
    [locale]/         # bilingual routes
      layout.tsx      # locale shell, fonts, metadata, JSON-LD
      page.tsx        # single-page composition of all sections
      not-found.tsx
    layout.tsx        # root passthrough
    not-found.tsx     # root 404 (paths without a locale prefix)
    sitemap.ts        # /sitemap.xml
    robots.ts         # /robots.txt
    globals.css       # Tailwind v4 + design tokens
  components/
    nav/              # top nav + locale switcher
    sections/         # one component per page section
    ui/               # Reveal, SoundCloudEmbed, ReleaseCard, ShowItem
  content/            # editable data + types
  i18n/               # next-intl routing, request, messages
  lib/                # fonts, motion variants, seo helpers
  middleware.ts       # next-intl locale routing
public/assets/        # brand photography
tests/
  unit/               # Vitest specs
  e2e/                # Playwright specs
```
