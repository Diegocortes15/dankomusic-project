import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SOUNDCLOUD_URL, SOUNDCLOUD_HANDLE } from "@/config/site";

function buildEmbedUrl(): string {
  // Accent color is hard-coded to the brand blue here; the embed iframe lives
  // outside the CSS variable scope, so we can't read --accent at build time.
  const params = new URLSearchParams({
    url: SOUNDCLOUD_URL,
    color: "#2f7bff",
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    show_teaser: "false",
    visual: "true",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

export function SoundCloud() {
  const t = useTranslations("sc");
  const tCta = useTranslations("cta");

  return (
    <section id="music" className="section section--accent soundcloud">
      <div className="soundcloud__halo" />
      <Reveal>
        <SectionStarter num={4} total={4} title={t("title")} lede={t("lede")} />
      </Reveal>

      <Reveal delay={120} className="soundcloud__player">
        <iframe
          title="Dankø on SoundCloud"
          src={buildEmbedUrl()}
          width="100%"
          height={420}
          allow="autoplay"
          loading="lazy"
        />
      </Reveal>

      <Reveal delay={180} className="soundcloud__cta-row">
        <Button variant="primary" href={SOUNDCLOUD_URL} target="_blank" rel="noopener noreferrer">
          <Icon name="soundcloud" size={18} />
          {tCta("soundcloud")}
        </Button>
        <span className="soundcloud__handle mono">{SOUNDCLOUD_HANDLE}</span>
      </Reveal>
    </section>
  );
}
