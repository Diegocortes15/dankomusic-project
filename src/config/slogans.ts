export type Locale = "es" | "en";

export const SLOGANS = {
  primary: {
    es: "Esto no es un set. Es mi carácter en frecuencia.",
    en: "This is not a set. It’s my character in frequency.",
  },
  alt: [
    { es: "Cada golpe suena a quien soy.", en: "Every hit sounds like who I am." },
    { es: "Mi sonido no se adapta. Impone presencia.", en: "My sound doesn’t adapt. It commands presence." },
    { es: "Techno con carácter. Sin concesiones.", en: "Techno with character. No compromises." },
  ],
} as const;

export const GENRES = ["Techno", "Peak Time", "Melodic Techno", "Afro House"] as const;

export const STATS = [
  { value: "11", labelKey: "stat.sets", icon: "sliders" as const },
  { value: "125—140", labelKey: "stat.bpm", icon: "volume" as const, suffix: { es: "BPM", en: "BPM" } },
  { value: "4", labelKey: "stat.exp", icon: "clock" as const, suffix: { es: "AÑOS", en: "YEARS" } },
] as const;

export const RESIDENCY = "DROP V BOOKING · RESIDENT";
