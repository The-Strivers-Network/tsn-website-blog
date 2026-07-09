import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container py-16">
      <div className="max-w-[48rem]">
        {children ||
          (richText && (
            <RichText
              className="[&_h1]:font-display [&_h1]:text-display-md md:[&_h1]:text-display-lg"
              data={richText}
              enableGutter={false}
            />
          ))}
      </div>
    </div>
  )
}
