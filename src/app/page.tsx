import Image from 'next/image';

import { Box, For, Text, VStack } from '@chakra-ui/react';

import content from 'content';

import {
  AnimatedBlock,
  BlurText,
  CeoBlock,
  ContactBlock,
  MainProjectDescription,
  NavigationBlock,
  ProjectSliderBlock
} from 'components';

const Home = () => (
  <VStack gap={0} w='full' position='relative'>
    <Box
      position='absolute'
      w='full'
      h='100vh'
      top={{
        base: -88,
        md: -104,
        lg: -130
      }}
    >
      <Image
        src={content.main.mainImgBg}
        alt='Background'
        fill
        style={{
          objectFit: 'cover',
          objectPosition: 'right',
          zIndex: -1
        }}
        priority
        sizes='(max-width: 450px) 400px, 1200px'
        quality={75}
      />
    </Box>
    <VStack
      gap={0}
      w='full'
      maxW='1440px'
      px={{ base: '16px', sm: '32px', md: '60px', lg: '80px' }}
    >
      <VStack
        w='full'
        flex={1}
        minH='100vh'
        position='relative'
        mt={{
          base: -88,
          md: -104,
          lg: -130
        }}
        justifyContent='center'
        alignItems='left'
        pb={{
          base: '160px',
          lg: 120
        }}
      >
        <For each={content.main.mainTitle}>
          {(item) => (
            <BlurText
              key={item}
              as='h1'
              fontSize={{
                base: '20px',
                sm: '32px',
                md: '42px',
                lg: '56px',
                xl: '72px'
              }}
              textAlign='left'
              fontWeight={600}
              color='white'
              whiteSpace='pre-line'
              cursor='default'
              userSelect='none'
              text={item}
              delay={150}
              animateBy='words'
              direction='top'
              className='text-2xl mb-8'
            />
          )}
        </For>

        <MainProjectDescription />
      </VStack>

      <AnimatedBlock delay={0.3}>
        <Text
          as='h2'
          color='gray.800'
          mt='40px'
          py='40px'
          textAlign='center'
          fontSize={{
            base: '20px',
            md: '34px'
          }}
          lineHeight={{
            base: '30px',
            md: '52px'
          }}
        >
          {content.main.text1}
        </Text>
      </AnimatedBlock>

      <AnimatedBlock delay={0.5}>
        <Text
          as='h2'
          color='gray.900'
          textAlign='center'
          fontSize={{
            base: '20px',
            md: '34px'
          }}
          lineHeight={{
            base: '30px',
            md: '52px'
          }}
          fontWeight={700}
        >
          {content.main.text2}
        </Text>
      </AnimatedBlock>
      <AnimatedBlock delay={0.3}>
        <CeoBlock />
      </AnimatedBlock>
      <AnimatedBlock delay={0.3}>
        <ProjectSliderBlock />
      </AnimatedBlock>

      <AnimatedBlock delay={0.3}>
        <Text
          as='h2'
          color='gray.900'
          textAlign='center'
          fontSize={{
            base: '20px',
            md: '34px'
          }}
          lineHeight={{
            base: '30px',
            md: '52px'
          }}
          fontWeight={700}
          whiteSpace='pre-line'
          py={{ base: '10px', md: '20px' }}
        >
          {content.main.text3}
        </Text>
      </AnimatedBlock>

      <AnimatedBlock delay={0.3}>
        <NavigationBlock />
      </AnimatedBlock>
      <AnimatedBlock delay={0.3}>
        <ContactBlock />
      </AnimatedBlock>
    </VStack>
  </VStack>
);

export default Home;
