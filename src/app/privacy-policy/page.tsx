import config from 'config';
import { BASE_HORIZONTAL_PADINGS, maxWidth } from 'constant';

import { Box, HStack, Link, Text, VStack } from '@chakra-ui/react';

import { renderTextWithLinks } from 'helpers';

import content from 'content';

const renderText = (text: string) => {
  const processedText = renderTextWithLinks(
    text,
    config.metadata.domen,
    content.contacts.email
  );

  if (processedText.includes('<strong>') || processedText.includes('<a ')) {
    const parts = processedText.split(
      /(<strong>.*?<\/strong>|<a[^>]*>.*?<\/a>)/
    );
    return parts.map((part, index) => {
      if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
        const strongText = part.replace(/<\/?strong>/g, '');
        return (
          <Text
            key={index}
            as='span'
            fontWeight='bold'
            fontSize={{ base: '12px', md: '14px' }}
            lineHeight='1.6'
            color='gray.200'
          >
            {strongText}
          </Text>
        );
      }
      if (part.startsWith('<a ')) {
        const hrefMatch = part.match(/href="([^"]*)"/);
        const textMatch = part.match(/>([^<]*)</);
        const href = hrefMatch ? hrefMatch[1] : '#';
        const linkText = textMatch ? textMatch[1] : '';

        return (
          <Link
            key={index}
            href={href}
            color='blue.600'
            textDecoration='underline'
            _hover={{ color: 'blue.700' }}
            fontSize={{ base: '12px', md: '14px' }}
            lineHeight='1.6'
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {linkText}
          </Link>
        );
      }
      return (
        <Text
          key={index}
          as='span'
          fontSize={{ base: '12px', md: '14px' }}
          lineHeight='1.6'
          color='gray.200'
        >
          {part}
        </Text>
      );
    });
  }

  return (
    <Text
      fontSize={{ base: '12px', md: '14px' }}
      lineHeight='1.6'
      color='gray.200'
    >
      {processedText}
    </Text>
  );
};

const Policy = () => (
  <VStack
    gap={6}
    w='full'
    maxW='1200px'
    mx='auto'
    maxWidth={maxWidth}
    px={BASE_HORIZONTAL_PADINGS}
    py={{ base: '16px', sm: '32px', md: '40px', lg: '60px' }}
    position='relative'
    justifyContent='flex-start'
    alignItems='stretch'
    flex={1}
  >
    <Text
      as='h1'
      color='gray.900'
      textAlign='left'
      fontSize={{
        base: '24px',
        md: '36px',
        lg: '42px'
      }}
      lineHeight={{
        base: '32px',
        md: '44px',
        lg: '50px'
      }}
      fontWeight={700}
    >
      {content.privacyPolicy.title}
    </Text>

    <VStack gap={6} align='stretch' textAlign='left'>
      {content.privacyPolicy.sections.map((section) => (
        <Box key={section.id}>
          <Text
            as='h2'
            fontSize={{ base: '20px', md: '24px' }}
            fontWeight={600}
            color='gray.800'
            mb={2}
          >
            {section.id}. {section.title}
          </Text>
          <VStack gap={2} align='stretch' pl={{ base: 0, md: 6 }}>
            {section.introText && (
              <Text
                fontSize={{ base: '12px', md: '14px' }}
                lineHeight='1.6'
                color='gray.200'
                fontWeight={600}
                mb={2}
              >
                {renderTextWithLinks(
                  section.introText,
                  config.metadata.domen,
                  content.contacts.email
                )}
              </Text>
            )}
            {section.items.map((item, index) => (
              <Box key={item}>
                <HStack align='flex-start' gap={0} w='full'>
                  <Text
                    fontSize={{ base: '12px', md: '14px' }}
                    fontWeight='bold'
                    color='gray.400'
                    flexShrink={0}
                    mt={0.5}
                    mr={2}
                    minW='18px'
                  >
                    {`${section.id}.${index + 1}`}
                  </Text>
                  <Box flex={1}>{renderText(item)}</Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  </VStack>
);

export default Policy;
