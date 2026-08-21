import React, { cache } from "react";

import configPromise from "@payload-config";
import { getPayload } from "payload";

import type { AdmissionsMapBlock as AdmissionsMapBlockProps } from "@/payload-types";

import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

import { DISTRICT_COORDS, getMapSvg, type MapPin } from "./map";

const getAdmissions = cache(async () => {
  const payload = await getPayload({ config: configPromise });

  const [universities, scholars] = await Promise.all([
    payload.find({
      collection: "universities",
      depth: 0,
      limit: 200,
      overrideAccess: false,
    }),
    payload.find({
      collection: "scholars",
      depth: 0,
      limit: 200,
      overrideAccess: false,
    }),
  ]);

  return { universities: universities.docs, scholars: scholars.docs };
});

export const AdmissionsMapBlock = async (props: AdmissionsMapBlockProps) => {
  const { badge, heading, description, scope, showUniversityList } = props;

  const { universities, scholars } = await getAdmissions();

  if (universities.length === 0 && scholars.length === 0) return null;

  const worldPins: MapPin[] = [];

  for (const university of universities) {
    const { lat, lng } = university;

    if (
      typeof lat !== "number" ||
      !Number.isFinite(lat) ||
      typeof lng !== "number" ||
      !Number.isFinite(lng)
    ) {
      console.warn(
        `[admissionsMap] skipping "${university.name}": no usable coordinates`,
      );
      continue;
    }

    worldPins.push({ lat, lng, label: university.name });
  }

  const districts = Array.from(
    new Set(scholars.map((scholar) => scholar.district)),
  )
    .filter((district) => typeof district === "string" && district.length > 0)
    .sort((a, b) => a.localeCompare(b));

  const districtPins: MapPin[] = [];

  for (const district of districts) {
    const coords = DISTRICT_COORDS[district];

    if (!coords) {
      console.warn(
        `[admissionsMap] skipping district "${district}": no coordinates on file`,
      );
      continue;
    }

    districtPins.push({ lat: coords.lat, lng: coords.lng, label: district });
  }

  const worldSvg =
    scope !== "srilanka" && worldPins.length > 0
      ? getMapSvg({ scope: "world", pins: worldPins })
      : "";

  const sriLankaSvg =
    scope !== "world" && districtPins.length > 0
      ? getMapSvg({ scope: "srilanka", pins: districtPins })
      : "";

  const universityList = Array.from(
    new Map(
      universities.map((university) => [
        `${university.name}|${university.country}`,
        { name: university.name, country: university.country },
      ]),
    ).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));

  const showList = Boolean(showUniversityList) && universityList.length > 0;

  if (!worldSvg && !sriLankaSvg && !showList) return null;

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

          {(worldSvg || sriLankaSvg) && (
            <Reveal
              delay={0.08}
              className={
                worldSvg && sriLankaSvg
                  ? "grid items-center gap-12 lg:grid-cols-[3fr_1fr]"
                  : "grid gap-8"
              }
            >
              {worldSvg && (
                <div
                  aria-label="World map of university admissions"
                  className="[&_svg]:h-auto [&_svg]:w-full text-primary"
                  dangerouslySetInnerHTML={{ __html: worldSvg }}
                  role="img"
                />
              )}

              {sriLankaSvg && (
                <figure className="flex flex-col items-center gap-4">
                  <div
                    aria-label="Sri Lanka map of scholar districts"
                    className="w-full max-w-[14rem] [&_svg]:h-auto [&_svg]:w-full text-primary"
                    dangerouslySetInnerHTML={{ __html: sriLankaSvg }}
                    role="img"
                  />
                  <figcaption className="max-w-xs text-center font-mono text-[11px] leading-relaxed text-muted-foreground">
                    Districts represented: {districts.join(", ")}
                  </figcaption>
                </figure>
              )}
            </Reveal>
          )}

          {showList && (
            <RevealGroup
              as="ul"
              stagger={0.04}
              className="w-full max-w-2xl border-t border-hairline"
            >
              {universityList.map((university) => (
                <RevealItem
                  as="li"
                  key={`${university.name}|${university.country}`}
                  className="flex items-baseline justify-between gap-4 border-b border-hairline py-2.5 last:border-b-0"
                >
                  <span className="text-sm">{university.name}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {university.country}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </div>
    </div>
  );
};
