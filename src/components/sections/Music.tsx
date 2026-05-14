import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionStarter } from "@/components/ui/SectionStarter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SOUNDCLOUD_PROFILE, featuredTrack, moreTracks } from "@/content/sets";
import { formatTrackDate } from "@/content/util";
import type { Track } from "@/content/types";

type SupportedLocale = "es" | "en";

function FeaturedTrack({ track }: { track: Track }) {
  const t = useTranslations("music");
  const locale = useLocale() as SupportedLocale;
  return (
    <article className="music__featured">
      <a
        className="music__featured-art"
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ backgroundImage: `url(${track.art})` }}
      >
        <div className="music__featured-play" aria-hidden="true">
          <Icon name="play" size={28} />
        </div>
      </a>
      <div className="music__featured-meta">
        <Eyebrow style={{ marginBottom: 14 }}>
          {t("latest")} · {formatTrackDate(track.date, locale)}
        </Eyebrow>
        <h2 className="music__featured-title">{track.title}</h2>
        <div className="music__featured-sub mono">
          {track.tag.toUpperCase()} · {track.plays.toLocaleString()} {t("plays")} · {track.likes}{" "}
          {t("likes")}
        </div>
        <div className="music__featured-cta">
          <Button variant="primary" href={track.url}>
            <Icon name="play" size={16} /> {t("playOnSC")}
          </Button>
          <Button variant="ghost" href={SOUNDCLOUD_PROFILE}>
            <Icon name="soundcloud" size={16} /> {t("listenSC")}
          </Button>
        </div>
      </div>
    </article>
  );
}

function TrackCard({ track }: { track: Track }) {
  const locale = useLocale() as SupportedLocale;
  return (
    <a className="track-card" href={track.url} target="_blank" rel="noopener noreferrer">
      <div className="track-card__art" style={{ backgroundImage: `url(${track.art})` }}>
        <div className="track-card__play" aria-hidden="true">
          <Icon name="play" size={18} />
        </div>
        <div className="track-card__tag mono">{track.tag.toUpperCase()}</div>
      </div>
      <div className="track-card__meta">
        <div className="track-card__date mono">{formatTrackDate(track.date, locale)}</div>
        <h3 className="track-card__title">{track.title}</h3>
        <div className="track-card__stats mono">
          <span>
            <Icon name="play" size={11} /> {track.plays.toLocaleString()}
          </span>
          <span>
            <Icon name="heart" size={11} /> {track.likes}
          </span>
        </div>
      </div>
    </a>
  );
}

export function Music() {
  const t = useTranslations("music");

  return (
    <section id="music" className="section section--dark music">
      <Reveal>
        <SectionStarter num={2} total={6} title={t("title")} lede={t("lede")} />
      </Reveal>

      {featuredTrack ? (
        <Reveal delay={100}>
          <FeaturedTrack track={featuredTrack} />
        </Reveal>
      ) : null}

      <div className="music__grid">
        {moreTracks.map((track, i) => (
          <Reveal key={track.id} delay={i * 80}>
            <TrackCard track={track} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="music__viewall">
        <a
          className="music__viewall-link"
          href={SOUNDCLOUD_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("viewAll")} <Icon name="arrow-up-right" size={16} />
        </a>
      </Reveal>
    </section>
  );
}
