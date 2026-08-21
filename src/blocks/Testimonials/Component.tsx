"use client";

import React, { useEffect, useState } from "react";

import type { TestimonialsBlock as TestimonialsBlockProps } from "@/payload-types";
import type { Media as MediaType } from "@/payload-types";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Media } from "@/components/Media";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = (props) => {
  const { badge, heading, description, items } = props;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-28">
      <div className="container mx-auto">
        <div className="flex flex-col gap-16">
          <Reveal className="flex flex-col gap-5">
            {badge && (
              <span className="font-mono text-[11px] font-medium text-muted-foreground">
                {badge}
              </span>
            )}
            {heading && (
              <h4 className="text-4xl md:text-6xl font-normal tracking-[-0.03em] leading-[1.05] text-balance max-w-3xl">
                {heading}
              </h4>
            )}
            {description && (
              <p className="text-[15px] leading-relaxed text-muted-foreground max-w-[68ch] text-pretty">
                {description}
              </p>
            )}
          </Reveal>
          <RevealGroup className="w-full">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {items?.map((item, index) => (
                  <CarouselItem className="lg:basis-3/5" key={index}>
                    <RevealItem
                      as="figure"
                      className="flex h-full flex-col justify-between rounded-2xl border border-hairline bg-card p-6 lg:p-8 surface-highlight"
                    >
                      <blockquote className="text-[15px] leading-relaxed text-pretty">
                        {item.quote}
                      </blockquote>
                      <figcaption className="mt-8 flex items-center gap-3 border-t border-hairline pt-6">
                        <div className="size-10 shrink-0 overflow-hidden rounded-xl border border-hairline">
                          {item.authorAvatar &&
                          typeof item.authorAvatar === "object" ? (
                            <Media
                              resource={item.authorAvatar as MediaType}
                              imgClassName="aspect-square size-10 object-cover"
                            />
                          ) : (
                            <span className="flex size-full items-center justify-center bg-wash text-sm font-medium">
                              {item.authorName?.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          By
                        </span>
                        <span className="text-sm font-medium">
                          {item.authorName}
                        </span>
                      </figcaption>
                    </RevealItem>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </RevealGroup>
        </div>
      </div>
    </div>
  );
};
