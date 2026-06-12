/**
 * Format a Date as YYYY-MM-DD using the runtime's local timezone.
 * We use this for ISO-string date comparisons against `releaseDate` / `date`
 * fields that are themselves locale-agnostic YYYY-MM-DD strings.
 * Using toISOString() would shift the "today" boundary by up to 24h for
 * users east/west of UTC.
 */
export function toLocalIsoDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const MONTHS_ES = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
];
const MONTHS_EN = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

/**
 * Format an ISO date (YYYY-MM-DD) as "MMM YYYY" in the given locale.
 * Used by Music + Releases cards. Parses as local time (no UTC drift).
 */
export function formatTrackDate(iso: string, locale: "es" | "en"): string {
  const d = new Date(`${iso}T00:00:00`);
  const months = locale === "en" ? MONTHS_EN : MONTHS_ES;
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Format an ISO date as "DD MMM YYYY" in the given locale (for releases).
 */
export function formatLongDate(iso: string, locale: "es" | "en"): string {
  const d = new Date(`${iso}T00:00:00`);
  const months = locale === "en" ? MONTHS_EN : MONTHS_ES;
  const day = String(d.getDate()).padStart(2, "0");
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
