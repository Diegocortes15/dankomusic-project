// Shows.jsx — 02 SHOWS. Row-list design (date · venue · address · tickets).
// Upcoming/Completed status auto-computed from today's date (data.js).
// Section shows max 5 per tab; "ver todos" opens the full list page in a new tab.

const SHOWS_MAX = 5;

function fmtShowDate(iso, lang) {
  const d = new Date(iso + 'T00:00:00');
  const monthsEs = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const monthsEn = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  const m = (lang === 'en' ? monthsEn : monthsEs)[d.getMonth()];
  return { day: String(d.getDate()).padStart(2, '0'), mon: m.toUpperCase(), year: d.getFullYear() };
}

function venueCity(address) {
  if (!address) return null;
  const parts = address.split(',').map((s) => s.trim());
  return parts[parts.length - 1] || null;
}

function ShowRow({ event, lang, isNext }) {
  const v = VENUES[event.venue];
  const status = eventStatus(event.date);
  const f = fmtShowDate(event.date, lang);
  const city = v ? venueCity(v.address) : null;
  const venueLabel = v ? v.name : (lang === 'en' ? 'Private party' : 'Fiesta privada');
  const ticketMsg = event.featured
    ? (lang === 'en'
        ? 'Hello, I\u2019m interested in tickets for Dankø\u2019s June 14, 2026 event.'
        : 'Hola, estoy interesado en entradas para el evento de Dankø del 14 de junio de 2026.')
    : t('wa.general', lang);

  return (
    <Reveal className={`show ${isNext ? 'show--next' : ''} show--${status}`}>
      <div className="show__date">
        <span className="show__mon mono">{f.mon}</span>
        <span className="show__day">{f.day}</span>
      </div>

      <div className="show__info">
        {isNext
          ? <span className="show__nextTag mono"><span className="pulse-dot" />{t('event.upcoming', lang)}</span>
          : <span className="show__doneTag mono"><Icon name="check" size={10} />{t('event.completed', lang)}</span>}
        <div className="show__venue">{venueLabel}{city ? <span className="show__city"> · {city}</span> : null}</div>
        <div className="show__meta">{event[lang === 'en' ? 'descEn' : 'descEs']}</div>
        {v && v.address ? (
          <button className="show__addr" onClick={() => window.open(mapsLink(v.address), '_blank', 'noopener')}>
            <Icon name="map-pin" size={13} />
            <span className="show__addr-text">{v.address}</span>
            <span className="show__addr-hint mono">{t('venue.open', lang)} <Icon name="external" size={11} /></span>
          </button>
        ) : null}
      </div>

      <div className="show__cta-wrap">
        {status === 'upcoming'
          ? <a className="show__cta" href={waLink(ticketMsg)} target="_blank" rel="noopener"><Icon name="ticket" size={14} /> {t('cta.tickets', lang)}</a>
          : <span className="show__sold mono">{t('event.completed', lang)}</span>}
      </div>
    </Reveal>
  );
}

function Shows({ lang }) {
  const [tab, setTab] = React.useState('upcoming');

  const upcoming = EVENTS.filter((e) => eventStatus(e.date) === 'upcoming')
    .sort((a, b) => a.date.localeCompare(b.date));            // soonest first
  const past = EVENTS.filter((e) => eventStatus(e.date) === 'completed')
    .sort((a, b) => b.date.localeCompare(a.date));            // most recent first

  const rows = tab === 'upcoming' ? upcoming : past;
  const visible = rows.slice(0, SHOWS_MAX);
  const hasMore = rows.length > SHOWS_MAX || (tab === 'upcoming' ? past.length : upcoming.length) > 0;

  return (
    <section id="shows" className="section section--dark grain shows">
      <Reveal><SectionStarter num={2} total={4} title="SHOWS" lede={t('shows.lede', lang)} /></Reveal>

      <Reveal className="shows__tabs" delay={80}>
        <button className={`shows__tab ${tab === 'upcoming' ? 'is-active' : ''}`} onClick={() => setTab('upcoming')}>
          {t('shows.upcoming', lang)} <span className="shows__count mono">{upcoming.length}</span>
        </button>
        <button className={`shows__tab ${tab === 'past' ? 'is-active' : ''}`} onClick={() => setTab('past')}>
          {t('shows.past', lang)} <span className="shows__count mono">{past.length}</span>
        </button>
      </Reveal>

      <div className="shows__list">
        {visible.length
          ? visible.map((e, i) => (
              <ShowRow key={e.id} event={e} lang={lang} isNext={tab === 'upcoming' && i === 0} />
            ))
          : <div className="shows__empty mono">{t('shows.empty', lang)}</div>}
      </div>

      <Reveal className="shows__footer" delay={120}>
        {rows.length > SHOWS_MAX
          ? <span className="shows__more-note mono">{t('shows.showing', lang).replace('{n}', SHOWS_MAX).replace('{total}', rows.length)}</span>
          : null}
        <a className="btn btn--ghost shows__all" href="all-shows.html" target="_blank" rel="noopener">
          {t('shows.viewAll', lang)} <Icon name="arrow-up-right" size={16} />
        </a>
      </Reveal>

      <Reveal className="journey__growth" delay={140}>
        <span className="journey__growth-mark">“</span>
        <p>{t('journey.growth', lang)}</p>
        <span className="journey__growth-by mono">DROP V BOOKING · RESIDENT</span>
      </Reveal>
    </section>
  );
}

window.Shows = Shows;
