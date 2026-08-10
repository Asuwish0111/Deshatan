---
name: deshatan-design
description: The Deshatan design system — the arch/parchment visual language built for /dashboard from Figma "Travel Design" (file FuwgYzTT0USsSlqORzKBAt). Use when building or editing any page, section or component in this project, especially new inner pages that must match the dashboard.
---

# Deshatan design system

An Indo-Islamic architectural language: a navy plate with a cream arch cut out of
it, framed cards on parchment, a display serif over Devanagari-friendly sans.
Every ornament is drawn (SVG), never photographed — except the showcase
photography, which is the deliberate exception the section is named for.

Everything below is derived from the built implementation in
`components/dashboard/dashboard.module.css`, which is the source of truth. Read
it before adding to it.

## Non-negotiables

1. **CSS Modules, not Tailwind.** Tailwind is installed but unused here. Styles
   live in one module per surface; the dashboard uses a single
   `dashboard.module.css`.
2. **Tokens, never literals.** If a colour appears twice, it is a token. The one
   sanctioned literal is a one-off from the Figma that appears once.
3. **Check contrast before choosing a colour.** See the matrix. This system's
   palette is narrow and `--gold` in particular fails on most grounds.
4. **`AGENTS.md` applies:** read `node_modules/next/dist/docs/` before writing
   Next.js code. This is not the Next.js you remember.
5. **Responsive is a standing requirement**, not a follow-up task.

## Tokens

Declared on `.page`. Reuse; do not redefine per section.

```
Colour     --navy #15445c   --cream #faf6f0   --ink #26190e     --rust #a14834
           --gold #cf9e46   --indigo #2b355d  --peacock #23695b --sand #eedfc0
           --parchment #f6edd9   --tab-gold #dfc9a8   --monument #5b7c8d
Text       --body-soft #4b3a2a (body)   --body-muted #6b5842 (secondary)
Deep ends  --rust-deep #803625 (hover/pressed, and type on gold-soft)
           --gold-deep #8a5f14 (gold-coloured type on light grounds)
           --gold-soft #d8bc7b (fills; type on navy/indigo)
           --blush #fbe4d6 (body copy on rust)   --placeholder #7e6f55
Lines      --hairline rgba(245,240,230,0.3)  — plate edges on navy only
Type       --display 'Rozha One'  --text 'Mukta'  --hindi 'Yatra One'  --ui 'Inter'
```

**Colour roles.** Rust is the primary action and the accent that carries most
headings-in-colour. Gold is decoration and fills, almost never type. Indigo and
peacock only appear as card frames. Navy is structure (plate, bands, footer
ground on other pages). Sand and parchment are the two card/section grounds.

## Contrast matrix

Rows are foregrounds, columns grounds. Blank passes AA body text (≥4.5), `~`
is large-text only (3.0–4.5), `x` fails both. Large means ≥24px, or ≥18.66px at
weight 700.

```
             cream  parch  sand   navy   rust   indigo peacock
ink          15.89  14.69  12.99  1.64x  2.84x  1.44x  2.64x
body-soft    10.07   9.31   8.23  1.04x  1.80x  1.09x  1.67x
body-muted    6.29   5.82   5.15  1.54x  1.13x  1.75x  1.05x
rust          5.59   5.16   4.57  1.73x  1.00x  1.97x  1.08x
rust-deep     7.89   7.29   6.45  1.23x  1.41x  1.40x  1.31x
gold         2.26x  2.09x  1.85x  4.29~  2.47x  4.88   2.66x
gold-deep     5.23   4.84  4.28~  1.85x  1.07x  2.11x  1.15x
gold-soft    1.71x  1.58x  1.40x   5.66  3.26~  6.44   3.51~
parchment    1.08x  1.00x  1.13x   8.96   5.16  10.19   5.56
cream        1.00x  1.08x  1.22x   9.69   5.59  11.02   6.01
blush        1.14x  1.05x  1.08x   8.53   4.92   9.70   5.29
tab-gold     1.49x  1.38x  1.22x   6.49  3.74~   7.38  4.03~
sand         1.22x  1.13x  1.00x   7.92   4.57   9.01   4.92
placeholder   4.54  4.20~  3.72~  2.13x  1.23x  2.42x  1.32x
```

**Rules that fall out of this:**

