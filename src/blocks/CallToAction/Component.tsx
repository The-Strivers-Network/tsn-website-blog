import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="w-full bg-surface-inverted py-16 lg:py-24" data-theme="dark">
      <div className="container flex flex-col items-center gap-8 text-center">
        {richText && (
          <RichText
            className="mb-0 [&_*]:text-on-inverted [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_h1]:text-display-lg [&_h2]:text-display-lg [&_h3]:text-display-md [&_p]:text-on-inverted-muted"
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
