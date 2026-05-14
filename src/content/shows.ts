import type { Show } from "./types";

/**
 * Upcoming and past shows. Display strings are pre-baked all-caps (flyer voice)
 * so the data file IS the source of truth for what the page shows.
 *
 * `status`:
 *   - "tickets" — render Tickets CTA. Provide `ticketUrl` when known.
 *   - "soldout" — render "Sold out" disabled chip.
 *   - "tba"     — render dashed "TBA" chip.
 */
export const upcomingShows: Show[] = [
  {
    id: "radio-berlin-jun",
    day: "14",
    mon: "JUN",
    venue: "RADIO BERLIN",
    city: "BOGOTÁ · CO",
    meta: "23:00 — 04:00 · B2B BRANDON",
    status: "tickets",
  },
  {
    id: "core-festival-jul",
    day: "06",
    mon: "JUL",
    venue: "CORE FESTIVAL",
    city: "MEDELLÍN · CO",
    meta: "MAIN STAGE · 01:00 SET",
    status: "tickets",
  },
  {
    id: "warehouse-33-aug",
    day: "02",
    mon: "AGO",
    venue: "WAREHOUSE 33",
    city: "CALI · CO",
    meta: "02:00 SET · UNDERGROUND",
    status: "soldout",
  },
  {
    id: "la-cabina-aug",
    day: "23",
    mon: "AGO",
    venue: "LA CABINA",
    city: "BOGOTÁ · CO",
    meta: "OPENING · LATE SLOT",
    status: "tickets",
  },
  {
    id: "tresor-oct",
    day: "12",
    mon: "OCT",
    venue: "TRESOR · KLUBNACHT",
    city: "BERLIN · DE",
    meta: "GLOBUS FLOOR · TBA",
    status: "tba",
  },
];

export const pastShows: Show[] = [
  {
    id: "radio-berlin-may",
    day: "04",
    mon: "MAY",
    venue: "RADIO BERLIN",
    city: "BOGOTÁ · CO",
    meta: "B2B BRANDON · 2HR SET",
    status: "tickets",
  },
  {
    id: "core-festival-apr",
    day: "12",
    mon: "APR",
    venue: "CORE FESTIVAL",
    city: "MEDELLÍN · CO",
    meta: "AFTERS STAGE",
    status: "tickets",
  },
  {
    id: "baum-mar",
    day: "01",
    mon: "MAR",
    venue: "BAUM",
    city: "BOGOTÁ · CO",
    meta: "PEAK TIME · 03:00",
    status: "tickets",
  },
];
