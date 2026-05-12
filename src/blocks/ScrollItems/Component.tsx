'use client'

import React, { useEffect, useState } from 'react'

import type { ScrollItemsBlock as ScrollItemsBlockProps } from '@/payload-types'
import type { Media as MediaType } from '@/payload-types'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Media } from '@/components/Media'

export const ScrollItemsBlock: React.FC<ScrollItemsBlockProps> = (props) => {
  const { heading, items } = props

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0)
        api.scrollTo(0)
      } else {
        api.scrollNext()
        setCurrent(current + 1)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [api, current])

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          {heading && (
            <h2 className="text-xl md:text-3xl tracking-tighter lg:max-w-xl font-regular text-left">
              {heading}
            </h2>
          )}
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {items?.map((item, index) => (
                <CarouselItem className="basis-1/4 lg:basis-1/6" key={index}>
                  <div className="flex rounded-md aspect-square bg-muted items-center justify-center p-6 overflow-hidden">
                    {item.image && typeof item.image === 'object' ? (
                      <Media
                        resource={item.image as MediaType}
                        imgClassName="object-contain w-full h-full"
                      />
                    ) : (
                      <span className="text-sm text-center">{item.label}</span>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}
