# DJ Danko — Website Design Spec

**Date:** 2026-05-13
**Status:** Draft (awaiting user review)

## Overview

Bilingual personal/professional website for DJ Danko, an emerging Peak Time Techno / Hard Trance artist from Bogotá, Colombia. Spanish is the default locale; English is supported for international reach. The site serves three coequal goals: artistic identity, audience growth, and international bookings.

## Goals

- Establish a premium visual identity aligned with Danko's metallic/industrial logo and dark techno positioning.
- Surface SoundCloud sets and upcoming releases for fans and streaming growth.
- Provide promoters and agencies a fast path to bio, performance history, and booking contact.
- Be discoverable internationally via SEO in both Spanish and English markets.

## Non-goals

- E-commerce / merch shop.
- User accounts or authentication.
- Blog / news section.
- CMS or admin panel. Content is edited via TypeScript files and PR workflow.
- Custom audio player. SoundCloud embeds are used.

## Information architecture

Single page per locale at `/es` (default; `/` redirects to `/es`) and `/en`. Scroll navigation with anchor links.

**Section order:**

1. **Hero** — logo + name + positioning phrase ("Peak Time Techno · Bogotá") + primary CTA (Listen) + secondary CTA (Booking).
2. **About / Bio** — short bio visible; "read more" expands long bio. Impact phrase + 2-3 key data points (years active, genres, notable cities).
3. **Music** — featured SoundCloud set (large embed) + grid of 3-6 additional sets/tracks.
4. **Upcoming Releases / Próximos lanzamientos** — release cards with artwork, title, label, release date, pre-save links. Section and its nav entry hidden entirely when no upcoming releases exist.
5. **Shows** — upcoming dates + selected past venues for credibility.
6. **Gallery** — photo mosaic/carousel from `/assets`.
7. **Contact / Booking** — booking email surfaced as a prominent `mailto:` button + social links (Instagram, SoundCloud). A real form is deferred (see Decisions deferred).

**Navigation:** fixed top bar, minimal. Logo left; anchor links center (Bio · Music · Releases · Shows · Gallery · Contact, with Releases conditionally hidden); locale switcher (ES / EN) right.

**Footer:** brief — copyright, repeated social links, direct email.

**Translation policy:** proper names (set titles, venue names, track titles, event names) are not translated. Only UI strings and bio prose are translated.

## Visual direction

### Palette (metallic only, no hot color)

| Token | Hex | Usage |
|-------|-----|-------|
| `base` | `#050505` | Page background |
| `surface` | `#0E0E10` | Cards, separators |
| `text` | `#F4F4F2` | Primary text |
| `text-muted` | `#7A7A7A` | Secondary text |
| `silver` | `#C8CACC` | Logo metallic, accents |
| `steel` | `#5A5C60` | Borders, icon strokes |

Active states and hovers are resolved through luminosity and typographic weight, never color.

### Typography

- **Display:** Neue Machina (primary) or PP Neue Montreal (fallback). Condensed/industrial character that mirrors the logo's angularity. Hero H1 96-160px desktop; aggressive scale contrast across the page.
- **Body:** Inter (primary) or Geist Sans (fallback). 16-18px, well-optimized for ES/EN multilingual rendering.
- Self-hosted via `next/font` (no external runtime requests).

### Photography treatment

- High contrast, deep shadows, highlights preserved.
- Desaturated tendency (not full monochrome; preserve club reds/blues that already exist in `/assets`).
- Cinematic crops: 16:9 or 21:9 in hero; 4:5 in gallery.
- Optional subtle film grain in hero only.

### Motion language

- Restrained but present. No bouncy springs (would clash with the genre).
- Text entrance: split-text reveal per word, 240-360ms, easing `cubic-bezier(0.65, 0, 0.35, 1)`.
- Images: parallax + subtle scale (max 1.05) on scroll.
- Hover: scale 1.02 + soft white glow.
- Locale/page transitions: 180-240ms, snappy.
- `prefers-reduced-motion` strictly respected: disables parallax, reveals, hover-scale; retains short fades only.

## Technical architecture

### Stack

- **Next.js 15** with App Router; React Server Components where applicable.
- **TypeScript** in strict mode.
- **Tailwind CSS v4** with custom design tokens for the metallic palette.
- **next-intl** for internationalization.
- **framer-motion** for animations (already installed).
- **next/image** for image optimization (AVIF/WebP).
- **next/font** for self-hosted typography.

### Folder structure

