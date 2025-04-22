import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import CategoryMenu from './CategoryMenu';
import FoodGrid from './FoodGrid';

const DashboardCustomer = () => {
  return (
    <Box px={{ base: 4, md: 12 }} py={6}>
      <VStack align="start" spacing={4}>
        <Heading size="lg" fontFamily="Poppins, sans-serif">Dashboard</Heading>
        <Text color="gray.500" fontFamily="Poppins, sans-serif">
          Hi, <strong>SnapLover</strong>! Welcome back! 👋
        </Text>
        <CategoryMenu />
        <FoodGrid />
      </VStack>
    </Box>
  );
};

export default DashboardCustomer;
