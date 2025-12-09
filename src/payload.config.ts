import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';

import sharp from 'sharp'; // sharp-import
import path from 'path';
import { buildConfig, PayloadRequest } from 'payload';
import { fileURLToPath } from 'url';

import { Categories } from './collections/Categories';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Posts } from './collections/Posts';
import { Comments } from './collections/Comments';
import { Users } from './collections/Users';
import { Footer } from './Footer/config';
import { Header } from './Header/config';
import { plugins } from './plugins';
import { defaultLexical } from '@/fields/defaultLexical';
import { getServerSideURL } from './utilities/getURL';
import { resendAdapter } from '@payloadcms/email-resend';
import { Settings } from './Settings/config';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    avatar: 'gravatar',
    components: {
      graphics: {
        Logo: '/graphics/Logo/index.tsx#Logos',
        Icon: '/graphics/Icon/index.tsx#Icons',
      },
    },
    meta: {
      icons: [
        {
          fetchPriority: 'high',
          sizes: 'any',
          type: 'image/jpg',
          rel: 'icon',
          url: '/favicon.jpg',
        },
      ],
      title: 'Dashboard',
      titleSuffix: ' | TSN',
      description: "PayloadCMS Dashboard for the The Striver's Network",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  collections: [Pages, Posts, Comments, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Settings],
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true;

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization');
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [],
  },
  email: resendAdapter({
    defaultFromAddress: 'noreply@mail.thestriversnetwork.org',
    defaultFromName: "The Striver's Network",
    apiKey: process.env.RESEND_API_KEY || '',
  }),
});
