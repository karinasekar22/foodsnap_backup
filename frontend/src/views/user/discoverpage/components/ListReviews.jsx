import React, { useState, useEffect, useRef, memo } from 'react';
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
  Spinner,
  useToast
} from '@chakra-ui/react';
import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons';
import { NavLink, useLocation } from 'react-router-dom';
import { FaStar, FaHeart, FaBookmark } from 'react-icons/fa';
import axios from '../../../../api/axios';

// Konstanta untuk nilai yang sering digunakan
const COLORS = {
  primary: '#1DA344',
  text: 'gray.600',
  white: 'white',
  hoverBg: 'gray.50',
  error: 'red.500',
  rating: 'yellow.400',
};

const CONFIG = {
  filters: ['Discover', 'Trending Now', 'Top Rated', 'Most Snapped', 'Newest Post'],
  defaultQuery: 'Burger',
  defaultLocation: 'Bandung',
  placeholderImage: '/api/placeholder/400/320',
  placeholderAvatar: '/api/placeholder/40/40',
};

// Komponen untuk menampilkan bintang rating
const RatingStars = memo(({ rating }) => (
  // Menampilkan bintang berdasarkan nilai rating
  <HStack spacing={1}>
    {Array(5)
      .fill('')
      .map((_, i) => (
        <StarIcon key={i} color={i < rating ? COLORS.rating : 'gray.300'} />
      ))}
    <Text fontSize="sm" color={COLORS.text} ml={1}>
      ({rating})
    </Text>
  </HStack>
));

// Komponen untuk kartu review
const ReviewCard = memo(({ review, isWishlisted, onWishlist }) => (
  // Kartu untuk menampilkan satu review
  <Card overflow="hidden" variant="outline">
    <Image
      src={review.image}
      alt={review.title}
      objectFit="cover"
      height="200px"
      fallbackSrc={CONFIG.placeholderImage}
    />
    <CardBody>
      <Heading size="md" mb={2}>
        {review.title}
      </Heading>
      <RatingStars rating={review.rating} />
      <Flex align="center" mt={2} mb={2}>
        <Avatar src={review.user.avatar} name={review.user.name} size="xs" mr={2} />
        <Text fontSize="sm" fontWeight="medium">
          {review.user.name}
        </Text>
      </Flex>
      <Text fontSize="sm" color={COLORS.text} noOfLines={2}>
        {review.content}
      </Text>
    </CardBody>
    <CardFooter pt={0}>
      <Flex justify="space-between" width="100%" align="center">
        <Button
          as={NavLink}
          to={`/customer/produk/${review.id}`} // ⬅️ Navigasi ke halaman detail produk
          variant="solid"
          size="sm"
          width="85px"
          height="33px"
          bg={COLORS.primary}
          color={COLORS.white}
          _hover={{
            bg: COLORS.white,
            color: COLORS.primary,
            border: '1px solid',
            borderColor: COLORS.primary,
          }}
          transition="all 0.3s ease-in-out"
          fontFamily="Poppins, sans-serif"
        >
          Read All
        </Button>
        <IconButton
          aria-label="Wishlist"
          icon={<FaHeart />}
          size="sm"
          isRound
          onClick={onWishlist}
          bg={isWishlisted ? 'red.500' : COLORS.primary}
          color={COLORS.white}
          _hover={{ bg: isWishlisted ? 'red.600' : '#17833A' }}
        />

      </Flex>
    </CardFooter>
  </Card>
));

// Komponen untuk filter
const FilterBar = ({ filters, activeFilter, onFilterChange, scrollRef, onScrollRight }) => (
  // Bar untuk memilih filter dengan tombol scroll
  <Flex align="center" w="100%" position="relative" mt={10} mb={8}>
    <Flex
      ref={scrollRef}
      overflowX="auto"
      css={{
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
      }}
      py={2}
      flex="1"
    >
      <HStack spacing={4}>
        {filters.map((f) => (
          <Button
            key={f}
            variant={activeFilter === f ? 'solid' : 'outline'}
            bg={activeFilter === f ? COLORS.primary : 'transparent'}
            color={activeFilter === f ? COLORS.white : COLORS.primary}
            borderColor={COLORS.primary}
            _hover={{ bg: activeFilter === f ? '#17833A' : 'green.50' }}
            borderRadius="full"
            px={6}
            onClick={() => onFilterChange(f)}
          >
            {f}
          </Button>
        ))}
      </HStack>
    </Flex>
    <IconButton
      icon={<ChevronRightIcon />}
      aria-label="Scroll right"
      onClick={onScrollRight}
      position="absolute"
      right={2}
      bg={COLORS.white}
      color={COLORS.text}
      rounded="full"
      boxShadow="md"
      size="sm"
      zIndex={2}
    />
  </Flex>
);

