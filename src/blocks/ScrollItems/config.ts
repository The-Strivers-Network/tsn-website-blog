import type { Block } from 'payload'

export const ScrollItems: Block = {
  slug: 'scrollItems',
  interfaceName: 'ScrollItemsBlock',
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
    },
    {
      name: 'description',
      type: 'textarea',
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
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
