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
    const w = window as unknown as { dankoHideLoader?: () => void };
    // Dismiss on next frame so the loader briefly registers, then yields
    // immediately to the hero LCP. The previous 900ms artificial dwell was
    // delaying LCP by ~600ms on fast connections without buying anything
    // the user actually needed to read.
    const id = window.requestAnimationFrame(() => {
      w.dankoHideLoader?.();
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  return null;
}
