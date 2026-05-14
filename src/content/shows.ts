import type { Show } from "./types";
import { toLocalIsoDate } from "./util";

export const shows: Show[] = [
  {
    id: "core-medellin-2024",
    date: "2024-09-21",
    venue: "CORE",
    city: "Medellín",
    country: "Colombia",
  },
  {
    id: "radio-berlin-bogota-2024-a",
    date: "2024-11-08",
    venue: "Radio Berlin Club",
    city: "Bogotá",
    country: "Colombia",
  },
  {
    id: "radio-berlin-bogota-2024-b",
    date: "2025-02-14",
    venue: "Radio Berlin Club",
    city: "Bogotá",
    country: "Colombia",
    eventName: "B2B w/ Brandon",
  },
];

export function partitionShows(today: Date = new Date()): {
  upcoming: Show[];
  past: Show[];
} {
  const todayIso = toLocalIsoDate(today);
  const upcoming: Show[] = [];
  const past: Show[] = [];
  for (const s of shows) {
    if (s.date >= todayIso) upcoming.push(s);
    else past.push(s);
  }
  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  past.sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}
