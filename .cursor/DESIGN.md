---
version: alpha
name: TSN-design-system
description: A redesign for The Strivers' Network (thestriversetwork.org) — a youth-led Sri Lankan education nonprofit that mentors high-achieving, under-resourced students into the world's leading universities. The voice is aspirational, warm, and trustworthy: hopeful without being naive, editorial without being corporate. The canvas is a soft neutral off-white (`#FAFAFA`) holding a near-black ink (`#18181B`) — the palette is otherwise strictly monochrome. The single brand voltage is **Striver Purple** (`#6D28D9`), used only as a sparing accent: the Donate CTA, inline links, focus rings, the wordmark, the active nav indicator, and at most one highlight per view. Every other surface, button, card, and shadow stays grayscale. Type is a single family — **Geist** — carrying every size from the largest headline down to the smallest caption, with **Geist Mono** stamping stats, labels, and eyebrows. Shapes are crisp and restrained: no radius anywhere exceeds 8px. Depth is hairline-first with a single soft, neutral shadow tier. Generous 96px section rhythm, editorial 1200px container.

colors:
  primary: "#6D28D9"
  primary-hover: "#5B21B6"
  primary-active: "#4C1D95"
  primary-bright: "#8B5CF6"
  ink: "#18181B"
  ink-deep: "#09090B"
  body: "#52525B"
  body-strong: "#27272A"
  muted: "#71717A"
  muted-soft: "#A1A1AA"
  hairline: "#E4E4E7"
  hairline-soft: "#F4F4F5"
  hairline-strong: "#D4D4D8"
  canvas: "#FAFAFA"
  canvas-soft: "#FFFFFF"
  surface-card: "#FFFFFF"
  surface-muted: "#F4F4F5"
  surface-inverted: "#1F1F23"
  on-primary: "#FFFFFF"
  on-inverted: "#FAFAFA"
  on-inverted-muted: "#A1A1AA"
  semantic-success: "#2F9E6B"
  semantic-error: "#D14343"
  semantic-info: "#18181B"
  glass-light: "rgba(255,255,255,0.55)"
  glass-light-strong: "rgba(255,255,255,0.72)"
  glass-muted: "rgba(244,244,245,0.60)"
  glass-inverted: "rgba(31,31,35,0.55)"
  glass-inverted-strong: "rgba(31,31,35,0.72)"
  glass-ink: "rgba(9,9,11,0.60)"
  glass-border-light: "rgba(255,255,255,0.60)"
  glass-border-dark: "rgba(255,255,255,0.12)"
  glass-highlight: "rgba(255,255,255,0.50)"

blur:
  glass-sm: 8px
  glass-md: 16px
  glass-lg: 24px
  glass-xl: 40px
  glass-saturate: 130%

typography:
  display-mega:
    fontFamily: "'Geist', system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 68px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -1.5px
  display-lg:
    fontFamily: "'Geist', sans-serif"
    fontSize: 44px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -1px
  display-md:
    fontFamily: "'Geist', sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.5px
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
    fontFamily: "'Geist', sans-serif"
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: -1.2px
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
  card: "0 1px 2px rgba(24,24,27,0.04), 0 8px 24px rgba(24,24,27,0.06)"
  card-hover: "0 2px 4px rgba(24,24,27,0.08), 0 16px 40px rgba(24,24,27,0.14)"
  focus-ring: "0 0 0 3px rgba(109,40,217,0.35)"
  glass: "inset 0 1px 0 rgba(255,255,255,0.45), 0 8px 32px rgba(24,24,27,0.12)"
  glass-inverted: "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 40px rgba(0,0,0,0.35)"
  glass-hover: "inset 0 1px 0 rgba(255,255,255,0.50), 0 16px 48px rgba(24,24,27,0.16)"

