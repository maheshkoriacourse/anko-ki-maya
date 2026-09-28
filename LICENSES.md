# LICENSES.md — dependency & copied-code ledger

Per the website-arsenal-builder license law: MIT/Apache/BSD/ISC only for
copied code. **No third-party component code was copied into this project** —
all app code (`app/`, `components/`, `lib/`) is original, and all interpretive
numerology copy is original (no text reproduced from books/websites).

## Runtime dependencies

| Package | License | Used for |
| --- | --- | --- |
| next | MIT | App Router framework |
| react / react-dom | MIT | UI runtime |
| tailwindcss (v4) | MIT | Styling |
| tw-animate-css | MIT | Animation utilities |
| lucide-react | ISC | Icons (SVG) |
| next-themes | MIT | Dark-mode class toggle + persistence |
| clsx | MIT | Class utilities |
| tailwind-merge | MIT | Class utilities |
| class-variance-authority | Apache-2.0 | Variant helpers |

## Dev dependencies

| Package | License |
| --- | --- |
| typescript, @types/* | Apache-2.0 / MIT |
| eslint, eslint-config-next | MIT |
| vitest, @vitejs/plugin-react, jsdom | MIT |
| @testing-library/react, @testing-library/jest-dom | MIT |

## Fonts (Google Fonts, via next/font — self-hosted at build)

Inter, Sora, Cormorant Garamond — SIL Open Font License 1.1.

## Arsenal repos (skill workflow)

No arsenal repo was cloned or copied for this build (shadcn/ui conventions
followed by hand-writing components in `components/ui.tsx` — no source files
copied). Study-only references: shadcn/ui docs patterns (MIT), which informed
the token/variant structure but contributed no copied code.

## Excluded by license law

GPL / AGPL / no-license template code: none used.