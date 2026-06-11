// App.jsx — top-level shell. Language + active-section tracking.

function App() {
  const [lang, setLang] = React.useState('es');
  const [active, setActive] = React.useState('bio');

  React.useEffect(() => {
    const ids = ['top', 'bio', 'shows', 'gallery', 'music', 'contact'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id === 'top' ? 'bio' : e.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Dismiss the preloader once the app has painted (min ~900ms so it reads).
  React.useEffect(() => {
    const start = window.__dankoStart || performance.now();
    const wait = Math.max(0, 900 - (performance.now() - start));
    const id = setTimeout(() => { window.dankoHideLoader && window.dankoHideLoader(); }, wait);
    return () => clearTimeout(id);
  }, []);

  const onJump = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
  };

  return (
    <React.Fragment>
      <BackgroundFX />
      <div className="app">
        <Nav lang={lang} setLang={setLang} active={active} onJump={onJump} />
        <Hero lang={lang} onJump={onJump} />
        <Bio lang={lang} />
        <Shows lang={lang} />
        <Gallery lang={lang} />
        <SoundCloud lang={lang} />
        <Contact lang={lang} />
        <Footer lang={lang} />
      </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
