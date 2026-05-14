import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { ShowItem } from "@/components/ui/ShowItem";
import { partitionShows } from "@/content/shows";

export function Shows() {
  const t = useTranslations("shows");
  const { upcoming, past } = partitionShows();

  return (
    <section id="shows" className="border-t border-steel/20 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl">{t("heading")}</h2>
        </Reveal>

        <div className="mt-12">
          <h3 className="text-xs uppercase tracking-widest text-text-muted">{t("upcoming")}</h3>
          {upcoming.length > 0 ? (
            <ul className="mt-4">
              {upcoming.map((s) => (
                <ShowItem key={s.id} show={s} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-text-muted">{t("noUpcoming")}</p>
          )}
        </div>

        {past.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xs uppercase tracking-widest text-text-muted">{t("past")}</h3>
            <ul className="mt-4">
              {past.map((s) => (
                <ShowItem key={s.id} show={s} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
