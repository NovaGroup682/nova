'use client';

import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';

import content from 'content';

import { Modal } from 'ui';

interface ContactsInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactsInfoModal = ({ isOpen, onClose }: ContactsInfoModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} isDark>
    <VStack
      w='full'
      p={{
        base: '24px',
        md: '32px'
      }}
      gap={6}
      alignItems='flex-start'
    >
      <Text
        fontSize={{
          base: '24px',
          md: '28px'
        }}
        fontWeight='bold'
        color='black'
        textAlign='center'
        w='full'
      >
        Контакты
      </Text>

      <VStack gap={4} w='full' alignItems='flex-start'>
        <Flex
          w='full'
          justifyContent='space-between'
          flexDirection={{
            base: 'column',
            md: 'row'
          }}
        >
          <Box w='full'>
            <Text fontSize='16px' fontWeight='600' color='gray.700' mb={2}>
              Телефон
            </Text>
            <Link
              href={`tel:${content.contacts.phone}`}
              fontSize='18px'
              color='blue.600'
              _hover={{ textDecoration: 'underline' }}
            >
              {content.contacts.phone}
            </Link>
          </Box>

          <Box w='full'>
            <Text fontSize='16px' fontWeight='600' color='gray.700' mb={2}>
              Элктронная почта
            </Text>
            <Link
              href={`mailto:${content.contacts.email}`}
              fontSize='18px'
              color='blue.600'
              _hover={{ textDecoration: 'underline' }}
            >
              {content.contacts.email}
            </Link>
          </Box>
        </Flex>

        <Box>
          <Text fontSize='16px' fontWeight='600' color='gray.700' mb={2}>
            Адрес
          </Text>
          <Text fontSize='18px' color='gray.800'>
            {content.contacts.address}
          </Text>
        </Box>

        <Box>
          <Text fontSize='16px' fontWeight='600' color='gray.700' mb={3}>
            Социальные сети
          </Text>
          <Flex gap={2}>
            {content.contacts.socialLinks.map(({ link, alt, icon: Icon }) => (
              <Link
                key={alt}
                href={link}
                borderRadius='50%'
                bg='gray.100'
                w='50px'
                h='50px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                target='_blank'
                transition='all 0.3s ease'
                _hover={{
                  bg: 'gray.500',
                  transform: 'scale(1.1)',
                  '& svg': {
                    fill: 'white'
                  }
                }}
              >
                <Icon
                  fill='black'
                  width={24}
                  height={24}
                  transform='scale(1.1)'
                />
              </Link>
            ))}
          </Flex>
        </Box>
      </VStack>
    </VStack>
  </Modal>
);

export default ContactsInfoModal;
