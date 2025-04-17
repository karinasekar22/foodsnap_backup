import React, { useState, useEffect } from 'react';
import { Flex, Text, Button, Image, Box } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import logoImage from 'assets/img/homepage/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={{ base: 4, md: 12 }}
      py={3}
      bg={scrolled ? "white" : "white"}
      boxShadow={scrolled ? "md" : "sm"}
      position="sticky"
      top={0}
      zIndex={1000}
      display="flex"
      visibility="visible"
      fontFamily="Poppins, sans-serif"
      transition="all 0.3s ease"
    >
      <Image
        src={logoImage}
        alt="FoodSnap Logo"
        h={{ base: '30px', md: '30px' }}
        maxW="100%"
        objectFit="contain"
        alignSelf="center"
      />
      <Flex
        align="center"
        justify="center"
        flex={1}
        gap="25px"
      >
        <NavLink to="/user/" style={({ isActive }) => ({
          position: 'relative'
        })}>
          {({ isActive }) => (
            <Box position="relative" role="group">
              <Text color="gray.600" fontFamily="Poppins, sans-serif" fontWeight="bold">Home</Text>
              <Box
                position="absolute"
                bottom="-2px"
                left="50%"
                width={isActive ? "60%" : "0%"}
                height="2px"
                bg="#1DA344"
                transform="translateX(-50%)"
                _groupHover={{ width: "60%" }}
                transition="width 0.3s ease-in-out"
                borderRadius="full"
              />
            </Box>
          )}
        </NavLink>
        <NavLink to="/user/discover" style={({ isActive }) => ({
          position: 'relative'
        })}>
          {({ isActive }) => (
            <Box position="relative" role="group">
              <Text color="gray.600" fontFamily="Poppins, sans-serif" fontWeight="bold">Discover</Text>
              <Box
                position="absolute"
                bottom="-2px"
                left="50%"
                width={isActive ? "60%" : "0%"}
                height="2px"
                bg="#1DA344"
                transform="translateX(-50%)"
                _groupHover={{ width: "60%" }}
                transition="width 0.3s ease-in-out"
                borderRadius="full"
              />
            </Box>
          )}
        </NavLink>
        <NavLink to="/user/categories" style={({ isActive }) => ({
          position: 'relative'
        })}>
          {({ isActive }) => (
            <Box position="relative" role="group">
              <Text color="gray.600" fontFamily="Poppins, sans-serif" fontWeight="bold">Categories</Text>
              <Box
                position="absolute"
                bottom="-2px"
                left="50%"
                width={isActive ? "60%" : "0%"}
                height="2px"
                bg="#1DA344"
                transform="translateX(-50%)"
                _groupHover={{ width: "60%" }}
                transition="width 0.3s ease-in-out"
                borderRadius="full"
              />
            </Box>
          )}
        </NavLink>
        <NavLink to="/user/add-review" style={({ isActive }) => ({
          position: 'relative'
        })}>
          {({ isActive }) => (
            <Box position="relative" role="group">
              <Text color="gray.600" fontFamily="Poppins, sans-serif" fontWeight="bold">Add Review</Text>
              <Box
                position="absolute"
                bottom="-2px"
                left="50%"
                width={isActive ? "60%" : "0%"}
                height="2px"
                bg="#1DA344"
                transform="translateX(-50%)"
                _groupHover={{ width: "60%" }}
                transition="width 0.3s ease-in-out"
                borderRadius="full"
              />
            </Box>
          )}
        </NavLink>
      </Flex>
      <Flex align="center" gap="20px">
        <Button
          as={NavLink}
          to="/auth/sign-in"
          variant="outline"
          size="md"
          width="110px"
          height="33px"
          borderColor="#1DA344"
          color="#1DA344"
          _hover={{
            bg: "#1DA344",
            color: "white",
            borderColor: "#1DA344",
          }}
          transition="all 0.3s ease-in-out"
          fontFamily="Poppins, sans-serif"
        >
          Login
        </Button>
        <Button
          as={NavLink}
          to="/auth/register-umkm"
          variant="solid"
          size="md"
          width="110px"
          height="33px"
          bg="#1DA344"
          color="white"
          _hover={{
            bg: "white",
            color: "#1DA344",
            border: "1px solid",
            borderColor: "#1DA344",
          }}
          transition="all 0.3s ease-in-out"
          fontFamily="Poppins, sans-serif"
        >
          Get Started
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;