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
