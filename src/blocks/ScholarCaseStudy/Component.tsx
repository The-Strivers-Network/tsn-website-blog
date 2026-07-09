import React from 'react'

import type { ScholarCaseStudyBlock as ScholarCaseStudyBlockProps } from '@/payload-types'
import type { Media as MediaType } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { Badge } from '@/components/ui/badge'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const ScholarCaseStudyBlock: React.FC<ScholarCaseStudyBlockProps> = (props) => {
  const { badge, scholarName, school, image, body, imagePosition } = props

  const imageOnRight = imagePosition === 'right'

  return (
    <div className="w-full py-10 lg:py-20">
      <div className="container mx-auto">
        <div
          className={cn(
            'grid grid-cols-1 gap-6 lg:gap-8 items-start',
            imageOnRight ? 'lg:grid-cols-[5fr_3fr]' : 'lg:grid-cols-[3fr_5fr]',
          )}
        >
          {/* Portrait */}
          <div
            className={cn(
              'rounded-lg overflow-hidden border bg-muted',
              imageOnRight && 'lg:order-2',
            )}
          >
            {image && typeof image === 'object' ? (
              <Media
                resource={image as MediaType}
                imgClassName="aspect-square lg:aspect-[4/5] object-cover w-full"
              />
            ) : (
              <div className="aspect-square lg:aspect-[4/5] flex items-center justify-center text-6xl font-medium text-muted-foreground">
                {scholarName?.charAt(0)}
              </div>
            )}
          </div>

          {/* Details */}
          <div className={cn('flex flex-col gap-6', imageOnRight && 'lg:order-1')}>
            <div className="flex flex-col gap-2">
              {badge && (
                <div>
                  <Badge variant="outline">{badge}</Badge>
                </div>
              )}
              <h4 className="text-3xl md:text-5xl tracking-tighter font-regular">{scholarName}</h4>
              {school && (
                <p className="text-lg leading-relaxed tracking-tight text-muted-foreground">
                  {school}
                </p>
              )}
            </div>

            {body && <RichText data={body} enableGutter={false} className="mx-0 max-w-none" />}
          </div>
        </div>
      </div>
    </div>
  )
}
