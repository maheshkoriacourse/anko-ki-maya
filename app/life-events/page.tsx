"use client";

/**
 * Anko Ki Maya v2 — Life Events Graph page.
 * User records PAST events (year + label + impact 1-10) → SVG chart over the
 * personal-year cycle birth→now + cycle-resonance observations.
 */

import * as React from "react";
import { LineChart, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Label } from "@/components/ui";
import { PageHeader, EmptyState } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import { analyzeLifeEvents, graphGeometry, type LifeEvent } from "@/lib/life-events";
import { loadLifeEvents, upsertLifeEvent, deleteLifeEvent } from "@/lib/life-storage";
import { ReasoningBlock } from "@/components/loshu-kit";

export default function LifeEventsPage() {
  const { profile, hasProfile } = useProfile();
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);

  const [events, setEvents] = React.useState<LifeEvent[] | null>(null);
  const [form, setForm] = React.useState({ year: "", label: "", impact: "5" });

  React.useEffect(() => {
    // Read localStorage after mount (client-only data source).
    setEvents(loadLifeEvents());
  }, []);

  if (events === null) return null;

  if (!hasProfile || !profile) {
    return <EmptyState title="No profile yet" body="Add your birth details to map events on your cycles." />;
  }

  const y = Number(profile.birthDate.slice(0, 4));
  const m = Number(profile.birthDate.slice(5, 7));
  const d = Number(profile.birthDate.slice(8, 10));
  const nowYear = new Date().getFullYear();

  const list = events ?? [];
  const analysis = analyzeLifeEvents(list, y, m, d);
  const geo = graphGeometry(list, y, m, d, nowYear);

  function addEvent(e: React.FormEvent) {
    e.preventDefault();
    const year = Number(form.year);
    const impact = Number(form.impact);
    if (!/^\d{4}$/.test(form.year) || year < y || year > nowYear) return;
    if (!form.label.trim() || !(impact >= 1 && impact <= 10)) return;
    const ev: LifeEvent = {
      id: `ev-${Date.now()}`,
      year,
      label: form.label.trim(),
      impact,
    };
    setEvents(upsertLifeEvent(ev));
    setForm({ year: "", label: "", impact: "5" });
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("lifeEvents")}
        subtitle={
          lang === "hi"
            ? "अपनी अतीत की बड़ी घटनाएँ दर्ज करें — इंजन उन्हें आपके व्यक्तिगत-वर्ष चक्र पर प्लॉट करेगा।"
            : "Record your past high-impact events — the engine plots them on your personal-year cycle."
        }
        actions={<Badge variant="gold"><LineChart aria-hidden className="size-3" /> {list.length} {lang === "hi" ? "घटनाएँ" : "events"}</Badge>}
      />

      {/* Add-event form */}
      <Card>
        <CardHeader>
          <CardTitle>{t("addEvent")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addEvent} className="grid gap-3 sm:grid-cols-[110px_1fr_130px_auto] sm:items-end">
            <div>
              <Label htmlFor="ev-year">{t("year")}</Label>
              <Input
                id="ev-year"
                inputMode="numeric"
                placeholder={`1990–${nowYear}`}
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="ev-label">{t("label")}</Label>
              <Input
                id="ev-label"
                placeholder={lang === "hi" ? "जैसे: नई नौकरी" : "e.g. moved cities"}
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="ev-impact">{t("impact")}</Label>
              <Input
                id="ev-impact"
                type="range"
                min={1}
                max={10}
                value={form.impact}
                onChange={(e) => setForm({ ...form, impact: e.target.value })}
                className="mt-3"
              />
              <p className="text-center text-xs text-gold">{form.impact}/10</p>
            </div>
            <Button type="submit">
              <Plus aria-hidden /> {lang === "hi" ? "जोड़ें" : "Add"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Graph */}
      {list.length === 0 ? (
        <EmptyState
          title={lang === "hi" ? "अभी कोई घटना दर्ज नहीं" : "No events recorded yet"}
          body={
            lang === "hi"
              ? "3-4 घटनाएँ जोड़ें — चक्र-अनुनाद तभी दिखता है।"
              : "Add 3-4 events — the cycle resonance appears from there."
          }
        />
      ) : (
        <Card className="glass constellation-bg">
          <CardHeader>
            <CardTitle>
              {lang === "hi" ? "घटनाएँ × व्यक्तिगत-वर्ष चक्र" : "Events × personal-year cycle"} · {y}–{nowYear}
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${geo.width} ${geo.height}`}
              className="h-auto w-full min-w-[640px]"
              role="img"
              aria-label={lang === "hi" ? "जीवन-घटना ग्राफ़" : "Life events graph"}
            >
              {/* impact gridlines */}
              {[1, 4, 7, 10].map((imp) => {
                const yy = 16 + (1 - (imp - 1) / 9) * (geo.height - 52);
                return (
                  <g key={imp}>
                    <line x1={44} x2={geo.width - 16} y1={yy} y2={yy} stroke="currentColor" strokeOpacity={0.08} strokeDasharray="3 5" />
                    <text x={8} y={yy + 4} fontSize={10} fill="currentColor" opacity={0.45}>{imp}</text>
                  </g>
                );
              })}
              {/* cycle ribbon: PY numbers along the bottom */}
              {geo.cycleTicks.map((tick, i) => {
                const py = analysis.onCycle.length > 0 && tick.label ? null : null;
                void py;
                return (
                  <g key={i}>
                    {i % 5 === 0 ? (
                      <text x={tick.x} y={geo.height - 8} fontSize={10} fill="currentColor" opacity={0.5} textAnchor="middle">
                        {tick.label}
                      </text>
                    ) : null}
                  </g>
                );
              })}
              {/* event curve */}
              <path d={geo.path} fill="none" stroke="var(--gold)" strokeWidth={2.5} strokeLinecap="round" />
              {geo.points.map((p) => (
                <g key={p.event.event.id}>
                  <circle cx={p.x} cy={p.y} r={5.5} fill="var(--gold)" stroke="var(--background)" strokeWidth={2}>
                    <title>
                      {`${p.event.event.year} · ${p.event.event.label} · ${p.event.event.impact}/10 · PY${p.event.personalYear}`}
                    </title>
                  </circle>
                  <text x={p.x} y={p.y - 10} fontSize={10} textAnchor="middle" fill="currentColor" opacity={0.75}>
                    {p.event.event.label.length > 18 ? p.event.event.label.slice(0, 17) + "…" : p.event.event.label}
                  </text>
                </g>
              ))}
            </svg>
          </CardContent>
        </Card>
      )}

      {/* Event list */}
      {list.length > 0 ? (
        <section aria-label={lang === "hi" ? "घटना-सूची" : "Recorded events"}>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {analysis.onCycle.map((oc) => (
              <Card key={oc.event.id} interactive>
                <CardContent className="flex items-center justify-between gap-3 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{oc.event.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {oc.event.year} · PY{oc.personalYear} · {lang === "hi" ? "प्रभाव" : "impact"} {oc.event.impact}/10
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={lang === "hi" ? "हटाएँ" : "Delete event"}
                    onClick={() => setEvents(deleteLifeEvent(oc.event.id))}
                  >
                    <Trash2 aria-hidden className="size-4 text-muted-foreground" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {/* Cycle resonance */}
      {analysis.resonances.length > 0 ? (
        <section aria-labelledby="resonance-h">
          <h2 id="resonance-h" className="font-display text-lg font-semibold">{t("cycleResonance")}</h2>
          {analysis.summary ? <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{analysis.summary}</p> : null}
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {analysis.resonances.map((r) => (
              <Card key={r.personalYear} interactive>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span aria-hidden className="number-glyph mandala-ring grid size-10 place-items-center rounded-full text-lg text-gold">
                      {r.personalYear}
                    </span>
                    <Badge variant={r.averageImpact >= 7 ? "gold" : "secondary"}>
                      {r.averageImpact.toFixed(1)}/10
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{r.observation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <ReasoningBlock title={t("cycleResonance")} steps={analysis.steps} lang={lang} className="mt-3" />
        </section>
      ) : null}
    </div>
  );
}