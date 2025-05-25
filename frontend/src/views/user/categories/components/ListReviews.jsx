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
  Spinner,
} from '@chakra-ui/react';
import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import axios from '../../../../api/axios';

const COLORS = {
  primary: '#1DA344',
  text: 'gray.600',
  white: 'white',
  hoverBg: 'gray.50',
  error: 'red.500',
  rating: 'yellow.400',
};

const CONFIG = {
  placeholderImage: '/api/placeholder/400/320',
  placeholderAvatar: '/api/placeholder/40/40',
};

// ⭐ COMPONENT: Bintang Rating
const RatingStars = memo(({ rating }) => (
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

// ⭐ COMPONENT: Kartu Review
const ReviewCard = memo(({ review }) => (
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
        >
          Read All
        </Button>
        <IconButton
          aria-label="Like"
          size="sm"
          isRound
          bg={COLORS.primary}
          color={COLORS.white}
          _hover={{ bg: '#17833A' }}
          icon={<Text>👍</Text>}
        />
      </Flex>
    </CardFooter>
  </Card>
));

// ⭐ COMPONENT: Filter Bar
const FilterBar = ({ filters, activeFilter, onFilterChange, scrollRef, onScrollRight }) => (
  <Flex align="center" w="100%" position="relative" mt={10} mb={8}>
    <Flex
      ref={scrollRef}
      overflowX="auto"
      css={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
      py={2}
      flex="1"
    >
      <HStack spacing={4}>
        {filters.map((f) => (
          <Button
            key={f.id}
            variant={activeFilter === f.id ? 'solid' : 'outline'}
            bg={activeFilter === f.id ? COLORS.primary : 'transparent'}
            color={activeFilter === f.id ? COLORS.white : COLORS.primary}
            borderColor={COLORS.primary}
            _hover={{ bg: activeFilter === f.id ? '#17833A' : 'green.50' }}
            borderRadius="full"
            px={6}
            onClick={() => onFilterChange(f.id)}
          >
            {f.nama}
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

// ⭐ COMPONENT: Featured Reviews
const FeaturedReviews = () => {
  const [filter, setFilter] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // 🔁 Ambil semua kategori
  const fetchCategories = async () => {
    try {
      const res = await axios.get('/kategori/AllCategory');
      if (Array.isArray(res.data)) {
        setCategories(res.data);
      }
    } catch (error) {
      console.error('Gagal mengambil kategori:', error);
    }
  };

  // 🔁 Ambil review berdasarkan kategori_id
  const fetchReviews = async (kategori_id) => {
    setIsLoading(true);
    try {
      const res = await axios.get('/produk/search', {
        params: { kategori: kategori_id },
      });

      const transformed = res.data.map((item) => ({
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

      setReviewData(transformed);
      setError(null);
    } catch (err) {
      console.error('Gagal mengambil review:', err);
      setError('Gagal mengambil data review.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (filter) {
      fetchReviews(filter);
    }
  }, [filter]);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <Box py={16} px={{ base: 4, md: 12 }} bg="gray.50" textAlign="center">
      <Heading color={COLORS.primary} mb={4}>
        <Box as="span" color="black">Pilih Kategori</Box>
      </Heading>
      <Text mb={8}>Temukan makanan favoritmu berdasarkan kategori!</Text>

      {error && <Text color={COLORS.error} mb={4}>{error}</Text>}
      {isLoading && <Spinner color={COLORS.primary} size="lg" mb={4} />}

      <FilterBar
        filters={categories}
        activeFilter={filter}
        onFilterChange={setFilter}
        scrollRef={scrollRef}
        onScrollRight={scrollRight}
      />

      {reviewData.length > 0 ? (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
          {reviewData.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Grid>
      ) : (
        !isLoading &&
        filter && (
          <Text color={COLORS.text}>
            Tidak ada review ditemukan untuk kategori <strong>{filter}</strong>.
          </Text>
        )
      )}

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
        >
          Discover More
        </Button>
      </Flex>
    </Box>
  );
};

export default FeaturedReviews;
