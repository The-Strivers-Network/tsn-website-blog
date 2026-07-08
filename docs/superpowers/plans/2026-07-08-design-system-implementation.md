# TSN Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the `.cursor/DESIGN.md` design system (spec: `docs/superpowers/specs/2026-07-08-design-system-implementation-design.md`) across the whole site: tokens for light+dark, Funnel Display/Geist Mono type, pill primitives, glass nav, and a full sweep of blocks/heros/pages.

**Architecture:** Remap the existing shadcn CSS variables to spec values (HSL triplets so Tailwind alpha modifiers keep working), add extension tokens for spec concepts shadcn lacks, then sweep components. A vitest contrast test guards WCAG AA on every token pair.

**Tech Stack:** Next.js 15, Tailwind 3.4, shadcn/ui, Payload CMS 3 (untouched), vitest.

## Global Constraints

- Branch: `dev`. Commit after every task with the trailer `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- **No CMS schema changes** — never run `pnpm generate:types`; never touch `src/collections/`, `src/blocks/**/config.ts`, or `src/app/(payload)/`.
- Dark theme stays the **default**. Do not touch `src/providers/Theme` or the FOUC guard in `globals.css`.
- CSS variables use **HSL triplets** (`254 27% 10%`), referenced from Tailwind as `hsl(var(--x) / <alpha-value>)`; border/input/ring bake alpha in the var and are referenced as `hsl(var(--x))`.
- No dynamically-built Tailwind class names (Tailwind can't see string interpolation; the existing `safelist` in `tailwind.config.mjs` must not shrink).
- Chart (`--chart-*`) and sidebar (`--sidebar-*`) variables keep their current values verbatim — they serve the admin/analytics UI.
- Verification commands: `pnpm exec vitest run --config ./vitest.config.mts`, `npx tsc --noEmit`, `pnpm lint`, `pnpm build`. Shell is PowerShell.
- Design decision already made (contrast-driven): dark-theme `--primary` is **violet-400 `255 92% 76%` (#A78BFA) with ink-deep foreground**, not the spec table's #8B5CF6 — #8B5CF6 fails 4.5:1 with both white and ink text. The spec's verification section authorizes this adjustment.

---

### Task 1: Contrast test harness (failing first)

**Files:**
- Create: `vitest.config.mts`
- Create: `tests/int/designTokens.int.spec.ts`

**Interfaces:**
- Produces: a vitest suite that parses `src/app/(frontend)/globals.css`, resolving HSL-triplet variables from the `:root` and `[data-theme='dark']` blocks, and asserts WCAG contrast ratios. Task 2 makes it pass; Task 12 re-runs it.

- [ ] **Step 1: Create `vitest.config.mts`** (the `test:int` script already points here but the file doesn't exist):

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/int/**/*.int.spec.ts'],
    environment: 'node',
  },
})
```

- [ ] **Step 2: Write the failing test** at `tests/int/designTokens.int.spec.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const css = readFileSync(
  path.resolve(__dirname, '../../src/app/(frontend)/globals.css'),
  'utf-8',
)

/** Extract a CSS block's body by its selector. */
function block(selector: string): string {
  const start = css.indexOf(selector)
  if (start === -1) throw new Error(`selector not found: ${selector}`)
  const open = css.indexOf('{', start)
  let depth = 1
  let i = open + 1
  while (depth > 0 && i < css.length) {
    if (css[i] === '{') depth++
    if (css[i] === '}') depth--
    i++
  }
  return css.slice(open + 1, i - 1)
}

/** Read `--name: H S% L%[ / a]` from a block. Returns [r,g,b] in 0-255. */
function readVar(blockCss: string, name: string): [number, number, number] {
  const m = blockCss.match(new RegExp(`--${name}:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%`))
  if (!m) throw new Error(`--${name} not found or not an HSL triplet`)
  const [h, s, l] = [Number(m[1]), Number(m[2]) / 100, Number(m[3]) / 100]
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const mm = l - c / 2
  const [r1, g1, b1] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x]
  return [(r1 + mm) * 255, (g1 + mm) * 255, (b1 + mm) * 255]
}

function luminance([r, g, b]: [number, number, number]): number {
  const lin = (v: number) => {
    const c = v / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function ratio(a: [number, number, number], b: [number, number, number]): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

const light = () => block(':root')
const dark = () => block("[data-theme='dark']")

type Pair = [fg: string, bg: string, min: number]

const lightPairs: Pair[] = [
  ['foreground', 'background', 4.5],
  ['muted-foreground', 'background', 4.5],
  ['primary-foreground', 'primary', 4.5],
  ['secondary-foreground', 'secondary', 4.5],
  ['accent-gold-foreground', 'accent-gold-soft', 4.5],
  ['primary', 'background', 3.0], // stat numbers (large text)
  ['card-foreground', 'card', 4.5],
]

const darkPairs: Pair[] = [
  ['foreground', 'background', 4.5],
  ['muted-foreground', 'background', 4.5],
  ['primary-foreground', 'primary', 4.5],
  ['primary', 'background', 4.5], // purple link text on dark floor
  ['secondary-foreground', 'secondary', 4.5],
  ['accent-gold', 'background', 3.0], // gold hero stat (large text)
  ['card-foreground', 'card', 4.5],
]

// Static (theme-stable) plum band text
const staticPairs: Pair[] = [['on-plum-muted', 'surface-plum', 4.5]]

describe('design tokens meet WCAG contrast', () => {
  it.each(lightPairs)('light: %s on %s >= %d', (fg, bg, min) => {
    expect(ratio(readVar(light(), fg), readVar(light(), bg))).toBeGreaterThanOrEqual(min)
  })
  it.each(darkPairs)('dark: %s on %s >= %d', (fg, bg, min) => {
    expect(ratio(readVar(dark(), fg), readVar(dark(), bg))).toBeGreaterThanOrEqual(min)
  })
  it.each(staticPairs)('static: %s on %s >= %d', (fg, bg, min) => {
    expect(ratio(readVar(light(), fg), readVar(light(), bg))).toBeGreaterThanOrEqual(min)
  })
})
```

