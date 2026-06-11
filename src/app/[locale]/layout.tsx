import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { fontBody, fontDisplay, fontHeading, fontMono } from "@/lib/fonts";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { personSchema, BASE_URL } from "@/lib/seo";
import { BackgroundFX } from "@/components/fx/BackgroundFX";
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
      images: [{ url: "/assets/danko_radioberlin_1.jpeg", alt: t("ogAlt") }],
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
    <html lang={locale} className={fontClasses} data-theme={DEFAULT_THEME}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* Preload the hero LCP image so it can paint without waiting for CSS parsing. */}
        <link
          rel="preload"
          as="image"
          href="/assets/danko_radioberlin_2.jpeg"
          // @ts-expect-error — `fetchPriority` is a valid <link> attribute but the
          // React typings have not yet caught up.
          fetchpriority="high"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema(locale as Locale)),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <BackgroundFX />
          <div className="app">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
