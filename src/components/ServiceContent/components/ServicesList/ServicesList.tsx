'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const
    }
  }
};

const collapseVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut' as const
    }
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut' as const
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
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0])); // По умолчанию открыт первый элемент

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <Flex
      w='full'
      h='full'
      justifyContent='center'
      alignItems='center'
      my={{
        base: 2,
        md: 4
      }}
    >
      <VStack w='full' gap={4} align='stretch'>
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            style={{ width: '100%' }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.label}
                variants={itemVariants}
                style={{ width: '100%', marginBottom: '16px' }}
              >
                <Box
                  w='full'
                  bg='white'
                  borderRadius='12px'
                  overflow='hidden'
                  transition='all 0.3s ease'
                  _hover={{
                    transform: 'translateY(-2px)',
                    '& h2': {
                      color: 'gray.500'
                    }
                  }}
                >
                  {/* Header с label */}
                  <Box
                    w='full'
                    px={{
                      base: 0,
                      md: 6
                    }}
                    pt={{
                      base: 0,
                      md: 6
                    }}
                    cursor='pointer'
                    onClick={() => toggleItem(index)}
                    transition='all 0.3s ease'
                  >
                    <HStack justify='space-between' align='center'>
                      <Text
                        as='h2'
                        color='gray.900'
                        transition='all 0.3s ease'
                        textAlign={{
                          base: 'left',
                          md: 'center'
                        }}
                        fontSize={{
                          base: '20px',
                          md: '34px'
                        }}
                        lineHeight={{
                          base: '30px',
                          md: '52px'
                        }}
                        fontWeight={700}
                        letterSpacing='2px'
                      >
                        {service.label}
                      </Text>
                      <Box
                        transform={
                          openItems.has(index)
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)'
                        }
                        transition='transform 0.3s ease'
                        fontSize='20px'
                        color='gray.600'
                      >
                        ▼
                      </Box>
                    </HStack>
                  </Box>

                  {/* Collapsible content с list */}
                  <AnimatePresence>
                    {openItems.has(index) && (
                      <motion.div
                        initial='collapsed'
                        animate='expanded'
                        exit='collapsed'
                        variants={collapseVariants}
                        style={{ overflow: 'hidden' }}
                      >
                        <Box bg='white' p={6}>
                          <VStack gap={3} align='stretch'>
                            {service.list.map((item, itemIndex) => (
                              <motion.div
                                key={`${index}-${itemIndex}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: itemIndex * 0.1 }}
                              >
                                <HStack align='flex-start' gap={3}>
                                  <Box
                                    w='6px'
                                    h='6px'
                                    borderRadius='50%'
                                    bg='gray.400'
                                    mt={3}
                                    flexShrink={0}
                                  />
                                  <Text
                                    cursor='default'
                                    fontSize={{
                                      base: '16px',
                                      md: '18px'
                                    }}
                                    color='gray.700'
                                    fontWeight='medium'
                                    lineHeight='1.6'
                                    transition='all 0.3s ease'
                                  >
                                    {item}
                                  </Text>
                                </HStack>
                              </motion.div>
                            ))}
                          </VStack>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </VStack>
    </Flex>
  );
};

export default ServicesList;