components:
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 72px
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 12px 22px
    height: 44px
  button-primary-hover:
    backgroundColor: "{colors.body-strong}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    shadow: "{shadow.card-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 11px 21px
    height: 44px
    borderColor: "{colors.hairline-strong}"
  button-tertiary-text:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
  button-donate:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 12px 22px
    height: 44px
  link-inline:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  eyebrow-label:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.eyebrow}"
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-mega}"
    padding: 96px
  hero-band-inverted:
    backgroundColor: "{colors.surface-inverted}"
    textColor: "{colors.on-inverted}"
    typography: "{typography.display-mega}"
    padding: 96px
  stat-card:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    typography: "{typography.stat-mega}"
    rounded: "{rounded.sm}"
    padding: 28px
  stat-number:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.stat-mega}"
  program-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.heading-md}"
    rounded: "{rounded.sm}"
    padding: 28px
    shadow: "{shadow.card}"
  feature-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.sm}"
    padding: 24px
    shadow: "{shadow.card}"
  scholar-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.sm}"
    padding: 0
    shadow: "{shadow.card}"
  testimonial-card:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.body-strong}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.sm}"
    padding: 32px
  university-logo-tile:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: 20px
  eyebrow-pill:
    backgroundColor: "{colors.hairline-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.sm}"
    padding: 6px 12px
  recognition-pill:
    backgroundColor: "{colors.hairline-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.sm}"
    padding: 6px 12px
    borderColor: "{colors.hairline-strong}"
  text-input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
    height: 48px
  cta-band:
    backgroundColor: "{colors.surface-inverted}"
    textColor: "{colors.on-inverted}"
    typography: "{typography.display-lg}"
    padding: 96px
  footer:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.on-inverted-muted}"
    typography: "{typography.body-sm}"
    padding: 72px 48px
  footer-link:
    backgroundColor: transparent
    textColor: "{colors.on-inverted-muted}"
    typography: "{typography.body-sm}"
  glass-nav:
    backgroundColor: "{colors.glass-light-strong}"
    backdropBlur: "{blur.glass-lg}"
    backdropSaturate: "{blur.glass-saturate}"
    borderColor: "{colors.glass-border-light}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 72px
  glass-card:
    backgroundColor: "{colors.glass-light}"
    backdropBlur: "{blur.glass-md}"
    backdropSaturate: "{blur.glass-saturate}"
    borderColor: "{colors.glass-border-light}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.sm}"
    padding: 24px
    shadow: "{shadow.glass}"
  glass-card-inverted:
    backgroundColor: "{colors.glass-inverted-strong}"
    backdropBlur: "{blur.glass-md}"
    backdropSaturate: "{blur.glass-saturate}"
    borderColor: "{colors.glass-border-dark}"
    textColor: "{colors.on-inverted}"
    typography: "{typography.title-md}"
    rounded: "{rounded.sm}"
    padding: 24px
    shadow: "{shadow.glass-inverted}"
  glass-panel:
    backgroundColor: "{colors.glass-light-strong}"
    backdropBlur: "{blur.glass-xl}"
    backdropSaturate: "{blur.glass-saturate}"
    borderColor: "{colors.glass-border-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: 32px
    shadow: "{shadow.glass}"
---

## Overview

The Strivers' Network is a youth-led nonprofit bridging the higher-education guidance gap for Sri Lanka's high-achieving, under-resourced students. This redesign gives that mission an aspirational, editorial voice: hopeful and human, credible enough to sit beside Princeton, MIT, and Oxford logos, and warm enough to feel youth-led rather than institutional.

