"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useParallax } from "@/lib/useParallax";

const NAV_OFFSET = 56;
const LETTERS = ["D", "A", "N", "K", "Ø"];

function smoothJump(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Hero() {
  const t = useTranslations("hero");
  const photoRef = useRef<HTMLDivElement | null>(null);
  useParallax(photoRef, 0.08);

  return (
    <section id="top" className="hero">
      <div className="hero__photo-wrap">
        <div className="hero__photo" ref={photoRef} />
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
        <div className="hero__tag">{t("tagline")}</div>
        <div className="hero__ctas">
          <Button
            variant="primary"
            href="#music"
            onClick={(e) => {
              e.preventDefault();
              smoothJump("music");
            }}
          >
            <Icon name="play" size={16} />
            {t("cta")}
          </Button>
          <Button
            variant="ghost"
            href="#shows"
            onClick={(e) => {
              e.preventDefault();
              smoothJump("shows");
            }}
          >
            {t("cta2")}
            <Icon name="chevron-right" size={16} />
          </Button>
        </div>
      </div>

      <button
        className="hero__scroll"
        onClick={() => smoothJump("bio")}
        aria-label={t("scroll")}
      >
        <span>{t("scroll")}</span>
        <Icon name="arrow-down" size={14} />
      </button>
      <div className="hero__corner hero__corner--tl">DK · 01</div>
      <div className="hero__corner hero__corner--br">140 BPM</div>
    </section>
  );
}