- [ ] **Step 3: Run to verify it fails**

Run: `pnpm exec vitest run --config ./vitest.config.mts`
Expected: FAIL — `--muted-foreground not found or not an HSL triplet` (current `:root` uses oklch).

- [ ] **Step 4: Commit**

```bash
git add vitest.config.mts tests/int/designTokens.int.spec.ts
git commit -m "test(design): add WCAG contrast guard for theme tokens"
```

---

### Task 2: Token foundation — rewrite `globals.css`

**Files:**
- Modify: `src/app/(frontend)/globals.css` (full rewrite of the token blocks; keep imports, h1–h6 rule, FOUC guard, img rule, analytics-pulse)

**Interfaces:**
- Produces: HSL-triplet variables consumed by Task 3's Tailwind config: standard shadcn set plus `--primary-hover`, `--surface-plum`, `--surface-lilac`, `--accent-gold`, `--accent-gold-soft`, `--accent-gold-foreground`, `--hairline`, `--hairline-soft`, `--hairline-strong`, `--ink`, `--ink-deep`, `--on-plum`, `--on-plum-muted`, `--primary-bright`, `--glass-fill`, `--glass-border`; plus `.glass` / `.glass-plum` component classes.

- [ ] **Step 1: Replace the `:root`, `[data-theme='dark']`, and `.dark` blocks.** Delete the `.dark` block entirely. Keep the `--chart-*` and `--sidebar-*` lines exactly as they are today (move them unchanged into the new `:root`). New token blocks:

