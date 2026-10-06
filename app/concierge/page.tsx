"use client";

import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { PageHeader } from "@/components/shared";
import { useT } from "@/lib/lang";

const whatsapp = process.env.NEXT_PUBLIC_CONCIERGE_WHATSAPP?.replace(/\D/g, "");
const email = process.env.NEXT_PUBLIC_CONCIERGE_EMAIL;

function inquiry(service: "report" | "consultation", hi: boolean) {
  const name = service === "report" ? (hi ? "standalone ₹1,00,000 human-reviewed report" : "standalone ₹1,00,000 human-reviewed report") : (hi ? "alag ₹1,00,000 private consultation" : "separate ₹1,00,000 private consultation");
  return encodeURIComponent(hi
    ? `Namaste, main ${name} ke baare mein likhit scope, reviewer/consultant, availability, timeline, deliverables, revisions/support, privacy aur cancellation/refund terms confirm karna chahta/chahti hoon. Main pehle message mein personal janm-vivaran share nahi karunga/karungi.`
    : `Hello, I am asking about the ${name}. Please confirm the named reviewer/consultant, availability, written scope, deliverables, timeline, revisions/support, privacy, and cancellation/refund terms. I am not sharing personal birth details in this first inquiry.`);
}

function InquiryActions({ service, hi }: { service: "report" | "consultation"; hi: boolean }) {
  const body = inquiry(service, hi);
  const subject = service === "report" ? "Standalone report inquiry" : "Separate consultation inquiry";
  const mailHref = email ? `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}` : undefined;
  const waHref = whatsapp ? `https://wa.me/${whatsapp}?text=${body}` : undefined;
  if (!mailHref && !waHref) return <p role="status" className="text-sm text-muted-foreground">{hi ? "Inquiry channel abhi configure nahi hai. Is page par payment ya booking nahi hai." : "Inquiry channels are not configured. This page does not take payment or bookings."}</p>;
  return <div className="flex flex-wrap gap-3">
    {mailHref ? <a href={mailHref}><Button><Mail aria-hidden />{hi ? "Likhit scope email karein" : "Ask for written scope by email"}</Button></a> : null}
    {waHref ? <a href={waHref} target="_blank" rel="noopener noreferrer"><Button variant="outline"><MessageCircle aria-hidden />{hi ? "WhatsApp par poochhein" : "Ask on WhatsApp"}</Button></a> : null}
  </div>;
}

function OfferCard({ service, hi }: { service: "report" | "consultation"; hi: boolean }) {
  const report = service === "report";
  return <Card className="glass border-gold/40">
    <CardHeader>
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">{hi ? "Prastavit seva · pehle availability aur terms confirm karein" : "Proposed service · confirm availability and terms first"}</p>
      <CardTitle className="font-display text-2xl">{report ? (hi ? "Standalone written report" : "Standalone written report") : (hi ? "Private consultation" : "Private consultation")}</CardTitle>
      <p className="font-display text-3xl">₹1,00,000</p>
      <p className="text-sm text-muted-foreground">{report
        ? (hi ? "Owner-set target fee. Report mein human review/sign-off zaroori hai; abhi reviewer aur delivery workflow operational nahi, isliye yeh final report khareedne ka checkout nahi hai." : "Owner-set target fee. Human review/sign-off is required; the reviewer and delivery workflow are not operational yet, so this is not checkout for a finished report.")
        : (hi ? "Owner-set fee, report se alag. Session ka daayra, consultant, avadhi, deliverables aur availability pehle likhit mein confirm honge; koi session abhi book nahi ho raha." : "Owner-set fee, separate from the report. Session scope, consultant, duration, deliverables, and availability must be confirmed in writing; no session is being booked here.")}</p>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="rounded-xl border bg-background/60 p-4"><p className="flex items-center gap-2 font-medium"><ShieldCheck aria-hidden className="size-4 text-gold" />{hi ? "Dono alag sevaayein hain" : "Two separate services"}</p><p className="mt-2 text-sm text-muted-foreground">{report
        ? (hi ? "Yeh likhit report hai; consultation shamil nahi. App ka automated PDF sirf draft hai, paid/final human-reviewed report nahi." : "This is the written report; consultation is not included. The app’s automated PDF is only a draft, not a paid/final human-reviewed report.")
        : (hi ? "Yeh consultation hai; standalone written report shamil nahi. Report chahiye toh woh alag ₹1,00,000 seva hai." : "This is the consultation; the standalone written report is not included. If you want the report, that is a separate ₹1,00,000 service.")}</p></div>
      <p className="text-xs leading-5 text-muted-foreground">{hi ? "Pehli inquiry mein personal birth details bhejne ki zaroorat nahi. Koi guaranteed prediction, medical/legal/financial advice, ya paid remedy ka vaada nahi." : "Do not send personal birth details in your first inquiry. No guaranteed predictions, medical/legal/financial advice, or paid-remedy promises."}</p>
      <InquiryActions service={service} hi={hi} />
    </CardContent>
  </Card>;
}

export default function ConciergePage() {
  const { lang } = useT();
  const hi = lang === "hi";
  return <div className="mx-auto max-w-5xl space-y-6">
    <PageHeader title={hi ? "Do alag private sevaayein" : "Two distinct private services"} subtitle={hi ? "Written report aur consultation alag offerings hain. Pehle human reviewer/consultant, scope, delivery aur likhit terms confirm honge; yahan koi payment ya booking nahi hoti." : "The written report and consultation are separate offerings. Confirm the human reviewer/consultant, scope, delivery, and written terms first; this page does not accept payment or bookings."} />
    <div className="grid gap-5 lg:grid-cols-2"><OfferCard service="report" hi={hi} /><OfferCard service="consultation" hi={hi} /></div>
    <div className="flex flex-wrap gap-3"><Link href="/blueprint"><Button variant="outline">{hi ? "Automated draft dekhein" : "View the automated draft"}<ArrowRight aria-hidden /></Button></Link><Link href="/calibration" className="inline-flex h-10 items-center rounded-lg px-3 text-sm underline underline-offset-4">{hi ? "Pehle context jodein" : "Add context first"}</Link></div>
  </div>;
}
