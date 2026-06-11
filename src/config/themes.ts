export type ThemeId = "blue" | "cyan" | "purple" | "red" | "green" | "gold";

export type Theme = {
  id: ThemeId;
  labelEs: string;
  labelEn: string;
  swatch: string;
};

export const THEMES: readonly Theme[] = [
  { id: "blue",   labelEs: "Azul Eléctrico", labelEn: "Electric Blue", swatch: "#2f7bff" },
  { id: "cyan",   labelEs: "Cian Neón",      labelEn: "Neon Cyan",     swatch: "#00e5ff" },
  { id: "purple", labelEs: "Púrpura",        labelEn: "Deep Purple",   swatch: "#8b5cff" },
  { id: "red",    labelEs: "Rojo Techno",    labelEn: "Techno Red",    swatch: "#ff2a2a" },
  { id: "green",  labelEs: "Verde Ácido",    labelEn: "Acid Green",    swatch: "#62ff3b" },
  { id: "gold",   labelEs: "Oro Oscuro",     labelEn: "Dark Gold",     swatch: "#ffb020" },
] as const;

export const DEFAULT_THEME: ThemeId = "blue";
export const THEME_STORAGE_KEY = "danko-theme";

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return value != null && THEMES.some((t) => t.id === value);
}
