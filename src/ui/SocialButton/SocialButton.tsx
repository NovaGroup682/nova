'use client';

import { ElementType } from 'react';

import { Link } from '@chakra-ui/react';

interface SocialButtonProps {
  href: string;
  Icon: ElementType;
}

const SocialButton = ({ href, Icon }: SocialButtonProps) => (
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
    _hover={{
      bg: 'gray.500',
      transform: 'scale(1.1)'
    }}
  >
    <Icon fill='white' width={24} height={24} transform='scale(1.1)' />
  </Link>
);

export default SocialButton;
