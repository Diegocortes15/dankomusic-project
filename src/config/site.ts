/**
 * Single source of truth for contact info, social handles, and link builders.
 * Update these constants to change every place they appear on the site.
 */

export const WHATSAPP_NUMBER = "573152085980"; // +57 315 208 5980, digits only
export const WHATSAPP_DISPLAY = "+57 315 208 5980";
export const EMAIL = "danko.djmusic@gmail.com";
export const INSTAGRAM_USER = "danko_d.j";
export const INSTAGRAM_URL = "https://www.instagram.com/danko_d.j/";
export const SOUNDCLOUD_URL = "https://soundcloud.com/daniel-beltran-101291848";
export const SOUNDCLOUD_HANDLE = "@daniel-beltran-101291848";

export const CITY = "Bogotá";
export const COUNTRY_CODE = "CO";
export const COORDS = "04°35′N 74°04′W";

export function waLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mapsLink(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function mailto(subject?: string): string {
  return subject ? `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}` : `mailto:${EMAIL}`;
}
