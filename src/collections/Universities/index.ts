import type { CollectionConfig } from "payload";

import admin from "@/access/admin";

export const Universities: CollectionConfig = {
  slug: "universities",
  labels: {
    singular: "University",
    plural: "Universities",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "country", "city"],
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
      unique: true,
      admin: {
        description: "Canonical name as it should appear on the site",
      },
    },
    {
      name: "country",
      type: "text",
      required: true,
    },
    {
      name: "city",
      type: "text",
    },
    {
      name: "lat",
      type: "number",
      required: true,
      admin: {
        description: "Latitude used to place the pin on the admissions map",
      },
    },
    {
      name: "lng",
      type: "number",
      required: true,
      admin: {
        description: "Longitude used to place the pin on the admissions map",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
  ],
};
