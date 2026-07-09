'use client'

import React, { useEffect, useState } from 'react'

import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import type { Media as MediaType } from '@/payload-types'

import { Eyebrow } from '@/components/ui/eyebrow'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Media } from '@/components/Media'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = (props) => {
  const { badge, heading, description, items } = props

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
    }, 4000)

    return () => clearTimeout(timer)
  }, [api, current])

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
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {items?.map((item, index) => (
                <CarouselItem className="lg:basis-3/5" key={index}>
                  <div className="bg-accent rounded-lg h-full lg:col-span-2 p-8  flex justify-between flex-col">
                    <div className="flex flex-col gap-4">
                      <p className="text-lg leading-relaxed">{item.quote}</p>
                      <p className="flex flex-row gap-2 text-sm items-center">
                        <span className="text-muted-foreground">By</span>
                        <Avatar className="h-6 w-6">
                          {item.authorAvatar && typeof item.authorAvatar === 'object' ? (
                            <Media
                              resource={item.authorAvatar as MediaType}
                              imgClassName="aspect-square rounded-lg object-cover h-6 w-6"
                            />
                          ) : (
                            <AvatarFallback>
                              {item.authorName?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <span>{item.authorName}</span>
                      </p>
                    </div>
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
