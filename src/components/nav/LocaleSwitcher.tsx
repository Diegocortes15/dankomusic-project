"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

export function LocaleSwitcher() {
  const t = useTranslations("nav");
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: Locale) => {
    if (next === current) return;
    const hashIndex = pathname.indexOf("#");
    const pathOnly = hashIndex >= 0 ? pathname.slice(0, hashIndex) : pathname;
    const hash = hashIndex >= 0 ? pathname.slice(hashIndex) : "";
    const segments = pathOnly.split("/");
    if (segments[1] && isLocale(segments[1])) {
      segments[1] = next;
    }
    const newPath = segments.join("/") || `/${next}`;
    router.push(`${newPath}${hash}`);
  };

  return (
    <div className="nav__lang" aria-label={t("switchLocale")}>
      {routing.locales.map((loc, i) => (
        <span key={loc} style={{ display: "contents" }}>
          {i > 0 && <span aria-hidden="true">/</span>}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={loc === current ? "true" : undefined}
            className={loc === current ? "is-active" : ""}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
