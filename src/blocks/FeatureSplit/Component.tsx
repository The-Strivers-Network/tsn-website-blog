import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Compass,
  Globe,
  GraduationCap,
  Handshake,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import type { FeatureSplitBlock as FeatureSplitBlockProps } from "@/payload-types";
import type { Media as MediaType } from "@/payload-types";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { cn } from "@/utilities/ui";

const iconMap: Record<string, LucideIcon> = {
  compass: Compass,
  users: Users,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  target: Target,
  sparkles: Sparkles,
  "book-open": BookOpen,
  globe: Globe,
};

export const FeatureSplitBlock: React.FC<FeatureSplitBlockProps> = (props) => {
  const { badge, heading, lead, body, enableLink, link, media, features } =
    props;

  return (
    <div className="w-full py-20 lg:py-28">
      <div className="container mx-auto">
        <div
          className={cn(
            "grid gap-12 lg:items-center lg:gap-20",
            media && typeof media === "object" && "lg:grid-cols-2",
          )}
        >
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
            {lead && (
              <p className="text-[15px] leading-relaxed text-muted-foreground max-w-[68ch] text-pretty">
                {lead}
              </p>
            )}
            {body && (
              <RichText
                className="mx-0 max-w-[68ch]"
                data={body}
                enableGutter={false}
              />
            )}
            {enableLink && link && (link.url || link.reference) && (
              <div className="mt-2">
                <CMSLink {...link} appearance="outline" size="lg" />
              </div>
            )}
          </Reveal>

          {media && typeof media === "object" && (
            <Reveal
              className="overflow-hidden rounded-2xl border border-hairline bg-card"
              delay={0.08}
            >
              <Media
                resource={media as MediaType}
                imgClassName="w-full object-cover"
              />
            </Reveal>
          )}
        </div>

        {features && features.length > 0 && (
          <div className="mt-20 border-t border-hairline pt-12">
            <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => {
                const Icon =
                  (feature.icon && iconMap[feature.icon]) || Sparkles;

                return (
                  <RevealItem
                    key={feature.id ?? index}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl border border-hairline bg-wash">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">{feature.title}</span>
                    {feature.description && (
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        )}
      </div>
    </div>
  );
};
