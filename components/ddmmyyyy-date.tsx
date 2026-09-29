"use client";

/**
 * v3.8 DD-MM-YYYY date entry (owner order, 30 Sep: "on front page take dob in
 * ddmmyyyy format"). Three numeric boxes in Indian order — day first — because
 * native <input type="date> renders US order (MM/DD/YYYY) on many devices and
 * Indian users type dd/mm into it. Values normalize to ISO YYYY-MM-DD for
 * storage; the engine never sees the display format.
 */

import * as React from "react";
import { Input } from "@/components/ui";

export interface DdmmyyyyParts {
  dd: string;
  mm: string;
  yyyy: string;
}

export function ddmmyyyyToIso(p: DdmmyyyyParts): string {
  const dd = p.dd.trim();
  const mm = p.mm.trim();
  const yyyy = p.yyyy.trim();
  if (!/^\d{1,2}$/.test(dd) || !/^\d{1,2}$/.test(mm) || !/^\d{4}$/.test(yyyy)) return "";
  const day = Number(dd);
  const month = Number(mm);
  const year = Number(yyyy);
  if (day < 1 || day > 31 || month < 1 || month > 12) return "";
  // Correct length per month (leap-aware) — validate() re-checks as fallback.
  const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const lens = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day > lens[month - 1]) return "";
  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
}

export function isoToDdmmyyyy(iso: string): DdmmyyyyParts {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return { dd: "", mm: "", yyyy: "" };
  return { dd: iso.slice(8, 10), mm: iso.slice(5, 7), yyyy: iso.slice(0, 4) };
}

/** Clamp helpers keep caret math simple: max 2 digits (dd/mm), 4 (yyyy). */
function clampDigits(v: string, max: number): string {
  return v.replace(/\D/g, "").slice(0, max);
}

export function DdmmyyyyDateInput({
  value,
  onChange,
  invalid,
  describedby,
  labels,
}: {
  value: DdmmyyyyParts;
  onChange: (next: DdmmyyyyParts) => void;
  invalid?: boolean;
  describedby?: string;
  labels: { dd: string; mm: string; yyyy: string };
}) {
  const ddRef = React.useRef<HTMLInputElement>(null);
  const mmRef = React.useRef<HTMLInputElement>(null);
  const yyyyRef = React.useRef<HTMLInputElement>(null);

  function move(from: "dd" | "mm" | "yyyy", raw: string) {
    const digits = clampDigits(raw, from === "yyyy" ? 4 : 2);
    const full = digits.length === (from === "yyyy" ? 4 : 2);
    onChange({ ...value, [from]: digits });
    if (from === "dd" && full) mmRef.current?.focus();
    if (from === "mm" && full) yyyyRef.current?.focus();
  }

  function onKey(e: React.KeyboardEvent, from: "dd" | "mm" | "yyyy") {
    if (e.key === "Backspace" && clampDigits(value[from], 4).length === 0) {
      if (from === "mm") ddRef.current?.focus();
      if (from === "yyyy") mmRef.current?.focus();
    }
  }

  const ringCls = invalid ? "border-destructive" : "";

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Date of birth in(dd-mm-yyyy)">
      <div className="w-14">
        <Input
          ref={ddRef}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}
          placeholder="DD"
          aria-label={labels.dd}
          aria-invalid={invalid}
          aria-describedby={describedby}
          value={value.dd}
          onChange={(e) => move("dd", e.target.value)}
          onKeyDown={(e) => onKey(e, "dd")}
          className={`text-center tracking-wider ${ringCls}`}
        />
      </div>
      <span aria-hidden className="text-muted-foreground select-none">/</span>
      <div className="w-14">
        <Input
          ref={mmRef}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}
          placeholder="MM"
          aria-label={labels.mm}
          aria-invalid={invalid}
          aria-describedby={describedby}
          value={value.mm}
          onChange={(e) => move("mm", e.target.value)}
          onKeyDown={(e) => onKey(e, "mm")}
          className={`text-center tracking-wider ${ringCls}`}
        />
      </div>
      <span aria-hidden className="text-muted-foreground select-none">/</span>
      <div className="flex-1 min-w-0">
        <Input
          ref={yyyyRef}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          placeholder="YYYY"
          aria-label={labels.yyyy}
          aria-invalid={invalid}
          aria-describedby={describedby}
          value={value.yyyy}
          onChange={(e) => move("yyyy", e.target.value)}
          onKeyDown={(e) => onKey(e, "yyyy")}
          className={`text-center tracking-wider ${ringCls}`}
        />
      </div>
    </div>
  );
}