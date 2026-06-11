"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import type { GalleryShot } from "@/config/gallery";

type Props = {
  shots: GalleryShot[];
  index: number | null;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
};

/**
 * Full-viewport lightbox with keyboard (Esc, ←/→), swipe and click-outside.
 * `index === null` means closed. Body scroll locks while open.
 */
export function Lightbox({ shots, index, onClose, onNav }: Props) {
  const t = useTranslations("gallery");
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (index == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNav(1);
      else if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, onClose, onNav]);

  if (index == null) return null;
  const shot = shots[index];
  if (!shot) return null;

  return (
    <div
      className="lightbox"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
        if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button
        type="button"
        className="lightbox__close"
        onClick={onClose}
        aria-label={t("close")}
      >
        <Icon name="x" size={22} />
      </button>
      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        aria-label={t("previous")}
      >
        <Icon name="chevron-left" size={28} />
      </button>
      <figure
        className="lightbox__figure"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shot.src} alt={shot.cap} />
        <figcaption className="lightbox__cap">
          <span className="lightbox__cap-title">{shot.cap}</span>
          <span className="lightbox__cap-meta mono">
            {shot.meta} · {index + 1}/{shots.length}
          </span>
        </figcaption>
      </figure>
      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        aria-label={t("next")}
      >
        <Icon name="chevron-right" size={28} />
      </button>
    </div>
  );
}
