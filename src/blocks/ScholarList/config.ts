import type { Block } from 'payload'

import { link } from '@/fields/link'

export const ScholarList: Block = {
  slug: 'scholarList',
  interfaceName: 'ScholarListBlock',
  labels: {
    singular: 'Scholar List',
    plural: 'Scholar Lists',
  },
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
      name: 'groups',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
        description: 'Group scholars by cohort, university, field, etc.',
      },
      fields: [
        {
          name: 'groupName',
          type: 'text',
          required: true,
          admin: {
            description: 'Group label, e.g. "Class of 2025", "Ivy League"',
          },
        },
        {
          name: 'scholars',
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
              name: 'school',
              type: 'text',
              admin: {
                description: 'School or university',
              },
            },
            {
              name: 'field',
              type: 'text',
              admin: {
                description: 'Field of study, program, or award',
              },
            },
            link({
              appearances: false,
              disableLabel: true,
              overrides: {
                admin: {
                  description: 'Optional link for this scholar (e.g. their case study).',
                },
              },
            }),
          ],
        },
      ],
    },
  ],
}
