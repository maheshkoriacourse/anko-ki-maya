"use client";

/**
 * Anko Ki Maya v2 — Concierge landing section (front of the onboarding page).
 * Premium ₹99,999 concierge blueprint — inquiry via WhatsApp/mail, no payments.
 */

import * as React from "react";
import Link from "next/link";
import { Crown, MessageCircle, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_CONCIERGE_WHATSAPP?.replace(/\D/g, "");
const EMAIL = process.env.NEXT_PUBLIC_CONCIERGE_EMAIL;

export function ConciergeSection() {
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);

  const bullets =
    lang === "hi"
      ? [
          "Aapke saath scope tay karke taiyaar kiya gaya vyaktigat blueprint",
          "Walkthrough call, agar inquiry ke dauraan confirm ho",
          "Aapke diye naam aur spelling ke ankon ki tulna",
          "12-mahine ka reflection aur planning calendar—ghatna ki guarantee nahi",
          "Paramparagat practices ko optional saanskritik reflection ke roop mein",
          "Payment se pehle follow-up aur support likhit mein tay",
        ]
      : [
          "A personal blueprint, reviewed with you before any premium engagement",
          "A focused walkthrough call, if confirmed during the inquiry",
          "Name-number comparison for the names and spellings you provide",
          "A 12-month reflection and planning calendar—not guaranteed events",
          "Traditional practices presented as optional cultural reflection",
          "Follow-up scope and support agreed in writing before payment",
        ];

  const waHref = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === "hi"
      ? "namaste! main laaiph blooprint knseeyaj (₹99,999) ke baare mein jaanana chaahata/chaahai hoo."
      : "Namaste! I'd like to know more about the Life Blueprint Concierge (₹99,999).",
  )}` : undefined;
  const mailHref = EMAIL ? `mailto:${EMAIL}?subject=${encodeURIComponent(
    lang === "hi" ? "laaiph blooprint knseeyaj — poochhataachh" : "Life Blueprint Concierge — inquiry",
  )}` : undefined;

  return (
    <section
      aria-labelledby="concierge-h"
      className="glass constellation-bg relative overflow-hidden rounded-2xl"
    >
      <div className="aurora-wash absolute inset-0" aria-hidden />
      <div className="relative p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span aria-hidden className="grid size-12 place-items-center rounded-xl bg-gold/15 text-gold">
            <Crown className="size-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {lang === "hi" ? "seemit seeten · aamntran dvaara" : "Limited seats · by application"}
            </p>
            <h2 id="concierge-h" className="font-display text-2xl font-semibold sm:text-3xl">
              {t("conciergeTitle")}
            </h2>
          </div>
          <span aria-hidden className="ml-auto font-display text-3xl gold-foil sm:text-4xl">
            {t("conciergePrice")}
          </span>
        </div>

        <div className="gold-rule my-6" />

        <ul className="grid gap-2.5 text-sm sm:grid-cols-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
              <span className="text-muted-foreground">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link href="/concierge">
            <Button size="lg" variant="outline">{lang === "hi" ? "Poora scope aur shartein" : "See full scope and terms"}</Button>
          </Link>
          {waHref ? <a href={waHref} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#1faa53] text-white hover:bg-[#189547]">
              <MessageCircle aria-hidden /> {t("conciergeCta")}
            </Button>
          </a> : null}
          {mailHref ? <a href={mailHref}>
            <Button size="lg" variant="outline">
              <Mail aria-hidden /> {t("conciergeCtaMail")}
            </Button>
          </a> : null}
          <p className="text-xs text-muted-foreground">
            {waHref || mailHref
              ? (lang === "hi" ? "Pehle scope, deliverables aur fee likhit mein tay karein; phir hi bhugataan karein." : "Agree the scope, deliverables, and fee in writing before making any payment.")
              : (lang === "hi" ? "Premium inquiry abhi configure nahi hai. Koi bhugataan link sakriya nahi." : "Premium inquiries are not configured yet. No payment link is active.")}
          </p>
        </div>
      </div>
    </section>
  );
}
