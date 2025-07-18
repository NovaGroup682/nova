import NextImage from 'next/image';

import { Image, Stack, Text, VStack } from '@chakra-ui/react';

import content from 'content';

const CeoBlock = () => (
  <Stack
    w={{
      base: 'calc(100% + 32px)',
      md: '80%'
    }}
    flexDir={{
      base: 'column',
      md: 'row'
    }}
    gap='24px'
    mt='60px'
    mb='40px'
  >
    {content.main.ceo.map((ceo) => (
      <VStack
        key={ceo.label}
        pt={{
          base: '16px',
          md: '65px'
        }}
        bg='gray.100'
        borderRadius={{
          base: 0,
          sm: '16px'
        }}
        justifyContent='space-between'
      >
        <Text
          pb={4}
          px={{
            base: '16px',
            md: '60px'
          }}
        >
          <Text as='span' fontWeight='bold'>
            {`${ceo.label}, `}
          </Text>

          {ceo.description}
        </Text>

        <Image
          px={{
            base: '16px',
            md: '60px'
          }}
          h={{
            base: '320px',
            md: '420px'
          }}
          w='full'
          as={NextImage}
          style={{
            objectFit: 'contain',
            objectPosition: 'bottom'
          }}
          src={ceo.img as unknown as string}
          alt={ceo.label}
        />
      </VStack>
    ))}
  </Stack>
);

export default CeoBlock;
