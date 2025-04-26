import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  VStack,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import heroImage from 'assets/img/homepage/background.png';

const Hero = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Bandung');
  const [countdown, setCountdown] = useState(10); // 10-second countdown
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      setLoggedInUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleLoginRedirect();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup on unmount or modal close
  }, [isOpen, countdown]);

  const handleSearch = () => {
    if (!loggedInUser) {
      // Open modal if user is not logged in
      setCountdown(10); // Reset countdown when modal opens
      onOpen();
      return;
    }
    if (searchQuery.trim()) {
      // Navigate to Discover Page with search query and location
      navigate(`/user/discoverpage?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
    }
  };

  const handleLoginRedirect = () => {
    onClose();
    navigate('/auth/sign-in');
  };

  const handleKeyDown = (e) => {
    console.log('Key pressed:', e.key); // Debug to confirm keypress detection
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault(); // Prevent form submission or other default behaviors
      handleSearch();
    }
  };

  return (
    <>
      <Box
        bgImage={heroImage}
        bgSize="cover"
        bgPosition="center"
        h={{ base: '60vh', sm: '70vh', md: '80vh' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        color="white"
        position="relative"
      >
        <Box position="absolute" top="0" left="0" right="0" bottom="0" bg="rgba(0, 0, 0, 0.5)" />
        <VStack spacing={{ base: 4, md: 6 }} zIndex={1} px={{ base: 4, md: 0 }}>
          <Heading
            fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
            fontFamily="Arimo, sans-serif"
            textAlign="center"
            lineHeight={{ base: '1.4', md: '1.2' }}
          >
            <Box as="span" fontWeight="bold" letterSpacing="0.1em">
              {loggedInUser ? `Welcome back, ${loggedInUser.username}!` : 'FoodSnap'}
            </Box>
            <br />
            <Box
              as="span"
              fontWeight="300"
              fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }}
              display="inline-block"
              mt={{ base: 2, md: 3 }}
            >
              {loggedInUser
                ? 'Ready for another tasty discovery?'
                : 'Take a snap & review your favorite meals!'}
            </Box>
          </Heading>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            w={{ base: '100%', md: '600px' }}
            bg="white"
            borderRadius="7px"
            boxShadow="md"
            p={{ base: 2, md: 1 }}
            align="center"
          >
            <Box
              px={2}
              borderRight={{ base: 'none', md: '1px' }}
              borderBottom={{ base: '1px', md: 'none' }}
              borderColor="gray.200"
              color="gray.700"
              h={{ base: '40px', md: '40px' }}
              display="flex"
              alignItems="center"
              justifyContent={{ base: 'center', md: 'flex-start' }}
              w={{ base: '100%', md: 'auto' }}
              mb={{ base: 1, md: 0 }}
            >
              <Box as="span" color="green.500" mr={1}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </Box>
              <Select
                variant="unstyled"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                icon={<ChevronDownIcon />}
                width={{ base: '110px', md: '110px' }}
                fontSize="md"
                fontWeight="medium"
                textAlign={{ base: 'center', md: 'left' }}
              >
                <option value="Bandung">Bandung</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Surabaya">Surabaya</option>
              </Select>
            </Box>
            <Flex flex={1} w={{ base: '100%', md: 'auto' }} direction={{ base: 'row', md: 'row' }}>
              <InputGroup flex={1}>
                <Input
                  pl={{ base: 3, md: 10 }}
                  placeholder="What's on your craving list today?"
                  border="none"
                  color="gray.600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  _focus={{ outline: 'none' }}
                  _placeholder={{ color: 'gray.400', fontSize: { base: 'sm', md: 'md' } }}
                  h="40px"
                />
              </InputGroup>
              <Button
                colorScheme="white"
                size="md"
                borderRadius="7px"
                mx={1}
                p={3}
                minW={{ base: '40px', md: '40px' }}
                onClick={handleSearch}
              >
                <SearchIcon color="green" />
              </Button>
            </Flex>
          </Flex>
        </VStack>
      </Box>

      {/* Modal for unauthenticated users */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ready to explore? Sign in to unlock the feast!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Sign in to explore food reviews, snaps, and local favorites!</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="md"
              width="110px"
              height="33px"
              bg="transparent"
              color="#1DA344"
              borderColor="#1DA344"
              _hover={{
                bg: '#1DA344',
                color: 'white',
                border: 'none',
              }}
              transition="all 0.3s ease-in-out"
              fontFamily="Poppins, sans-serif"
              mr={3}
              onClick={handleLoginRedirect}
            >
              Log In ({countdown}s)
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Hero;