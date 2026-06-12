export type GalleryShot = {
  src: string;
  cap: string;
  meta: string;
  /** Tile span in the 4-col grid. `wide` = 2 cols, `tall` = 2 rows. */
  span?: "wide" | "tall";
};

/**
 * Gallery photo mosaic. Mix `wide`/`tall` spans for an asymmetric feel.
 * `cap` and `meta` are flyer-voice strings (not translated). Edit freely.
 */
export const GALLERY_SHOTS: GalleryShot[] = [
  { src: "/assets/danko_radioberlin_1.jpeg", cap: "RADIOBERLIN", meta: "CHAPINERO · BOGOTÁ", span: "tall" },
  { src: "/assets/danko_practice.jpeg",      cap: "STUDIO",       meta: "PRACTICE",          span: "wide" },
  { src: "/assets/danko_radioberlin_2.jpeg", cap: "RADIOBERLIN", meta: "CHAPINERO · BOGOTÁ" },
  { src: "/assets/danko_b2b_brandon_1.jpeg", cap: "B2B · BRANDON", meta: "RADIOBERLIN" },
  { src: "/assets/danko_b2b_brandon_2.jpeg", cap: "B2B · BRANDON", meta: "RADIOBERLIN", span: "wide" },
  { src: "/assets/danko_mezclando_1.jpeg",   cap: "PIONEER CDJ",  meta: "CABINA" },
  { src: "/assets/danko_core_medellin.jpeg", cap: "CORE",         meta: "MEDELLÍN", span: "tall" },
  { src: "/assets/danko_mezclando_2.jpeg",   cap: "NIGHT SET",    meta: "BOGOTÁ" },
];
