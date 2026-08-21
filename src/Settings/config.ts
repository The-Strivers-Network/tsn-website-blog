import { GlobalConfig } from 'payload';

export const Settings: GlobalConfig = {
  slug: 'settings',
  fields: [
    {
      name: 'lightModeIcon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'lightModeLogo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'darkModeIcon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'darkModeLogo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Public contact address shown on the contact page and footer',
      },
    },
    {
      name: 'linktree',
      type: 'text',
      admin: {
        description: 'Full URL to the Linktree profile',
      },
    },
    {
      name: 'socials',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: ['Instagram', 'LinkedIn', 'Facebook', 'X', 'YouTube', 'TikTok'].map(
            (platform) => ({ label: platform, value: platform }),
          ),
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
