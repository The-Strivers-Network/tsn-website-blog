import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'teamBlock',
  interfaceName: 'TeamBlock',
  fields: [
    {
      name: 'groups',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'groupName',
          type: 'text',
          required: true,
          admin: {
            description: 'Group label, e.g. "Leadership", "Engineering"',
          },
        },
        {
          name: 'members',
          type: 'array',
          required: true,
          minRows: 1,
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
            },
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