The base canvas is a **neutral off-white** (`{colors.canvas}` — #FAFAFA) holding a **near-black ink** (`{colors.ink}` — #18181B) — the palette is otherwise strictly monochrome, with no violet tint or second hue anywhere in the surface, text, or border system. The single brand voltage — **Striver Purple** (`{colors.primary}` — #6D28D9) — is spent sparingly, on a short, deliberate list: the Donate CTA, inline text links, focus rings, the wordmark, the active nav indicator, and at most one highlight per view. Every button, card, panel, badge, and shadow elsewhere in the system stays grayscale.

Type is a single-family system. **Geist** carries every size — from the largest hero headline down to the smallest caption — at three practical weights (400 body, 500 medium emphasis, 600 for every heading tier `title-sm` and above, including the former display roles). **Geist Mono** stamps eyebrows, labels, and stat captions in a restrained neutral tone — a quiet signal of precision and rigor, not a spend of the accent color.

**Key Characteristics:**
- Neutral off-white canvas — never sterile pure white for the page floor, and never tinted toward any hue.
- Single, sparing brand accent: Striver Purple, reserved for the Donate CTA, links, focus rings, the wordmark, active nav, and at most one highlight per view. Everything else is monochrome.
- One typeface, Geist, for every size — no separate display face.
- Deep, near-black inverted bands (`{colors.surface-inverted}`) anchor hero, CTA, and impact sections — monochrome, not color-tinted.
- Soft, low-spread neutral shadow on cards — one elevation tier; it deepens, not colors, on hover.
- Crisp, restrained corners: every radius across the system caps at `{rounded.sm}` (8px) — buttons, cards, inputs, avatars, and media alike.
- Optional **frosted-glass layer** — translucent panels with backdrop blur floated over inverted bands and imagery, for atmospheric depth without adding opaque surfaces or color. Glass stays neutral, never tinted with the accent. Glass is a spotlight treatment (nav-on-scroll, hero overlays, feature/scholar cards on imagery), never the default for every card.

## Colors

### Brand & Accent
- **Striver Purple** (`{colors.primary}` — #6D28D9): The single accent. Reserved for the Donate CTA (`button-donate`), inline text links, focus rings, the wordmark, and the active nav indicator.
- **Purple Hover** (`{colors.primary-hover}` — #5B21B6): Donate CTA hover.
- **Purple Active** (`{colors.primary-active}` — #4C1D95): Donate CTA press state.
- **Purple Bright** (`{colors.primary-bright}` — #8B5CF6): Reserved for the rare, at-most-one-per-view highlight (a single stat number, a single headline word) and focus-glow accents. Never a default surface or background.

### Surface
- **Canvas** (`{colors.canvas}` — #FAFAFA): Neutral off-white page floor.
- **Canvas Soft** (`{colors.canvas-soft}` — #FFFFFF): Alternating light band.
- **Surface Card** (`{colors.surface-card}` — #FFFFFF): Card surface.
- **Surface Muted** (`{colors.surface-muted}` — #F4F4F5): Stat cards, testimonial cards, quiet panels.
- **Surface Inverted** (`{colors.surface-inverted}` — #1F1F23): Inverted hero / CTA / impact bands — near-black, monochrome.

### Hairlines
- **Hairline** (`{colors.hairline}` — #E4E4E7): 1px divider, card outline.
- **Hairline Soft** (`{colors.hairline-soft}` — #F4F4F5): Faint divider, neutral chip backgrounds.
- **Hairline Strong** (`{colors.hairline-strong}` — #D4D4D8): Input borders, stronger outline.

### Text
- **Ink** (`{colors.ink}` — #18181B): Display + heading ink. Near-black neutral.
- **Ink Deep** (`{colors.ink-deep}` — #09090B): Footer floor.
- **Body** (`{colors.body}` — #52525B): Default running text.
- **Body Strong** (`{colors.body-strong}` — #27272A): Emphasis body, pull-quotes.
- **Muted** (`{colors.muted}` — #71717A): Sub-labels, captions, eyebrows.
- **Muted Soft** (`{colors.muted-soft}` — #A1A1AA): Disabled, placeholder.
- **On Primary** (`{colors.on-primary}` — #FFFFFF): Text on the Donate button and any solid-purple surface.
- **On Inverted** (`{colors.on-inverted}` — #FAFAFA): Text on inverted bands.
- **On Inverted Muted** (`{colors.on-inverted-muted}` — #A1A1AA): Secondary text on inverted bands.

### Semantic
- **Success** (`{colors.semantic-success}` — #2F9E6B): Form success, "application received." A functional exception to the monochrome rule — every UI needs a success/error signal.
- **Error** (`{colors.semantic-error}` — #D14343): Validation errors. Same functional exception.
- **Info** (`{colors.semantic-info}` — #18181B): Informational notices — neutral ink, distinguished by icon rather than color; the accent stays spent on interactive elements, not routine banners.

## Typography

### Font Families
- **Geist** — every size, from hero headlines and impact stats down to captions. Weights 400 / 500 / 600 (600 covers every heading tier, `title-sm` and above, including the former display roles).
- **Geist Mono** — eyebrows, labels, and stat captions. A precision signal, kept neutral rather than accent-colored.

### Hierarchy

| Token | Family | Size | Weight | Line Height | Tracking | Use |
|---|---|---|---|---|---|---|
| `{typography.display-mega}` | Geist | 68px | 600 | 1.05 | -1.5px | Homepage hero h1 |
| `{typography.display-lg}` | Geist | 44px | 600 | 1.1 | -1px | Section heads, CTA band |
| `{typography.display-md}` | Geist | 32px | 600 | 1.15 | -0.5px | Sub-section heads |
| `{typography.heading-lg}` | Geist | 24px | 600 | 1.25 | -0.3px | Card group heads |
| `{typography.heading-md}` | Geist | 20px | 600 | 1.3 | -0.2px | Program card titles |
| `{typography.title-md}` | Geist | 18px | 600 | 1.4 | 0 | Component titles |
| `{typography.title-sm}` | Geist | 16px | 600 | 1.4 | 0 | List labels |
| `{typography.body-lg}` | Geist | 18px | 400 | 1.6 | 0 | Lead paragraphs, quotes |
| `{typography.body-md}` | Geist | 16px | 400 | 1.6 | 0 | Default body |
| `{typography.body-sm}` | Geist | 14px | 400 | 1.5 | 0 | Footer, meta |
| `{typography.caption}` | Geist | 13px | 400 | 1.4 | 0 | Photo captions |
| `{typography.eyebrow}` | Geist Mono | 12px | 500 | 1.4 | 1.2px | Section eyebrows (uppercase, neutral) |
| `{typography.stat-mega}` | Geist | 56px | 600 | 1.0 | -1.2px | Impact numbers |
| `{typography.stat-label}` | Geist Mono | 13px | 400 | 1.4 | 0.4px | Stat captions |
| `{typography.button}` | Geist | 15px | 500 | 1.0 | 0 | CTA labels |
| `{typography.nav-link}` | Geist | 15px | 500 | 1.4 | 0 | Top-nav menu |

### Principles
- **One family, one voice.** Geist covers every size from mega display down to the smallest caption and mono label — weight and size are the only levers, not a second face.
- **Geist carries the workload.** Every heading `title-sm` and above uses weight 600; body copy uses 400.
- **Geist Mono eyebrows set the rhythm.** Uppercase, letter-spaced, **neutral** (muted gray) — they open most sections without spending the accent color.
- **Negative tracking scales with size.** Larger display = tighter tracking.

### Note on Fonts
Geist is available as a variable font via Vercel/Google Fonts, so every weight used here (400–600) loads from a single family — no second display face to source or fall back from. Fallback stack: `system-ui, -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif`.

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
Aspirational and open. Generous 96px section rhythm with alternating canvas / inverted bands to pace the story: mission → programs → impact stats → scholar stories → get involved. Cards within a band sit 24px apart.

## Elevation & Depth

Depth is **hairline-first with one soft, strictly neutral shadow tier** for cards, plus an **optional frosted-glass tier** for spotlight moments. On the light canvas, cards lift on a low-spread neutral shadow; on hover, the shadow simply deepens — it never shifts color. Inverted bands carry no shadow — they anchor depth through tonal inversion (near-black vs. off-white), not color.

| Level | Treatment | Use |
|---|---|---|
| Flat (canvas) | `{colors.canvas}` | Body bands |
| Muted panel | `{colors.surface-muted}` | Stat cards, quiet panels |
| Card | `{colors.surface-card}` + `{shadow.card}` | Program / feature / scholar cards |
| Card hover | `{shadow.card-hover}` (neutral, deepens only) | Interactive card hover |
| Glass | translucent fill + backdrop blur + `{shadow.glass}` | Nav-on-scroll, hero overlays, cards floated on imagery |
| Inverted band | `{colors.surface-inverted}` | Hero, CTA, impact — depth via tonal inversion |

Glass is the **top** of the elevation stack — reserve it for surfaces that intentionally float over something (a photo, an inverted band). Don't stack glass on glass, and don't use it as a flat replacement for `card` on the plain canvas, where there is nothing behind it to refract.

### Decorative Depth
- **Neutral radial vignette** (ink at low opacity → transparent) behind hero copy adds atmosphere without surfaces or color. Purple appears only in the interactive layer sitting on top of it (a button, a link) — never as a background wash.
- **The accent punctuates, never spreads.** Purple shows up as a single button, a link, a focus ring — never a tinted panel, glow, or full surface.

## Glassmorphism

Glass is an **optional, spotlight layer** — not the base aesthetic. It expresses the brand's aspirational, forward-looking voice on a few high-impact surfaces (the nav as it lifts off the hero, an overlay panel, a scholar/feature card floated on imagery) while the editorial canvas / inverted / card system carries the rest of the page. Frosted, restrained, and strictly neutral — never tinted, never heavy sci-fi glass.

### The Recipe

Every glass surface is the same five ingredients layered in order:

1. **Translucent fill** — a `glass-*` color, not a solid, and always neutral. Light contexts use `{colors.glass-light}` / `{colors.glass-light-strong}`; over inverted bands or in the dark theme use `{colors.glass-inverted}` / `{colors.glass-inverted-strong}` / `{colors.glass-ink}`. Never tint the frost with `{colors.primary}`, even faintly — the sparing accent belongs to the interactive element sitting on top of the glass (a button, a link), not the glass itself.
2. **Backdrop blur + saturate** — `backdrop-filter: blur({blur.glass-md}) saturate({blur.glass-saturate})`. Saturation boost keeps the refracted image from going flat. Pick blur by surface size: `{blur.glass-sm}` chips, `{blur.glass-md}` cards, `{blur.glass-lg}` nav, `{blur.glass-xl}` full panels/modals.
3. **1px translucent border** — `{colors.glass-border-light}` on light glass, `{colors.glass-border-dark}` over inverted/dark. This edge is what makes glass legible against a busy backdrop.
4. **Inset top highlight** — the `inset 0 1px 0 …` in `{shadow.glass}` / `{shadow.glass-inverted}` simulates a lit top rim.
5. **Soft drop shadow** — the outer half of `{shadow.glass}`; deepens to `{shadow.glass-hover}` on interactive hover, consistent with the one-tier, color-neutral shadow philosophy.

### Blur Scale

| Token | Value | Use |
|---|---|---|
| `{blur.glass-sm}` | 8px | Chips, pills, small tags on imagery |
| `{blur.glass-md}` | 16px | Glass cards, tiles |
| `{blur.glass-lg}` | 24px | Sticky nav on scroll |
| `{blur.glass-xl}` | 40px | Full overlays, modals, mobile menu sheet |
| `{blur.glass-saturate}` | 130% | Companion `backdrop-saturate` on all of the above |

### Where Glass Fits (and where it doesn't)

- **Fits:** nav bar once it scrolls over the hero; a hero foreground card/stat cluster over imagery; feature/scholar cards laid on a photo; modal / mobile-menu sheets; toast/notification chips.
- **Doesn't:** long-form body cards on the flat canvas (use `feature-card` / `program-card` — there's nothing behind them to refract); dense data tables and forms where text must stay razor-sharp; stacking one glass surface on another.

### Accessibility & Fallbacks

- **Contrast first.** Text over glass must still meet WCAG AA. Over busy imagery use the `-strong` fills (`{colors.glass-light-strong}` / `{colors.glass-inverted-strong}`) and/or a subtle solid scrim behind the text. Never run body copy on a <0.55-opacity fill over a photo.
- **`@supports` fallback.** Where `backdrop-filter` is unsupported, fall back to a solid surface — `{colors.surface-card}` on light, `{colors.surface-inverted}` over inverted bands — keeping the same border, radius, and shadow so layout is unchanged.
- **Respect user preference.** Under `prefers-reduced-transparency: reduce` (and reduced-motion for any vignette drift), swap glass for the solid fallback. The page must never depend on translucency to be readable.

### Current Implementation Notes

The `.glass` / `.glass-plum` component classes are already wired into `globals.css` and `tailwind.config.mjs` from an earlier implementation pass — but that pass predates this monochrome/Geist-only/`{rounded.sm}`-ceiling revision. The shipped tokens still use the prior purple-forward, gold-accented, pill-and-`rounded.xl`, Funnel-Display system throughout. This spec is intentionally ahead of the code again: treat every reference above (`surface-inverted`, `glass-inverted`, `{rounded.sm}`, Geist-only type, single-accent purple) as the target, not the current state, until a follow-up implementation pass lands. When implementing:
- Rename/remap the shipped `--surface-plum`, `--on-plum(-muted)`, `--glass-plum(-strong)` variables to the `-inverted` names above, and drop `--accent-gold*` entirely.
- Collapse the shipped `rounded` scale (currently `sm`/`md`/`lg`/`xl`/`pill`/`full`) down to `none`/`xs`/`sm` and re-point every component (buttons, cards, inputs, avatars, hero media, glass panel) at the 8px ceiling.
- Drop the `Funnel_Display` font load and repoint `font-display` at Geist; audit every `text-display-*`/`text-stat-mega` call site for the family/weight/tracking change.
- Re-audit every purple usage against the accent list (Donate CTA, links, focus ring, wordmark, active nav, at most one highlight) and move everything else (default buttons, eyebrows, badges, hero glow, hover shadows, testimonial background) to the neutral tokens above.

## Shapes

The system uses a single restrained radius ceiling: nothing on the site is rounder than `{rounded.sm}` (8px) — not buttons, not cards, not avatars, not media. Sharper corners read as precise and editorial, reinforcing the monochrome, quietly confident voice. Reserve `{rounded.none}` / `{rounded.xs}` for full-bleed imagery and the smallest inline tags.

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed imagery, dividers |
| `{rounded.xs}` | 4px | Inline tags, small chips |
| `{rounded.sm}` | 8px | Everything else — buttons, cards, inputs, avatars, hero media, glass panels. The ceiling for the whole system; nothing exceeds it. |

## Components

### Top Navigation

**`top-nav`** — Background `{colors.canvas}`, text `{colors.ink}`, height 72px, 1px `{colors.hairline}` bottom border on scroll. Layout: TSN wordmark left (the one accent-colored mark on the bar); menu center-right (About / Programs / Network / Impact / Blog) in neutral ink, active item marked with a small purple underline/dot; Donate (`button-donate`, solid purple — the one accent button) + Get Involved (`button-secondary`, neutral outline) right.

### Buttons

**`button-primary`** — The default, most-used button. Solid ink fill, `{colors.ink}`, text `{colors.on-primary}`, type `{typography.button}` (15px / 500), padding 12px × 22px, height 44px, rounded `{rounded.sm}`. Neutral by design — used for "Apply," "Learn More," and every routine primary action, so it stays monochrome rather than spending the accent.

**`button-primary-hover`** — Hover state. Background `{colors.body-strong}` (deepens, no color shift), `{shadow.card-hover}`.

**`button-secondary`** — White outline button. Background `{colors.surface-card}`, text `{colors.ink}`, 1px `{colors.hairline-strong}` border, rounded `{rounded.sm}`.

**`button-tertiary-text`** — Inline neutral text link with underline-on-hover, `{colors.ink}`. For secondary in-flow actions ("Learn more →").

**`button-donate`** — The single solid-purple button in the system. Background `{colors.primary}`, text `{colors.on-primary}` (white), rounded `{rounded.sm}`. Reserved for the one most important conversion action per page (Donate / primary campaign CTA) — its rarity is what makes it read as urgent.

**`link-inline`** — Inline text link inside body copy or rich text. Text `{colors.primary}`, underline on hover. The accent's most natural home: sparse by nature, since links inside paragraphs are inherently uncommon.

### Hero

**`hero-band`** — Light hero. Background `{colors.canvas}` with a soft neutral radial vignette (ink at low opacity → transparent, no color). Eyebrow (`eyebrow-label`, neutral), display headline in `{typography.display-mega}` (68px / Geist 600), lead subhead in `{typography.body-lg}`, two neutral CTAs (`button-primary` + `button-tertiary-text`), and a supporting media block (student photo or short film still) at `{rounded.sm}`.

**`hero-band-inverted`** — Inverted hero variant. Background `{colors.surface-inverted}`, text `{colors.on-inverted}`, headline still Geist 600. Used for campaign / cohort-launch pages.

### Impact & Stats (signature)

**`stat-card`** — Muted panel. Background `{colors.surface-muted}`, rounded `{rounded.sm}`, padding 28px. Holds a big Geist 600 number + Geist Mono caption.

**`stat-number`** — The impact figure. Type `{typography.stat-mega}` (56px / Geist 600), color `{colors.ink}` by default. A single hero-level stat across the whole site may use `{colors.primary}` as a rare highlight — never more than one per view. Captions in `{typography.stat-label}` (Geist Mono). Examples: "75+ scholars," "USD 6M+ in scholarships," "105 schools," "16 districts."

### Cards

**`program-card`** — For Scholars' Pipeline / Post-Grad Pipeline / community projects. Background `{colors.surface-card}`, title `{typography.heading-md}` (Geist), body `{typography.body-md}`, rounded `{rounded.sm}`, padding 28px, `{shadow.card}`, neutral hover (deepens, no color shift).

**`feature-card`** — Generic benefit / value card. Background `{colors.surface-card}`, type `{typography.title-md}`, rounded `{rounded.sm}`, padding 24px, `{shadow.card}`.

**`scholar-card`** — Alumni / scholar spotlight. Full-bleed portrait top (`{rounded.sm}` top corners), name in `{typography.title-md}`, university + field in `{typography.body-sm}` `{colors.muted}`, optional `recognition-pill`. Padding 0 (media flush), inner text padded 20px.

**`testimonial-card`** — Quote from a scholar or mentor. Background `{colors.surface-muted}` (neutral, not tinted), quote in `{typography.body-lg}` `{colors.body-strong}`, attribution in `{typography.body-sm}`, rounded `{rounded.sm}`, padding 32px.

**`university-logo-tile`** — Grayscale university logo on white, `{rounded.sm}`, padding 20px. Builds credibility (Princeton, MIT, Oxford, NUS…).

### Glass Surfaces (optional layer)

Frosted, strictly neutral variants for surfaces that float over a photo or inverted band. See **Glassmorphism** for the full recipe and fallbacks.

**`glass-nav`** — The top nav once it scrolls off the hero. Fill `{colors.glass-light-strong}`, `backdrop-blur` `{blur.glass-lg}` + saturate, 1px `{colors.glass-border-light}` bottom edge. At the very top of the page the nav is the flat `top-nav`; it transitions to `glass-nav` on scroll.

**`glass-card`** — A feature or scholar card laid on imagery. Fill `{colors.glass-light}`, `backdrop-blur` `{blur.glass-md}`, border `{colors.glass-border-light}`, `{rounded.sm}`, `{shadow.glass}`; hover lifts to `{shadow.glass-hover}`. Use `glass-card-inverted` (fill `{colors.glass-inverted-strong}`, border `{colors.glass-border-dark}`, text `{colors.on-inverted}`) when floated on an inverted band or in dark theme.

**`glass-panel`** — Larger overlay surface: modal, dialog, or mobile-menu sheet. Fill `{colors.glass-light-strong}`, `backdrop-blur` `{blur.glass-xl}`, `{rounded.sm}`, padding 32px, `{shadow.glass}`.

### Pills & Labels

**`eyebrow-label`** — Section opener. Transparent, text `{colors.muted}` (neutral gray), type `{typography.eyebrow}` (Geist Mono, uppercase, 1.2px tracking). Appears at the top of nearly every section, so it stays neutral rather than spending the accent.

**`eyebrow-pill`** — Neutral chip variant. Background `{colors.hairline-soft}`, text `{colors.ink}`, rounded `{rounded.sm}`.

**`recognition-pill`** — Neutral recognition chip ("Scholarship Winner," "Award-Winning"). Background `{colors.hairline-soft}`, text `{colors.ink}`, 1px `{colors.hairline-strong}` border, rounded `{rounded.sm}`. Distinguished by icon + label, not color — the palette stays monochrome even for achievement moments.

### Forms

**`text-input`** — Background `{colors.surface-card}`, text `{colors.ink}`, 1px `{colors.hairline-strong}` border, rounded `{rounded.sm}`, padding 12px × 16px, height 48px. Focus: `{shadow.focus-ring}` (the one purple glow reserved for interaction state) + `{colors.primary}` border.

### CTA / Footer

**`cta-band`** — Pre-footer "Join us in our fight" band. Background `{colors.surface-inverted}`, centered headline in `{typography.display-lg}` `{colors.on-inverted}`, one neutral `button-secondary` (outline, on-inverted text) + `button-donate` (solid purple) — the one deliberate accent pop against the otherwise monochrome band. 96px vertical padding.

**`footer`** — Closing footer. Background `{colors.ink-deep}`, text `{colors.on-inverted-muted}`. 4-column link list, TSN wordmark + mission line, socials, newsletter signup. 72×48px padding.

**`footer-link`** — Transparent, text `{colors.on-inverted-muted}`, type `{typography.body-sm}`, hover brightens to `{colors.on-inverted}` (neutral, not purple — the footer has too many links for the accent to stay sparing there).

## Do's and Don'ts

### Do
- Reserve `{colors.primary}` for the accent list only: the Donate CTA, inline text links, focus rings, the wordmark, the active nav indicator, and at most one highlight per view.
- Keep the palette otherwise strictly monochrome — canvas, surfaces, ink, borders, and shadows all neutral grayscale.
- Keep every rounded corner at `{rounded.sm}` (8px) or less — buttons, cards, inputs, avatars, media, pills. No larger radii, no fully circular/pill shapes.
- Use Geist for every weight of type, from display heads to captions to mono labels — no separate display face.
- Open sections with a neutral (not purple) Geist Mono eyebrow.
- Alternate canvas and inverted (near-black) bands to pace the mission → impact → involvement story.
- Show real scholars and university logos to earn trust.
- Reach for glass only where a surface floats over an image or inverted band — solid fallback + AA-contrast safety net always, and keep the frost neutral.

### Don't
- Don't tint canvas, surfaces, cards, panels, or shadows with purple — the palette is monochrome apart from the accent list above.
- Don't make every primary button purple — the default primary/secondary buttons are neutral ink; purple is reserved for the one accent button (Donate) plus links, focus, and the wordmark.
- Don't use Funnel Display or introduce any other display face — Geist covers every size.
- Don't exceed `{rounded.sm}` anywhere, including avatars — corners stay crisp and consistent across the system.
- Don't use hard drop shadows; keep the single soft, strictly neutral shadow tier (no color-warmed hover).
- Don't use pure white (#FFFFFF) as the full-page floor; the canvas is a soft neutral off-white.
- Don't over-glass: no glass on the flat canvas with nothing behind it, no glass on glass, and no glass behind dense body text, tables, or forms.
- Don't let translucency break legibility — if text can't hold AA over the frost, use a `-strong` fill or a scrim, and always ship the `@supports` / `prefers-reduced-transparency` solid fallback.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 640px | Hero h1 68→36px; stat row 2-up; program grid 1-up; nav hamburger; CTA stacks. |
| Tablet | 640–1024px | Hero h1 52px; stat row 4-up compact; program grid 2-up. |
| Desktop | 1024–1280px | Full hero 68px; stat row 4-up; program grid 3-up. |
| Wide | > 1280px | Content caps at 1200px. |

### Touch Targets
- All primary/accent buttons at 44px height — WCAG AA, near AAA.
- Inputs at 48px.

### Collapsing Strategy
- Top nav → hamburger below 768px; Donate stays visible.
- Stat band: 4-up → 4-up compact → 2-up.
- Program / scholar grids: 3-up → 2-up → 1-up.
- Inverted bands keep 64px vertical padding on mobile (down from 96px).

## Iteration Guide

1. Focus on a single component at a time.
2. Every rounded surface — CTAs, cards, inputs, tiles, avatars, media — uses `{rounded.sm}` (8px). There is no larger tier.
3. Variants live as separate entries inside `components:`.
4. Use `{token.refs}` everywhere — never inline hex.
5. Geist 600 for every heading tier (`title-sm` and above, including the former display/stat roles); Geist 400/500 for body/labels; Geist Mono for eyebrows/stat captions.
6. Purple stays reserved for the accent list only (Donate CTA, links, focus, wordmark, active nav, at most one highlight per view) — never a default surface, button, or shadow color.
7. One soft, strictly neutral shadow tier — it deepens on hover, never shifts color.
8. Glass is a spotlight layer, not a default — float it over an image/inverted band, always with a solid fallback and AA-safe text; keep its tint neutral, never purple.

## Known Gaps

- Animation timings (stat count-up, vignette drift, card hover lift) out of scope.
- Illustration / photography art-direction guidelines (student portrait treatment, duotone rules) not yet specified.
- Data-viz palette for impact dashboards (reach by district, scholarship totals) beyond ink/gray + the single accent is undefined.
- Blog / long-form article typography scale is inherited from body tokens but not fully specified.
- Dark mode: the app currently ships **dark-theme-first** via shadcn tokens (`[data-theme="dark"]`), which the spec's inverted/ink surfaces approximate but do not yet fully formalize as a parallel token set. The `glass-inverted` / `glass-ink` fills are the dark-context glass; a full light↔dark token mapping is still to be specified.
- Glass timings/motion (nav frost fade-in on scroll, hover lift) are out of scope here — see Animation gap above.
- The shipped codebase (Tailwind config, `globals.css`, blocks) still reflects the prior purple-forward/gold/Funnel-Display/larger-radius system — see **Current Implementation Notes** under Glassmorphism for the remap this revision requires.
