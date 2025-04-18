import React, { useState } from 'react';
import { Box, Text, Heading, SimpleGrid, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ImageOwner from 'assets/img/auth/OwnerImage.png';
import ImageCustomer from 'assets/img/auth/image.png';

const UserTypeSelector = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleNavigate = (path, index) => {
    setSelectedIndex(index);
    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  const userTypes = [
    {
      label: "I'm a",
      role: "Food Customer",
      image: ImageCustomer,
      alt: "Food Explorer",
      path: "/auth/sign-up-customer",
    },
    {
      label: "I'm a",
      role: "Food Business Owner",
      image: ImageOwner,
      alt: "Food Business Owner",
      path: "/auth/registerUMKM",
    },
  ];

  return (
    <Box mt={20} textAlign="center">
      <Heading size="lg" style={{color:'#3a7b3f'}}>Let’s Get Started!</Heading>
      <Text mt={2}>Select how you’d like to join the FoodSnap experience.</Text>

      <SimpleGrid columns={[1, null, 2]} spacing={10} mt={10} px={10}>
        {userTypes.map((user, index) => {
          const isSelected = selectedIndex === index;

          return (
            <Box
              key={index}
              border="2px solid"
              borderColor={isSelected ? 'green.600' : '#ccc'}
              borderRadius="md"
              p={6}
              cursor="pointer"
              bg={isSelected ? 'green.300' : 'white'}
              transition="all 0.2s ease-in-out"
              _hover={{
                borderColor: 'green.500',
                bg: 'green.100',
              }}
              onClick={() => handleNavigate(user.path, index)}
            >
              <Image
                src={user.image}
                alt={user.alt}
                mb={4}
                borderRadius="md"
                boxSize="200px"
                objectFit="cover"
                mx="auto"
              />
              <Text fontWeight="bold" mt={2}>
                {user.label}{' '}
                <Text as="span" color="green.600">
                  {user.role}
                </Text>
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default UserTypeSelector;
