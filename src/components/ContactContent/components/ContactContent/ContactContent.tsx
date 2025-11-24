'use client';

import Telegram from '@assets/icons/telegram.svg';
import Whatsapp from '@assets/icons/whatsapp.svg';
import { BASE_HORIZONTAL_PADINGS, maxWidth } from 'constant';

import { Flex, Link, Text, VStack } from '@chakra-ui/react';

import content from 'content';

import { SocialLinksBlock } from 'components';
import { SocialButton } from 'ui';
import { Map } from '../Map';

interface ContactContentProps {
  email: string;
  address: string[];
  coordinates: number[];
  supplyDepartmentEmail: string;
  architecturalDepartment: {
    whatsapp: string;
    telegram: string;
  };
  constructionDepartment: {
    whatsapp: string;
    telegram: string;
  };
}

const ContactContent = ({
  email,
  address,
  coordinates,
  supplyDepartmentEmail,
  architecturalDepartment,
  constructionDepartment
}: ContactContentProps) => (
  <VStack
    gap={8}
    w='full'
    maxW={maxWidth}
    px={BASE_HORIZONTAL_PADINGS}
    py={{ base: '16px', sm: '32px', md: '40px', lg: '60px' }}
  >
    <Flex
      w='full'
      justifyContent='space-between'
      alignItems='center'
      flexDir={{
        base: 'column',
        md: 'row'
      }}
      gap={4}
    >
      <Text
        as='h2'
        fontSize={{
          base: '24px',
          md: '34px'
        }}
        lineHeight={{
          base: '30px',
          md: '52px'
        }}
      >
        Свяжитесь с нами удобным для вас способом
      </Text>
    </Flex>

    <Flex
      w='full'
      flexDirection={{
        base: 'column',
        md: 'row'
      }}
      gap={8}
    >
      <Flex
        gap={3}
        w='full'
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='space-between'
      >
        <Text
          fontWeight={400}
          as='h3'
          fontSize={{
            base: '20px',
            md: '24px'
          }}
          lineHeight={{
            base: '20px',
            md: '24px'
          }}
          whiteSpace='nowrap'
        >
          Архитектурный отдел
        </Text>
        <Flex w='full' justifyContent='flex-start' flexDirection='row' gap={4}>
          <SocialButton
            href={architecturalDepartment.whatsapp}
            Icon={Whatsapp}
          />
          <SocialButton
            href={architecturalDepartment.telegram}
            Icon={Telegram}
          />
        </Flex>
      </Flex>

      <Flex
        gap={3}
        w='full'
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='space-between'
      >
        <Text
          fontWeight={400}
          as='h3'
          fontSize={{
            base: '20px',
            md: '24px'
          }}
          lineHeight={{
            base: '20px',
            md: '24px'
          }}
          whiteSpace='nowrap'
        >
          Строительный отдел
        </Text>
        <Flex w='full' justifyContent='flex-start' flexDirection='row' gap={4}>
          <SocialButton
            href={constructionDepartment.whatsapp}
            Icon={Whatsapp}
          />
          <SocialButton
            href={constructionDepartment.telegram}
            Icon={Telegram}
          />
        </Flex>
      </Flex>

      <VStack
        gap={3}
        w='full'
        alignItems='flex-start'
        justifyContent='space-between'
      >
        <Text
          fontWeight={400}
          as='h3'
          fontSize={{
            base: '20px',
            md: '24px'
          }}
          lineHeight={{
            base: '20px',
            md: '24px'
          }}
        >
          Социальные сети
        </Text>
        <SocialLinksBlock />
      </VStack>
    </Flex>

    <Flex
      mt={4}
      w='full'
      alignItems='flex-start'
      flexDirection='column'
      gap={4}
    >
      <Flex gap={4}>
        <Text
          fontWeight={400}
          as='h3'
          fontSize={{
            base: '20px',
            md: '24px'
          }}
          lineHeight={{
            base: '20px',
            md: '24px'
          }}
          color='gray.600'
          whiteSpace='nowrap'
        >
          Позвоните нам:
        </Text>
        <Link
          href={`tel:${content.contacts.salesDepartmentPhone.replace(/\s|-/g, '')}`}
          w='full'
          cursor='pointer'
        >
          <Text
            fontWeight={400}
            as='h3'
            color='black'
            fontSize={{
              base: '20px',
              md: '22px'
            }}
            lineHeight={{
              base: '20px',
              md: '24px'
            }}
            whiteSpace='nowrap'
          >
            {content.contacts.salesDepartmentPhone}
          </Text>
        </Link>
      </Flex>
      <Flex gap={4}>
        <Text
          fontWeight={400}
          as='h3'
          fontSize={{
            base: '20px',
            md: '24px'
          }}
          lineHeight={{
            base: '20px',
            md: '24px'
          }}
          color='gray.600'
          whiteSpace='nowrap'
        >
          Отдел продаж:
        </Text>
        <Link href={`mailto:${email}`} w='full' cursor='pointer'>
          <Text
            fontWeight={400}
            as='h3'
            color='black'
            fontSize={{
              base: '20px',
              md: '24px'
            }}
            lineHeight={{
              base: '20px',
              md: '24px'
            }}
            whiteSpace='nowrap'
          >
            {email}
          </Text>
        </Link>
      </Flex>
      <Flex gap={4}>
        <Text
          fontWeight={400}
          as='h3'
          fontSize={{
            base: '20px',
            md: '24px'
          }}
          lineHeight={{
            base: '20px',
            md: '24px'
          }}
          color='gray.600'
          whiteSpace='nowrap'
        >
          Отдел снабжения:
        </Text>
        <Link
          href={`mailto:${supplyDepartmentEmail}`}
          w='full'
          cursor='pointer'
        >
          <Text
            fontWeight={400}
            as='h3'
            color='black'
            fontSize={{
              base: '20px',
              md: '24px'
            }}
            lineHeight={{
              base: '20px',
              md: '24px'
            }}
            whiteSpace='nowrap'
          >
            {supplyDepartmentEmail}
          </Text>
        </Link>
      </Flex>
    </Flex>
    <Map address={address} coordinates={coordinates} />
  </VStack>
);

export default ContactContent;
