import type { Block } from "payload";

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Verification: Block = {
  slug: "verification",
  interfaceName: "VerificationBlock",
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
      name: "statement",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: false,
    },
    {
      name: "registrationNumber",
      type: "text",
      admin: {
        description:
          "Company registration number — leave empty until confirmed",
      },
    },
    {
      name: "registeredDate",
      type: "text",
      admin: {
        description: "e.g. 6 December 2022",
      },
    },
    {
      name: "verifyUrl",
      type: "text",
      admin: {
        description: "Destination for the verification QR code",
      },
    },
    {
      name: "qrImage",
      type: "upload",
      relationTo: "media",
    },
  ],
  labels: {
    plural: "Verification Panels",
    singular: "Verification Panel",
  },
};
