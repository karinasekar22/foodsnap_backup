import React from 'react';
import {
  Box, Image, Text, Badge, HStack, VStack, Icon
} from '@chakra-ui/react';
import { FaStar, FaHeart, FaBookmark } from 'react-icons/fa';
import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons';

const FoodCard = ({ food }) => {
  const item = food.ItemMakanan;

  console.log("Response Food", food);
  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="md"
      overflow="hidden"
      transition="transform 0.3s"
      _hover={{ transform: "scale(1.03)" }}
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
          color="white"
          position="absolute"
          top={2}
          right={2}
          boxSize={6}
          cursor="pointer"
          onClick={() => alert('Add to wishlist')} // Placeholder action
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

          <Text fontSize="xs" color="gray.500">{food.User.username || '-'}</Text>
          <Text fontSize="sm" color="gray.700" mt={2} noOfLines={2}>
            "{food.content}"
          </Text>
        </VStack>
        <HStack justify="space-between" mt={2}>
          <Badge colorScheme="green">{food.ItemMakanan.Kategori.nama || 'Belum Memiliki Kategori'}</Badge>
          <Icon as={FaHeart} color="red.300" />
        </HStack>
      </Box>
    </Box>
  );
};

export default FoodCard;
