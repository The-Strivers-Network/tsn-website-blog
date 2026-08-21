import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";

import type {
  Scholar,
  ScholarDirectoryBlock as ScholarDirectoryBlockProps,
} from "@/payload-types";

import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

// Display order for cohort groups. Typed against the generated union so a new
// cohort in the collection surfaces here as a type error instead of silently
// dropping out of the directory.
const COHORT_ORDER: Scholar["cohort"][] = ["SP1", "SP2", "SP3", "SP4", "SP5"];

const getScholars = cache(async (): Promise<Scholar[]> => {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "scholars",
    depth: 1,
    limit: 200,
    sort: "cohort",
    overrideAccess: false,
  });

  return docs;
});

export const ScholarDirectoryBlock = async (
  props: ScholarDirectoryBlockProps,
) => {
  const { badge, heading, description } = props;

  const scholars = await getScholars();

  if (!scholars.length) return null;

  const groups = COHORT_ORDER.map((cohort) => ({
    cohort,
    scholars: scholars.filter((scholar) => scholar.cohort === cohort),
  })).filter((group) => group.scholars.length > 0);

  if (!groups.length) return null;

  return (
    <div className="w-full py-20 lg:py-28">
      <div className="container mx-auto">
        <div className="flex flex-col gap-12">
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

          <div className="flex flex-col gap-14">
            {groups.map((group) => (
              <Reveal key={group.cohort}>
                <h3 className="mb-5 font-mono text-[11px] font-medium text-muted-foreground">
                  {group.cohort}
                </h3>
                <RevealGroup
                  stagger={0.03}
                  className="-mx-3 border-t border-hairline"
                >
                  {group.scholars.map((scholar) => {
                    const {
                      id,
                      name,
                      school,
                      district,
                      university,
                      major,
                      notableMentions,
                    } = scholar;

                    const universityName =
                      university && typeof university === "object"
                        ? university.name
                        : null;

                    const mentions = notableMentions?.filter((entry) =>
                      Boolean(entry.mention),
                    );

                    return (
                      <RevealItem
                        key={id}
                        className="grid gap-2 border-b border-hairline px-3 py-4 transition-colors duration-150 hover:bg-wash md:grid-cols-4 md:gap-6 md:items-baseline"
                      >
                        <div>
                          <span className="text-[15px] font-medium">
                            {name}
                          </span>
                          {mentions && mentions.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {mentions.map((entry, mentionIndex) => (
                                <span
                                  key={entry.id ?? mentionIndex}
                                  className="rounded-md border border-hairline px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                                >
                                  {entry.mention}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {[school, district].filter(Boolean).join(" · ")}
                        </span>
                        {universityName && (
                          <span className="text-sm text-muted-foreground">
                            {universityName}
                          </span>
                        )}
                        {major && (
                          <span className="text-sm text-muted-foreground">
                            {major}
                          </span>
                        )}
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
