import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { fontBody, fontDisplay, fontHeading, fontMono } from "@/lib/fonts";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { personSchema, BASE_URL } from "@/lib/seo";
import { BackgroundFX } from "@/components/fx/BackgroundFX";
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
    <html lang={locale} className={fontClasses}>
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
