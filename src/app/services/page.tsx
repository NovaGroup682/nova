import { BASE_HORIZONTAL_PADINGS } from 'constant';

import { VStack } from '@chakra-ui/react';

import content from 'content';

import { MainView, ServicesList } from 'components';

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
        <MainView
          title={services.title}
          description={services.description}
          src={services.mainImg}
        />

        <ServicesList services={services.servicesList} />
      </VStack>
    </VStack>
  );
};

export default Services;
