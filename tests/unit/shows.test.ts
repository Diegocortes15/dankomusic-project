import { describe, it, expect } from "vitest";
import { upcomingShows, pastShows } from "@/content/shows";

describe("shows data", () => {
  it("has well-formed upcoming entries", () => {
    expect(upcomingShows.length).toBeGreaterThan(0);
    for (const s of upcomingShows) {
      expect(s.id).toBeTruthy();
      expect(s.day).toMatch(/^\d{2}$/);
      expect(s.mon).toMatch(/^[A-Z]{3}$/);
      expect(s.venue).toBeTruthy();
      expect(s.city).toBeTruthy();
      expect(["tickets", "soldout", "tba"]).toContain(s.status);
    }
  });

  it("has well-formed past entries", () => {
    expect(pastShows.length).toBeGreaterThan(0);
    for (const s of pastShows) {
      expect(s.id).toBeTruthy();
      expect(s.day).toMatch(/^\d{2}$/);
      expect(s.mon).toMatch(/^[A-Z]{3}$/);
    }
  });

  it("has no id collisions across upcoming and past", () => {
    const ids = [...upcomingShows, ...pastShows].map((s) => s.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});
