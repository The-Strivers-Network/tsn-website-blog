import type { Block } from "payload";

export const GiveBackCycle: Block = {
  slug: "giveBackCycle",
  interfaceName: "GiveBackCycleBlock",
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
      name: "stages",
      type: "array",
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
        description:
          "Stages of the give-back loop, in order. The last stage returns to the first.",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
  ],
};
