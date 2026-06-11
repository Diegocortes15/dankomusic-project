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
  const target = React.useRef({ x: 0.5, y: 0.4 });
  const current = React.useRef({ x: 0.5, y: 0.4 });

  React.useEffect(() => {
    let raf = 0;

    const onMove = (e) => {
      target.current.x = e.clientX / window.innerWidth;
      target.current.y = e.clientY / window.innerHeight;
    };
    const onTouch = (e) => {
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

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <div className="bgfx" ref={trackRef} aria-hidden="true">
      <div className="bgfx__drift" />
      <div className="bgfx__cursor" />
      <div className="bgfx__noise" />
    </div>
  );
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
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add('is-revealed');
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

// =========================================================
// Reveal — wrapper component. Adds .reveal and the staggered delay.
// =========================================================
function Reveal({ as = 'div', delay = 0, children, className = '', style, ...rest }) {
  const ref = React.useRef(null);
  useReveal(ref);
  const Tag = as;
  const mergedStyle = { '--reveal-delay': `${delay}ms`, ...(style || {}) };
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={mergedStyle}
      {...rest}
    >{children}</Tag>
  );
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
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, factor]);
}

Object.assign(window, { BackgroundFX, useReveal, Reveal, useParallax });
