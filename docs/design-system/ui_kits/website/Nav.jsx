// Nav.jsx — fixed top nav: logo, section links, ES/EN, theme switcher, WhatsApp CTA.

function Nav({ lang, setLang, active, onJump }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'bio',     key: 'nav.bio' },
    { id: 'shows',   key: 'nav.shows' },
    { id: 'gallery', key: 'nav.gallery' },
    { id: 'music',   key: 'nav.music' },
    { id: 'contact', key: 'nav.contact' },
  ];

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="nav__logo" href="#top" onClick={(e) => { e.preventDefault(); onJump('top'); }} aria-label="Dankø home">
        <img src="../../assets/logo/danko_logo.jpeg" alt="" />
      </a>
      <div className="nav__links">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={`nav__link ${active === it.id ? 'is-active' : ''}`}
            onClick={(e) => { e.preventDefault(); onJump(it.id); }}
          >{t(it.key, lang)}</a>
        ))}
      </div>
      <div className="nav__lang">
        <button onClick={() => setLang('es')} className={lang === 'es' ? 'is-active' : ''}>ES</button>
        <span>/</span>
        <button onClick={() => setLang('en')} className={lang === 'en' ? 'is-active' : ''}>EN</button>
      </div>
      <ThemeSwitcher lang={lang} />
      <a className="btn btn--primary nav__book" href={waLink(t('wa.general', lang))} aria-label="WhatsApp">
        <Icon name="whatsapp" size={15} />
        <span className="nav__book-label">{t('nav.contact', lang)}</span>
      </a>
    </nav>
  );
}

window.Nav = Nav;
