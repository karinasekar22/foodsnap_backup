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
  useToast,
} from '@chakra-ui/react';
import { 
  ChevronRightIcon, 
  StarIcon, 
} from '@chakra-ui/icons';
import { MdBookmark, MdFavorite } from 'react-icons/md';
import { useLocation } from 'react-router-dom'; // Added for navigation detection
import axios from '../../../../api/axios';
import notFoundImage from 'assets/img/homepage/search.png';

const FeaturedReviews = () => {
  const [filter, setFilter] = useState('Discover');
  const [reviewData, setReviewData] = useState([]);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const [bookmarked, setBookmarked] = useState({});
  const [liked, setLiked] = useState({});
  const [clickedIcon, setClickedIcon] = useState(null);
  const toast = useToast();
  const location = useLocation(); // Hook to detect route changes

  // Placeholder for login state (replace with actual auth logic)
  const isLoggedIn = false;

  const COLORS = {
    primary: '#1DA344',
    text: 'gray.600',
    white: 'white',
    hoverBg: 'gray.50',
    heartRed: '#E53E3E',
  };

  const fetchReviews = async () => {
    try {
      console.log('Mengambil data dari:', axios.defaults.baseURL + '/produk/item-makanan');
      const response = await axios.get('/produk/item-makanan');
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
        likes: Math.floor(Math.random() * 100) + 1,
      }));
      setReviewData(transformedData);
      setError(null);
    } catch (error) {
      console.error('Gagal mengambil data dari API:', error);
      console.error('Error detail:', error.response?.status, error.response?.data);
      setError('Gagal memuat data.');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Close toasts on route change or component unmount
  useEffect(() => {
    // Close all toasts when the pathname changes
    toast.closeAll();
    
    // Cleanup on component unmount
    return () => {
      toast.closeAll();
    };
  }, [location.pathname, toast]);

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

  const handleBookmarkToggle = (id) => {
    try {
      // Check if user is logged in
      if (!isLoggedIn) {
        toast({
          title: 'Failed to save review.',
          description: 'You might need to log in to use this feature.',
          status: 'error',
          duration: 3000, // Reduced from 5000ms
          isClosable: true,
        });
        return;
      }

      // Simulate API call or action to save bookmark
      setBookmarked((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
      setClickedIcon(`bookmark-${id}`);
      setTimeout(() => setClickedIcon(null), 300);

      // Show success toast
      toast({
        title: 'Successfully saved review.',
        status: 'success',
        duration: 2000, // Reduced from 3000ms
        isClosable: true,
      });
    } catch (error) {
      // Show error toast for general failure
      toast({
        title: 'Failed to save review.',
        description: 'Please check your internet connection and try again.',
        status: 'error',
        duration: 3000, // Reduced from 5000ms
        isClosable: true,
      });
    }
  };

  const handleLikeToggle = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setClickedIcon(`like-${id}`);
    setTimeout(() => setClickedIcon(null), 300);
  };

  const popOutAnimation = `
    @keyframes popOut {
      0% { transform: scale(1); }
      50% { transform: scale(1.4); }
      100% { transform: scale(1); }
    }
  `;

  return (
    <Box py={16} px={{ base: 4, md: 12 }} bg="gray.50">
      <style>{popOutAnimation}</style>
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

      {error && (
        <Center flexDirection="column" py={8}>
          <Image
            src={notFoundImage}
            alt="Error fetching data"
            boxSize="380px"
            mb={4}
            fallbackSrc="https://via.placeholder.com/150"
          />
          <Heading
            as="h3"
            size="xl"
            color="gray.700"
            textAlign="center"
          >
            Oops! Something went wrong while loading the reviews.
          </Heading>
        </Center>
      )}

      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={6}
      >
        {reviewData.map((review) => (
          <Card key={review.id} overflow="hidden" variant="outline" position="relative">
            <Box
              position="absolute"
              top={3}
              right={3}
              zIndex={2}
              onClick={() => handleBookmarkToggle(review.id)}
              cursor="pointer"
              transition="all 0.3s ease-in-out"
              borderRadius="full"
              width="32px"
              height="32px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={bookmarked[review.id] ? "white" : "#1DA344"}
              border={bookmarked[review.id] ? "1px solid #1DA344" : "none"}
              _hover={{
                transform: 'scale(1.2)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
              sx={{
                animation: clickedIcon === `bookmark-${review.id}` ? 'popOut 0.3s ease-in-out' : 'none',
              }}
            >
              <MdBookmark 
                size="18px" 
                color={bookmarked[review.id] ? "#1DA344" : "white"} 
                style={{ transition: "all 0.3s ease-in-out" }}
              />
            </Box>
            
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
                  bg="green.500"
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
                
                <HStack>
                  <Text fontSize="sm" color="gray.500" mr={1}>
                    {review.likes}+
                  </Text>
                  <Box
                    onClick={() => handleLikeToggle(review.id)}
                    cursor="pointer"
                    transition="all 0.3s ease-in-out"
                    borderRadius="full"
                    width="32px"
                    height="32px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={liked[review.id] ? "white" : "#1DA344"}
                    border={liked[review.id] ? "1px solid #1DA344" : "none"}
                    _hover={{
                      transform: 'scale(1.2)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                    sx={{
                      animation: clickedIcon === `like-${review.id}` ? 'popOut 0.3s ease-in-out' : 'none',
                    }}
                  >
                    <MdFavorite 
                      size="18px" 
                      color={liked[review.id] ? COLORS.heartRed : "white"} 
                      style={{ transition: "all 0.3s ease-in-out" }}
                    />
                  </Box>
                </HStack>
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </Grid>

      <Flex justifyContent="center" width="100%" mt={8}>
        <Button
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
          onClick={() => console.log("Discover more clicked")}
        >
          Discover More
        </Button>
      </Flex>
    </Box>
  );
};

export default FeaturedReviews;