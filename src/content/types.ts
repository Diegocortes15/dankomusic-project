export type Release = {
  id: string;
  title: string;
  label?: string;
  releaseDate: string; // ISO date (YYYY-MM-DD)
  artwork: string;
  presave: PresaveLink[];
};

export type PresaveLink = {
  id: "spotify" | "beatport" | "apple" | "soundcloud";
  label: string;
  href: string;
};

export type Show = {
  id: string;
  day: string; // "14"
  mon: string; // "JUN"
  venue: string;
  city: string;
  meta: string;
  status: "tickets" | "soldout" | "tba";
  ticketUrl?: string;
  date?: string; // optional ISO for sorting; tools may compute from day/mon
};

export type TrackTag = "Techno" | "Hard Techno" | "Trance";

export type Track = {
  id: string;
  title: string;
  tag: TrackTag;
  date: string; // ISO date (YYYY-MM-DD)
  plays: number;
  likes: number;
  url: string;
  art: string;
  featured?: boolean;
};

export type GalleryShot = {
  src: string;
  cap: string;
  meta: string;
  span?: "wide" | "tall";
};
