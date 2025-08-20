'use client';

import { useState } from 'react';
import { BASE_HORIZONTAL_PADINGS } from 'constant';
import { AnimatePresence, motion } from 'framer-motion';

import { AspectRatio, Box, Flex, Text, VStack } from '@chakra-ui/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 100,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const
    }
  },
  exit: {
    opacity: 0,
    x: -50,
    scale: 0.8,
    transition: {
      duration: 0.3
    }
  }
};

interface ServicesListProps {
  services: {
    label: string;
    list: string[];
  }[];
}

const ServicesList = ({ services }: ServicesListProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <Flex
      w='full'
      h='full'
      px={BASE_HORIZONTAL_PADINGS}
      justifyContent='flex-end'
      bg='linear-gradient(to left, #52525b 70%, transparent 60%)'
      borderBottomWidth={2}
      alignItems='center'
    >
      <AspectRatio
        w='40%'
        maxW='600px'
        ratio={1 / 1}
        bg='gray.200'
        borderRadius='12px'
      >
        <VStack w='full' px={4}>
          {services.map((service, index) => (
            <Box
              key={service.label}
              w='full'
              pl={4}
              cursor='pointer'
              transition='all 0.3s ease'
              onClick={() => setActiveIndex(index)}
            >
              <Text
                fontSize={{
                  base: '16px',
                  md: index === activeIndex ? '24px' : '18px'
                }}
                fontWeight='bold'
                color={
                  index === activeIndex ? 'white' : 'rgba(236, 236, 236, 1)'
                }
                textShadow={
                  index === activeIndex
                    ? '1px 1px 14px rgba(255, 255, 255, 0.25)'
                    : 'none'
                }
                transition='all 0.3s ease'
                lineHeight='36px'
                _hover={{
                  color: index === activeIndex ? 'white' : 'black'
                }}
              >
                {service.label}
              </Text>
            </Box>
          ))}
        </VStack>
      </AspectRatio>
      <VStack
        w='60%'
        height='full'
        px={4}
        justifyContent='center'
        alignItems='flex-end'
      >
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeIndex}
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}
          >
            {services[activeIndex].list.map((item) => (
              <motion.div
                key={`${activeIndex}-${item}`}
                variants={itemVariants}
                style={{ width: '100%' }}
              >
                <Text
                  pl='20%'
                  fontSize={{
                    base: '16px',
                    md: '24px'
                  }}
                  fontWeight='bold'
                  color='white'
                  textAlign='right'
                  transition='all 0.3s ease'
                  lineHeight='36px'
                  _hover={{
                    color: 'white'
                  }}
                >
                  {item}
                </Text>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </VStack>
    </Flex>
  );
};

export default ServicesList;
