import React, { useEffect, useState } from 'react';
import { SimpleGrid, Spinner, Center, Text } from '@chakra-ui/react';
import FoodCard from './FoodCard';
import axios from 'api/axios';

const FoodGrid = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('comments'); // Pastikan endpoint ini benar
        setFoods(response.data);
      } catch (err) {
        setError('Gagal memuat data makanan');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Group komentar berdasarkan item makanan dan ambil komentar terbaru
  const groupedFoods = Object.values(
    foods.reduce((acc, comment) => {
      const foodId = comment.ItemMakanan.id;
      if (
        !acc[foodId] ||
        new Date(comment.created_at) > new Date(acc[foodId].created_at)
      ) {
        acc[foodId] = comment;
      }
      return acc;
    }, {})
  );

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" color="green.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt={10}>
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
      {groupedFoods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </SimpleGrid>
  );
};

export default FoodGrid;
