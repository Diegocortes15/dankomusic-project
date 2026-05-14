import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const BOOKING_EMAIL = "bookings@danko.dj";
const INSTAGRAM_URL = "https://instagram.com/danko_d.j";
const INSTAGRAM_HANDLE = "@danko_d.j";
const SOUNDCLOUD_URL = "https://soundcloud.com/daniel-beltran-101291848/tracks";

export function Contact() {
  const t = useTranslations("contact");
  const mailto = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent("[Booking] Dankø")}`;

  return (
    <section id="contact" className="section contact">
      <Reveal>
        <SectionStarter num={6} total={6} title={t("title")} lede={t("lede")} />
      </Reveal>

      <div className="contact__hero">
        <Reveal delay={120} className="contact__hero-meta">
          <Eyebrow>{t("directBooking")}</Eyebrow>
          <a className="contact__email-display mono" href={mailto}>
            {BOOKING_EMAIL}
          </a>
          <p className="contact__hero-note">{t("emailNote")}</p>
          <Button variant="primary" href={mailto}>
            <Icon name="mail" size={16} /> {t("emailCta")}
          </Button>
          <div className="contact__deferred mono">{t("formDeferred")}</div>
        </Reveal>

        <Reveal as="aside" delay={200} className="contact__direct">
          <Eyebrow style={{ marginBottom: 16 }}>{t("direct")}</Eyebrow>
          <ul className="contact__channels">
            <li>
              <Icon name="instagram" size={16} />
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>
              <Icon name="soundcloud" size={16} />
              <a href={SOUNDCLOUD_URL} target="_blank" rel="noopener noreferrer">
                soundcloud / danko
              </a>
            </li>
            <li>
              <Icon name="map-pin" size={16} />
              <span>Bogotá, CO · world-touring</span>
            </li>
          </ul>
          <div className="contact__rate mono">{t("rate")}</div>
        </Reveal>
      </div>
    </section>
  );
}
