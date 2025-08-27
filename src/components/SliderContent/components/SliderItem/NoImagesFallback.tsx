import { Text, VStack } from '@chakra-ui/react';

interface NoImagesFallbackProps {
  title?: string;
  subtitle?: string;
}

const NoImagesFallback = ({
  title = 'Изображения не найдены',
  subtitle = 'Для этого проекта пока нет изображений'
}: NoImagesFallbackProps) => (
  <VStack
    position='relative'
    w='full'
    h='full'
    borderRadius='2xl'
    overflow='hidden'
    justifyContent='center'
    alignItems='center'
    bg='gray.100'
    mb={4}
  >
    <Text fontSize='lg' color='gray.500' fontWeight='medium'>
      {title}
    </Text>
    <Text fontSize='sm' color='gray.400'>
      {subtitle}
    </Text>
  </VStack>
);

export default NoImagesFallback;
