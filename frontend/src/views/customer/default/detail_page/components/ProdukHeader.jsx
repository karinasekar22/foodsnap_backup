import React from 'react';
import { Box, Image, Text, Button, Flex, Icon, VStack, Divider } from '@chakra-ui/react';
import { FaStar, FaBookmark, FaHeart, FaCommentAlt } from 'react-icons/fa';

const ProdukHeader = ({ data }) => {
  if (!data) return null;

  const fotoProduk = data.photo_url
    ? `http://localhost:5000${data.photo_url}`
    : 'https://via.placeholder.com/600x200';
  const restoranFoto =
    `http://localhost:5000${data.Restoran?.banner_url}` || 'https://via.placeholder.com/24';
  const createdAt = data.created_at
    ? new Date(data.created_at).toLocaleDateString()
    : 'Tanggal tidak tersedia';

  return (
    <Box maxW="100%" mx="auto" p={12} bg="white" color="black">
      {/* Header */}
      <VStack align="start" mb={4}>
        <Text fontWeight="extrabold" fontSize="4xl" lineHeight="tight">
          {data.nama_produk || 'Defaultnya Soto Ayam karena Item tak punya Nama🫠'}
        </Text>
        <Text fontSize="md" color="gray.600">
          {data.Restoran?.alamat || 'Bandung, Indonesia'}
        </Text>
      </VStack>

      {/* Profile Section */}
      <Flex align="center" mb={4}>
        <Image
          borderRadius="full"
          boxSize="36px"
          objectFit="cover"
          src={restoranFoto}
          alt="Profile Restaurant"
        />
        <VStack align="start" ml={3} spacing={0}>
          <Text fontWeight="semibold" fontSize="lg">
            {data.Restoran?.restaurant_name || 'Warung'}
          </Text>
          <Text fontSize="md" color="gray.500">
            {createdAt}
          </Text>
        </VStack>
        
        <Button
          ml={6}
          size="md"
          colorScheme="green"
          variant="link"
          fontWeight="semibold"
        >
          Follow
        </Button>
      </Flex>
      
      <Divider my={6} borderColor="gray.300" />
      {/* Main Image Section */}
      <Box position="relative" mb={6} borderRadius="lg" overflow="hidden">
        <Image
          src={fotoProduk}
          alt="Food image"
          w="1248px"
          h="400px"
          objectFit="cover"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="flex-start"
          p={6}
        >
          <Text
            color="white"
            fontWeight="bold"
            fontSize="4xl"
            textAlign="left"
          >
            Discover What's Trending!
          </Text>
          <Button
            mt={3}
            size="sm"
            colorScheme="whiteAlpha"
            variant="outline"
            color="white"
          >
            See Top Picks
          </Button>
        </Box>
      </Box>

      {/* Rating and Interactions Section */}
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Icon as={FaBookmark} color="green.600" boxSize={6} />
          <Flex align="center" ml={2} color="yellow.400">
            <Icon as={FaStar} boxSize={5} />
            <Icon as={FaStar} boxSize={5}/>
            <Icon as={FaStar} boxSize={5}/>
            <Icon as={FaStar} boxSize={5}/>
            <Icon as={FaStar} boxSize={5}/>
          </Flex>
          <Text fontSize="md" fontWeight="semibold" ml={2}>
            5/5{' '}
            <Text as="span" fontWeight="normal">
              (2.3k reviews)
            </Text>
          </Text>
        </Flex>

        <Flex align="center" spacing={6}>
          <Flex
            align="center"
            color="green.600"
            fontSize="md"
            fontWeight="semibold"
          >
            <Icon as={FaHeart} boxSize={5} />
            <Text ml={2} mr={4}>1,7rb+</Text>
          </Flex>
          <Flex
            align="center"
            color="green.600"
            fontSize="md"
            fontWeight="semibold"
          >
            <Icon as={FaCommentAlt} boxSize={5} />
            <Text ml={2}>1rb+</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProdukHeader;
