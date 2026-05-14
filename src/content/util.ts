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
