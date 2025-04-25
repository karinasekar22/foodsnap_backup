import React from 'react';
import { Box } from '@chakra-ui/react';

import Navbar from './components/Navbar'; 
import Reviews from './components/ListReviews';
import Options from './components/Options';

const Homepage = () => {
  return (
    <Box>
      <Navbar /> 
      <Reviews />
      <Options />
    </Box>
  );
};

export default Homepage;