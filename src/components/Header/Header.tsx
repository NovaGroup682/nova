'use client';

import { paths } from 'constant';
import { usePathname } from 'next/navigation';

import { Flex } from '@chakra-ui/react';

import content from 'content';

import { Logo, MenuButton, MenuToogler } from 'ui';

const Header = () => {
  const pathName = usePathname();

  const isMain = pathName === paths.main;

  return (
    <Flex
      h={{
        base: '88px',
        md: '104px',
        lg: '130px'
      }}
      as='header'
      width='full'
      zIndex={20}
      py={{ base: 4, md: 6, xl: 8 }}
      px={{ base: '16px', sm: '32px', md: '60px', lg: '64px' }}
      justifyContent='space-between'
      maxW='1400px'
      bg={isMain ? 'transparent' : 'gray.800'}
    >
      <Logo />

      <Flex alignItems='center' gap={2} display={{ base: 'none', lg: 'flex' }}>
        {content.header.headerBtns.map((btn) => (
          <MenuButton key={btn.label} {...btn} />
        ))}
      </Flex>
      <MenuToogler />
    </Flex>
  );
};

export default Header;
