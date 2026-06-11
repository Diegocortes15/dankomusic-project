/**
 * Shared shapes for runtime content live in `src/config/*`.
 * This file is kept as a re-export hub so future migrations can land here
 * without dragging every component through path updates.
 */

export type { DankoEvent, EventStatus } from "@/config/events";
export type { Venue, VenueId } from "@/config/venues";
export type { GalleryShot } from "@/config/gallery";
export type { ThemeId, Theme } from "@/config/themes";
export type { Locale } from "@/config/slogans";
