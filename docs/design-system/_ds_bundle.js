/* @ds-bundle: {"format":3,"namespace":"DJDankoDesignSystem_019e25","components":[],"sourceHashes":{"ui_kits/website/App.jsx":"d7d2e3de979f","ui_kits/website/Bio.jsx":"d59e0f2143be","ui_kits/website/Contact.jsx":"d0de740abb33","ui_kits/website/Footer.jsx":"78b9050cfe8e","ui_kits/website/Gallery.jsx":"600914cfed15","ui_kits/website/Hero.jsx":"9618e1a6beab","ui_kits/website/Nav.jsx":"13b083e66b47","ui_kits/website/Shows.jsx":"7778968297fe","ui_kits/website/SoundCloud.jsx":"7bb3752c0161","ui_kits/website/data.js":"2bd3d6c6f869","ui_kits/website/i18n.js":"dff7f89241e6","ui_kits/website/motion.jsx":"2d629b7d4a4d","ui_kits/website/themes.js":"53d044257ce5","ui_kits/website/ui.jsx":"66c44d34dd04"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DJDankoDesignSystem_019e25 = window.DJDankoDesignSystem_019e25 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/website/App.jsx
try { (() => {
// App.jsx — top-level shell. Language + active-section tracking.

function App() {
  const [lang, setLang] = React.useState('es');
  const [active, setActive] = React.useState('bio');
  React.useEffect(() => {
    const ids = ['top', 'bio', 'shows', 'gallery', 'music', 'contact'];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id === 'top' ? 'bio' : e.target.id);
      });
    }, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0
    });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Dismiss the preloader once the app has painted (min ~900ms so it reads).
  React.useEffect(() => {
    const start = window.__dankoStart || performance.now();
    const wait = Math.max(0, 900 - (performance.now() - start));
    const id = setTimeout(() => {
      window.dankoHideLoader && window.dankoHideLoader();
    }, wait);
    return () => clearTimeout(id);
  }, []);
  const onJump = id => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY - 56,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BackgroundFX, null), /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement(Nav, {
    lang: lang,
    setLang: setLang,
    active: active,
    onJump: onJump
  }), /*#__PURE__*/React.createElement(Hero, {
    lang: lang,
    onJump: onJump
  }), /*#__PURE__*/React.createElement(Bio, {
    lang: lang
  }), /*#__PURE__*/React.createElement(Shows, {
    lang: lang
  }), /*#__PURE__*/React.createElement(Gallery, {
    lang: lang
  }), /*#__PURE__*/React.createElement(SoundCloud, {
    lang: lang
  }), /*#__PURE__*/React.createElement(Contact, {
    lang: lang
  }), /*#__PURE__*/React.createElement(Footer, {
    lang: lang
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Bio.jsx
try { (() => {
// Bio.jsx — 01 ABOUT. New artist description + futuristic stat cards.

function Bio({
  lang
}) {
  const stats = [{
    v: '11',
    label: t('stat.sets', lang),
    icon: 'sliders'
  }, {
    v: '125—140',
    label: t('stat.bpm', lang),
    icon: 'volume',
    suffix: 'BPM'
  }, {
    v: '4',
    label: t('stat.exp', lang),
    icon: 'clock',
    suffix: lang === 'en' ? 'YEARS' : 'AÑOS'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "bio",
    className: "section bio"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionStarter, {
    num: 1,
    total: 4,
    title: lang === 'en' ? 'ABOUT' : 'PERFIL',
    lede: SLOGANS.alt[0][lang]
  })), /*#__PURE__*/React.createElement("div", {
    className: "bio__grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 120,
    className: "bio__copy"
  }, /*#__PURE__*/React.createElement("p", {
    className: "bio__lead"
  }, t('bio.body', lang))), /*#__PURE__*/React.createElement(Reveal, {
    as: "aside",
    delay: 200,
    className: "bio__photo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/photos/danko_mezclando_2.jpeg",
    alt: "Dank\xF8"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bio__photo-tint",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bio__photo-glow",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bio__photo-tag mono"
  }, "BOGOT\xC1 \xB7 CO"))), /*#__PURE__*/React.createElement("div", {
    className: "stats"
  }, stats.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 90,
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-card__icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "stat-card__label mono"
  }, s.label)), /*#__PURE__*/React.createElement("div", {
    className: "stat-card__value"
  }, s.v, s.suffix ? /*#__PURE__*/React.createElement("span", {
    className: "stat-card__suffix"
  }, s.suffix) : null), /*#__PURE__*/React.createElement("div", {
    className: "stat-card__bar"
  }, /*#__PURE__*/React.createElement("span", null))))));
}
window.Bio = Bio;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Bio.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
// Contact.jsx — direct contact: WhatsApp (primary), email, Instagram. No booking form.

