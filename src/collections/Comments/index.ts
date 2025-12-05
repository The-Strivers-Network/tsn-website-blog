import admin from '@/access/admin';
import { anyone } from '@/access/anyone';
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished';
import { Sidebar } from 'lucide-react';
import type { CollectionConfig } from 'payload';

export const Comments: CollectionConfig = {
  slug: 'comments',
  folders: true,
  trash: true,
  access: {
    create: anyone,
    delete: admin,
    read: authenticatedOrPublished,
    update: admin,
  },
  fields: [
    {
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      validate: (string) => {
        if (!string || string.length < 10) {
          return 'Your comment must be at least 10 characters long';
        }
        return true;
      },
    },

    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Toggle to change the visibility of the comment.',
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: new Date(),
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
