import React, { useEffect, useState } from 'react';
import { HStack, VStack, Icon, Text, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'api/axios';
import {
  FaHamburger, FaPizzaSlice, FaIceCream, FaCoffee, FaCarrot, FaFish, FaUtensils
} from 'react-icons/fa';

const iconMap = {
  fastfood: FaHamburger,
  seafood: FaFish,
  pizza: FaPizzaSlice,
  drinks: FaCoffee,
  healthy: FaCarrot,
  dessert: FaIceCream
};

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BACKEND}/api/kategori/AllCategory`);
        setCategories(res.data || []);
      } catch (err) {
        console.error('Gagal memuat kategori:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Spinner size="lg" color="green.400" />;
  }

  return (
    <HStack spacing={6} wrap="wrap">
      {categories.map((cat) => {
        const iconKey = cat.nama?.toLowerCase();
        const IconComponent = iconMap[iconKey] || FaUtensils;

        return (
          <VStack
            key={cat.id}
            bg="gray.100"
            p={4}
            borderRadius="lg"
            w="100px"
            h="100px"
            justify="center"
            _hover={{ bg: "#1DA344", color: "white", cursor: "pointer" }}
            transition="all 0.3s ease"
            onClick={() => navigate(`/customer/categories/${cat.id}`)}
          >
            <Icon as={IconComponent} boxSize={6} />
            <Text fontSize="sm" fontWeight="semibold">{cat.nama}</Text>
          </VStack>
        );
      })}
    </HStack>
  );
};

export default CategoryMenu;
