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
  {
    label: 'xs',
    value: ProjectSize.xs
  },
  {
    label: 's',
    value: ProjectSize.s
  },
  {
    label: 'm',
    value: ProjectSize.m
  },
  {
    label: 'l',
    value: ProjectSize.l
  },
  {
    label: 'xl',
    value: ProjectSize.xl
  }
];

export const GOOGLE_LINK = 'https://drive.google.com/uc?export=view&id=';
