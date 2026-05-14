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

export { BASE_URL };
