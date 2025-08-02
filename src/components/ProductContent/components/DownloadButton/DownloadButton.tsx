'use client';

import { keyframes } from '@emotion/react';
import { Button, Flex, Text } from '@chakra-ui/react';

// Define pulse animation keyframes
const pulseAnimation = keyframes`
  0% { 
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.7);
  }
  70% { 
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(66, 153, 225, 0);
  }
  100% { 
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(66, 153, 225, 0);
  }
`;

const DownloadButton = ({
  fileId,
  fileName
}: {
  fileId: string;
  fileName: string;
}) => {
  const handleDownload = () => {
    try {
      if (!fileId) {
        console.error('Invalid Google Drive URL');
        return;
      }

      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <Flex
      gap={4}
      alignItems='center'
      w='80%'
      mt={5}
      mb={{
        base: 5,
        md: 10
      }}
      flexDirection={{
        base: 'column',
        md: 'row'
      }}
    >
      <Button
        onClick={handleDownload}
        size='2xl'
        animation={`${pulseAnimation} 2s infinite`}
        bg='gray.500'
        color='white'
        _hover={{
          bg: 'gray.600',
          animation: 'none'
        }}
        transition='all 0.3s ease'
        mr={2}
      >
        Смета в PDF - скачать
      </Button>
      <Text
        textAlign={{
          base: 'center',
          md: 'left'
        }}
      >
        Внутри - полный росчёт стоимости строительство по этолом, с учётом
        материалов и робот Вы срозу понимаете, во сколько обойдётся дом, и
        можете трезво оценить бюджет - ещё до разговоро с менеджером.
      </Text>
    </Flex>
  );
};

export default DownloadButton;
