import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";
import { Icon, type IconName } from "@/components/ui/Icon";
import { upcomingReleases } from "@/content/releases";
import { formatLongDate } from "@/content/util";
import type { Release, PresaveLink } from "@/content/types";

type SupportedLocale = "es" | "en";

function presaveIconName(id: PresaveLink["id"]): IconName {
  // Apple Music + Beatport have no Lucide icons; reuse "volume" as a stand-in
  // (the kit does the same for beatport).
  if (id === "beatport" || id === "apple") return "volume";
  return id;
}

function ReleaseCard({ release, index }: { release: Release; index: number }) {
  const t = useTranslations("releases");
  const locale = useLocale() as SupportedLocale;
  return (
    <article className="release">
      <div className="release__num mono">{String(index).padStart(2, "0")}</div>
      <div className="release__art" style={{ backgroundImage: `url(${release.artwork})` }}>
        <div className="release__date mono">{formatLongDate(release.releaseDate, locale)}</div>
      </div>
      <div className="release__meta">
        {release.label ? <div className="release__label mono">{release.label}</div> : null}
        <h3 className="release__title">{release.title}</h3>
        {release.presave.length > 0 ? (
          <div className="release__presave-row">
            <span className="release__presave-lbl mono">{t("presave")}</span>
            <div className="release__presave-links">
              {release.presave.map((p) => (
                <a
                  key={p.id}
                  className="release__presave"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.label}
                >
                  <Icon name={presaveIconName(p.id)} size={14} /> {p.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function Releases() {
  const t = useTranslations("releases");
  const items = upcomingReleases();
  if (items.length === 0) return null;

  return (
    <section id="releases" className="section section--dark releases">
      <Reveal>
        <SectionStarter num={3} total={6} title={t("title")} lede={t("lede")} />
      </Reveal>
      <div className="releases__grid">
        {items.map((r, i) => (
          <Reveal key={r.id} delay={i * 100}>
            <ReleaseCard release={r} index={i + 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
