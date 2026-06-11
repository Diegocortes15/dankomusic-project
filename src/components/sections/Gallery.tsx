"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";
import { Icon } from "@/components/ui/Icon";
import { Lightbox } from "@/components/ui/Lightbox";
import { GALLERY_SHOTS } from "@/config/gallery";

export function Gallery() {
  const t = useTranslations("gallery");
  const [open, setOpen] = useState<number | null>(null);
  const nav = (dir: 1 | -1) =>
    setOpen((i) => (i == null ? 0 : (i + dir + GALLERY_SHOTS.length) % GALLERY_SHOTS.length));

  return (
    <section id="gallery" className="section gallery">
      <Reveal>
        <SectionStarter num={3} total={4} title={t("title")} lede={t("lede")} />
      </Reveal>
      <div className="gallery__grid">
        {GALLERY_SHOTS.map((s, i) => (
          <Reveal
            key={s.src}
            as="button"
            delay={i * 50}
            className={`g-tile${s.span ? ` g-tile--${s.span}` : ""}`}
            style={{ backgroundImage: `url(${s.src})` }}
            onClick={() => setOpen(i)}
            aria-label={`${s.cap} — ${t("openImage")}`}
          >
            <span className="g-tile__zoom">
              <Icon name="external" size={16} />
            </span>
            <span className="g-tile__cap">
              <span className="g-tile__meta mono">{s.meta}</span>
              {s.cap}
            </span>
          </Reveal>
        ))}
      </div>
      <Lightbox
        shots={GALLERY_SHOTS}
        index={open}
        onClose={() => setOpen(null)}
        onNav={nav}
      />
    </section>
  );
}
