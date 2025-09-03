'use client';

import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const PRIVACY_POLICY_COOKIE_NAME = 'privacy_policy_accepted';
const COOKIE_EXPIRY_DAYS = 365;

export const usePrivacyPolicyCookie = () => {
  const [cookieValue, setCookieValue] = useState<boolean>(false);

  const getCookie = useCallback((): boolean => {
    if (typeof document === 'undefined') return false;

    const value = Cookies.get(PRIVACY_POLICY_COOKIE_NAME);
    return value === 'true';
  }, []);

  const setCookie = useCallback(
    (value: boolean) => {
      if (cookieValue === value) {
        return;
      }

      if (value) {
        Cookies.set(PRIVACY_POLICY_COOKIE_NAME, 'true', {
          expires: COOKIE_EXPIRY_DAYS,
          sameSite: 'Lax'
        });
      } else {
        Cookies.remove(PRIVACY_POLICY_COOKIE_NAME);
      }

      setCookieValue(value);
    },
    [cookieValue]
  );

  useEffect(() => {
    const cookieValue = getCookie();
    setCookieValue(cookieValue);
  }, [getCookie]);

  useEffect(() => {
    const checkCookie = () => {
      const currentValue = getCookie();
      if (currentValue !== cookieValue) {
        setCookieValue(currentValue);
      }
    };

    const interval = setInterval(checkCookie, 100);

    return () => clearInterval(interval);
  }, [getCookie, cookieValue]);

  const isAccepted = getCookie();

  return {
    setAccepted: setCookie,
    getCookie,
    isAccepted
  };
};
