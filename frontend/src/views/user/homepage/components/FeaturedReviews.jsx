import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  IconButton,
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Container,
  Center,
} from '@chakra-ui/react';
import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons';
import { NavLink, useLocation } from 'react-router-dom';
import axios from '../../../../api/axios';

const FeaturedReviews = () => {
  const [filter, setFilter] = useState('Discover');
  const [reviewData, setReviewData] = useState([]);
  const [error, setError] = useState(null);
  const scrollRef = React.useRef(null);

  const COLORS = {
    primary: '#1DA344',
    text: 'gray.600',
    white: 'white',
    hoverBg: 'gray.50',
  };

  const fetchReviews = async () => {
    try {
      console.log('Mengambil data dari:', axios.defaults.baseURL + '/produk/item-makanan');
      const response = await axios.get('/produk/item-makanan'); // Hapus /api
      console.log('Data dari API:', response.data);
      const transformedData = response.data.map((item) => ({
        id: item.id,
        image: item.photo_url || '/api/placeholder/400/320',
        title: item.caption,
        rating: item.rating,
        user: {
          name: 'Dummy User',
          avatar: '/api/placeholder/40/40',
        },
        content: 'This is a dummy review content.',
      }));
      setReviewData(transformedData);
      setError(null);
    } catch (error) {
      console.error('Gagal mengambil data dari API:', error);
      console.error('Error detail:', error.response?.status, error.response?.data);
      setError('Gagal memuat data. Pastikan server backend berjalan dan CORS dikonfigurasi.');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filters = [
    'Discover',
    'Trending Now',
    'Top Rated',
    'Most Snapped',
    'Newest Post',
  ];

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <HStack spacing={1}>
        {Array(totalStars)
          .fill('')
          .map((_, i) => (
            <StarIcon key={i} color={i < rating ? 'yellow.400' : 'gray.300'} />
          ))}
        <Text fontSize="sm" color="gray.600" ml={1}>
          ({rating})
        </Text>
      </HStack>
    );
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <Box py={16} px={{ base: 4, md: 12 }} bg="gray.50">
      <Heading color="#1DA344" mb={4}>
        FoodSnap{' '}
        <Box as="span" color="black">
          Featured Reviews
        </Box>
      </Heading>
      <Text>
        See what fellow foodies are saying about their favorite dishes.
        <br />
        Discover real reviews, trusted ratings, and delicious stories shared by
        our community.
      </Text>

      {error && <Text color="red.500">{error}</Text>}

      <Flex align="center" w="100%" position="relative" mt={10} mb={8}>
        <Flex
          ref={scrollRef}
          overflowX="auto"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
          }}
          py={2}
          flex="1"
        >
          <HStack spacing={4}>
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'solid' : 'outline'}
                bg={filter === f ? '#1DA344' : 'transparent'}
                color={filter === f ? 'white' : '#1DA344'}
                borderColor={filter === f ? '#1DA344' : '#1DA344'}
                _hover={{ bg: filter === f ? '#17833A' : 'green.50' }}
                borderRadius="full"
                px={6}
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </HStack>
        </Flex>

        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Scroll right"
          onClick={scrollRight}
          position="absolute"
          right={2}
          bg="white"
          color="gray.600"
          rounded="full"
          boxShadow="md"
          size="sm"
          zIndex={2}
        />
      </Flex>

      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={6}
      >
        {reviewData.map((review) => (
          <Card key={review.id} overflow="hidden" variant="outline">
            <Image
              src={review.image}
              alt={review.title}
              objectFit="cover"
              height="200px"
              fallbackSrc="/api/placeholder/400/320"
            />
            <CardBody>
              <Heading size="md" mb={2}>
                {review.title}
              </Heading>
              {renderStars(review.rating)}

              <Flex align="center" mt={2} mb={2}>
                <Avatar
                  src={review.user.avatar}
                  name={review.user.name}
                  size="xs"
                  mr={2}
                />
                <Text fontSize="sm" fontWeight="medium">
                  {review.user.name}
                </Text>
              </Flex>

              <Text fontSize="sm" color="gray.600" noOfLines={2}>
                {review.content}
              </Text>
            </CardBody>

            <CardFooter pt={0}>
              <Flex justify="space-between" width="100%" align="center">
                <Button
                  variant="solid"
                  size="sm"
                  width="85px"
                  height="33px"
                  bg={COLORS.primary}
                  color={COLORS.white}
                  _hover={{
                    bg: COLORS.white,
                    color: COLORS.primary,
                    border: "1px solid",
                    borderColor: COLORS.primary,
                  }}
                  transition="all 0.3s ease-in-out"
                  fontFamily="Poppins, sans-serif"
                >
                  Read All
                </Button>
                <IconButton
                  aria-label="Like"
                  size="sm"
                  isRound
                  bg="#1DA344"
                  color="white"
                  _hover={{ bg: '#17833A' }}
                >
                  Like
                </IconButton>
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </Grid>

      <Flex justifyContent="center" width="100%" mt={8}>
        <Button
          as={NavLink}
          to="/user/discover"
          variant="outline"
          borderRadius="full"
          borderColor="#1DA344"
          color="#1DA344"
          px={8}
          py={2}
          width="220px"
          rightIcon={
            <Text as="span" ml={1}>
              »
            </Text>
          }
          _hover={{
            bg: '#1DA344',
            color: 'white',
            borderColor: '#1DA344',
          }}
          transition="all 0.3s ease-in-out"
          fontFamily="Poppins, sans-serif"
        >
          Discover More
        </Button>
      </Flex>
    </Box>
  );
};

export default FeaturedReviews;