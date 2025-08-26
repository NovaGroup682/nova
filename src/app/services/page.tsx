import { BASE_HORIZONTAL_PADINGS } from 'constant';
import Image from 'next/image';

import { AspectRatio, Flex, VStack } from '@chakra-ui/react';

import content from 'content';

import { BlurText, ContactBlock, ServicesList } from 'components';

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
          mb={4}
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
                // filter: isImageLoading ? 'blur(10px)' : 'none'
              }}
              sizes='(max-width: 450px) 400px, 700px'
              // onLoad={() => setIsImageLoading(false)}
              // onError={() => setIsImageLoading(false)}
            />
          </AspectRatio>
        </Flex>

        <ContactBlock mb={{ base: 4, md: 0 }} />
      </VStack>
    </VStack>
  );
};

export default Services;
