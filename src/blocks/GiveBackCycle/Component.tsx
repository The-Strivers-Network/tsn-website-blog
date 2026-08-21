import React from "react";
import { ArrowRight, RefreshCw } from "lucide-react";

import type { GiveBackCycleBlock as GiveBackCycleBlockProps } from "@/payload-types";

import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export const GiveBackCycleBlock: React.FC<GiveBackCycleBlockProps> = (
  props,
) => {
  const { badge, heading, description, stages } = props;

  const firstStageTitle = stages?.[0]?.title;

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

          <RevealGroup className="grid gap-4 lg:grid-cols-4">
            {stages?.map((stage, index) => {
              const isLast = index === stages.length - 1;
              const endsRow = (index + 1) % 4 === 0;

              return (
                <RevealItem
                  key={index}
                  className="relative rounded-2xl border border-hairline bg-card p-6 lg:p-8 surface-highlight transition-[border-color,transform] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-hairline-strong hover:-translate-y-0.5"
                >
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-medium tracking-[-0.01em]">
                    {stage.title}
                  </h3>
                  {stage.description && (
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground max-w-[68ch]">
                      {stage.description}
                    </p>
                  )}
                  {!isLast && !endsRow && (
                    <ArrowRight
                      aria-hidden
                      className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                    />
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>

          {firstStageTitle && stages && stages.length > 1 && (
            <div
              aria-hidden
              className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground"
            >
              <RefreshCw className="size-3.5 shrink-0" />
              <span>{firstStageTitle}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