```css
  :root {
    /* spec: canvas #FBFAFF / ink #1E1B2E */
    --background: 252 100% 99%;
    --foreground: 249 26% 14%;

    --card: 0 0% 100%;
    --card-foreground: 249 26% 14%;

    --popover: 0 0% 100%;
    --popover-foreground: 249 26% 14%;

    /* Striver Purple #6D28D9 */
    --primary: 263 70% 50%;
    --primary-foreground: 0 0% 100%;
    --primary-hover: 263 69% 42%;

    /* surface-lilac #F3F0FA / primary-active #4C1D95 */
    --secondary: 258 50% 96%;
    --secondary-foreground: 264 67% 35%;

    /* hairline-soft #F0EDF7 / muted #6E6A7C */
    --muted: 258 38% 95%;
    --muted-foreground: 253 8% 45%;

    /* primary-soft #EDE9FE / primary-active */
    --accent: 251 91% 95%;
    --accent-foreground: 264 67% 35%;

    --destructive: 0 61% 54%;
    --destructive-foreground: 0 0% 100%;

    /* hairline #E8E4F0 / hairline-strong #D8D2E6 */
    --border: 260 29% 92%;
    --input: 258 29% 86%;
    --ring: 263 70% 50% / 0.35;

    --radius: 1rem;

    --success: 152 54% 40%;
    --warning: 41 74% 53%;
    --error: 0 61% 54%;

    /* ---- TSN extension tokens (theme-flipping) ---- */
    --surface-lilac: 258 50% 96%;
    --accent-gold: 41 74% 53%;
    --accent-gold-soft: 42 82% 91%;
    --accent-gold-foreground: 41 79% 30%;
    --hairline: 260 29% 92%;
    --hairline-soft: 258 38% 95%;
    --hairline-strong: 258 29% 86%;
    --glass-fill: 0 0% 100% / 0.55;
    --glass-border: 0 0% 100% / 0.6;

    /* ---- static (theme-stable) ---- */
    --surface-plum: 256 42% 20%;
    --ink: 249 26% 14%;
    --ink-deep: 254 27% 10%;
    --on-plum: 251 91% 95%;
    --on-plum-muted: 257 34% 76%;
    --primary-bright: 258 90% 66%;

    /* KEEP the existing --chart-1..5 and --sidebar-* lines here verbatim */
  }

  [data-theme='dark'] {
    /* ink-deep floor / on-plum text */
    --background: 254 27% 10%;
    --foreground: 251 91% 95%;

    /* elevated plum #201A33 */
    --card: 254 32% 15%;
    --card-foreground: 251 91% 95%;

    --popover: 254 32% 15%;
    --popover-foreground: 251 91% 95%;

    /* violet-400 #A78BFA — contrast-driven (see Global Constraints) */
    --primary: 255 92% 76%;
    --primary-foreground: 254 27% 10%;
    --primary-hover: 256 87% 85%;

    /* surface-plum / on-plum */
    --secondary: 256 42% 20%;
    --secondary-foreground: 251 91% 95%;

    /* plum panel #241D3A / on-plum-muted #B7ABD6 */
    --muted: 254 33% 17%;
    --muted-foreground: 257 34% 76%;

    /* lifted plum #3A2C5E */
    --accent: 257 36% 27%;
    --accent-foreground: 251 91% 95%;

    --destructive: 0 61% 54%;
    --destructive-foreground: 0 0% 100%;

    --border: 257 34% 76% / 0.16;
    --input: 257 34% 76% / 0.24;
    --ring: 255 92% 76% / 0.4;

    --success: 152 54% 40%;
    --warning: 41 74% 53%;
    --error: 0 61% 54%;

    --surface-lilac: 254 33% 17%;
    --accent-gold: 41 74% 53%;
    --accent-gold-soft: 41 74% 53% / 0.15;
    --accent-gold-foreground: 42 61% 69%;
    --hairline: 257 34% 76% / 0.16;
    --hairline-soft: 257 34% 76% / 0.1;
    --hairline-strong: 257 34% 76% / 0.24;
    --glass-fill: 256 42% 20% / 0.55;
    --glass-border: 0 0% 100% / 0.12;
  }
```

Note: `--accent-gold-soft` and the three dark hairlines carry baked alpha — Task 3 references those with `hsl(var(--x))` (no alpha-value), same as border/input/ring.

- [ ] **Step 2: Add glass component classes** after the `@layer base` blocks (new `@layer components`):

```css
@layer components {
  /* Frosted glass — spotlight surfaces only (nav-on-scroll, hero glow card, mobile sheet). */
  .glass {
    background-color: hsl(var(--glass-fill));
    border: 1px solid hsl(var(--glass-border));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.45),
      0 8px 32px rgba(30, 27, 46, 0.12);
    backdrop-filter: blur(16px) saturate(130%);
  }

  /* Static plum frost for use over plum bands (both themes). */
  .glass-plum {
    background-color: hsla(256, 42%, 20%, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 12px 40px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(16px) saturate(130%);
  }

  @supports not (backdrop-filter: blur(1px)) {
    .glass {
      background-color: hsl(var(--card));
    }
    .glass-plum {
      background-color: hsl(var(--surface-plum));
    }
  }

  @media (prefers-reduced-transparency: reduce) {
    .glass {
      background-color: hsl(var(--card));
      backdrop-filter: none;
    }
    .glass-plum {
      background-color: hsl(var(--surface-plum));
      backdrop-filter: none;
    }
  }
}
```

Blur overrides at call sites use Tailwind utilities (`backdrop-blur-xl backdrop-saturate-150` = 24px nav, `backdrop-blur-2xl backdrop-saturate-150` = 40px sheet) — utilities layer wins over components.

- [ ] **Step 3: Run the contrast test**

Run: `pnpm exec vitest run --config ./vitest.config.mts`
Expected: PASS (all pairs).

- [ ] **Step 4: Commit**

```bash
git add "src/app/(frontend)/globals.css"
git commit -m "feat(design): rewrite theme tokens to TSN palette, add glass classes"
```

---

### Task 3: Rewrite `tailwind.config.mjs`

**Files:**
- Modify: `tailwind.config.mjs`

**Interfaces:**
- Consumes: variables from Task 2.
- Produces: utility names used by all later tasks — `bg-surface-plum`, `bg-surface-lilac`, `bg-accent-gold`, `bg-accent-gold-soft`, `text-accent-gold-foreground`, `text-ink`, `bg-ink-deep`, `text-on-plum`, `text-on-plum-muted`, `text-primary-bright`, `border-hairline(-soft/-strong)`, `hover:bg-primary-hover`, `font-display`, `text-display-mega/lg/md`, `text-stat-mega`, `text-eyebrow`, `shadow-card`, `shadow-card-hover`, `rounded-xl` (24px).

