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
  import registerUMKMIllustration from 'assets/img/auth/registerUMKM.png';
  
function SignUpUMKM() {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('umkm');

    const [confirmPassword, setConfirmPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const handleRegister = async () => {
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
                address,
                role
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
            {/* Left Section - Illustration */}
            <Box
                maxW={{ base: "90%", md: "725px" }} mx="auto" width="100%"
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
                            src={registerUMKMIllustration}
                            alt="FoodSnap Illustration Register UMKM"
                            maxH="666px" // Memastikan gambar bisa mengisi tinggi kontainer tanpa memotong
                            width="100%" // Gambar akan menyesuaikan lebar kontainer
                            objectFit="contain" // Memastikan gambar tetap dalam proporsi tanpa terpotong
                            mt={{ base: 4, lg: 8 }}
                        />
                    </Box>
                </VStack>
            </Box>


             <Box
                   
                   flex="1"
                   p={{ base: 4, lg: 12 }}
                   display="flex"
                   flexDirection="column"
                   justifyContent="center"
                   bg="white"
                   position="relative"
                 >

                <VStack spacing={4} align="center" textAlign="left">
                    <Heading fontSize="2xl" color="green.800">
                        Create Your Account
                    </Heading>

                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>


                    <FormControl isRequired>
                        <FormLabel>Address</FormLabel>
                        <Input
                            type="text"
                            placeholder="Your Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        loadingText="Registering..."
                        color="white"
                        bgColor="#23653B"
                        width="100%"
                        onClick={handleRegister}
                        _hover={{ bg: '#1C4F2F' }}
                    >
                        Sign Up
                    </Button>

                    <Text fontSize="sm" color="gray.600" textAlign="center">
                        Already have an account?{' '}
                        <NavLink to="/auth/sign-in" style={{ color: '#23653B' }}>
                            Log in here
                        </NavLink>
                    </Text>
                </VStack>
            </Box>


        </Flex>
    );
}

export default SignUpUMKM;
