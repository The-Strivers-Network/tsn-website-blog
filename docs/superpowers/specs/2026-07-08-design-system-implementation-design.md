# Design System Implementation — Design Spec

**Date:** 2026-07-08
**Status:** Approved
**Source of visual truth:** `.cursor/DESIGN.md` (TSN-design-system, alpha)

## Context

The site ships with generic shadcn/ui styling: dark-first theme, near-black canvas, compact
square buttons, Geist-only type. `.cursor/DESIGN.md` defines the intended brand system —
Striver Purple voltage on a violet-tinted canvas, Achievement Gold accents, Funnel Display
display type, plum inverted bands, pill CTAs, 96px rhythm, and an optional frosted-glass
layer — but none of its tokens are wired into `tailwind.config.mjs` / `globals.css`.

This project implements the complete DESIGN.md experience across the site.

## Decisions (confirmed with owner)

1. **Scope:** foundation tokens + full sweep — all 17 blocks, heros, header/footer,
   posts, search, comments.
2. **Themes:** complete light AND dark token sets at equal fidelity. The spec is
   light-first and lists dark as a gap; we derive dark from the spec's plum/ink family.
3. **Default theme:** dark stays the default (current behavior preserved).
4. **Architecture:** Approach A — remap the existing shadcn semantic CSS variables to
   spec values and add extension tokens for concepts shadcn has no slot for. No parallel
   token namespace. Existing `bg-card` / `text-muted-foreground` / `border-border`
   usage inherits the new look automatically.
5. **Admin panel:** untouched (chart/sidebar variables keep current values).

## 1. Token Foundation

### Format normalization (targeted cleanup)

`globals.css` currently mixes raw oklch (`:root`), HSL triplets (`[data-theme='dark']`),
and an unused `.dark` block, while `tailwind.config.mjs` wraps values in `hsl(var(--x))`.
Normalize: **CSS variables hold complete color values (hex/rgba)**; Tailwind references
them as plain `var(--x)`. Delete the dead `.dark` block.

### Light theme (`:root`) — direct from spec

| Variable | Value |
|---|---|
| `--background` | canvas `#FBFAFF` |
| `--foreground` | ink `#1E1B2E` |
| `--card`, `--popover` | `#FFFFFF`; foregrounds ink |
| `--primary` | `#6D28D9`; foreground `#FFFFFF` |
| `--secondary` | surface-lilac `#F3F0FA`; foreground primary-active `#4C1D95` |
| `--muted` | `#F0EDF7`; foreground `#6E6A7C` |
| `--accent` | primary-soft `#EDE9FE`; foreground `#4C1D95` |
| `--border` | hairline `#E8E4F0` |
| `--input` | hairline-strong `#D8D2E6` |
| `--ring` | `rgba(109,40,217,0.35)` |

### Dark theme (`[data-theme='dark']`) — our derivation from plum/ink

| Variable | Value |
|---|---|
| `--background` | ink-deep `#15121F` |
| `--foreground` | on-plum `#EDE9FE` |
| `--card`, `--popover` | elevated plum `#201A33`; foregrounds on-plum |
| `--primary` | primary-bright `#8B5CF6`; foreground ink-deep `#15121F` |
| `--secondary` | surface-plum `#2A1E4A`; foreground on-plum |
| `--muted` | `#241D3A`; foreground on-plum-muted `#B7ABD6` |
| `--accent` | lifted plum `#3A2C5E`; foreground on-plum |
| `--border` | `rgba(183,171,214,0.16)` (translucent, plum-tinted) |
| `--input` | `rgba(183,171,214,0.24)` |
| `--ring` | `rgba(139,92,246,0.40)` |

### Extension tokens (both themes, CSS vars + `tailwind.extend.colors`)

