import { BASE_HORIZONTAL_PADINGS, maxWidth } from 'constant';
import type { Metadata } from 'next';

import { Box, Text, VStack } from '@chakra-ui/react';

import content from 'content';

import {
  AnimatedBlock,
  ArchitecturalBlock,
  BackgroundImageWithLoader,
  DesignContact
} from 'components';

export const metadata: Metadata = {
  title: 'Индивидуальное проектирование домов | Nova Group',
  description:
    'Индивидуальное проектирование современных домов. Создаем дом с нуля под ваш стиль жизни, участок и бюджет. Полный комплект документации.',
  keywords:
    'индивидуальное проектирование, архитектурный проект, строительство, дом на заказ, Nova Group',
  openGraph: {
    title: 'Индивидуальное проектирование домов | Nova Group',
    description:
      'Индивидуальное проектирование современных домов. Создаем дом с нуля под ваш стиль жизни, участок и бюджет.',
    type: 'website',
    url: 'https://ngnova.ru/design',
    siteName: 'Nova Group',
    images: [
      {
        url: '/assets/images/design_page/main_background.jpg',
        width: 1200,
        height: 630,
        alt: 'Индивидуальное проектирование домов - Nova Group',
        type: 'image/jpeg'
      }
    ],
    locale: 'ru_RU',
    countryName: 'Russia'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Индивидуальное проектирование домов | Nova Group',
    description:
      'Индивидуальное проектирование современных домов. Создаем дом с нуля под ваш стиль жизни, участок и бюджет.',
    images: ['/assets/images/design_page/main_background.jpg']
  }
};

const Design = async () => (
  <VStack
    gap={0}
    w='full'
    position='relative'
    justifyContent='flex-start'
    alignItems='center'
    flex={1}
  >
    <BackgroundImageWithLoader
      src={content.design.mainImg}
      alt='Услуги - Фоновая иллюстрация'
      position='absolute'
      w='full'
      h='100vh'
      top={{
        base: -88,
        md: -104,
        lg: -130
      }}
      priority
      sizes='(max-width: 450px) 400px, 1200px'
      objectFit='cover'
      objectPosition='center'
    />
    <VStack
      w='full'
      px={BASE_HORIZONTAL_PADINGS}
      h={{
        base: 'calc(100vh - 88px)',
        md: 'calc(100vh - 104px)',
        lg: 'calc(100vh - 130px)'
      }}
      position='relative'
      alignItems='center'
      justifyContent='center'
      overflow='hidden'
    >
      <Box
        position='absolute'
        top={0}
        left={0}
        w='full'
        h='full'
        bg='linear-gradient(360deg, rgba(0, 0, 0, 0.6), transparent)'
        zIndex={0}
      />

      <VStack
        gap={6}
        textAlign='center'
        color='white'
        zIndex={1}
        maxW='1200px'
        px={4}
      >
        <AnimatedBlock delay={0.2}>
          <Text
            fontSize={{
              base: '32px',
              md: '48px',
              lg: '56px'
            }}
            fontWeight='bold'
            lineHeight='1.2'
            textShadow='2px 2px 4px rgba(0, 0, 0, 0.5)'
          >
            {content.design.main}
          </Text>
        </AnimatedBlock>

        <AnimatedBlock delay={0.4}>
          <Text
            fontSize={{
              base: '18px',
              md: '24px',
              lg: '28px'
            }}
            fontWeight='medium'
            opacity={0.9}
            textShadow='1px 1px 2px rgba(0, 0, 0, 0.5)'
          >
            {content.design.subTitle}
          </Text>
        </AnimatedBlock>

        <AnimatedBlock delay={0.6}>
          <Text
            fontSize={{
              base: '16px',
              md: '18px',
              lg: '20px'
            }}
            textAlign='center'
            opacity={0.8}
            lineHeight='1.6'
            textShadow='1px 1px 2px rgba(0, 0, 0, 0.5)'
          >
            {content.design.desciption}
          </Text>
        </AnimatedBlock>
      </VStack>
    </VStack>
    <VStack
      gap={{
        base: 4,
        md: 8
      }}
      w='full'
      maxW={maxWidth}
      px={BASE_HORIZONTAL_PADINGS}
      py={{ base: '16px', sm: '32px', md: '40px', lg: '60px' }}
    >
      <ArchitecturalBlock {...content.design.architecturalSection} />
      <ArchitecturalBlock {...content.design.constructionSection} />
      <DesignContact />
    </VStack>
  </VStack>
);

export default Design;
