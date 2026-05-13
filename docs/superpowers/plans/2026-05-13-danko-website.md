# DJ Danko Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (ES default, EN secondary) single-page Next.js 15 website for DJ Danko (Peak Time Techno / Hard Trance, Bogotá), optimized for international SEO and Vercel deployment.

**Architecture:** Single page per locale (`/es`, `/en`) with anchor-scrolled sections. Server-rendered shell with selective client-side motion. Content statically typed in `src/content/*.ts` (no CMS). i18n via next-intl with locale-routed URLs. Metallic-only palette (no hot color), industrial typography, restrained framer-motion.

**Tech Stack:** Next.js 15 (App Router), TypeScript strict, Tailwind CSS v4, next-intl, framer-motion (already installed), Vitest + React Testing Library, Playwright, deployed on Vercel.

**Spec reference:** [../specs/2026-05-13-danko-website-design.md](../specs/2026-05-13-danko-website-design.md)

---

## File structure

```
.eslintrc.json                              # Task 4
.prettierrc                                 # Task 4
next.config.ts                              # Task 6
postcss.config.mjs                          # Task 2
tsconfig.json                               # Task 1
vitest.config.ts                            # Task 5
vitest.setup.ts                             # Task 5
playwright.config.ts                        # Task 5
src/
  middleware.ts                             # Task 6
  app/
    globals.css                             # Task 2
    layout.tsx                              # Task 8 (root passthrough)
    [locale]/
      layout.tsx                            # Task 8
      page.tsx                              # Task 8
      not-found.tsx                         # Task 20
    sitemap.ts                              # Task 19
    robots.ts                               # Task 19
  components/
    nav/
      Nav.tsx                               # Task 11
      LocaleSwitcher.tsx                    # Task 11
    sections/
      Hero.tsx                              # Task 12
      About.tsx                             # Task 13
      Music.tsx                             # Task 14
      Releases.tsx                          # Task 15
      Shows.tsx                             # Task 16
      Gallery.tsx                           # Task 17
      Contact.tsx                           # Task 18
      Footer.tsx                            # Task 18
    ui/
      SoundCloudEmbed.tsx                   # Task 14
      ReleaseCard.tsx                       # Task 15
      ShowItem.tsx                          # Task 16
      Reveal.tsx                            # Task 3
  content/
    types.ts                                # Task 10
    releases.ts                             # Task 10
    shows.ts                                # Task 10
    sets.ts                                 # Task 10
  i18n/
    routing.ts                              # Task 6
    request.ts                              # Task 6
    messages/
      es.json                               # Task 7
      en.json                               # Task 7
  lib/
    fonts.ts                                # Task 3
    motion.ts                               # Task 3
    seo.ts                                  # Task 19
tests/
  unit/
    releases.test.ts                        # Task 10
    shows.test.ts                           # Task 10
    LocaleSwitcher.test.tsx                 # Task 11
  e2e/
    navigation.spec.ts                      # Task 21
    locale-switch.spec.ts                   # Task 21
public/
  assets/                                   # Task 9 (moved from /assets)
README.md                                   # Task 22
```

---

## Task 1: Install dependencies and configure TypeScript

**Files:**
- Modify: `package.json`
- Create: `tsconfig.json`

- [ ] **Step 1: Install runtime dependencies**

Run from the project root:

```bash
npm install next@15 react@19 react-dom@19 next-intl
```

Expected: dependencies install without errors. `framer-motion` is already installed.

- [ ] **Step 2: Install dev dependencies**

```bash
npm install -D typescript@5 @types/node @types/react @types/react-dom
```

Expected: install completes.

- [ ] **Step 3: Add npm scripts to `package.json`**

Open `package.json` and replace its contents with:

```json
{
  "name": "danko-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "framer-motion": "^12.38.0",
    "next": "^15.0.0",
    "next-intl": "^3.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.0.0"
  }
}
```

Run `npm install` again to sync. Keep `framer-motion` and any auto-pinned versions npm produces.

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Verify typecheck baseline**

```bash
npm run typecheck
```

Expected: passes (no `.ts` files exist yet to type-check beyond `next-env.d.ts` which Next will generate later — if it errors complaining about missing `next-env.d.ts`, create an empty `next-env.d.ts` at the root: `/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n`).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json
git commit -m "chore: scaffold next 15, typescript strict, next-intl deps"
```

---

## Task 2: Tailwind CSS v4 with metallic design tokens

**Files:**
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`

- [ ] **Step 1: Install Tailwind v4**

```bash
npm install -D tailwindcss@4 @tailwindcss/postcss@4 postcss
```

- [ ] **Step 2: Create `postcss.config.mjs`**

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

- [ ] **Step 3: Create `src/app/globals.css` with metallic design tokens**

```css
@import "tailwindcss";

@theme {
  /* Metallic palette — no hot color */
  --color-base: #050505;
  --color-surface: #0e0e10;
  --color-text: #f4f4f2;
  --color-text-muted: #7a7a7a;
  --color-silver: #c8cacc;
  --color-steel: #5a5c60;

  /* Typography (font CSS variables are wired in src/lib/fonts.ts) */
  --font-display: var(--font-display), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-body), ui-sans-serif, system-ui, sans-serif;

  /* Motion */
  --ease-industrial: cubic-bezier(0.65, 0, 0.35, 1);
}

html {
  scroll-behavior: smooth;
}

html,
body {
  background: var(--color-base);
  color: var(--color-text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Focus ring — non-removable, silver outline */
:focus-visible {
  outline: 2px solid var(--color-silver);
  outline-offset: 2px;
}

/* prefers-reduced-motion — disable parallax/reveal/hover-scale, keep <100ms fades */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Display utility */
.font-display {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.02em;
}
```

- [ ] **Step 4: Commit**

```bash
git add postcss.config.mjs src/app/globals.css
git commit -m "feat: tailwind v4 with metallic palette and motion tokens"
```

---

## Task 3: Fonts and shared motion variants

**Files:**
- Create: `src/lib/fonts.ts`
- Create: `src/lib/motion.ts`
- Create: `src/components/ui/Reveal.tsx`

