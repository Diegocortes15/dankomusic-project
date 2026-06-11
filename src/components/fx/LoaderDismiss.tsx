"use client";

import { useEffect } from "react";

/**
 * Triggers the pre-paint loader's exit animation as soon as React has
 * hydrated, after a minimum dwell so the loader actually reads.
 *
 * The loader DOM, its CSS animations and `window.dankoHideLoader` are all
 * defined in `[locale]/layout.tsx` / `globals.css`. This component is the
 * one piece that has to wait for client-side mount.
 */
export function LoaderDismiss() {
  useEffect(() => {
    const w = window as unknown as {
      dankoHideLoader?: () => void;
      __dankoStart?: number;
    };
    const start = w.__dankoStart ?? performance.now();
    const wait = Math.max(0, 900 - (performance.now() - start));
    const id = window.setTimeout(() => {
      w.dankoHideLoader?.();
    }, wait);
    return () => window.clearTimeout(id);
  }, []);

  return null;
}
