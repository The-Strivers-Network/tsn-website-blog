import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
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
        /* spec caps every radius at 8px (--radius: 0.5rem); xl/lg/md all resolve to the ceiling */
        xl: 'var(--radius)',
        lg: 'var(--radius)',
        md: 'var(--radius)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(24,24,27,0.04), 0 8px 24px rgba(24,24,27,0.06)',
        'card-hover': '0 2px 4px rgba(24,24,27,0.08), 0 16px 40px rgba(24,24,27,0.14)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.45), 0 8px 32px rgba(24,24,27,0.12)',
        'glass-inverted': 'inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 40px rgba(0,0,0,0.35)',
        'glass-hover': 'inset 0 1px 0 rgba(255,255,255,0.50), 0 16px 48px rgba(24,24,27,0.16)',
        'focus-ring': '0 0 0 3px rgba(109,40,217,0.35)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
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
        'on-inverted': {
          DEFAULT: 'hsl(var(--on-inverted) / <alpha-value>)',
          muted: 'hsl(var(--on-inverted-muted) / <alpha-value>)',
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
        'surface-inverted': 'hsl(var(--surface-inverted) / <alpha-value>)',
        'surface-muted': 'hsl(var(--surface-muted) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SF Mono', 'Consolas', 'monospace'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        title: ['var(--font-geist-sans)', 'sans-serif'],
      },
      fontSize: {
        'display-mega': ['4.25rem', { lineHeight: '1.05', letterSpacing: '-1.5px', fontWeight: '600' }],
        'display-lg': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-1px', fontWeight: '600' }],
        'display-md': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.5px', fontWeight: '600' }],
        'stat-mega': ['3.5rem', { lineHeight: '1', letterSpacing: '-1.2px', fontWeight: '600' }],
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
}

export default config
