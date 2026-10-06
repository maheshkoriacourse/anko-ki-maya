# Anko Ki Maya — Premium Digital Report

Status: local flagship-report rebuild in progress; human review is a confirmed requirement; release and commercial readiness remain open.
Updated: 6 October 2026 (Asia/Kolkata)

## Owner intent

- A standalone digital report is priced at ₹1,00,000. A consultation is a separate service, also priced at ₹1,00,000; it is not bundled into the report.
- The standalone report must receive human editorial/numerology review before customer delivery. This is not a consultation and includes no live session.
- The app should be numerology-first and feel genuinely personal, useful, detailed, and worth recommending.
- The reading should include difficult and supportive possibilities, explain its reasoning, and help the customer think and act.
- The customer should be able to correct any interpretation. User-provided life events must not be passed off as facts inferred from birth data.

## What exists today

- Next.js 16 app, client-side profile and life-context storage, no account or backend.
- The former `/report` route generated a short reflection PDF. The former `/dossier` and `/life-graph` routes asserted private past/future events from birth numbers. Those entry points now redirect to the canonical `/blueprint` report/timeline while their legacy copy is quarantined.
- The former `/din-mausam` daily-warning screen made confident high-impact claims from number combinations. Its route now redirects to conditional report scenarios; `lib/day-weather.ts` remains quarantined and must not be re-exposed without review.
- The former `/dashboard3` yesterday/today/tomorrow cards also made ungrounded event-like statements. Its route now points to the evidence-labelled report scenarios; `lib/dashboard3.ts` and its old view are not linked as a predictive feature.
- The former `/life-events` page ranked user-reported past events by Personal Year and called this “resonance,” risking retrospective confirmation bias. Its route now points to the customer-authored report timeline; local legacy entries remain untouched and are not used to claim predictive accuracy.
- The former `/rajyoga` page translated digit coincidences into destiny/success claims and silently mixed planetary associations; it now routes to the calculation ledger. The former `/compatibility` screen used an arbitrary weighted marriage score across numerology and Vedic tables; it now routes to the grounded report, and the overview no longer links it.
- Removed the hidden Nakshatra/Vedic overlays and implicit graha attribution from Overview, its context brief, and Lo Shu. Numerology-only report and calculation surfaces must name their calculation convention; Vedic astrology stays out until it is separately scoped and transparently presented.
- The former Lucky page showed gemstones, costly giving practices, long prescribed ritual counts, and a wedding/launch date score. It now shows only optional number/day/color associations plus a direct warning that these cannot determine outcomes; individualized practical action lives in the report.
- The former Number Tools page compared a personal Mulank with planetary-friendship tables and advised keeping/changing phone, home, or vehicle numbers. It now calculates the digit sum only, requires no birth date, labels the result as optional symbolism, and directs choices to practical needs, safety, and cost.
- Name Studio still exposes tradition-based numeric rankings and spelling suggestions; it now warns before use that the score is an app-defined symbolic rule, not a probability or objective name-quality measure, and must not alone drive legal-identity or brand changes.
- `lib/truth.ts` and `lib/dossier-year.ts` remain historical code, are no longer imported by the canonical report routes, and must not be re-exposed without a separate evidence/safety review.
- `LifeContext` already captures focus, current challenge, desired outcome, decision, preferences, and user-authored timeline anchors. This is the best available source of real personalization.
- No payment, account, secure cloud delivery, report fulfillment, report versioning, consultation booking, human-review workflow, or defined service terms are configured.

Current app output is an automated working draft only; no screen or export may label it reviewed/final until a real, authorized reviewer completes and records sign-off.

## Product promise and hard boundary

The report combines (1) reproducible calculations, (2) clearly attributed number-symbolism traditions, and (3) the customer's own stated context and timeline. It can create reflective hypotheses and conditional planning scenarios. It cannot know unshared past events, establish that numerology caused an outcome, or guarantee future events.

Never assert from numbers alone that a person had a particular childhood, trauma, breakup, illness, job change, pregnancy, bereavement, financial loss/windfall, crime, or disaster. Do not prescribe paid gems, rituals, or donations as necessary to avert harm. Do not turn a broad personality phrase into a claim of accuracy.

## Core user journey

1. Enter name/date and see exactly which calculation system is in use.
2. Optionally add present context, a decision, desired outcome, and dated life anchors. Explain local-only storage and allow skipping.
   For a career-focused reading, invite current stage, the live decision, aim, and a practical constraint; use these only for conditional planning, never to infer hiring likelihood or timing from a birth date.
3. Preview a report with provenance labels: **Your input**, **Calculated**, **Traditional interpretation**, **Planning scenario**, or **Not enough information**.
4. Review the report, correct/remove an input, regenerate, then print/save as PDF.
5. Optional feedback distinguishes “fits / partly / not me” from objective outcome evidence. No claimed accuracy score without a defined outcome, follow-up window, enough observations, and a disclosed method.

