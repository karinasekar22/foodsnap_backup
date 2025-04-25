import React, { useState, useEffect, memo } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  VStack,
  InputGroup,
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

// Konstanta untuk nilai yang sering digunakan
const COLORS = {
  primary: '#1DA344',
  text: 'white',
  gray: 'gray.600',
  placeholder: 'gray.400',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

const CONFIG = {
  locations: ['Bandung', 'Jakarta', 'Surabaya'],
  defaultLocation: 'Bandung',
  countdownSeconds: 10,
  searchBarWidth: { base: '100%', md: '600px' },
  headingSize: { base: '2xl', sm: '3xl', md: '5xl' },
  subHeadingSize: { base: 'xl', sm: '2xl', md: '4xl' },
};

// Komponen untuk bar pencarian
const SearchBar = memo(({ searchQuery, setSearchQuery, location, setLocation, onSearch, onKeyDown }) => (
  // Bar pencarian dengan pemilihan lokasi dan input teks
  <Flex
    direction={{ base: 'column', md: 'row' }}
    w={CONFIG.searchBarWidth}
    bg={COLORS.text}
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
      color={COLORS.gray}
      h={{ base: '40px', md: '40px' }}
      display="flex"
      alignItems="center"
      justifyContent={{ base: 'center', md: 'flex-start' }}
      w={{ base: '100%', md: 'auto' }}
      mb={{ base: 1, md: 0 }}
    >
      <Box as="span" color={COLORS.primary} mr={1}>
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
        {CONFIG.locations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </Select>
    </Box>
    <Flex flex={1} w={{ base: '100%', md: 'auto' }} direction={{ base: 'row', md: 'row' }}>
      <InputGroup flex={1}>
        <Input
          pl={{ base: 3, md: 10 }}
          placeholder="What's on your craving list today?"
          border="none"
          color={COLORS.gray}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={onKeyDown}
          _focus={{ outline: 'none' }}
          _placeholder={{ color: COLORS.placeholder, fontSize: { base: 'sm', md: 'md' } }}
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
        onClick={onSearch}
      >
        <SearchIcon color="green" />
      </Button>
    </Flex>
  </Flex>
));

const Hero = () => {
  // State untuk pengguna, pencarian, lokasi, dan countdown
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(CONFIG.defaultLocation);
  const [countdown, setCountdown] = useState(CONFIG.countdownSeconds);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Memuat data pengguna dari session storage
  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      setLoggedInUser(parsedUser);
    }
  }, []);

  // Logika countdown untuk modal
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
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  // Fungsi untuk menangani pencarian
  const handleSearch = () => {
    if (!loggedInUser) {
      setCountdown(CONFIG.countdownSeconds);
      onOpen();
      return;
    }
    if (searchQuery.trim()) {
      navigate(`/user/discoverpage?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
    }
  };

  // Fungsi untuk redirect ke halaman login
  const handleLoginRedirect = () => {
    onClose();
    navigate('/auth/sign-in');
  };

  // Fungsi untuk menangani tombol Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      {/* Kontainer utama untuk hero section */}
      <Box
        bgImage={heroImage}
        bgSize="cover"
        bgPosition="center"
        h={{ base: '60vh', sm: '70vh', md: '80vh' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        color={COLORS.text}
        position="relative"
      >
        {/* Lapisan gelap untuk meningkatkan visibilitas teks */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg={COLORS.overlay}
        />
        <VStack spacing={{ base: 4, md: 6 }} zIndex={1} px={{ base: 4, md: 0 }}>
          <Heading
            fontSize={CONFIG.headingSize}
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
              fontSize={CONFIG.subHeadingSize}
              display="inline-block"
              mt={{ base: 2, md: 3 }}
            >
              {loggedInUser
                ? 'Ready for another tasty discovery?'
                : 'Take a snap & review your favorite meals!'}
            </Box>
          </Heading>

          {/* Bar pencarian */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            location={location}
            setLocation={setLocation}
            onSearch={handleSearch}
            onKeyDown={handleKeyDown}
          />
        </VStack>
      </Box>

      {/* Modal untuk pengguna yang belum login */}
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
              color={COLORS.primary}
              borderColor={COLORS.primary}
              _hover={{
                bg: COLORS.primary,
                color: COLORS.text,
                border: 'none',
              }}
              transition="all 0.3s ease-in-out"
              fontFamily="Poppins, sans-serif"
              mr={3}
              onClick={handleLoginRedirect}
            >
              Log In ({countdown}s)
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Hero;