'use client';

import { useRouter } from 'next/navigation';

import { Button, ButtonProps } from '@chakra-ui/react';

interface NavigationActionButton extends ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

const NavigationActionButton = ({
  onClick,
  label,
  href,
  ...styles
}: NavigationActionButton) => {
  const router = useRouter();

  const onNavigate = href ? () => router.push(href) : onClick;

  return (
    <Button
      onClick={onNavigate}
      w={{
        base: 'full',
        md: 300
      }}
      px={{
        base: '16px',
        md: '32px'
      }}
      py={{
        base: '16px',
        md: '24px'
      }}
      borderRadius='10px'
      fontFamily='body'
      colorScheme='blue'
      bg='#2d2d2d'
      m='0 auto'
      _hover={{
        bg: 'gray.600',
        color: 'white'
      }}
      {...styles}
    >
      {label}
    </Button>
  );
};

export default NavigationActionButton;
