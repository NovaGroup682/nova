import { BASE_HORIZONTAL_PADINGS, maxWidth } from 'constant';

import { VStack } from '@chakra-ui/react';

import content from 'content';

import { ArchitecturalBlock } from 'components';

const Design = () => (
  <VStack
    gap={0}
    w='full'
    position='relative'
    justifyContent='flex-start'
    alignItems='center'
    flex={1}
  >
    <VStack
      gap={8}
      w='full'
      maxW={maxWidth}
      px={BASE_HORIZONTAL_PADINGS}
      py={{ base: '16px', sm: '32px', md: '40px', lg: '60px' }}
    >
      <ArchitecturalBlock {...content.design.architecturalSection} />
      <ArchitecturalBlock {...content.design.constructionSection} />
    </VStack>
  </VStack>
);

export default Design;
