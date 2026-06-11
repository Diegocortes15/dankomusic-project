// Gallery.jsx — 03 GALLERY with in-page lightbox (esc, prev/next, swipe, click-out).

const SHOTS = [
  { src: '../../assets/photos/danko_radioberlin_1.jpeg', cap: 'RADIOBERLIN',  meta: 'CHAPINERO · BOGOTÁ', span: 'tall' },
  { src: '../../assets/photos/danko_practice.jpeg',      cap: 'STUDIO',       meta: 'PRACTICE',          span: 'wide' },
  { src: '../../assets/photos/danko_radioberlin_2.jpeg', cap: 'RADIOBERLIN',  meta: 'CHAPINERO · BOGOTÁ' },
  { src: '../../assets/photos/danko_b2b_brandon_1.jpeg', cap: 'B2B · BRANDON',meta: 'RADIOBERLIN' },
  { src: '../../assets/photos/danko_b2b_brandon_2.jpeg', cap: 'B2B · BRANDON',meta: 'RADIOBERLIN',       span: 'wide' },
  { src: '../../assets/photos/danko_mezclando_1.jpeg',   cap: 'PIONEER CDJ',  meta: 'CABINA' },
  { src: '../../assets/photos/danko_core_medellin.jpeg', cap: 'CORE',         meta: 'MEDELLÍN',          span: 'tall' },
  { src: '../../assets/photos/danko_mezclando_2.jpeg',   cap: 'NIGHT SET',    meta: 'BOGOTÁ' },
];

function Lightbox({ shots, index, onClose, onNav, lang }) {
  const touchX = React.useRef(null);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNav(1);
      else if (e.key === 'ArrowLeft') onNav(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose, onNav]);

  if (index == null) return null;
  const shot = shots[index];

  return (
    <div
      className="lightbox"
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button className="lightbox__close" onClick={onClose} aria-label="Close"><Icon name="x" size={22} /></button>
      <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); onNav(-1); }} aria-label="Previous"><Icon name="chevron-left" size={28} /></button>
      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={shot.src} alt={shot.cap} />
        <figcaption className="lightbox__cap">
          <span className="lightbox__cap-title">{shot.cap}</span>
          <span className="lightbox__cap-meta mono">{shot.meta} · {index + 1}/{shots.length}</span>
        </figcaption>
      </figure>
      <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); onNav(1); }} aria-label="Next"><Icon name="chevron-right" size={28} /></button>
    </div>
  );
}

function Gallery({ lang }) {
  const [open, setOpen] = React.useState(null);
  const nav = (dir) => setOpen((i) => (i + dir + SHOTS.length) % SHOTS.length);

  return (
    <section id="gallery" className="section gallery">
      <Reveal><SectionStarter num={3} total={4} title={lang === 'en' ? 'GALLERY' : 'GALERÍA'} lede={t('gallery.lede', lang)} /></Reveal>
      <div className="gallery__grid">
        {SHOTS.map((s, i) => (
          <Reveal
            key={i} as="button" delay={i * 50}
            className={`g-tile g-tile--${s.span || 'sq'}`}
            style={{ backgroundImage: `url(${s.src})` }}
            onClick={() => setOpen(i)}
            aria-label={`${s.cap} — open`}
          >
            <span className="g-tile__zoom"><Icon name="external" size={16} /></span>
            <span className="g-tile__cap">
              <span className="g-tile__meta mono">{s.meta}</span>
              {s.cap}
            </span>
          </Reveal>
        ))}
      </div>
      {open != null ? <Lightbox shots={SHOTS} index={open} onClose={() => setOpen(null)} onNav={nav} lang={lang} /> : null}
    </section>
  );
}

window.Gallery = Gallery;
