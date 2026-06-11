export type VenueId =
  | "saint_tropez"
  | "radioberlin"
  | "antisistema"
  | "solarte"
  | "private";

export type Venue = {
  name: string;
  address: string | null;
};

/**
 * Venues catalogue. `address` is rendered and used to build the Google Maps
 * link via `mapsLink()` in `@/config/site`. Set to `null` for private events
 * with no public address.
 *
 * Add new venues here and reference them from `EVENTS` by `VenueId`.
 */
export const VENUES: Record<VenueId, Venue> = {
  saint_tropez: { name: "Saint Tropez Club", address: "Calle 90 #16-56, Piso 20, Bogotá" },
  radioberlin:  { name: "RadioBerlin",       address: "Carrera 13 #64-13, Chapinero, Bogotá" },
  antisistema:  { name: "Antisistema 225",   address: "Avenida Caracas #63-42, Bogotá" },
  solarte:      { name: "Solarte Hostel",    address: "Solarte Hostel, Cundinamarca" },
  private:      { name: "Private Party",     address: null },
};

export function venueCity(address: string | null): string | null {
  if (!address) return null;
  const parts = address.split(",").map((s) => s.trim());
  return parts[parts.length - 1] ?? null;
}
