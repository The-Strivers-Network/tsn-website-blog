import type { Block } from "payload";

export const PipelineSteps: Block = {
  slug: "pipelineSteps",
  interfaceName: "PipelineStepsBlock",
  fields: [
    {
      name: "badge",
      type: "text",
      admin: {
        description: "Optional badge label shown above the heading",
      },
    },
    {
      name: "heading",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "applicationStatus",
      type: "select",
      defaultValue: "closed",
      required: true,
      options: [
        { label: "Applications open", value: "open" },
        { label: "Applications closed", value: "closed" },
      ],
      admin: {
        description:
          "Controls the application status panel below the process steps.",
      },
    },
    {
      name: "applicationUrl",
      type: "text",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.applicationStatus === "open",
        description: "Live application form URL.",
      },
    },
    {
      name: "closedMessage",
      type: "textarea",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.applicationStatus === "closed",
        description:
          "Message shown while applications are closed. The action links to Contact.",
      },
    },
    {
      name: "steps",
      type: "array",
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "stepLabel",
          type: "text",
          admin: {
            description:
              "e.g. STEP 01. Falls back to the step number when empty.",
          },
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "details",
          type: "array",
          admin: {
            initCollapsed: true,
            description:
              "Optional checklist shown beneath the step description",
          },
          fields: [
            {
              name: "detail",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
