import NextImage from 'next/image';
import Link from 'next/link';

import { Box, Stack, Text, VStack } from '@chakra-ui/react';

import content from 'content';

const NavigationBlock = () => (
  <Stack
    w='full'
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
    {content.main.navigationBlcok.map((nav, idx) => (
      <Box
        key={nav.title}
        height={{
          base: 300,
          md: 700
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
        <Box position='relative' width='100%' height={700}>
          <NextImage
            sizes='(max-width: 450px) 400px, 700px'
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'bottom'
            }}
            src={nav.img as unknown as string}
            alt={nav.title}
          />
        </Box>

        <Link href={nav.path}>
          <VStack
            position='absolute'
            p={6}
            top={0}
            left={0}
            bg='rgba(0, 0, 0, 0.3)'
            gap={0}
            w='full'
            h='full'
            justifyContent={idx % 2 ? 'flex-end' : 'flex-start'}
            alignItems='flex-start'
            whiteSpace='pre-line'
            transition='all 0.4s ease'
            _hover={{
              bg: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(1px)'
            }}
          >
            <Text fontWeight={600} color='white' fontSize={26}>
              {nav.title}
            </Text>
            {Array.isArray(nav.description) ? (
              <Box
                as='ul'
                listStyleType='disc'
                listStylePosition='outside'
                color='white'
                pl={6}
                w='full'
                ml={4}
              >
                {nav.description.map((li) => (
                  <Box as='li' key={li} mb={2} color='white'>
                    <Text lineHeight='22px' fontSize={22} color='white'>
                      {li}
                    </Text>
                  </Box>
                ))}
              </Box>
            ) : (
              <Text fontSize={22} color='white'>
                {nav.description}
              </Text>
            )}
          </VStack>
        </Link>
      </Box>
    ))}
  </Stack>
);

export default NavigationBlock;
