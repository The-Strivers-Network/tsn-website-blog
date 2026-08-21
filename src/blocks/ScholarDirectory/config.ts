import type { Block } from "payload";

export const ScholarDirectory: Block = {
  slug: "scholarDirectory",
  interfaceName: "ScholarDirectoryBlock",
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
      admin: {
        description:
          "Scholars come from the Scholars collection and are grouped by cohort",
      },
    },
  ],
};
