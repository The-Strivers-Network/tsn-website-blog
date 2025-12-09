'use client';

import { ArrowUpIcon } from 'lucide-react';
import React from 'react';

export function ToTopButton() {
  const [visible, setVisible] = React.useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const clickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={clickHandler}
      className={visible ? 'fixed bottom-8 right-8 rounded-full p-2 bg-gray-600' : 'hidden'}
    >
      <ArrowUpIcon />
    </button>
  );
}
