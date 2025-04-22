import React from 'react';
import { HStack, VStack, Icon, Text, Box } from '@chakra-ui/react';
import { FaHamburger, FaPizzaSlice, FaIceCream, FaCoffee, FaCarrot, FaFish } from 'react-icons/fa';

const categories = [
  { icon: FaHamburger, label: 'Fastfood' },
  { icon: FaFish, label: 'Seafood' },
  { icon: FaPizzaSlice, label: 'Pizza' },
  { icon: FaCoffee, label: 'Drinks' },
  { icon: FaCarrot, label: 'Healthy' },
  { icon: FaIceCream, label: 'Dessert' },
];

const CategoryMenu = () => {
  return (
    <HStack spacing={6} wrap="wrap">
      {categories.map((cat, index) => (
        <VStack
          key={index}
          bg="gray.100"
          p={4}
          borderRadius="lg"
          w="100px"
          h="100px"
          justify="center"
          _hover={{ bg: "#1DA344", color: "white", cursor: "pointer" }}
          transition="all 0.3s ease"
        >
          <Icon as={cat.icon} boxSize={6} />
          <Text fontSize="sm" fontWeight="semibold">{cat.label}</Text>
        </VStack>
      ))}
    </HStack>
  );
};

export default CategoryMenu;
