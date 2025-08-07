'use client';

import { useEffect, useState } from 'react';

export const useScreenHeight = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenHeight = () => {
      setIsSmallScreen(window.innerHeight < 800);
    };

    // Check on mount
    checkScreenHeight();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenHeight);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenHeight);
  }, []);

  return { isSmallScreen };
};
