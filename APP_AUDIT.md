# Anko Ki Maya — product audit

Audit date: 5 October 2026  
Scope: all 22 Next.js app routes and shared UI/content source, plus the redesigned local homepage's rendered DOM/layout. This is a source and journey audit, not a claim that every route has passed screenshot-based cross-device QA. The current public deployment has not received these uncommitted changes.

## Immediate findings

### P0 — Do not imply numerology knows a customer's past

The Dossier and adjacent long-form content contain emotionally specific second-person narratives and “hidden story” statements generated from numbers (for example `lib/dossier-chapters.ts`, `lib/dossier-wounds.ts`, `components/dossier-gate.tsx`, and `app/dossier/page.tsx`). Without a customer-provided event or context, this reads as a factual claim about their childhood, family, relationships, or hardship. A disclaimer elsewhere does not undo that first impression. Preserve the emotional depth, but label interpretations as hypotheses, distinguish user-confirmed facts from symbolic reading, ask the customer to confirm or correct them, and never fabricate a past event.

### P1 — The ₹99,999 offer is not yet a purchasable, evidenced service

The price is visible, but the homepage currently reports that no inquiry channel is configured (`components/concierge.tsx`). The concierge detail page calls this a proposed engagement and says expert identity, scope, timeline, support, and refund terms must be agreed before payment (`app/concierge/page.tsx`). That honesty is good; the next requirement is a real named delivery owner, concrete deliverables, timeline, revision/support limits, refund/cancellation terms, secure intake, and a working inquiry flow. Do not imply that the automated app alone is worth or delivers ₹99,999.

### P1 — Too many overlapping ways to explore the same ideas

The product exposes 18 destinations in `components/app-shell.tsx`: Overview, Blueprint, Life Graph, Forecast, Journal, Calibration, Numbers, Lo Shu, Rajyoga, day weather, dashboard, Dossier, long-term map, lucky tools, name studio, number tools, settings, and concierge. Some are useful specialist views, but the large feature inventory competes with a simple promise. Keep the five primary destinations; group the rest into a smaller, customer-language “Explore” area and remove duplicate or low-value modules after journey testing. Give each remaining destination one clear job and link to it from the report when relevant.

### P1 — Prediction voice is inconsistent with the product's ethical limits

Most pages correctly frame numerology as a reflective tradition, not evidence or certainty. However, the shared reasoning panel and compatibility page said “On this basis we predict your reading,” and the original SEO description said a person's numbers calculate their past, present, and future. Those claims conflict with the careful copy elsewhere. The shared language is now changed to explain calculations and limits; audit every English and Roman-Hinglish string together before release.

### P1 — “Why this insight?” must be useful, not just a number chain

Several screens show calculation steps but do not consistently make the interpretation auditable: which inputs were used, what came from the customer, what is a traditional association, why the time window is shown, how uncertain the claim is, and what observation would make it relevant or not. Every important insight should expose those layers in plain language, including “not enough information” when context is absent.

### P2 — Local-only storage needs a clearer product boundary

Settings says profile, journal, and milestones stay in browser `localStorage`, with export and delete controls (`app/settings/page.tsx`). This avoids server-side exposure but also means no cross-device sync or account recovery and may be lost when browser data is cleared. Explain this before collecting birth details, keep export/delete easy to find, and test backup/restore plus deletion. Do not describe localStorage as secure storage for highly sensitive free text.

### P2 — Hinglish needs editorial ownership

The app uses Roman Hinglish, English, and Sanskrit/Hindi-derived terminology in the same flow. The source contains inconsistent register and some transliteration errors. Have a fluent editor standardize spelling, tone, number names, labels, and sensitive language across all routes. Test both language modes on narrow screens; language-switch UI alone is not evidence of a complete translation.

## Change made in this pass

- Replaced the old centered-form landing with an editorial, responsive hero; a three-step explanation; clearer intake card; example reading; privacy note; and premium-service section.
- Replaced the global saffron/temple/occult surfaces with a calmer ivory, ink, and restrained vermilion palette, including cleaner shared cards and navigation.
- Reworded shared and compatibility calculation footers so they explain basis and limits instead of implying a prediction; updated SEO copy and one visibly garbled Hinglish link.
- Corrected the concierge inquiry's Hinglish message.
- Added this audit for the next release decisions.

## Release gates before calling the redesign done

1. Review the Dossier and all past-tense second-person statements; separate user-supplied facts from interpretive hypotheses and add an explicit correction/feedback path.
2. Approve and publish the actual concierge service specification, including who delivers it and what the fee buys; keep inquiry/payment disabled until those prerequisites exist.
3. Reduce and label the app navigation around the core journey; test whether new users can explain where to get “now,” “past,” “next,” and “full report” without guidance.
4. Have a fluent Hinglish editor review the entire experience, not only the landing screen.
5. Run desktop and mobile visual QA on onboarding, calibration, Overview, Blueprint, Life Graph, Forecast, Dossier, Settings, and concierge; check light/dark and EN/HI modes.
6. Validate critical flows: invalid and valid birth details, returning profile, context save/edit/delete, browser export/import, report print, no-profile states, and unavailable concierge channel.
7. Resolve CI checks and deploy; then inspect the production URL to verify the exact new build. A successful local build is not proof of a successful production redesign.

## Verification notes

- `npm run build`: passed after the design and copy changes.
- `npm test`: test runner could not read a directory above the workspace (`Access is denied`) while loading `vitest.config.ts`; test assertions did not run.
- `npm run lint`: repository currently has many pre-existing errors; targeted lint also flags state initialization inside existing effects in the touched onboarding/shell files. This needs a separate lint cleanup or a focused correction before CI can be treated as clean.
- Local homepage DOM renders the new content and its desktop columns fit within the 1536px viewport without horizontal overflow. Browser screenshot capture timed out, so visual screenshot QA remains open.
- Git push and Vercel deployment have not happened for these changes. The public site can therefore still show the previous design.
