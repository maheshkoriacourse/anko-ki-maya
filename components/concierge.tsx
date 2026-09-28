"use client";

/**
 * Anko Ki Maya v2 — Concierge landing section (front of the onboarding page).
 * Premium ₹99,999 concierge blueprint — inquiry via WhatsApp/mail, no payments.
 */

import * as React from "react";
import { Crown, MessageCircle, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";

const WHATSAPP_NUMBER = "919999999999"; // replaced by owner in Settings later
const EMAIL = "concierge@ankokimaya.in";

export function ConciergeSection() {
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);

  const bullets =
    lang === "hi"
      ? [
          "120+ पृष्ठ-समकक्ष व्यक्तिगत ब्लूप्रिंट — इंजन से दो-गुना गहरा, हस्त-निर्मित स्तर",
          "एक-पर-एक 90-मिनट की वॉक-थ्रू कॉल (हिन्दी या English)",
          "नाम-अनुकूलन स्टूडियो: आपके नाम और आपके व्यवसाय-नाम दोनों की कैल्डियन जाँच",
          "12-मास घटना-मौसम कैलेंडर + 3 मोड़-बिंदु महीनों की व्यक्तिगत रणनीति",
          "परंपरागत उपाय-पत्रक: मंत्र, जप-संख्या, यंत्र, दान — आपके अंकों के अनुसार",
          "एक वर्ष तक प्रश्नों के लिए WhatsApp समर्थन",
        ]
      : [
          "120+ page-equivalent personal blueprint — engine-deep, hand-finished",
          "One-on-one 90-minute walkthrough call (Hindi or English)",
          "Name-optimization studio: your personal and business names both checked",
          "12-month event-weather calendar + personal strategy for 3 turning-point months",
          "Traditional remedy sheet: mantra, japa count, yantra, daan — for your numbers",
          "WhatsApp support for questions for one year",
        ];

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === "hi"
      ? "नमस्ते! मैं लाइफ़ ब्लूप्रिंट कंसीयज (₹99,999) के बारे में जानना चाहता/चाहती हूँ।"
      : "Namaste! I'd like to know more about the Life Blueprint Concierge (₹99,999).",
  )}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    lang === "hi" ? "लाइफ़ ब्लूप्रिंट कंसीयज — पूछताछ" : "Life Blueprint Concierge — inquiry",
  )}`;

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
              {lang === "hi" ? "सीमित सीटें · आमंत्रण द्वारा" : "Limited seats · by application"}
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
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#1faa53] text-white hover:bg-[#189547]">
              <MessageCircle aria-hidden /> {t("conciergeCta")}
            </Button>
          </a>
          <a href={mailHref}>
            <Button size="lg" variant="outline">
              <Mail aria-hidden /> {t("conciergeCtaMail")}
            </Button>
          </a>
          <p className="text-xs text-muted-foreground">
            {lang === "hi"
              ? "कोई ऑनलाइन भुगतान नहीं — पहले बातचीत, फिर निर्णय।"
              : "No online payments — a conversation first, then the decision."}
          </p>
        </div>
      </div>
    </section>
  );
}