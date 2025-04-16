import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
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
import axios from '../../../api/axios'; // import axios
import { NavLink, useNavigate } from 'react-router-dom';
import logo from 'assets/img/auth/logo.png';
import loginIllustration from 'assets/img/auth/5700472.png';

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      toast({
        title: 'Email tidak boleh kosong!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Silahkan cek kembali password anda!',
        description: 'Minimal 6 karakter ya... kalau kamu lupa🤗',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      // Simpan token dan user di localStorage jika Remember Me dicentang, else di sessionStorage
    if (rememberMe) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
    }

      // Redirect berdasarkan role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'owner') {
        navigate('/owner/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
      toast({
        title: 'Login Success!',
        description: `Welcome back, ${user.username}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Login Failed',
        description: err.response?.data?.message || 'Invalid credentials',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  return (
    <Flex
      height="100vh"
      overflowY="auto" // Menambahkan scroll jika konten lebih besar dari layar
      direction={{ base: 'column', lg: 'row' }}
    >
      {/* Left Section - Illustration */}
      <Box
        maxW={{ base: "90%", md: "600px" }} mx="auto" width="100%"
        flex="1"
        bg="#23653B"
        color="white"
        fontFamily="Arimo"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={{ base: 4, lg: 12 }}
      >
        <VStack spacing={5} align="center" textAlign="left" marginTop={{ base: 0, lg: '5px' }}>
          <Box mt={{ base: 4, lg: 8 }}>
            <Heading fontSize={{ base: 'xl', lg: '3xl' }} mb={2}>
              One snap away from your next favorite meal
            </Heading>
            <Text fontSize={{ base: 'sm', lg: 'xl' }}>
              Join thousands of foodies sharing what they eat, love, and crave.
            </Text>
            <Image
              src={loginIllustration}
              alt="FoodSnap Illustration"
              maxH="500px" // Memastikan gambar bisa mengisi tinggi kontainer tanpa memotong
              width="100%" // Gambar akan menyesuaikan lebar kontainer
              objectFit="contain" // Memastikan gambar tetap dalam proporsi tanpa terpotong
              mt={{ base: 4, lg: 8 }}
            />
          </Box>
        </VStack>
      </Box>

      {/* Right Section - Form */}
      <Box
        flex="1"
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
           h={{ base: "60px", md: "100px" }} // Menyesuaikan tinggi berdasarkan ukuran layar
           maxW="100%" // Logo akan lebar 100% dari elemen induk
           objectFit="contain"
           position="absolute"
           top="1"
           right="7"
        />
        <Box maxW="600px" mx="auto" width="100%">
          <Heading fontSize="2xl" mb={2} color="green.800">
            Good to See You Again!
          </Heading>
          <Text fontSize="sm" color="gray.600" mb={6}>
            Continue your food journey with the FoodSnap community.
          </Text>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // cegah reload halaman
              handleLogin(); // panggil fungsi login
            }}
          >
            <FormControl mb={4}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Flex justify="space-between" align="center" mb={6}>
              <Checkbox
                colorScheme="green"
                iconColor="white"
                borderColor="#23653B"
                _checked={{
                  borderColor: '#23653B',
                  color: 'black',
                }}
                isChecked={rememberMe} // Pastikan checkbox tercentang sesuai dengan state
                onChange={() => setRememberMe(!rememberMe)} // Ubah state saat checkbox diklik
              >
                Remember Me
              </Checkbox>
              <Link
                as={NavLink}
                to="/auth/forgot-password"
                fontSize="sm"
                color="green.600"
              >
                Forgot Password?
              </Link>
            </Flex>
            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Logging in..."
              color="white"
              bgColor="#23653B"
              width="100%"
              mb={4}
              _hover={{ bg: '#1C4F2F' }}
            >
              Continue Snapping
            </Button>
          </form>
          <Text fontSize="sm" color="" textAlign="center">
            Don't have an account?{' '}
            <Link as={NavLink} to="/auth/sign-up-role" color="green.600">
              Sign up here
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default SignIn;
