import type { Block } from 'payload'

export const ParagraphBlock: Block = {
  slug: 'paragraph',
  interfaceName: 'ParagraphBlock',
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Text that animates word-by-word on scroll',
      },
    },
  ],
}
