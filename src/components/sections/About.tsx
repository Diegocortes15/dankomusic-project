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
            <p
              id="about-long-bio"
              className="mt-8 max-w-3xl text-lg leading-relaxed text-text-muted"
            >
              {t("longBio")}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="about-long-bio"
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
