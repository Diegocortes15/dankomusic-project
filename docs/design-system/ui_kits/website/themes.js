// themes.js — 6-theme accent switcher with localStorage persistence.
// Applies data-theme to <html>; all accent surfaces read --accent* from CSS.

const THEMES = [
  { id: 'blue',   labelEs: 'Azul Eléctrico', labelEn: 'Electric Blue', swatch: '#2f7bff' },
  { id: 'cyan',   labelEs: 'Cian Neón',      labelEn: 'Neon Cyan',     swatch: '#00e5ff' },
  { id: 'purple', labelEs: 'Púrpura',        labelEn: 'Deep Purple',   swatch: '#8b5cff' },
  { id: 'red',    labelEs: 'Rojo Techno',    labelEn: 'Techno Red',    swatch: '#ff2a2a' },
  { id: 'green',  labelEs: 'Verde Ácido',    labelEn: 'Acid Green',    swatch: '#62ff3b' },
  { id: 'gold',   labelEs: 'Oro Oscuro',     labelEn: 'Dark Gold',     swatch: '#ffb020' },
];

const THEME_KEY = 'danko-theme';

function getStoredTheme() {
  try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
}
function applyTheme(id) {
  document.documentElement.setAttribute('data-theme', id);
  try { localStorage.setItem(THEME_KEY, id); } catch (e) {}
}

// Apply persisted theme as early as possible (before React mounts).
(function initTheme() {
  const stored = getStoredTheme();
  const valid = THEMES.some((t) => t.id === stored);
  document.documentElement.setAttribute('data-theme', valid ? stored : 'blue');
})();

// Floating theme switcher (palette dots). Collapsible.
function ThemeSwitcher({ lang }) {
  const [active, setActive] = React.useState(() => {
    const s = getStoredTheme();
    return THEMES.some((t) => t.id === s) ? s : 'blue';
  });
  const [open, setOpen] = React.useState(false);

  const choose = (id) => { setActive(id); applyTheme(id); };
  const activeTheme = THEMES.find((t) => t.id === active) || THEMES[0];

  return (
    <div className={`theme-switch ${open ? 'is-open' : ''}`}>
      <button
        className="theme-switch__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={lang === 'en' ? 'Change color theme' : 'Cambiar tema de color'}
        title={lang === 'en' ? 'Theme' : 'Tema'}
      >
        <span className="theme-switch__current" style={{ background: activeTheme.swatch }} />
        <Icon name="palette" size={16} />
      </button>
      <div className="theme-switch__panel" role="menu">
        <div className="theme-switch__title mono">{lang === 'en' ? 'THEME' : 'TEMA'}</div>
        <div className="theme-switch__dots">
          {THEMES.map((t) => (
            <button
              key={t.id}
              role="menuitemradio"
              aria-checked={active === t.id}
              className={`theme-switch__dot ${active === t.id ? 'is-active' : ''}`}
              style={{ '--dot': t.swatch }}
              onClick={() => choose(t.id)}
              title={lang === 'en' ? t.labelEn : t.labelEs}
            >
              <span className="theme-switch__dot-fill" style={{ background: t.swatch }} />
            </button>
          ))}
        </div>
        <div className="theme-switch__name">{lang === 'en' ? activeTheme.labelEn : activeTheme.labelEs}</div>
      </div>
    </div>
  );
}

window.ThemeSwitcher = ThemeSwitcher;
window.DANKO_THEMES = THEMES;
