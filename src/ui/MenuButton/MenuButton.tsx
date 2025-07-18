import NextLink from 'next/link';

import { Link, Text } from '@chakra-ui/react';

interface MenuButton {
  label: string;
  href: string;
}

const MenuButton = ({ label, href }: MenuButton) => (
  <Link
    px='24px'
    py='16px'
    borderRadius='10px'
    bg='gray.200'
    as={NextLink}
    href={href}
    _hover={{
      bg: 'gray.500',
      textDecoration: 'none'
    }}
    _focus={{
      outlineWidth: 0
    }}
  >
    <Text fontSize='16px' color='white' fontFamily='button' userSelect='none'>
      {label}
    </Text>
  </Link>
);

export default MenuButton;
