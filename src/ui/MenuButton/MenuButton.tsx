'use client';

import { usePathname } from 'next/navigation';

import { Box, Text } from '@chakra-ui/react';

import { ChakraNextLink } from 'ui/ChakraNextLink';

interface MenuButtonProps {
  label: string;
  href: string;
}

const MenuButton = ({ label, href }: MenuButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Box
      position='relative'
      display='inline-block'
      height='24px'
      _hover={{
        '& .underline': {
          transform: 'scaleX(1)'
        }
      }}
      _active={{
        '& .menu-text': {
          color: 'gray.400'
        },
        '& .underline': {
          bg: 'gray.400'
        }
      }}
    >
      <ChakraNextLink
        href={href}
        py='16px'
        borderRadius='10px'
        position='relative'
        bg='transparent'
        _focus={{ outlineWidth: 0 }}
        _hover={{ textDecoration: 'none' }}
      >
        <Text
          className='menu-text'
          textTransform='uppercase'
          fontSize='16px'
          color={{
            base: isActive ? 'black' : 'white',
            md: 'white'
          }}
          userSelect='none'
          lineHeight='16px'
          _active={{ color: 'red.500' }}
        >
          {label}
        </Text>
      </ChakraNextLink>
      <Box
        className='underline'
        position='absolute'
        bottom='-2px'
        left={0}
        right={0}
        height='2px'
        bg='white'
        transform={isActive ? 'scaleX(1)' : 'scaleX(0)'}
        transformOrigin='left'
        transition='transform 0.5s ease'
      />
    </Box>
  );
};

export default MenuButton;
