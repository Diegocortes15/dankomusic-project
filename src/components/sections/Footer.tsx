import Image from "next/image";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { COORDS, INSTAGRAM_URL, SOUNDCLOUD_URL, mailto, waLink } from "@/config/site";

export function Footer() {
  const t = useTranslations("footer");
  const tWa = useTranslations("wa");
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__left">
        <Image
          src="/assets/danko_logo.jpeg"
          alt=""
          width={40}
          height={40}
          className="footer__logo"
        />
        <div>
          <div className="footer__name">
            DANK<span className="footer__o">Ø</span>
          </div>
          <div className="footer__tag mono">{t("tag")}</div>
        </div>
      </div>

      <div className="footer__socials">
        <a
          className="footer__social footer__social--primary"
          href={SOUNDCLOUD_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SoundCloud"
        >
          <Icon name="soundcloud" size={18} />
        </a>
        <a
          className="footer__social"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Icon name="instagram" size={18} />
        </a>
        <a
          className="footer__social"
          href={waLink(tWa("general"))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <Icon name="whatsapp" size={18} />
        </a>
        <a
          className="footer__social"
          href={mailto()}
          aria-label="Email"
        >
          <Icon name="mail" size={18} />
        </a>
      </div>

      <div className="footer__rights mono">
        <div>{t("rights", { year })}</div>
        <div>
          {t("built")} · {COORDS}
        </div>
      </div>
    </footer>
  );
}
