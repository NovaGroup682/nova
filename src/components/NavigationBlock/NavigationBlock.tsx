import NextImage from 'next/image';
import Link from 'next/link';

import { Box, Stack, Text, VStack } from '@chakra-ui/react';

import content from 'content';

const NavigationBlock = () => (
  <Stack
    w={{
      md: 'full'
    }}
    flexDir={{
      base: 'column',
      md: 'row'
    }}
    gap={{
      base: '16px',
      md: '24px'
    }}
    my='40px'
  >
    {content.main.navigationBlcok.map((nav) => (
      <Box
        key={nav.title}
        height={{
          base: 300,
          md: 500
        }}
        width='full'
        bg='gray.100'
        w='full'
        borderRadius={{
          base: '16px',
          md: '16px'
        }}
        justifyContent='center'
        position='relative'
        overflow='hidden'
      >
        <Link href={nav.path}>
          <Box position='relative' width='100%' height={500}>
            <NextImage
              sizes='(max-width: 450px) 400px, 500px'
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'bottom'
              }}
              src={nav.img as unknown as string}
              alt={nav.title}
            />
          </Box>
        </Link>

        <VStack
          position='absolute'
          top={6}
          left={6}
          gap={0}
          w='full'
          justifyContent='flex-start'
          alignItems='flex-start'
        >
          <Text fontWeight={600} color='white'>
            {nav.title}
          </Text>
          <Text color='white'>{nav.description}</Text>
        </VStack>
      </Box>
    ))}
  </Stack>
);

export default NavigationBlock;
