import { VStack } from '@chakra-ui/react';

import content from 'content';

import { ServicesList } from 'components';

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
    >
      <VStack
        w='full'
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
        <ServicesList services={services} />
      </VStack>
    </VStack>
  );
};

export default Services;
