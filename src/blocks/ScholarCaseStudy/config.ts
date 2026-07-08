import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ScholarCaseStudy: Block = {
  slug: 'scholarCaseStudy',
  interfaceName: 'ScholarCaseStudyBlock',
  labels: {
    singular: 'Scholar Case Study',
    plural: 'Scholar Case Studies',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'Optional badge label shown above the scholar name',
      },
    },
    {
      name: 'scholarName',
      type: 'text',
      required: true,
    },
    {
      name: 'school',
      type: 'text',
      admin: {
        description: 'School, university, or field of study',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        description: 'Which side the portrait sits on. Alternate across stacked blocks.',
      },
    },
  ],
}
