import { Box, Spinner, Text } from '@chakra-ui/react';

interface SliderLoaderProps {
  message?: string;
}

const SliderLoader = ({
  message = 'Загрузка слайдера...'
}: SliderLoaderProps) => (
  <Box
    position='absolute'
    top='50%'
    left='50%'
    transform='translate(-50%, -50%)'
    zIndex={20}
    display='flex'
    flexDirection='column'
    alignItems='center'
    gap={3}
  >
    <Spinner color='gray.600' size='xl' />
    <Text fontSize='sm' color='gray.600'>
      {message}
    </Text>
  </Box>
);

export default SliderLoader;
