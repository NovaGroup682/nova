'use client';

import { ElementType } from 'react';
import Telegram from '@assets/icons/telegram.svg';
import Whatsapp from '@assets/icons/whatsapp.svg';
import { BASE_HORIZONTAL_PADINGS, maxWidth } from 'constant';

import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';

import { SocialLinkTypes } from 'types';

import { SocialLinksBlock, YandexMap } from 'components';
import { SocialButton } from 'ui';

interface MapProps {
  address: string;
  coordinates: number[];
}

const Map = ({ address, coordinates }: MapProps) => (
  <VStack
    gap={3}
    w='full'
    alignItems='flex-start'
    justifyContent='space-between'
    mt={4}
  >
    <Flex
      w='full'
      justifyContent='space-between'
      flexDirection={{
        base: 'column',
        md: 'row'
      }}
      gap={2}
    >
      <Text
        fontWeight={400}
        as='h3'
        fontSize={{
          base: '20px',
          md: '24px'
        }}
        lineHeight={{
          base: '20px',
          md: '24px'
        }}
      >
        {address}
      </Text>
      <Text
        fontWeight={400}
        color='gray.200'
        fontSize={{
          base: '16px',
          md: '20px'
        }}
        lineHeight={{
          base: '16px',
          md: '20px'
        }}
      >
        Встречи в офисе по записи!
      </Text>
    </Flex>
    <Box w='full' h={{ base: '250px', md: '350px' }} py={2}>
      <YandexMap
        address={address}
        coordinates={coordinates}
        height='100%'
        width='100%'
      />
    </Box>
  </VStack>
);

export default Map;
