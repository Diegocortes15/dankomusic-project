import type { Release } from "./types";
import { toLocalIsoDate } from "./util";

export const releases: Release[] = [
  // Add releases here. Section auto-hides when no upcoming entries exist.
  // Example shape (commented):
  // {
  //   id: "danko-untitled-001",
  //   title: "Untitled 001",
  //   label: "Self-released",
  //   releaseDate: "2026-08-15",
  //   artwork: "/assets/danko_logo.jpeg",
  //   links: { spotify: "https://open.spotify.com/...", beatport: "..." }
  // }
];

export function upcomingReleases(today: Date = new Date()): Release[] {
  const todayIso = toLocalIsoDate(today);
  return releases
    .filter((r) => r.releaseDate >= todayIso)
    .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
}

export function hasUpcomingReleases(today?: Date): boolean {
  return upcomingReleases(today).length > 0;
}
