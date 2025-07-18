'use client';

import Image from 'next/image';

import {
  Box,
  Button,
  Collapsible,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';

import { useIsTouchDevice } from 'hooks';

import content from 'content';

import { ContactModal } from './components';

const ContactBlock = () => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();
  const {
    open: isHovered,
    onOpen: onMouseEnter,
    onClose: onMouseLeave
  } = useDisclosure();
  const { isTouch } = useIsTouchDevice();

  return (
    <VStack
      mb={12}
      position='relative'
      w='full'
      h={{
        base: '150px',
        md: '400px'
      }}
      borderRadius='2xl'
      overflow='hidden'
      justifyContent={{
        base: 'center',
        md: 'flex-end'
      }}
      transition='all 0.3s ease'
    >
      <Image
        sizes='(max-width: 450px) 400px, 1000px'
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        fill
        src={content.main.contactBlock.contactCover}
        alt='contact cover'
      />

      <VStack
        position='absolute'
        w='full'
        h='full'
        alignItems='center'
        justifyContent='flex-end'
        py={{ base: '16px', md: '32px' }}
        boxShadow='inset 0px -140px 40px -20px rgba(0, 0, 0, 0.42)'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {!isTouch && (
          <Collapsible.Root unmountOnExit open={isHovered} cursor='default'>
            <Collapsible.Content>
              <Box padding='4' mb={4}>
                <Text
                  fontWeight={600}
                  color='white'
                  fontSize={24}
                  whiteSpace='pre-line'
                  textAlign='center'
                >
                  {`Напишите нам если у вас остались вопросы,\nпоможем выбрать проект под ваш бюджет`}
                </Text>
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>
        )}
        <Button
          px={{
            base: '16px',
            md: '32px'
          }}
          py={{
            base: '16px',
            md: '24px'
          }}
          borderRadius='10px'
          fontFamily='body'
          bg='white'
          color='black'
          fontWeight='bold'
          onClick={onOpen}
          _hover={{
            bg: 'gray.700',
            color: 'white'
          }}
        >
          {content.common.call}
        </Button>
      </VStack>

      <ContactModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default ContactBlock;
