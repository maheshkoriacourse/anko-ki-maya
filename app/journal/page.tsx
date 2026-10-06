"use client";

/**
 * Journal — entries with mood, category, date, optional linked cycle.
 * Search + filter; pattern insights come ONLY from user-entered content.
 */

import * as React from "react";
import Link from "next/link";
import { Plus, Search, Trash2, PenLine } from "lucide-react";
import {
  Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Textarea,
  Select, Badge,
} from "@/components/ui";
import { PageHeader, EmptyState, LoadingCards, JournalShortcut } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import {
  loadJournal, upsertJournalEntry, deleteJournalEntry,
  JOURNAL_CATEGORIES, MOODS, type JournalEntry, type JournalCategory,
} from "@/lib/storage";
import { personalYear } from "@/lib/numerology";
import { SanketBanner, coreFromReading } from "@/components/sanket-banner";
import { birthdayNumber, lifePath } from "@/lib/numerology";

function thisMonthTag(profileBirthDate: string, now: Date): string {
  const bm = Number(profileBirthDate.slice(5, 7));
  const bd = Number(profileBirthDate.slice(8, 10));
  const py = personalYear(bm, bd, now.getFullYear()).number;
  const pmRaw = reduceSafe(py + now.getMonth() + 1);
  return `Personal Year ${py} · Personal Month ${py + now.getMonth() + 1} → ${pmRaw}`;
}

function reduceSafe(n: number): number {
  while (n > 9) {
    if (n === 11 || n === 22 || n === 33) break;
    n = String(n).split("").reduce((s, d) => s + Number(d), 0);
  }
  return n;
}

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

/** Gentle pattern insights from USER content only. */
function patternInsights(entries: JournalEntry[]): string[] {
  if (entries.length < 2) return [];
  const out: string[] = [];
  const moodCount: Record<string, number> = {};
  const catCount: Record<string, number> = {};
  for (const e of entries) {
    moodCount[e.mood] = (moodCount[e.mood] ?? 0) + 1;
    catCount[e.category] = (catCount[e.category] ?? 0) + 1;
  }
  const topMood = Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0];
  const topCat = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0];
  if (topMood) out.push(`"${topMood[0]}" is your most-used mood tag (${topMood[1]} of ${entries.length} entries) — a pattern you chose, worth noticing.`);
  if (topCat) out.push(`You reflect most often under "${topCat[0]}" (${topCat[1]} entries) — a theme you keep returning to.`);
  const avg = Math.round(entries.reduce((s, e) => s + wordCount(e.text), 0) / entries.length);
  out.push(`Your entries average about ${avg} words — depth is whatever feels honest that day.`);
  return out;
}

export default function JournalPage() {
  const { profile, today, hydrated } = useProfile();
  if (!hydrated) return <LoadingCards count={2} label="Loading your journal" />;
  if (!profile) return <EmptyState title="No profile yet" body="Start a profile to create a private journal." action={<Link href="/" className="text-sm text-primary underline">Start onboarding</Link>} />;
  return <JournalContent key={profile.birthDate} profile={profile} today={today} />;
}

