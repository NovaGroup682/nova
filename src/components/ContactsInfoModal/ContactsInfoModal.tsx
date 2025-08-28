'use client';

import Telegram from '@assets/icons/telegram.svg';
import Whatsapp from '@assets/icons/whatsapp.svg';

import { Flex, Link, Text, VStack } from '@chakra-ui/react';

import content from 'content';

import { Modal, SocialButton } from 'ui';

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
      gap={4}
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
        Архитектурный отдел
      </Text>

      <Flex w='full' justifyContent='center' flexDirection='row' gap={4}>
        <SocialButton
          href={content.contacts.architecturalDepartment.whatsapp}
          Icon={Whatsapp}
        />
        <SocialButton
          href={content.contacts.architecturalDepartment.telegram}
          Icon={Telegram}
        />
      </Flex>
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
        Строительный отдел
      </Text>

      <Flex
        w='full'
        justifyContent='space-around'
        flexDirection={{
          base: 'column',
          md: 'row'
        }}
        gap={{
          base: 2,
          md: 0
        }}
      >
        <VStack gap={0}>
          <Text
            textAlign='center'
            fontSize='16px'
            fontWeight='600'
            color='gray.700'
            mb={{ base: 0, md: 2 }}
          >
            Телефон
          </Text>
          <Link
            href={`tel:${content.contacts.phone}`}
            fontSize='18px'
            color='blue.600'
            _hover={{ textDecoration: 'underline' }}
            textAlign='center'
          >
            {content.contacts.salesDepartmentPhone}
          </Link>
        </VStack>

        <VStack gap={0}>
          <Text
            textAlign='center'
            fontSize='16px'
            fontWeight='600'
            color='gray.700'
            mb={{ base: 0, md: 2 }}
          >
            Элктронная почта
          </Text>
          <Link
            href={`mailto:${content.contacts.salesDepartmentEmail}`}
            fontSize='18px'
            color='blue.600'
            _hover={{ textDecoration: 'underline' }}
            textAlign='center'
          >
            {content.contacts.salesDepartmentEmail}
          </Link>
        </VStack>
      </Flex>
      <Flex w='full' justifyContent='center' flexDirection='row' gap={4}>
        <SocialButton
          href={content.contacts.constructionDepartment.whatsapp}
          Icon={Whatsapp}
        />
        <SocialButton
          href={content.contacts.constructionDepartment.telegram}
          Icon={Telegram}
        />
      </Flex>
    </VStack>
  </Modal>
);

export default ContactsInfoModal;
