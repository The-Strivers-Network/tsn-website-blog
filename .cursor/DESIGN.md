---
version: alpha
name: TSN-design-system
description: A redesign for The Strivers' Network (thestriversetwork.org) — a youth-led Sri Lankan education nonprofit that mentors high-achieving, under-resourced students into the world's leading universities. The voice is aspirational, warm, and trustworthy: hopeful without being naive, editorial without being corporate. The canvas is a soft violet-tinted off-white (`#FBFAFF`) holding a deep plum ink (`#1E1B2E`). The single brand voltage is **Striver Purple** (`#6D28D9`) — carried into CTAs, links, the wordmark, and a lilac tint system for spotlight surfaces. A warm **Achievement Gold** (`#E0A82E`) is the one supporting accent, reserved for scholarship/impact moments (stats, awards, alumni highlights). Display type is **Funnel Display** (weight 500, tight tracking) for hero and section heads; **Geist** carries every lower-level heading and body; **Geist Mono** stamps stats, labels, and eyebrows. Depth is hairline-first with a single soft shadow tier for cards. Generous 96px section rhythm, editorial 1200px container.

colors:
  primary: "#6D28D9"
  primary-hover: "#5B21B6"
  primary-active: "#4C1D95"
  primary-soft: "#EDE9FE"
  primary-tint: "#F5F3FF"
  primary-bright: "#8B5CF6"
  accent-gold: "#E0A82E"
  accent-gold-soft: "#FBF0D6"
  ink: "#1E1B2E"
  ink-deep: "#15121F"
  body: "#4A4658"
  body-strong: "#2A2640"
  muted: "#6E6A7C"
  muted-soft: "#9B97A8"
  hairline: "#E8E4F0"
  hairline-soft: "#F0EDF7"
  hairline-strong: "#D8D2E6"
  canvas: "#FBFAFF"
  canvas-soft: "#FFFFFF"
  surface-card: "#FFFFFF"
  surface-lilac: "#F3F0FA"
  surface-plum: "#2A1E4A"
  on-primary: "#FFFFFF"
  on-plum: "#EDE9FE"
  on-plum-muted: "#B7ABD6"
  semantic-success: "#2F9E6B"
  semantic-error: "#D14343"
  semantic-info: "#6D28D9"

typography:
  display-mega:
    fontFamily: "'Funnel Display', system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 68px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -1.7px
  display-lg:
    fontFamily: "'Funnel Display', sans-serif"
    fontSize: 44px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -1.1px
  display-md:
    fontFamily: "'Funnel Display', sans-serif"
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.6px
  heading-lg:
    fontFamily: "'Geist', system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.3px
  heading-md:
    fontFamily: "'Geist', sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.2px
  title-md:
    fontFamily: "'Geist', sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "'Geist', sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-lg:
    fontFamily: "'Geist', sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-md:
    fontFamily: "'Geist', sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "'Geist', sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "'Geist', sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  eyebrow:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 1.2px
    textTransform: uppercase
  stat-mega:
    fontFamily: "'Funnel Display', sans-serif"
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: -1.4px
  stat-label:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.4px
  button:
    fontFamily: "'Geist', sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
  nav-link:
    fontFamily: "'Geist', sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  base: 16px
  md: 20px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 64px
  section: 96px

shadow:
  none: "none"
  card: "0 1px 2px rgba(30,27,46,0.04), 0 8px 24px rgba(30,27,46,0.06)"
  card-hover: "0 2px 4px rgba(30,27,46,0.06), 0 16px 40px rgba(109,40,217,0.12)"
  focus-ring: "0 0 0 3px rgba(109,40,217,0.35)"

components:
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 72px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 22px
    height: 44px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    shadow: "{shadow.card-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 11px 21px
    height: 44px
  button-tertiary-text:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.button}"
  button-donate:
    backgroundColor: "{colors.accent-gold}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 22px
    height: 44px
  eyebrow-label:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.eyebrow}"
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-mega}"
    padding: 96px
  hero-band-plum:
    backgroundColor: "{colors.surface-plum}"
    textColor: "{colors.on-plum}"
    typography: "{typography.display-mega}"
    padding: 96px
  stat-card:
    backgroundColor: "{colors.surface-lilac}"
    textColor: "{colors.ink}"
    typography: "{typography.stat-mega}"
    rounded: "{rounded.lg}"
    padding: 28px
  stat-number:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.stat-mega}"
  program-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.heading-md}"
    rounded: "{rounded.lg}"
    padding: 28px
    shadow: "{shadow.card}"
  feature-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 24px
    shadow: "{shadow.card}"
  scholar-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 0
    shadow: "{shadow.card}"
  testimonial-card:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.body-strong}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.lg}"
    padding: 32px
  university-logo-tile:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: 20px
  eyebrow-pill:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-active}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: 6px 12px
  award-pill:
    backgroundColor: "{colors.accent-gold-soft}"
    textColor: "#8A6410"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: 6px 12px
  text-input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    height: 48px
  cta-band:
    backgroundColor: "{colors.surface-plum}"
    textColor: "{colors.on-plum}"
    typography: "{typography.display-lg}"
    padding: 96px
  footer:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.on-plum-muted}"
    typography: "{typography.body-sm}"
    padding: 72px 48px
  footer-link:
    backgroundColor: transparent
    textColor: "{colors.on-plum}"
    typography: "{typography.body-sm}"
