'use client';

import { useState } from 'react';
import CheckCircleIcon from '@assets/icons/check.svg';
import CloseIcon from '@assets/icons/circle-xmark.svg';

import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Text,
  VStack
} from '@chakra-ui/react';

import { formatCurrency } from 'helpers';

import content from 'content';

interface ProjectConfigurationsTableProps {
  prices: number[];
}

const ProjectConfigurationsTable = ({
  prices
}: ProjectConfigurationsTableProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <VStack w='full' gap={4} align='stretch'>
      <Text
        fontSize={{ base: 20, md: 28 }}
        fontWeight='bold'
        mb={4}
        textAlign='center'
      >
        В стоимость входит
      </Text>

      {/* Header Row for Configurations and Prices */}
      <Grid templateColumns={`1fr repeat(4, 1fr)`} gap={2} alignItems='center'>
        <GridItem>
          <Text fontWeight='bold' fontSize={{ base: 14, md: 16 }}>
            Комплектации
          </Text>
        </GridItem>
        {content.projectDetails.titlesRow.map((title) => (
          <GridItem key={title} textAlign='center'>
            <Text fontWeight='bold' fontSize={{ base: 14, md: 16 }}>
              {title}
            </Text>
          </GridItem>
        ))}
      </Grid>

      {/* Price Row - Clickable to expand/collapse */}
      <Grid
        templateColumns={`1fr repeat(4, 1fr)`}
        gap={2}
        alignItems='center'
        py={2}
        borderBottom='1px solid'
        borderColor='gray.200'
        cursor='pointer'
        onClick={toggleExpanded}
        _hover={{
          bg: 'gray.50'
        }}
        transition='background-color 0.2s ease-in-out'
      >
        <GridItem>
          <Text fontWeight='bold' fontSize={{ base: 14, md: 16 }}>
            Цена
          </Text>
        </GridItem>
        {prices.map((price, index) => (
          <GridItem key={index} textAlign='center'>
            <Text
              fontSize={{ base: 12, md: 16 }}
              color='green.500'
              fontWeight='semibold'
              whiteSpace='nowrap'
            >
              {formatCurrency(price)}
            </Text>
          </GridItem>
        ))}
      </Grid>

      {/* Animated Collapsible Content */}
      <Box
        overflow='hidden'
        maxHeight={isExpanded ? '1000px' : '0px'}
        opacity={isExpanded ? 1 : 0}
        transition='all 0.3s ease-in-out'
      >
        <VStack w='full' gap={2} align='stretch'>
          {content.projectDetails.bodyRows.map((feature, featureIndex) => (
            <Grid
              key={featureIndex}
              templateColumns={`1fr repeat(4, 1fr)`}
              gap={2}
              alignItems='center'
              py={2}
              borderBottom={
                featureIndex < content.projectDetails.bodyRows.length - 1
                  ? '1px solid'
                  : 'none'
              }
              borderColor='gray.100'
            >
              <GridItem>
                <Text fontWeight='medium' fontSize={{ base: 13, md: 15 }}>
                  {feature.name}
                </Text>
              </GridItem>
              {content.projectDetails.titlesRow.map((title, configIndex) => (
                <GridItem key={configIndex} textAlign='center'>
                  {feature.included[title as keyof typeof feature.included] ? (
                    <Icon as={CheckCircleIcon} color='green.500' w={5} h={5} />
                  ) : (
                    <Icon as={CloseIcon} color='red.400' w={4} h={4} />
                  )}
                </GridItem>
              ))}
            </Grid>
          ))}
        </VStack>
      </Box>

      <Button onClick={toggleExpanded} colorScheme='blue'>
        {isExpanded ? 'Свернуть' : 'Показать все детали'}
      </Button>
    </VStack>
  );
};

export default ProjectConfigurationsTable;
