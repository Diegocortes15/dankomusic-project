import Image from "next/image";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";

const INSTAGRAM_URL = "https://instagram.com/danko_d.j";
const SOUNDCLOUD_URL = "https://soundcloud.com/daniel-beltran-101291848/tracks";

export function Footer() {
  const t = useTranslations("footer");
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
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Icon name="instagram" size={18} />
        </a>
        <a href={SOUNDCLOUD_URL} target="_blank" rel="noopener noreferrer" aria-label="SoundCloud">
          <Icon name="soundcloud" size={18} />
        </a>
      </div>

      <div className="footer__rights mono">
        <div>{t("rights", { year })}</div>
        <div>{t("built")} · 04°35′N 74°04′W</div>
      </div>
    </footer>
  );
}
