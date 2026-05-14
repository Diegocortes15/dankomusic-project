import type { Release } from "./types";
import { toLocalIsoDate } from "./util";

/**
 * Upcoming releases. Section + nav entry auto-hide when this list is empty.
 *
 * Example entry shape (uncomment + fill in when a release is announced):
 *
 * {
 *   id: "danko-untitled-001",
 *   title: "UNTITLED 001",
 *   label: "Self-released",
 *   releaseDate: "2026-08-15",
 *   artwork: "/assets/danko_logo.jpeg",
 *   presave: [
 *     { id: "spotify",  label: "Spotify",  href: "https://open.spotify.com/..." },
 *     { id: "beatport", label: "Beatport", href: "https://www.beatport.com/..." },
 *   ],
 * }
 */
export const releases: Release[] = [];

export function upcomingReleases(today: Date = new Date()): Release[] {
  const todayIso = toLocalIsoDate(today);
  return releases
    .filter((r) => r.releaseDate >= todayIso)
    .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
}

export function hasUpcomingReleases(today?: Date): boolean {
  return upcomingReleases(today).length > 0;
}
