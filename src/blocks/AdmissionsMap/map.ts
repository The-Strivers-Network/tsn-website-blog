import "server-only";

import DottedMap from "dotted-map";
import { cache } from "react";

export type MapPin = { lat: number; lng: number; label: string };

/**
 * District capitals for the six districts the Scholars' Pipeline recruits from.
 */
export const DISTRICT_COORDS: Record<string, { lat: number; lng: number }> = {
  Colombo: { lat: 6.9271, lng: 79.8612 },
  Kalutara: { lat: 6.5854, lng: 79.9607 },
  Kandy: { lat: 7.2906, lng: 80.6337 },
  Galle: { lat: 6.0535, lng: 80.221 },
  Gampaha: { lat: 7.0873, lng: 80.0144 },
  Ampara: { lat: 7.2975, lng: 81.6747 },
};

const PIN_COLOR = "#7c3aed";
const DOT_COLOR = "#71717a";

/**
 * Keyed on scope plus the serialised pin set so React dedupes the work across a
 * render pass. Object arguments would defeat `cache()`, which compares by identity.
 */
const renderMap = cache(
  (scope: "world" | "srilanka", serializedPins: string): string => {
    try {
      const pins = JSON.parse(serializedPins) as MapPin[];

      const map = new DottedMap(
        scope === "srilanka"
          ? { height: 60, grid: "diagonal", countries: ["LKA"] }
          : { height: 60, grid: "diagonal" },
      );

      for (const pin of pins) {
        map.addPin({
          lat: pin.lat,
          lng: pin.lng,
          data: pin.label,
          svgOptions: { color: PIN_COLOR, radius: 0.45 },
        });
      }

      return map.getSVG({
        radius: 0.22,
        color: DOT_COLOR,
        shape: "circle",
        backgroundColor: "transparent",
      });
    } catch (error) {
      console.error(
        `[admissionsMap] could not generate the "${scope}" map`,
        error,
      );
      return "";
    }
  },
);

export function getMapSvg({
  scope,
  pins,
}: {
  scope: "world" | "srilanka";
  pins: MapPin[];
}): string {
  const serializedPins = JSON.stringify(
    pins
      .map((pin) => ({ lat: pin.lat, lng: pin.lng, label: pin.label }))
      .sort(
        (a, b) =>
          a.lat - b.lat || a.lng - b.lng || a.label.localeCompare(b.label),
      ),
  );

  return renderMap(scope, serializedPins);
}
