"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, CircleHelp } from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { buildPersonalInsights, type PersonalInsight } from "@/lib/personal-insights";
import { loadInsightFeedback, loadLifeContext, saveInsightFeedback, type InsightResponse } from "@/lib/storage";

const LABELS: Record<InsightResponse, { en: string; hi: string }> = {
  fits: { en: "This fits", hi: "Yeh milta hai" },
  partly: { en: "Partly", hi: "Kuchh had tak" },
  "not-me": { en: "Not my experience", hi: "Mera anubhav nahi" },
};

function SignalCard({ insight, lang, response, onRespond }: {
  insight: PersonalInsight;
  lang: "en" | "hi";
  response?: InsightResponse;
  onRespond: (value: InsightResponse) => void;
}) {
  const hi = lang === "hi";
  return (
    <Card className="glass">
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="gold">{insight.timeframe}</Badge>
          <Badge variant="outline">{hi ? "vichaar" : insight.confidence_label}</Badge>
        </div>
        <CardTitle className="text-lg">{insight.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{insight.interpretation}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border bg-background/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "Kis baat par nazar rakhein" : "Signal to watch"}</p>
            <p className="mt-1 text-sm">{insight.signal_to_watch}</p>
          </div>
          <div className="rounded-lg border bg-background/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "Ek kaam ka agla kadam" : "A practical next step"}</p>
            <p className="mt-1 text-sm">{insight.practical_action}</p>
          </div>
        </div>
        <details id={`why-${insight.id}`} className="group rounded-lg border px-3 py-2">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-medium text-muted-foreground">
            <CircleHelp aria-hidden className="size-4" />{hi ? "Yeh vichaar kis aadhaar par hai?" : "Why am I seeing this—and what could change it?"}
            <ChevronDown aria-hidden className="ml-auto size-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-3 space-y-2 border-t pt-3 text-xs text-muted-foreground">
            <p><span className="font-semibold text-foreground">{hi ? "Ank-ganit: " : "Number lens: "}</span>{insight.source_numbers.join(" · ")}</p>
            {insight.source_user_context.length ? <p><span className="font-semibold text-foreground">{hi ? "Aapka diya sandarbh: " : "Your stated context: "}</span>{insight.source_user_context.join(" · ")}</p> : null}
            <p>{insight.what_would_change_this}</p>
            <p>{insight.disclaimer}</p>
          </div>
        </details>
        <div className="flex flex-wrap items-center gap-2 border-t pt-3">
          <span className="mr-1 text-xs text-muted-foreground">{hi ? "Kya yeh aapke anubhav se mila?" : "How well does this fit your experience?"}</span>
          {(Object.keys(LABELS) as InsightResponse[]).map((key) => (
            <Button key={key} size="sm" variant={response === key ? "secondary" : "outline"} aria-pressed={response === key} onClick={() => onRespond(key)}>{LABELS[key][lang]}</Button>
          ))}
          <Button size="sm" variant="ghost" onClick={() => { const details = document.getElementById(`why-${insight.id}`) as HTMLDetailsElement | null; if (details) details.open = true; }}>{hi ? "Aur bataayein" : "Tell me more"}</Button>
          {response ? <span role="status" className="text-xs text-muted-foreground">{hi ? "Aapka jawaab isi device par save hai." : "Saved on this device."}</span> : null}
        </div>
      </CardContent>
    </Card>
  );
}

export function PersonalSignals({ birthDate, mulank, bhagyank, lang }: {
  birthDate: string;
  mulank: number;
  bhagyank: number;
  lang: "en" | "hi";
}) {
  const [context, setContext] = React.useState<ReturnType<typeof loadLifeContext>>(null);
  const [responses, setResponses] = React.useState<Record<string, InsightResponse>>({});
  React.useEffect(() => {
    setContext(loadLifeContext(birthDate));
    setResponses(loadInsightFeedback(birthDate));
  }, [birthDate]);

  if (!context) return (
    <Card className="border-dashed">
      <CardContent className="flex flex-wrap items-center justify-between gap-3 py-5">
        <p className="max-w-2xl text-sm text-muted-foreground">{lang === "hi" ? "Aapke apne sandarbh ke bina yeh hissa sirf saamanya ank-theme de sakta hai. Apna sawaal aur turning points jodkar ise zyada upyogi banaayein." : "Without your own context, this can only offer general number themes. Add your question and turning points to make this section more useful."}</p>
        <Link href="/calibration" className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm text-primary-foreground">{lang === "hi" ? "Apna sandarbh jodein" : "Add your context"}<ArrowRight aria-hidden className="size-4" /></Link>
      </CardContent>
    </Card>
  );

  const insights = buildPersonalInsights({ context, mulank, bhagyank, currentYear: new Date().getFullYear(), lang });
  return (
    <div className="mt-4 space-y-3" aria-label={lang === "hi" ? "Aapke liye teen vichaar" : "Three personal reflections"}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{lang === "hi" ? "Aapki zindagi se jude teen vichaar" : "Three things I could not ignore"}</p>
        <p className="mt-1 text-sm text-muted-foreground">{lang === "hi" ? "Yeh pakki bhavishyavaani nahi. Har vichaar ka aadhaar aur anishchitata kholkar dekhein." : "Not guaranteed predictions. Each reflection shows its basis and uncertainty."}</p>
      </div>
      {insights.map((insight) => responses[insight.id] === "not-me" ? (
        <Card key={insight.id} className="border-dashed">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 py-5">
            <p role="status" className="text-sm">{lang === "hi" ? "Samajh gaya—main is reading ko aapka sach maan kar dohraunga nahi. Agar sandarbh badla ho toh update kar sakte hain." : "Understood. I won’t repeat this as if it were true about you. If your context has changed, you can update it."}</p>
            <Link href="/calibration" className="text-sm underline underline-offset-4">{lang === "hi" ? "Sandarbh badlein" : "Update my context"}</Link>
          </CardContent>
        </Card>
      ) : <SignalCard key={insight.id} insight={insight} lang={lang} response={responses[insight.id]} onRespond={(value) => setResponses(saveInsightFeedback(birthDate, insight.id, value))} />)}
    </div>
  );
}