function Contact({
  lang
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    className: "section contact"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionStarter, {
    num: "",
    total: 4,
    title: lang === 'en' ? 'CONTACT' : 'CONTACTO',
    lede: t('contact.lede', lang)
  })), /*#__PURE__*/React.createElement("div", {
    className: "contact__cards"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 80,
    as: "a",
    className: "contact-card contact-card--wa",
    href: waLink(t('wa.general', lang))
  }, /*#__PURE__*/React.createElement("span", {
    className: "contact-card__icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "whatsapp",
    size: 26
  })), /*#__PURE__*/React.createElement("span", {
    className: "contact-card__label mono"
  }, "WHATSAPP"), /*#__PURE__*/React.createElement("span", {
    className: "contact-card__value"
  }, WHATSAPP_DISPLAY), /*#__PURE__*/React.createElement("span", {
    className: "contact-card__cta"
  }, t('cta.whatsapp', lang), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160,
    as: "a",
    className: "contact-card",
    href: `mailto:${EMAIL}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "contact-card__icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 24
  })), /*#__PURE__*/React.createElement("span", {
    className: "contact-card__label mono"
  }, "EMAIL"), /*#__PURE__*/React.createElement("span", {
    className: "contact-card__value contact-card__value--sm"
  }, EMAIL), /*#__PURE__*/React.createElement("span", {
    className: "contact-card__cta"
  }, t('cta.email', lang), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 240,
    as: "a",
    className: "contact-card",
    href: INSTAGRAM_URL,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "contact-card__icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 24
  })), /*#__PURE__*/React.createElement("span", {
    className: "contact-card__label mono"
  }, "INSTAGRAM"), /*#__PURE__*/React.createElement("span", {
    className: "contact-card__value"
  }, "@", INSTAGRAM_USER), /*#__PURE__*/React.createElement("span", {
    className: "contact-card__cta"
  }, t('cta.follow', lang), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "external",
    size: 15
  })))));
}
window.Contact = Contact;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
// Footer.jsx — slim footer. Logo, name, socials (SoundCloud emphasized), contact.

function Footer({
  lang
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer__left"
  }, /*#__PURE__*/React.createElement("img", {
    className: "footer__logo",
    src: "../../assets/logo/danko_logo.jpeg",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "footer__name"
  }, "DANK", /*#__PURE__*/React.createElement("span", {
    className: "footer__o"
  }, "\xD8")), /*#__PURE__*/React.createElement("div", {
    className: "footer__tag mono"
  }, t('footer.tag', lang)))), /*#__PURE__*/React.createElement("div", {
    className: "footer__socials"
  }, /*#__PURE__*/React.createElement("a", {
    className: "footer__social footer__social--primary",
    href: SOUNDCLOUD_URL,
    target: "_blank",
    rel: "noreferrer",
    "aria-label": "SoundCloud"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "soundcloud",
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    className: "footer__social",
    href: INSTAGRAM_URL,
    target: "_blank",
    rel: "noreferrer",
    "aria-label": "Instagram"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    className: "footer__social",
    href: waLink(t('wa.general', lang)),
    "aria-label": "WhatsApp"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "whatsapp",
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    className: "footer__social",
    href: `mailto:${EMAIL}`,
    "aria-label": "Email"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "footer__rights mono"
  }, /*#__PURE__*/React.createElement("div", null, t('footer.rights', lang)), /*#__PURE__*/React.createElement("div", null, t('footer.built', lang), " \xB7 04\xB035\u2032N 74\xB004\u2032W")));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Gallery.jsx
try { (() => {
// Gallery.jsx — 03 GALLERY with in-page lightbox (esc, prev/next, swipe, click-out).

const SHOTS = [{
  src: '../../assets/photos/danko_radioberlin_1.jpeg',
  cap: 'RADIOBERLIN',
  meta: 'CHAPINERO · BOGOTÁ',
  span: 'tall'
}, {
  src: '../../assets/photos/danko_practice.jpeg',
  cap: 'STUDIO',
  meta: 'PRACTICE',
  span: 'wide'
}, {
  src: '../../assets/photos/danko_radioberlin_2.jpeg',
  cap: 'RADIOBERLIN',
  meta: 'CHAPINERO · BOGOTÁ'
}, {
  src: '../../assets/photos/danko_b2b_brandon_1.jpeg',
  cap: 'B2B · BRANDON',
  meta: 'RADIOBERLIN'
}, {
  src: '../../assets/photos/danko_b2b_brandon_2.jpeg',
  cap: 'B2B · BRANDON',
  meta: 'RADIOBERLIN',
  span: 'wide'
}, {
  src: '../../assets/photos/danko_mezclando_1.jpeg',
  cap: 'PIONEER CDJ',
  meta: 'CABINA'
}, {
  src: '../../assets/photos/danko_core_medellin.jpeg',
  cap: 'CORE',
  meta: 'MEDELLÍN',
  span: 'tall'
}, {
  src: '../../assets/photos/danko_mezclando_2.jpeg',
  cap: 'NIGHT SET',
  meta: 'BOGOTÁ'
}];
function Lightbox({
  shots,
  index,
  onClose,
  onNav,
  lang
}) {
  const touchX = React.useRef(null);
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();else if (e.key === 'ArrowRight') onNav(1);else if (e.key === 'ArrowLeft') onNav(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNav]);
  if (index == null) return null;
  const shot = shots[index];
  return /*#__PURE__*/React.createElement("div", {
    className: "lightbox",
    onClick: onClose,
    onTouchStart: e => {
      touchX.current = e.touches[0].clientX;
    },
    onTouchEnd: e => {
      if (touchX.current == null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1);
      touchX.current = null;
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "lightbox__close",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 22
  })), /*#__PURE__*/React.createElement("button", {
    className: "lightbox__nav lightbox__nav--prev",
    onClick: e => {
      e.stopPropagation();
      onNav(-1);
    },
    "aria-label": "Previous"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 28
  })), /*#__PURE__*/React.createElement("figure", {
    className: "lightbox__figure",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("img", {
    src: shot.src,
    alt: shot.cap
  }), /*#__PURE__*/React.createElement("figcaption", {
    className: "lightbox__cap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lightbox__cap-title"
  }, shot.cap), /*#__PURE__*/React.createElement("span", {
    className: "lightbox__cap-meta mono"
  }, shot.meta, " \xB7 ", index + 1, "/", shots.length))), /*#__PURE__*/React.createElement("button", {
    className: "lightbox__nav lightbox__nav--next",
    onClick: e => {
      e.stopPropagation();
      onNav(1);
    },
    "aria-label": "Next"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 28
  })));
}
function Gallery({
  lang
}) {
  const [open, setOpen] = React.useState(null);
  const nav = dir => setOpen(i => (i + dir + SHOTS.length) % SHOTS.length);
  return /*#__PURE__*/React.createElement("section", {
    id: "gallery",
    className: "section gallery"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionStarter, {
    num: 3,
    total: 4,
    title: lang === 'en' ? 'GALLERY' : 'GALERÍA',
    lede: t('gallery.lede', lang)
  })), /*#__PURE__*/React.createElement("div", {
    className: "gallery__grid"
  }, SHOTS.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    as: "button",
    delay: i * 50,
    className: `g-tile g-tile--${s.span || 'sq'}`,
    style: {
      backgroundImage: `url(${s.src})`
    },
    onClick: () => setOpen(i),
    "aria-label": `${s.cap} — open`
  }, /*#__PURE__*/React.createElement("span", {
    className: "g-tile__zoom"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    className: "g-tile__cap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "g-tile__meta mono"
  }, s.meta), s.cap)))), open != null ? /*#__PURE__*/React.createElement(Lightbox, {
    shots: SHOTS,
    index: open,
    onClose: () => setOpen(null),
    onNav: nav,
    lang: lang
  }) : null);
}
window.Gallery = Gallery;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Gallery.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
// Hero.jsx — identity-first hero: name, slogan, genres, SoundCloud + WhatsApp CTAs, featured-event banner.
// Entrance handled by <Reveal> (capture-safe), not CSS load-animations.

function Hero({
  lang,
  onJump
}) {
  const photoRef = React.useRef(null);
  useParallax(photoRef, 0.08);
  const letters = ['D', 'A', 'N', 'K', 'Ø'];
  const featured = EVENTS.find(e => e.featured);
  const fDate = new Date(featured.date + 'T00:00:00');
  const months = lang === 'en' ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const dateLabel = `${fDate.getDate()} ${months[fDate.getMonth()]} ${fDate.getFullYear()}`;
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__photo-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__photo",
    ref: photoRef
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero__protection"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__content"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, t('hero.eyebrow', lang))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 60
  }, /*#__PURE__*/React.createElement("h1", {
    className: "hero__name",
    "aria-label": "Dank\xF8"
  }, letters.map((ch, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: `hero__name__char${ch === 'Ø' ? ' hero__o' : ''}`
  }, ch)))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 140,
    as: "p",
    className: "hero__slogan"
  }, SLOGANS.primary[lang]), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200,
    className: "hero__genres"
  }, GENRES.map(g => /*#__PURE__*/React.createElement("span", {
    key: g,
    className: "genre-chip"
  }, g))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 260,
    className: "hero__ctas"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    href: SOUNDCLOUD_URL
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "soundcloud",
    size: 16
  }), " ", t('cta.soundcloud', lang)), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    href: waLink(t('wa.general', lang))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "whatsapp",
    size: 16
  }), " ", t('cta.whatsapp', lang))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 320,
    as: "a",
    className: "hero__event",
    href: "#shows",
    onClick: e => {
      e.preventDefault();
      onJump('shows');
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero__event-badge mono"
  }, t('event.next', lang)), /*#__PURE__*/React.createElement("span", {
    className: "hero__event-date mono"
  }, dateLabel), /*#__PURE__*/React.createElement("span", {
    className: "hero__event-sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "hero__event-venue"
  }, "SOLARTE HOSTEL, CUNDINAMARCA"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16
  }))), /*#__PURE__*/React.createElement("button", {
    className: "hero__scroll",
    onClick: () => onJump('bio'),
    "aria-label": "Scroll down"
  }, /*#__PURE__*/React.createElement("span", null, t('hero.scroll', lang)), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-down",
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero__corner hero__corner--tl"
  }, "DK \xB7 2026"), /*#__PURE__*/React.createElement("div", {
    className: "hero__corner hero__corner--br"
  }, "125\u2014140 BPM"));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
// Nav.jsx — fixed top nav: logo, section links, ES/EN, theme switcher, WhatsApp CTA.

function Nav({
  lang,
  setLang,
  active,
  onJump
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const items = [{
    id: 'bio',
    key: 'nav.bio'
  }, {
    id: 'shows',
    key: 'nav.shows'
  }, {
    id: 'gallery',
    key: 'nav.gallery'
  }, {
    id: 'music',
    key: 'nav.music'
  }, {
    id: 'contact',
    key: 'nav.contact'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    className: `nav ${scrolled ? 'nav--scrolled' : ''}`
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav__logo",
    href: "#top",
    onClick: e => {
      e.preventDefault();
      onJump('top');
    },
    "aria-label": "Dank\xF8 home"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/danko_logo.jpeg",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav__links"
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.id,
    href: `#${it.id}`,
    className: `nav__link ${active === it.id ? 'is-active' : ''}`,
    onClick: e => {
      e.preventDefault();
      onJump(it.id);
    }
  }, t(it.key, lang)))), /*#__PURE__*/React.createElement("div", {
    className: "nav__lang"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setLang('es'),
    className: lang === 'es' ? 'is-active' : ''
  }, "ES"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setLang('en'),
    className: lang === 'en' ? 'is-active' : ''
  }, "EN")), /*#__PURE__*/React.createElement(ThemeSwitcher, {
    lang: lang
  }), /*#__PURE__*/React.createElement("a", {
    className: "btn btn--primary nav__book",
    href: waLink(t('wa.general', lang)),
    "aria-label": "WhatsApp"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "whatsapp",
    size: 15
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav__book-label"
  }, t('nav.contact', lang))));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Shows.jsx
