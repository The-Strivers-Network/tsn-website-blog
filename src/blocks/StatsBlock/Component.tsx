import React from "react";
import { MoveDownLeft, MoveUpRight } from "lucide-react";

import type { StatsBlock as StatsBlockProps } from "@/payload-types";

import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export const StatsBlock: React.FC<StatsBlockProps> = (props) => {
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

          <RevealGroup className="grid w-full grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
            {items?.map((item, index) => (
              <RevealItem
                key={index}
                className="flex flex-col gap-3 border-t border-hairline pt-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-normal tracking-[-0.02em] tabular-nums">
                    {item.value}
                  </span>
                  {item.change && (
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {item.change}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {item.trend === "up" ? (
                    <MoveUpRight className="size-3.5 shrink-0 text-primary" />
                  ) : (
                    <MoveDownLeft className="size-3.5 shrink-0 text-destructive" />
                  )}
                  <p className="text-sm text-muted-foreground text-pretty">
                    {item.label}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </div>
  );
};
