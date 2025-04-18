import React from 'react';
import { Box, Text, Heading, SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (roleType) => {
    navigate('/auth/sign-up-role', { state: { roleType } });
  };

  return (
    <Box mt={20} textAlign="center">
      <Heading size="lg">Let’s Get Started!</Heading>
      <Text mt={2}>Select how you’d like to join the FoodSnap experience.</Text>

      <SimpleGrid columns={2} spacing={10} mt={10} px={10}>
        <Box
          border="1px solid #ccc"
          borderRadius="md"
          p={6}
          cursor="pointer"
          onClick={() => navigate('/auth/sign-up-customer')}
        >
          <img src="/assets/img/auth/image.png" alt="Food Explorer" />
          <Text fontWeight="bold">I'm a <span style={{ color: 'green' }}>Food Customer</span></Text>
        </Box>

        <Box
          border="1px solid #ccc"
          borderRadius="md"
          p={6}
          cursor="pointer"
          onClick={() => navigate('/auth/registerUMKM')}
        >
          <img src="/assets/img/auth/cinta.jpg" alt="Food Business Owner" />
          <Text fontWeight="bold">I'm a <span style={{ color: 'green' }}>Food Business Owner</span></Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default UserTypeSelector;
