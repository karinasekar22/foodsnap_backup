// layouts/LayoutUmkm.js
import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export default function OwnerLayout() {
  return (
    <Flex direction="column" minH="100vh">
      <Box bg="orange.500" p={4} color="white">
        <Text fontWeight="bold">UMKM Dashboard</Text>
      </Box>

      <Box p={6} flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
}
