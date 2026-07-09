import React from 'react'

import type { BentoBlock as BentoBlockProps } from '@/payload-types'

import { Eyebrow } from '@/components/ui/eyebrow'

export const BentoBlock: React.FC<BentoBlockProps> = (props) => {
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
              <h4 className="font-display text-display-md md:text-display-lg max-w-xl text-left">
                {heading}
              </h4>
              {description && (
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                  {description}
                </p>
              )}
            </div>
          </div>

          {items && items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => {
                const isWide = index % 4 === 0 || index % 4 === 3
                return (
                  <div
                    key={index}
                    className={`bg-muted rounded-md p-6 aspect-square flex justify-between flex-col ${
                      isWide ? 'lg:col-span-2 lg:aspect-auto h-full' : ''
                    }`}
                  >
                    <div className="flex flex-col">
                      <h3 className="text-xl tracking-tight">{item.heading}</h3>
                      {item.description && (
                        <p className="text-muted-foreground max-w-xs text-base">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
