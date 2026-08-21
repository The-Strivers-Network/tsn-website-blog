import type { Block } from "payload";

export const CaseStudies: Block = {
  slug: "caseStudies",
  interfaceName: "CaseStudiesBlock",
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
      name: "source",
      type: "select",
      defaultValue: "featured",
      options: [
        {
          label: "All featured scholars",
          value: "featured",
        },
        {
          label: "Hand-picked scholars",
          value: "selected",
        },
      ],
      admin: {
        description: "Scholars without a case study are skipped either way",
      },
    },
    {
      name: "scholars",
      type: "relationship",
      relationTo: "scholars",
      hasMany: true,
      admin: {
        condition: (_data, siblingData) => siblingData?.source === "selected",
        description: "Rendered in the order listed here",
      },
    },
  ],
};
