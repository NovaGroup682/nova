'use client';

import { useEffect, useState } from 'react';

const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isTouchCapable =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window);

    setIsTouch(isTouchCapable);
    setMounted(true);
  }, []);

  return mounted ? { isTouch } : { isTouch: false };
};

export default useIsTouchDevice;
