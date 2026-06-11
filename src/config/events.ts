import type { VenueId } from "./venues";

export type EventStatus = "upcoming" | "completed";

export type DankoEvent = {
  id: string;
  /** ISO date, YYYY-MM-DD. Status is auto-computed against today. */
  date: string;
  /** Foreign key into `VENUES` (`@/config/venues`). */
  venue: VenueId;
  /** Optional. Marks the entry rendered as the "Featured event" hero strip. */
  featured?: boolean;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
};

/**
 * Timeline events, oldest → newest in the source for editorial clarity.
 * Sorting for display happens in the component. Status (upcoming / completed)
 * is auto-computed from the current date — no manual flag.
 *
 * To add a show: append an entry here with a unique `id` and the venue's key.
 */
export const EVENTS: DankoEvent[] = [
  {
    id: "first-party",
    date: "2024-12-23",
    venue: "private",
    titleEs: "Primera presentación",
    titleEn: "First performance",
    descEs: "Primera presentación en una fiesta privada entre amigos.",
    descEn: "First performance at a private party with friends.",
  },
  {
    id: "first-club",
    date: "2025-06-21",
    venue: "saint_tropez",
    titleEs: "Primer club",
    titleEn: "First club performance",
    descEs: "Primera presentación en club.",
    descEn: "First club performance.",
  },
  {
    id: "b2b-brandon",
    date: "2025-08-27",
    venue: "radioberlin",
    titleEs: "B2B con Brandon Lahine",
    titleEn: "B2B with Brandon Lahine",
    descEs: "Presentación especial B2B junto a Brandon Lahine.",
    descEn: "Special B2B performance with Brandon Lahine.",
  },
  {
    id: "radioberlin-aug",
    date: "2025-08-30",
    venue: "radioberlin",
    titleEs: "RadioBerlin",
    titleEn: "RadioBerlin",
    descEs: "Presentación en RadioBerlin.",
    descEn: "Performance at RadioBerlin.",
  },
  {
    id: "radioberlin-jxxxo",
    date: "2025-12-13",
    venue: "radioberlin",
    titleEs: "RadioBerlin × JXXXO",
    titleEn: "RadioBerlin × JXXXO",
    descEs:
      "Presentación en RadioBerlin y participación en un evento junto al DJ internacional JXXXO.",
    descEn:
      "Performance at RadioBerlin and participation in an event alongside international DJ JXXXO.",
  },
  {
    id: "antisistema",
    date: "2026-01-24",
    venue: "antisistema",
    titleEs: "Antisistema 225",
    titleEn: "Antisistema 225",
    descEs: "Presentación en Antisistema 225.",
    descEn: "Performance at Antisistema 225.",
  },
  {
    id: "solarte",
    date: "2026-06-14",
    venue: "solarte",
    featured: true,
    titleEs: "Evento destacado",
    titleEn: "Featured event",
    descEs: "Próxima fecha destacada en Solarte Hostel, Cundinamarca.",
    descEn: "Featured upcoming event at Solarte Hostel, Cundinamarca.",
  },
];

/** Auto status from today's date (local time, not UTC). */
export function eventStatus(iso: string, today: Date = new Date()): EventStatus {
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const d = new Date(`${iso}T00:00:00`).getTime();
  return d >= t ? "upcoming" : "completed";
}

export function getFeaturedEvent(): DankoEvent | undefined {
  return EVENTS.find((e) => e.featured);
}

export function partitionEvents(today: Date = new Date()): {
  upcoming: DankoEvent[];
  past: DankoEvent[];
} {
  const upcoming: DankoEvent[] = [];
  const past: DankoEvent[] = [];
  for (const e of EVENTS) {
    if (eventStatus(e.date, today) === "upcoming") upcoming.push(e);
    else past.push(e);
  }
  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  past.sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}
