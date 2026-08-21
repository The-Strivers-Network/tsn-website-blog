import type { Block } from "payload";

export const AdmissionsMap: Block = {
  slug: "admissionsMap",
  interfaceName: "AdmissionsMapBlock",
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
      name: "scope",
      type: "select",
      defaultValue: "both",
      options: [
        {
          label: "World",
          value: "world",
        },
        {
          label: "Sri Lanka",
          value: "srilanka",
        },
        {
          label: "Both",
          value: "both",
        },
      ],
    },
    {
      name: "showUniversityList",
      type: "checkbox",
      admin: {
        description: "List every university beneath the map",
      },
    },
  ],
};
