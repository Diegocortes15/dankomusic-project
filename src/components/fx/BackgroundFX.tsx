"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed full-viewport canvas behind everything. Layers:
 *   1. Slow-drifting red radial gradient (CSS-only)
 *   2. Mouse-tracking red radial spotlight (low opacity, smooth lerp via rAF)
 *   3. Static SVG noise grain (CSS-only)
 * All pointer-events: none. mix-blend-mode: screen.
 */
export function BackgroundFX() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    // Respect prefers-reduced-motion: no rAF loop, no cursor tracking — the
    // CSS-only drift gradient still renders, which is enough ambience.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let raf = 0;
    let running = false;
    const target = { x: 0.5, y: 0.4 };
    const current = { x: 0.5, y: 0.4 };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = e.clientY / window.innerHeight;
    };
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      target.x = touch.clientX / window.innerWidth;
      target.y = touch.clientY / window.innerHeight;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      node.style.setProperty("--mx", `${(current.x * 100).toFixed(2)}%`);
      node.style.setProperty("--my", `${(current.y * 100).toFixed(2)}%`);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => {
      // Pausing the rAF loop while the tab is backgrounded gives back the
      // main-thread budget Lighthouse measures as "wasted" cursor lerp work.
      if (document.hidden) stop();
      else start();
    };

    start();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("visibilitychange", onVisibility);
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
