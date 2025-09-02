'use client';

import { useCallback } from 'react';

const PRIVACY_POLICY_COOKIE_NAME = 'privacy_policy_accepted';
const COOKIE_EXPIRY_DAYS = 365;

export const usePrivacyPolicyCookie = () => {
  const setCookie = useCallback((value: boolean) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);

    const cookieValue = `${PRIVACY_POLICY_COOKIE_NAME}=${value}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    document.cookie = cookieValue;
  }, []);

  const getCookie = useCallback((): boolean => {
    if (typeof document === 'undefined') return false;

    const cookies = document.cookie.split(';');
    const privacyPolicyCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${PRIVACY_POLICY_COOKIE_NAME}=`)
    );

    if (privacyPolicyCookie) {
      const value = privacyPolicyCookie.split('=')[1];
      return value === 'true';
    }

    return false;
  }, []);

  const removeCookie = useCallback(() => {
    document.cookie = `${PRIVACY_POLICY_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }, []);

  return {
    setAccepted: setCookie,
    removeCookie,
    getCookie
  };
};
