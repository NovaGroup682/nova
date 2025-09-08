import { lazy, Suspense } from 'react';
import config from 'config';
import { BASE_HORIZONTAL_PADINGS, maxWidth, paths } from 'constant';
import type { Metadata } from 'next';

import { For, Skeleton, Text, VStack } from '@chakra-ui/react';

import content from 'content';

import {
  AnimatedBlock,
  BackgroundImageWithLoader,
  BlurText,
  ContactBlock,
  MainProjectDescription,
  NavigationBlock
} from 'components';
import { NavigationActionButton } from 'ui';
import {
  faqStructuredData,
  organizationStructuredData,
  websiteStructuredData
} from './structured-data';

export const metadata: Metadata = {
  title: 'Nova Group - Главная | Строительная компания',
  description: config.metadata.description,
  keywords: config.metadata.keywords,
  openGraph: {
    title: 'Nova Group - Главная',
    description:
      'Проектирование, строительство и отделка жилых и коммерческих объектов',
    url: config.metadata.domen,
    siteName: 'Nova Group',
    images: [
      {
        url: '/assets/images/main_page/main.jpg',
        width: 1200,
        height: 630,
        alt: 'Nova Group - Главная страница'
      }
    ],
    locale: 'ru_RU',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nova Group - Главная',
    description:
      'Проектирование, строительство и отделка жилых и коммерческих объектов',
    images: ['/assets/images/main_page/main.jpg']
  },
  alternates: {
    canonical: config.metadata.domen
  }
};

const LazyProjectSliderBlock = lazy(() =>
  import('components/ProjectSliderBlock').then((module) => ({
    default: module.ProjectSliderBlock
  }))
);
const LazyCeoBlock = lazy(() =>
  import('components/CeoBlock').then((module) => ({
    default: module.CeoBlock
  }))
);

const LazyComponent = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Skeleton height='400px' />}>{children}</Suspense>
);

const Home = () => (
  <>
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationStructuredData)
      }}
    />
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteStructuredData)
      }}
    />
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqStructuredData)
      }}
    />
    <VStack gap={0} w='full' position='relative'>
      <BackgroundImageWithLoader
        src={content.main.mainImgBg}
        alt='Nova Group - Фоновая иллюстрация'
        position='absolute'
        w='full'
        h='100vh'
        top={{
          base: -88,
          md: -104,
          lg: -130
        }}
        priority
        sizes='100vw'
        objectFit='cover'
        objectPosition='right'
      />

      <VStack gap={0} w='full' maxW={maxWidth} px={BASE_HORIZONTAL_PADINGS}>
        <VStack
          w='full'
          flex={1}
          minH='100vh'
          position='relative'
          mt={{
            base: -88,
            md: -104,
            lg: -130
          }}
          justifyContent='center'
          alignItems='left'
          pb={{
            base: '160px',
            lg: 120
          }}
        >
          <For each={content.main.mainTitle}>
            {(item) => (
              <BlurText
                zIndex={2}
                key={item}
                as='h1'
                fontSize={{
                  base: '26px',
                  sm: '32px',
                  md: '42px',
                  lg: '56px',
                  xl: '72px'
                }}
                textAlign='left'
                fontWeight={400}
                color='white'
                whiteSpace='pre-line'
                cursor='default'
                userSelect='none'
                text={item}
                delay={150}
                animateBy='words'
                direction='top'
                className='text-2xl mb-8'
                letterSpacing={{
                  base: 0,
                  md: '4px'
                }}
              />
            )}
          </For>

          <MainProjectDescription />
        </VStack>

        <AnimatedBlock delay={0.3}>
          <Text
            as='h2'
            color='gray.800'
            mt='40px'
            py={{
              base: '20px',
              md: '40px'
            }}
            textAlign='center'
            fontSize={{
              base: '20px',
              md: '34px'
            }}
            lineHeight={{
              base: '30px',
              md: '52px'
            }}
            letterSpacing='1px'
          >
            {content.main.text1}
          </Text>
        </AnimatedBlock>

        <AnimatedBlock delay={0.5}>
          <Text
            as='h2'
            color='gray.900'
            textAlign='center'
            fontSize={{
              base: '20px',
              md: '34px'
            }}
            lineHeight={{
              base: '30px',
              md: '52px'
            }}
            fontWeight={700}
            letterSpacing='2px'
            whiteSpace='pre-line'
          >
            {content.main.text2}
          </Text>
        </AnimatedBlock>

        <LazyComponent>
          <AnimatedBlock delay={0.3}>
            <LazyCeoBlock />
          </AnimatedBlock>
        </LazyComponent>

        <LazyComponent>
          <AnimatedBlock delay={0.3}>
            <LazyProjectSliderBlock />
          </AnimatedBlock>
        </LazyComponent>

        <AnimatedBlock delay={0.3}>
          <NavigationActionButton
            label={content.common.allProjects}
            href={paths.projects}
            textTransform='uppercase'
            display={{ base: 'flex', md: 'none' }}
          />
        </AnimatedBlock>

        <AnimatedBlock delay={0.3}>
          <Text
            as='h2'
            color='gray.900'
            textAlign='center'
            fontSize={{
              base: '20px',
              md: '34px'
            }}
            lineHeight={{
              base: '30px',
              md: '52px'
            }}
            fontWeight={700}
            whiteSpace='pre-line'
            py={{ base: '10px', md: '20px' }}
          >
            {content.main.text3}
          </Text>
        </AnimatedBlock>

        <AnimatedBlock delay={0.3}>
          <NavigationBlock />
        </AnimatedBlock>

        <AnimatedBlock delay={0.3}>
          <ContactBlock />
        </AnimatedBlock>
      </VStack>
    </VStack>
  </>
);

export default Home;
