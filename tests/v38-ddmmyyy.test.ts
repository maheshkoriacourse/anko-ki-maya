import { describe, it, expect } from "vitest";
import { ddmmyyyyToIso, isoToDdmmyyyy } from "@/components/ddmmyyyy-date";

describe("v3.8 dd/mm/yyyy entry", () => {
  it("2 Nov 1980 → 1980-11-02 (owner bug case: mulank must be 2)", () => {
    expect(ddmmyyyyToIso({ dd: "2", mm: "11", yyyy: "1980" })).toBe("1980-11-02");
    expect(ddmmyyyyToIso({ dd: "02", mm: "11", yyyy: "1980" })).toBe("1980-11-02");
    // round-trip
    expect(isoToDdmmyyyy("1980-11-02")).toEqual({ dd: "02", mm: "11", yyyy: "1980" });
    // mm/dd swaps must NEVER pass silently as a swapped date — 31/02 invalid, 11 becomes month only via mm slot
    expect(ddmmyyyyToIso({ dd: "31", mm: "02", yyyy: "1980" })).toBe("");
    expect(ddmmyyyyToIso({ dd: "13", mm: "13", yyyy: "1980" })).toBe("");
    expect(ddmmyyyyToIso({ dd: "", mm: "11", yyyy: "1980" })).toBe("");
    // leap awareness: 29/02/1980 valid (leap), 29/02/1979 invalid
    expect(ddmmyyyyToIso({ dd: "29", mm: "02", yyyy: "1980" })).toBe("1980-02-29");
    expect(ddmmyyyyToIso({ dd: "29", mm: "02", yyyy: "1979" })).toBe("");
  });
});
