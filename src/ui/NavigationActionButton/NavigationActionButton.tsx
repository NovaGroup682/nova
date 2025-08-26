'use client';

import { useRouter } from 'next/navigation';

import { Button, ButtonProps } from '@chakra-ui/react';

interface NavigationActionButton extends ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  isNegative?: boolean;
}

const NavigationActionButton = ({
  onClick,
  label,
  href,
  isNegative = false,
  ...styles
}: NavigationActionButton) => {
  const router = useRouter();

  const onNavigate = href ? () => router.push(href) : onClick;

  return (
    <Button
      onClick={onNavigate}
      w={{
        base: isNegative ? '80%' : 'full',
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
      bg={isNegative ? 'gray.100' : '#2d2d2d'}
      color={isNegative ? 'black' : 'white'}
      m='0 auto'
      _hover={{
        bg: isNegative ? 'gray.200' : 'gray.600',
        color: 'white'
      }}
      {...styles}
    >
      {label}
    </Button>
  );
};

export default NavigationActionButton;
