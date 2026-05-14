import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

const BOOKING_EMAIL = "booking@dankomusic.com"; // placeholder — replace with real email
const INSTAGRAM_URL = "https://www.instagram.com/danko_d.j/";
const SOUNDCLOUD_URL = "https://soundcloud.com/daniel-beltran-101291848";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="border-t border-steel/20 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl">{t("heading")}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-8 text-text-muted">{t("bookingLead")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href={`mailto:${BOOKING_EMAIL}`}
            className="mt-6 inline-block border border-silver px-8 py-4 font-display text-xl uppercase tracking-widest hover:bg-silver hover:text-base transition-colors"
            aria-label={t("emailLabel")}
          >
            {BOOKING_EMAIL}
          </a>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-16 text-xs uppercase tracking-[0.3em] text-text-muted">
            {t("follow")}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <ul className="mt-4 flex justify-center gap-8 text-sm">
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver hover:text-text transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={SOUNDCLOUD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver hover:text-text transition-colors"
              >
                SoundCloud
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
