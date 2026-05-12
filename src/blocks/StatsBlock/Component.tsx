import React from 'react'
import { MoveDownLeft, MoveUpRight } from 'lucide-react'

import type { StatsBlock as StatsBlockProps } from '@/payload-types'

export const StatsBlock: React.FC<StatsBlockProps> = (props) => {
  const { items } = props

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 lg:gap-8">
          {items?.map((item, index) => (
            <div key={index} className="flex gap-0 flex-col justify-between p-6 border rounded-md">
              {item.trend === 'up' ? (
                <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
              ) : (
                <MoveDownLeft className="w-4 h-4 mb-10 text-destructive" />
              )}
              <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                {item.value}
                {item.change && (
                  <span className="text-muted-foreground text-sm tracking-normal">
                    {item.change}
                  </span>
                )}
              </h2>
              <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
