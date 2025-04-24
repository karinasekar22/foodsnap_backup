import React from 'react';
import { Box, Button, Heading, Text, Grid, GridItem, Image, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Impor useNavigate

import topPicksImage from 'assets/img/homepage/top-picks.jpg';
import localRestaurantsImage from 'assets/img/homepage/favorite-local.jpg';
import mostSnappedImage from 'assets/img/homepage/most-snap.jpg';
import trendingSpotsImage from 'assets/img/homepage/trending.jpg';

const Recommendations = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Fungsi untuk memeriksa status login dan mengarahkan pengguna
  const handleViewAllClick = (path) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      // Jika sudah login, arahkan ke path yang sesuai
      navigate(path);
    } else {
      // Jika belum login, arahkan ke halaman sign-in
      navigate('/auth/sign-in');
    }
  };

  return (
    <Box py={16} px={{ base: 4, md: 16, lg: 24 }}>
      <Center textAlign="center" maxW="800px" mx="auto" mb={12}>
        <Box>
          <Heading mb={4}>
            <Box as="span" color="#1DA344">FoodSnap</Box> Recommendations
          </Heading>
          <Text color="gray.600">
            Discover hand-picked restaurants and dishes that foodies love.
            <br />
            Taste, snap, and share culinary experiences you'll never forget.
          </Text>
        </Box>
      </Center>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(16, 1fr)"
        }}
        gap={5}
        maxW="1200px"
        mx="auto"
      >
        {/* Top Foodie Picks - narrower */}
        <GridItem colSpan={{ base: 16, md: 5 }} position="relative">
          <Box
            borderRadius="lg"
            overflow="hidden"
            height={{ base: "200px", md: "220px" }}
            position="relative"
            _hover={{
              '& > img': {
                transform: 'scale(1.08)',
              }
            }}
          >
            <Image
              src={topPicksImage}
              alt="Top Foodie Picks"
              objectFit="cover"
              width="100%"
              height="100%"
              transition="transform 0.5s ease-in-out"
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.3)"
              p={6}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Heading size="lg" color="white" mt={2}>Top Foodie Picks</Heading>
              <Button
                variant="outline"
                size="md"
                width="110px"
                height="33px"
                borderColor="#1DA344"
                color="#1DA344"
                bg="transparent"
                _hover={{
                  bg: "#1DA344",
                  color: "white",
                  borderColor: "#1DA344",
                }}
                transition="all 0.3s ease-in-out"
                fontFamily="Poppins, sans-serif"
                mb={2}
                onClick={() => handleViewAllClick('/top-foodie-picks')} // Gunakan fungsi handleViewAllClick
              >
                View All
              </Button>
            </Box>
          </Box>
        </GridItem>

        {/* Favorite Local Restaurants - wider rectangle */}
        <GridItem colSpan={{ base: 16, md: 11 }} position="relative">
          <Box
            borderRadius="lg"
            overflow="hidden"
            height={{ base: "200px", md: "220px" }}
            position="relative"
            _hover={{
              '& > img': {
                transform: 'scale(1.08)',
              }
            }}
          >
            <Image
              src={localRestaurantsImage}
              alt="Favorite Local Restaurants"
              objectFit="cover"
              width="100%"
              height="100%"
              transition="transform 0.5s ease-in-out"
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.3)"
              p={6}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Heading size="lg" color="white" mt={2}>Favorite Local Restaurants</Heading>
              <Button
                variant="outline"
                size="md"
                width="110px"
                height="33px"
                borderColor="#1DA344"
                color="#1DA344"
                bg="transparent"
                _hover={{
                  bg: "#1DA344",
                  color: "white",
                  borderColor: "#1DA344",
                }}
                transition="all 0.3s ease-in-out"
                fontFamily="Poppins, sans-serif"
                mb={2}
                onClick={() => handleViewAllClick('/favorite-local-restaurants')}
              >
                View All
              </Button>
            </Box>
          </Box>
        </GridItem>

        {/* Most Snapped Dishes - wider rectangle */}
        <GridItem colSpan={{ base: 16, md: 11 }} position="relative">
          <Box
            borderRadius="lg"
            overflow="hidden"
            height={{ base: "200px", md: "220px" }}
            position="relative"
            _hover={{
              '& > img': {
                transform: 'scale(1.08)',
              }
            }}
          >
            <Image
              src={mostSnappedImage}
              alt="Most Snapped Dishes"
              objectFit="cover"
              width="100%"
              height="100%"
              transition="transform 0.5s ease-in-out"
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.3)"
              p={6}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Heading size="lg" color="white" mt={2}>Most Snapped Dishes</Heading>
              <Button
                variant="outline"
                size="md"
                width="110px"
                height="33px"
                borderColor="#1DA344"
                color="#1DA344"
                bg="transparent"
                _hover={{
                  bg: "#1DA344",
                  color: "white",
                  borderColor: "#1DA344",
                }}
                transition="all 0.3s ease-in-out"
                fontFamily="Poppins, sans-serif"
                mb={2}
                onClick={() => handleViewAllClick('/most-snapped-dishes')}
              >
                View All
              </Button>
            </Box>
          </Box>
        </GridItem>

        {/* Trending Food Spots - narrower */}
        <GridItem colSpan={{ base: 16, md: 5 }} position="relative">
          <Box
            borderRadius="lg"
            overflow="hidden"
            height={{ base: "200px", md: "220px" }}
            position="relative"
            _hover={{
              '& > img': {
                transform: 'scale(1.08)',
              }
            }}
          >
            <Image
              src={trendingSpotsImage}
              alt="Trending Food Spots"
              objectFit="cover"
              width="100%"
              height="100%"
              transition="transform 0.5s ease-in-out"
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.3)"
              p={6}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Heading size="lg" color="white" mt={2}>
                Trending<br />Food Spots
              </Heading>
              <Button
                variant="outline"
                size="md"
                width="110px"
                height="33px"
                borderColor="#1DA344"
                color="#1DA344"
                bg="transparent"
                _hover={{
                  bg: "#1DA344",
                  color: "white",
                  borderColor: "#1DA344",
                }}
                transition="all 0.3s ease-in-out"
                fontFamily="Poppins, sans-serif"
                mb={2}
                onClick={() => handleViewAllClick('/trending-food-spots')}
              >
                View All
              </Button>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Recommendations;