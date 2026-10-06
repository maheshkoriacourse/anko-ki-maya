"use client";

/** Landing-page summary of the two separate, inquiry-only services. */

import Link from "next/link";
import { ArrowRight, Crown, FileText, MessageCircle } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useT } from "@/lib/lang";

export function ConciergeSection() {
  const { lang } = useT();
  const hi = lang === "hi";

  return (
    <section aria-labelledby="concierge-h" className="landing-concierge-card relative overflow-hidden rounded-2xl">
      <div className="landing-concierge-wash absolute inset-0" aria-hidden />
      <div className="relative p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <span aria-hidden className="grid size-12 place-items-center rounded-xl bg-gold/15 text-gold"><Crown className="size-6" /></span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{hi ? "DO ALAG SEVAAEIN · PEHLE LIKHIT TERMS" : "TWO DISTINCT SERVICES · WRITTEN TERMS FIRST"}</p>
            <h2 id="concierge-h" className="font-display text-2xl font-semibold sm:text-3xl">{hi ? "Private report aur consultation" : "Private report & consultation"}</h2>
          </div>
        </div>
        <div className="gold-rule my-6" />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-background/75">
            <CardHeader>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold"><FileText aria-hidden className="size-4" />{hi ? "Standalone likhit report" : "Standalone written report"}</p>
              <CardTitle className="font-display text-3xl">₹1,00,000</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{hi ? "Is fee mein consultation shamil nahi. Customer ko dene se pehle human review aur sign-off zaroori hai." : "Consultation is not included. Human review and sign-off are required before customer delivery."}</p>
              <p className="text-xs">{hi ? "Reviewer aur delivery workflow abhi operational nahi; koi final report checkout par uplabdh nahi." : "Reviewer and delivery workflow are not operational yet; no final report is available for checkout."}</p>
            </CardContent>
          </Card>
          <Card className="bg-background/75">
            <CardHeader>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold"><MessageCircle aria-hidden className="size-4" />{hi ? "Alag private consultation" : "Separate private consultation"}</p>
              <CardTitle className="font-display text-3xl">₹1,00,000</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{hi ? "Yeh standalone report se alag consultation offering hai; report fee mein bundled nahi. Iska format abhi confirm nahi." : "This is a separate consultation offering, not included in or bundled with the written report. Its format is not confirmed yet."}</p>
              <p className="text-xs">{hi ? "Consultant, scope, avadhi aur terms abhi confirm nahi; is page par koi booking ya payment nahi." : "Consultant, scope, duration, and terms are not yet confirmed; no booking or payment is taken here."}</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href="/concierge"><Button size="lg" variant="outline">{hi ? "Dono sevaon ka scope dekhein" : "Review both service scopes"}<ArrowRight aria-hidden /></Button></Link>
          <p className="text-xs text-muted-foreground">{hi ? "Pehle inquiry karein; pehle message mein janm-vivaran na bhejein." : "Inquiry only; do not send birth details in your first message."}</p>
        </div>
      </div>
    </section>
  );
}
