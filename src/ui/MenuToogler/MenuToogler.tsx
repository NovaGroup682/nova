'use client';

import Bars from '@assets/icons/bars.svg';
import Xmark from '@assets/icons/circle-xmark.svg';
import { BASE_HORIZONTAL_PADINGS } from 'constant';
import NextLink from 'next/link';

import {
  Box,
  Drawer,
  Flex,
  Link,
  Portal,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';

import content from 'content';

import { CopyrightText } from 'ui/CopyrightText';
import { Logo } from 'ui/Logo';

const MenuToogler = () => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex display={{ base: 'flex', lg: 'none' }} alignItems='center'>
      <Drawer.Root open={isOpen} onOpenChange={onOpen} size='full'>
        <Drawer.Trigger asChild>
          <Box aria-label='menu-button' bg='none' p={0}>
            <Bars fill='white' width='30px' height='30px' />
          </Box>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content
              px={BASE_HORIZONTAL_PADINGS}
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(5rem)'
              }}
            >
              <Drawer.Header
                px={0}
                py={{ base: 4, md: 6, xl: 8 }}
                justifyContent='space-between'
                alignItems='center'
              >
                <Logo />

                <Box onClick={onClose} bg='none' p={0}>
                  <Xmark fill='white' width='30px' height='30px' />
                </Box>
              </Drawer.Header>
              <Drawer.Body pb='200px' px={0}>
                <VStack
                  gap={{
                    base: 6,
                    md: 10
                  }}
                  alignItems={{
                    base: 'left',
                    md: 'right'
                  }}
                  h='full'
                  justifyContent='center'
                >
                  {content.header.headerBtns.map((btn) => (
                    <Link
                      key={btn.label}
                      as={NextLink}
                      href={btn.href}
                      onClick={onClose}
                      _hover={{
                        bg: 'gray.500',
                        textDecoration: 'none'
                      }}
                      _focus={{
                        outlineWidth: 0,
                        '& p': {
                          color: 'black'
                        }
                      }}
                    >
                      <Text
                        w='full'
                        textAlign={{
                          base: 'left',
                          md: 'right'
                        }}
                        color='white'
                        fontWeight='600'
                        fontSize={{
                          base: '32px',
                          md: '36px'
                        }}
                      >
                        {btn.label}
                      </Text>
                    </Link>
                  ))}
                </VStack>
              </Drawer.Body>
              <Drawer.Footer justifyContent='flex-start' pb={8} px={0}>
                <CopyrightText
                  w='full'
                  textAlign={{
                    base: 'left',
                    md: 'center'
                  }}
                  fontSize={{
                    base: '12px',
                    md: '16px'
                  }}
                  color='white'
                />
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Flex>
  );
};

export default MenuToogler;
