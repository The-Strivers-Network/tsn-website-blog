import type { Block } from "payload";

export const ContactBlock: Block = {
  slug: "contactBlock",
  interfaceName: "ContactInfoBlock",
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
  ],
};