## Report content requirements

- Cover and plain-language scope/limitations; identify the selected modern Pythagorean-style or Chaldean-style name-letter mapping and calculation version. Treat these as conventional table labels, not proof of ancient lineage or predictive validity. Date-based values show their own formulas and must not be presented as depending on the name-letter table.
- Executive synthesis grounded in at least two distinct, named inputs; say “not enough information” when context is insufficient.
- Core-number ledger with input, formula, intermediate sums, reduction/master-number policy, result, and tradition label.
- Convergence and tension section: show where separate chart positions repeat or differ; do not count duplicate derivations as independent evidence.
- User-authored life timeline: reproduce only the customer's own dated notes; compare the chosen year/cycle as a symbolic association and explicitly avoid causation claims. The Personal Year display uses the app's Jan 1–Dec 31 calendar-year convention and names it plainly.
- Optional past-7/30-day journal recap is opt-in; show only actual entries whose owner key exactly matches this profile, including date/text/category/self-rated mood. Exclude legacy unscoped or differently owned notes; never claim numerology revealed the event. Keep entries local, warn that print/PDF contains sensitive notes, and omit all journal data without consent.
- Any past-week memory prompt is a broad reflection question, never a discovered event; tell customers to check their own dated record rather than familiarity, and do not treat a match as evidence of predictive accuracy.
- The Journal screen also filters entries by the current saved profile key. Older entries without an owner key remain in browser storage, are hidden from the journal view, and can be handled through the existing full-data export/delete controls.
- Long-term-map goals now carry the same profile key and are only shown for the active profile; old unlinked goals remain stored but hidden.
- Present crossroads: quote only user-supplied text; distinguish it from the symbolic lens.
- Future: selectable horizons (week/month/quarter/year), conditional scenarios with opportunity, downside, observable trigger, counter-signal, reversible next step, and uncertainty. A scenario is not an event prediction.
- 12-month cycle map: begin at the current calendar month and show the next 12 Personal Month calculations, each with its year/month inputs and selected reduction convention. Label the number/lens as a traditional reflection only; connect prompts to a supplied decision/aim when available. Questions, low-risk actions, and watch-outs are an app-designed planning framework—not canonical numerology doctrine, probabilities, or claims that events will occur. When context is absent, label the map as general and invite the customer to add context.
- Practical remedy: no-cost, reversible, behavior-level action tied to the customer's stated focus. No paid product, health intervention, guarantee, or claim of supernatural protection.
- Optional cultural practice: contextual, voluntary, low-risk, non-commercial, never a treatment or guarantee.
- Method notes, source register, data/privacy note, and correction pathway.

## Pricing and operational state

Human review before report delivery is confirmed; consultation remains separate. Do not show “Buy”, accept payment, imply confirmed delivery, or represent this price as market-validated until the owner approves reviewer credentials/identity, scope, turnaround, revisions, support, refund/cancellation, data handling, and a real payment/delivery workflow. Keep current no-payment state honest.

The proposed human-review rubric and minimum sign-off fields are in [HUMAN_REVIEW_PROTOCOL.md](./HUMAN_REVIEW_PROTOCOL.md); this is an operating specification, not a live workflow or evidence of reviewer credentials.

## Measurement and release gates

- Correctness: every displayed number can be independently recalculated from the named method.
- Specificity: each personal claim points to a customer input or a transparent calculation; otherwise label it as a general tradition prompt.
- Honesty: no invented biography, certainty language, fear-based remedy, or unsupported “accuracy” badge.
- Usability: readable and interactive at 360px, tablet, and desktop; exportable without clipped sections; keyboard and screen-reader basics.
- Journal recap is absent unless its separate opt-in is true; it only reads same-profile owner-tagged entries in this browser and must retain that boundary when consent is revoked.
- Reliability: valid/invalid dates, no profile, empty context, malformed local data, print preview, language switch, and edit/delete paths tested.
- Release is separate: no production deployment, payment integration, account/cloud storage, or collection of customer data without the corresponding owner approval and operational design.

## Open decisions

- Who is the named, qualified reviewer, what rubric/sign-off is used, and what turnaround, revisions, support, and service terms apply? Human review is now a confirmed requirement. A consultation remains a separate ₹1 lakh service.
- Is Vedic astrology intended as a separate, opt-in product, or should the paid report remain numerology-only? Current paid report scope is numerology-first; quarantined astrology features require explicit product approval and a safety/method review before reactivation.
- What are the final included deliverables, report length, languages, turnaround, revision/support, cancellation/refund, and data-retention terms?
- Does the owner want cloud delivery/accounts/payment later? Current implementation remains local-only.
