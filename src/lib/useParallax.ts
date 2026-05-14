"use client";

import { useEffect, type RefObject } from "react";

/**
 * Translates a ref's element vertically by (scrollY * factor), eased via rAF.
 * Small magnitudes only (0.05–0.2). Pass negative factors for slower movement.
 */
export function useParallax(ref: RefObject<HTMLElement | null>, factor = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let target = 0;
    let current = 0;

    const onScroll = () => {
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, factor]);
}
