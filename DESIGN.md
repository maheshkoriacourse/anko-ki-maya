# Anko Ki Maya — Design System

Premium, calm, modern-mystical. Numerology as self-reflection: quiet ink-on-paper
energy, not neon astrology.

## Brand tokens

| Token | Light | Dark |
| --- | --- | --- |
| background | `#FAF8F5` warm paper | `#14101F` deep indigo-black |
| card | `#FFFFFF` | `#1E1830` |
| primary (indigo-plum) | `#4B3B78` | `#A78BDA` |
| primary-foreground | `#FFFFFF` | `#14101F` |
| accent (soft lavender) | `#EFEAF8` | `#2A2140` |
| gold (star accents, sparing) | `#B08A2E` | `#D4B25E` |
| muted-foreground | `#6E6780` | `#A79FBE` |
| border | `#E6E1EC` | `#322848` |
| ring | `#4B3B78` | `#A78BDA` |
| success/positive | `#3E7C59` | `#7BC9A0` |

## Typography

- Body/UI: **Inter** (400/500/600)
- Display/UI headings: **Sora** (500/600/700)
- Mystical serif accent (big numbers, quotes): **Cormorant Garamond** (500/600)
- Scale: text-sm body, text-2xl/3xl Sora headings, text-5xl+ serif for the big number glyphs.

## Rhythm & shape

- Spacing rhythm: 4 / 8 / 16 / 24 / 48 px.
- Radius: cards `1rem`, buttons/inputs `0.75rem`, pills full.
- Shadows: soft, low-opacity, no hard edges: `0 1px 2px rgb(20 16 31 / 0.06), 0 8px 24px rgb(20 16 31 / 0.08)`.
- Motion: 150–250ms ease-out fades/translates only; respect `prefers-reduced-motion`.

## Motifs

- Subtle 8-pointed star + dot-ring SVGs at 6–10% opacity in section headers.
- Lo Shu 3×3 grid motif as a quiet background pattern (≤8% opacity).
- No cheesy zodiac/planet clip-art, no gradients heavier than a faint radial glow.

## Dark mode

Class-based (`html.dark`), toggle in the sidebar/bottom nav + Settings, persisted
via localStorage through `next-themes`, default = system.

## Accessibility

- Every icon-only control has `aria-label`.
- Visible focus rings (`:focus-visible` = 2px ring + 2px offset).
- Full keyboard nav: sidebar/bottom nav are tabbable; tabs use arrow keys.
- Lo Shu grid cells are `role="gridcell"` with human-readable `aria-label`s.
- Color contrast: body text ≥ 4.5:1 in both themes.

## Print

`/report` uses `@media print`: hides nav, expands cards to full width, black-on-white.