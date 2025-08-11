import { BASE_HORIZONTAL_PADINGS, maxWidth } from 'constant';

import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';

import content from 'content';

import { YandexMap } from 'components';

const Contacts = () => (
  <VStack
    gap={0}
    w='full'
    position='relative'
    justifyContent='flex-start'
    alignItems='center'
    flex={1}
  >
    <VStack
      gap={8}
      w='full'
      maxW={maxWidth}
      px={BASE_HORIZONTAL_PADINGS}
      py={{ base: '16px', sm: '32px', md: '40px', lg: '60px' }}
    >
      <Flex
        w='full'
        justifyContent='space-between'
        alignItems='center'
        flexDir={{
          base: 'column',
          md: 'row'
        }}
        gap={4}
      >
        <Text
          as='h2'
          fontSize={{
            base: '24px',
            md: '34px'
          }}
          lineHeight={{
            base: '30px',
            md: '52px'
          }}
        >
          Свяжитесь с нами удобным для вас способом
        </Text>
      </Flex>

      <Flex w='full'>
        <VStack
          gap={3}
          w='full'
          alignItems='flex-start'
          justifyContent='space-between'
        >
          <Text
            fontWeight={400}
            as='h3'
            fontSize={{
              base: '20px',
              md: '24px'
            }}
            lineHeight={{
              base: '20px',
              md: '24px'
            }}
          >
            Связаться с нами
          </Text>
          <Flex w='full' flexDirection='column'>
            <Link
              href={`tel:${content.contacts.phone}`}
              fontSize={{
                base: '16px',
                md: '18px'
              }}
              w='full'
              color='gray.600'
              fontWeight='normal'
              _hover={{ textDecoration: 'underline' }}
            >
              {content.contacts.phone}
            </Link>
            <Link
              href={`mailto:${content.contacts.email}`}
              fontSize={{
                base: '16px',
                md: '18px'
              }}
              w='full'
              color='gray.600'
              fontWeight='normal'
              _hover={{ textDecoration: 'underline' }}
            >
              {content.contacts.email}
            </Link>
          </Flex>
        </VStack>
        <VStack
          gap={3}
          w='full'
          alignItems='flex-start'
          justifyContent='space-between'
        >
          <Text
            fontWeight={400}
            as='h3'
            fontSize={{
              base: '20px',
              md: '24px'
            }}
            lineHeight={{
              base: '20px',
              md: '24px'
            }}
          >
            Социальные сети
          </Text>
          <Flex w='full' flexDirection='column'>
            <Flex gap={4}>
              {content.contacts.socialLinks.map(({ link, alt, icon: Icon }) => (
                <Link
                  key={alt}
                  href={link}
                  borderRadius='50%'
                  bg='black'
                  w='50px'
                  h='50px'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  target='_blank'
                  transition='all 0.3s ease'
                  _hover={{
                    bg: 'gray.400',
                    transform: 'scale(1.1)',
                    '& svg': {
                      fill: 'black'
                    }
                  }}
                >
                  <Icon
                    fill='white'
                    width={16}
                    height={16}
                    transform='scale(1.5)'
                  />
                </Link>
              ))}
            </Flex>
          </Flex>
        </VStack>
      </Flex>
      <VStack
        gap={3}
        w='full'
        alignItems='flex-start'
        justifyContent='space-between'
        mt={4}
      >
        <Text
          fontWeight={400}
          as='h3'
          fontSize={{
            base: '20px',
            md: '24px'
          }}
          lineHeight={{
            base: '20px',
            md: '24px'
          }}
        >
          {content.contacts.address}
        </Text>
        <Box w='full' h={{ base: '250px', md: '350px' }} py={2}>
          <YandexMap
            address={content.contacts.address}
            height='100%'
            width='100%'
          />
        </Box>
      </VStack>
    </VStack>
  </VStack>
);

export default Contacts;
