"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SOUNDCLOUD_URL, SOUNDCLOUD_HANDLE } from "@/config/site";
import { THEMES, DEFAULT_THEME, isThemeId, type ThemeId } from "@/config/themes";
import { THEME_CHANGE_EVENT } from "@/components/nav/ThemeSwitcher";

function readInitialThemeId(): ThemeId {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const attr = document.documentElement.getAttribute("data-theme");
  return isThemeId(attr) ? attr : DEFAULT_THEME;
}

/** Tracks the active theme and recomputes on every `danko-theme-change`. */
function useActiveThemeId(): ThemeId {
  const [id, setId] = useState<ThemeId>(readInitialThemeId);

  useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ id: ThemeId }>).detail;
      if (detail?.id) setId(detail.id);
    };
    window.addEventListener(THEME_CHANGE_EVENT, onChange as EventListener);
    return () =>
      window.removeEventListener(THEME_CHANGE_EVENT, onChange as EventListener);
  }, []);

  return id;
}

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

  return (
    <section id="music" className="section section--accent soundcloud">
      <div className="soundcloud__halo" />
      <Reveal>
        <SectionStarter num={4} total={4} title={t("title")} lede={t("lede")} />
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
        <div className="sc-deck__screen">
          {/* Re-key on theme so the iframe reloads with the new colour
              params when the user swaps palettes. */}
          <iframe
            key={themeId}
            title="Dankø on SoundCloud"
            src={embedUrl}
            allow="autoplay"
            loading="lazy"
          />
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
