import React from 'react';
import { Flex, Text, Button, VStack, Heading, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import notFoundImage from 'assets/img/homepage/not-found.png'; 

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      px={4}
      fontFamily="Poppins, sans-serif"
    >
      <VStack spacing={6} textAlign="center">
        <Image
          src={notFoundImage}
          alt="404 Not Found"
          maxW={{ base: '500px', md: '550px', sm: '270px', }}
          objectFit="contain"
          mb={2}
        />
        <Heading
          as="h1"
          size="2xl"
          color="gray.700"
        >
          Oops! Page Not Found
        </Heading>
        <Text
          fontSize="lg"
          color="gray.600"
          maxW="500px"
        >
          It seems you’re trying to access a page that doesn’t exist or requires you to be logged in.
        </Text>
        <Button
          bg="#1DA344"
          color="white"
          size="lg"
          _hover={{ bg: 'white', color: '#1DA344', border: '1px solid #1DA344' }}
          transition="all 0.3s ease-in-out"
          onClick={() => navigate('/auth/sign-in')}
        >
          Go to Login
        </Button>
        <Button
          variant="link"
          color="#1DA344"
          onClick={() => navigate('/user/')}
        >
          Back to Home
        </Button>
      </VStack>
    </Flex>
  );
};

export default PageNotFound;