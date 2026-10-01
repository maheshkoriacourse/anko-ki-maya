# Anko Ki Maya — product architecture and page map

## Product promise

Anko Ki Maya is a numerology-informed pattern reflection and decision-planning product. It combines transparent traditional calculations with the customer's own stated goals and timeline. It does not claim that numerology proves past events or guarantees future events. A premium concierge is a human service and must not be sold as an automated report.

## Guided customer journey

1. **Welcome and trust** (`/`): explain the lens, privacy, limits, and the difference between the free snapshot and private concierge. Do not show placeholder contact or payment links.
2. **Foundation** (`/`): name, birth date, optional birth time/place, and calculation system.
3. **Private calibration** (`/calibration`): current focus, challenge, desired outcome, decision, optional timeline anchors, energy/stress check-in, work/relationship/money preferences, spiritual-practice preference, preferred directness, and separate optional-use consent controls.
4. **Current snapshot** (`/overview`): present-cycle overview and a short context summary. The summary is intentionally a preview; detailed evidence-led reflections live in the Blueprint.
5. **Life Blueprint** (`/blueprint`): editorial report beginning with the current situation and three personal reflections; calculation provenance and uncertainty can be opened on demand.
6. **Time and action** (`/forecast`): 12-month planning calendar plus near-term windows (last-week memory check, today, coming week, coming month). Past guesses remain hypotheses until the user confirms them. Each future window states a cycle lens, possible friction, observable signal, and practical response.
7. **Supporting tools**: `/life-graph`, `/numbers`, `/loshu`, `/name-studio`, `/compatibility`, `/journal`, `/din-mausam`, `/longterm`, `/dossier`, `/rajyoga`, `/lucky`, and `/number-tools` are secondary explorations, not equal-weight entry points.
8. **Private Life Blueprint Concierge** (`/concierge`): disclose proposed human deliverables, limitations, and written pre-payment scope. Inquiry is available only through owner-configured contact details.

## Existing-page replacement / role map

| Existing surface | New role | Current state |
|---|---|---|
| `/` onboarding | Trust-first welcome and profile foundation | Existing flow retained; profile submit now leads to private calibration |
| `/overview` | Compact “today / present chapter” snapshot | Life-context summary added; warning block appears here once |
| `/calibration` | Private context and preferences intake | Added; optional fields and anchors are saved locally |
| `/blueprint` | Primary long-form report | Context, three structured personal reflections, evidence, fit feedback added |
| `/life-graph` | User-reported timeline beside traditional cycle lens | Copy clarified so cycle matches are not treated as causes or proof |
| `/forecast` | 12-month decision calendar and near-term reflection windows | Expanded from six to twelve months; weekly/monthly windows explain their calculation |
| `/journal` | Private self-reflection tool | Existing; journal analysis is not active and must remain opt-in before implementation |
| `/concierge` | Human-reviewed premium service inquiry | Added; no payment flow, no placeholder contact details |
| Other chart/tools routes | Supporting tools | Still available under “Explore your chart”; further copy/layout audit remains |

## Insight contract

The three new Blueprint reflections show their number inputs, user-provided context, domain and period, practical step, observable signal, confidence label, what could change the interpretation, and a plain-language limitation. The ten legacy life-area passages still derive from birth-date cycles alone: they are explicitly labelled as unverified traditional reflections, not personal facts. Do not treat a customer's “fits” response as independent proof; do not argue with a “not my experience” response. Journal-derived patterns require explicit, implemented consent and must not be implied before they exist.

## Content/repetition audit (current implementation)

- The repeated Sanket warning is hidden outside `/overview`; the global shell still has one compact disclaimer/footer treatment.
- Life-context facts appear as a short snapshot on `/overview` and as report evidence on `/blueprint`. This is an intentional overview/report pair; detailed Priority Signals appear only in the Blueprint.
- Short-horizon readings appear only in `/forecast`; their evidence explanation is local to each time window.
- A past-week guess is not promoted to a timeline anchor or report fact. “Not my experience” hides that guess on later visits.
- The legacy birth-date-only warning banner was removed from the Overview after QA found deterministic claims about money, health, relationships, and lifetime “karmic debt” presented as if known facts. The Overview now links cycle themes to planning, not event claims.
- Blueprint adds a chapter jump index, labels historical readings as unconfirmed hypotheses, identifies the birth-date-only basis of its ten life-area passages, and discloses the Vedic chart's time and Mumbai-reference-location limitations.
- Overview, Blueprint, and near-term forecast copy now use a consistent Roman-Hinglish register when HI is selected. The UI calls this option “Hinglish (Roman)” rather than implying Devanagari Hindi.
- Concierge claims were changed from guaranteed page-count/call/support promises to scope that must be confirmed in writing. Price is shown, but no online payment is active.
- Route smoke check: all 20 primary routes loaded on the local review profile without an application-error surface. Visual inspection covered desktop Overview, Blueprint, and Forecast; this was not a device-matrix or native-speaker language certification.

## Release gates still required

- Native-speaker Hindi/Hinglish sign-off for legacy chart, remedy, and supporting-tool content. Several untouched secondary routes still contain awkward or deterministic language.
- Mobile-device visual QA and cross-browser accessibility/contrast/keyboard review.
- Same-birth-date/different-context comparison; demonstrate that core personalized passages materially differ.
- A true birthday/name-based chart requires the correct birth time and geocoded birthplace. The current chart uses a Mumbai reference location and must not be sold as exact when location is unknown.
- Personal reading-tone and spiritual-practice preferences are collected but are not yet reflected in generated copy; do not claim those features are active.
- Human service operator, privacy terms, deliverable templates, response SLA, and refund terms must be real before selling the ₹99,999 package.
- Any deployment from this commit is a review build, not evidence of commercial or ₹99,999 readiness. Keep the service inquiry disabled unless contact details and the actual delivery process are confirmed.
