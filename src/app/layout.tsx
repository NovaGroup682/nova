import config from 'config';
import type { Metadata } from 'next';

import { VStack } from '@chakra-ui/react';

import {
  Footer,
  Header,
  ScrollToTopButton,
  StickyContactButton
} from 'components';
import Providers from './providers';

import 'styles/global.css';

const {
  metadata: {
    title,
    description,
    favIcon,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    twitterCard,
    canonical
  }
} = config;

export const metadata: Metadata = {
  title,
  description,
  keywords,
  authors: [{ name: 'Nova Group' }],
  creator: 'Nova Group',
  publisher: 'Nova Group',
  applicationName: 'Nova Group',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  themeColor: '#000000',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL(config.metadata.domen),
  alternates: {
    canonical
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: canonical,
    siteName: 'Nova Group',
    images: ogImage
      ? [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: 'Nova Group - Проектирование и строительство современных домов',
            type: 'image/jpeg'
          }
        ]
      : [],
    locale: 'ru_RU',
    type: ogType || 'website',
    countryName: 'Russia'
  },
  twitter: {
    card: twitterCard || 'summary_large_image',
    title: ogTitle,
    description: ogDescription,
    images: ogImage ? [ogImage] : [],
    creator: '@novagroup',
    site: '@novagroup'
  },
  icons: [
    { rel: 'icon', url: favIcon.src },
    { rel: 'apple-touch-icon', url: '/assets/icons/apple-touch-icon.png' }
  ],
  manifest: '/manifest.json'
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='ru'>
    <body>
      <Providers>
        <Header />
        <VStack flex={1} gap={0} justifyContent='flex-start' w='full'>
          {children}
        </VStack>
        <Footer />
        <ScrollToTopButton />
        <StickyContactButton />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
