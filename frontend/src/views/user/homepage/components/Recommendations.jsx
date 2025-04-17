import React from 'react';
import { Box, Button, Heading, Text, SimpleGrid, Image, Center } from '@chakra-ui/react';

import topPicksImage from 'assets/img/homepage/top-picks.jpg';
import localRestaurantsImage from 'assets/img/homepage/favorite-local.jpg';
import mostSnappedImage from 'assets/img/homepage/most-snap.jpg';
import trendingSpotsImage from 'assets/img/homepage/trending.jpg';

const Recommendations = () => {
  return (
    <Box py={16} px={{ base: 4, md: 12 }}>
      <Center textAlign="center" maxW="800px" mx="auto" mb={8}>
        <Box>
          <Heading color="#1DA344" mb={4}>
            FoodSnap <Box as="span" color="black">Recommendations</Box>
          </Heading>
          <Text>
            Discover hand-picked restaurants and dishes that foodies love.
            <br/>
            Taste, snap, share and culinary experiences you'll never forget.
          </Text>
        </Box>
      </Center>
      
    </Box>
  );
};

export default Recommendations;