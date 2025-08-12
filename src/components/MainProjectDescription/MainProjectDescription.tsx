'use client';

import { useDisclosure } from '@chakra-ui/react';

import content from 'content';

import { ImagePopupButton } from 'ui';
import { MainDescriptionModal } from './components';

const MainProjectDescription = () => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ImagePopupButton
        src={content.main.mainPopupBg}
        onOpen={onOpen}
        customWidth={{
          base: 'full',
          sm: 360,
          hovered: 550,
          md: 450
        }}
        customHeight={{
          base: 240,
          sm: 240,
          hovered: 370,
          md: 300
        }}
      />

      <MainDescriptionModal isOpen={open} onClose={onClose} />
    </>
  );
};

export default MainProjectDescription;
