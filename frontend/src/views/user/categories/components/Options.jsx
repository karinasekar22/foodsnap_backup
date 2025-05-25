import React, { memo } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Image,
  Text,
} from '@chakra-ui/react';

// Gambar untuk komponen
import WomanThinking from '../../../../assets/img/homepage/Woman thinking over healthy and unhealthy snacks c (1).png';
import TopPicks from '../../../../assets/img/homepage/box 1.jpg';
import Trending from '../../../../assets/img/homepage/box 2.jpg';
import HiddenGem from '../../../../assets/img/homepage/box 3.jpg';

// Konstanta untuk nilai yang sering digunakan
const COLORS = {
  primary: '#1DA344',
  secondary: '#228B22',
  background: '#2C7A4C',
  text: 'white',
  overlay: 'rgba(0,0,0,0.25)',
};

const CONFIG = {
  categories: [
    {
      title: 'Top-Rated',
      image: TopPicks,
      alt: 'Top-rated food options',
    },
    {
      title: 'Trending Spots',
      image: Trending,
      alt: 'Trending food spots',
    },
    {
      title: 'Hidden Gems',
      image: HiddenGem,
      alt: 'Hidden gem restaurants',
    },
  ],
  maxWidth: '1200px',
  imageHeight: { base: '100px', md: '110px' },
  womanImageSize: { base: '340px', md: '360px' },
};

// Komponen untuk kartu kategori makanan
const CategoryCard = memo(({ title, image, alt }) => (
  // Kartu untuk menampilkan kategori makanan dengan gambar dan tombol
  <Box mb={4} borderRadius="lg" overflow="hidden">
    <Box position="relative" height={CONFIG.imageHeight}>
      <Image
        src={image}
        alt={alt}
        w="100%"
        h="100%"
        objectFit="cover"
        borderRadius="lg"
      />
      {/* Lapisan gelap untuk meningkatkan visibilitas teks */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg={COLORS.overlay}
        borderRadius="lg"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Text
          color={COLORS.text}
          fontSize="lg"
          fontWeight="bold"
          ml={1}
        >
          {title}
        </Text>
        <Button
          alignSelf="flex-start"
          bg={COLORS.white}
          color={COLORS.primary}
          fontSize="sm"
          borderRadius="full"
          px={4}
          py={1}
          shadow="md"
          size="sm"
          ml={1}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
            bg: 'gray.50',
          }}
          transition="all 0.2s ease-in-out"
        >
          View All
        </Button>
      </Box>
    </Box>
  </Box>
));

const FoodDiscoveryComponent = () => {
  return (
    // Kontainer utama untuk komponen penemuan makanan
    <Box bg={COLORS.background} py={6} px={{ base: 4, md: 6 }}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'flex-start' }}
        justify="space-between"
        w="100%"
        maxW={CONFIG.maxWidth}
        mx="auto"
        position="relative"
      >
        {/* Bagian kiri - Gambar wanita yang berpikir */}
        <Box
          w={{ base: '100%', md: '30%' }}
          mb={{ base: 6, md: 0 }}
          display="flex"
          alignItems="flex-end"
          justifyContent={{ base: 'center', md: 'flex-start' }}
          position="relative"
          alignSelf="flex-end"
          mt={{ md: 'auto' }}
          pb={{ md: '20px' }}
        >
          <Image
            src={WomanThinking}
            alt="Woman thinking about food choices"
            w="100%"
            maxW={CONFIG.womanImageSize}
          />
        </Box>

        {/* Bagian kanan - Konten dan kategori */}
        <Box w={{ base: '100%', md: '65%' }}>
          <Heading
            color={COLORS.text}
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="bold"
            mb={6}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Not sure yet? Explore more delicious options:
          </Heading>

          {/* Daftar kategori makanan */}
          <Box mb={5}>
            {CONFIG.categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                image={category.image}
                alt={category.alt}
              />
            ))}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default FoodDiscoveryComponent;