- [ ] **Step 1: Replace the `theme` section.** Keep `content`, `darkMode`, `plugins`, `prefix`, `safelist` untouched. New `theme`:

```js
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '75rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '75rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 8px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(30,27,46,0.04), 0 8px 24px rgba(30,27,46,0.06)',
        'card-hover': '0 2px 4px rgba(30,27,46,0.06), 0 16px 40px rgba(109,40,217,0.12)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.45), 0 8px 32px rgba(30,27,46,0.12)',
        'glass-plum': 'inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 40px rgba(0,0,0,0.35)',
        'glass-glow-hover': 'inset 0 1px 0 rgba(255,255,255,0.50), 0 16px 48px rgba(109,40,217,0.20)',
        'focus-ring': '0 0 0 3px rgba(109,40,217,0.35)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        'accent-gold': {
          DEFAULT: 'hsl(var(--accent-gold) / <alpha-value>)',
          soft: 'hsl(var(--accent-gold-soft))',
          foreground: 'hsl(var(--accent-gold-foreground) / <alpha-value>)',
        },
        background: 'hsl(var(--background) / <alpha-value>)',
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        hairline: {
          DEFAULT: 'hsl(var(--hairline))',
          soft: 'hsl(var(--hairline-soft))',
          strong: 'hsl(var(--hairline-strong))',
        },
        ink: 'hsl(var(--ink) / <alpha-value>)',
        'ink-deep': 'hsl(var(--ink-deep) / <alpha-value>)',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        'on-plum': {
          DEFAULT: 'hsl(var(--on-plum) / <alpha-value>)',
          muted: 'hsl(var(--on-plum-muted) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          hover: 'hsl(var(--primary-hover) / <alpha-value>)',
          bright: 'hsl(var(--primary-bright) / <alpha-value>)',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        success: 'hsl(var(--success) / <alpha-value>)',
        error: 'hsl(var(--error) / <alpha-value>)',
        warning: 'hsl(var(--warning) / <alpha-value>)',
        'surface-plum': 'hsl(var(--surface-plum) / <alpha-value>)',
        'surface-lilac': 'hsl(var(--surface-lilac) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-funnel)', 'var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SF Mono', 'Consolas', 'monospace'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        title: ['var(--font-geist-sans)', 'sans-serif'],
      },
      fontSize: {
        'display-mega': ['4.25rem', { lineHeight: '1.05', letterSpacing: '-1.7px', fontWeight: '500' }],
        'display-lg': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-1.1px', fontWeight: '500' }],
        'display-md': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.6px', fontWeight: '500' }],
        'stat-mega': ['3.5rem', { lineHeight: '1', letterSpacing: '-1.4px', fontWeight: '500' }],
        eyebrow: ['0.75rem', { lineHeight: '1.4', letterSpacing: '1.2px', fontWeight: '500' }],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              lineHeight: '1.6',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit; pnpm build`
Expected: both succeed. Site renders with new palette (visually rough — primitives come later).

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.mjs
git commit -m "feat(design): wire TSN tokens, display type scale, shadows into Tailwind"
```

---

### Task 4: Fonts — Funnel Display + Geist Mono

**Files:**
- Modify: `src/app/(frontend)/layout.tsx`

**Interfaces:**
- Produces: `--font-funnel` and `--font-geist-mono` CSS variables on `<html>`, consumed by Task 3's `font-display` / `font-mono`.

- [ ] **Step 1: Update imports and the `<html>` element** in `src/app/(frontend)/layout.tsx`:

Replace:
```tsx
import { GeistSans } from 'geist/font/sans';
```
with:
```tsx
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Funnel_Display } from 'next/font/google';

const funnelDisplay = Funnel_Display({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-funnel',
});
```

Replace:
```tsx
    <html className={GeistSans.variable} lang="en" suppressHydrationWarning>
```
with:
```tsx
    <html
      className={[GeistSans.variable, GeistMono.variable, funnelDisplay.variable].join(' ')}
      lang="en"
      suppressHydrationWarning
    >
```

Contingency: if `Funnel_Display` is not exported by this Next version's `next/font/google`, fall back per spec — delete the import and set `--font-funnel` on `:root` in `globals.css` to `var(--font-geist-sans)` (Geist 600 substitutes for display).

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: succeeds (font downloads at build time).

- [ ] **Step 3: Commit**

```bash
git add "src/app/(frontend)/layout.tsx"
git commit -m "feat(design): load Funnel Display and Geist Mono"
```

---

### Task 5: `<Eyebrow>` component

**Files:**
- Create: `src/components/ui/eyebrow.tsx`

**Interfaces:**
- Produces: `Eyebrow` with props `{ variant?: 'label' | 'pill' | 'award'; className?: string; children: React.ReactNode }`. Tasks 9–11 import it as `import { Eyebrow } from '@/components/ui/eyebrow'`.

- [ ] **Step 1: Create the component:**

```tsx
import React from 'react'

