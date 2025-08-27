import { Box, Text } from '@chakra-ui/react';

interface ImageErrorFallbackProps {
  message?: string;
  subMessage?: string;
}

const ImageErrorFallback = ({
  message = 'Ошибка загрузки изображения',
  subMessage = 'Попробуйте обновить страницу'
}: ImageErrorFallbackProps) => (
  <Box
    zIndex={10}
    display='flex'
    flexDirection='column'
    alignItems='center'
    gap={3}
    textAlign='center'
    px={4}
  >
    <Text fontSize='lg' color='gray.500' fontWeight='medium'>
      {message}
    </Text>
    <Text fontSize='sm' color='gray.400'>
      {subMessage}
    </Text>
  </Box>
);

export default ImageErrorFallback;
