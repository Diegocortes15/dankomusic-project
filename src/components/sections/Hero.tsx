"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useParallax } from "@/lib/useParallax";
import { SOUNDCLOUD_URL, waLink } from "@/config/site";
import { GENRES, SLOGANS } from "@/config/slogans";
import { getFeaturedEvent } from "@/config/events";
import { VENUES } from "@/config/venues";

const NAV_OFFSET = 56;
const LETTERS = ["D", "A", "N", "K", "Ø"];

function smoothJump(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

function formatFeaturedDate(iso: string, locale: string): string {
  const d = new Date(`${iso}T00:00:00`);
  const months =
    locale === "en"
      ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      : ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function Hero() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");
  const tEvent = useTranslations("event");
  const tWa = useTranslations("wa");
  const locale = useLocale() as "es" | "en";
  const photoRef = useRef<HTMLDivElement | null>(null);
  useParallax(photoRef, 0.08);

  const featured = getFeaturedEvent();
  const featuredVenue = featured ? VENUES[featured.venue] : null;
  const featuredDateLabel = featured ? formatFeaturedDate(featured.date, locale) : null;

  return (
    <section id="top" className="hero">
      <div className="hero__photo-wrap">
        <div className="hero__photo" ref={photoRef}>
          <Image
            src="/assets/danko_radioberlin_2.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={80}
            className="hero__photo-img"
          />
        </div>
      </div>
      <div className="hero__protection" />
      <div className="hero__glow" />

      <div className="hero__content">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="hero__name" aria-label="Dankø">
          {LETTERS.map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              className={`hero__name__char${ch === "Ø" ? " hero__o" : ""}`}
              style={{ "--i": i } as CSSProperties}
            >
              {ch}
            </span>
          ))}
        </h1>

        <p className="hero__slogan">{SLOGANS.primary[locale]}</p>

        <div className="hero__genres">
          {GENRES.map((g) => (
            <span key={g} className="genre-chip">
              {g}
            </span>
          ))}
        </div>

        <div className="hero__ctas">
          <Button variant="primary" href={SOUNDCLOUD_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="soundcloud" size={16} />
            {tCta("soundcloud")}
          </Button>
          <Button
            variant="ghost"
            href={waLink(tWa("general"))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={16} />
            {tCta("whatsapp")}
          </Button>
        </div>

        {featured && featuredVenue && featuredDateLabel ? (
          <a
            href="#shows"
            className="hero__event"
            onClick={(e) => {
              e.preventDefault();
              smoothJump("shows");
            }}
          >
            <span className="hero__event-badge mono">
              <span className="pulse-dot" aria-hidden="true" />
              {tEvent("next")}
            </span>
            <span className="hero__event-date mono">{featuredDateLabel}</span>
            <span className="hero__event-sep">·</span>
            <span className="hero__event-venue">{featuredVenue.name.toUpperCase()}</span>
            <Icon name="chevron-right" size={16} />
          </a>
        ) : null}
      </div>

      <button
        type="button"
        className="hero__scroll"
        onClick={() => smoothJump("bio")}
        aria-label={t("scroll")}
      >
        <span>{t("scroll")}</span>
        <Icon name="arrow-down" size={14} />
      </button>
      <div className="hero__corner hero__corner--tl">DK · 2026</div>
      <div className="hero__corner hero__corner--br">125—140 BPM</div>
    </section>
  );
}
