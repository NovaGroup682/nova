import Facebook from '@assets/icons/facebook.svg';
import Instagram from '@assets/icons/instagram.svg';
import VK from '@assets/icons/vk.svg';

import { ProjectSize, SocialLinkTypes } from 'types';

export const paths = {
  main: '/',
  projects: '/projects',
  design: '/design',
  supervision: '/supervision',
  contacts: '/contacts'
};

export const phoneRegExp = /^\+?[0-9]{7,15}$/;

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
  // {
  //   label: '100 - 125',
  //   value: ProjectSize.s
  // },
  {
    label: '150 - 180',
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
