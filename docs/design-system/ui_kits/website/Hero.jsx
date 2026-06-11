// Hero.jsx — identity-first hero: name, slogan, genres, SoundCloud + WhatsApp CTAs, featured-event banner.
// Entrance handled by <Reveal> (capture-safe), not CSS load-animations.

function Hero({ lang, onJump }) {
  const photoRef = React.useRef(null);
  useParallax(photoRef, 0.08);

  const letters = ['D', 'A', 'N', 'K', 'Ø'];
  const featured = EVENTS.find((e) => e.featured);
  const fDate = new Date(featured.date + 'T00:00:00');
  const months = lang === 'en'
    ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    : ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const dateLabel = `${fDate.getDate()} ${months[fDate.getMonth()]} ${fDate.getFullYear()}`;

  return (
    <section id="top" className="hero">
      <div className="hero__photo-wrap">
        <div className="hero__photo" ref={photoRef} />
      </div>
      <div className="hero__protection" />
      <div className="hero__glow" />

      <div className="hero__content">
        <Reveal><Eyebrow>{t('hero.eyebrow', lang)}</Eyebrow></Reveal>
        <Reveal delay={60}>
          <h1 className="hero__name" aria-label="Dankø">
            {letters.map((ch, i) => (
              <span key={i} className={`hero__name__char${ch === 'Ø' ? ' hero__o' : ''}`}>{ch}</span>
            ))}
          </h1>
        </Reveal>

        <Reveal delay={140} as="p" className="hero__slogan">{SLOGANS.primary[lang]}</Reveal>

        <Reveal delay={200} className="hero__genres">
          {GENRES.map((g) => <span key={g} className="genre-chip">{g}</span>)}
        </Reveal>

        <Reveal delay={260} className="hero__ctas">
          <Button variant="primary" href={SOUNDCLOUD_URL}>
            <Icon name="soundcloud" size={16} /> {t('cta.soundcloud', lang)}
          </Button>
          <Button variant="ghost" href={waLink(t('wa.general', lang))}>
            <Icon name="whatsapp" size={16} /> {t('cta.whatsapp', lang)}
          </Button>
        </Reveal>

        <Reveal delay={320} as="a" className="hero__event"
          href="#shows"
          onClick={(e) => { e.preventDefault(); onJump('shows'); }}
        >
          <span className="hero__event-badge mono">{t('event.next', lang)}</span>
          <span className="hero__event-date mono">{dateLabel}</span>
          <span className="hero__event-sep">·</span>
          <span className="hero__event-venue">SOLARTE HOSTEL, CUNDINAMARCA</span>
          <Icon name="chevron-right" size={16} />
        </Reveal>
      </div>

      <button className="hero__scroll" onClick={() => onJump('bio')} aria-label="Scroll down">
        <span>{t('hero.scroll', lang)}</span>
        <Icon name="arrow-down" size={14} />
      </button>
      <div className="hero__corner hero__corner--tl">DK · 2026</div>
      <div className="hero__corner hero__corner--br">125—140 BPM</div>
    </section>
  );
}

window.Hero = Hero;
