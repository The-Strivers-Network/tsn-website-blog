import type { CollectionConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { protectRoles } from './hooks/protectRoles';
import admin from '../../access/admin';
import author from '../../access/author';
import { checkRole } from './hooks/checkRole';
import { User } from '@/payload-types';

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: admin,
    delete: admin,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Author',
          value: 'author',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      hooks: {
        beforeChange: [protectRoles],
      },
      access: {
        update: ({ req: { user } }) => checkRole(['admin'], user as User),
      },
    },
  ],
  timestamps: true,
};
