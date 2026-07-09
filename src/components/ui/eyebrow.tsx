import React from 'react'

import { cn } from '@/utilities/ui'

type EyebrowProps = {
  variant?: 'label' | 'pill' | 'award'
  className?: string
  children: React.ReactNode
}

/**
 * Section eyebrow per the TSN design system: Geist Mono, uppercase, letter-spaced, neutral.
 * - label: bare muted text (spec eyebrow-label)
 * - pill:  neutral chip (spec eyebrow-pill)
 * - award: neutral bordered chip for recognition moments (spec recognition-pill)
 */
export const Eyebrow: React.FC<EyebrowProps> = ({ variant = 'label', className, children }) => {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center font-mono text-eyebrow uppercase',
        variant === 'label' && 'text-muted-foreground',
        variant === 'pill' && 'rounded-lg bg-accent px-3 py-1.5 text-accent-foreground',
        variant === 'award' &&
          'rounded-lg border border-hairline-strong bg-hairline-soft px-3 py-1.5 text-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}
