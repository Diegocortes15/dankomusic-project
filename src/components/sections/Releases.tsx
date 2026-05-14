import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { ReleaseCard } from "@/components/ui/ReleaseCard";
import { upcomingReleases } from "@/content/releases";

export function Releases() {
  const t = useTranslations("releases");
  const items = upcomingReleases();

  if (items.length === 0) return null;

  return (
    <section id="releases" className="border-t border-steel/20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-text-muted">{t("heading")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">{t("heading")}</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <Reveal key={r.id}>
              <ReleaseCard release={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
