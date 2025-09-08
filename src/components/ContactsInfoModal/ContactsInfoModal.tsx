'use client';

import Telegram from '@assets/icons/telegram.svg';
import Whatsapp from '@assets/icons/whatsapp.svg';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { usePrivacyPolicyCookie } from 'hooks';

import content from 'content';

import { Modal, SocialButton } from 'ui';
import { PrivacyPolicyCheckbox } from '../PrivacyPolicyCheckbox';

interface ContactsInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactsInfoModal = ({ isOpen, onClose }: ContactsInfoModalProps) => {
  const { isAccepted, setAccepted } = usePrivacyPolicyCookie();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isDark>
      <Box
        position='absolute'
        top={0}
        left={0}
        right={0}
        bottom={0}
        display={!isAccepted ? 'flex' : 'none'}
        alignItems='center'
        justifyContent='center'
        zIndex={10}
        bg='rgba(255, 255, 255, 0.5)'
        backdropFilter='blur(6px)'
      >
        <Flex
          gap={4}
          w='full'
          p={6}
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Text fontSize='18px' fontWeight='bold' mb={4} color='gray.500'>
            Согласие с политикой конфиденциальности
          </Text>
          <PrivacyPolicyCheckbox
            value={isAccepted}
            onChange={setAccepted}
            color='gray.500'
            fontSize={14}
            linkColor='black'
            linkHoverColor='blue.400'
          />
          <Text fontSize='14px' color='gray.500' mt={3}>
            Для продолжения необходимо принять политику конфиденциальности
          </Text>
        </Flex>
      </Box>

      <VStack
        w='full'
        p={{
          base: '24px',
          md: '32px'
        }}
        gap={4}
        alignItems='flex-start'
        position='relative'
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
          Напишите нам
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
        {/* <Text
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
              Электронная почта
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
        </Flex> */}
      </VStack>
    </Modal>
  );
};

export default ContactsInfoModal;
