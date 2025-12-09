import { getPayload } from 'payload';
import config from '@payload-config';
import React from 'react';
import { Media } from '@/payload-types';
import Image from 'next/image';

export const Logos = async () => {
  const payload = await getPayload({ config });
  const settings = await payload.findGlobal({
    slug: 'settings',
  });
  const lightModeLogo = settings.lightModeLogo as Media;
  const darkModeLogo = settings.darkModeLogo as Media;
  return (
    <>
      <Image
        src={lightModeLogo.url || ''}
        alt={lightModeLogo.alt || 'Light Mode Logo'}
        width={lightModeLogo.width || 640}
        height={lightModeLogo.height || 380}
        className="light-mode-image"
      />
      <Image
        src={darkModeLogo.url || ''}
        alt={darkModeLogo.alt || 'Dark Mode Logo'}
        width={darkModeLogo.width || 640}
        height={darkModeLogo.height || 380}
        className="dark-mode-image"
      />
    </>
  );
};
