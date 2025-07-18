import Facebook from '@assets/icons/facebook.svg';
import Instagram from '@assets/icons/instagram.svg';
import VK from '@assets/icons/vk.svg';

import { SocialLinkTypes } from 'types';

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
