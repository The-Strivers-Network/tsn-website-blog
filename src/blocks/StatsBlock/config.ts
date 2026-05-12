import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'statsBlock',
  interfaceName: 'StatsBlock',
  fields: [
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
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'The main stat number or value, e.g. "500,000" or "$523,520"',
          },
        },
        {
          name: 'change',
          type: 'text',
          admin: {
            description: 'Change indicator, e.g. "+20.1%" or "-2%"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Descriptive label, e.g. "Monthly active users"',
          },
        },
        {
          name: 'trend',
          type: 'select',
          defaultValue: 'up',
          options: [
            { label: 'Up', value: 'up' },
            { label: 'Down', value: 'down' },
          ],
        },
      ],
    },
  ],
}
