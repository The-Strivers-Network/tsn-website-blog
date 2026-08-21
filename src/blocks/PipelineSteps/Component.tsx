import React from "react";
import { Check } from "lucide-react";

import type { PipelineStepsBlock as PipelineStepsBlockProps } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export const PipelineStepsBlock: React.FC<PipelineStepsBlockProps> = (
  props,
) => {
  const {
    applicationStatus,
    applicationUrl,
    badge,
    closedMessage,
    heading,
    description,
    steps,
  } = props;

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

          <RevealGroup as="ol" className="flex flex-col">
            {steps?.map((step, index) => {
              const isLast = index === steps.length - 1;

              return (
                <RevealItem
                  as="li"
                  key={index}
                  className={
                    isLast ? "relative flex gap-6" : "relative flex gap-6 pb-12"
                  }
                >
                  {!isLast && (
                    <span
                      aria-hidden
                      className="absolute left-5 top-10 bottom-0 w-px bg-hairline"
                    />
                  )}
                  <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-card font-mono text-[11px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    {step.stepLabel && (
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {step.stepLabel}
                      </span>
                    )}
                    <h3 className="text-lg font-medium tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    {step.description && (
                      <p className="text-[15px] leading-relaxed text-muted-foreground max-w-[68ch]">
                        {step.description}
                      </p>
                    )}
                    {step.details && step.details.length > 0 && (
                      <ul className="mt-3 flex flex-col gap-2">
                        {step.details.map((item, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-2.5 text-[15px] leading-relaxed"
                          >
                            <Check className="size-3.5 mt-[3px] shrink-0 text-muted-foreground" />
                            <span>{item.detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>

          {applicationStatus && (
            <Reveal
              as="aside"
              className="grid gap-8 rounded-2xl border border-hairline bg-card p-6 lg:p-8 surface-highlight md:grid-cols-[1fr_auto] md:items-center"
            >
              <div className="max-w-[68ch]">
                <p className="font-mono text-[11px] text-muted-foreground">
                  {applicationStatus === "open"
                    ? "Applications are open"
                    : "Applications are closed"}
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-0.02em] leading-[1.3] text-balance">
                  {applicationStatus === "open"
                    ? "Apply to the Scholars’ Pipeline"
                    : "Applications are currently closed"}
                </h3>
                {applicationStatus === "closed" && closedMessage && (
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                    {closedMessage}
                  </p>
                )}
              </div>

              {applicationStatus === "open" && applicationUrl ? (
                <CMSLink
                  appearance="default"
                  label="Apply now"
                  newTab
                  size="lg"
                  type="custom"
                  url={applicationUrl}
                />
              ) : (
                <CMSLink
                  appearance="outline"
                  label="Contact us"
                  size="lg"
                  type="custom"
                  url="/contact"
                />
              )}
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
};
