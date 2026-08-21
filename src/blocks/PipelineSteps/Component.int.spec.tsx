import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it } from "vitest";

import { PipelineStepsBlock } from "./Component";

function renderPipelineSteps(overrides: Record<string, unknown>) {
  render(
    <PipelineStepsBlock
      {...({
        blockType: "pipelineSteps",
        steps: [{ title: "Application and eligibility" }],
        ...overrides,
      } as unknown as ComponentProps<typeof PipelineStepsBlock>)}
    />,
  );
}

describe("PipelineStepsBlock application state", () => {
  it("routes interested students to contact while applications are closed", () => {
    renderPipelineSteps({
      applicationStatus: "closed",
      closedMessage: "Applications are currently closed for the next cohort.",
    });

    expect(
      screen.getByText(
        "Applications are currently closed for the next cohort.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Contact us" }).getAttribute("href"),
    ).toBe("/contact");
    expect(screen.queryByRole("link", { name: "Apply now" })).toBeNull();
  });

  it("uses the CMS-authored form URL while applications are open", () => {
    renderPipelineSteps({
      applicationStatus: "open",
      applicationUrl: "https://forms.example.org/tsn-application",
    });

    expect(screen.getByText("Applications are open")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Apply now" }).getAttribute("href"),
    ).toBe("https://forms.example.org/tsn-application");
  });
});
