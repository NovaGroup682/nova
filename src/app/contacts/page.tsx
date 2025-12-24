import { bodyLink } from 'constant';
import type { Metadata } from 'next';

import { VStack } from '@chakra-ui/react';

import content from 'content';

import { ContactContent } from 'components/ContactContent';

export const metadata: Metadata = {
  title: 'Контакты | Nova Group - Строительная компания',
  description:
    'Контактная информация Nova Group. Адрес: Москва, Очаковское ш., д.34. Телефон: +7 985 999-46-00. Свяжитесь с нами для консультации.',
  keywords:
    'контакты, Nova Group, строительная компания, Москва, телефон, адрес, консультация',
  openGraph: {
    title: 'Контакты | Nova Group - Строительная компания',
    description:
      'Контактная информация Nova Group. Адрес: Москва, Очаковское ш., д.34. Телефон: +7 985 999-46-00. Свяжитесь с нами для консультации.',
    type: 'website',
    url: 'https://ngnova.ru/contacts',
    siteName: 'Nova Group',
    images: [
      {
        url: bodyLink + '/main_page/main.jpg',
        width: 1200,
        height: 630,
        alt: 'Контакты Nova Group - Строительная компания',
        type: 'image/jpeg'
      }
    ],
    locale: 'ru_RU',
    countryName: 'Russia'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Контакты | Nova Group - Строительная компания',
    description:
      'Контактная информация Nova Group. Адрес: Москва, Очаковское ш., д.34. Телефон: +7 985 999-46-00.',
    images: [bodyLink + '/main_page/main.jpg']
  }
};

const Contacts = () => (
  <VStack
    gap={0}
    w='full'
    position='relative'
    justifyContent='flex-start'
    alignItems='center'
    flex={1}
  >
    <ContactContent
      email={content.contacts.email}
      address={content.contacts.address}
      coordinates={content.contacts.coordinates}
      supplyDepartmentEmail={content.contacts.supplyDepartmentEmail}
      architecturalDepartment={content.contacts.architecturalDepartment}
      constructionDepartment={content.contacts.constructionDepartment}
    />
  </VStack>
);

export default Contacts;
