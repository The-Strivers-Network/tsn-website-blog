import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { link } from "../../fields/link";

export const FeatureSplit: Block = {
  slug: "featureSplit",
  interfaceName: "FeatureSplitBlock",
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
      name: "lead",
      type: "textarea",
      admin: {
        description: "Short lead paragraph directly under the heading",
      },
    },
    {
      name: "body",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: false,
    },
    {
      name: "enableLink",
      type: "checkbox",
      admin: {
        description: "Show a call to action under the copy",
      },
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Visual shown beside the copy",
      },
    },
    {
      name: "features",
      type: "array",
      admin: {
        initCollapsed: true,
        description: "Icon row shown beneath the split",
      },
      fields: [
        {
          name: "icon",
          type: "select",
          options: [
            { label: "Compass", value: "compass" },
            { label: "Users", value: "users" },
            { label: "Graduation cap", value: "graduation-cap" },
            { label: "Handshake", value: "handshake" },
            { label: "Target", value: "target" },
            { label: "Sparkles", value: "sparkles" },
            { label: "Open book", value: "book-open" },
            { label: "Globe", value: "globe" },
          ],
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
      ],
    },
  ],
  labels: {
    plural: "Feature Splits",
    singular: "Feature Split",
  },
};
