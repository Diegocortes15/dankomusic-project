// Bio.jsx — 01 ABOUT. New artist description + futuristic stat cards.

function Bio({ lang }) {
  const stats = [
    { v: '11',       label: t('stat.sets', lang),       icon: 'sliders' },
    { v: '125—140',  label: t('stat.bpm', lang),        icon: 'volume', suffix: 'BPM' },
    { v: '4',        label: t('stat.exp', lang),        icon: 'clock', suffix: lang === 'en' ? 'YEARS' : 'AÑOS' },
  ];

  return (
    <section id="bio" className="section bio">
      <Reveal><SectionStarter num={1} total={4} title={lang === 'en' ? 'ABOUT' : 'PERFIL'} lede={SLOGANS.alt[0][lang]} /></Reveal>
      <div className="bio__grid">
        <Reveal delay={120} className="bio__copy">
          <p className="bio__lead">{t('bio.body', lang)}</p>
        </Reveal>
        <Reveal as="aside" delay={200} className="bio__photo">
          <img src="../../assets/photos/danko_mezclando_2.jpeg" alt="Dankø" />
          <span className="bio__photo-tint" aria-hidden="true"></span>
          <span className="bio__photo-glow" aria-hidden="true"></span>
          <span className="bio__photo-tag mono">BOGOTÁ · CO</span>
        </Reveal>
      </div>

      <div className="stats">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 90} className="stat-card">
            <div className="stat-card__top">
              <span className="stat-card__icon"><Icon name={s.icon} size={18} /></span>
              <span className="stat-card__label mono">{s.label}</span>
            </div>
            <div className="stat-card__value">
              {s.v}{s.suffix ? <span className="stat-card__suffix">{s.suffix}</span> : null}
            </div>
            <div className="stat-card__bar"><span /></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

window.Bio = Bio;
