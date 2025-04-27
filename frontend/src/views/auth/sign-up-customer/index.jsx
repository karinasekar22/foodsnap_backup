import React, { useState, useEffect } from 'react';
import {
  Box,
  Checkbox,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  Link,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import logo from 'assets/img/auth/logo.png';
import registerIllustration from 'assets/img/auth/register-customer.png';

// Komponen utama untuk halaman pendaftaran pelanggan
function SignUpCustomer() {
  // State untuk menyimpan data input form dan status loading
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Hook untuk menampilkan notifikasi dan navigasi
  const toast = useToast();
  const navigate = useNavigate();

  // Fungsi untuk memvalidasi input secara real-time
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'fullName':
        if (value && value.trim().length < 3) {
          error = 'Name must be at least 3 characters';
        }
        break;
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
      case 'confirmPassword':
        if (value && value !== formData.password) {
          error = 'Passwords do not match';
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

  // Fungsi untuk menangani proses pendaftaran
  const handleRegister = async () => {
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

    if (!isTermsAccepted) {
      toast({
        title: 'Please accept the terms and conditions.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Kirim data pendaftaran ke server
      await axios.post('/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      toast({
        title: 'Registration Successful!',
        description: 'You can now log in with your credentials.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Arahkan ke halaman admin setelah berhasil
      setTimeout(() => navigate('/admin/default'), 3000);
    } catch (err) {
      // Tangani error dari server
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
      width="100%"
      direction={{ base: 'column', lg: 'row' }}
      overflow="hidden"
    >
      {/* Bagian kiri: Formulir pendaftaran */}
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
        <Box position="absolute" top="4" left="5">
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
            Create Your Food Explorer Account
          </Heading>
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            color="gray.600"
            textAlign={{ base: 'center', md: 'left' }}
            mb={6}
          >
            Snap, review, and explore dishes from all over the city. Join thousands
            of food lovers on FoodSnap!
          </Text>

          {/* Input untuk nama lengkap */}
          <FormControl mb={4} isInvalid={errors.fullName}>
            <FormLabel fontSize="sm" color="gray.700" mb={1}>
              Full Name <Box as="span" color="red.500">*</Box>
            </FormLabel>
            <Input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              size="md"
              height="44px"
              borderRadius="md"
            />
            <FormErrorMessage fontSize="xs">{errors.fullName}</FormErrorMessage>
          </FormControl>

          {/* Input untuk email */}
          <FormControl mb={4} isInvalid={errors.email}>
            <FormLabel fontSize="sm" color="gray.700" mb={1}>
              Email <Box as="span" color="red.500">*</Box>
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
          <FormControl mb={4} isInvalid={errors.password}>
            <FormLabel fontSize="sm" color="gray.700" mb={1}>
              Password <Box as="span" color="red.500">*</Box>
            </FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleInputChange}
              size="md"
              height="44px"
              borderRadius="md"
            />
            <FormErrorMessage fontSize="xs">{errors.password}</FormErrorMessage>
          </FormControl>

          {/* Input untuk konfirmasi kata sandi */}
          <FormControl mb={5} isInvalid={errors.confirmPassword}>
            <FormLabel fontSize="sm" color="gray.700" mb={1}>
              Confirm Password <Box as="span" color="red.500">*</Box>
            </FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              size="md"
              height="44px"
              borderRadius="md"
            />
            <FormErrorMessage fontSize="xs">
              {errors.confirmPassword}
            </FormErrorMessage>
          </FormControl>

          {/* Checkbox untuk syarat dan ketentuan */}
          <Box mb={5}>
            <Checkbox
              colorScheme="green"
              isChecked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
              size="sm"
            >
              <Text fontSize="xs">Accept Terms & Conditions</Text>
            </Checkbox>
          </Box>

          {/* Tombol untuk mendaftar */}
          <Button
            isLoading={isLoading}
            color="white"
            bgColor="#23653B"
            width="100%"
            mb={5}
            height="44px"
            fontSize="md"
            onClick={handleRegister}
            _hover={{ bg: '#1C4F2F' }}
            borderRadius="md"
          >
            Start Snapping!
          </Button>

          {/* Tombol kembali ke halaman utama */}
          <Button
            isLoading={isLoading}
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

          {/* Tautan untuk pendaftaran bisnis */}
          <Text fontSize="xs" textAlign="center" color="gray.600">
            Want to register your food business instead?{' '}
            <Link as={NavLink} to="/auth/registerUMKM" color="green.600" fontWeight="medium">
              Sign up as a Business Owner
            </Link>
          </Text>
        </Box>
      </Flex>

      {/* Bagian kanan: Ilustrasi (hanya tampil di layar besar) */}
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
              Your Foodie Adventure Awaits!
            </Heading>
            <Text
              fontSize={{ md: 'xs', lg: 'sm' }}
              mb={2}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              Discover, snap, and share your tastiest moments with a community that
              loves food as much as you do.
            </Text>
            <Text
              fontSize={{ md: 'xs', lg: 'sm' }}
              mb={3}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              Let's turn every bite into a story worth sharing. ❤️
            </Text>
            <Box width="100%" display="flex" justifyContent="center" mt={2}>
              <Image
                src={registerIllustration}
                alt="Food Explorer Illustration"
                maxW={{ md: '80%', lg: '90%' }}
                objectFit="contain"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default SignUpCustomer;