- `--gold` is decoration only. It fails on cream, parchment, sand, rust and
  peacock. For gold-coloured *type* use `--gold-deep` on light grounds and
  `--gold-soft` on navy/indigo.
- Body copy on **rust** must be `--blush` or `--parchment`. Nothing else clears
  4.5 except `--cream` and `--sand`.
- On **navy**, prefer `--parchment`/`--cream` for body and `--tab-gold` or
  `--gold-soft` for small caps labels.
- `--placeholder` is tuned for cream (4.54). On parchment it is large-text only.

Re-verify after any colour change with the audit script in *Verification*.

## Page shell

The arch is real geometry, not artwork. Every rail, radius and step derives from
the geometry tokens, so a breakpoint restates the *scale* and never the layout.

```
--rail 15px        navy margin either side of the plate
--shoulder 47px    height of the opening cap
--cap-inset 58.5px inset of the cap and the closing step
--r-cap 43.5px  --r-body 48px  --r-close 44px
--topbar-h 91px  --band-h 112px  --close-h 112px
--gutter 28px      content inset inside the plate
```

Composition, top to bottom:

```
TopBar (navy)
.upper   → .archCap (cream, rounded top, hairline) + .panel (cream plate)
MonumentBand (full-bleed navy strip)
.lower   → navy rail; each child section paints its own ground
.calcGap (navy) where the design wants a break between plates
.archBottom  the mirrored closing shoulder
```

**Plate rules.** A run of sections sharing one plate: every section carries
`border: 1px solid var(--hairline); border-top: 0; border-bottom: 0`, the first
carries the top radius, the last carries `border-radius: 0 0 var(--r-close)
var(--r-close)`. If a coloured section's rounded corners must reveal cream
behind them, wrap the run in a cream panel (see `.closePanel`) and let only the
coloured section carry the radius.

Content width inside a plate is `width: min(1238px, 100% - 2 * var(--gutter));
margin: 0 auto`. Use 1240 for the showcase grid, 1238 everywhere else — both
exist in the built code.

## Component idioms

Pick one; do not invent a fourth.

**1. Framed card** — the workhorse (`.stamp`, `.feature`, `.calcFrame`).
A coloured frame wrapping a parchment inner:

```css
.frame { padding: 10px; border-radius: 16px; background: var(--rust); }
.inner { padding: 16px; border: 2px solid var(--ink); border-radius: 16px;
         background: var(--parchment); }
```

Frame colours rotate `--rust` / `--indigo` / `--peacock` / `--gold`. No shadows.
This idiom replaced an earlier one with 3px borders and hard offset shadows
because it read as foreign; do not reintroduce that.

**2. Bordered card** — for content that needs no frame (`.yatraCard`, `.card`):
`border: 2–3px solid var(--ink); border-radius: 16px; background: var(--parchment)`.
Showcase photo cards use `#fff` deliberately, to lift off the cream page.

**3. Offset-frame card** — reserved for one emphatic moment per page
(`.pointsCard`): the bordered card plus `box-shadow: 0 0 0 10px var(--ink)`.
Reduce to 6px below 760px.

**Buttons.** One shape: `padding: 13px 30px; border: 2px solid var(--ink);
border-radius: 12px`. Primary is `--rust` with `--parchment` text, hover
`--rust-deep`. Ghost is `--parchment` with `--ink` text, hover `--sand`. Always
add `:focus-visible { outline: 2px solid var(--rust); outline-offset: 2–3px }` —
the browser default is a 1px blue hairline that is off-palette and nearly
invisible here. The ornate `btnPlate` border-image is **nav-only**: it stretches
badly and its light regions drop white text to 1.9:1.

**Eyebrow** — every section head opens with it:

```tsx
<p className={s.eyebrow}>
  <span className={s.eyebrowBar} aria-hidden="true" />
  <span className={s.eyebrowWord}>Hindi Phrase</span>
  <span className={s.eyebrowBar} aria-hidden="true" />
</p>
```

18px `--hindi`, rust bars 26×2px. On rust/navy grounds add `.eyebrowOnDark`
(cream throughout) and optionally `.eyebrowCaps` for a spaced-caps translation.
`.eyebrowCaps` defaults to `--gold` for dark bands — override it on light ones.

**Section heading** — `--display`, `font-size: var(--h2)`, `line-height: 1.12`,
`letter-spacing: -0.01em`, centred, `width: min(700px, 100%)`.

## Typography

