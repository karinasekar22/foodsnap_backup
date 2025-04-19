import React from 'react';
import { Box, Button, Heading, Text, Flex, Circle } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { ArrowForwardIcon } from '@chakra-ui/icons';

// Placeholder image
import joinCommunityImage from 'assets/img/homepage/pexels-pixabay-163018.jpg';

const JoinCommunity = () => {
  return (
    <Box
      bgImage={joinCommunityImage}
      bgSize="cover"
      bgPosition="center"
      height={{ base: "600px", md: "450px" }}
      position="relative"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.5)"
      />
      
      <Flex
        position="relative"
        zIndex={1}
        color="white"
        height="100%"
        direction="row"
        px={{ base: 6, md: 16 }}
      >
        {/* Left side content */}
        <Box 
          width={{ base: "100%", md: "50%" }} 
          textAlign="left"
          alignSelf="flex-start"
          pt={12}
        >
          <Heading 
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="bold"
            lineHeight="1.1"
          >
            Join the FoodSnap
            <br/>
            Community
          </Heading>
        </Box>
        
        {/* Right side content */}
        <Flex 
          width={{ base: "100%", md: "50%" }}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-end"
          pt={16}
        >
          <Box textAlign="left" maxW="400px">
            <Heading 
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="medium"
              mb={3}
            >
              Be a part of the
              <br/>
              ultimate foodie
              <br/>
              experience!
            </Heading>
            
            <Text fontSize="sm" mb={6}>
              Sign up today and start sharing your culinary
              <br/>
              adventures, connect with fellow foodies, and
              <br/>
              discover top-rated spots recommended by real
              <br/>
              food lovers.
            </Text>
            
            <Button
              as={NavLink}
              to="/auth/register-umkm"
              bg="white"
              color="#1DA344"
              borderRadius="full"
              _hover={{
                bg: "#f0f0f0",
              }}
              size="md"
              px={6}
              rightIcon={
                <Circle size="24px" bg="#1DA344" ml={1}>
                  <ArrowForwardIcon color="white" fontSize="sm" />
                </Circle>
              }
            >
              Join Now
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default JoinCommunity;