'use client';

import Facebook from '@assets/icons/facebook.svg';
import Instagram from '@assets/icons/instagram.svg';
import Pinterest from '@assets/icons/pinterest.svg';
import Telegram from '@assets/icons/telegram.svg';
import VK from '@assets/icons/vk.svg';
import Whatsapp from '@assets/icons/whatsapp.svg';
import Youtube from '@assets/icons/youtube.svg';

import { Flex } from '@chakra-ui/react';

import { SocialLinkTypes } from 'types';
import content from 'content';

import { SocialButton } from 'ui';

const socialLinks = content.contacts.socialLinks;
const socialIcons = {
  [SocialLinkTypes.Facebook]: Facebook,
  [SocialLinkTypes.VK]: VK,
  [SocialLinkTypes.Instagram]: Instagram,
  [SocialLinkTypes.Whatsapp]: Whatsapp,
  [SocialLinkTypes.Telegram]: Telegram,
  [SocialLinkTypes.Pinterest]: Pinterest,
  [SocialLinkTypes.Youtube]: Youtube
};

const SocialLinksBlock = () => (
  <Flex gap={4}>
    {socialLinks.map(({ link, alt, type }) => {
      const Icon = socialIcons[type];
      if (!Icon) return null;

      return <SocialButton key={alt} href={link} Icon={Icon} type={type} />;
    })}
  </Flex>
);

export default SocialLinksBlock;