try { (() => {
// Shows.jsx — 02 SHOWS. Row-list design (date · venue · address · tickets).
// Upcoming/Completed status auto-computed from today's date (data.js).
// Section shows max 5 per tab; "ver todos" opens the full list page in a new tab.

const SHOWS_MAX = 5;
function fmtShowDate(iso, lang) {
  const d = new Date(iso + 'T00:00:00');
  const monthsEs = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const monthsEn = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const m = (lang === 'en' ? monthsEn : monthsEs)[d.getMonth()];
  return {
    day: String(d.getDate()).padStart(2, '0'),
    mon: m.toUpperCase(),
    year: d.getFullYear()
  };
}
function venueCity(address) {
  if (!address) return null;
  const parts = address.split(',').map(s => s.trim());
  return parts[parts.length - 1] || null;
}
function ShowRow({
  event,
  lang,
  isNext
}) {
  const v = VENUES[event.venue];
  const status = eventStatus(event.date);
  const f = fmtShowDate(event.date, lang);
  const city = v ? venueCity(v.address) : null;
  const venueLabel = v ? v.name : lang === 'en' ? 'Private party' : 'Fiesta privada';
  const ticketMsg = event.featured ? lang === 'en' ? 'Hello, I\u2019m interested in tickets for Dankø\u2019s June 14, 2026 event.' : 'Hola, estoy interesado en entradas para el evento de Dankø del 14 de junio de 2026.' : t('wa.general', lang);
  return /*#__PURE__*/React.createElement(Reveal, {
    className: `show ${isNext ? 'show--next' : ''} show--${status}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "show__date"
  }, /*#__PURE__*/React.createElement("span", {
    className: "show__mon mono"
  }, f.mon), /*#__PURE__*/React.createElement("span", {
    className: "show__day"
  }, f.day)), /*#__PURE__*/React.createElement("div", {
    className: "show__info"
  }, isNext ? /*#__PURE__*/React.createElement("span", {
    className: "show__nextTag mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), t('event.upcoming', lang)) : /*#__PURE__*/React.createElement("span", {
    className: "show__doneTag mono"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 10
  }), t('event.completed', lang)), /*#__PURE__*/React.createElement("div", {
    className: "show__venue"
  }, venueLabel, city ? /*#__PURE__*/React.createElement("span", {
    className: "show__city"
  }, " \xB7 ", city) : null), /*#__PURE__*/React.createElement("div", {
    className: "show__meta"
  }, event[lang === 'en' ? 'descEn' : 'descEs']), v && v.address ? /*#__PURE__*/React.createElement("button", {
    className: "show__addr",
    onClick: () => window.open(mapsLink(v.address), '_blank', 'noopener')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 13
  }), /*#__PURE__*/React.createElement("span", {
    className: "show__addr-text"
  }, v.address), /*#__PURE__*/React.createElement("span", {
    className: "show__addr-hint mono"
  }, t('venue.open', lang), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "external",
    size: 11
  }))) : null), /*#__PURE__*/React.createElement("div", {
    className: "show__cta-wrap"
  }, status === 'upcoming' ? /*#__PURE__*/React.createElement("a", {
    className: "show__cta",
    href: waLink(ticketMsg),
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ticket",
    size: 14
  }), " ", t('cta.tickets', lang)) : /*#__PURE__*/React.createElement("span", {
    className: "show__sold mono"
  }, t('event.completed', lang))));
}
function Shows({
  lang
}) {
  const [tab, setTab] = React.useState('upcoming');
  const upcoming = EVENTS.filter(e => eventStatus(e.date) === 'upcoming').sort((a, b) => a.date.localeCompare(b.date)); // soonest first
  const past = EVENTS.filter(e => eventStatus(e.date) === 'completed').sort((a, b) => b.date.localeCompare(a.date)); // most recent first

  const rows = tab === 'upcoming' ? upcoming : past;
  const visible = rows.slice(0, SHOWS_MAX);
  const hasMore = rows.length > SHOWS_MAX || (tab === 'upcoming' ? past.length : upcoming.length) > 0;
  return /*#__PURE__*/React.createElement("section", {
    id: "shows",
    className: "section section--dark grain shows"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionStarter, {
    num: 2,
    total: 4,
    title: "SHOWS",
    lede: t('shows.lede', lang)
  })), /*#__PURE__*/React.createElement(Reveal, {
    className: "shows__tabs",
    delay: 80
  }, /*#__PURE__*/React.createElement("button", {
    className: `shows__tab ${tab === 'upcoming' ? 'is-active' : ''}`,
    onClick: () => setTab('upcoming')
  }, t('shows.upcoming', lang), " ", /*#__PURE__*/React.createElement("span", {
    className: "shows__count mono"
  }, upcoming.length)), /*#__PURE__*/React.createElement("button", {
    className: `shows__tab ${tab === 'past' ? 'is-active' : ''}`,
    onClick: () => setTab('past')
  }, t('shows.past', lang), " ", /*#__PURE__*/React.createElement("span", {
    className: "shows__count mono"
  }, past.length))), /*#__PURE__*/React.createElement("div", {
    className: "shows__list"
  }, visible.length ? visible.map((e, i) => /*#__PURE__*/React.createElement(ShowRow, {
    key: e.id,
    event: e,
    lang: lang,
    isNext: tab === 'upcoming' && i === 0
  })) : /*#__PURE__*/React.createElement("div", {
    className: "shows__empty mono"
  }, t('shows.empty', lang))), /*#__PURE__*/React.createElement(Reveal, {
    className: "shows__footer",
    delay: 120
  }, rows.length > SHOWS_MAX ? /*#__PURE__*/React.createElement("span", {
    className: "shows__more-note mono"
  }, t('shows.showing', lang).replace('{n}', SHOWS_MAX).replace('{total}', rows.length)) : null, /*#__PURE__*/React.createElement("a", {
    className: "btn btn--ghost shows__all",
    href: "all-shows.html",
    target: "_blank",
    rel: "noopener"
  }, t('shows.viewAll', lang), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 16
  }))), /*#__PURE__*/React.createElement(Reveal, {
    className: "journey__growth",
    delay: 140
  }, /*#__PURE__*/React.createElement("span", {
    className: "journey__growth-mark"
  }, "\u201C"), /*#__PURE__*/React.createElement("p", null, t('journey.growth', lang)), /*#__PURE__*/React.createElement("span", {
    className: "journey__growth-by mono"
  }, "DROP V BOOKING \xB7 RESIDENT")));
}
window.Shows = Shows;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Shows.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SoundCloud.jsx
try { (() => {
// SoundCloud.jsx — 04 MUSIC. Primary platform: large section before footer with embed + CTA.

function SoundCloud({
  lang
}) {
  // SoundCloud HTML5 widget for the artist profile (latest tracks).
  const embed = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(SOUNDCLOUD_URL) + '&color=%232f7bff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true';
  return /*#__PURE__*/React.createElement("section", {
    id: "music",
    className: "section section--accent soundcloud"
  }, /*#__PURE__*/React.createElement("div", {
    className: "soundcloud__halo"
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionStarter, {
    num: 4,
    total: 4,
    title: "SOUNDCLOUD",
    lede: t('sc.lede', lang)
  })), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120,
    className: "soundcloud__player"
  }, /*#__PURE__*/React.createElement("iframe", {
    title: "Dank\xF8 on SoundCloud",
    width: "100%",
    height: "420",
    scrolling: "no",
    frameBorder: "no",
    allow: "autoplay",
    src: embed
  })), /*#__PURE__*/React.createElement(Reveal, {
    delay: 180,
    className: "soundcloud__cta-row"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    href: SOUNDCLOUD_URL
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "soundcloud",
    size: 18
  }), " ", t('cta.soundcloud', lang)), /*#__PURE__*/React.createElement("span", {
    className: "soundcloud__handle mono"
  }, "@daniel-beltran-101291848")));
}
window.SoundCloud = SoundCloud;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SoundCloud.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
// data.js — events, venues, slogans, contact. Single source of truth.
// Event status is computed from the current date (see eventStatus()).

const WHATSAPP_NUMBER = '573152085980'; // +57 315 208 5980, digits only
const WHATSAPP_DISPLAY = '+57 315 208 5980';
const EMAIL = 'didami1013@gmail.com';
const INSTAGRAM_USER = 'danko_d.j';
const INSTAGRAM_URL = 'https://www.instagram.com/danko_d.j/';
const SOUNDCLOUD_URL = 'https://soundcloud.com/daniel-beltran-101291848';
function waLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
function mapsLink(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

// Venues — clickable, open Google Maps in a new tab.
const VENUES = {
  saint_tropez: {
    name: 'Saint Tropez Club',
    address: 'Calle 90 #16-56, Piso 20, Bogotá'
  },
  radioberlin: {
    name: 'RadioBerlin',
    address: 'Carrera 13 #64-13, Chapinero, Bogotá'
  },
  antisistema: {
    name: 'Antisistema 225',
    address: 'Avenida Caracas #63-42, Bogotá'
  },
  solarte: {
    name: 'Solarte Hostel',
    address: 'Solarte Hostel, Cundinamarca'
  },
  private: {
    name: 'Private Party',
    address: null
  }
};

// Timeline events, oldest -> newest. `date` is ISO. Status auto-computed.
const EVENTS = [{
  id: 'first-party',
  date: '2024-12-23',
  venue: 'private',
  titleEs: 'Primera presentación',
  titleEn: 'First performance',
  descEs: 'Primera presentación en una fiesta privada entre amigos.',
  descEn: 'First performance at a private party with friends.'
}, {
  id: 'first-club',
  date: '2025-06-21',
  venue: 'saint_tropez',
  titleEs: 'Primer club',
  titleEn: 'First club performance',
  descEs: 'Primera presentación en club.',
  descEn: 'First club performance.'
}, {
  id: 'b2b-brandon',
  date: '2025-08-27',
  venue: 'radioberlin',
  titleEs: 'B2B con Brandon Lahine',
  titleEn: 'B2B with Brandon Lahine',
  descEs: 'Presentación especial B2B junto a Brandon Lahine.',
  descEn: 'Special B2B performance with Brandon Lahine.'
}, {
  id: 'radioberlin-aug',
  date: '2025-08-30',
  venue: 'radioberlin',
  titleEs: 'RadioBerlin',
  titleEn: 'RadioBerlin',
  descEs: 'Presentación en RadioBerlin.',
  descEn: 'Performance at RadioBerlin.'
}, {
  id: 'radioberlin-jxxxo',
  date: '2025-12-13',
  venue: 'radioberlin',
  titleEs: 'RadioBerlin × JXXXO',
  titleEn: 'RadioBerlin × JXXXO',
  descEs: 'Presentación en RadioBerlin y participación en un evento junto al DJ internacional JXXXO.',
  descEn: 'Performance at RadioBerlin and participation in an event alongside international DJ JXXXO.'
}, {
  id: 'antisistema',
  date: '2026-01-24',
  venue: 'antisistema',
  titleEs: 'Antisistema 225',
  titleEn: 'Antisistema 225',
  descEs: 'Presentación en Antisistema 225.',
  descEn: 'Performance at Antisistema 225.'
}, {
  id: 'solarte',
  date: '2026-06-14',
  venue: 'solarte',
  featured: true,
  titleEs: 'Evento destacado',
  titleEn: 'Featured event',
  descEs: 'Próxima fecha destacada en Solarte Hostel, Cundinamarca.',
  descEn: 'Featured upcoming event at Solarte Hostel, Cundinamarca.'
}];

// Auto status from today's date.
function eventStatus(iso) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(iso + 'T00:00:00');
  return d.getTime() >= today.getTime() ? 'upcoming' : 'completed';
}
const SLOGANS = {
  primary: {
    es: 'Esto no es un set. Es mi carácter en frecuencia.',
    en: 'This is not a set. It\u2019s my character in frequency.'
  },
  alt: [{
    es: 'Cada golpe suena a quien soy.',
    en: 'Every hit sounds like who I am.'
  }, {
    es: 'Mi sonido no se adapta. Impone presencia.',
    en: 'My sound doesn\u2019t adapt. It commands presence.'
  }, {
    es: 'Techno con carácter. Sin concesiones.',
    en: 'Techno with character. No compromises.'
  }]
};
const GENRES = ['Techno', 'Peak Time', 'Melodic Techno', 'Afro House'];
Object.assign(window, {
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  EMAIL,
  INSTAGRAM_USER,
  INSTAGRAM_URL,
  SOUNDCLOUD_URL,
  waLink,
  mapsLink,
  VENUES,
  EVENTS,
  eventStatus,
  SLOGANS,
  GENRES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/i18n.js
try { (() => {
// i18n.js — bilingual string table (ES primary, EN). t(key, lang) -> string.

const STRINGS = {
  // Nav
  'nav.bio': {
    es: 'Perfil',
    en: 'About'
  },
  'nav.shows': {
    es: 'Shows',
    en: 'Shows'
  },
  'nav.gallery': {
    es: 'Galería',
    en: 'Gallery'
  },
  'nav.music': {
    es: 'SoundCloud',
    en: 'SoundCloud'
  },
  'nav.contact': {
    es: 'Contacto',
    en: 'Contact'
  },
  // Hero
  'hero.eyebrow': {
    es: 'Peak Time Techno · Bogotá, CO',
    en: 'Peak Time Techno · Bogotá, CO'
  },
  'hero.scroll': {
    es: 'Scroll',
    en: 'Scroll'
  },
  // CTAs
  'cta.soundcloud': {
    es: 'Escuchar en SoundCloud',
    en: 'Listen on SoundCloud'
  },
  'cta.whatsapp': {
    es: 'Contactar a Dankø',
    en: 'Contact Dankø'
  },
  'cta.tickets': {
    es: 'Conseguir entradas',
    en: 'Get Tickets'
  },
  'cta.email': {
    es: 'Escribir email',
    en: 'Send email'
  },
  'cta.follow': {
    es: 'Seguir',
    en: 'Follow'
  },
  // WhatsApp prefilled
  'wa.general': {
    es: 'Hola Dankø, quiero información sobre tus eventos.',
    en: 'Hi Dankø, I\u2019d like information about your events.'
  },
  // Events
  'event.next': {
    es: 'Próximo evento',
    en: 'Next event'
  },
  'event.upcoming': {
    es: 'Próximo',
    en: 'Upcoming'
  },
  'event.completed': {
    es: 'Realizado',
    en: 'Completed'
  },
  // Venue
  'venue.open': {
    es: 'Ver en Maps',
    en: 'Open in Maps'
  },
  // Shows
  'shows.lede': {
    es: 'Calendario en vivo — de la primera fiesta entre amigos a residente en la escena de Bogotá.',
    en: 'Live calendar — from a first party with friends to a resident in Bogotá\u2019s scene.'
  },
  'shows.upcoming': {
    es: 'Próximas',
    en: 'Upcoming'
  },
  'shows.past': {
    es: 'Pasadas',
    en: 'Past'
  },
  'shows.viewAll': {
    es: 'Ver todos los shows',
    en: 'View all shows'
  },
  'shows.showing': {
    es: 'Mostrando {n} de {total}',
    en: 'Showing {n} of {total}'
  },
  'shows.empty': {
    es: 'Sin fechas por ahora.',
    en: 'No dates right now.'
  },
  'shows.allTitle': {
    es: 'Todos los shows',
    en: 'All shows'
  },
  'shows.back': {
    es: 'Volver al sitio',
    en: 'Back to site'
  },
  // Stats
  'stat.sets': {
    es: 'Sets',
    en: 'Sets'
  },
  'stat.bpm': {
    es: 'Rango BPM',
    en: 'BPM range'
  },
  'stat.exp': {
    es: 'Experiencia',
    en: 'Experience'
  },
  // Bio
  'bio.body': {
    es: 'Dankø es DJ y productor con 4 años de experiencia. Su sonido se enfoca principalmente en Peak Time Techno, combinando potencia, precisión y versatilidad. Su propuesta artística también se mueve entre el Melodic Techno y el Afro House, construyendo una energía progresiva que lleva la pista hacia el peak time manteniendo una identidad propia.',
    en: 'Dankø is a DJ and producer with 4 years of experience. His sound is primarily focused on Peak Time Techno, combining power, precision and versatility. His artistic approach also moves between Melodic Techno and Afro House, building a progressive energy that drives the dancefloor toward peak time while maintaining a distinct identity.'
  },
  // Journey
  'journey.lede': {
    es: 'De la primera fiesta entre amigos a residente en la escena electrónica de Bogotá.',
    en: 'From a first party with friends to a resident in Bogotá\u2019s electronic scene.'
  },
  'journey.growth': {
    es: 'A partir de esta etapa, Dankø se convierte en artista residente de Drop V Booking, manteniendo presencia continua en RadioBerlin y fortaleciendo su posición dentro de la escena electrónica de Bogotá.',
    en: 'From this stage onward, Dankø became a resident artist of Drop V Booking, maintaining a continued presence at RadioBerlin and strengthening his position within Bogotá\u2019s electronic music scene.'
  },
  // Gallery
  'gallery.lede': {
    es: 'Cabina, pista y club. Toca una imagen para ampliar.',
    en: 'Booth, floor and club. Tap any image to expand.'
  },
  // SoundCloud
  'sc.lede': {
    es: 'La plataforma principal de Dankø. Sets, edits y producciones originales — dale play.',
    en: 'Dankø\u2019s primary platform. Sets, edits and original productions — hit play.'
  },
  // Contact
  'contact.lede': {
    es: 'Información de eventos, prensa y colaboraciones. WhatsApp es la vía más rápida.',
    en: 'Event info, press and collaborations. WhatsApp is the fastest way to reach out.'
  },
  // Footer
  'footer.tag': {
    es: 'Peak Time Techno · Bogotá',
    en: 'Peak Time Techno · Bogotá'
  },
  'footer.rights': {
    es: '© 2026 Dankø. Todos los derechos reservados.',
    en: '© 2026 Dankø. All rights reserved.'
  },
  'footer.built': {
    es: 'Hecho en Bogotá',
    en: 'Made in Bogotá'
  }
};
function t(key, lang = 'es') {
  const entry = STRINGS[key];
  if (!entry) return key;
  return entry[lang] ?? entry.es ?? key;
}
window.t = t;
window.STRINGS = STRINGS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/i18n.js", error: String((e && e.message) || e) }); }

// ui_kits/website/motion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// motion.jsx — micro-interaction helpers for the Dankø site.
// Exports: <BackgroundFX />, useReveal(ref), useParallax(ref, factor)

// =========================================================
// BackgroundFX — fixed full-viewport canvas behind everything.
// Layers (bottom -> top):
//   1. Static dark ink fill (CSS, in styles.css)
//   2. Slow-drifting red radial gradient
//   3. Mouse-tracking red radial spotlight (low opacity, smooth lerp)
//   4. Static SVG noise grain
// All pointer-events: none. mix-blend-mode: screen for color blending.
// =========================================================

function BackgroundFX() {
  const trackRef = React.useRef(null);
  const target = React.useRef({
    x: 0.5,
    y: 0.4
  });
  const current = React.useRef({
    x: 0.5,
    y: 0.4
  });
  React.useEffect(() => {
    let raf = 0;
    const onMove = e => {
      target.current.x = e.clientX / window.innerWidth;
      target.current.y = e.clientY / window.innerHeight;
    };
    const onTouch = e => {
      if (!e.touches || !e.touches.length) return;
      target.current.x = e.touches[0].clientX / window.innerWidth;
      target.current.y = e.touches[0].clientY / window.innerHeight;
    };
    const tick = () => {
      // Lerp toward target for smooth, soft tracking.
      current.current.x += (target.current.x - current.current.x) * 0.06;
      current.current.y += (target.current.y - current.current.y) * 0.06;
      if (trackRef.current) {
        trackRef.current.style.setProperty('--mx', `${(current.current.x * 100).toFixed(2)}%`);
        trackRef.current.style.setProperty('--my', `${(current.current.y * 100).toFixed(2)}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, {
      passive: true
    });
    window.addEventListener('touchmove', onTouch, {
      passive: true
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "bgfx",
    ref: trackRef,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bgfx__drift"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bgfx__cursor"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bgfx__noise"
  }));
}

// =========================================================
// useReveal — adds 'is-revealed' class to a ref when 8%+ visible.
// One-shot. Respects prefers-reduced-motion via CSS, not here.
// =========================================================
function useReveal(ref) {
  React.useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Above-the-fold, reduced-motion, or no IntersectionObserver: stay visible.
    const rect = el.getBoundingClientRect();
    const belowFold = rect.top > window.innerHeight * 0.85;
    if (reduce || !('IntersectionObserver' in window) || !belowFold) return;
    el.classList.add('reveal--armed');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add('is-revealed');
          obs.unobserve(el);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -8% 0px'
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

// =========================================================
// Reveal — wrapper component. Adds .reveal and the staggered delay.
// =========================================================
function Reveal({
  as = 'div',
  delay = 0,
  children,
  className = '',
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  useReveal(ref);
  const Tag = as;
  const mergedStyle = {
    '--reveal-delay': `${delay}ms`,
    ...(style || {})
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    className: `reveal ${className}`,
    style: mergedStyle
  }, rest), children);
}

// =========================================================
// useParallax — translateY a ref by (scrollY * factor) using rAF.
// Pass negative factors for slower movement; small magnitudes (0.05–0.2).
// =========================================================
function useParallax(ref, factor = 0.15) {
  React.useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let raf = 0;
    let target = 0;
    let current = 0;
    const onScroll = () => {
      // Use the element's offset relative to viewport so each element parallaxes
      // around its own center.
      const rect = el.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      target = -centerOffset * factor;
    };
    const tick = () => {
      current += (target - current) * 0.1;
      el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    onScroll();
    raf = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, factor]);
}
Object.assign(window, {
  BackgroundFX,
  useReveal,
  Reveal,
  useParallax
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/motion.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/themes.js
try { (() => {
// themes.js — 6-theme accent switcher with localStorage persistence.
// Applies data-theme to <html>; all accent surfaces read --accent* from CSS.

const THEMES = [{
  id: 'blue',
  labelEs: 'Azul Eléctrico',
  labelEn: 'Electric Blue',
  swatch: '#2f7bff'
}, {
  id: 'cyan',
  labelEs: 'Cian Neón',
  labelEn: 'Neon Cyan',
  swatch: '#00e5ff'
}, {
  id: 'purple',
  labelEs: 'Púrpura',
  labelEn: 'Deep Purple',
  swatch: '#8b5cff'
}, {
  id: 'red',
  labelEs: 'Rojo Techno',
  labelEn: 'Techno Red',
  swatch: '#ff2a2a'
}, {
  id: 'green',
  labelEs: 'Verde Ácido',
  labelEn: 'Acid Green',
  swatch: '#62ff3b'
}, {
  id: 'gold',
  labelEs: 'Oro Oscuro',
  labelEn: 'Dark Gold',
  swatch: '#ffb020'
}];
const THEME_KEY = 'danko-theme';
function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null;
  }
}
function applyTheme(id) {
  document.documentElement.setAttribute('data-theme', id);
  try {
    localStorage.setItem(THEME_KEY, id);
  } catch (e) {}
}

// Apply persisted theme as early as possible (before React mounts).
(function initTheme() {
  const stored = getStoredTheme();
  const valid = THEMES.some(t => t.id === stored);
  document.documentElement.setAttribute('data-theme', valid ? stored : 'blue');
})();

// Floating theme switcher (palette dots). Collapsible.
function ThemeSwitcher({
  lang
}) {
  const [active, setActive] = React.useState(() => {
    const s = getStoredTheme();
    return THEMES.some(t => t.id === s) ? s : 'blue';
  });
  const [open, setOpen] = React.useState(false);
  const choose = id => {
    setActive(id);
    applyTheme(id);
  };
  const activeTheme = THEMES.find(t => t.id === active) || THEMES[0];
  return /*#__PURE__*/React.createElement("div", {
    className: `theme-switch ${open ? 'is-open' : ''}`
  }, /*#__PURE__*/React.createElement("button", {
    className: "theme-switch__toggle",
    onClick: () => setOpen(o => !o),
    "aria-label": lang === 'en' ? 'Change color theme' : 'Cambiar tema de color',
    title: lang === 'en' ? 'Theme' : 'Tema'
  }, /*#__PURE__*/React.createElement("span", {
    className: "theme-switch__current",
    style: {
      background: activeTheme.swatch
    }
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "palette",
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    className: "theme-switch__panel",
    role: "menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "theme-switch__title mono"
  }, lang === 'en' ? 'THEME' : 'TEMA'), /*#__PURE__*/React.createElement("div", {
    className: "theme-switch__dots"
  }, THEMES.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    role: "menuitemradio",
    "aria-checked": active === t.id,
    className: `theme-switch__dot ${active === t.id ? 'is-active' : ''}`,
    style: {
      '--dot': t.swatch
    },
    onClick: () => choose(t.id),
    title: lang === 'en' ? t.labelEn : t.labelEs
  }, /*#__PURE__*/React.createElement("span", {
    className: "theme-switch__dot-fill",
    style: {
      background: t.swatch
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "theme-switch__name"
  }, lang === 'en' ? activeTheme.labelEn : activeTheme.labelEs)));
}
window.ThemeSwitcher = ThemeSwitcher;
window.DANKO_THEMES = THEMES;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/themes.js", error: String((e && e.message) || e) }); }

// ui_kits/website/ui.jsx
try { (() => {
// ui.jsx — shared atoms used across the DJ Danko website kit
// Loaded as a Babel script. Exports to window for cross-file use.

function Eyebrow({
  children,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: color ? {
      color
    } : undefined
  }, children);
}
function SectionStarter({
  num,
  total = 5,
  title,
  lede
}) {
  const hasNum = num !== '' && num != null;
  return /*#__PURE__*/React.createElement("header", {
    className: "starter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, hasNum ? `${String(num).padStart(2, '0')} / ${String(total).padStart(2, '0')}` : '—'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "title"
  }, title), lede ? /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, lede) : null));
}
function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type
}) {
  const cls = `btn btn--${variant}`;
  if (href) return /*#__PURE__*/React.createElement("a", {
    className: cls,
    href: href,
    onClick: onClick
  }, children);
  return /*#__PURE__*/React.createElement("button", {
    className: cls,
    type: type || 'button',
    onClick: onClick
  }, children);
}

// Lucide-style icons inlined to avoid CDN flakiness. 1.75 stroke, currentColor.
function Icon({
  name,
  size = 18
}) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  switch (name) {
    case 'play':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("polygon", {
        points: "5 3 19 12 5 21 5 3"
      }));
    case 'pause':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("rect", {
        x: "6",
        y: "4",
        width: "4",
        height: "16"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "14",
        y: "4",
        width: "4",
        height: "16"
      }));
    case 'arrow-up-right':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("line", {
        x1: "7",
        y1: "17",
        x2: "17",
        y2: "7"
      }), /*#__PURE__*/React.createElement("polyline", {
        points: "7 7 17 7 17 17"
      }));
    case 'chevron-down':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("polyline", {
        points: "6 9 12 15 18 9"
      }));
    case 'chevron-right':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("polyline", {
        points: "9 18 15 12 9 6"
      }));
    case 'chevron-left':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("polyline", {
        points: "15 18 9 12 15 6"
      }));
    case 'palette':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "13.5",
        cy: "6.5",
        r: "1.2",
        fill: "currentColor",
        stroke: "none"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "17",
        cy: "10.5",
        r: "1.2",
        fill: "currentColor",
        stroke: "none"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "8.5",
        cy: "7.5",
        r: "1.2",
        fill: "currentColor",
        stroke: "none"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "6.5",
        cy: "12",
        r: "1.2",
        fill: "currentColor",
        stroke: "none"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1 .8-1.5 1.8-1.5H16a6 6 0 0 0 6-6c0-4.4-4.5-8-10-8z"
      }));
    case 'whatsapp':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M9 9.5c0 3 2.5 5.5 5.5 5.5.4 0 .7-.3.7-.7v-1c0-.3-.2-.6-.6-.7l-1.2-.3c-.3-.1-.6 0-.8.2l-.3.3c-1-.5-1.8-1.3-2.3-2.3l.3-.3c.2-.2.3-.5.2-.8L10.9 8c-.1-.4-.4-.6-.7-.6h-1c-.4 0-.7.3-.7.7z",
        fill: "currentColor",
        stroke: "none"
      }));
    case 'x':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("line", {
        x1: "18",
        y1: "6",
        x2: "6",
        y2: "18"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "6",
        y1: "6",
        x2: "18",
        y2: "18"
      }));
    case 'check':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("polyline", {
        points: "20 6 9 17 4 12"
      }));
    case 'external':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      }), /*#__PURE__*/React.createElement("polyline", {
        points: "15 3 21 3 21 9"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "10",
        y1: "14",
        x2: "21",
        y2: "3"
      }));
    case 'ticket':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "9",
        y1: "7",
        x2: "9",
        y2: "17",
        strokeDasharray: "2 2"
      }));
    case 'sliders':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("line", {
        x1: "4",
        y1: "21",
        x2: "4",
        y2: "14"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "4",
        y1: "10",
        x2: "4",
        y2: "3"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "12",
        y1: "21",
        x2: "12",
        y2: "12"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "12",
        y1: "8",
        x2: "12",
        y2: "3"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "20",
        y1: "21",
        x2: "20",
        y2: "16"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "20",
        y1: "12",
        x2: "20",
        y2: "3"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "1",
        y1: "14",
        x2: "7",
        y2: "14"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "9",
        y1: "8",
        x2: "15",
        y2: "8"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "17",
        y1: "16",
        x2: "23",
        y2: "16"
      }));
    case 'calendar':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "4",
        width: "18",
        height: "18",
        rx: "2"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "16",
        y1: "2",
        x2: "16",
        y2: "6"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "8",
        y1: "2",
        x2: "8",
        y2: "6"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "3",
        y1: "10",
        x2: "21",
        y2: "10"
      }));
    case 'map-pin':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "10",
        r: "3"
      }));
    case 'mail':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      }), /*#__PURE__*/React.createElement("polyline", {
        points: "22,6 12,13 2,6"
      }));
    case 'instagram':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "2",
        width: "20",
        height: "20",
        rx: "5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "17.5",
        y1: "6.5",
        x2: "17.51",
        y2: "6.5"
      }));
    case 'soundcloud':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M3 14v4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M6 11v7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M9 9v9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 6v12"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M15 9v9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M18 12c2 0 3 1 3 3s-1 3-3 3h-3"
      }));
    case 'youtube':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "5",
        width: "20",
        height: "14",
        rx: "3"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "10 9 16 12 10 15 10 9",
        fill: "currentColor",
        stroke: "none"
      }));
    case 'spotify':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M7 9c3-1 8-1 11 1"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M7 13c2.5-.8 6.5-.8 9 .8"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8 16c2-.6 5-.6 7 .6"
      }));
    case 'volume':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("polygon", {
        points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M15.54 8.46a5 5 0 0 1 0 7.07"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M19.07 4.93a10 10 0 0 1 0 14.14"
      }));
    case 'clock':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), /*#__PURE__*/React.createElement("polyline", {
        points: "12 6 12 12 16 14"
      }));
    case 'arrow-down':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("line", {
        x1: "12",
        y1: "5",
        x2: "12",
        y2: "19"
      }), /*#__PURE__*/React.createElement("polyline", {
        points: "19 12 12 19 5 12"
      }));
    case 'arrow-left':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("line", {
        x1: "19",
        y1: "12",
        x2: "5",
        y2: "12"
      }), /*#__PURE__*/React.createElement("polyline", {
        points: "12 19 5 12 12 5"
      }));
    default:
      return null;
  }
}
Object.assign(window, {
  Eyebrow,
  SectionStarter,
  Button,
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ui.jsx", error: String((e && e.message) || e) }); }

})();