const FeaturedReviews = () => {
  // State untuk filter, data review, loading, dan error
  const [filter, setFilter] = useState(CONFIG.filters[0]);
  const [reviewData, setReviewData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const location = useLocation();
  const [wishlist, setWishlist] = useState([]);

    const toast = useToast();
  


  // Mengambil parameter pencarian dari URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || CONFIG.defaultQuery;
  const selectedLocation = queryParams.get('location') || CONFIG.defaultLocation;

  const handleWishlist = async (userId,productId) => {
    try {
      await axios.post('/wishlist/add', { user_id:userId,item_makanan_id: productId });
      toast({
        title: 'Berhasil!',
        description: 'Item ditambahkan ke wishlist.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setWishlist((prev) => [...prev, productId]);
    } catch (error) {
      console.error('Gagal menambahkan ke wishlist:', error);
        toast({
        title: 'Error!',
        description: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Fungsi untuk mengambil data review dari API
  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/produk/item-makanan', {
        params: { query: searchQuery, location: selectedLocation },
      });
      const transformedData = response.data.map((item) => ({
        id: item.id,
        image: item.photo_url || CONFIG.placeholderImage,
        title: item.caption,
        rating: item.rating,
        user: {
          name: 'Dummy User',
          avatar: CONFIG.placeholderAvatar,
        },
        content: 'This is a dummy review content.',
      }));
      setReviewData(transformedData);
      setError(null);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
      setError('Failed to load reviews. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Efek untuk memuat ulang data saat query atau lokasi berubah
  useEffect(() => {
    fetchReviews();
  }, [searchQuery, selectedLocation]);

  // Fungsi untuk menggulir filter ke kanan
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    // Kontainer utama untuk bagian ulasan unggulan
    <Box
      py={16}
      px={{ base: 4, md: 12 }}
      bg="gray.50"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      {/* Judul dan deskripsi */}
      <Heading color={COLORS.primary} mb={4}>
        <Box as="span" color="black">
          {searchQuery}
        </Box>
      </Heading>
      <Text mb={8}>
        Explore your craving through the lens of FoodSnap’s community reviews.
      </Text>

      {/* Menampilkan error jika ada */}
      {error && <Text color={COLORS.error} mb={4}>{error}</Text>}

      {/* Menampilkan spinner saat memuat */}
      {isLoading && <Spinner color={COLORS.primary} size="lg" mb={4} />}

      {/* Bar filter */}
      <FilterBar
        filters={CONFIG.filters}
        activeFilter={filter}
        onFilterChange={setFilter}
        scrollRef={scrollRef}
        onScrollRight={scrollRight}
      />

      {/* Grid untuk menampilkan ulasan */}
      {reviewData.length > 0 ? (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
          {reviewData.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isWishlisted={wishlist.includes(review.id)}
              onWishlist={() => 
                // console.log("Review ", review)
                handleWishlist(review.user.id, review.id)
              }
            />
          ))}
        </Grid>
      ) : (
        !isLoading && (
          <Text color={COLORS.text}>No reviews found for {searchQuery} in {selectedLocation}.</Text>
        )
      )}

      {/* Tombol untuk menjelajahi lebih banyak */}
      <Flex justifyContent="center" width="100%" mt={8}>
        <Button
          as={NavLink}
          to="/user/discover"
          variant="outline"
          borderRadius="full"
          borderColor={COLORS.primary}
          color={COLORS.primary}
          px={8}
          py={2}
          width="220px"
          rightIcon={<Text as="span" ml={1}>»</Text>}
          _hover={{
            bg: COLORS.primary,
            color: COLORS.white,
            borderColor: COLORS.primary,
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