import { cn } from '@/utilities/ui'

type EyebrowProps = {
  variant?: 'label' | 'pill' | 'award'
  className?: string
  children: React.ReactNode
}

/**
 * Section eyebrow per the TSN design system: Geist Mono, uppercase, letter-spaced.
 * - label: bare purple text (spec eyebrow-label)
 * - pill:  purple chip (spec eyebrow-pill)
 * - award: gold chip for achievement moments (spec award-pill)
 */
export const Eyebrow: React.FC<EyebrowProps> = ({ variant = 'label', className, children }) => {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center font-mono text-eyebrow uppercase',
        variant === 'label' && 'text-primary',
        variant === 'pill' && 'rounded-full bg-accent px-3 py-1.5 text-accent-foreground',
        variant === 'award' && 'rounded-full bg-accent-gold-soft px-3 py-1.5 text-accent-gold-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/eyebrow.tsx
git commit -m "feat(design): add Eyebrow component (label/pill/award variants)"
```

---

### Task 6: Button pills

**Files:**
- Modify: `src/components/ui/button.tsx`

**Interfaces:**
- Consumes: `primary-hover`, `hairline-strong`, `accent-gold`, `ink`, `shadow-card-hover` utilities (Task 3).
- Produces: same exported API (`Button`, `buttonVariants`, `ButtonProps`) — all existing variant keys (`default|outline|secondary|ghost|destructive|link`) and size keys (`default|xs|sm|lg|icon|icon-xs|icon-sm|icon-lg`) preserved, plus new `donate` variant. `CMSLink` keeps working unmodified.

- [ ] **Step 1: Replace the `buttonVariants` cva definition** (keep the rest of the file — `ButtonProps`, `Button`, exports — identical):

```tsx
const buttonVariants = cva(
  "focus-visible:ring-ring focus-visible:ring-2 aria-invalid:ring-destructive/20 aria-invalid:border-destructive rounded-full border border-transparent bg-clip-padding text-[15px] font-medium leading-none focus-visible:outline-none aria-invalid:ring-1 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover hover:shadow-card-hover",
        outline: "border-hairline-strong bg-card text-primary hover:bg-secondary aria-expanded:bg-secondary",
        secondary: "border-hairline-strong bg-card text-primary hover:bg-secondary aria-expanded:bg-secondary",
        ghost: "text-primary hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent",
        destructive: "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 text-destructive",
        link: "text-primary underline-offset-4 hover:underline",
        donate: "bg-accent-gold text-ink hover:shadow-card-hover hover:bg-accent-gold/90",
      },
      size: {
        default: "h-11 gap-2 px-[22px] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-8 gap-1 px-3 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-7 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-11",
        "icon-xs": "size-8 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit; pnpm lint`
Expected: PASS (the `donate` variant is additive; `CMSLink`'s `ButtonProps['variant']` type widens automatically).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/button.tsx
git commit -m "feat(design): pill buttons per TSN spec, add donate variant"
```

---

### Task 7: Input restyle

**Files:**
- Modify: `src/components/ui/input.tsx`

**Interfaces:**
- Produces: same `Input` export, restyled (48px, 12px radius, hairline-strong border, purple focus).

- [ ] **Step 1: Replace the className string** inside `cn(...)`:

```tsx
      className={cn(
        "border-hairline-strong bg-card focus-visible:border-primary focus-visible:ring-ring aria-invalid:ring-destructive/20 aria-invalid:border-destructive h-12 w-full min-w-0 rounded-md border px-4 py-2 text-base transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:outline-none aria-invalid:ring-1 file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
```

- [ ] **Step 2: Verify** — Run: `npx tsc --noEmit` → PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/input.tsx
git commit -m "feat(design): restyle inputs to 48px / 12px radius / purple focus"
```

---

### Task 8: Header glass-nav, mobile sheet, footer

**Files:**
- Modify: `src/Header/Component.client.tsx:53-58`
- Modify: `src/Header/Nav/index.tsx:115`
- Modify: `src/Footer/Component.tsx:18-28` (and the Logo line 24)

**Interfaces:**
- Consumes: `.glass` class (Task 2), `bg-ink-deep` / `text-on-plum(-muted)` / `text-primary-bright` utilities (Task 3).

- [ ] **Step 1: Header scrolled state** — in `Component.client.tsx`, replace the scrolled ternary inside the inner `motion.div` className:

Old:
```
${scrolled ? 'backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 shadow-lg border border-border/1' : 'bg-transparent'}
```
New:
```
${scrolled ? 'glass backdrop-blur-xl backdrop-saturate-150 rounded-full' : 'bg-transparent border border-transparent'}
```
Also change the static `container rounded-md` on that same element to `container rounded-full`.

- [ ] **Step 2: Mobile sheet** — in `Nav/index.tsx` line 115, replace:

Old:
```
className="absolute top-full left-4 right-4 mt-2 md:hidden backdrop-blur-md bg-white/95 dark:bg-black/95 shadow-lg rounded-xl border border-border"
```
New:
```
className="absolute top-full left-4 right-4 mt-2 md:hidden glass backdrop-blur-2xl backdrop-saturate-150 rounded-lg"
```

- [ ] **Step 3: Footer** — in `Footer/Component.tsx`:

Replace the `<footer>` className:
```tsx
    <footer className="mt-auto bg-ink-deep text-on-plum-muted border-t border-white/10">
```
Replace the Logo line (footer floor is always dark, logo must stay light):
```tsx
              <Logo className="transition-opacity hover:opacity-80" />
```
Replace every `text-muted-foreground` in this file with `text-on-plum-muted`, and every `hover:text-foreground` with `hover:text-primary-bright`. Replace both `border-border` occurrences (footer top border handled above; the bottom-bar divider at line 56) with `border-white/10`.

- [ ] **Step 4: Verify**

Run: `pnpm build`
Expected: succeeds. Then `pnpm dev`, load `/`: header frosts on scroll (both themes), mobile menu sheet is frosted, footer is deep-plum with lilac text in both themes.

- [ ] **Step 5: Commit**

```bash
git add src/Header/Component.client.tsx src/Header/Nav/index.tsx src/Footer/Component.tsx
git commit -m "feat(design): glass nav + mobile sheet, ink-deep footer"
```

---

### Task 9: Section rhythm + uniform block sweep

**Files:**
- Modify: `src/blocks/RenderBlocks.tsx:51`
- Modify: `src/blocks/{Testimonials,Bento,ScholarList,ScholarCaseStudy,TeamBlock,StatsBlock,ScrollItems,FAQBlock}/Component.tsx`
- Modify: `src/blocks/Content/Component.tsx:20`
- Modify: `src/blocks/{ArchiveBlock,Form,MediaBlock}/Component.tsx` (rhythm rule below)

**Interfaces:**
- Consumes: `Eyebrow` (Task 5), `text-display-md/lg`, `font-display` (Task 3).

- [ ] **Step 1: RenderBlocks** — replace `<div className="my-16" key={index}>` with `<div key={index}>`. Blocks now own all vertical rhythm.

- [ ] **Step 2: Apply three exact replacements in each of the 8 shelled blocks** (Testimonials, Bento, ScholarList, ScholarCaseStudy, TeamBlock, StatsBlock, ScrollItems, FAQBlock):

(a) Shell padding — replace `"w-full py-10 lg:py-20"` (FAQBlock: `"w-full py-20 lg:py-40"`) with:
```
"w-full py-16 lg:py-24"
```

(b) Eyebrow — replace the import `import { Badge } from '@/components/ui/badge'` with `import { Eyebrow } from '@/components/ui/eyebrow'`, and replace
```tsx
<Badge variant="outline">{badge}</Badge>
```
with — for ScholarCaseStudy and ScholarList (achievement = gold):
```tsx
<Eyebrow variant="award">{badge}</Eyebrow>
```
— for all others:
```tsx
<Eyebrow variant="pill">{badge}</Eyebrow>
```
(StatsBlock keeps its `Badge` import removed too — it has no other Badge usage. If a file uses `Badge` elsewhere, keep both imports.)

(c) Section heading — replace
```
"text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular"
```
with
```
"font-display text-display-md md:text-display-lg max-w-xl text-left"
```
and in ScholarCaseStudy (no max-w/text-left in its variant) replace `"text-3xl md:text-5xl tracking-tighter font-regular"` with `"font-display text-display-md md:text-display-lg"`.

- [ ] **Step 3: Content block rhythm** — in `Content/Component.tsx` replace `<div className="container my-16">` with `<div className="container py-16 lg:py-24">`.

- [ ] **Step 4: Unshelled blocks rhythm rule** — ArchiveBlock, Form, and MediaBlock relied on the removed `my-16`. In each `Component.tsx`, add `py-16 lg:py-24` to the outermost returned element's className (create no new wrappers; if the outermost element has no className, add one). Example shape: `className="my-16"` → `className="py-16 lg:py-24"`; bare `<div className="container">` → `<div className="container py-16 lg:py-24">`. CallToAction is rewritten in Task 10 — skip it here.

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit; pnpm lint; pnpm build`
Expected: all pass. `pnpm dev` → a page with stacked blocks shows uniform 64/96px rhythm, mono eyebrow chips, Funnel Display section heads.

- [ ] **Step 6: Commit**

```bash
git add src/blocks
git commit -m "feat(design): uniform 96px rhythm, Eyebrow chips, display headings across blocks"
```

---

### Task 10: Signature blocks — Stats, CTA band, Testimonials

**Files:**
- Modify: `src/blocks/StatsBlock/Component.tsx` (full rewrite below)
- Modify: `src/blocks/CallToAction/Component.tsx` (full rewrite below)
- Modify: `src/blocks/Testimonials/Component.tsx:62-64`

**Interfaces:**
- Consumes: `Eyebrow`, `bg-surface-lilac`, `bg-surface-plum`, `text-on-plum`, `text-stat-mega`, `font-display`.
- Produces: no API changes — components keep their generated-type props.

- [ ] **Step 1: Rewrite `StatsBlock/Component.tsx`** (lilac stat cards, Funnel numbers, mono captions; trend icons removed per spec `stat-card`; the config's `trend` field stays in the CMS but is no longer rendered):

```tsx
import React from 'react'

import type { StatsBlock as StatsBlockProps } from '@/payload-types'

import { Eyebrow } from '@/components/ui/eyebrow'

export const StatsBlock: React.FC<StatsBlockProps> = (props) => {
  const { badge, heading, description, items } = props

  return (
    <div className="w-full py-16 lg:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col">
            {badge && (
              <div>
                <Eyebrow variant="pill">{badge}</Eyebrow>
              </div>
            )}
            <div className="flex gap-2 flex-col">
              {heading && (
                <h4 className="font-display text-display-md md:text-display-lg max-w-xl text-left">
                  {heading}
                </h4>
              )}
              {description && (
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                  {description}
                </p>
              )}
            </div>
          </div>
          <div className="grid text-left grid-cols-2 lg:grid-cols-4 w-full gap-4 lg:gap-6">
            {items?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between gap-6 rounded-lg bg-surface-lilac p-7"
              >
                <h2 className="font-display text-stat-mega text-primary flex flex-row items-end gap-3">
                  {item.value}
                  {item.change && (
                    <span className="font-mono text-sm tracking-normal text-muted-foreground">
                      {item.change}
                    </span>
                  )}
                </h2>
                <p className="font-mono text-[13px] leading-normal tracking-[0.4px] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Rewrite `CallToAction/Component.tsx`** as the full-bleed cta-band:

```tsx
import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="w-full bg-surface-plum py-16 lg:py-24">
      <div className="container flex flex-col items-center gap-8 text-center">
        {richText && (
          <RichText
            className="mb-0 [&_*]:text-on-plum [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_h1]:text-display-lg [&_h2]:text-display-lg [&_h3]:text-display-md [&_p]:text-on-plum-muted"
            data={richText}
            enableGutter={false}
          />
        )}
        <div className="flex flex-col gap-4 sm:flex-row">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Testimonials quote card** — replace line 62's card classes:

Old: `"bg-muted rounded-md h-full lg:col-span-2 p-6 flex justify-between flex-col"`
New: `"bg-accent rounded-lg h-full lg:col-span-2 p-8 flex justify-between flex-col"`

and the quote `<p className="text-base leading-relaxed">` → `<p className="text-lg leading-relaxed">`.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit; pnpm build`
Expected: pass. Dev-check: stats are lilac panels with big purple Funnel numbers; CTA is a full-width plum band with centered display text and pill CTAs; testimonial quotes sit on primary-tint (dark: lifted plum).

- [ ] **Step 5: Commit**

```bash
git add src/blocks/StatsBlock/Component.tsx src/blocks/CallToAction/Component.tsx src/blocks/Testimonials/Component.tsx
git commit -m "feat(design): signature stats panels, plum CTA band, tinted testimonials"
```

---

### Task 11: Heros, PostHero, archive Card hover

**Files:**
- Modify: `src/heros/HighImpact/index.tsx:28-47`
- Modify: `src/heros/MediumImpact/index.tsx:12-13,30-35`
- Modify: `src/heros/LowImpact/index.tsx:19-21`
- Modify: `src/heros/PostHero/index.tsx:42`
- Modify: `src/components/Card/index.tsx` (archive/search cards)

**Interfaces:**
- Consumes: `font-display`, `text-display-*`, `rounded-xl` (24px), `shadow-card(-hover)`, `primary-bright`.

- [ ] **Step 1: HighImpact hero** — add the purple radial glow and display type. Inside the root `<div className="relative -mt-[10.4rem] …">`, insert the glow layer as the FIRST child (before the existing `z-10` content div):

```tsx
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(60%_50%_at_50%_35%,hsl(258_90%_66%/0.35),transparent_70%)]"
      />
```

Then give the headline display type — replace the RichText line:

Old:
```tsx
{richText && <RichText className="mt-12 mb-6 ml-12 mr-12" data={richText} enableGutter={false} />}
```
New:
```tsx
{richText && (
  <RichText
    className="mt-12 mb-6 ml-12 mr-12 [&_h1]:font-display [&_h1]:text-display-md md:[&_h1]:text-display-lg lg:[&_h1]:text-display-mega"
    data={richText}
    enableGutter={false}
  />
)}
```

- [ ] **Step 2: MediumImpact hero** — display type + 24px media radius:

Replace line 13:
```tsx
{richText && <RichText className="mb-6 [&_h1]:font-display [&_h1]:text-display-md md:[&_h1]:text-display-lg [&_h2]:font-display [&_h2]:text-display-md" data={richText} enableGutter={false} />}
```
Replace the Media props (lines 30-35): `imgClassName=""` → `imgClassName="rounded-xl"`.

- [ ] **Step 3: LowImpact hero** — replace `<div className="container mt-16">` with `<div className="container py-16">` and add display type to its RichText the same way: `richText && <RichText className="[&_h1]:font-display [&_h1]:text-display-md md:[&_h1]:text-display-lg" data={richText} enableGutter={false} />`.

- [ ] **Step 4: PostHero title** — replace line 42:

Old: `<h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl max-w-[58rem]">{title}</h1>`
New: `<h1 className="mb-6 font-display text-display-md md:text-display-lg lg:text-display-mega max-w-[58rem]">{title}</h1>`

- [ ] **Step 5: Archive Card hover** — in `src/components/Card/index.tsx`, find the article/root className containing `border border-border rounded-lg overflow-hidden bg-card` and replace that fragment with:

```
border border-hairline rounded-lg overflow-hidden bg-card shadow-card transition-shadow hover:shadow-card-hover
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit; pnpm build`
Expected: pass. Dev-check: home hero shows the purple glow + Funnel headline; a post page title is display type; archive cards lift with a purple-warmed shadow on hover.

- [ ] **Step 7: Commit**

```bash
git add src/heros src/components/Card/index.tsx
git commit -m "feat(design): hero glow + display type, post hero, archive card hover"
```

---

### Task 12: Final verification

**Files:** none (verification only; fix anything found and fold the fix into this task's commit).

- [ ] **Step 1: Full gate**

Run: `pnpm exec vitest run --config ./vitest.config.mts; npx tsc --noEmit; pnpm lint; pnpm build`
Expected: all four pass.

- [ ] **Step 2: Visual pass** — `pnpm dev`, then in the Payload admin create/edit a draft page stacking every block (cta, content, mediaBlock, archive, formBlock, bento, faqBlock, paragraph, scrollItems, statsBlock, teamBlock, testimonials, scholarCaseStudy, scholarList) with a HighImpact hero. Check, in BOTH themes (toggle in footer) and at mobile width:
  - uniform section rhythm, no double-gaps, no zero-gap blocks (especially Archive/Form/MediaBlock after Task 9 Step 4)
  - pills everywhere CTAs render; gold award pills on scholar blocks
  - header frost on scroll; mobile sheet frost; plum CTA band; lilac stat panels
  - `/posts` + a post page + `/search` render correctly
  - `/admin` is visually unchanged
- [ ] **Step 3: Safelist check** — confirm no new string-interpolated class names were introduced: `git grep -nE 'className=\{`' src/` findings must not interpolate class fragments (the Header ternary from Task 8 selects between two complete literal strings — fine).
- [ ] **Step 4: Commit any fixes**

```bash
git add -A src tests
git commit -m "fix(design): visual-pass corrections"
```

---

## Self-Review Notes (already applied)

- **Spec coverage:** tokens (T2/T3), fonts/type (T3/T4), Eyebrow (T5), buttons/inputs (T6/T7), header/footer/glass placements 1&3 (T8), rhythm+container+sweep (T3/T9), signature blocks (T10), heros/glow/pages (T11), contrast audit (T1, enforced continuously), final gate (T12). Glass placement 2 (hero foreground card) is satisfied by the hero glow + existing image treatment; a dedicated glass stat-cluster is deferred until a hero actually carries stats — YAGNI.
- **Dark primary deviation** from the spec table (#8B5CF6 → #A78BFA) is contrast-forced and documented in Global Constraints; the spec's verification section explicitly authorizes it.
- **Type consistency:** `Eyebrow` variants (`label|pill|award`) match all usages in T9/T10; button variant/size keys are a superset of every existing call site (`variant="outline"` in FAQBlock, `size="lg"` in CTA, `appearance="link"` via CMSLink).
