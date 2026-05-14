import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";
import { galleryShots } from "@/content/gallery";

export function Gallery() {
  const t = useTranslations("gallery");
  return (
    <section id="gallery" className="section section--dark gallery">
      <Reveal>
        <SectionStarter num={5} total={6} title={t("title")} lede={t("lede")} />
      </Reveal>
      <div className="gallery__grid">
        {galleryShots.map((s, i) => (
          <Reveal
            key={s.src}
            as="a"
            delay={i * 50}
            href={s.src}
            className={`g-tile${s.span ? ` g-tile--${s.span}` : ""}`}
            style={{ backgroundImage: `url(${s.src})` }}
          >
            <span className="g-tile__cap">
              <span className="g-tile__meta mono">{s.meta}</span>
              {s.cap}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
