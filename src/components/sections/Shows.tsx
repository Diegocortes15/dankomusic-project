"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";
import { Icon } from "@/components/ui/Icon";
import { partitionEvents, type DankoEvent } from "@/config/events";
import { VENUES, venueCity } from "@/config/venues";
import { RESIDENCY } from "@/config/slogans";
import { mapsLink, waLink } from "@/config/site";

const MONTHS_ES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
const MONTHS_EN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function fmtDay(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return String(d.getDate()).padStart(2, "0");
}
function fmtMonth(iso: string, locale: string): string {
  const d = new Date(`${iso}T00:00:00`);
  const arr = locale === "en" ? MONTHS_EN : MONTHS_ES;
  return arr[d.getMonth()] ?? "";
}
function fmtYear(iso: string): string {
  return String(new Date(`${iso}T00:00:00`).getFullYear());
}

function ShowRow({
  event,
  isNext,
  status,
}: {
  event: DankoEvent;
  isNext: boolean;
  status: "upcoming" | "completed";
}) {
  const t = useTranslations("shows");
  const tEvent = useTranslations("event");
  const tCta = useTranslations("cta");
  const tVenue = useTranslations("venue");
  const tWa = useTranslations("wa");
  const locale = useLocale() as "es" | "en";

  const venue = VENUES[event.venue];
  const city = venueCity(venue.address);
  const venueLabel = venue.name;
  const ticketMsg = event.featured ? tWa("ticketsFeatured") : tWa("general");
  const desc = locale === "en" ? event.descEn : event.descEs;
  void t;

  return (
    <Reveal className={`show ${isNext ? "show--next" : ""} show--${status}`}>
      <div className="show__date">
        <span className="show__mon mono">{fmtMonth(event.date, locale)}</span>
        <span className="show__day">{fmtDay(event.date)}</span>
        <span className="show__year mono">{fmtYear(event.date)}</span>
      </div>

      <div className="show__info">
        {isNext ? (
          <span className="show__nextTag mono">
            <span className="pulse-dot" />
            {tEvent("upcoming")}
          </span>
        ) : (
          <span className="show__doneTag mono">
            <Icon name="check" size={10} />
            {tEvent("completed")}
          </span>
        )}
        <div className="show__venue">
          {venueLabel}
          {city ? <span className="show__city"> · {city}</span> : null}
        </div>
        <div className="show__meta">{desc}</div>
        {venue.address ? (
          <button
            type="button"
            className="show__addr"
            onClick={() =>
              window.open(mapsLink(venue.address!), "_blank", "noopener,noreferrer")
            }
          >
            <Icon name="map-pin" size={13} />
            <span className="show__addr-text">{venue.address}</span>
            <span className="show__addr-hint mono">
              {tVenue("open")} <Icon name="external" size={11} />
            </span>
          </button>
        ) : null}
      </div>

      <div className="show__cta-wrap">
        {status === "upcoming" ? (
          <a
            className="show__cta"
            href={waLink(ticketMsg)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="ticket" size={14} />
            {tCta("tickets")}
          </a>
        ) : (
          <span className="show__sold mono">{tEvent("completed")}</span>
        )}
      </div>
    </Reveal>
  );
}

export function Shows() {
  const t = useTranslations("shows");
  const tJourney = useTranslations("journey");
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const { upcoming, past } = useMemo(() => partitionEvents(), []);
  const rows = tab === "upcoming" ? upcoming : past;

  return (
    <section id="shows" className="section section--dark shows">
      <Reveal>
        <SectionStarter num={2} total={4} title={t("title")} lede={t("lede")} />
      </Reveal>

      <Reveal className="shows__tabs" delay={80}>
        <button
          type="button"
          className={`shows__tab ${tab === "upcoming" ? "is-active" : ""}`}
          onClick={() => setTab("upcoming")}
        >
          {t("upcoming")} <span className="shows__count mono">{upcoming.length}</span>
        </button>
        <button
          type="button"
          className={`shows__tab ${tab === "past" ? "is-active" : ""}`}
          onClick={() => setTab("past")}
        >
          {t("past")} <span className="shows__count mono">{past.length}</span>
        </button>
      </Reveal>

      <div className="shows__list">
        {rows.length > 0 ? (
          rows.map((event, i) => (
            <ShowRow
              key={event.id}
              event={event}
              isNext={tab === "upcoming" && i === 0}
              status={tab === "upcoming" ? "upcoming" : "completed"}
            />
          ))
        ) : (
          <div className="shows__empty mono">{t("empty")}</div>
        )}
      </div>

      <Reveal className="journey__growth" delay={140}>
        <span className="journey__growth-mark">“</span>
        <p>{tJourney("growth")}</p>
        <span className="journey__growth-by mono">{RESIDENCY}</span>
      </Reveal>
    </section>
  );
}
