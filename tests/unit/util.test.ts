import { describe, it, expect } from "vitest";
import { toLocalIsoDate } from "@/content/util";

describe("toLocalIsoDate", () => {
  it("formats a date as YYYY-MM-DD in local time", () => {
    // Construct a date using local-time components so the test is
    // timezone-independent: this Date instance represents 2026-05-13
    // at 22:00 local time wherever the test runs.
    const d = new Date(2026, 4, 13, 22, 0, 0);
    expect(toLocalIsoDate(d)).toBe("2026-05-13");
  });

  it("pads month and day to two digits", () => {
    const d = new Date(2026, 0, 5, 9, 0, 0);
    expect(toLocalIsoDate(d)).toBe("2026-01-05");
  });
});
