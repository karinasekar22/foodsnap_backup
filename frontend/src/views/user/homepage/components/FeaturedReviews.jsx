import React, { useState, useEffect, useRef } from 'react';

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Image,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons';
import { NavLink, useLocation } from 'react-router-dom';
import axios from '../../../../api/axios';

const FeaturedReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('Discover');
  const [limitedView, setLimitedView] = useState(true); // default: hanya 3 review
  const scrollRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // deteksi kalau sudah masuk halaman discover
    if (location.pathname === '/user/discover') {
      setLimitedView(false); // tampilkan semua review
    }
  }, [location]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/comments', { params: { filter } });
        const allReviews = response.data;
        setReviews(limitedView ? allReviews.slice(0, 3) : allReviews);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };
    fetchReviews();
  }, [filter, limitedView]);

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
        Discover real reviews, trusted ratings, and delicious stories shared by our community.
      </Text>

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
            {['Discover', 'Trending Now', 'Top Rated', 'Most Snapped', 'Newest Post'].map((f) => (
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

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {reviews.map((review) => (
          <Box key={review.id} bg="white" borderRadius="md" p={4}>
            <Image src={review.image} borderRadius="md" mb={4} />
            <Text fontWeight="bold">{review.User.username}</Text>
            {/* <Text color="yellow.500">★★★★★ {review.ItemMakanan.rating}</Text> */}
            <HStack spacing={1}>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < Math.floor(review.ItemMakanan.rating) ? 'yellow.400' : 'gray.300'}
                />
              ))}
              <Text fontSize="sm" color="gray.600">
                ({review.ItemMakanan.rating})
              </Text>
            </HStack>
            <Text color="gray.600" noOfLines={2}>
              {review.content}
            </Text>
            <Button variant="link" colorScheme="green" mt={2}>
              Read All
            </Button>
          </Box>
        ))}
      </SimpleGrid>

      {limitedView && (
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
            rightIcon={<Text as="span" ml={1}>»</Text>}
            _hover={{
              bg: "#1DA344",
              color: "white",
              borderColor: "#1DA344",
            }}
            transition="all 0.3s ease-in-out"
            fontFamily="Poppins, sans-serif"
          >
            Discover More
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default FeaturedReviews;
