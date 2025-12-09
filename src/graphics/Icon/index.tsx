import { getPayload } from 'payload';
import config from '@payload-config';
import React from 'react';
import { Media } from '@/payload-types';
import Image from 'next/image';

export const Icons = async () => {
  const payload = await getPayload({ config });
  const settings = await payload.findGlobal({
    slug: 'settings',
  });
  const lightModeIcon = settings.lightModeIcon as Media;
  const darkModeIcon = settings.darkModeIcon as Media;
  return (
    <>
      <Image
        src={lightModeIcon.url || ''}
        alt={lightModeIcon.alt || 'Light Mode Icon'}
        width={lightModeIcon.width || 640}
        height={lightModeIcon.height || 380}
        className="light-mode-image"
      />
      <Image
        src={darkModeIcon.url || ''}
        alt={darkModeIcon.alt || 'Dark Mode Icon'}
        width={darkModeIcon.width || 640}
        height={darkModeIcon.height || 380}
        className="dark-mode-image"
      />
    </>
  );
};
