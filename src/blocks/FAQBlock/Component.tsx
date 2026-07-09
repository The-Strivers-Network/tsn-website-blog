import React from 'react'
import { PhoneCall } from 'lucide-react'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const FAQBlock: React.FC<FAQBlockProps> = (props) => {
  const { badge, heading, description, ctaLabel, items } = props

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              {badge && (
                <div>
                  <Badge variant="outline">{badge}</Badge>
                </div>
              )}
              <div className="flex gap-2 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  {heading}
                </h4>
                {description && (
                  <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                    {description}
                  </p>
                )}
              </div>
              {ctaLabel && (
                <div>
                  <Button className="gap-4" variant="outline">
                    {ctaLabel} <PhoneCall className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {items && items.length > 0 && (
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  )
}
