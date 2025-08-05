'use client';

import DownloadIcon from '@assets/icons/arrow-down-to-bracket.svg';

import { Button } from '@chakra-ui/react';

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
    <Button
      my={6}
      onClick={handleDownload}
      size='2xl'
      bg='gray.500'
      color='white'
      _hover={{
        bg: 'gray.600'
      }}
      transition='all 0.3s ease'
      mr={2}
    >
      Скачать Cмету
      <DownloadIcon fill='white' />
    </Button>
  );
};

export default DownloadButton;