```
Display  Rozha One 400 — headings, figures, prices. clamp() everything.
Body     Mukta 400/600/700 — 15px/24.75 in cards, 17px/28.05 in section copy
Hindi    Yatra One — eyebrows, kickers, one-word flourishes only
UI       Inter — nav chrome only
```

Never set Rozha One below ~20px; it loses its character. Hindi face is for
short phrases, never paragraphs.

## Responsive

Fluid first: `clamp()` for type and padding, `repeat(auto-fit, minmax(min(Npx,
100%), 1fr))` for grids. The `min()` inside `minmax` is required — without it a
single column cannot go below its track and overflows on small phones.

Breakpoints only restate scale: `1160` (nav collapses), `1024` (two-column
layouts stack; geometry tokens step down), `760` (geometry steps again), `420`
(final type/spacing trim). Verify at 1440 / 1024 / 760 / 520 / 400.

## Motion

Entrances use `--ease-out: cubic-bezier(0.22,0.68,0.3,1)`, staggered ~90ms.
Small hover lifts use the project's `--ease-spring:
cubic-bezier(0.34,1.56,0.64,1)` — overshoot reads as responsive on a button and
cheap on a headline. Pair every hover lift with an `:active` that returns it.

**Always add a `prefers-reduced-motion: reduce` block** disabling animations and
hover transforms. Use `fill-mode: both` carefully — verify content is visible
with motion off, since a `from { opacity: 0 }` can strand it.

Animate `opacity`/`transform`/`translate` only. Where an element already uses
`transform` for layout, animate the independent `translate`/`scale` properties
instead so the animation does not clobber positioning.

## Assets

`public/figma/` holds the exported SVGs; `public/photos/` the photography.

- Render every icon from its exported asset; do not redraw.
- Preserve the design's own insets, including the nested "bleed" inset Figma
  emits for stroke overflow.
- Exported glyphs are often hard-filled `#F6EDD9`. To recolour, use
  `mask-image` + `background-color`, as `.heroMonument` and `.footSocials` do.
- Photography goes through `next/image` (≈75% smaller than the raw JPEG).
  Wikimedia Commons is the source; **check the photo actually depicts its
  subject** and keep the credits line — CC BY and CC BY-SA require it.

## Known traps

Each of these cost real debugging time. Check them before blaming your CSS.

| Symptom | Cause |
|---|---|
| Dark line across a custom header | `globals.css` styles bare `header` (sticky, 3px border, shadow). Unset all four. |
| Image looks squashed at 100% width | `globals.css` sets `img,svg { max-width:100% }`. Artwork designed to bleed past its box needs `max-width: none`. |
| Gradient/haze ends in a hard line | `mask-clip` defaults to the border box. Give the element headroom *inside* itself. |
| Card stretches far past its content after stacking | `flex: 1 1 530px` — the basis becomes a **height** once the axis turns vertical. Reset `flex: 0 0 auto` in the stacking breakpoint. |
| A rule seems ignored | Specificity. `.parent p` (0,1,1) beats `.child` (0,1,0). |
| Grid overflows on a small phone | `minmax(320px, 1fr)` without the inner `min()`. |
| Heading runs past the panel | A centred flex parent sizes to max-content; set an explicit `width: min(Npx, 100%)`. |
| Screenshot automation won't scroll | `globals.css` has `scroll-behavior: smooth`; set it to `auto` first. |

## Verification

Do not eyeball it. This project has a working pixel/DOM verification loop.

Render: headless Chrome `--headless --disable-gpu --hide-scrollbars
--force-device-scale-factor=2 --window-size=W,H --virtual-time-budget=11000
--screenshot=out.png <url>`, then `sips -c H W --cropOffset TOP LEFT` to crop
and `sips -Z N` to scale before reading the image.

Measure: drive Chrome over CDP (`--remote-debugging-port`), `Runtime.evaluate`
a probe returning JSON — computed styles, bounding boxes, `scrollWidth -
clientWidth` for overflow.

**Always run the contrast audit after a colour change.** Walk every element with
a text child, composite the alpha stack up the ancestor chain (a translucent
badge must not be skipped), compute the WCAG ratio, and require 4.5 / 3.0 by
size. Visually hidden elements (`clip-path: inset(50%)`) are false positives.

Before finishing: `npx tsc --noEmit`, `npx next build`, and confirm no stray
files landed in the repo root — screenshot commands run from the project
directory will drop PNGs there.
