import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../../../api/axios'; // import axios
import logo from 'assets/img/auth/logo.png';
import registerIllustration from 'assets/img/auth/register-customer.png'; // sama kayak login, bisa diganti nanti

function SignUpCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!isTermsAccepted) {
      toast({
        title: 'Please accept the terms and conditions.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!email || !username || !password || !confirmPassword) {
      toast({
        title: 'All fields are required!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/auth/register', {
        username,
        email,
        password,
      });

      toast({
        title: 'Registration Successful!',
        description: 'You can now log in with your credentials.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirect to login page after successful registration

      setTimeout(() => {
        navigate('/admin/default');
      }, 3000);
    } catch (err) {
      console.log(err);
      toast({
        title: 'Registration Failed',
        description: err.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      height="100vh"
      overflowY="auto" // Menambahkan scroll jika konten lebih besar dari layar
      direction={{ base: 'column', lg: 'row' }}
    >
      {/* Right Section - Illustration (tampil dulu di HP, jadi urutan 1) */}
      <Box
        flex="1"
        order={{ base: 1, md: 2 }} // HP: tampil atas, Desktop: kanan
        maxW={{ base: '90%', md: '600px' }}
        mx="auto"
        width="100%"
        bg="#23653B"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={{ base: 4, lg: 12 }}
      >
        <VStack
          spacing={5}
          align="center"
          textAlign="left"
          marginTop={{ base: 0, lg: '5px' }}
        >
          <Box mt={{ base: 4, lg: 8 }}>
            <Heading fontSize={{ base: 'xl', lg: '3xl' }} mb={2}>
              Your Foodie Adventure Awaits!
            </Heading>
            <Text fontSize={{ base: 'sm', lg: 'md' }}>
              Discover, snap, and share your tastiest moments with a community
              that loves food as much as you do. Let’s turn every bite into a
              story worth sharing. ❤️
            </Text>
            <Image
              src={registerIllustration}
              alt="Sign Up Illustration"
              maxH="497px" // Memastikan gambar bisa mengisi tinggi kontainer tanpa memotong
              width="100%" // Gambar akan menyesuaikan lebar kontainer
              objectFit="cover" // Memastikan gambar tetap dalam proporsi tanpa terpotong
              mt={{ base: 4, lg: 8 }}
            />
          </Box>
        </VStack>
      </Box>

      {/* Left Section - Form */}
      <Flex
        flex="1"
        order={{ base: 2, md: 1 }} // HP: tampil bawah, Desktop: kiri
        p={{ base: 4, lg: 12 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bg="white"
        position="relative"
      >
        <Image
          src={logo}
          alt="FoodSnap Logo"
          h={{ base: '60px', md: '100px' }} // Menyesuaikan tinggi berdasarkan ukuran layar
          maxW="100%" // Logo akan lebar 100% dari elemen induk
          objectFit="contain"
          position="absolute"
          top="0"
          left="7"
          mb={4}
        />
        <Box maxW="500px" mx="auto" width="100%" mt={{ base: 4, lg: 8 }}>
          <Heading
            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            mb={2}
            color="green.800"
          >
            Create Your Food Explorer Account
          </Heading>
          <Text fontSize="sm" color="gray.600" mb={6}>
            Snap, review, and explore dishes from all over the city. Join
            thousands of food lovers on FoodSnap!
          </Text>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormControl mb={2} isRequired>
              <FormLabel fontSize="sm">Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl mb={2} is isRequired>
              <FormLabel fontSize="sm">Email Address</FormLabel>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mb={2} isRequired>
              <FormLabel fontSize="sm">Password</FormLabel>
              <Input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl mb={2} isRequired>
              <FormLabel fontSize="sm">Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Flex justify="space-between" align="center" mb={6}>
              <Checkbox
                colorScheme="green"
                isChecked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
              >
                <Text fontSize="sm" fontStyle="italic">
                  Accept Terms & Conditions
                </Text>
              </Checkbox>
            </Flex>
            <Button
              type="submit"
              isLoading={isLoading}
              color="white"
              bgColor="#23653B"
              width="100%"
              mb={4}
              onClick={handleRegister}
              _hover={{ bg: '#1C4F2F' }}
            >
              Start Snapping!
            </Button>
          </form>
          <Text fontSize="sm" textAlign="center">
            Want to register your food business instead?{' '}
            <Link as={NavLink} to="/auth/registerUMKM" color="green.600">
              Sign up as a Business Owner
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignUpCustomer;
