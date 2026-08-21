import React from "react";

import type { BentoBlock as BentoBlockProps } from "@/payload-types";

import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export const BentoBlock: React.FC<BentoBlockProps> = (props) => {
  const { badge, heading, description, items } = props;

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
            <h4 className="text-4xl md:text-6xl font-normal tracking-[-0.03em] leading-[1.05] text-balance max-w-3xl">
              {heading}
            </h4>
            {description && (
              <p className="text-[15px] leading-relaxed text-muted-foreground max-w-[68ch] text-pretty">
                {description}
              </p>
            )}
          </Reveal>

          {items && items.length > 0 && (
            <RevealGroup className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {items.map((item, index) => {
                const isWide = index % 4 === 0 || index % 4 === 3;
                return (
                  <RevealItem
                    key={index}
                    className={
                      isWide
                        ? "rounded-2xl border border-hairline bg-card p-6 lg:p-8 surface-highlight transition-[border-color,transform] duration-150 ease-graphite hover:border-hairline-strong hover:-translate-y-0.5 flex flex-col justify-between lg:col-span-2 lg:min-h-[17rem]"
                        : "rounded-2xl border border-hairline bg-card p-6 lg:p-8 surface-highlight transition-[border-color,transform] duration-150 ease-graphite hover:border-hairline-strong hover:-translate-y-0.5 flex flex-col justify-between lg:min-h-[17rem]"
                    }
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-medium tracking-[-0.01em]">
                        {item.heading}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground max-w-[68ch] text-pretty">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          )}
        </div>
      </div>
    </div>
  );
};
