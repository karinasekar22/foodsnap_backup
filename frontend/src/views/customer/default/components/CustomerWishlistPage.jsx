import React, { useEffect, useState } from 'react';
import { Box, Heading, Spinner, Text, VStack, Center, Image, Button, useToast } from '@chakra-ui/react';
import LayoutCustomer from '../components/LayoutCustomer';
import axios from 'api/axios';
import { Link } from 'react-router-dom';

const CustomerWishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BACKEND}/api/wishlist/`);
      console.log("Response data:", res.data.WishlistFoods);
      setWishlistItems(res.data.WishlistFoods || []);
    } catch (err) {
      setError('Gagal memuat wishlist.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (itemId) => {
    if (!itemId) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_BACKEND}/api/wishlist/remove/${itemId}`);
      toast({
        title: 'Berhasil dihapus.',
        description: 'Item dihapus dari wishlist.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Refresh data wishlist setelah hapus
      setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Gagal menghapus item:', error);
      toast({
        title: 'Gagal menghapus.',
        description: 'Terjadi kesalahan saat menghapus item.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <LayoutCustomer>
      <Box p={6}>
        <Heading size="lg" mb={6}>Wishlist Saya</Heading>

        {loading ? (
          <Center mt={10}>
            <Spinner size="xl" color="green.400" />
          </Center>
        ) : error ? (
          <Center mt={10}>
            <Text color="red.500">{error}</Text>
          </Center>
        ) : wishlistItems.length === 0 ? (
          <Center mt={10}>
            <Text color="gray.500">Wishlist kamu masih kosong 😔</Text>
          </Center>
        ) : (
          <VStack spacing={6} align="stretch">
            {wishlistItems.map((item) => (
              <Box
                key={item.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                _hover={{ shadow: 'md' }}
                transition="all 0.3s"
                display="flex"
                alignItems="center"
              >
                <Image
                  src={`${process.env.REACT_APP_API_BACKEND}${item.ItemMakanan?.photo_url}`}
                  alt={item.ItemMakanan?.caption}
                  boxSize="100px"
                  objectFit="cover"
                  mr={4}
                  borderRadius="md"
                />
                <Box flex="1">
                  <Text fontWeight="bold" fontSize="lg">{item.ItemMakanan?.caption}</Text>
                  <Text fontSize="sm" color="gray.600" noOfLines={2}>
                    {item.ItemMakanan?.description}
                  </Text>

                  <Box mt={2}>
                    <Button
                      as={Link}
                      to={`/customer/produk/${item.ItemMakanan?.id}`}
                      size="sm"
                      colorScheme="green"
                      variant="outline"
                    >
                      Lihat Detail
                    </Button>

                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      ml={3}
                      onClick={() => handleRemove(item.id)}
                    >
                      Hapus dari Wishlist
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </LayoutCustomer>
  );
};

export default CustomerWishlistPage;