---

## Overview

The Strivers' Network is a youth-led nonprofit bridging the higher-education guidance gap for Sri Lanka's high-achieving, under-resourced students. This redesign gives that mission an aspirational, editorial voice: hopeful and human, credible enough to sit beside Princeton, MIT, and Oxford logos, and warm enough to feel youth-led rather than institutional.

The base canvas is a **soft violet-tinted off-white** (`{colors.canvas}` — #FBFAFF) holding a **deep plum ink** (`{colors.ink}` — #1E1B2E). The single brand voltage is **Striver Purple** (`{colors.primary}` — #6D28D9), carried into CTAs, links, the wordmark, and a lilac tint system for spotlight surfaces. One supporting accent — **Achievement Gold** (`{colors.accent-gold}` — #E0A82E) — is reserved for impact moments: scholarship stats, awards, and alumni highlights.

Type is a two-family system. **Funnel Display** (weight 500, tight negative tracking) carries hero and section heads plus big impact stats. **Geist** carries every lower-level heading and all body copy. **Geist Mono** stamps eyebrows, labels, and stat captions — a quiet signal of precision and rigor.

**Key Characteristics:**
- Violet-tinted off-white canvas — never sterile pure white for page floor.
- Single brand color: Striver Purple `{colors.primary}`. Gold is the only supporting accent, used sparingly for achievement.
- Funnel Display for display + stats only; Geist for everything smaller.
- Deep plum inverted bands (`{colors.surface-plum}`) anchor hero, CTA, and impact sections.
- Soft, low-spread shadow on cards — one elevation tier, warmed toward purple on hover.
- Pill-shaped CTAs; 16px card radius; 96px section rhythm.

## Colors

### Brand & Accent
- **Striver Purple** (`{colors.primary}` — #6D28D9): Primary CTAs, links, wordmark, active nav, stat numbers.
- **Purple Hover** (`{colors.primary-hover}` — #5B21B6): CTA hover.
- **Purple Active** (`{colors.primary-active}` — #4C1D95): Press state, deep-tint text.
- **Purple Bright** (`{colors.primary-bright}` — #8B5CF6): Decorative gradients, illustration highlights, focus glow.
- **Purple Soft** (`{colors.primary-soft}` — #EDE9FE): Eyebrow pills, tag chips.
- **Purple Tint** (`{colors.primary-tint}` — #F5F3FF): Testimonial + spotlight surfaces.
- **Achievement Gold** (`{colors.accent-gold}` — #E0A82E): Awards, scholarship impact accents, donate CTA. Used scarcely.
- **Gold Soft** (`{colors.accent-gold-soft}` — #FBF0D6): Award pill backgrounds.

### Surface
- **Canvas** (`{colors.canvas}` — #FBFAFF): Violet-tinted page floor.
- **Canvas Soft** (`{colors.canvas-soft}` — #FFFFFF): Alternating light band.
- **Surface Card** (`{colors.surface-card}` — #FFFFFF): Card surface.
- **Surface Lilac** (`{colors.surface-lilac}` — #F3F0FA): Stat cards, quiet panels.
- **Surface Plum** (`{colors.surface-plum}` — #2A1E4A): Inverted hero / CTA / impact bands.

### Hairlines
- **Hairline** (`{colors.hairline}` — #E8E4F0): 1px divider, card outline.
- **Hairline Soft** (`{colors.hairline-soft}` — #F0EDF7): Faint divider.
- **Hairline Strong** (`{colors.hairline-strong}` — #D8D2E6): Input borders, stronger outline.

### Text
- **Ink** (`{colors.ink}` — #1E1B2E): Display + heading ink. Deep plum near-black.
- **Ink Deep** (`{colors.ink-deep}` — #15121F): Footer floor.
- **Body** (`{colors.body}` — #4A4658): Default running text.
- **Body Strong** (`{colors.body-strong}` — #2A2640): Emphasis body, pull-quotes.
- **Muted** (`{colors.muted}` — #6E6A7C): Sub-labels, captions.
- **Muted Soft** (`{colors.muted-soft}` — #9B97A8): Disabled, placeholder.
- **On Primary** (`{colors.on-primary}` — #FFFFFF): Text on purple.
- **On Plum** (`{colors.on-plum}` — #EDE9FE): Text on plum bands.
- **On Plum Muted** (`{colors.on-plum-muted}` — #B7ABD6): Secondary text on plum.

### Semantic
- **Success** (`{colors.semantic-success}` — #2F9E6B): Form success, "application received."
- **Error** (`{colors.semantic-error}` — #D14343): Validation errors.
- **Info** (`{colors.semantic-info}` — #6D28D9): Informational notices (shares brand purple).

## Typography

### Font Families
- **Funnel Display** — display headlines and impact stats. Weight 500, tight negative tracking. Fallback: `system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif`.
- **Geist** — all lower-level headings (`heading-lg` and below) and body copy. Weights 400 / 500 / 600.
- **Geist Mono** — eyebrows, labels, and stat captions. A precision signal.

### Hierarchy

| Token | Family | Size | Weight | Line Height | Tracking | Use |
|---|---|---|---|---|---|---|
| `{typography.display-mega}` | Funnel Display | 68px | 500 | 1.05 | -1.7px | Homepage hero h1 |
| `{typography.display-lg}` | Funnel Display | 44px | 500 | 1.1 | -1.1px | Section heads, CTA band |
| `{typography.display-md}` | Funnel Display | 32px | 500 | 1.15 | -0.6px | Sub-section heads |
| `{typography.heading-lg}` | Geist | 24px | 600 | 1.25 | -0.3px | Card group heads |
| `{typography.heading-md}` | Geist | 20px | 600 | 1.3 | -0.2px | Program card titles |
| `{typography.title-md}` | Geist | 18px | 600 | 1.4 | 0 | Component titles |
| `{typography.title-sm}` | Geist | 16px | 600 | 1.4 | 0 | List labels |
| `{typography.body-lg}` | Geist | 18px | 400 | 1.6 | 0 | Lead paragraphs, quotes |
| `{typography.body-md}` | Geist | 16px | 400 | 1.6 | 0 | Default body |
| `{typography.body-sm}` | Geist | 14px | 400 | 1.5 | 0 | Footer, meta |
| `{typography.caption}` | Geist | 13px | 400 | 1.4 | 0 | Photo captions |
| `{typography.eyebrow}` | Geist Mono | 12px | 500 | 1.4 | 1.2px | Section eyebrows (uppercase) |
| `{typography.stat-mega}` | Funnel Display | 56px | 500 | 1.0 | -1.4px | Impact numbers |
| `{typography.stat-label}` | Geist Mono | 13px | 400 | 1.4 | 0.4px | Stat captions |
| `{typography.button}` | Geist | 15px | 500 | 1.0 | 0 | CTA labels |
| `{typography.nav-link}` | Geist | 15px | 500 | 1.4 | 0 | Top-nav menu |

### Principles
- **Funnel Display is reserved.** Only hero/section heads and impact stats. Never body, never small labels.
- **Geist carries the workload.** Every heading `heading-lg` and below, plus all body copy.
- **Geist Mono eyebrows set the rhythm.** Uppercase, letter-spaced, purple — they open most sections.
- **Negative tracking scales with size.** Larger display = tighter tracking.

### Note on Fonts
All three families are open-source and available via Google Fonts / Vercel. No licensed substitute needed. If Funnel Display is unavailable, fall back to **Geist** at weight 600 with -1.5% tracking for display.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.base}` 16px · `{spacing.md}` 20px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.xxxl}` 64px · `{spacing.section}` 96px.
- **Section padding:** 96px vertical desktop.

### Grid & Container
- Max content width: ~1200px.
- Editorial body: 12-column grid, 24px gutters.
- Program cards: 3-up desktop, 2-up tablet, 1-up mobile.
- Stat row: 4-up impact band.
- University logo wall: 5–6 up.
- Footer: 4-column at desktop.

### Whitespace Philosophy
Aspirational and open. Generous 96px section rhythm with alternating canvas / plum bands to pace the story: mission → programs → impact stats → scholar stories → get involved. Cards within a band sit 24px apart.

## Elevation & Depth

Depth is **hairline-first with one soft shadow tier** for cards. On the light canvas, cards lift on a low-spread neutral shadow; on hover, the shadow warms toward purple. Plum bands carry no shadow — they anchor depth through color inversion.

| Level | Treatment | Use |
|---|---|---|
| Flat (canvas) | `{colors.canvas}` | Body bands |
| Lilac panel | `{colors.surface-lilac}` | Stat cards, quiet panels |
| Card | `{colors.surface-card}` + `{shadow.card}` | Program / feature / scholar cards |
| Card hover | `{shadow.card-hover}` (purple-warmed) | Interactive card hover |
| Plum band | `{colors.surface-plum}` | Hero, CTA, impact — depth via inversion |

### Decorative Depth
- **Purple gradient glows** (`{colors.primary-bright}` → transparent) behind hero copy and stat bands add atmosphere without surfaces.
- **Gold accents** punctuate — a single stat number, an award pill — never a full surface.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed imagery |
| `{rounded.xs}` | 4px | Inline tags |
| `{rounded.sm}` | 8px | Compact chips, inputs-small |
| `{rounded.md}` | 12px | Inputs, logo tiles |
| `{rounded.lg}` | 16px | Cards, panels |
| `{rounded.xl}` | 24px | Hero media, large feature blocks |
| `{rounded.pill}` | 9999px | Buttons, eyebrow + award pills |
| `{rounded.full}` | 9999px | Scholar avatars |

## Components

### Top Navigation

**`top-nav`** — Background `{colors.canvas}`, text `{colors.ink}`, height 72px, 1px `{colors.hairline}` bottom border on scroll. Layout: TSN wordmark left; menu center-right (About / Programs / Network / Impact / Blog); Donate (`button-donate`) + Get Involved (`button-primary`) right.

### Buttons

**`button-primary`** — The signature purple pill. Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.button}` (15px / 500), padding 12px × 22px, height 44px, rounded `{rounded.pill}`.

**`button-primary-hover`** — Hover state. Background `{colors.primary-hover}`, `{shadow.card-hover}`.

**`button-secondary`** — White pill with purple text. Background `{colors.surface-card}`, text `{colors.primary}`, 1px `{colors.hairline-strong}` border, rounded `{rounded.pill}`.

**`button-tertiary-text`** — Inline purple text link with underline-on-hover.

**`button-donate`** — Gold pill for donations. Background `{colors.accent-gold}`, text `{colors.ink}` (dark for AA contrast on gold), rounded `{rounded.pill}`. The only gold CTA.

### Hero

**`hero-band`** — Light hero. Background `{colors.canvas}` with a soft `{colors.primary-bright}` radial glow. Eyebrow (`eyebrow-label`), display headline in `{typography.display-mega}` (68px / Funnel Display), lead subhead in `{typography.body-lg}`, two CTAs (`button-primary` + `button-tertiary-text`), and a supporting media block (student photo or short film still) at `{rounded.xl}`.

**`hero-band-plum`** — Inverted hero variant. Background `{colors.surface-plum}`, text `{colors.on-plum}`, headline still Funnel Display. Used for campaign / cohort-launch pages.

### Impact & Stats (signature)

**`stat-card`** — Lilac panel. Background `{colors.surface-lilac}`, rounded `{rounded.lg}`, padding 28px. Holds a big Funnel Display number + Geist Mono caption.

**`stat-number`** — The impact figure. Type `{typography.stat-mega}` (56px / Funnel Display), color `{colors.primary}`; a single hero stat may use `{colors.accent-gold}`. Captions in `{typography.stat-label}` (Geist Mono). Examples: "75+ scholars," "USD 6M+ in scholarships," "105 schools," "16 districts."

### Cards

**`program-card`** — For Scholars' Pipeline / Post-Grad Pipeline / community projects. Background `{colors.surface-card}`, title `{typography.heading-md}` (Geist), body `{typography.body-md}`, rounded `{rounded.lg}`, padding 28px, `{shadow.card}`, purple-warmed hover.

**`feature-card`** — Generic benefit / value card. Background `{colors.surface-card}`, type `{typography.title-md}`, rounded `{rounded.lg}`, padding 24px, `{shadow.card}`.

**`scholar-card`** — Alumni / scholar spotlight. Full-bleed portrait top (`{rounded.lg}` top corners), name in `{typography.title-md}`, university + field in `{typography.body-sm}` `{colors.muted}`, optional `award-pill`. Padding 0 (media flush), inner text padded 20px.

**`testimonial-card`** — Quote from a scholar or mentor. Background `{colors.primary-tint}`, quote in `{typography.body-lg}` `{colors.body-strong}`, attribution in `{typography.body-sm}`, rounded `{rounded.lg}`, padding 32px.

**`university-logo-tile`** — Grayscale university logo on white, `{rounded.md}`, padding 20px. Builds credibility (Princeton, MIT, Oxford, NUS…).

### Pills & Labels

**`eyebrow-label`** — Section opener. Transparent, text `{colors.primary}`, type `{typography.eyebrow}` (Geist Mono, uppercase, 1.2px tracking).

**`eyebrow-pill`** — Purple chip variant. Background `{colors.primary-soft}`, text `{colors.primary-active}`, rounded `{rounded.pill}`.

**`award-pill`** — Gold recognition chip ("Scholarship Winner," "Award-Winning"). Background `{colors.accent-gold-soft}`, text #8A6410, rounded `{rounded.pill}`.

### Forms

**`text-input`** — Background `{colors.surface-card}`, text `{colors.ink}`, 1px `{colors.hairline-strong}` border, rounded `{rounded.md}`, padding 12px × 16px, height 48px. Focus: `{shadow.focus-ring}` (purple glow) + `{colors.primary}` border.

### CTA / Footer

**`cta-band`** — Pre-footer "Join us in our fight 💜" band. Background `{colors.surface-plum}`, centered headline in `{typography.display-lg}` `{colors.on-plum}`, one `button-primary` (or `button-secondary` on plum) + `button-donate`. 96px vertical padding.

**`footer`** — Closing footer. Background `{colors.ink-deep}`, text `{colors.on-plum-muted}`. 4-column link list, TSN wordmark + mission line, socials, newsletter signup. 72×48px padding.

**`footer-link`** — Transparent, text `{colors.on-plum}`, type `{typography.body-sm}`, purple-bright hover.

## Do's and Don'ts

### Do
- Reserve `{colors.primary}` (Striver Purple) for CTAs, links, wordmark, and stat numbers.
- Use `{colors.accent-gold}` only for achievement moments — one stat, awards, the donate CTA.
- Keep Funnel Display to hero/section heads and impact stats; Geist for everything smaller.
- Open sections with a Geist Mono eyebrow.
- Alternate canvas and plum bands to pace the mission → impact → involvement story.
- Show real scholars and university logos to earn trust.

### Don't
- Don't set body or small labels in Funnel Display — it's a display face only.
- Don't introduce a second brand action color beyond purple; gold is an accent, not a CTA system.
- Don't overuse gold — it loses meaning if it stops signaling achievement.
- Don't use hard drop shadows; keep the single soft, low-spread purple-warmed tier.
- Don't put purple text on gold or gold text on purple — use ink on gold, white on purple.
- Don't use pure white (#FFFFFF) as the full-page floor; the violet-tinted canvas is the base.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 640px | Hero h1 68→36px; stat row 2-up; program grid 1-up; nav hamburger; CTA stacks. |
| Tablet | 640–1024px | Hero h1 52px; stat row 4-up compact; program grid 2-up. |
| Desktop | 1024–1280px | Full hero 68px; stat row 4-up; program grid 3-up. |
| Wide | > 1280px | Content caps at 1200px. |

### Touch Targets
- All pill CTAs at 44px height — WCAG AA, near AAA.
- Inputs at 48px.

### Collapsing Strategy
- Top nav → hamburger below 768px; Donate stays visible.
- Stat band: 4-up → 4-up compact → 2-up.
- Program / scholar grids: 3-up → 2-up → 1-up.
- Plum bands keep 64px vertical padding on mobile (down from 96px).

## Iteration Guide

1. Focus on a single component at a time.
2. CTAs default to `{rounded.pill}`; cards to `{rounded.lg}` (16px); inputs/tiles to `{rounded.md}`.
3. Variants live as separate entries inside `components:`.
4. Use `{token.refs}` everywhere — never inline hex.
5. Funnel Display 500 for display + stats; Geist 400/500/600 for the rest; Geist Mono for eyebrows/labels.
6. Purple stays the single brand action color; gold stays scarce and achievement-scoped.
7. One soft shadow tier — warm it toward purple only on interactive hover.

## Known Gaps

- Animation timings (stat count-up, hero glow drift, card hover lift) out of scope.
- Illustration / photography art-direction guidelines (student portrait treatment, duotone rules) not yet specified.
- Data-viz palette for impact dashboards (reach by district, scholarship totals) beyond the two brand colors is undefined.
- Blog / long-form article typography scale is inherited from body tokens but not fully specified.
- Dark mode not defined; plum bands approximate inverted surfaces for now.
