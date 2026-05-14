export type Release = {
  id: string;
  title: string;
  label?: string;
  releaseDate: string; // ISO date (YYYY-MM-DD)
  artwork: string; // path under /public
  links: {
    spotify?: string;
    beatport?: string;
    apple?: string;
    soundcloud?: string;
  };
};

export type Show = {
  id: string;
  date: string; // ISO date (YYYY-MM-DD)
  venue: string;
  city: string;
  country: string;
  eventName?: string;
  ticketUrl?: string;
};

export type SetEntry = {
  soundcloudUrl: string;
  title: string;
  description?: string;
};
