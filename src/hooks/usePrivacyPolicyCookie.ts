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

  const setCookie = useCallback((value: boolean) => {
    if (value) {
      Cookies.set(PRIVACY_POLICY_COOKIE_NAME, 'true', {
        expires: COOKIE_EXPIRY_DAYS,
        sameSite: 'Lax'
      });
    } else {
      Cookies.remove(PRIVACY_POLICY_COOKIE_NAME);
    }

    setCookieValue(value);
  }, []);

  useEffect(() => {
    const cookieValue = getCookie();
    setCookieValue(cookieValue);
  }, [getCookie]);

  return {
    setAccepted: setCookie,
    isAccepted: cookieValue
  };
};
