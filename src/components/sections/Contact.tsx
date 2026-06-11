import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import {
  EMAIL,
  INSTAGRAM_URL,
  INSTAGRAM_USER,
  WHATSAPP_DISPLAY,
  mailto,
  waLink,
} from "@/config/site";

export function Contact() {
  const t = useTranslations("contact");
  const tCta = useTranslations("cta");
  const tWa = useTranslations("wa");

  return (
    <section id="contact" className="section contact">
      <Reveal>
        <SectionStarter num={5} total={4} title={t("title")} lede={t("lede")} />
      </Reveal>

      <div className="contact__cards">
        <Reveal
          delay={80}
          as="a"
          className="contact-card contact-card--wa"
          href={waLink(tWa("general"))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-card__icon">
            <Icon name="whatsapp" size={26} />
          </span>
          <Eyebrow className="contact-card__label">WHATSAPP</Eyebrow>
          <span className="contact-card__value">{WHATSAPP_DISPLAY}</span>
          <span className="contact-card__cta">
            {tCta("whatsapp")} <Icon name="chevron-right" size={16} />
          </span>
        </Reveal>

        <Reveal delay={160} as="a" className="contact-card" href={mailto("[Booking] Dankø")}>
          <span className="contact-card__icon">
            <Icon name="mail" size={24} />
          </span>
          <Eyebrow className="contact-card__label">EMAIL</Eyebrow>
          <span className="contact-card__value contact-card__value--sm">{EMAIL}</span>
          <span className="contact-card__cta">
            {tCta("email")} <Icon name="chevron-right" size={16} />
          </span>
        </Reveal>

        <Reveal
          delay={240}
          as="a"
          className="contact-card"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-card__icon">
            <Icon name="instagram" size={24} />
          </span>
          <Eyebrow className="contact-card__label">INSTAGRAM</Eyebrow>
          <span className="contact-card__value">@{INSTAGRAM_USER}</span>
          <span className="contact-card__cta">
            {tCta("follow")} <Icon name="external" size={15} />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
