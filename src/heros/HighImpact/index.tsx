'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { PixelTrail } from '@/components/ui/pixel-trail'
import { GooeyFilter } from '@/components/ui/gooey-filter'
import { useScreenSize } from '@/hooks/use-screen-size'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  enablePixelTrail,
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  const screenSize = useScreenSize()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[38rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
        {enablePixelTrail && (
          <>
            <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />
            <div
              className="absolute inset-0 z-0"
              style={{ filter: 'url(#gooey-filter-pixel-trail)' }}
            >
              <PixelTrail
                pixelSize={screenSize.lessThan('md') ? 24 : 32}
                fadeDuration={0}
                delay={500}
                pixelClassName="bg-white"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
