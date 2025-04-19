import React from 'react';
import { Box, Heading, Text, Grid, GridItem, VStack, HStack, Image } from '@chakra-ui/react';

// Import image assets
import appStoreIcon from 'assets/img/homepage/apple-store.png';
import googlePlayIcon from 'assets/img/homepage/google-play.png';

const Footer = () => {
  return (
    <Box bg="#1DA344" color="white" py={16} px={{ base: 4, md: 12 }}>
      {/* Brand and Tagline */}
      <Box mb={8}>
        <Heading as="h1" size="xl" mb={2}>FoodSnap</Heading>
        <Text fontSize="md">
          Snap, review, and discover delicious eats<br />
          around you!
        </Text>
      </Box>
      
      {/* Three columns layout */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={8} mb={12}>
        {/* Left Column - Navigation */}
        <GridItem>
          <Text fontWeight="bold" fontSize="lg" mb={4}>Navigation</Text>
          <VStack align="start" spacing={3}>
            <Text>Home</Text>
            <Text>Discover</Text>
            <Text>Categories</Text>
            <Text>Reviews</Text>
          </VStack>
        </GridItem>
        
        {/* Middle Column - Company */}
        <GridItem>
          <Text fontWeight="bold" fontSize="lg" mb={4}>Company</Text>
          <VStack align="start" spacing={3}>
            <Text>About Us</Text>
            <Text>Careers</Text>
            <Text>Blog</Text>
            <Text>Contact</Text>
          </VStack>
        </GridItem>
        
        {/* Right Column - Legal and App Store Buttons */}
        <GridItem>
          <Text fontWeight="bold" fontSize="lg" mb={4}>Legal</Text>
          <VStack align="start" spacing={3} mb={6}>
            <Text>Privacy Policy</Text>
            <Text>Terms of use</Text>
            <Text>FAQs</Text>
          </VStack>
          
          {/* App Store Buttons - positioned on the right side */}
          <Box mt={6}>
            <Box mb={4}>
              <Image src={appStoreIcon} alt="Download on the App Store" width="220px" />
            </Box>
            <Box>
              <Image src={googlePlayIcon} alt="Get it on Google Play" width="220px" />
            </Box>
          </Box>
        </GridItem>
      </Grid>
      
      {/* Social Media Icons */}
      <HStack spacing={4}>
        <Box 
          as="button" 
          p={2} 
          borderRadius="full" 
          bg="white" 
          color="green.500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </Box>
        <Box 
          as="button" 
          p={2} 
          borderRadius="full" 
          bg="white" 
          color="green.500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
          </svg>
        </Box>
        <Box 
          as="button" 
          p={2} 
          borderRadius="full" 
          bg="white" 
          color="green.500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
          </svg>
        </Box>
        <Box 
          as="button" 
          p={2} 
          borderRadius="full" 
          bg="white" 
          color="green.500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
        </Box>
        <Box 
          as="button" 
          p={2} 
          borderRadius="full" 
          bg="white" 
          color="green.500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 2.98 1.75 3.91 1.12.93 2.7 1.37 4.19 1.4v3.96c-1.42.05-2.84-.39-4.02-1.19-.57-.4-1.08-.88-1.51-1.43-.11 2.85-.03 5.71-.05 8.57 0 1.88-.23 3.76-.9 5.48-1.18 3.12-3.96 5.5-7.23 6.18-1.51.34-3.09.38-4.63.14-3.36-.49-6.43-2.48-8.05-5.5-1.09-1.84-1.64-3.97-1.66-6.12 0-1.46.06-2.93.51-4.33 1.16-3.57 4.3-6.43 8.04-7.3 1.38-.36 2.83-.35 4.24-.23v4.13c-1.23-.08-2.48.12-3.48.83-1.57 1.04-2.45 2.98-2.25 4.87.15 1.95 1.34 3.8 3.12 4.55 1.24.53 2.68.51 3.92-.07 1.75-.85 2.77-2.78 2.73-4.71-.01-1.34 0-2.69 0-4.03.01-2.82-.01-5.65.01-8.48z"/>
          </svg>
        </Box>
      </HStack>
    </Box>
  );
};

export default Footer;