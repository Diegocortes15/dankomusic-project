// SoundCloud.jsx — 04 MUSIC. Primary platform: large section before footer with embed + CTA.

function SoundCloud({ lang }) {
  // SoundCloud HTML5 widget for the artist profile (latest tracks).
  const embed = 'https://w.soundcloud.com/player/?url=' +
    encodeURIComponent(SOUNDCLOUD_URL) +
    '&color=%232f7bff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true';

  return (
    <section id="music" className="section section--accent soundcloud">
      <div className="soundcloud__halo" />
      <Reveal><SectionStarter num={4} total={4} title="SOUNDCLOUD" lede={t('sc.lede', lang)} /></Reveal>

      <Reveal delay={120} className="soundcloud__player">
        <iframe
          title="Dankø on SoundCloud"
          width="100%" height="420" scrolling="no" frameBorder="no" allow="autoplay"
          src={embed}
        />
      </Reveal>

      <Reveal delay={180} className="soundcloud__cta-row">
        <Button variant="primary" href={SOUNDCLOUD_URL}>
          <Icon name="soundcloud" size={18} /> {t('cta.soundcloud', lang)}
        </Button>
        <span className="soundcloud__handle mono">@daniel-beltran-101291848</span>
      </Reveal>
    </section>
  );
}

window.SoundCloud = SoundCloud;
