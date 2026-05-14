import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

type Photo = { src: string; alt: string; aspect: "square" | "tall" | "wide" };

const photos: Photo[] = [
  { src: "/assets/danko_radioberlin_club_1.jpeg", alt: "Radio Berlin Club, Bogotá", aspect: "wide" },
  { src: "/assets/danko_mezclando_1.jpeg", alt: "Danko mixing", aspect: "tall" },
  { src: "/assets/danko_b2b_brandon_1.jpeg", alt: "B2B with Brandon", aspect: "square" },
  { src: "/assets/danko_core_medellin.jpeg", alt: "CORE Medellín", aspect: "wide" },
  { src: "/assets/danko_radioberlin_club_2.jpeg", alt: "Radio Berlin Club crowd", aspect: "tall" },
  { src: "/assets/danko_meaclando_2.jpeg", alt: "Danko mixing", aspect: "square" },
  { src: "/assets/danko_b2b_brandon_2.jpeg", alt: "B2B with Brandon", aspect: "wide" },
  { src: "/assets/danko_practice.jpeg", alt: "Practice session", aspect: "square" },
];

const aspectClass: Record<Photo["aspect"], string> = {
  square: "aspect-square",
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
};

export function Gallery() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="border-t border-steel/20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl">{t("heading")}</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {photos.map((p) => (
            <Reveal key={p.src} className={`relative overflow-hidden ${aspectClass[p.aspect]}`}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
