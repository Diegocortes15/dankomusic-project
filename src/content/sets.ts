import type { Track } from "./types";

export const SOUNDCLOUD_PROFILE = "https://soundcloud.com/daniel-beltran-101291848";

/**
 * Real discography from Dankø's SoundCloud, newest → oldest.
 * The first entry is rendered as the "featured" card; the rest fill the grid.
 */
export const tracks: Track[] = [
  {
    id: "peak-time-kick",
    title: "PEAK TIME KICK",
    tag: "Techno",
    date: "2025-12-18",
    plays: 442,
    likes: 35,
    url: "https://soundcloud.com/daniel-beltran-101291848/peak-time-kick-danko-convocatoria",
    art: "https://i1.sndcdn.com/artworks-ZoSxiwT7BTBj1rST-asAd6A-t500x500.jpg",
    featured: true,
  },
  {
    id: "me-gustas",
    title: "ME GUSTAS",
    tag: "Techno",
    date: "2025-07-11",
    plays: 280,
    likes: 10,
    url: "https://soundcloud.com/daniel-beltran-101291848/me-gustas-danko",
    art: "https://i1.sndcdn.com/artworks-p8c5K2CXTuysglgz-8Bl3Gw-t500x500.png",
  },
  {
    id: "decennium",
    title: "DECENNIUM",
    tag: "Trance",
    date: "2025-04-13",
    plays: 209,
    likes: 10,
    url: "https://soundcloud.com/daniel-beltran-101291848/decennium-danko",
    art: "https://i1.sndcdn.com/artworks-YXrRnJA1ZkWR0lN6-w7WJdA-t500x500.jpg",
  },
  {
    id: "lets-drop",
    title: "LET’S DROP SOME F*CKING TRANCE!",
    tag: "Trance",
    date: "2025-03-27",
    plays: 675,
    likes: 13,
    url: "https://soundcloud.com/daniel-beltran-101291848/lets-drop-some-fcking-trance",
    art: "https://i1.sndcdn.com/artworks-5vDBnzH2QYsfyf3R-EYQtNw-t500x500.jpg",
  },
  {
    id: "why-falling",
    title: "WHY DO I KEEP FALLING?",
    tag: "Techno",
    date: "2025-02-23",
    plays: 331,
    likes: 9,
    url: "https://soundcloud.com/daniel-beltran-101291848/3a078192-b4f4-431f-9ce8-ac2c646fc086",
    art: "https://i1.sndcdn.com/artworks-rRp4OFva8KzqQQee-A58ErQ-t500x500.png",
  },
  {
    id: "corus-maxima",
    title: "CORUS MAXIMA",
    tag: "Hard Techno",
    date: "2025-01-30",
    plays: 221,
    likes: 9,
    url: "https://soundcloud.com/daniel-beltran-101291848/corus-maxima",
    art: "https://i1.sndcdn.com/artworks-hRyOu5ywwSzMBuFG-3CJSkw-t500x500.png",
  },
];

export const featuredTrack = tracks[0];
export const moreTracks = tracks.slice(1);
