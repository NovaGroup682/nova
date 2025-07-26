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
      justifyContent='center'
      bg={isMain ? 'transparent' : 'gray.600'}
    >
      <Flex
        justifyContent='space-between'
        maxW='1400px'
        width='full'
        px={{ base: '16px', sm: '32px', md: '60px', lg: '64px' }}
      >
        <Logo />

        <Flex
          alignItems='center'
          gap={2}
          display={{ base: 'none', lg: 'flex' }}
        >
          {content.header.headerBtns.map((btn) => (
            <MenuButton key={btn.label} {...btn} />
          ))}
        </Flex>
        <MenuToogler />
      </Flex>
    </Flex>
  );
};

export default Header;
