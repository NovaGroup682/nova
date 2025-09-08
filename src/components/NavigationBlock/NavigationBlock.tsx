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
            quality={70}
            placeholder='blur'
            blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
          />
        </Box>

        <Link href={nav.path}>
          <VStack
            position='absolute'
            p={6}
            top={0}
            left={0}
            bg='rgba(0, 0, 0, 0.3)'
            gap={{
              base: 2,
              md: 4
            }}
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
            <Text
              fontWeight={600}
              color='white'
              fontSize={{
                base: 22,
                md: 26
              }}
              lineHeight={{
                base: '24px',
                md: '26px'
              }}
            >
              {nav.title}
            </Text>
            {Array.isArray(nav.description) ? (
              <Box
                as='ul'
                listStyleType='disc'
                listStylePosition='outside'
                color='white'
                pl={{
                  base: 4,
                  md: 6
                }}
                w='full'
                ml={4}
              >
                {nav.description.map((li) => (
                  <Box as='li' key={li} mb={{ base: 1, md: 2 }} color='white'>
                    <Text
                      lineHeight={{
                        base: '20px',
                        md: '22px'
                      }}
                      fontSize={{
                        base: 18,
                        md: 22
                      }}
                      color='white'
                    >
                      {li}
                    </Text>
                  </Box>
                ))}
              </Box>
            ) : (
              <Text
                lineHeight={{
                  base: '20px',
                  md: '26px'
                }}
                fontSize={{
                  base: 18,
                  md: 22
                }}
                color='white'
              >
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
