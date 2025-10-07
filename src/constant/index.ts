import Facebook from '@assets/icons/facebook.svg';
import Instagram from '@assets/icons/instagram.svg';
import VK from '@assets/icons/vk.svg';

import { ProjectSize, SocialLinkTypes } from 'types';

export const paths = {
  main: '/',
  projects: '/projects',
  project: '/project',
  design: '/design',
  services: '/services',
  supervision: '/supervision',
  contacts: '/contacts',
  policy: '/privacy-policy'
};

export const validatePhoneNumberCustom = (phone: string): boolean | string => {
  if (!phone) return 'Телефон обязателен';
  if (phone === '+7') return 'Введите номер телефона';

  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length !== 11)
    return 'Номер телефона должен содержать 11 цифр';
  if (!cleanPhone.startsWith('7')) return 'Номер должен начинаться с +7';

  return true;
};

export const SocialIcons = {
  [SocialLinkTypes.Facebook]: Facebook,
  [SocialLinkTypes.VK]: VK,
  [SocialLinkTypes.Instagram]: Instagram
};

export const PROJECT_SIZES = [
  // {
  //   label: '< 100',
  //   value: ProjectSize.xs
  // },
  {
    label: '100 - 149',
    value: ProjectSize.s
  },
  {
    label: '150 - 179',
    value: ProjectSize.m
  },
  {
    label: '180 - 220',
    value: ProjectSize.l
  },
  {
    label: '> 220',
    value: ProjectSize.xl
  }
];

export const PROJECT_FLOORS: number[] = [1, 2];

export const GOOGLE_LINK = 'https://drive.google.com/uc?export=view&id=';

export const maxWidth = 1920;

export const PROJECT_ASPECT_RATIO = 1920 / 1240;

export const BASE_HORIZONTAL_PADINGS = {
  base: '16px',
  sm: '32px',
  md: '60px',
  lg: '120px'
};
