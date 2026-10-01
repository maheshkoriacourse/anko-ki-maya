# Anko Ki Maya

Anko Ki Maya is a numerology-informed reflection and decision-planning app. Its calculations follow traditional number systems; its interpretation is not evidence about a person, proof of past events, or a guarantee of future events.

**Live:** https://anko-ki-maya.vercel.app · **Repo:** https://github.com/maheshkoriacourse/anko-ki-maya

## Product status and boundaries

The Blueprint now invites a person to share their current challenge, desired outcome, decision, and optional timeline notes. It uses those details to frame questions and reversible planning exercises. A past-week section offers memory prompts that remain unconfirmed unless the customer says they fit. Near-term and annual calendars are planning windows, not event predictions.

The product is still a prototype, not a substantiated ₹99,999 report. The present implementation is not a human-reviewed service; it has no payment flow, verified astrologer/numerologist, defined delivery SLA, refund policy, or native-language sign-off. Some legacy chart routes still contain deterministic and overconfident language and need review before the product is marketed as a premium report. Do not present numerology as medical, legal, financial, or mental-health advice. Gem and remedy associations are cultural traditions, not guaranteed outcomes or purchase advice.

## Main customer journey

- **Welcome and profile:** birth name and date; optional birth time and birthplace are not yet collected at onboarding.
- **Calibration:** current focus, challenge, intended outcome, important decision, optional life anchors, preferences, and separately stated consents. Data is stored in the browser.
- **Overview:** concise present-cycle view and a context summary.
- **Life Blueprint:** current crossroads, three structured reflections with visible calculation/context basis, past-cycle memory prompts, traditional number interpretations, life-area lenses, and cultural remedies.
- **Forecast:** previous-week memory check, today, next-week and next-month planning windows, plus a 12-month decision calendar.
- **Supporting routes:** life graph, numbers, Lo Shu, journal, long-term cycles, compatibility, name studio, numeroscope tools, and other chart explorations.
- **Concierge:** proposed private human service and ₹99,999 inquiry price. Contact channels work only when explicitly configured; inquiry is not payment or a confirmed booking.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # Vitest suite
npm run build      # production build (0 errors)
```

Node 20+. No paid APIs; data lives in `localStorage` only.

## Project structure

```
anko-ki-maya/
├── app/
│   ├── page.tsx              # Onboarding (consent gate)
│   ├── overview/page.tsx     # Dashboard (flagship)
│   ├── numbers/page.tsx      # Your Numbers + Lo Shu Grid
│   ├── forecast/page.tsx     # Six-Month Forecast (life-area tabs)
│   ├── longterm/page.tsx     # Long-Term Map + milestones
│   ├── journal/page.tsx      # Journal
│   ├── compatibility/page.tsx# Consent-first compatibility view
│   ├── report/page.tsx       # Print-friendly report
│   ├── settings/page.tsx     # Profile, export, delete, notifications
│   ├── layout.tsx            # Fonts, theme provider, seeded profile
│   └── globals.css           # Design tokens (light + dark)
├── components/
│   ├── ui.tsx                # Buttons, cards, inputs, tabs, badges
│   ├── shared.tsx            # NumberCard, WhyThisReading, empty/loading
│   ├── app-shell.tsx         # Desktop sidebar + mobile bottom nav
│   └── seeded-profile.tsx    # Demo profile context (Aarav Mehta seed)
├── lib/
│   ├── numerology.ts         # All calculations (pure functions)
│   ├── loshu.ts              # Lo Shu grid, planes, diagonals
│   ├── meanings.ts           # Original interpretive copy (safe-language)
│   ├── storage.ts            # localStorage layer + export/delete
│   └── utils.ts              # cn() helper
├── tests/                    # vitest: engine, Lo Shu, UI, safety language
├── DESIGN.md                 # Design tokens & rules
└── README.md
```

## Numerology formulas used

All calculations are in `lib/numerology.ts` and `lib/loshu.ts`. Every result
screen links to its calculation steps ("Why this reading?").

### Reduction rule

Reduce to a single digit, **preserving master numbers 11 / 22 / 33** wherever
they appear in the chain. Example: 38 → 11 (kept); 48 → 12 → 3.

### Letter charts

| System | Map |
| --- | --- |
| **Pythagorean** (default) | A=1 B=2 C=3 D=4 E=5 F=6 G=7 H=8 I=9, J=1 K=2 L=3 M=4 N=5 O=6 P=7 Q=8 R=9, S=1 T=2 U=3 V=4 W=5 X=6 Y=7 Z=8 |
| **Chaldean** | A=1 B=2 C=3 D=4 E=5 F=8 G=3 H=5 I=1, J=1 K=2 L=3 M=4 N=5 O=7 P=8 Q=1 R=2, S=3 T=4 U=6 V=5 W=6 X=5 Y=1 Z=7 — no letter maps to 9 |

Y is treated as a consonant in both systems (conservative, documented choice).

### Core numbers

| Number | Formula |
| --- | --- |
| **Life Path** | Reduce birth month, day and year **separately** (masters preserved), then sum and reduce. Demo: 15 Jun 1990 → 6 + 6 + 1 = 13 → **4** |
| **Birthday** | Reduce the birth day (15 → 6) |
| **Expression / Destiny** | Sum all letters of the full birth name, reduce |
| **Soul Urge** | Sum vowels only (A, E, I, O, U), reduce |
| **Personality** | Sum consonants only, reduce |
| **Maturity** | Life Path + Expression, reduced |

### Cycles

| Cycle | Formula |
| --- | --- |
| **Personal Year** | birth month + birth day + current year, each reduced then summed and reduced. Demo in 2026: 6 + 6 + 1 = 13 → 4 |
| **Personal Month** | Personal Year + calendar month, reduced |
| **Personal Day** | Personal Month + calendar day, reduced |

### Pinnacles (documented exactly)

Timing anchor: Pinnacle 1 begins at `36 − LifePath` (11→2, 22→4, 33→6 for
timing only); each Pinnacle spans 9 years; Pinnacle 4 runs for life.

| Pinnacle | Formula |
| --- | --- |
| 1 | birth month + birth day |
| 2 | birth day + birth year |
| 3 | Pinnacle 1 + Pinnacle 2 |
| 4 | birth month + birth year |

### Challenges

Absolute differences: C1 = |month − day|, C2 = |day − year|,
C3 = |C1 − C2|, C4 = |month − year|. A zero is reported as 0.

### Compatibility

Pairwise sums of Life Path, Expression and Soul Urge across two consenting
profiles, each reduced; meanings rendered as conversational themes.

## Lo Shu Grid (planes & diagonals)

The birth date's digits (1–9) are counted into the fixed 3×3 grid — 0 has no
cell and is noted separately; repeated digits tally:

```
4 9 2   ← Thought / Mind plane
3 5 7   ← Emotion / Will plane
8 1 6   ← Action / Practical plane
```

- **Planes** — a row with all three digits present is a completed line
  ("arrow"): Thought (4-9-2), Emotion (3-5-7), Action (8-1-6).
- **Diagonals** (Indian Lo Shu practice): **Golden 2-4-6-8** (money/wealth
  theme) and **1-5-9** (confidence/spiritual theme).
- **Missing numbers** produce gentle reflection notes.
- Spec test case: **15-06-1990** → digits 1,5,0,6,1,9,9,0 → 1×2, 5×1, 6×1,
  9×2, two zeros; missing **2, 3, 4, 7, 8**; the 1-5-9 confidence diagonal is
  complete, the Golden diagonal open. Verified in `tests/loshu.test.ts`.

## Safety language rules

Codified from the product owner's hard rule. All interpretive copy follows
these patterns; `tests/safety-language.test.ts` enforces them.

**Approved phrasing patterns**

- "may be a supportive period for…"
- "a theme to reflect on…"
- "consider…"
- "a possibility to reflect on…"
- "an invitation to reflect…"

**Forbidden (never appear anywhere in the app)**

- Deterministic event claims: "you will get a job in November", "you will
  marry", "this will happen", "guaranteed".
- Predictions about **marriage, death, illness, money outcomes, pregnancy,
  crime, or disasters** — these topics are never predicted, ever.
- Framing any number/cycle as fate: e.g. "missing 2 means you will struggle
  with relationships" → instead: "missing 2 may suggest a theme around
  patience and partnership to reflect on".

**Where the disclaimer appears**

1. Onboarding consent checkbox (required before results)
2. Settings → Privacy & disclaimer
3. Footer of every page

**Enforcement**

- `tests/safety-language.test.ts` scans every user-facing string in
  `lib/meanings.ts` for banned deterministic patterns.
- Lo Shu notes, forecast months and compatibility copy use the same rulebook.

## Screens & states

- **Empty states** (journal, milestones, no-profile) — gentle prompts, never blank screens.
- **Loading states** — labelled skeletons (`role="status"`) on every data view.
- **Validation states** — inline, `aria-invalid` + `role="alert"` errors on all forms.
- **Accessibility** — aria-labels on icon controls, keyboard-navigable tabs
  (arrow keys), focus-visible rings, aria-labelled Lo Shu cells, sr-only text
  for visual-only info, full keyboard nav.
- **Dark mode** — class toggle, persisted, system default.

## Testing

```bash
npm test        # 52 tests: engine, Lo Shu (spec case), UI, safety language
```

- **Engine** — reduce/masters, both letter charts, Life Path (incl. master
  cases), name numbers, cycles, pinnacles, challenges, compatibility.
- **Lo Shu** — the product-owner spec case (15-06-1990) plus edge cases and
  safe-language checks on notes.
- **UI** — NumberCard, "Why this reading?", keyboard tabs, daily prompt.
- **Safety language** — scans all copy for deterministic phrasing.

## Privacy

No accounts, no server, no tracking, no paid APIs. Profile, journal,
milestones and preferences live in `localStorage` under the `akm.v1` prefix.
Export (JSON download) and delete-all live in Settings.

## Deployment

Vercel (personal scope, no teamId) → https://anko-ki-maya.vercel.app.
Repo: `maheshkoriacourse/anko-ki-maya` (public). Local build: `npm run build`
(0 errors). Tests: `npm test` (52/52).

### Lighthouse (real run, chromium 153 via CDP port 21222, 28 Sep 2026)

`/overview` on production: **Performance 97 · Accessibility 96 ·
Best-Practices 100 · SEO 100** — report JSON saved at
`screenshots/lighthouse-overview.json`.

## License

MIT © 2026 Mahesh Koria. All interpretive copy is original to this project —
no copyrighted numerology text from books/websites is reproduced.
