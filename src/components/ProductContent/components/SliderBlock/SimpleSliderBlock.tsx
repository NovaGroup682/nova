import { AspectRatio, Box, Image, Text, VStack } from '@chakra-ui/react';

import { getSafeImageUrl } from 'helpers';

interface SimpleSliderBlockProps {
  sliders: string[];
}

const SimpleSliderBlock = ({ sliders }: SimpleSliderBlockProps) => {
  const hasImages = sliders && sliders.length > 0;

  if (!hasImages) {
    return (
      <AspectRatio ratio={7 / 4} w='full'>
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
            Изображения не найдены
          </Text>
          <Text fontSize='sm' color='gray.400'>
            Для этого проекта пока нет изображений
          </Text>
        </VStack>
      </AspectRatio>
    );
  }

  const firstImage = sliders[0];

  return (
    <AspectRatio ratio={7 / 4} w='full'>
      <Box
        position='relative'
        w='full'
        h='full'
        borderRadius='2xl'
        overflow='hidden'
        mb={4}
        boxShadow={{
          base: 'inset 0px -90px 40px -20px rgba(0, 0, 0, 0.42)',
          md: 'inset 0px -140px 40px -20px rgba(0, 0, 0, 0.42)'
        }}
      >
        <Image
          src={getSafeImageUrl(firstImage)}
          alt='Project image'
          w='full'
          h='full'
          objectFit='cover'
          objectPosition='center'
        />
        {sliders.length > 1 && (
          <Box
            position='absolute'
            top='10px'
            right='10px'
            bg='rgba(0, 0, 0, 0.7)'
            color='white'
            px={2}
            py={1}
            borderRadius='md'
            fontSize='sm'
          >
            +{sliders.length - 1} фото
          </Box>
        )}
      </Box>
    </AspectRatio>
  );
};

export default SimpleSliderBlock;
