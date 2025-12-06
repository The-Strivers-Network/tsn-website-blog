import admin from '@/access/admin';
import { anyone } from '@/access/anyone';
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished';
import type { CollectionConfig } from 'payload';
import {
  BoldFeature,
  ItalicFeature,
  ParagraphFeature,
  UnderlineFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

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
  admin: {
    group: 'Blog Content',
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
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: [ParagraphFeature(), BoldFeature(), ItalicFeature(), UnderlineFeature()],
      }),
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
