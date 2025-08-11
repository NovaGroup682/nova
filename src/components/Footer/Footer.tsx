'use client';

import { BASE_HORIZONTAL_PADINGS, maxWidth, paths } from 'constant';
import NextLink from 'next/link';

import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';

import content from 'content';

import { CopyrightText, Logo } from 'ui';

const borderColor = 'gray.200';

const Footer = () => (
  <VStack
    gap={0}
    as='footer'
    width='full'
    position='relative'
    bg='gray.600'
    justifyContent='center'
  >
    <Flex
      gap={0}
      maxW={maxWidth}
      w='full'
      flexDirection={{
        base: 'column',
        md: 'row'
      }}
    >
      <Flex
        w={{
          base: 'full',
          md: '50%'
        }}
        justifyContent='space-between'
        px={BASE_HORIZONTAL_PADINGS}
        py={{ base: '16px', sm: '32px', md: '40px' }}
        borderRightWidth='0.5px'
        borderColor={borderColor}
      >
        <Logo />
        <VStack alignContent='center' justifyContent='flex-end'>
          {content.header.headerBtns.map((btn) => (
            <Link
              key={btn.label}
              href={btn.href}
              as={NextLink}
              fontFamily='body'
              fontSize={{
                base: '12px',
                md: '14px'
              }}
              w='full'
              color='white'
              fontWeight='normal'
              _hover={{
                color: 'gray.900',
                textDecoration: 'none'
              }}
              cursor='pointer'
              justifyContent='flex-start'
              _focus={{
                outlineWidth: 0
              }}
            >
              {btn.label}
            </Link>
          ))}
        </VStack>
      </Flex>
      <Flex
        w={{
          base: 'full',
          md: '50%'
        }}
        justifyContent='space-between'
        px={BASE_HORIZONTAL_PADINGS}
        py={{ base: '16px', sm: '32px', md: '40px' }}
        borderLeftWidth='0.5px'
        borderColor={borderColor}
      >
        <VStack alignContent='center' justifyContent='flex-start'>
          <Link
            href={`mailto:${content.contacts.email}`}
            fontSize={{
              base: '12px',
              md: '14px'
            }}
            w='full'
            color='white'
            fontWeight='normal'
            _hover={{ textDecoration: 'underline' }}
          >
            {content.contacts.email}
          </Link>
          <Link
            href={`tel:${content.contacts.phone}`}
            fontSize={{
              base: '12px',
              md: '14px'
            }}
            w='full'
            color='white'
            fontWeight='normal'
            _hover={{ textDecoration: 'underline' }}
          >
            {content.contacts.phone}
          </Link>
          <Text
            fontSize={{
              base: '12px',
              md: '14px'
            }}
            w='full'
            color='white'
            fontWeight='normal'
            whiteSpace='nowrap'
          >
            {content.contacts.address}
          </Text>
        </VStack>
        <Flex gap={2}>
          {content.contacts.socialLinks.map(({ link, alt, icon: Icon }) => (
            <Link
              key={alt}
              href={link}
              borderRadius='50%'
              bg='white'
              w='40px'
              h='40px'
              display='flex'
              alignItems='center'
              justifyContent='center'
              target='_blank'
              transition='all 0.3s ease'
              _hover={{
                bg: 'gray.400',
                transform: 'scale(1.1)',
                '& svg': {
                  fill: 'black'
                }
              }}
            >
              <Icon
                fill='black'
                width={16}
                height={16}
                transform='scale(1.1)'
              />
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
    <Box w='full' h='1px' bg={borderColor} />
    <Flex
      maxW={maxWidth}
      w='full'
      flexDirection={{
        base: 'column',
        md: 'row'
      }}
    >
      <Flex
        w={{
          base: 'full',
          md: '50%'
        }}
        justifyContent='space-between'
        alignItems='center'
        px={BASE_HORIZONTAL_PADINGS}
        py={{ base: '16px', sm: '24px', md: '32px' }}
        borderRightWidth='0.5px'
        borderColor={borderColor}
      >
        <CopyrightText
          color='white'
          whiteSpace='nowrap'
          fontSize={{
            base: '12px',
            md: '14px'
          }}
        />
        <Link
          href={paths.main}
          as={NextLink}
          fontFamily='body'
          fontSize={{
            base: '12px',
            md: '14px'
          }}
          w='full'
          color='white'
          fontWeight='normal'
          _hover={{
            color: 'gray.900',
            textDecoration: 'none'
          }}
          cursor='pointer'
          justifyContent='flex-end'
          _focus={{
            outlineWidth: 0
          }}
          textAlign='right'
        >
          {content.common.policy}
        </Link>
      </Flex>
      <Flex
        w={{
          base: 'full',
          md: '50%'
        }}
        justifyContent='space-between'
        alignItems='center'
        px={BASE_HORIZONTAL_PADINGS}
        pt={{ base: 0, sm: '24px', md: '32px' }}
        pb={{ base: '16px', sm: '24px', md: '32px' }}
        borderLeftWidth='0.5px'
        borderColor={borderColor}
      >
        <Text
          fontSize={{
            base: '12px',
            md: '14px'
          }}
          w='full'
          color='white'
          fontWeight='normal'
          textAlign={{
            base: 'center',
            md: 'left'
          }}
        >
          {content.contacts.law}
        </Text>
      </Flex>
    </Flex>
  </VStack>
);

export default Footer;
