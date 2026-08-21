import type { CollectionConfig } from "payload";

import admin from "@/access/admin";

export const COHORTS = ["SP1", "SP2", "SP3", "SP4", "SP5"] as const;

export const DISTRICTS = [
  "Colombo",
  "Kalutara",
  "Kandy",
  "Galle",
  "Gampaha",
  "Ampara",
] as const;

export const Scholars: CollectionConfig = {
  slug: "scholars",
  labels: {
    singular: "Scholar",
    plural: "Scholars",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "cohort", "school", "university"],
    group: "Scholars",
  },
  access: {
    create: admin,
    delete: admin,
    read: () => true,
    update: admin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "cohort",
      type: "select",
      required: true,
      options: COHORTS.map((cohort) => ({ label: cohort, value: cohort })),
      admin: {
        description: "Scholars\u2019 Pipeline cohort",
      },
    },
    {
      name: "school",
      type: "text",
      required: true,
      admin: {
        description: "Sri Lankan school attended before admission",
      },
    },
    {
      name: "district",
      type: "select",
      required: true,
      options: DISTRICTS.map((district) => ({
        label: district,
        value: district,
      })),
    },
    {
      name: "university",
      type: "relationship",
      relationTo: "universities",
      required: true,
    },
    {
      name: "major",
      type: "text",
    },
    {
      name: "notableMentions",
      type: "array",
      admin: {
        description: "Additional admits, scholarships, or honours",
        initCollapsed: true,
      },
      fields: [
        {
          name: "mention",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "headshot",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "caseStudy",
      type: "richText",
      admin: {
        description: "Long-form case study. Only set for featured scholars.",
      },
    },
    {
      name: "pullQuote",
      type: "textarea",
      admin: {
        description: "Closing quote shown at the end of the case study",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Show this scholar as a case study on the Scholars page",
        position: "sidebar",
      },
    },
  ],
};
