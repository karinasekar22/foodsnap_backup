import {
  HStack,
  VStack,
  Button,
  Box,
  Icon,
  Image,
  Text,
  Badge,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import axiosInstance from '../../../../../../api/axios';
import WishlistSlider from './WishlistSlider';

const WishlistCard = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axiosInstance.get('produk/item-makanan');
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
    <VStack align="flex-start" w="full" maxW="calc(100vw - 240px)">
      <Button
        mr={6}
        size="sm"
        colorScheme="green"
        variant="outline"
        fontWeight="semibold"
        alignSelf="flex-end"
      >
        + Wishlist
      </Button>
          <WishlistSlider>
            {foods.map((food, index) => (
              <Box
                key={index}
                minW="250px"
                bg="white"
                borderRadius="xl"
                boxShadow="md"
                overflow="hidden"
                transition="transform 0.3s"
                _hover={{ transform: 'scale(1.03)' }}
                px={4}
                py={4}
              >
                <VStack gap={4}>
                  <HStack align="flex-start" spacing={4}>
                    <Image
                      boxSize="125px"
                      src={`${process.env.REACT_APP_API_BACKEND}${food.photo_url}`}
                      alt={food.caption}
                      borderRadius="xl"
                      objectFit="cover"
                    />
                    <Box>
                      <VStack alignItems="flex-start">
                        <Text fontWeight="bold" fontSize="md">
                          {food.caption}
                        </Text>
                        <Badge
                          fontSize="12px"
                          px={2}
                          py={0.5}
                          colorScheme="green"
                        >
                          Makanan Berat
                        </Badge>
                        <Badge
                          fontSize="12px"
                          px={2}
                          py={0.5}
                          colorScheme="green"
                        >
                          Lokal Pride
                        </Badge>
                      </VStack>
                    </Box>
                  </HStack>

                  <HStack w="full" justify="space-between">
                    <HStack spacing={2}>
                      <Icon as={FaHeart} color="red.300" />
                      <Text fontSize="xs">150K Like It</Text>
                    </HStack>
                    <HStack spacing={2}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          color={
                            i < Math.floor(food.rating || 4)
                              ? 'yellow.400'
                              : 'gray.300'
                          }
                        />
                      ))}
                    </HStack>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </WishlistSlider>
    </VStack>
  );
};

export default WishlistCard;
