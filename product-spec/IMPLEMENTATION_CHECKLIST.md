# Report rebuild checklist

## Research and specification

- [x] Confirm report is a standalone ₹1,00,000 digital product; consultation is separate at ₹1,00,000.
- [x] Inspect existing routes, data model, calculation engine, and audit.
- [x] Record evidence/limits and source attribution policy.
- [x] Check historical wording: call the selected tables Pythagorean-style/Chaldean-style rather than imply verified ancient lineage; separate name tables from date-cycle formulas.
- [x] Confirm human review is required for the ₹1 lakh standalone report; keep consultation separate at ₹1 lakh.
- [x] Draft a review rubric and sign-off record fields; keep it clearly marked non-operational until staff, data controls, and fulfillment exist.
- [ ] Name/verify reviewer, define rubric, turnaround, revisions, support, cancellation/refund, and delivery/data-retention terms before selling.
- [ ] Decide whether Vedic astrology stays outside the numerology report.

## Build

- [x] Replace the shallow `/report` with a context-grounded, print-friendly flagship report at `/blueprint`; keep `/report` as a redirect alias.
- [x] Add a pure report synthesis engine with explicit evidence provenance and “insufficient context” states.
- [x] Include calculation ledger and chart convergence/tension without double-counting derived values.
- [x] Incorporate user-authored timeline anchors and present decision; compare their Personal Year arithmetic without claiming cause or inventing events.
- [x] Show Pinnacles and Challenges with age windows and source formulas, not event guarantees.
- [x] Add conditional future planning scenarios with upside, downside, signal, counter-signal, and reversible step.
- [x] Add a current-month-through-next-11-month Personal Month map with visible formulas, 11/22/33 handling, bilingual cycle prompts, user-context anchor, practical step, and watch-out. Clearly distinguish traditional number themes from the app-authored planning framework; no event or probability claims.
- [x] Redirect deterministic Dossier/Life Graph event-entry points and unsupported daily forecast/warning pages to the evidence-labelled report. Remove them from navigation; legacy code remains quarantined.
- [x] Redirect the retrospective Life Events cycle-resonance score to the report's user-authored timeline; leave existing local data untouched and avoid implying a validated prediction pattern.
- [x] Remove the legacy Timeline navigation item because its content now lives inside the flagship report; keep the old URL as an anchor redirect for saved links.
- [x] Quarantine the digit-coincidence destiny claims and unvalidated weighted marriage score; remove Rajyoga and Compatibility from the customer path while Vedic scope and method remain unapproved.
- [x] Remove the hidden Nakshatra/Vedic overlay from Overview and Lo Shu; the premium report and numerology-only views no longer use undisclosed Vedic verification.
- [x] Remove gemstone/daan prescriptions and arbitrary wedding/launch date scoring from the Lucky customer page; keep only optional symbolic number/day/color associations and route practical steps to the report.
- [x] Remove planet-friendship purchase/use recommendations from the phone/home/vehicle number tool; keep its digit-sum calculation available without requiring birth data.
- [x] Disclose Name Studio's score as an app-defined symbolic convention, not objective name quality or a reason by itself to change legal identity or a brand.
- [x] Ensure report inputs can be edited/deleted in existing Calibration/Settings paths; explain local-only storage; add print/save PDF.
- [x] Validate and bound report context read from local storage; ignore malformed, unrelated-profile, and invalid anchors.
- [x] Keep payment, cloud upload, consultation booking, and marketing accuracy claims disabled.
- [x] Mark the built-in profile as sample data across the app and inside printable reports; never prefill it into the customer's onboarding fields. Saved customer profiles prefill on return. Explicit delete/sign-out prevents automatic demo reseeding until a profile is created or demo mode is explicitly reset.
- [x] Disclose that Pythagorean/Chaldean selection changes name-letter mapping, while date-derived calculations use their own displayed formulas; remove the obsolete Settings claim that Chaldean readings still use Pythagorean.
- [x] Let the customer choose Pythagorean or Chaldean during onboarding; explain the choice's name-only scope before they continue.
- [x] Display the selected modern letter-table convention consistently in onboarding, report metadata, and the number ledger.
- [x] Label Personal Year as the app's Jan 1–Dec 31 calendar-year convention and show its reduction formula/master-number rule.
- [x] Add a visible “automated working draft · human review required” label; do not imply reviewer sign-off exists.
- [x] Separate scenario provenance into actual customer context and the traditional cycle lens; state that the cycle does not establish job/decision outcomes.
- [x] Keep each scenario's reasoning visible and include the chosen-area detail even when a separate decision is also entered.
- [x] Ask for career stage/decision/goal/constraint when career is the chosen focus; state that numerology cannot establish whether or when someone will be hired.
- [x] Add opt-in local recap of actual journal entries from the past 7 and 30 days; do not infer events from numerology; explain that PDF/print can expose sensitive notes.
- [x] State that broad retrospective prompts may fit many people, require checking a diary/calendar, and do not count a match as a numerology prediction.
- [x] Filter Journal's visible list to the active profile key; legacy unscoped entries stay stored but are disclosed as hidden and omitted from report recaps.

## Verify and repeat

- [x] Add unit tests for calculation parity, provenance, context-empty cases, malformed local data, timeline comparison, and scenario safety.
- [x] Existing tests (344), TypeScript, production build, and `git diff --check` pass after the monthly-map addition. Focused ESLint passes on report/calibration pages, report engine, and regression test. Whole-repository ESLint still has 27 errors across remaining legacy Dossier/dashboard components and scratch scripts; no lint errors are reported in the new report engine/component or touched report route.
- [x] Local-browser smoke check of 20 primary and legacy URLs: routes rendered/redirected to the canonical report without a not-found page; no browser console errors. At 390px, all 20 routes had no horizontal document overflow; onboarding YYYY remained visible/editable (107px) and accepted `1990`, and adding a timeline entry exposed an enabled/editable year input (281px) within the viewport. Sample profile warning and blank onboarding behavior are verified in-browser.
- [x] End-to-end flow: profile → calibration → report → edit source → re-render. Verified with fictional data in isolated local origins; QA data was deleted afterward. The print control is present, but actual browser print/PDF output remains unverified.
- [x] Desktop/mobile/tablet report QA: visually checked at 360px and 1280px; English/Hinglish at 390px; tablet layout/overflow checked at 768px. No document-level horizontal overflow was found. One visible keyboard-focus check passed.
- [ ] Actual browser print-preview/PDF inspection remains open. The report has print-specific CSS and a working `window.print()` control, but page breaks, clipped content, and saved PDF output have not been visually verified.
- [ ] Check for unsupported second-person claims and death/illness/marriage/job/money guarantees.
- [ ] Inspect screenshots and fix every discovered clipping, overflow, dead link/button, and wording issue; rerun checks. The mobile report screenshot showed no document-level horizontal overflow; this is not a full-page visual audit.
- [x] Fix duplicate report section numbering and separate the timeline empty-state action from its explanatory copy.
- [ ] Do not push to production branch or deploy unless the user explicitly requests release after review.
