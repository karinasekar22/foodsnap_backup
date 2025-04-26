import React from 'react';
import { SimpleGrid, Center, Text } from '@chakra-ui/react';
import FoodCardCategories from './FoodCardCategories';

const FoodGridCategories = ({ foods }) => {
  if (!foods || foods.length === 0) {
    return (
      <Center mt={10}>
        <Text color="gray.500">Tidak ada makanan ditemukan.</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
      {foods.map((food) => (
        <FoodCardCategories key={food.id || food.ItemMakanan?.id} food={food} />
      ))}
    </SimpleGrid>
  );
};

export default FoodGridCategories;
