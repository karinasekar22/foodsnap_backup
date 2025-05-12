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
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import logo from 'assets/img/auth/logo.png';
import registerIllustration from 'assets/img/auth/register-customer.png';

function SignUpCustomer() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordSuggestions, setPasswordSuggestions] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    let suggestions = '';
    switch (name) {
      case 'username':
        if (value && value.trim().length < 3) {
          error = 'Username must be at least 3 characters';
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
        // Real-time password strength suggestions
        if (value) {
          const suggestionsArray = [];
          if (value.length < 8) {
            suggestionsArray.push('at least 8 characters');
          }
          if (!/[A-Z]/.test(value)) {
            suggestionsArray.push('an uppercase letter');
          }
          if (!/[a-z]/.test(value)) {
            suggestionsArray.push('a lowercase letter');
          }
          if (!/[0-9]/.test(value)) {
            suggestionsArray.push('a number');
          }
          if (!/[^A-Za-z0-9]/.test(value)) {
            suggestionsArray.push('a special character');
          }
          if (suggestionsArray.length > 0) {
            suggestions = `For a stronger password, include ${suggestionsArray.join(', ')}.`;
          }
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
    if (name === 'password') {
      setPasswordSuggestions(suggestions);
    }
    return error === '';
  };

  useEffect(() => {
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
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
      await axios.post('/auth/register', {
        username: formData.username,
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

      setTimeout(() => navigate('/admin/default'), 3000);
    } catch (err) {
      toast({
        title: 'Registration Failed',
        description:
          err.response?.data?.message === 'Username, email, dan password wajib diisi'
            ? 'Please fill in all required fields: username, email, and password.'
            : err.response?.data?.message || 'Something went wrong',
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
      <Flex
        flex="1"
        direction="column"
        p={{ base: 4, md: 6, lg: 10 }}
        pt={{ base: 6, md: 8 }}
        overflow="auto"
        bg="white"
        position="relative"
      >
        <Box position="absolute" top="4" left="5">
          <Image
            src={logo}
            alt="FoodSnap Logo"
            h={{ base: '60px', md: '60px', lg: '70px' }}
            objectFit="contain"
          />
        </Box>

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

          <FormControl mb={4} isInvalid={errors.username}>
            <FormLabel fontSize="sm" color="gray.700" mb={1}>
              Username <Box as="span" color="red.500">*</Box>
            </FormLabel>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              size="md"
              height="44px"
              borderRadius="md"
              autoComplete="off"
            />
            <FormErrorMessage fontSize="xs">{errors.username}</FormErrorMessage>
          </FormControl>

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
              autoComplete="email"
            />
            <FormErrorMessage fontSize="xs">{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={errors.password}>
            <FormLabel fontSize="sm" color="gray.700" mb={1}>
              Password <Box as="span" color="red.500">*</Box>
            </FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
                size="md"
                height="44px"
                borderRadius="md"
                autoComplete="new-password"
              />
              <InputRightElement height="44px" width="3rem">
                <IconButton
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage fontSize="xs">{errors.password}</FormErrorMessage>
            {passwordSuggestions && (
              <Text fontSize="xs" color="yellow.600" mt={1}>
                {passwordSuggestions}
              </Text>
            )}
          </FormControl>

          <FormControl mb={5} isInvalid={errors.confirmPassword}>
            <FormLabel fontSize="sm" color="gray.700" mb={1}>
              Confirm Password <Box as="span" color="red.500">*</Box>
            </FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                size="md"
                height="44px"
                borderRadius="md"
                autoComplete="new-password"
              />
              <InputRightElement height="44px" width="3rem">
                <IconButton
                  variant="ghost"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage fontSize="xs">
              {errors.confirmPassword}
            </FormErrorMessage>
          </FormControl>

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

          <Text fontSize="xs" textAlign="center" color="gray.600">
            Want to register your food business instead?{' '}
            <Link as={NavLink} to="/auth/registerUMKM" color="green.600" fontWeight="medium">
              Sign up as a Business Owner
            </Link>
          </Text>
        </Box>
      </Flex>

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
              mt={{ base: 4, lg: '2' }}
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