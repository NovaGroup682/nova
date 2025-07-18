import { Text, VStack } from '@chakra-ui/react';

const Home = () => (
  <VStack
    gap={0}
    w='full'
    position='relative'
    justifyContent='center'
    alignItems='center'
    flex={1}
  >
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
    >
      Проекты и цены
    </Text>
  </VStack>
);

export default Home;
