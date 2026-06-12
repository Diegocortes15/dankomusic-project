"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SOUNDCLOUD_URL, SOUNDCLOUD_HANDLE } from "@/config/site";
import { THEMES } from "@/config/themes";
import { useActiveThemeId } from "@/lib/theme-state";

function buildEmbedUrl(hexColor: string): string {
  const params = new URLSearchParams({
    url: SOUNDCLOUD_URL,
    color: hexColor,
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    show_teaser: "false",
    visual: "true",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

export function SoundCloud() {
  const t = useTranslations("sc");
  const tCta = useTranslations("cta");
  const themeId = useActiveThemeId();
  const theme = THEMES.find((entry) => entry.id === themeId) ?? THEMES[0]!;
  // SoundCloud accepts an URL-encoded hex prefixed with `#` (encoded as `%23`).
  const embedUrl = buildEmbedUrl(theme.swatch);

  // Defer mounting the iframe until the section scrolls into view. The
  // SoundCloud widget JS is ~300ms of main-thread work on cold load; that's
  // a third of our TBT budget. Lighthouse never reaches this section, so it
  // never pays that cost; real users pay only when they actually scroll.
  const screenRef = useRef<HTMLDivElement | null>(null);
  // Lazy init: on the server we always render the placeholder; on a client
  // without IntersectionObserver we fall straight through to the real iframe.
  const [mounted, setMounted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return typeof IntersectionObserver === "undefined";
  });
  useEffect(() => {
    if (mounted) return;
    const node = screenRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setMounted(true);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [mounted]);

  return (
    <section id="music" className="section section--accent soundcloud">
      <div className="soundcloud__halo" />
      <Reveal>
        <SectionStarter num={4} total={5} title={t("title")} lede={t("lede")} />
      </Reveal>

      <Reveal delay={120} className="sc-deck">
        <div className="sc-deck__bar" aria-hidden="true">
          <div className="sc-deck__dots">
            <span />
            <span />
            <span />
          </div>
          <div className="sc-deck__title mono">DANKØ · LIVE FROM SOUNDCLOUD</div>
          <div className="sc-deck__eq">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="sc-deck__screen" ref={screenRef}>
          {/* Re-key on theme so the iframe reloads with the new colour
              params when the user swaps palettes. The IO above gates the
              first mount so Lighthouse/cold loads don't pay the widget cost. */}
          {mounted ? (
            <iframe
              key={themeId}
              title="Dankø on SoundCloud"
              src={embedUrl}
              allow="autoplay"
              loading="lazy"
            />
          ) : (
            <div className="sc-deck__placeholder" aria-hidden="true" />
          )}
        </div>
      </Reveal>

      <Reveal delay={180} className="soundcloud__cta-row">
        <Button variant="primary" href={SOUNDCLOUD_URL} target="_blank" rel="noopener noreferrer">
          <Icon name="soundcloud" size={18} />
          {tCta("soundcloud")}
        </Button>
        <span className="soundcloud__handle mono">{SOUNDCLOUD_HANDLE}</span>
      </Reveal>
    </section>
  );
}
