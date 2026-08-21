import React from "react";
import { PhoneCall } from "lucide-react";

import type { FAQBlock as FAQBlockProps } from "@/payload-types";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";

export const FAQBlock: React.FC<FAQBlockProps> = (props) => {
  const { badge, heading, description, ctaLabel, items } = props;

  return (
    <div className="w-full py-20 lg:py-28">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <Reveal className="flex flex-col gap-5">
            {badge && (
              <span className="font-mono text-[11px] font-medium text-muted-foreground">
                {badge}
              </span>
            )}
            <h4 className="text-4xl md:text-6xl font-normal tracking-[-0.03em] leading-[1.05] text-balance max-w-3xl">
              {heading}
            </h4>
            {description && (
              <p className="text-[15px] leading-relaxed text-muted-foreground max-w-[68ch] text-pretty">
                {description}
              </p>
            )}
            {ctaLabel && (
              <div className="mt-2">
                <Button className="gap-4" variant="outline">
                  {ctaLabel} <PhoneCall className="w-4 h-4" />
                </Button>
              </div>
            )}
          </Reveal>

          {items && items.length > 0 && (
            <Reveal delay={0.08}>
              <Accordion type="single" collapsible className="w-full">
                {items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-hairline"
                  >
                    <AccordionTrigger className="py-5 text-[15px] font-medium no-underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-[15px] leading-relaxed text-muted-foreground max-w-[68ch]">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
};
