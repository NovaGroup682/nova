import config from 'config';
import type { Metadata } from 'next';

import { VStack } from '@chakra-ui/react';

import { Footer, Header } from 'components';
import Providers from './providers';

import 'styles/global.css';

const {
  metadata: { title, description, favIcon }
} = config;

export const metadata: Metadata = {
  title,
  description,
  icons: [{ rel: 'icon', url: favIcon.src }]
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='en'>
    <head title={title}></head>
    <body>
      <Providers>
        <Header />
        <VStack flex={1} gap={0} justifyContent='flex-start' w='full'>
          {children}
        </VStack>
        <Footer />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