```
src/
  app/
    [locale]/
      layout.tsx          // shell, nav, footer, locale provider
      page.tsx            // home (the only real page)
      not-found.tsx
    globals.css
  components/
    sections/             // one component per scroll section
      Hero.tsx
      About.tsx
      Music.tsx
      Releases.tsx
      Shows.tsx
      Gallery.tsx
      Contact.tsx
    nav/
      Nav.tsx
      LocaleSwitcher.tsx
    ui/                   // reusable building blocks
      SoundCloudEmbed.tsx
      ReleaseCard.tsx
      ShowItem.tsx
  content/                // editable data without touching component code
    releases.ts
    shows.ts
    sets.ts
  i18n/
    messages/
      es.json
      en.json
    routing.ts
    request.ts
  lib/
    fonts.ts
    motion.ts             // shared framer-motion variants
public/
  assets/                 // optimized photos (moved from current /assets)
```

### Internationalization (next-intl)

- Routes: `/es/...` default (`/` redirects to `/es`), `/en/...`.
- Messages live in `src/i18n/messages/{locale}.json`, keyed by section (e.g., `hero.title`, `about.shortBio`, `cta.bookNow`).
- First-visit locale detection via `Accept-Language` header; manual selection persisted in a cookie.
- SEO: `hreflang` tags between locales; per-locale Open Graph metadata.

### Content model

- `content/releases.ts` — array of `{ id, title, label?, releaseDate (ISO), artwork, links: { spotify?, beatport?, apple? } }`. The Releases section filters to entries with `releaseDate >= today`. If the filtered array is empty, the section and its nav entry are both unmounted.
- `content/shows.ts` — array of `{ id, date (ISO), venue, city, country, eventName?, ticketUrl? }`. Split automatically into `upcoming` (date >= today) and `past`.
- `content/sets.ts` — array of `{ soundcloudId, title, description? }`. The first entry is treated as the featured set; the rest populate the grid.
- Bio prose and all UI strings live in `i18n/messages/*.json`.

### Deployment

- Vercel (free tier sufficient).
- Custom domain via CNAME (deferred decision).
- SSL automatic.
- Edge runtime for fast international responses.

### Performance targets

- Lighthouse mobile score 95+.
- LCP < 2s on 4G.
- Images served as AVIF/WebP via `next/image`.

## SEO

- Per-locale `<title>` and meta description.
- Open Graph + Twitter cards with cinematic Danko photo + tagline.
- JSON-LD `MusicGroup` and `Person` schema with genres, city, and social links (drives Knowledge Panel eligibility).
- `hreflang` tags between `/es` and `/en` (handled by next-intl).
- Generated `sitemap.xml` and `robots.txt`.
- Descriptive `alt` text on every image, translated per locale.

## Accessibility

- WCAG AA target; AAA where free.
- Verified contrast: `#F4F4F2` on `#050505` = AAA. Secondary `#7A7A7A` usage audited for minimum size.
- Focus ring: silver outline, non-removable, visible on all interactive elements.
- `prefers-reduced-motion` disables parallax, split-text reveals, and hover-scale; retains sub-100ms fades.
- Full keyboard navigation including nav anchors and locale switcher.
- Locale switcher exposes an explicit `aria-label`.

## Error handling

- `/es/not-found` and `/en/not-found` pages with a link back to the home of the current locale.
- SoundCloud embed failure → placeholder card with a direct link to `soundcloud.com/daniel-beltran-101291848`.
- Image load failure → element hidden (no broken-image icon).
- Contact: launch uses `mailto:` only — no form, no validation, no anti-spam needed. If a real form is added later (see Decisions deferred), it will require client + server validation, success/error UI, and honeypot anti-spam (no visible captcha, to preserve the aesthetic).

## Testing strategy

- **Component (Vitest + React Testing Library):** only logic-bearing components — release filter by date, shows divider into upcoming/past, locale switcher behavior. No tests for purely presentational components.
- **E2E (Playwright):** two critical paths — (a) full nav scroll in `/es`, (b) locale switch `/es → /en` preserves the section anchor.
- **Manual/visual:** Chrome, Safari, iOS Safari, Android Chrome verified pre-deploy. Lighthouse run in CI.
- Not tested: SoundCloud embed wrapper, framer-motion animation behavior — adapters and visuals respectively.

## Decisions deferred to implementation

- Hero composition: static photo vs. muted looping video vs. typography-led composition.
- Number of featured sets in the Music section (3-6 depending on Danko's preference).
- Contact form mechanism: `mailto:` link initially; server-action form if/when needed.

## Content prerequisites (must exist before launch)

- Short bio in ES and EN (~80-120 words each).
- Long bio in ES and EN (~300-450 words each).
- SoundCloud track IDs for the featured set + grid sets.
- Past venues list with city, country, date.
- Upcoming dates (optional at launch).
- Upcoming release info (optional — section hides if absent).
- Booking email address.
- One high-resolution cinematic press photo for the hero.

## Open questions (non-blocking)

- Final domain name (deferred by user).
- Whether the contact form should integrate with an email service (Resend, Postmark) or stay as `mailto:` initially.
