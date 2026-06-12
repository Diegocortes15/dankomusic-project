"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { THEMES, type ThemeId } from "@/config/themes";
import { applyTheme, useActiveThemeId } from "@/lib/theme-state";

/**
 * 6-theme accent switcher. Persists choice to localStorage. The HTML head
 * runs an inline script (see locale layout) to apply the saved theme before
 * first paint to avoid an accent flash. State lives in `@/lib/theme-state`
 * so SSR/client snapshots stay in sync via `useSyncExternalStore`.
 */
export function ThemeSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const active = useActiveThemeId();
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

  const choose = (id: ThemeId) => applyTheme(id);
  const activeTheme = THEMES.find((entry) => entry.id === active) ?? THEMES[0]!;
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
