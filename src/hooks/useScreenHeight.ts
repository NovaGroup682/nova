'use client';

import { useEffect, useState } from 'react';

export const useScreenHeight = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenHeight = () => {
      setIsSmallScreen(window.innerHeight < 800);
    };

    checkScreenHeight();

    window.addEventListener('resize', checkScreenHeight);

    return () => window.removeEventListener('resize', checkScreenHeight);
  }, []);

  return { isSmallScreen };
};
