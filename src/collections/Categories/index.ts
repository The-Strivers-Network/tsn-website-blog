import type { CollectionConfig } from 'payload';

import admin from '@/access/admin';
import { anyone } from '@/access/anyone';
import { slugField } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: admin,
    delete: admin,
    read: anyone,
    update: admin,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Blog Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
};
