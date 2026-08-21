import React from "react";

import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { Reveal } from "@/components/Reveal";

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  badge,
  heading,
  links,
  richText,
  variant,
}) => {
  if (variant === "centeredCard") {
    return (
      <div className="w-full py-20 lg:py-28">
        <div className="container mx-auto">
          <Reveal className="rounded-2xl border border-hairline bg-card px-6 py-16 lg:px-16 lg:py-24 surface-highlight">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
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
              {richText && (
                <RichText
                  className="mb-0 text-[15px] leading-relaxed text-muted-foreground max-w-[68ch] text-pretty"
                  data={richText}
                  enableGutter={false}
                />
              )}
              {links && links.length > 0 && (
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  {links.map(({ link }, i) => (
                    <CMSLink key={i} size="lg" {...link} />
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-20 lg:py-28">
      <div className="container mx-auto">
        <Reveal className="bg-card rounded-2xl border border-hairline p-6 lg:p-8 surface-highlight flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
          <div className="max-w-[48rem] flex items-center">
            {richText && (
              <RichText className="mb-0" data={richText} enableGutter={false} />
            )}
          </div>
          <div className="flex flex-col gap-8">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...link} />;
            })}
          </div>
        </Reveal>
      </div>
    </div>
  );
};
