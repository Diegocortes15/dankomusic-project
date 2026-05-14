import { describe, it, expect } from "vitest";
import { partitionShows, shows } from "@/content/shows";

describe("partitionShows", () => {
  it("splits shows around the reference date", () => {
    const ref = new Date("2026-05-13");
    const { upcoming, past } = partitionShows(ref);
    expect(upcoming.length + past.length).toBe(shows.length);
    for (const s of upcoming) expect(s.date >= "2026-05-13").toBe(true);
    for (const s of past) expect(s.date < "2026-05-13").toBe(true);
  });

  it("sorts upcoming ascending and past descending", () => {
    const ref = new Date("2024-01-01"); // makes everything upcoming
    const { upcoming } = partitionShows(ref);
    for (let i = 1; i < upcoming.length; i++) {
      expect(upcoming[i]!.date >= upcoming[i - 1]!.date).toBe(true);
    }
    const ref2 = new Date("2030-01-01"); // makes everything past
    const { past } = partitionShows(ref2);
    for (let i = 1; i < past.length; i++) {
      expect(past[i]!.date <= past[i - 1]!.date).toBe(true);
    }
  });
});
