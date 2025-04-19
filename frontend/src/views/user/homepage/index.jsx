import React from 'react';
import { Box } from '@chakra-ui/react';

import Navbar from './components/Navbar'; 
import Hero from './components/Hero';
import Feature from './components/FeatureHighlights';
import Recommendations from './components/Recommendations';
import FeaturedReviews from './components/FeaturedReviews';
import JoinCommunity from './components/JoinCommunity';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <Box>
      <Navbar /> 
      <Hero />
      <Feature />
      <Recommendations />
      <FeaturedReviews />
      <JoinCommunity />
      <FAQ />
      <Footer />
    </Box>
  );
};

export default Homepage;