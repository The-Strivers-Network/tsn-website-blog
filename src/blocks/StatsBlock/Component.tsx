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
