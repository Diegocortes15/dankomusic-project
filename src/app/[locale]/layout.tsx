import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { fontBody, fontDisplay, fontHeading, fontMono } from "@/lib/fonts";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { personSchema, BASE_URL } from "@/lib/seo";
import { BackgroundFX } from "@/components/fx/BackgroundFX";
import { LoaderDismiss } from "@/components/fx/LoaderDismiss";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/config/themes";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(BASE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
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
      url: `/${locale}`,
      siteName: "DJ Dankø",
      images: [
        {
          url: "/assets/danko_radioberlin_1.jpeg",
          alt: t("ogAlt"),
          width: 1200,
          height: 1500,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

/**
 * Apply the persisted theme to <html> before React mounts to avoid an accent
 * flash on first paint. Mirrors the logic in `ThemeSwitcher` but runs as plain
 * JS in the document head.
 */
const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var v=['blue','cyan','purple','red','green','gold'];document.documentElement.setAttribute('data-theme',v.indexOf(s)>=0?s:${JSON.stringify(
  DEFAULT_THEME,
)});}catch(e){document.documentElement.setAttribute('data-theme',${JSON.stringify(
  DEFAULT_THEME,
)});}})();`;

/**
 * Drives the pre-paint loader: ticks a fake % counter, defines
 * `window.dankoHideLoader`, and a 6s safety net so the loader can never
 * trap a user with a failed JS bundle.
 */
const LOADER_INIT_SCRIPT = `
(function(){
  window.__dankoStart = performance.now();
  var pct = 0, el = document.getElementById('dl-pct');
  window.__dankoLoad = setInterval(function(){
    pct = Math.min(96, pct + Math.random() * 11);
    if (el) el.textContent = Math.floor(pct) + '%';
  }, 130);
  window.__dankoLoadFail = setTimeout(function(){
    window.dankoHideLoader && window.dankoHideLoader();
  }, 6000);
})();
window.dankoHideLoader = function(){
  clearInterval(window.__dankoLoad);
  clearTimeout(window.__dankoLoadFail);
  var pctEl = document.getElementById('dl-pct');
  if (pctEl) pctEl.textContent = '100%';
  var l = document.getElementById('danko-loader');
  if (l) {
    requestAnimationFrame(function(){
      l.classList.add('is-done');
      // Do NOT physically remove the node — it is rendered as JSX by the
      // locale layout, so React keeps it in its virtual DOM. Removing it
      // here would desync the trees and cause a NotFoundError on the next
      // soft navigation (e.g. ES→EN locale switch). The .is-done class
      // handles visual hiding (visibility:hidden + pointer-events:none).
    });
  }
};
`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  const fontClasses = [
    fontDisplay.variable,
    fontHeading.variable,
    fontBody.variable,
    fontMono.variable,
  ].join(" ");

  return (
    // `data-theme` is intentionally NOT rendered here — the pre-paint
    // script in <head> is the single source of truth for that attribute
    // (it reads localStorage so a refresh restores the user's chosen
    // accent). Rendering it in JSX would cause React to reconcile it back
    // to the SSR default after hydration, overwriting the persisted theme.
    // `suppressHydrationWarning` silences the resulting attribute diff.
    <html lang={locale} className={fontClasses} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* SoundCloud widget loads after first paint; the preconnect warms the
            TLS handshake to its CDN so the embed lands faster when scrolled to. */}
        <link rel="preconnect" href="https://w.soundcloud.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://i1.sndcdn.com" />
      </head>
      <body>
        {/* Preloader overlay — paints immediately before any JS runs. The
            LoaderDismiss component below dismisses it once React hydrates. */}
        <div id="danko-loader" aria-hidden="true">
          <div className="dl-wordmark">
            DANKØ
            <span className="dl-fill" aria-hidden="true">
              DANKØ
            </span>
          </div>
          <div className="dl-eq">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="dl-meta">
            <span>Peak Time Techno</span>
            <span className="dl-dot" />
            <span>Bogotá</span>
            <span className="dl-dot" />
            <span className="dl-pct" id="dl-pct" suppressHydrationWarning>
              0%
            </span>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: LOADER_INIT_SCRIPT }} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema(locale as Locale)),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <BackgroundFX />
          <LoaderDismiss />
          <div className="app">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
