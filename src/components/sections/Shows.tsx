"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";
import { upcomingShows, pastShows } from "@/content/shows";
import type { Show } from "@/content/types";

function ShowRow({ row, isNext }: { row: Show; isNext: boolean }) {
  const t = useTranslations("shows");
  const cta =
    row.status === "soldout" ? (
      <span className="show__sold">{t("soldout")}</span>
    ) : row.status === "tba" ? (
      <span className="show__tba mono">TBA</span>
    ) : (
      <a
        className="show__cta"
        href={row.ticketUrl ?? "#"}
        target={row.ticketUrl ? "_blank" : undefined}
        rel={row.ticketUrl ? "noopener noreferrer" : undefined}
      >
        {t("tickets")}
      </a>
    );

  return (
    <div className={`show ${isNext ? "show--next" : ""}`}>
      <div className="show__date">
        <span className="show__mon mono">{row.mon}</span>
        <span className="show__day">{row.day}</span>
      </div>
      <div className="show__info">
        {isNext ? <span className="show__nextTag">{t("next")}</span> : null}
        <div className="show__venue">
          {row.venue} · {row.city}
        </div>
        <div className="show__meta mono">{row.meta}</div>
      </div>
      <div className="show__cta-wrap">{cta}</div>
    </div>
  );
}

export function Shows() {
  const t = useTranslations("shows");
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const rows = tab === "upcoming" ? upcomingShows : pastShows;

  return (
    <section id="shows" className="section shows">
      <Reveal>
        <SectionStarter num={4} total={6} title={t("title")} lede={t("lede")} />
      </Reveal>

      <Reveal delay={120} className="shows__tabs">
        <button
          type="button"
          className={`shows__tab ${tab === "upcoming" ? "is-active" : ""}`}
          onClick={() => setTab("upcoming")}
        >
          {t("upcoming")} <span className="shows__count mono">{upcomingShows.length}</span>
        </button>
        <button
          type="button"
          className={`shows__tab ${tab === "past" ? "is-active" : ""}`}
          onClick={() => setTab("past")}
        >
          {t("past")} <span className="shows__count mono">{pastShows.length}</span>
        </button>
      </Reveal>

      <div className="shows__list">
        {rows.map((row, i) => (
          <Reveal key={row.id} delay={i * 60}>
            <ShowRow row={row} isNext={tab === "upcoming" && i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
