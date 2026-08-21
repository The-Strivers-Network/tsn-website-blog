import React, { cache } from "react";

import configPromise from "@payload-config";
import { getPayload } from "payload";

import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Facebook,
  Globe,
  Instagram,
  Link2,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";

import type { ContactInfoBlock as ContactInfoBlockProps } from "@/payload-types";

import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

type SocialLink = {
  platform?: string | null;
  url?: string | null;
  id?: string | null;
};

/**
 * The `settings` global carries these fields ahead of the generated types, so read
 * them through a narrow shape instead of widening to `any`.
 */
type ContactSettings = {
  email?: string | null;
  linktree?: string | null;
  socials?: SocialLink[] | null;
};

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  twitter: Twitter,
  youtube: Youtube,
};

const getContactSettings = cache(async (): Promise<ContactSettings> => {
  const payload = await getPayload({ config: configPromise });
  const settings = await payload.findGlobal({ slug: "settings", depth: 0 });

  return settings as unknown as ContactSettings;
});

export const ContactInfoBlock = async (props: ContactInfoBlockProps) => {
  const { badge, heading, description } = props;

  const settings = await getContactSettings();

  const email = settings.email?.trim();
  const linktree = settings.linktree?.trim();
  const socials = (settings.socials ?? []).flatMap((social, index) => {
    const platform = social?.platform?.trim();
    const url = social?.url?.trim();

    if (!platform || !url) return [];

    return [
      {
        key: social?.id ?? `${platform}-${index}`,
        platform,
        url,
        Icon: SOCIAL_ICONS[platform.toLowerCase()] ?? Globe,
      },
    ];
  });

  if (!email && !linktree && socials.length === 0) return null;

  return (
    <div className="w-full py-20 lg:py-28">
      <div className="container mx-auto">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)] lg:gap-20">
          <Reveal className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
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

          <RevealGroup className="flex flex-col gap-4">
            {email && (
              <RevealItem>
                <a
                  href={`mailto:${email}`}
                  className="block rounded-2xl border border-hairline bg-card p-6 lg:p-8 surface-highlight transition-[border-color,transform] duration-150 ease-graphite hover:border-hairline-strong hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Mail className="size-4 text-muted-foreground" />
                  <span className="mt-8 block font-mono text-[11px] text-muted-foreground">
                    Email
                  </span>
                  <span className="mt-2 block text-lg font-medium break-all">
                    {email}
                  </span>
                </a>
              </RevealItem>
            )}

            {(linktree || socials.length > 0) && (
              <RevealItem>
                <div className="rounded-2xl border border-hairline bg-card p-6 lg:p-8 surface-highlight">
                  <p className="mb-6 font-mono text-[11px] text-muted-foreground">
                    Social channels
                  </p>
                  <div className="flex flex-col">
                    {linktree && (
                      <a
                        href={linktree}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 border-b border-hairline py-4 first:pt-0 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <span className="flex items-center gap-4">
                          <Link2 className="size-4 shrink-0" />
                          <span>Linktree</span>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
                        />
                      </a>
                    )}

                    {socials.map(({ key, platform, url, Icon }) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 border-b border-hairline py-4 last:border-b-0 last:pb-0 first:pt-0 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <span className="flex items-center gap-4">
                          <Icon className="size-4 shrink-0" />
                          <span>{platform}</span>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </RevealItem>
            )}
          </RevealGroup>
        </div>
      </div>
    </div>
  );
};
