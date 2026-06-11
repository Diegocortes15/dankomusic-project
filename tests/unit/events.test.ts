import { describe, it, expect } from "vitest";
import { EVENTS, eventStatus, partitionEvents } from "@/config/events";

describe("eventStatus", () => {
  it("returns 'upcoming' for a date on or after today", () => {
    const today = new Date(2026, 5, 14); // 14 Jun 2026
    expect(eventStatus("2026-06-14", today)).toBe("upcoming");
    expect(eventStatus("2026-07-01", today)).toBe("upcoming");
  });
  it("returns 'completed' for a date before today", () => {
    const today = new Date(2026, 5, 14);
    expect(eventStatus("2026-06-13", today)).toBe("completed");
    expect(eventStatus("2025-08-30", today)).toBe("completed");
  });
});

describe("partitionEvents", () => {
  it("preserves every event across the two buckets", () => {
    const { upcoming, past } = partitionEvents();
    expect(upcoming.length + past.length).toBe(EVENTS.length);
  });
  it("sorts upcoming ascending and past descending", () => {
    const { upcoming, past } = partitionEvents(new Date(2024, 0, 1));
    for (let i = 1; i < upcoming.length; i++) {
      expect(upcoming[i]!.date >= upcoming[i - 1]!.date).toBe(true);
    }
    const { past: allPast } = partitionEvents(new Date(2030, 0, 1));
    for (let i = 1; i < allPast.length; i++) {
      expect(allPast[i]!.date <= allPast[i - 1]!.date).toBe(true);
    }
  });
});