function JournalContent({ profile, today }: { profile: NonNullable<ReturnType<typeof useProfile>["profile"]>; today: Date }) {
  const [entries, setEntries] = React.useState<JournalEntry[]>(() => loadJournal().filter((entry) => entry.ownerBirthDate === profile.birthDate));
  const [query, setQuery] = React.useState("");
  const [moodFilter, setMoodFilter] = React.useState<string>("all");
  const [catFilter, setCatFilter] = React.useState<string>("all");
  const [editing, setEditing] = React.useState<JournalEntry | null>(null);

  const cycleTag = thisMonthTag(profile.birthDate, today);

  const filtered = entries.filter((e) => {
    if (query && !e.text.toLowerCase().includes(query.toLowerCase())) return false;
    if (moodFilter !== "all" && e.mood !== moodFilter) return false;
    if (catFilter !== "all" && e.category !== catFilter) return false;
    return true;
  });

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing || !editing.text.trim()) return;
    setEntries(upsertJournalEntry(editing));
    setEditing(null);
  }

  function startNew() {
    setEditing({
      id: crypto.randomUUID(),
      ownerBirthDate: profile.birthDate,
      createdAt: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
      mood: "Neutral",
      category: "Reflection",
      text: "",
      linkedCycle: cycleTag,
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Journal"
        subtitle="Your private reflection space — stored only in this browser. Pattern insights are generated only from what you write."
        actions={
          <Button size="sm" onClick={startNew}>
            <Plus aria-hidden />
 New entry
          </Button>
        }
      />
      <p className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs leading-5 text-muted-foreground">
        Only notes linked to this saved birth-date profile are shown. Older unlinked notes stay in browser storage but are hidden here and excluded from report recaps.
      </p>

      {/* v4.0: page-level sanket — honest warnings, app-wide (owner order) */}
      {profile ? (
        <SanketBanner
          core={coreFromReading(birthdayNumber(Number(profile.birthDate.slice(8, 10))).number, lifePath(Number(profile.birthDate.slice(0, 4)), Number(profile.birthDate.slice(5, 7)), Number(profile.birthDate.slice(8, 10))).number, undefined, profile.birthDate)}
          lang={"en"}
        />
      ) : null}


      <JournalShortcut />

      {editing ? (
        <Card>
          <CardHeader>
            <CardTitle>{entries.some((x) => x.id === editing.id) ? "Edit entry" : "New entry"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSave} className="space-y-3" aria-label="Journal entry form">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <Label htmlFor="j-date">Date</Label>
                  <Input
                    id="j-date"
                    type="date"
                    value={editing.date}
                    onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="j-mood">Mood</Label>
                  <Select
                    id="j-mood"
                    value={editing.mood}
                    onChange={(e) => setEditing({ ...editing, mood: e.target.value as JournalEntry["mood"] })}
                    className="mt-1"
                  >
                    {MOODS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="j-cat">Category</Label>
                  <Select
                    id="j-cat"
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value as JournalCategory })}
                    className="mt-1"
                  >
                    {JOURNAL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="j-text">Entry</Label>
                <Textarea
                  id="j-text"
                  required
                  placeholder="What's alive in you today?"
                  value={editing.text}
                  onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                  className="mt-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Linked cycle (optional tag): {editing.linkedCycle || "—"}</p>
              <div className="flex gap-2">
                <Button type="submit" size="sm" disabled={!editing.text.trim()}>
                  <PenLine aria-hidden /> Save entry
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1">
          <Label htmlFor="j-search" className="sr-only">Search entries</Label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              id="j-search"
              placeholder="Search your entries…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="j-mf" className="sr-only">Filter by mood</Label>
          <Select id="j-mf" value={moodFilter} onChange={(e) => setMoodFilter(e.target.value)}>
            <option value="all">All moods</option>
            {MOODS.map((m) => <option key={m} value={m}>{m}</option>)}
          </Select>
        </div>
        <div>
          <Label htmlFor="j-cf" className="sr-only">Filter by category</Label>
          <Select id="j-cf" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
            <option value="all">All categories</option>
            {JOURNAL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
        </div>
        {(query || moodFilter !== "all" || catFilter !== "all") ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setQuery(""); setMoodFilter("all"); setCatFilter("all"); }}
          >
            Clear filters
          </Button>
        ) : null}
      </div>

      {/* Pattern insights (from user content only) */}
      {entries.length >= 2 ? (
        <Card className="bg-secondary/40">
          <CardHeader>
            <CardTitle className="text-sm">Gentle pattern insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">
              {patternInsights(entries).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Computed only from what you wrote — never from your numbers.
            </p>
          </CardContent>
        </Card>
      ) : null}

      {/* Entries */}
      {filtered.length === 0 ? (
        <EmptyState
          title={entries.length === 0 ? "Your journal is empty" : "No entries match your filters"}
          body={
            entries.length === 0
              ? "One honest paragraph is a perfect start. What felt true today?"
              : "Try clearing a filter or searching a different word."
          }
          action={entries.length === 0 ? <Button size="sm" variant="secondary" onClick={startNew}><Plus aria-hidden /> Write the first entry</Button> : null}
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((e) => (
            <li key={e.id}>
              <Card>
                <CardContent className="space-y-2 py-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <time dateTime={e.date}>{e.date}</time>
                    <Badge variant="secondary">{e.mood}</Badge>
                    <Badge variant="outline">{e.category}</Badge>
                    {e.linkedCycle ? <span className="text-[11px]">{e.linkedCycle}</span> : null}
                  </div>
                  <p className="whitespace-pre-wrap text-sm">{e.text}</p>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" onClick={() => setEditing(e)} aria-label={`Edit entry of ${e.date}`}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEntries(deleteJournalEntry(e.id))}
                      aria-label={`Delete entry of ${e.date}`}
                      className="text-destructive"
                    >
                      <Trash2 aria-hidden /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
