"use client";

/**
 * Long-Term Map — 1-year / 3-year / 9-year cycle timeline + user milestones.
 * The app only highlights reflective cycle windows AROUND user-added goals.
 */

import * as React from "react";
import { Plus, Trash2, Flag } from "lucide-react";
import {
  Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Badge,
} from "@/components/ui";
import { PageHeader, WhyThisReading, EmptyState, LoadingCards } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import {
  loadMilestones, upsertMilestone, deleteMilestone, type Milestone,
} from "@/lib/storage";
import {
  personalYear, monthName, reduce,
} from "@/lib/numerology";
import { PERSONAL_YEAR_THEMES } from "@/lib/meanings";
import { yearHeadline, yearDeep } from "@/lib/deep-essays";
import { useT } from "@/lib/lang";

interface YearRow {
  year: number;
  py: number;
  label: string;
}

function pyRow(birthMonth: number, birthDay: number, year: number): YearRow {
  const py = personalYear(birthMonth, birthDay, year).number;
  const label = PERSONAL_YEAR_THEMES[py]?.theme ?? yearHeadline(py, "en");
  return { year, py, label };
}

export default function LongTermPage() {
  const { profile, today } = useProfile();
  const { lang } = useT();
  const [ready, setReady] = React.useState(false);
  const [milestones, setMilestones] = React.useState<Milestone[]>([]);
  const [form, setForm] = React.useState({ date: "", title: "", note: "" });
  const [error, setError] = React.useState<string | null>(null);
  React.useEffect(() => {
    setReady(true);
    setMilestones(loadMilestones());
  }, []);

  if (!ready) return <LoadingCards count={2} label="Loading your long-term map" />;

  if (!profile) {
    return (
      <EmptyState
        title="No profile yet"
        body="Add your birth details to see your cycle map."
        action={<a href="/" className="text-sm text-primary underline">Start onboarding</a>}
      />
    );
  }

  const birthMonth = Number(profile.birthDate.slice(5, 7));
  const birthDay = Number(profile.birthDate.slice(8, 10));
  const thisYear = today.getFullYear();

  const oneYear: YearRow[] = Array.from({ length: 1 }, (_, i) =>
    pyRow(birthMonth, birthDay, thisYear + i),
  );
  const threeYear: YearRow[] = Array.from({ length: 3 }, (_, i) =>
    pyRow(birthMonth, birthDay, thisYear + i),
  );
  const nineYear: YearRow[] = Array.from({ length: 9 }, (_, i) =>
    pyRow(birthMonth, birthDay, thisYear + i),
  );

  function addMilestone(e: React.FormEvent) {
    e.preventDefault();
    if (!form.date || !form.title.trim()) {
      setError("Pick a date and give your goal a name.");
      return;
    }
    setError(null);
    const m: Milestone = {
      id: crypto.randomUUID(),
      date: form.date,
      title: form.title.trim(),
      note: form.note.trim() || undefined,
    };
    setMilestones(upsertMilestone(m));
    setForm({ date: "", title: "", note: "" });
  }

  function removeMilestone(id: string) {
    setMilestones(deleteMilestone(id));
  }

  /** Reflective window: ±3 calendar months around a user milestone. */
  function windowFor(m: Milestone): string {
    const d = new Date(m.date + "T00:00:00");
    const from = new Date(d.getFullYear(), d.getMonth() - 3, 1);
    const to = new Date(d.getFullYear(), d.getMonth() + 4, 0);
    const fmt = (x: Date) => `${monthName(x.getMonth() + 1)} ${x.getFullYear()}`;
    return `${fmt(from)} – ${fmt(to)}`;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Long-Term Map"
        subtitle="1-year, 3-year and 9-year cycles as interpretive themes. Cycles are reflective emphases, not guaranteed outcomes."
      />

      <Card>
        <CardHeader>
          <CardTitle>Personal Year timeline</CardTitle>
          <p className="text-xs text-muted-foreground">
            Each calendar year carries a Personal Year number (birth month + birth day + year, reduced).
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          {[
            { title: "Next 12 months", rows: oneYear },
            { title: "3-year view", rows: threeYear },
            { title: "9-year cycle", rows: nineYear },
          ].map((group) => (
            <div key={group.title}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {group.title}
              </p>
              <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.rows.map((r) => (
                  <li key={r.year} className="rounded-lg border p-3">
                    <div className="flex items-start gap-3">
                      <span aria-hidden className="number-glyph shrink-0 text-3xl text-primary/85">{r.py}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{r.year}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground [overflow-wrap:anywhere] hyphens:auto">{r.label}</p>
                        <p className="mt-1 text-xs leading-relaxed text-foreground/85">{yearDeep(r.py, lang)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <WhyThisReading
            title="Personal Year timeline"
            steps={[
              "Personal Year = birth month + birth day + calendar year, each reduced, masters preserved.",
              "Example: 15 June 1990 in 2026 → 6 + 6 + 1 = 13 → 4.",
              "The 9-year cycle repeats: themes recur with new life experience layered on.",
            ]}
            note="Cycles are interpretive themes, not guaranteed outcomes."
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card id="pinnacles">
          <CardHeader>
            <CardTitle>Pinnacles &amp; challenges</CardTitle>
            <p className="text-xs text-muted-foreground">Long chapters and growth themes across a lifetime.</p>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {usePinnacles(profile.birthDate)}
            <a href="/numbers" className="mt-1 inline-block text-xs text-primary underline underline-offset-4">
              Full pinnacle/challenge breakdown →
            </a>
          </CardContent>
        </Card>

        {/* User-added milestones */}
        <Card id="milestones">
          <CardHeader>
            <CardTitle>Your milestones &amp; goals</CardTitle>
            <p className="text-xs text-muted-foreground">
              Add your own goals; the app simply highlights the reflective cycle window around them. Private to this browser.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={addMilestone} className="space-y-3" aria-label="Add a milestone">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="ms-date">Target date</Label>
                  <Input
                    id="ms-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="ms-title">Goal / milestone</Label>
                  <Input
                    id="ms-title"
                    placeholder="e.g. Launch my portfolio"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <Input
                aria-label="Milestone note (optional)"
                placeholder="Note (optional)"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
              {error ? <p role="alert" className="text-xs text-destructive">{error}</p> : null}
              <Button type="submit" size="sm" variant="secondary">
                <Plus aria-hidden /> Add to timeline
              </Button>
            </form>

            {milestones.length === 0 ? (
              <EmptyState
                title="No milestones yet"
                body="Your goals stay private in this browser. Add one to see its reflective window."
              />
            ) : (
              <ul className="space-y-2">
                {milestones.map((m) => (
                  <li key={m.id} className="flex items-start justify-between gap-3 rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">
                        <Flag aria-hidden className="mr-1.5 inline size-3.5 text-gold" />
                        {m.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {m.date} · reflective window: {windowFor(m)}
                      </p>
                      {m.note ? <p className="mt-1 text-xs text-muted-foreground">{m.note}</p> : null}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete milestone ${m.title}`}
                      onClick={() => removeMilestone(m.id)}
                    >
                      <Trash2 aria-hidden className="size-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/** Small helper rendering pinnacle/challenge summary chips. */
function usePinnacles(birthDate: string): React.ReactNode {
  void birthDate;
  return (
    <p className="text-xs text-muted-foreground">
      Pinnacle and challenge periods appear in{" "}
      <a href="/numbers" className="text-primary underline underline-offset-4">Your Numbers → Cycles &amp; timing</a>{" "}
      with full calculation steps. <Badge variant="secondary">interpretive themes</Badge>
    </p>
  );
}