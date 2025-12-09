import type { Metadata } from 'next';
import { getServerSideURL } from './getURL';

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'The Strivers\’ Network (TSN) is a youth-led college access program striving to make the world\’s leading universities more accessible to Sri Lanka\’s underserved high-achievers.',
  images: [
    {
      url: `${getServerSideURL()}/banner.webp`,
    },
  ],
  siteName: "The Strivers' Network",
  title: "The Strivers' Network",
};

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
