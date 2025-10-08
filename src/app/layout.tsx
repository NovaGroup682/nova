import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
    { rel: 'icon', url: favIcon.src, sizes: '32x32', type: 'image/x-icon' },
    { rel: 'icon', url: '/assets/logo_small.svg', sizes: 'any', type: 'image/svg+xml' },
    { rel: 'apple-touch-icon', url: '/assets/logo_small.svg', sizes: '180x180' },
    { rel: 'shortcut icon', url: favIcon.src },
    { rel: 'mask-icon', url: '/assets/logo_small.svg', color: '#000000' }
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
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
