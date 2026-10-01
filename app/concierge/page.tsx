"use client";

import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Mail, ShieldCheck } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { PageHeader } from "@/components/shared";
import { useT } from "@/lib/lang";

const whatsapp = process.env.NEXT_PUBLIC_CONCIERGE_WHATSAPP?.replace(/\D/g, "");
const email = process.env.NEXT_PUBLIC_CONCIERGE_EMAIL;

export default function ConciergePage() {
  const { lang } = useT();
  const hi = lang === "hi";
  const scope = hi ? [
    "Session se pehle questionnaire aur aapke prashnon ki review",
    "Ank-ganit aur aapke diye sandarbh par aadharit, human-reviewed aur manually edited dossier",
    "90-minute private interpretation aur strategy call (samay aur bhasha pehle confirm)",
    "Aapke goals ke saath bana 12-month decision calendar",
    "Aapki zaroorat ho toh personal ya business name analysis",
    "Saal ke dauraan do follow-up reviews aur pehle se tay seemaon mein message support",
    "Call ke baad likhit decisions aur next-steps document",
  ] : [
    "Pre-session review of your questionnaire and questions",
    "A human-reviewed, manually edited dossier grounded in numerology calculations and the context you provide",
    "A 90-minute private interpretation and strategy call (time and language agreed in advance)",
    "A 12-month decision calendar tied to your stated goals",
    "Personal or business name analysis if relevant to your situation",
    "Two follow-up reviews during the year and message support within written limits",
    "A written decisions-and-next-steps document after the call",
  ];
  const message = encodeURIComponent(hi
    ? "Namaste, main Private Life Blueprint Concierge ke liye scope, expert availability, deliverables aur fee ki likhit pushti chahta/chahti hoon. Main abhi koi personal birth details share nahi kar raha/rahi."
    : "Hello, I’m interested in the Private Life Blueprint Concierge. Please confirm expert availability, exact scope, deliverables, support limits, and the fee in writing. I am not sharing personal birth details yet.");
  const mailHref = email ? `mailto:${email}?subject=${encodeURIComponent("Private Life Blueprint Concierge inquiry")}&body=${message}` : undefined;
  const waHref = whatsapp ? `https://wa.me/${whatsapp}?text=${message}` : undefined;

  return <div className="mx-auto max-w-4xl space-y-6">
    <PageHeader title={hi ? "Private Life Blueprint Concierge" : "Private Life Blueprint Concierge"} subtitle={hi ? "Gehri vyaktigat reading tabhi meaningful hai jab trained human aapke sandarbh ko padhe, interpretation ko edit kare aur aapke saath strategy par kaam kare." : "A premium engagement should earn its fee through real human attention: context review, edited interpretation, a private strategy session, and follow-through—not page count."} />
    <Card className="glass border-gold/40">
      <CardHeader><p className="text-xs font-semibold uppercase tracking-widest text-gold">{hi ? "Proposed service · pehle availability confirm karein" : "Proposed service · confirm availability first"}</p><CardTitle className="font-display text-3xl">₹99,999</CardTitle><p className="text-sm text-muted-foreground">{hi ? "Yeh automated report ki keemat nahi. Payment se pehle named expert, exact scope, timeline, support limit aur refund terms likhit mein confirm hone chahiye." : "This price is not for an automated report. Before payment, confirm the named expert, exact scope, delivery timeline, support limits, and refund terms in writing."}</p></CardHeader>
      <CardContent className="space-y-5">
        <ul className="grid gap-3 sm:grid-cols-2">{scope.map((item) => <li key={item} className="flex items-start gap-2 text-sm"><Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" /><span>{item}</span></li>)}</ul>
        <div className="rounded-xl border bg-background/60 p-4"><p className="flex items-center gap-2 font-medium"><ShieldCheck aria-hidden className="size-4 text-gold" />{hi ? "Saaf seemaayein" : "What this service cannot promise"}</p><p className="mt-2 text-sm text-muted-foreground">{hi ? "Koi exact event, shaadi, sehat, dhan, naukri ya jeet ki guarantee nahi. Numerology paramparagat interpretive lens hai, proof ya professional medical, legal, psychological ya financial advice nahi. Remedies optional hain; gemstone ya paid ritual kharidna zaroori nahi." : "No guaranteed event, marriage, health, wealth, job, or victory. Numerology is a traditional interpretive lens, not proof or a substitute for medical, legal, psychological, or financial advice. Remedies are optional; no gemstone or paid ritual is required."}</p></div>
        <div className="flex flex-wrap items-center gap-3">
          {mailHref ? <a href={mailHref}><Button><Mail aria-hidden />{hi ? "Email se scope poochhein" : "Ask about scope by email"}</Button></a> : null}
          {waHref ? <a href={waHref} target="_blank" rel="noopener noreferrer"><Button variant="outline"><MessageCircle aria-hidden />{hi ? "WhatsApp par poochhein" : "Ask on WhatsApp"}</Button></a> : null}
          {!mailHref && !waHref ? <p role="status" className="text-sm text-muted-foreground">{hi ? "Inquiry channel abhi configure nahi hai. Is page par koi payment ya fake contact link nahi." : "The inquiry channel is not configured. There is no payment link or placeholder contact here."}</p> : null}
        </div>
        <p className="text-xs text-muted-foreground">{hi ? "Pehle inquiry mein personal birth details bhejne ki zaroorat nahi. Availability aur likhit terms confirm hone ke baad hi aage badhein." : "You do not need to send birth details in your first inquiry. Share sensitive information only after availability and written terms are confirmed."}</p>
      </CardContent>
    </Card>
    <div className="flex flex-wrap gap-3"><Link href="/blueprint"><Button variant="outline">{hi ? "Digital blueprint dekhein" : "Explore the digital blueprint"}<ArrowRight aria-hidden /></Button></Link><Link href="/calibration" className="inline-flex h-10 items-center rounded-lg px-3 text-sm underline underline-offset-4">{hi ? "Pehle apna sandarbh jodein" : "Calibrate your reading first"}</Link></div>
  </div>;
}
