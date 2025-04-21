import React from 'react';
import { HStack, VStack, Box } from '@chakra-ui/react';
import NavbarCustomer from './NavbarCustomer';
import SidebarCustomer from './SidebarCustomer';

const LayoutCustomer = ({ children }) => {
  return (
    <VStack spacing={0} align="stretch">
      <NavbarCustomer />
      <HStack spacing={0} align="stretch" flex="1">
        <SidebarCustomer />
        <Box flex="1" bg="gray.50" p={4}>
          {children}
        </Box>
      </HStack>
    </VStack>
  );
};

export default LayoutCustomer;
