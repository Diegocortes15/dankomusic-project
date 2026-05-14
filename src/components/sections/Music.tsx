import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SoundCloudEmbed } from "@/components/ui/SoundCloudEmbed";
import { featuredSet, moreSets } from "@/content/sets";

export function Music() {
  const t = useTranslations("music");

  return (
    <section id="music" className="border-t border-steel/20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-text-muted">{t("heading")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">{t("featured")}</h2>
        </Reveal>

        {featuredSet ? (
          <Reveal delay={0.1}>
            <div className="mt-10">
              <SoundCloudEmbed
                url={featuredSet.soundcloudUrl}
                title={featuredSet.title}
                size="lg"
              />
            </div>
          </Reveal>
        ) : null}

        {moreSets.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <h3 className="font-display text-2xl text-text-muted">{t("more")}</h3>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {moreSets.map((s) => (
                <Reveal key={s.soundcloudUrl}>
                  <SoundCloudEmbed url={s.soundcloudUrl} title={s.title} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
