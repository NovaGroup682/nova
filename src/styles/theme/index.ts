import colors from 'constant/colors';
import localFont from 'next/font/local';

import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const MagistralCTT = localFont({
  src: [
    {
      path: '../../../public/fonts/MagistralCTT.ttf',
      weight: '400',
      style: 'normal'
    }
  ]
});

const spartan = localFont({
  src: [
    {
      path: '../../../public/fonts/spartan-mb.regular.otf',
      weight: '400',
      style: 'normal'
    }
  ]
});

const config = defineConfig({
  theme: {
    tokens: {
      colors: colors,
      fonts: {
        button: { value: spartan.style.fontFamily },
        body: { value: MagistralCTT.style.fontFamily }
      }
    },

    breakpoints: {
      base: '0em', // 0px
      sm: '30em', // ~480px
      md: '48em', // ~768px
      lg: '62em', // ~992px
      xl: '80em', // ~1280px
      '2xl': '90em', // ~1440px
      '3xl': '100em' // ~1600px
    }
  }
});

const system = createSystem(defaultConfig, config);

export default system;
