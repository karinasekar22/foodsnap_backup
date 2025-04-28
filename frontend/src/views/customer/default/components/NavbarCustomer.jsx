import React from 'react';
import {
  HStack, Box, Avatar, IconButton, Text, Spacer, Image
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import logoImage from 'assets/img/homepage/logo.png';


const NavbarCustomer = () => {
  return (
    <HStack
      px={6}
      py={4}
      bg="white"
      borderBottom="1px solid #e2e8f0"
      boxShadow="sm"
    >
      <Image src={logoImage}  alt="FoodSnap Logo"
        h={{ base: '10px', md: '10px' }}
        maxW="100%"
        objectFit="contain"
        alignSelf="center" />
      <Text fontWeight="bold" fontSize="lg" ml={2}>FoodSnap</Text>

      <Spacer />

      <HStack spacing={4}>
        <IconButton
          icon={<BellIcon />}
          aria-label="Notifications"
          variant="ghost"
        />
        <Avatar name="SnapLover" size="sm" />
      </HStack>
    </HStack>
  );
};

export default NavbarCustomer;
