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
