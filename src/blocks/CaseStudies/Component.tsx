import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";

import type {
  CaseStudiesBlock as CaseStudiesBlockProps,
  Media as MediaType,
  Scholar,
} from "@/payload-types";

import { cn } from "@/utilities/ui";
import { Reveal } from "@/components/Reveal";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";

const hasCaseStudy = (scholar: Scholar): boolean => {
  const children = scholar.caseStudy?.root?.children;
  return Array.isArray(children) && children.length > 0;
};

const getFeaturedScholars = cache(async (): Promise<Scholar[]> => {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "scholars",
    depth: 1,
    limit: 200,
    where: {
      featured: {
        equals: true,
      },
    },
    overrideAccess: false,
  });

  return docs;
});

// The key is a joined string rather than an array so `cache` can dedupe across
// several instances of this block on one page; arrays compare by identity.
const getSelectedScholars = cache(async (idKey: string): Promise<Scholar[]> => {
  const ids = idKey.split(",").map(Number);

  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "scholars",
    depth: 1,
    limit: ids.length,
    where: {
      id: {
        in: ids,
      },
    },
    overrideAccess: false,
  });

  // `find` returns collection order; restore the order the editor authored.
  return ids
    .map((id) => docs.find((doc) => doc.id === id))
    .filter((doc): doc is Scholar => Boolean(doc));
});

export const CaseStudiesBlock = async (props: CaseStudiesBlockProps) => {
  const { badge, heading, description, source, scholars: selected } = props;

  const selectedIds = Array.from(
    new Set(
      selected?.map((scholar) =>
        typeof scholar === "object" ? scholar.id : scholar,
      ) ?? [],
    ),
  );

  const scholars =
    source === "selected" && selectedIds.length > 0
      ? await getSelectedScholars(selectedIds.join(","))
      : await getFeaturedScholars();

  const caseStudies = scholars.filter(hasCaseStudy);

  if (!caseStudies.length) return null;

  return (
    <div className="w-full py-20 lg:py-28">
      <div className="container mx-auto">
        <div className="flex flex-col gap-16">
          <Reveal className="flex flex-col gap-4">
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

          <div>
            {caseStudies.map((scholar, index) => {
              const { id, name, cohort, school, district, university, major } =
                scholar;
              const { headshot, caseStudy, pullQuote } = scholar;

              const universityName =
                university && typeof university === "object"
                  ? university.name
                  : null;

              const meta = [school, district, universityName, major]
                .filter(Boolean)
                .join(" · ");

              return (
                <Reveal
                  as="section"
                  key={id}
                  className={cn(
                    "grid gap-10 lg:grid-cols-[minmax(18rem,2fr)_minmax(0,3fr)] lg:gap-20",
                    index > 0 && "mt-20 border-t border-hairline pt-20",
                  )}
                >
                  <div
                    className={cn(
                      "lg:sticky lg:top-24 lg:self-start",
                      index % 2 === 1 && "lg:order-2",
                    )}
                  >
                    {headshot && typeof headshot === "object" ? (
                      <Media
                        resource={headshot as MediaType}
                        imgClassName="aspect-[3/4] w-full rounded-2xl border border-hairline object-cover"
                      />
                    ) : (
                      <div className="bg-card aspect-[3/4] rounded-2xl border border-hairline" />
                    )}
                  </div>

                  <article className="flex max-w-[68ch] flex-col gap-6">
                    <header className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] font-medium text-muted-foreground">
                        {cohort}
                      </span>
                      <h3 className="text-3xl font-normal tracking-[-0.02em] text-balance">
                        {name}
                      </h3>
                      {meta && (
                        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground text-pretty">
                          {meta}
                        </p>
                      )}
                    </header>

                    {caseStudy && (
                      <RichText
                        className="mx-0 max-w-[68ch]"
                        data={caseStudy}
                        enableGutter={false}
                      />
                    )}

                    {pullQuote && (
                      <blockquote className="border-l border-hairline-strong pl-6 text-lg leading-relaxed text-pretty">
                        “{pullQuote}”
                      </blockquote>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