- `surface-plum` (#2A1E4A both themes — inverted bands are theme-stable)
- `surface-lilac` (light `#F3F0FA`; dark: plum panel `#241D3A`)
- `accent-gold` `#E0A82E`; `accent-gold-soft` (light `#FBF0D6`; dark: gold at low alpha)
- `hairline`, `hairline-soft`, `hairline-strong`
- `glass-*` fills and borders (per DESIGN.md glass tokens)
- Semantic `success #2F9E6B` / `error #D14343` / `warning` (gold) re-pointed to spec values

### Radius & shadows

- `--radius: 1rem` (16px cards); `rounded-md` = 12px (inputs/tiles).
- `tailwind.extend.boxShadow`: `card`, `card-hover`, `glass`, `glass-plum`,
  `glass-glow-hover`, `focus-ring` — values verbatim from DESIGN.md.

## 2. Typography

### Fonts

- **Funnel Display** — new, `next/font/google` in the frontend root layout, weight 500
  only, exposed as `--font-funnel` → Tailwind `font-display`.
- **Geist** — unchanged (`geist` package, `font-sans` / `font-title`).
- **Geist Mono** — from the same `geist` package; replaces the generic `ui-monospace`
  stack as `font-mono` (system stack as fallback).

### Scale (`tailwind.extend.fontSize`, line-height/tracking/weight baked in)

| Token | Size / LH / Tracking |
|---|---|
| `text-display-mega` | 68px / 1.05 / -1.7px / 500 |
| `text-display-lg` | 44px / 1.1 / -1.1px / 500 |
| `text-display-md` | 32px / 1.15 / -0.6px / 500 |
| `text-stat-mega` | 56px / 1.0 / -1.4px / 500 |
| `text-eyebrow` | 12px / 1.4 / +1.2px / 500 |

Headings `heading-lg` (24px) and below use standard Tailwind sizes with Geist.

### Application rule

The global `h1–h6 → font-title` rule stays (Geist default for all headings).
`font-display text-display-*` is applied explicitly and ONLY at: hero headlines, block
section heads, the CTA band line, and stat numbers. Responsive downshift
(68 → 52 → 36px) via `md:`/`lg:` variants at call sites.

### Eyebrow component

New `<Eyebrow>` in `src/components/ui`: `font-mono text-eyebrow uppercase text-primary`,
plus a `pill` variant (primary-soft bg, pill radius). Replaces `Badge variant="outline"`
eyebrow usage in blocks.

### Rich text

Align `@tailwindcss/typography` overrides in the config: prose headings inherit Geist,
body 1.6 line-height, sizes tuned to the spec body scale.

## 3. Global Chrome & Primitives

### Buttons (`src/components/ui/button.tsx`)

Compact square shadcn buttons become spec pills:
- `default` → purple pill, h-11 (44px), `px-[22px]`, `rounded-full`; hover
  primary-hover + `shadow-card-hover`.
- `outline`/`secondary` → white (dark: plum) pill, hairline-strong border, purple text.
- New `donate` variant → gold pill, ink text.
- `ghost`/`link` → purple text styles.
- Sizes: `default` h-11, `sm` h-9, `icon` round.
- `CMSLink` renders through `Button`, so all CTAs flip automatically.

### Inputs

48px height, `rounded-md` (12px), hairline-strong border, focus = `--ring` glow +
primary border. Applies to `ui/input`, textarea, select, and Form block fields.

### Header (`src/Header`)

72px bar. Flat on canvas at page top; on scroll transitions to **glass-nav**
(translucent fill, `backdrop-blur-xl` + saturate, hairline bottom border) via a small
client scroll listener. Theme toggle unchanged.

### Footer (`src/Footer`)

Ink-deep floor in both themes (theme-stable inverted surface), on-plum-muted text,
purple-bright link hover.

### Layout rhythm (structural cleanup)

- `RenderBlocks` drops its `my-16` wrapper.
- Every block owns the rhythm uniformly: `py-16 lg:py-24` (64px mobile / 96px desktop).
- Container cap: 86rem → **75rem (~1200px)**.

## 4. The Sweep

### Uniform pass (all 17 blocks)

Section shell `py-16 lg:py-24` + container · eyebrows → `<Eyebrow pill>` · section
headings → `font-display text-display-md lg:text-display-lg` · descriptions → 18px Geist
muted · cards → `bg-card rounded-lg` + hairline border + `shadow-card`, hover
`shadow-card-hover` · avatars `rounded-full`.

### Distinctive treatments

| Surface | Treatment |
|---|---|
| StatsBlock *(signature)* | surface-lilac panels (dark: plum panel); numbers `text-stat-mega font-display text-primary`; Geist Mono captions; supports one gold hero stat |
| CallToAction | full-bleed **cta-band**: surface-plum both themes, centered `display-lg` on-plum, purple pill + gold donate CTA |
| Testimonials | primary-tint quote cards (dark: lifted plum), 18px quotes, `body-sm` attribution |
| ScholarCaseStudy / ScholarList | `badge` field renders as gold **award-pill**; ScholarList rows keep hairline dividers, purple link hover |
| TeamBlock | hairline dividers; group labels as Geist Mono eyebrows |
| Banner | semantic colors re-pointed at spec success/error/info |
| Heros (`src/heros`) | hero-band: purple radial glow (`primary-bright` → transparent) behind headline; `display-mega` responsive 68→52→36; `body-lg` subhead; pill CTAs; media `rounded-xl`; HighImpact hero uses the plum inversion (`hero-band-plum`) |

### Pages

Posts (hero, prose, RelatedPosts), `CollectionArchive`/search cards, pagination, and
Comments inherit token/card/input changes + a light rhythm/type touch-up. No structural
changes. Bento, Content, MediaBlock, Paragraph, Code, FAQ, ScrollItems, Form, Archive:
uniform pass only.

## 5. Glass Layer

Two component classes in `globals.css` (`@layer components`), per the DESIGN.md recipe:

- `.glass` — `--glass-light` fill, `backdrop-filter: blur(16px) saturate(130%)` as the
  default; placements override blur with Tailwind utilities (nav 24px, sheet 40px).
  1px `--glass-border-light`, `shadow-glass` (inset highlight + soft drop).
- `.glass-plum` — `--glass-plum-strong` fill, `--glass-border-dark`, `shadow-glass-plum`.
  Used over plum bands and as dark-theme glass.

Safety net on both: `@supports not (backdrop-filter: blur(1px))` → solid `card` /
`surface-plum` fallback; `prefers-reduced-transparency: reduce` → same solid swap.
Fills/borders are CSS variables and flip with the theme.

**Placements — exactly three** (spec's "spotlight only" rule): (1) header once scrolled,
(2) one hero foreground card/stat cluster on the purple glow, (3) mobile nav sheet.
Blocks stay on solid cards.

## Verification

1. `pnpm build`, `npx tsc --noEmit`, `pnpm lint` all pass. No CMS schema changes → no
   type regen needed.
2. **Contrast audit at implementation time:** compute WCAG ratios for every new
   text/background pair in both themes (purple-on-canvas, on-plum-muted-on-plum, gold
   pairs, both muted-foregrounds); adjust any value missing 4.5:1 body / 3:1 large text.
3. **Visual pass:** dev server + a draft CMS page stacking all 17 blocks and both heros;
   review light + dark, desktop + mobile; also posts, search, and admin (confirm admin
   is unchanged).
4. FOUC guard and theme toggle still behave. No dynamically-built class names (or add
   to `safelist`).

## Out of Scope

- Payload admin panel styling.
- Animation timings (stat count-up, glow drift) beyond simple hover/scroll transitions.
- Data-viz palette; blog long-form type scale beyond the body tokens.
- Glass anywhere beyond the three placements above.
