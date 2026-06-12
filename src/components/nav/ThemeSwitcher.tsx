"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import {
  DEFAULT_THEME,
  THEMES,
  THEME_STORAGE_KEY,
  isThemeId,
  type ThemeId,
} from "@/config/themes";

function readInitialTheme(): ThemeId {
  // Server: return the default. Client: read whatever <html data-theme> was
  // pre-set by the inline head script (see [locale]/layout.tsx).
  if (typeof document === "undefined") return DEFAULT_THEME;
  const attr = document.documentElement.getAttribute("data-theme");
  return isThemeId(attr) ? attr : DEFAULT_THEME;
}

/** Custom event broadcast on every theme change so other components
 * (e.g. the SoundCloud embed) can react and recolour live. */
export const THEME_CHANGE_EVENT = "danko-theme-change";

function applyTheme(id: ThemeId): void {
  document.documentElement.setAttribute("data-theme", id);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    /* storage unavailable — silently no-op */
  }
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { id } }));
}

/**
 * 6-theme accent switcher. Persists choice to localStorage. The HTML head
 * runs an inline script (see locale layout) to apply the saved theme before
 * first paint to avoid an accent flash.
 */
export function ThemeSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [active, setActive] = useState<ThemeId>(readInitialTheme);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(".theme-switch")) return;
      setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [open]);

  const choose = (id: ThemeId) => {
    setActive(id);
    applyTheme(id);
  };
  const activeTheme = THEMES.find((t) => t.id === active) ?? THEMES[0]!;
  const isEnglish = locale === "en";

  return (
    <div className={`theme-switch ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="theme-switch__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("switchTheme")}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span
          className="theme-switch__current"
          style={{ background: activeTheme.swatch }}
        />
        <Icon name="palette" size={16} />
      </button>
      <div className="theme-switch__panel" role="menu">
        <div className="theme-switch__title mono">{isEnglish ? "THEME" : "TEMA"}</div>
        <div className="theme-switch__dots">
          {THEMES.map((theme) => {
            const isActive = active === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                className={`theme-switch__dot ${isActive ? "is-active" : ""}`}
                style={{ "--dot": theme.swatch } as CSSProperties}
                onClick={() => choose(theme.id)}
                title={isEnglish ? theme.labelEn : theme.labelEs}
              >
                <span
                  className="theme-switch__dot-fill"
                  style={{ background: theme.swatch }}
                />
              </button>
            );
          })}
        </div>
        <div className="theme-switch__name">
          {isEnglish ? activeTheme.labelEn : activeTheme.labelEs}
        </div>
      </div>
    </div>
  );
}
