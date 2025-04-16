// src/views/auth/signUpRole/index.jsx
import React from 'react';
import { Button, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SignUpRole = () => {
  const navigate = useNavigate();

  return (
    <VStack spacing={6} mt={20}>
      <Heading size="lg" textAlign="center">Pilih Role</Heading>
      <Button colorScheme="green" onClick={() => navigate('/auth/sign-up-customer')}>
        Daftar sebagai Customer
      </Button>
      <Button colorScheme="orange" onClick={() => navigate('/auth/registerUMKM')}>
        Daftar sebagai UMKM
      </Button>
    </VStack>
  );
};

export default SignUpRole;
