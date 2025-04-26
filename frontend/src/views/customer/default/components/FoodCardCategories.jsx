import React, { useState, useEffect } from 'react';
import {
  Box, Image, Text, Badge, HStack, VStack, Icon, useToast
} from '@chakra-ui/react';
import { FaStar, FaHeart, FaBookmark } from 'react-icons/fa';
import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'api/axios';

const FoodCardCategories = ({ food }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const item = food;

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
        if (!user) return;

        const res = await axios.get(`${process.env.REACT_APP_API_BACKEND}/api/wishlist/user/${user.id}`);
        const wishlistItems = res.data || [];

        const found = wishlistItems.some(wish => wish.item_makanan_id === item.id);
        setIsWishlisted(found);
      } catch (error) {
        console.error('Gagal mengambil wishlist user:', error);
      }
    };

    checkWishlist();
  }, [item.id]);

  const handleCardClick = () => {
    navigate(`/customer/produk/${item.id}`);
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();

    try {
      const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
      if (!user) {
        toast({
          title: 'Login Dulu',
          description: 'Anda harus login untuk menambahkan ke wishlist.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_API_BACKEND}/api/wishlist/add`, {
        user_id: user.id,
        item_makanan_id: item.id,
      });

      console.log('Wishlist berhasil ditambahkan:', response.data);
      toast({
        title: 'Berhasil!',
        description: 'Item ditambahkan ke wishlist.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsWishlisted(true); // Ubah state wishlist
    } catch (error) {
      console.error('Gagal menambahkan ke wishlist:', error);
      toast({
        title: 'Error!',
        description: 'Gagal menambahkan item ke wishlist.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="md"
      overflow="hidden"
      transition="transform 0.3s"
      _hover={{ transform: "scale(1.03)" }}
      cursor="pointer"
      onClick={handleCardClick}
    >
      <Box position="relative">
        <Image
          src={`${process.env.REACT_APP_API_BACKEND}${item.photo_url}`}
          alt={item.caption}
          w="100%"
          h="150px"
          objectFit="cover"
        />
        <Icon
          as={FaBookmark}
          color={isWishlisted ? "green.600" : "white"}
          position="absolute"
          top={2}
          right={2}
          boxSize={6}
          cursor="pointer"
          onClick={handleAddToWishlist}
        />
      </Box>
      <Box p={4}>
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">{item.caption}</Text>
          <HStack spacing={1}>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                color={i < Math.floor(item.rating) ? 'yellow.400' : 'gray.300'}
              />
            ))}
            <Text fontSize="sm">{item.rating}</Text>
          </HStack>
        </VStack>
        <HStack justify="space-between" mt={2}>
          <Badge colorScheme="green">{item.Kategori?.nama || 'Belum Memiliki Kategori'}</Badge>
          <Icon as={FaHeart} color="red.300" />
        </HStack>
      </Box>
    </Box>
  );
};

export default FoodCardCategories;
