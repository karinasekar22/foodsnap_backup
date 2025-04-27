import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from '../../../api/axios';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from 'assets/img/auth/logo.png';
import loginIllustration from 'assets/img/auth/5700472.png';

// Komponen utama untuk halaman login
function SignIn() {
  // State untuk menyimpan data input form dan status loading
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // Hook untuk menampilkan notifikasi dan navigasi
  const toast = useToast();
  const navigate = useNavigate();

  // Fungsi untuk memvalidasi input secara real-time
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (value && !/\S+@\S+\.\S+/.test(value)) {
          error = 'Email address is invalid';
        }
        break;
      case 'password':
        if (value && value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === '';
  };

  // Efek untuk memvalidasi input secara real-time saat nilai berubah
  useEffect(() => {
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
  }, [formData]);

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menangani proses login
  const handleLogin = async () => {
    // Validasi semua input sebelum mengirim data
    const isValid = Object.keys(formData).every((key) =>
      validateField(key, formData[key])
    );

    if (!isValid || Object.values(formData).some((value) => !value)) {
      toast({
        title: 'Validation Error',
        description: 'Please check all fields and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Kirim data login ke server
      const response = await axios.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      // Simpan token dan user di localStorage jika Remember Me dicentang, else di sessionStorage
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', token);
      storage.setItem('user', JSON.stringify(user));

      // Tampilkan notifikasi sukses
      toast({
        title: 'Login Success!',
        description: `Welcome back, ${user.username}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Arahkan ke halaman sesuai role
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin/default');
        } else if (user.role === 'umkm') {
          navigate('/owner/default');
        } else {
          navigate('/customer/default');
        }
      }, 100);
    } catch (err) {
      // Tangani error dari server
      toast({
        title: 'Login Failed',
        description: err.response?.data?.message || 'Invalid credentials',
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
      width="100%"
      direction={{ base: 'column', lg: 'row' }}
      overflow="hidden"
    >
      {/* Bagian kiri: Ilustrasi (hanya tampil di layar besar) */}
      <Box
        flex="1"
        bg="#23653B"
        color="white"
        overflow="hidden"
        display={{ base: 'none', lg: 'block' }}
      >
        <Box
          p={{ md: 6, lg: 8 }}
          pt={{ md: 6, lg: 10 }}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
        >
          <Box maxW={{ md: '400px', lg: '450px' }} mx="auto">
            <Heading
              fontSize={{ md: 'xl', lg: '2xl' }}
              mb={3}
              textAlign={{ base: 'center', lg: 'left' }}
              mt={{ base: 4, lg: 2 }}
            >
              One snap away from your next favorite meal
            </Heading>
            <Text
              fontSize={{ md: 'xs', lg: 'sm' }}
              mb={2}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              Join thousands of foodies sharing what they eat, love, and crave.
            </Text>
            <Box width="100%" display="flex" justifyContent="center" mt={2}>
              <Image
                src={loginIllustration}
                alt="FoodSnap Illustration"
                maxW={{ md: '80%', lg: '90%' }}
                objectFit="contain"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Bagian kanan: Formulir login */}
      <Flex
        flex="1"
        direction="column"
        p={{ base: 4, md: 6, lg: 10 }}
        pt={{ base: 6, md: 8 }}
        overflow="auto"
        bg="white"
        position="relative"
      >
        {/* Logo aplikasi */}
        <Box position="absolute" top="4" right="5">
          <Image
            src={logo}
            alt="FoodSnap Logo"
            h={{ base: '60px', md: '60px', lg: '70px' }}
            objectFit="contain"
          />
        </Box>

        {/* Konten utama formulir */}
        <Box maxW="550px" mx="auto" width="100%" mt={{ base: 20, md: 24 }}>
          <Heading
            fontSize={{ base: 'xl', md: '2xl' }}
            color="green.700"
            textAlign={{ base: 'center', md: 'left' }}
            mb={1}
          >
            Good to See You Again!
          </Heading>
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            color="gray.600"
            textAlign={{ base: 'center', md: 'left' }}
            mb={6}
          >
            Continue your food journey with the FoodSnap community.
          </Text>

          {/* Formulir untuk login */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {/* Input untuk email */}
            <FormControl mb={4} isInvalid={errors.email}>
              <FormLabel fontSize="sm" color="gray.700" mb={1}>
                Email Address{' '}
                <Box as="span" color="red.500">
                  *
                </Box>
              </FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                size="md"
                height="44px"
                borderRadius="md"
              />
              <FormErrorMessage fontSize="xs">{errors.email}</FormErrorMessage>
            </FormControl>

            {/* Input untuk kata sandi */}
            <FormControl mb={5} isInvalid={errors.password}>
              <FormLabel fontSize="sm" color="gray.700" mb={1}>
                Password{' '}
                <Box as="span" color="red.500">
                  *
                </Box>
              </FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                size="md"
                height="44px"
                borderRadius="md"
              />
              <FormErrorMessage fontSize="xs">{errors.password}</FormErrorMessage>
            </FormControl>

            {/* Opsi Remember Me dan Forgot Password */}
            <Flex justify="space-between" align="center" mb={6}>
              <Checkbox
                colorScheme="green"
                iconColor="white"
                borderColor="#23653B"
                size="sm"
                isChecked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              >
                <Text fontSize="xs">Remember Me</Text>
              </Checkbox>
              <Link
                as={NavLink}
                to="/auth/forgot-password"
                fontSize="xs"
                color="green.600"
              >
                Forgot Password?
              </Link>
            </Flex>

            {/* Tombol untuk login */}
            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Logging in..."
              color="white"
              bgColor="#23653B"
              width="100%"
              mb={5}
              height="44px"
              fontSize="md"
              _hover={{ bg: '#1C4F2F' }}
              borderRadius="md"
            >
              Continue Snapping
            </Button>
          </form>

          {/* Tombol kembali ke halaman utama */}
          <Button
            type="button"
            color="#23653B"
            bgColor="white"
            border="1px solid #23653B"
            width="100%"
            mb={5}
            height="44px"
            fontSize="md"
            _hover={{ bg: '#f0f0f0' }}
            borderRadius="md"
            onClick={() => navigate('/user/homepage')}
          >
            Back to Home
          </Button>

          {/* Tautan untuk pendaftaran */}
          <Text fontSize="xs" textAlign="center" color="gray.600">
            Don't have an account?{' '}
            <Link
              as={NavLink}
              to="/auth/sign-up-role"
              color="green.600"
              fontWeight="medium"
            >
              Sign up here
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;