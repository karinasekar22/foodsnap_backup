import React from 'react';
import { Box } from '@chakra-ui/react';

import Navbar from './components/Navbar'; 
import Reviews from './components/ListReviews';
import Options from './components/Options';
import BackButton from './components/BackButton';

const Categories = () => {
  return (
    <Box>
      <Navbar /> 
      <BackButton/>
      <Reviews />
      <Options />
    </Box>
  );
};

export default Categories;