'use client';

import { ElementType } from 'react';

import { Link, Text } from '@chakra-ui/react';

import { SocialLinkTypes } from 'types';

interface SocialButtonProps {
  href: string;
  Icon: ElementType;
  type?: SocialLinkTypes;
}

const SocialButton = ({ href, Icon, type }: SocialButtonProps) => (
  <Link
    href={href}
    borderRadius='50%'
    bg='black'
    w='50px'
    h='50px'
    display='flex'
    alignItems='center'
    justifyContent='center'
    target='_blank'
    transition='all 0.3s ease'
    position='relative'
    _hover={{
      bg: 'gray.500',
      transform: 'scale(1.1)'
    }}
  >
    <Icon fill='white' width={24} height={24} transform='scale(1.1)' />
    {type === SocialLinkTypes.Instagram && (
      <Text
        position='absolute'
        top='-5px'
        right='-2px'
        fontSize='18px'
        color='black'
        fontWeight='bold'
        borderRadius='50%'
        w='16px'
        h='16px'
        display='flex'
        alignItems='center'
        justifyContent='center'
        lineHeight='1'
      >
        *
      </Text>
    )}
  </Link>
);

export default SocialButton;
