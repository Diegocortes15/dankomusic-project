import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";
import { Icon } from "@/components/ui/Icon";
import { SLOGANS, STATS } from "@/config/slogans";

export function Bio() {
  const t = useTranslations("bio");
  const tStat = useTranslations("stat");
  const locale = useLocale() as "es" | "en";

  return (
    <section id="bio" className="section bio">
      <Reveal>
        <SectionStarter
          num={1}
          total={5}
          title={t("title")}
          lede={SLOGANS.alt[0]?.[locale]}
        />
      </Reveal>

      <div className="bio__grid">
        <Reveal delay={120} className="bio__copy">
          <p className="bio__lead">{t("body")}</p>
        </Reveal>
        <Reveal as="aside" delay={200} className="bio__photo">
          <Image
            src="/assets/danko_mezclando_2.jpeg"
            alt="Dankø"
            fill
            sizes="(max-width: 980px) 100vw, 40vw"
          />
          <span className="bio__photo-tag mono">{t("tag")}</span>
        </Reveal>
      </div>

      <div className="stats">
        {STATS.map((s, i) => {
          const suffix = "suffix" in s ? s.suffix[locale] : null;
          return (
            <Reveal key={s.labelKey} delay={i * 90} className="stat-card">
              <div className="stat-card__top">
                <span className="stat-card__icon">
                  <Icon name={s.icon} size={18} />
                </span>
                <span className="stat-card__label mono">{tStat(s.labelKey.replace("stat.", ""))}</span>
              </div>
              <div className="stat-card__value">
                {s.value}
                {suffix ? <span className="stat-card__suffix">{suffix}</span> : null}
              </div>
              <div className="stat-card__bar">
                <span />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
