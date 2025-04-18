// layouts/LayoutCustomer.js
import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export default function CustomerLayout() {
  return (
    <Flex direction="column" minH="100vh">
      <Box bg="blue.600" p={4} color="white">
        <Text fontWeight="bold">Customer Dashboard</Text>
      </Box>

      <Box p={6} flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
}
