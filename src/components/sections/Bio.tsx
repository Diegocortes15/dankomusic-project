import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";

const STATS = [
  { value: "142", labelKey: "stat1Label" },
  { value: "24", labelKey: "stat2Label" },
  { value: "11", labelKey: "stat3Label" },
  { value: "BOG", labelKey: "stat4Label" },
] as const;

export function Bio() {
  const t = useTranslations("bio");
  return (
    <section id="bio" className="section bio">
      <Reveal>
        <SectionStarter num={1} total={6} title={t("title")} lede={t("lede")} />
      </Reveal>
      <div className="bio__grid">
        <Reveal delay={120} className="bio__copy">
          <p>{t("body1")}</p>
          <p>{t("body2")}</p>
        </Reveal>
        <Reveal as="aside" delay={200} className="bio__photo">
          <Image
            src="/assets/danko_mezclando_2.jpeg"
            alt="Dankø at the decks"
            fill
            sizes="(max-width: 860px) 100vw, 40vw"
            className="bio__photo-img"
          />
        </Reveal>
      </div>
      <div className="bio__stats">
        {STATS.map((s, i) => (
          <Reveal key={s.labelKey} delay={i * 80} className="bio__stat">
            <div className="bio__stat-v">{s.value}</div>
            <div className="bio__stat-l">{t(s.labelKey)}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
