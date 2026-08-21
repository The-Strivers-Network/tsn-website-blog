import React from "react";

import type { TeamBlock as TeamBlockProps } from "@/payload-types";
import type { Media as MediaType } from "@/payload-types";

import { Media } from "@/components/Media";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export const TeamBlock: React.FC<TeamBlockProps> = (props) => {
  const { badge, heading, description, groups } = props;

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

          {groups?.map((group, groupIndex) => {
            const hasQuotes = group.members?.some((member) => member.quote);

            return (
              <section key={groupIndex}>
                <h3 className="mb-6 font-mono text-[11px] text-muted-foreground">
                  {group.groupName}
                </h3>

                {hasQuotes ? (
                  <RevealGroup className="grid gap-4 border-t border-hairline pt-8 md:grid-cols-2">
                    {group.members?.map((member, memberIndex) => (
                      <RevealItem
                        as="article"
                        key={memberIndex}
                        className="grid gap-6 rounded-2xl border border-hairline bg-card p-6 lg:p-8 surface-highlight sm:grid-cols-[auto_1fr]"
                      >
                        <div className="size-16 overflow-hidden rounded-xl border border-hairline">
                          {member.avatar &&
                          typeof member.avatar === "object" ? (
                            <Media
                              resource={member.avatar as MediaType}
                              imgClassName="aspect-square object-cover"
                            />
                          ) : (
                            <div className="flex aspect-square items-center justify-center bg-wash text-sm font-medium">
                              {member.name?.charAt(0)}
                            </div>
                          )}
                        </div>

                        <div className="flex min-w-0 flex-col">
                          {member.quote && (
                            <blockquote className="text-[15px] leading-relaxed text-pretty">
                              “{member.quote}”
                            </blockquote>
                          )}
                          <footer className="mt-6 border-t border-hairline pt-4">
                            <span className="block text-sm font-medium">
                              {member.name}
                            </span>
                            {member.role && (
                              <span className="mt-1 block font-mono text-[11px] text-muted-foreground">
                                {member.role}
                              </span>
                            )}
                          </footer>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                ) : (
                  <RevealGroup className="grid grid-cols-2 gap-8 border-t border-hairline py-8 md:grid-cols-4">
                    {group.members?.map((member, memberIndex) => (
                      <RevealItem key={memberIndex}>
                        <div className="size-20 overflow-hidden rounded-full border border-hairline">
                          {member.avatar &&
                          typeof member.avatar === "object" ? (
                            <Media
                              resource={member.avatar as MediaType}
                              imgClassName="aspect-square rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex aspect-square items-center justify-center rounded-full bg-wash text-sm font-medium">
                              {member.name?.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="mt-4 block text-sm font-medium">
                          {member.name}
                        </span>
                        {member.role && (
                          <span className="mt-1 block font-mono text-[11px] text-muted-foreground">
                            {member.role}
                          </span>
                        )}
                      </RevealItem>
                    ))}
                  </RevealGroup>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
