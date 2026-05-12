import type { Block } from 'payload'

export const Bento: Block = {
  slug: 'bento',
  interfaceName: 'BentoBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'Optional badge label shown above the heading',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
  ],
}
