import { BASE_HORIZONTAL_PADINGS } from 'constant';
import type { Metadata } from 'next';
import Image from 'next/image';

import { AspectRatio, Flex, VStack } from '@chakra-ui/react';

import content from 'content';

import { BlurText, ContactUs, ServicesList } from 'components';

export const metadata: Metadata = {
  title: 'Услуги строительной компании | Nova Group',
  description:
    'Полный спектр строительных услуг: проектирование, строительство, отделка. Прозрачная смета, контроль качества, гарантия на работы.',
  keywords:
    'строительные услуги, проектирование, строительство, отделка, смета, гарантия, Nova Group',
  openGraph: {
    title: 'Услуги строительной компании | Nova Group',
    description:
      'Полный спектр строительных услуг: проектирование, строительство, отделка. Прозрачная смета, контроль качества, гарантия на работы.',
    type: 'website',
    url: 'https://ngnova.ru/services',
    siteName: 'Nova Group',
    images: [
      {
        url: '/assets/images/services_page/main_img.jpg',
        width: 1200,
        height: 630,
        alt: 'Услуги строительной компании Nova Group',
        type: 'image/jpeg'
      }
    ],
    locale: 'ru_RU',
    countryName: 'Russia'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Услуги строительной компании | Nova Group',
    description:
      'Полный спектр строительных услуг: проектирование, строительство, отделка. Прозрачная смета, контроль качества, гарантия на работы.',
    images: ['/assets/images/services_page/main_img.jpg']
  }
};

const Services = async () => {
  const services = content.services;

  return (
    <VStack
      gap={0}
      w='full'
      position='relative'
      justifyContent='flex-start'
      alignItems='center'
      flex={1}
      py={{ base: '16px', sm: '32px', md: '40px', lg: '60px' }}
    >
      <VStack
        w='full'
        position='relative'
        alignItems='center'
        justifyContent='center'
        overflow='hidden'
        px={BASE_HORIZONTAL_PADINGS}
      >
        <BlurText
          zIndex={2}
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
          color='black'
          whiteSpace='pre-line'
          cursor='default'
          userSelect='none'
          text={services.title}
          delay={150}
          animateBy='words'
          direction='top'
          className='text-2xl mb-8'
          letterSpacing={{
            base: 0,
            md: '4px'
          }}
        />
        <Flex
          w='full'
          gap={4}
          mb={{ base: 0, md: 4 }}
          flexDirection={{
            base: 'column-reverse',
            lg: 'row'
          }}
          justifyContent='center'
          alignItems={{
            base: 'center',
            lg: 'flex-start'
          }}
        >
          <ServicesList services={services.servicesList} />

          <AspectRatio
            ratio={2 / 3}
            w='full'
            position='relative'
            maxH='75vh'
            minW='40%'
            borderRadius='12px'
            overflow='hidden'
            display={{ base: 'none', md: 'block' }}
            maxW='400px'
          >
            <Image
              src={services.mainImg}
              alt='Услуги главная'
              fill
              priority
              style={{
                objectFit: 'cover',
                transition: 'opacity 0.3s ease'
              }}
              sizes='(max-width: 450px) 400px, (max-width: 768px) 768px, (max-width: 1200px) 1200px'
              placeholder='blur'
              blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
            />
          </AspectRatio>
        </Flex>

        <ContactUs />
      </VStack>
    </VStack>
  );
};

export default Services;
