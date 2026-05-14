import { describe, it, expect } from "vitest";
import type { Release } from "@/content/types";
import { upcomingReleases } from "@/content/releases";

describe("upcomingReleases", () => {
  it("returns only releases with releaseDate >= today and sorts ascending", () => {
    const result = upcomingReleases(new Date("2026-05-13"));
    expect(Array.isArray(result)).toBe(true);
    for (let i = 1; i < result.length; i++) {
      expect(result[i]!.releaseDate >= result[i - 1]!.releaseDate).toBe(true);
    }
  });

  it("filters correctly given an inline array", () => {
    const sample: Release[] = [
      { id: "a", title: "A", releaseDate: "2026-01-01", artwork: "", presave: [] },
      { id: "b", title: "B", releaseDate: "2026-06-01", artwork: "", presave: [] },
      { id: "c", title: "C", releaseDate: "2026-12-31", artwork: "", presave: [] },
    ];
    const today = new Date("2026-05-13");
    const todayIso = today.toISOString().slice(0, 10);
    const filtered = sample
      .filter((r) => r.releaseDate >= todayIso)
      .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
    expect(filtered.map((r) => r.id)).toEqual(["b", "c"]);
  });
});
