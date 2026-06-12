"use client";

import { useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  isThemeId,
  type ThemeId,
} from "@/config/themes";

/** Window event broadcast on every theme change so SSR-rendered client
 * components (the switcher itself, the SoundCloud embed, anything else
 * that needs to recolour live) can re-render in sync. */
export const THEME_CHANGE_EVENT = "danko-theme-change";

function subscribe(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener(THEME_CHANGE_EVENT, handler);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, handler);
}

function getSnapshot(): ThemeId {
  const attr = document.documentElement.getAttribute("data-theme");
  return isThemeId(attr) ? attr : DEFAULT_THEME;
}

function getServerSnapshot(): ThemeId {
  // SSR has no access to the user's localStorage. Always render with the
  // default; React then swaps to the real value (via the client snapshot)
  // right after hydration without a mismatch warning. The page chrome
  // already shows the persisted accent because the inline head script in
  // [locale]/layout.tsx applied `data-theme` to <html> before first paint.
  return DEFAULT_THEME;
}

/**
 * SSR-safe reader for the active accent theme. Server snapshot is always
 * `DEFAULT_THEME`; client snapshot reads `<html data-theme>`. Re-renders
 * whenever a THEME_CHANGE_EVENT fires.
 */
export function useActiveThemeId(): ThemeId {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Writes a new theme to <html data-theme>, persists it to localStorage,
 * and broadcasts so every `useActiveThemeId` consumer re-renders.
 */
export function applyTheme(id: ThemeId): void {
  document.documentElement.setAttribute("data-theme", id);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    /* storage unavailable (private mode, etc.) — silently no-op */
  }
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { id } }));
}
