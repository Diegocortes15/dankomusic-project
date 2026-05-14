import type { SetEntry } from "./types";

export const sets: SetEntry[] = [
  {
    soundcloudUrl: "https://soundcloud.com/daniel-beltran-101291848",
    title: "SoundCloud — Danko",
    description: "All sets and tracks",
  },
];

export const featuredSet = sets[0];
export const moreSets = sets.slice(1);