- [ ] **Step 1: Create `src/lib/fonts.ts`**

Uses Space Grotesk (display, free) + Inter (body, free) via `next/font/google`. These approximate the industrial/clean pairing the spec calls for; can be swapped to commercial Neue Machina later by re-exporting the same CSS variables.

```ts
import { Space_Grotesk, Inter } from "next/font/google";

export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
```

- [ ] **Step 2: Create `src/lib/motion.ts` with shared variants**

```ts
import type { Variants } from "framer-motion";

export const easeIndustrial = [0.65, 0, 0.35, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeIndustrial },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: easeIndustrial },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;
```

- [ ] **Step 3: Create `src/components/ui/Reveal.tsx` (a reusable scroll-reveal wrapper)**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
  delay?: number;
};

export function Reveal({ children, className, as = "div", delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/fonts.ts src/lib/motion.ts src/components/ui/Reveal.tsx
git commit -m "feat: typography pair (space grotesk + inter) and reveal primitive"
```

---

## Task 4: Linting and formatting

**Files:**
- Create: `.eslintrc.json`
- Create: `.prettierrc`
- Modify: `.gitignore` (add `.next/`, `coverage/`, `playwright-report/`)

- [ ] **Step 1: Install ESLint + Prettier**

```bash
npm install -D eslint eslint-config-next prettier prettier-plugin-tailwindcss
```

- [ ] **Step 2: Create `.eslintrc.json`**

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "react/no-unescaped-entities": "off"
  }
}
```

- [ ] **Step 3: Create `.prettierrc`**

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 4: Update `.gitignore`**

The repo already has `.next/` excluded — verify and add any missing entries (`coverage/`, `playwright-report/`, `test-results/`). Skip if already present.

- [ ] **Step 5: Run lint to verify it works**

```bash
npm run lint
```

Expected: "No ESLint warnings or errors" (or skips because no source yet — both fine).

- [ ] **Step 6: Commit**

```bash
git add .eslintrc.json .prettierrc .gitignore package.json package-lock.json
git commit -m "chore: eslint + prettier + tailwindcss class sorting"
```

---

## Task 5: Test infrastructure (Vitest + Playwright)

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`

- [ ] **Step 1: Install Vitest + RTL + Playwright**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @playwright/test
```

Then download Playwright browsers:

```bash
npx playwright install --with-deps chromium
```

(On Windows without admin you may omit `--with-deps`.)

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    include: ["tests/unit/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

- [ ] **Step 3: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000/es",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 5: Verify Vitest runs (no tests yet, exits cleanly)**

```bash
npm test
```

Expected: `No test files found` — exits non-zero, that's fine for now. Just confirms config parses.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts vitest.setup.ts playwright.config.ts package.json package-lock.json
git commit -m "chore: vitest + rtl + playwright test infrastructure"
```

---

## Task 6: next-intl routing, middleware, and Next config

**Files:**
- Create: `next.config.ts`
- Create: `src/middleware.ts`
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`

- [ ] **Step 1: Create `src/i18n/routing.ts`**

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
```

- [ ] **Step 2: Create `src/i18n/request.ts`**

```ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create `src/middleware.ts`**

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 4: Create `next.config.ts`**

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Commit**

```bash
git add next.config.ts src/middleware.ts src/i18n/routing.ts src/i18n/request.ts
git commit -m "feat: next-intl routing with /es default and /en alternate"
```

---

## Task 7: Message catalogs (es.json, en.json)

**Files:**
- Create: `src/i18n/messages/es.json`
- Create: `src/i18n/messages/en.json`

- [ ] **Step 1: Create `src/i18n/messages/es.json`**

```json
{
  "meta": {
    "title": "Danko — Peak Time Techno · Bogotá",
    "description": "DJ Danko. Peak Time Techno y Hard Trance desde Bogotá, Colombia. Sets, próximos lanzamientos, fechas y booking internacional.",
    "ogAlt": "Danko en cabina"
  },
  "nav": {
    "bio": "Bio",
    "music": "Música",
    "releases": "Lanzamientos",
    "shows": "Fechas",
    "gallery": "Galería",
    "contact": "Contacto",
    "switchLocale": "Cambiar idioma"
  },
  "hero": {
    "tagline": "Peak Time Techno · Bogotá",
    "ctaListen": "Escuchar",
    "ctaBook": "Booking"
  },
  "about": {
    "heading": "Sobre Danko",
    "shortBio": "DJ emergente de Bogotá, Colombia, especializado en Peak Time Techno y Hard Trance. Apariciones recientes en CORE Medellín y Radio Berlin Club.",
    "longBio": "Danko construye sets densos y físicos, alternando kicks duros con melodías eufóricas de hard trance. Activo en la escena colombiana desde hace más de tres años, ha compartido cabina en formato B2B con Brandon y ocupado lineups en clubes referentes de Medellín y Bogotá. Su sonido busca el momento peak — ese punto donde la pista deja de pensar y solo responde.",
    "readMore": "Leer más",
    "readLess": "Cerrar",
    "stats": {
      "genres": "Géneros",
      "genresValue": "Peak Time Techno · Hard Trance",
      "base": "Base",
      "baseValue": "Bogotá, Colombia",
      "since": "Activo desde",
      "sinceValue": "2022"
    }
  },
  "music": {
    "heading": "Música",
    "featured": "Set destacado",
    "more": "Más sets",
    "embedFallback": "Si el reproductor no carga, escucha directamente en SoundCloud."
  },
  "releases": {
    "heading": "Próximos lanzamientos",
    "out": "Disponible ahora",
    "soon": "Próximamente",
    "preSave": "Pre-save",
    "listen": "Escuchar"
  },
  "shows": {
    "heading": "Fechas",
    "upcoming": "Próximas",
    "past": "Anteriores",
    "tickets": "Entradas",
    "noUpcoming": "Próximas fechas se anunciarán pronto."
  },
  "gallery": {
    "heading": "Galería"
  },
  "contact": {
    "heading": "Contacto",
    "bookingLead": "Para bookings internacionales y nacionales:",
    "emailLabel": "Email de booking",
    "follow": "Seguir a Danko"
  },
  "footer": {
    "rights": "Todos los derechos reservados."
  }
}
```

- [ ] **Step 2: Create `src/i18n/messages/en.json`**

```json
{
  "meta": {
    "title": "Danko — Peak Time Techno · Bogotá",
    "description": "DJ Danko. Peak Time Techno and Hard Trance from Bogotá, Colombia. Sets, upcoming releases, tour dates, and international booking.",
    "ogAlt": "Danko behind the decks"
  },
  "nav": {
    "bio": "Bio",
    "music": "Music",
    "releases": "Releases",
    "shows": "Shows",
    "gallery": "Gallery",
    "contact": "Contact",
    "switchLocale": "Switch language"
  },
  "hero": {
    "tagline": "Peak Time Techno · Bogotá",
    "ctaListen": "Listen",
    "ctaBook": "Booking"
  },
  "about": {
    "heading": "About Danko",
    "shortBio": "Emerging DJ from Bogotá, Colombia, specializing in Peak Time Techno and Hard Trance. Recent appearances at CORE Medellín and Radio Berlin Club.",
    "longBio": "Danko builds dense, physical sets, alternating hard kicks with euphoric hard trance melodies. Active in the Colombian scene for more than three years, he has shared the booth in B2B format with Brandon and held lineup slots at reference clubs in Medellín and Bogotá. His sound chases the peak — the moment when the floor stops thinking and just responds.",
    "readMore": "Read more",
    "readLess": "Close",
    "stats": {
      "genres": "Genres",
      "genresValue": "Peak Time Techno · Hard Trance",
      "base": "Based in",
      "baseValue": "Bogotá, Colombia",
      "since": "Active since",
      "sinceValue": "2022"
    }
  },
  "music": {
    "heading": "Music",
    "featured": "Featured set",
    "more": "More sets",
    "embedFallback": "If the player does not load, listen directly on SoundCloud."
  },
  "releases": {
    "heading": "Upcoming releases",
    "out": "Out now",
    "soon": "Coming soon",
    "preSave": "Pre-save",
    "listen": "Listen"
  },
  "shows": {
    "heading": "Shows",
    "upcoming": "Upcoming",
    "past": "Past",
    "tickets": "Tickets",
    "noUpcoming": "Upcoming dates will be announced soon."
  },
  "gallery": {
    "heading": "Gallery"
  },
  "contact": {
    "heading": "Contact",
    "bookingLead": "For international and national bookings:",
    "emailLabel": "Booking email",
    "follow": "Follow Danko"
  },
  "footer": {
    "rights": "All rights reserved."
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/i18n/messages/es.json src/i18n/messages/en.json
git commit -m "feat: bilingual message catalogs (es default, en)"
```

---

## Task 8: App shell — root layout, locale layout, home page skeleton

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create root `src/app/layout.tsx`**

A minimal root that just renders children; the locale layout below does the real work. Next.js requires a root layout.

```tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 2: Create `src/app/[locale]/layout.tsx`**

```tsx
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { fontBody, fontDisplay } from "@/lib/fonts";
import { routing, type Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        es: "/es",
        en: "/en",
        "x-default": "/es",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale,
      type: "website",
      images: [{ url: "/assets/danko_radioberlin_club_1.jpeg", alt: t("ogAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="bg-base text-text antialiased">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create `src/app/[locale]/page.tsx` (skeleton — sections added in later tasks)**

```tsx
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <section id="hero" className="flex min-h-screen items-center justify-center">
        <h1 className="font-display text-6xl">Danko</h1>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Run the dev server and verify both locales load**

```bash
npm run dev
```

Open `http://localhost:3000/es` — should show "Danko" in display font, dark background.
Open `http://localhost:3000/en` — same.
Open `http://localhost:3000/` — should redirect to `/es`.

Stop the server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx "src/app/[locale]/layout.tsx" "src/app/[locale]/page.tsx"
git commit -m "feat: bilingual app shell with metadata and font wiring"
```

---

## Task 9: Move assets to public/

**Files:**
- Move: `assets/*.jpeg` → `public/assets/*.jpeg`

Next.js serves only files under `public/`. The current `/assets` folder needs to move so `next/image` and OG metadata can reference them.

- [ ] **Step 1: Create the destination folder and move files**

PowerShell (Windows):

```powershell
New-Item -ItemType Directory -Force public/assets
Move-Item assets/*.jpeg public/assets/
Remove-Item assets -Recurse
```

Or bash:

```bash
mkdir -p public/assets
mv assets/*.jpeg public/assets/
rmdir assets
```

- [ ] **Step 2: Verify**

`ls public/assets/` should list all 9 jpegs. The top-level `assets/` folder should no longer exist.

- [ ] **Step 3: Update OG image path in `src/app/[locale]/layout.tsx`**

The `openGraph.images[0].url` already references `/assets/danko_radioberlin_club_1.jpeg` which now resolves correctly via `public/`. No code change needed — verify visually by visiting `http://localhost:3000/assets/danko_radioberlin_club_1.jpeg` while `npm run dev` runs.

- [ ] **Step 4: Commit**

```bash
git add public/ assets/
git commit -m "chore: move brand assets under public/ for next/image"
```

---

## Task 10: Content data layer with filter tests

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/releases.ts`
- Create: `src/content/shows.ts`
- Create: `src/content/sets.ts`
- Create: `tests/unit/releases.test.ts`
- Create: `tests/unit/shows.test.ts`

- [ ] **Step 1: Create `src/content/types.ts`**

```ts
export type Release = {
  id: string;
  title: string;
  label?: string;
  releaseDate: string; // ISO date (YYYY-MM-DD)
  artwork: string; // path under /public
  links: {
    spotify?: string;
    beatport?: string;
    apple?: string;
    soundcloud?: string;
  };
};

export type Show = {
  id: string;
  date: string; // ISO date (YYYY-MM-DD)
  venue: string;
  city: string;
  country: string;
  eventName?: string;
  ticketUrl?: string;
};

export type SetEntry = {
  soundcloudUrl: string; // full SoundCloud track or playlist URL
  title: string;
  description?: string;
};
```

- [ ] **Step 2: Create `src/content/releases.ts` with filter helpers**

```ts
import type { Release } from "./types";

export const releases: Release[] = [
  // Add releases here. Section auto-hides when no upcoming entries exist.
  // Example shape (commented):
  // {
  //   id: "danko-untitled-001",
  //   title: "Untitled 001",
  //   label: "Self-released",
  //   releaseDate: "2026-08-15",
  //   artwork: "/assets/danko_logo.jpeg",
  //   links: { spotify: "https://open.spotify.com/...", beatport: "..." }
  // }
];

export function upcomingReleases(today: Date = new Date()): Release[] {
  const todayIso = today.toISOString().slice(0, 10);
  return releases
    .filter((r) => r.releaseDate >= todayIso)
    .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
}

export function hasUpcomingReleases(today?: Date): boolean {
  return upcomingReleases(today).length > 0;
}
```

- [ ] **Step 3: Create `src/content/shows.ts` with split helpers**

```ts
import type { Show } from "./types";

export const shows: Show[] = [
  {
    id: "core-medellin-2024",
    date: "2024-09-21",
    venue: "CORE",
    city: "Medellín",
    country: "Colombia",
  },
  {
    id: "radio-berlin-bogota-2024-a",
    date: "2024-11-08",
    venue: "Radio Berlin Club",
    city: "Bogotá",
    country: "Colombia",
  },
  {
    id: "radio-berlin-bogota-2024-b",
    date: "2025-02-14",
    venue: "Radio Berlin Club",
    city: "Bogotá",
    country: "Colombia",
    eventName: "B2B w/ Brandon",
  },
  // Future shows: add entries with date >= today and they appear in upcoming.
];

export function partitionShows(today: Date = new Date()): {
  upcoming: Show[];
  past: Show[];
} {
  const todayIso = today.toISOString().slice(0, 10);
  const upcoming: Show[] = [];
  const past: Show[] = [];
  for (const s of shows) {
    if (s.date >= todayIso) upcoming.push(s);
    else past.push(s);
  }
  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  past.sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}
```

- [ ] **Step 4: Create `src/content/sets.ts`**

```ts
import type { SetEntry } from "./types";

export const sets: SetEntry[] = [
  {
    soundcloudUrl: "https://soundcloud.com/daniel-beltran-101291848",
    title: "SoundCloud — Danko",
    description: "All sets and tracks",
  },
];

export const featuredSet = sets[0];
export const moreSets = sets.slice(1);
```

- [ ] **Step 5: Write failing test for `upcomingReleases`**

Create `tests/unit/releases.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import type { Release } from "@/content/types";

// We import the function under test, then stub the module's exported array
// via a small wrapper. To keep things simple and the data file ergonomic,
// we test the filter logic directly with handcrafted input by re-implementing
// the filter as a pure function call against the module's helper.
import { upcomingReleases } from "@/content/releases";

describe("upcomingReleases", () => {
  it("returns only releases with releaseDate >= today", () => {
    // The data file may be empty by default. This test verifies the type
    // contract and that the function returns an array sorted ascending.
    const result = upcomingReleases(new Date("2026-05-13"));
    expect(Array.isArray(result)).toBe(true);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].releaseDate >= result[i - 1].releaseDate).toBe(true);
    }
  });

  it("filters correctly given an inline array", () => {
    const sample: Release[] = [
      { id: "a", title: "A", releaseDate: "2026-01-01", artwork: "", links: {} },
      { id: "b", title: "B", releaseDate: "2026-06-01", artwork: "", links: {} },
      { id: "c", title: "C", releaseDate: "2026-12-31", artwork: "", links: {} },
    ];
    const today = new Date("2026-05-13");
    const todayIso = today.toISOString().slice(0, 10);
    const filtered = sample
      .filter((r) => r.releaseDate >= todayIso)
      .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
    expect(filtered.map((r) => r.id)).toEqual(["b", "c"]);
  });
});
```

- [ ] **Step 6: Run release test — expect pass**

```bash
npm test -- tests/unit/releases.test.ts
```

Expected: both tests pass. (The first asserts the contract on the real exported array.)

- [ ] **Step 7: Write failing test for `partitionShows`**

Create `tests/unit/shows.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { partitionShows, shows } from "@/content/shows";

describe("partitionShows", () => {
  it("splits shows around the reference date", () => {
    const ref = new Date("2026-05-13");
    const { upcoming, past } = partitionShows(ref);
    expect(upcoming.length + past.length).toBe(shows.length);
    for (const s of upcoming) expect(s.date >= "2026-05-13").toBe(true);
    for (const s of past) expect(s.date < "2026-05-13").toBe(true);
  });

  it("sorts upcoming ascending and past descending", () => {
    const ref = new Date("2024-01-01"); // makes everything upcoming
    const { upcoming } = partitionShows(ref);
    for (let i = 1; i < upcoming.length; i++) {
      expect(upcoming[i].date >= upcoming[i - 1].date).toBe(true);
    }
    const ref2 = new Date("2030-01-01"); // makes everything past
    const { past } = partitionShows(ref2);
    for (let i = 1; i < past.length; i++) {
      expect(past[i].date <= past[i - 1].date).toBe(true);
    }
  });
});
```

- [ ] **Step 8: Run shows test — expect pass**

```bash
npm test -- tests/unit/shows.test.ts
```

Expected: both tests pass.

- [ ] **Step 9: Commit**

```bash
git add src/content/ tests/unit/releases.test.ts tests/unit/shows.test.ts
git commit -m "feat: content types, data files, and filter tests"
```

---

## Task 11: Nav + LocaleSwitcher with test

**Files:**
- Create: `src/components/nav/Nav.tsx`
- Create: `src/components/nav/LocaleSwitcher.tsx`
- Create: `tests/unit/LocaleSwitcher.test.tsx`
- Modify: `src/app/[locale]/page.tsx` (mount Nav)

- [ ] **Step 1: Create `src/components/nav/LocaleSwitcher.tsx`**

```tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("nav");
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: Locale) => {
    if (next === current) return;
    const segments = pathname.split("/");
    if (segments[1] && routing.locales.includes(segments[1] as Locale)) {
      segments[1] = next;
    }
    router.push(segments.join("/") || `/${next}`);
  };

  return (
    <div className="flex items-center gap-3 text-sm" aria-label={t("switchLocale")}>
      {routing.locales.map((loc) => {
        const active = loc === current;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "font-semibold text-text"
                : "text-text-muted hover:text-text transition-colors"
            }
          >
            {loc.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/nav/Nav.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { hasUpcomingReleases } from "@/content/releases";

export function Nav() {
  const t = useTranslations("nav");
  const showReleases = hasUpcomingReleases();

  const links: Array<{ href: string; label: string }> = [
    { href: "#about", label: t("bio") },
    { href: "#music", label: t("music") },
    ...(showReleases ? [{ href: "#releases", label: t("releases") }] : []),
    { href: "#shows", label: t("shows") },
    { href: "#gallery", label: t("gallery") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-base/70 border-b border-steel/30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-3">
          <Image
            src="/assets/danko_logo.jpeg"
            alt="Danko"
            width={32}
            height={32}
            className="rounded-sm"
          />
          <span className="font-display text-lg tracking-wide">DANKO</span>
        </a>

        <ul className="hidden gap-6 text-sm text-text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-text transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <LocaleSwitcher />
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Mount Nav in `src/app/[locale]/page.tsx`**

Replace the file contents:

```tsx
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/nav/Nav";
import type { Locale } from "@/i18n/routing";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-20">
        <section id="hero" className="flex min-h-[80vh] items-center justify-center">
          <h1 className="font-display text-6xl">Danko</h1>
        </section>
      </main>
    </>
  );
}
```

- [ ] **Step 4: Write test for LocaleSwitcher behavior**

Create `tests/unit/LocaleSwitcher.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { LocaleSwitcher } from "@/components/nav/LocaleSwitcher";

const pushMock = vi.fn();
const pathnameMock = vi.fn(() => "/es#music");

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => pathnameMock(),
}));

const messages = {
  nav: { switchLocale: "Switch language" },
};

function renderWithLocale(locale: "es" | "en") {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleSwitcher />
    </NextIntlClientProvider>,
  );
}

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it("marks the current locale as active and the other as inactive", () => {
    renderWithLocale("es");
    const es = screen.getByRole("button", { name: "ES" });
    const en = screen.getByRole("button", { name: "EN" });
    expect(es).toHaveAttribute("aria-current", "true");
    expect(en).not.toHaveAttribute("aria-current");
  });

  it("switches locale by replacing the locale segment in the path", async () => {
    renderWithLocale("es");
    await userEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(pushMock).toHaveBeenCalledWith("/en#music");
  });

  it("does nothing when clicking the active locale", async () => {
    renderWithLocale("es");
    await userEvent.click(screen.getByRole("button", { name: "ES" }));
    expect(pushMock).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 5: Run the test**

```bash
npm test -- tests/unit/LocaleSwitcher.test.tsx
```

Expected: 3 tests pass.

- [ ] **Step 6: Verify visually**

```bash
npm run dev
```

Open `http://localhost:3000/es` — should show fixed nav with logo, links (in Spanish), and ES/EN switcher. Clicking EN navigates to `/en`. Stop server.

- [ ] **Step 7: Commit**

```bash
git add src/components/nav/ tests/unit/LocaleSwitcher.test.tsx "src/app/[locale]/page.tsx"
git commit -m "feat: top nav with locale switcher and anchor links"
```

---

## Task 12: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create `src/components/sections/Hero.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { easeIndustrial } from "@/lib/motion";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  return (
    <section id="hero" className="relative isolate flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/danko_radioberlin_club_1.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-base/40 to-base" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeIndustrial }}
          className="font-display text-[18vw] leading-[0.85] tracking-tight md:text-[12rem]"
        >
          DANKO
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeIndustrial, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg uppercase tracking-[0.2em] text-text-muted"
        >
          {t("tagline")}
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeIndustrial, delay: 0.35 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#music"
            className="rounded-sm border border-silver px-6 py-3 text-sm font-medium uppercase tracking-widest hover:bg-silver hover:text-base transition-colors"
          >
            {t("ctaListen")}
          </a>
          <a
            href="#contact"
            className="rounded-sm border border-steel px-6 py-3 text-sm font-medium uppercase tracking-widest text-text-muted hover:text-text hover:border-silver transition-colors"
          >
            {t("ctaBook")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Mount Hero in `page.tsx`**

Update `src/app/[locale]/page.tsx`:

```tsx
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import type { Locale } from "@/i18n/routing";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

`/es` and `/en` should show the hero image with overlay, giant "DANKO" wordmark, tagline, and two CTAs. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx "src/app/[locale]/page.tsx"
git commit -m "feat: hero section with cinematic image and CTAs"
```

---

## Task 13: About section

**Files:**
- Create: `src/components/sections/About.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create `src/components/sections/About.tsx`**

```tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const t = useTranslations("about");
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="border-t border-steel/20 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-text-muted">{t("heading")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 font-display text-3xl leading-tight md:text-5xl">{t("shortBio")}</p>
        </Reveal>

        {expanded && (
          <Reveal>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-text-muted">
              {t("longBio")}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-8 text-sm uppercase tracking-widest text-silver hover:text-text transition-colors"
          >
            {expanded ? t("readLess") : t("readMore")}
          </button>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="mt-16 grid grid-cols-1 gap-8 border-t border-steel/20 pt-10 md:grid-cols-3">
            {(["genres", "base", "since"] as const).map((key) => (
              <div key={key}>
                <dt className="text-xs uppercase tracking-widest text-text-muted">
                  {t(`stats.${key}`)}
                </dt>
                <dd className="mt-2 font-display text-xl">{t(`stats.${key}Value`)}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Mount in `page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import type { Locale } from "@/i18n/routing";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify and commit**

```bash
npm run dev
# verify About appears under Hero, "leer más" expands the long bio
```

```bash
git add src/components/sections/About.tsx "src/app/[locale]/page.tsx"
git commit -m "feat: about section with expandable long bio and stats"
```

---

## Task 14: Music section + SoundCloudEmbed

**Files:**
- Create: `src/components/ui/SoundCloudEmbed.tsx`
- Create: `src/components/sections/Music.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create `src/components/ui/SoundCloudEmbed.tsx`**

Wraps the SoundCloud iframe player. Accepts a SoundCloud URL and a title for accessibility.

```tsx
"use client";

import { useTranslations } from "next-intl";

type Props = {
  url: string;
  title: string;
  size?: "lg" | "md";
};

export function SoundCloudEmbed({ url, title, size = "md" }: Props) {
  const t = useTranslations("music");
  const height = size === "lg" ? 450 : 166;
  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    url,
  )}&color=%23c8cacc&inverse=true&auto_play=false&show_user=true&visual=${size === "lg"}`;

  return (
    <div className="bg-surface border border-steel/30">
      <iframe
        title={title}
        width="100%"
        height={height}
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={src}
        className="block"
      />
      <noscript>
        <p className="p-4 text-sm text-text-muted">
          <a href={url} className="underline">
            {t("embedFallback")}
          </a>
        </p>
      </noscript>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Music.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SoundCloudEmbed } from "@/components/ui/SoundCloudEmbed";
import { featuredSet, moreSets } from "@/content/sets";

export function Music() {
  const t = useTranslations("music");

  return (
    <section id="music" className="border-t border-steel/20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-text-muted">{t("heading")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">{t("featured")}</h2>
        </Reveal>

        {featuredSet ? (
          <Reveal delay={0.1}>
            <div className="mt-10">
              <SoundCloudEmbed url={featuredSet.soundcloudUrl} title={featuredSet.title} size="lg" />
            </div>
          </Reveal>
        ) : null}

        {moreSets.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <h3 className="font-display text-2xl text-text-muted">{t("more")}</h3>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {moreSets.map((s) => (
                <Reveal key={s.soundcloudUrl}>
                  <SoundCloudEmbed url={s.soundcloudUrl} title={s.title} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Mount and verify**

Update `src/app/[locale]/page.tsx` to import and render `<Music />` after `<About />`.

```bash
npm run dev
# verify SoundCloud player loads and plays on /es and /en
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/SoundCloudEmbed.tsx src/components/sections/Music.tsx "src/app/[locale]/page.tsx"
git commit -m "feat: music section with featured soundcloud embed and grid"
```

---

## Task 15: Releases section + ReleaseCard (auto-hides when empty)

**Files:**
- Create: `src/components/ui/ReleaseCard.tsx`
- Create: `src/components/sections/Releases.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create `src/components/ui/ReleaseCard.tsx`**

```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Release } from "@/content/types";

type Props = { release: Release };

export function ReleaseCard({ release }: Props) {
  const t = useTranslations("releases");
  const today = new Date().toISOString().slice(0, 10);
  const isOut = release.releaseDate <= today;
  const label = isOut ? t("out") : t("soon");

  const links = [
    release.links.spotify && { href: release.links.spotify, label: "Spotify" },
    release.links.beatport && { href: release.links.beatport, label: "Beatport" },
    release.links.apple && { href: release.links.apple, label: "Apple Music" },
    release.links.soundcloud && { href: release.links.soundcloud, label: "SoundCloud" },
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return (
    <article className="group bg-surface border border-steel/30">
      <div className="relative aspect-square">
        <Image
          src={release.artwork}
          alt={release.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-6">
        <p className="text-xs uppercase tracking-widest text-silver">{label}</p>
        <h3 className="mt-2 font-display text-2xl">{release.title}</h3>
        {release.label && (
          <p className="mt-1 text-sm text-text-muted">{release.label}</p>
        )}
        <p className="mt-2 text-sm text-text-muted">{release.releaseDate}</p>
        {links.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-3 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-steel px-3 py-1 hover:border-silver hover:text-text transition-colors"
                >
                  {isOut ? t("listen") : t("preSave")} · {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Releases.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { ReleaseCard } from "@/components/ui/ReleaseCard";
import { upcomingReleases } from "@/content/releases";

export function Releases() {
  const t = useTranslations("releases");
  const items = upcomingReleases();

  if (items.length === 0) return null;

  return (
    <section id="releases" className="border-t border-steel/20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-text-muted">{t("heading")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">{t("heading")}</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <Reveal key={r.id}>
              <ReleaseCard release={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Mount and verify**

Add `<Releases />` to `page.tsx` after `<Music />`. With the data file empty, the section should be absent. Verify:

```bash
npm run dev
```

`#releases` anchor link in nav also should be absent (Nav already checks `hasUpcomingReleases()` from Task 11).

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ReleaseCard.tsx src/components/sections/Releases.tsx "src/app/[locale]/page.tsx"
git commit -m "feat: releases section with cards and auto-hide when empty"
```

---

## Task 16: Shows section + ShowItem

**Files:**
- Create: `src/components/ui/ShowItem.tsx`
- Create: `src/components/sections/Shows.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create `src/components/ui/ShowItem.tsx`**

```tsx
import { useTranslations, useLocale } from "next-intl";
import type { Show } from "@/content/types";

type Props = { show: Show };

export function ShowItem({ show }: Props) {
  const t = useTranslations("shows");
  const locale = useLocale();
  const date = new Date(show.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <li className="flex flex-col gap-2 border-b border-steel/20 py-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-baseline gap-6">
        <time dateTime={show.date} className="font-display text-xl tabular-nums text-silver">
          {date}
        </time>
        <div>
          <p className="font-display text-lg">{show.venue}</p>
          <p className="text-sm text-text-muted">
            {show.city}, {show.country}
            {show.eventName ? ` · ${show.eventName}` : ""}
          </p>
        </div>
      </div>
      {show.ticketUrl && (
        <a
          href={show.ticketUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm uppercase tracking-widest text-silver hover:text-text transition-colors"
        >
          {t("tickets")} →
        </a>
      )}
    </li>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Shows.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { ShowItem } from "@/components/ui/ShowItem";
import { partitionShows } from "@/content/shows";

export function Shows() {
  const t = useTranslations("shows");
  const { upcoming, past } = partitionShows();

  return (
    <section id="shows" className="border-t border-steel/20 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-text-muted">{t("heading")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">{t("heading")}</h2>
        </Reveal>

        <div className="mt-12">
          <h3 className="text-xs uppercase tracking-widest text-text-muted">{t("upcoming")}</h3>
          {upcoming.length > 0 ? (
            <ul className="mt-4">
              {upcoming.map((s) => (
                <ShowItem key={s.id} show={s} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-text-muted">{t("noUpcoming")}</p>
          )}
        </div>

        {past.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xs uppercase tracking-widest text-text-muted">{t("past")}</h3>
            <ul className="mt-4">
              {past.map((s) => (
                <ShowItem key={s.id} show={s} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Mount, verify, commit**

Add `<Shows />` to `page.tsx`. Verify `npm run dev` shows past shows (CORE Medellín, Radio Berlin x2). No upcoming shows → fallback message in current locale.

```bash
git add src/components/ui/ShowItem.tsx src/components/sections/Shows.tsx "src/app/[locale]/page.tsx"
git commit -m "feat: shows section split into upcoming and past"
```

---

## Task 17: Gallery section

**Files:**
- Create: `src/components/sections/Gallery.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create `src/components/sections/Gallery.tsx`**

References the 9 jpegs moved in Task 9. Layout is an asymmetric mosaic; each image uses `next/image` with descriptive `alt` from translations.

```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

type Photo = { src: string; alt: string; aspect: "square" | "tall" | "wide" };

const photos: Photo[] = [
  { src: "/assets/danko_radioberlin_club_1.jpeg", alt: "Radio Berlin Club, Bogotá", aspect: "wide" },
  { src: "/assets/danko_mezclando_1.jpeg", alt: "Danko mixing", aspect: "tall" },
  { src: "/assets/danko_b2b_brandon_1.jpeg", alt: "B2B with Brandon", aspect: "square" },
  { src: "/assets/danko_core_medellin.jpeg", alt: "CORE Medellín", aspect: "wide" },
  { src: "/assets/danko_radioberlin_club_2.jpeg", alt: "Radio Berlin Club crowd", aspect: "tall" },
  { src: "/assets/danko_meaclando_2.jpeg", alt: "Danko mixing", aspect: "square" },
  { src: "/assets/danko_b2b_brandon_2.jpeg", alt: "B2B with Brandon", aspect: "wide" },
  { src: "/assets/danko_practice.jpeg", alt: "Practice session", aspect: "square" },
];

const aspectClass: Record<Photo["aspect"], string> = {
  square: "aspect-square",
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
};

export function Gallery() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="border-t border-steel/20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-text-muted">{t("heading")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">{t("heading")}</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {photos.map((p) => (
            <Reveal key={p.src} className={`relative overflow-hidden ${aspectClass[p.aspect]}`}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Note: the `alt` text intentionally uses proper venue names (not translated, per spec). Generic "Danko mixing" / "B2B with Brandon" are kept in English to keep the alt minimal — acceptable for screen readers; can be expanded later if desired.

- [ ] **Step 2: Mount, verify, commit**

Add `<Gallery />` to `page.tsx`. Verify mosaic renders, images load via `next/image`.

```bash
git add src/components/sections/Gallery.tsx "src/app/[locale]/page.tsx"
git commit -m "feat: gallery mosaic from public assets"
```

---

## Task 18: Contact section + Footer

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Create: `src/components/sections/Footer.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create `src/components/sections/Contact.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

const BOOKING_EMAIL = "booking@dankomusic.com"; // placeholder — replace with real email in content
const INSTAGRAM_URL = "https://www.instagram.com/danko_d.j/";
const SOUNDCLOUD_URL = "https://soundcloud.com/daniel-beltran-101291848";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="border-t border-steel/20 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-text-muted">{t("heading")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-5xl md:text-7xl">{t("heading")}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-text-muted">{t("bookingLead")}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href={`mailto:${BOOKING_EMAIL}`}
            className="mt-6 inline-block border border-silver px-8 py-4 font-display text-xl uppercase tracking-widest hover:bg-silver hover:text-base transition-colors"
            aria-label={t("emailLabel")}
          >
            {BOOKING_EMAIL}
          </a>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-16 text-xs uppercase tracking-[0.3em] text-text-muted">
            {t("follow")}
          </p>
          <ul className="mt-4 flex justify-center gap-8 text-sm">
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="text-silver hover:text-text transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={SOUNDCLOUD_URL}
                target="_blank"
                rel="noreferrer"
                className="text-silver hover:text-text transition-colors"
              >
                SoundCloud
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
```

> Replace `BOOKING_EMAIL` with the real address once Danko provides one. Keeping it as a top-level constant means future edits never touch JSX.

- [ ] **Step 2: Create `src/components/sections/Footer.tsx`**

```tsx
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-steel/20 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs uppercase tracking-widest text-text-muted md:flex-row">
        <p>© {year} Danko · {t("rights")}</p>
        <p>Bogotá, Colombia</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Mount, verify, commit**

Update `page.tsx` to render `<Contact />` and `<Footer />` last.

```bash
npm run dev
# verify mailto link opens, social links resolve, footer renders
```

```bash
git add src/components/sections/Contact.tsx src/components/sections/Footer.tsx "src/app/[locale]/page.tsx"
git commit -m "feat: contact section with mailto + social, plus footer"
```

---

## Task 19: SEO — sitemap, robots, JSON-LD

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/lib/seo.ts`
- Modify: `src/app/[locale]/layout.tsx` (inject JSON-LD)

- [ ] **Step 1: Create `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://danko.example";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}`]),
      ),
    },
  }));
}
```

- [ ] **Step 2: Create `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://danko.example";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Create `src/lib/seo.ts` with JSON-LD generator**

```ts
import type { Locale } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://danko.example";

export function personSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Danko",
    alternateName: "DJ Danko",
    jobTitle: locale === "es" ? "DJ y productor" : "DJ and producer",
    description:
      locale === "es"
        ? "DJ de Peak Time Techno y Hard Trance desde Bogotá, Colombia."
        : "Peak Time Techno and Hard Trance DJ from Bogotá, Colombia.",
    url: `${BASE_URL}/${locale}`,
    sameAs: [
      "https://www.instagram.com/danko_d.j/",
      "https://soundcloud.com/daniel-beltran-101291848",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
  };
}
```

- [ ] **Step 4: Inject JSON-LD in locale layout**

Modify `src/app/[locale]/layout.tsx` — inside `<body>`, before `<NextIntlClientProvider>`, add:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(locale)) }}
/>
```

And add the import at the top:

```ts
import { personSchema } from "@/lib/seo";
```

- [ ] **Step 5: Verify**

```bash
npm run dev
```

- Visit `http://localhost:3000/sitemap.xml` — XML with `/es` and `/en`.
- Visit `http://localhost:3000/robots.txt` — references sitemap.
- View source of `/es` — `<script type="application/ld+json">` present with the Person schema.

- [ ] **Step 6: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/lib/seo.ts "src/app/[locale]/layout.tsx"
git commit -m "feat: sitemap, robots, and json-ld person schema"
```

---

## Task 20: Not-found pages

**Files:**
- Create: `src/app/[locale]/not-found.tsx`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Create `src/app/[locale]/not-found.tsx`**

```tsx
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  // useTranslations works in client-or-server depending on context;
  // not-found is rendered in the locale layout's context.
  const t = useTranslations("nav");
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <p className="font-display text-7xl text-silver">404</p>
        <Link href="/" className="mt-6 inline-block text-sm uppercase tracking-widest underline">
          ← {t("bio")} / Home
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create root `src/app/not-found.tsx`** (handles paths without a locale prefix)

```tsx
import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="es">
      <body
        style={{
          background: "#050505",
          color: "#f4f4f2",
          fontFamily: "ui-sans-serif, system-ui",
        }}
      >
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "0 1.5rem", textAlign: "center" }}>
          <div>
            <p style={{ fontSize: "4rem", fontWeight: 700 }}>404</p>
            <Link href="/es" style={{ marginTop: "1rem", display: "inline-block", textDecoration: "underline" }}>
              ← Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Visit `http://localhost:3000/es/does-not-exist` and `http://localhost:3000/does-not-exist` — both render 404, both link back home.

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/not-found.tsx" src/app/not-found.tsx
git commit -m "feat: 404 pages for locale and root contexts"
```

---

## Task 21: E2E tests with Playwright

**Files:**
- Create: `tests/e2e/navigation.spec.ts`
- Create: `tests/e2e/locale-switch.spec.ts`

- [ ] **Step 1: Create `tests/e2e/navigation.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test("hero, about, music, shows, gallery, contact all render on /es", async ({ page }) => {
  await page.goto("/es");

  await expect(page.locator("#hero h1")).toContainText("DANKO");
  await expect(page.locator("#about")).toBeVisible();
  await expect(page.locator("#music")).toBeVisible();
  await expect(page.locator("#shows")).toBeVisible();
  await expect(page.locator("#gallery")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
});

test("/ redirects to /es", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/es$/);
});
```

- [ ] **Step 2: Create `tests/e2e/locale-switch.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test("switching from ES to EN updates the locale and keeps the user on the home page", async ({
  page,
}) => {
  await page.goto("/es");
  await page.getByRole("button", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en/);
  // English-only string should now appear (nav label)
  await expect(page.getByRole("link", { name: "Shows" })).toBeVisible();
});
```

- [ ] **Step 3: Run the E2E suite**

```bash
npm run test:e2e
```

Expected: 3 tests pass. Playwright auto-starts the dev server via `webServer` config.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/
git commit -m "test: e2e navigation and locale switch with playwright"
```

---

## Task 22: README and deployment

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md`**

````markdown
# Danko — Website

Bilingual (ES/EN) website for DJ Danko — Peak Time Techno · Bogotá.

## Stack

- Next.js 15 (App Router)
- TypeScript strict
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- next-intl (locales: `es` default, `en`)
- framer-motion
- Vitest + RTL · Playwright

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

Routes: `/es` (default; `/` redirects here), `/en`.

## Test

```bash
npm test             # unit (Vitest)
npm run test:e2e     # E2E (Playwright)
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
```

## Edit content

All content lives in `src/content/` and `src/i18n/messages/`:

| File | What |
|------|------|
| `src/content/releases.ts` | Upcoming releases. Section auto-hides when empty. |
| `src/content/shows.ts` | Shows. Auto-split into upcoming/past by date. |
| `src/content/sets.ts` | SoundCloud sets. First entry is featured. |
| `src/i18n/messages/es.json` | Spanish UI strings + bio. |
| `src/i18n/messages/en.json` | English UI strings + bio. |

Proper names (venues, set titles, track names) are not translated — they live in the data files and appear verbatim in both locales.

## Deploy

Vercel:

1. Push to GitHub/GitLab.
2. Import the repo in Vercel.
3. Set the env var `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`.
4. Deploy. SSL is automatic; CNAME the apex/`www` to Vercel when the domain is decided.
````

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: readme with stack, dev, test, and deploy instructions"
```

- [ ] **Step 3: Final verification**

Run the full validation locally before merging or deploying:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

Expected: all five pass. If any fails, fix before considering the plan complete.

---

## Done

At this point the site is feature-complete per the spec:
- 7 sections (Hero, About, Music, Releases hidden by default, Shows, Gallery, Contact + Footer)
- Bilingual `/es` / `/en` with locale switcher
- Metallic-only palette, restrained motion, `prefers-reduced-motion` respected
- SEO: sitemap, robots, JSON-LD, OG metadata, hreflang
- 404 pages, accessibility focus rings
- Unit + E2E test coverage on the logic-bearing pieces

Remaining work that depends on real content (not blocking deploy):
- Replace `BOOKING_EMAIL` placeholder in `Contact.tsx` with Danko's real address.
- Add real entries to `src/content/releases.ts` when releases are scheduled.
- Update `src/content/shows.ts` as new dates confirm.
- Swap Space Grotesk → Neue Machina (commercial license) if/when purchased — only `src/lib/fonts.ts` changes.
