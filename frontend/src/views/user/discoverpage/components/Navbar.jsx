import React, { useState, useEffect, useRef, memo } from 'react';
import {
  Flex,
  Text,
  Button,
  Image,
  Box,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  useDisclosure,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  VStack,
  HStack,
  Input,
  Select,
  InputGroup,
  InputRightElement,
  Circle,
} from '@chakra-ui/react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { HamburgerIcon, BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { FaUserAlt, FaClipboardList, FaBookmark, FaUsers, FaHeart, FaCog, FaHeadset, FaSignOutAlt, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import logoImage from 'assets/img/homepage/logo.png';

// Konstanta untuk nilai yang sering digunakan
const COLORS = {
  primary: '#1DA344',
  text: 'gray.600',
  white: 'white',
  hoverBg: 'gray.50',
  avatarBg: '#F56565',
};

const SIZES = {
  buttonWidth: '110px',
  buttonHeight: '33px',
  logoHeight: { base: '30px', md: '30px' },
  navbarHeight: '60px',
};

// Daftar menu profil
const PROFILE_MENU = [
  { icon: FaUserAlt, text: 'My Profile', to: '/user/profile' },
  { icon: FaClipboardList, text: 'My Reviews', to: '/user/reviews' },
  { icon: FaBookmark, text: 'My Whislist', to: '/user/wishlist' },
  { icon: FaUsers, text: 'Following', to: '/user/following' },
  { icon: FaHeart, text: 'Favorites', to: '/user/favorites' },
  { icon: FaCog, text: 'Account Settings', to: '/user/settings' },
  { icon: FaHeadset, text: 'Help & Support', to: '/help' },
  { icon: FaSignOutAlt, text: 'Log Out', to: '/auth/logout', isLogout: true },
];

// Komponen tombol untuk login dan register
const AuthButton = memo(({ to, text, isSolid, onClick }) => (
  // Tombol untuk login atau register dengan gaya solid atau outline
  <Button
    as={NavLink}
    to={to}
    variant={isSolid ? 'solid' : 'outline'}
    size="md"
    width={SIZES.buttonWidth}
    height={SIZES.buttonHeight}
    bg={isSolid ? COLORS.primary : 'transparent'}
    color={isSolid ? COLORS.white : COLORS.primary}
    borderColor={COLORS.primary}
    _hover={{
      bg: isSolid ? COLORS.white : COLORS.primary,
      color: isSolid ? COLORS.primary : COLORS.white,
      border: isSolid ? `1px solid ${COLORS.primary}` : 'none',
    }}
    transition="all 0.3s ease-in-out"
    fontFamily="Poppins, sans-serif"
    onClick={onClick}
  >
    {text}
  </Button>
));

// Komponen untuk item menu profil
const ProfileMenuItem = memo(({ icon: Icon, text, to, onClick, isLogout, handleLogout }) => (
  // Item menu profil dengan ikon dan teks, mendukung logout
  <Box
    as={isLogout ? 'button' : NavLink}
    to={isLogout ? undefined : to}
    onClick={isLogout ? handleLogout : onClick}
    w="100%"
  >
    <HStack
      py={2}
      px={4}
      _hover={{ bg: COLORS.hoverBg }}
      borderRadius="md"
      transition="all 0.2s ease-in-out"
      role="group"
    >
      <Icon color={COLORS.text} size="16px" _groupHover={{ color: COLORS.primary }} />
      <Text
        color={COLORS.text}
        fontSize="sm"
        _groupHover={{ color: COLORS.primary }}
        transition="color 0.2s ease-in-out"
      >
        {text}
      </Text>
    </HStack>
  </Box>
));

// Komponen untuk input pencarian
const SearchBar = ({ searchQuery, selectedLocation, onSearchChange, onLocationChange }) => (
  // Bar pencarian dengan pemilihan lokasi dan input teks
  <Flex
    direction="row"
    w={{ base: '100%', md: '60%' }}
    bg="white"
    borderRadius="full"
    p={1}
    align="center"
    mx={{ base: 0, md: 4 }}
    display={{ base: 'none', md: 'flex' }}
    overflow="hidden"
  >
    <Flex
      px={2}
      borderRight="1px"
      borderColor="gray.200"
      color="gray.700"
      h="100%"
      align="center"
      justify="center"
    >
      <Box as={FaMapMarkerAlt} color="gray.500" mr={1} />
      <Select
        variant="unstyled"
        value={selectedLocation}
        onChange={onLocationChange}
        icon={<ChevronDownIcon />}
        width="90px"
        fontSize="md"
        color="gray.700"
      >
        <option value="Bandung">Bandung</option>
        <option value="Jakarta">Jakarta</option>
        <option value="Surabaya">Surabaya</option>
      </Select>
    </Flex>
    <InputGroup>
      <Input
        pl={4}
        pr={12}
        placeholder={searchQuery ? `Mencari ${searchQuery} di ${selectedLocation}...` : 'Cari makanan...'}
        border="none"
        color="gray.600"
        _focus={{ outline: 'none' }}
        _placeholder={{ color: 'gray.400' }}
        h="36px"
        value={searchQuery}
        onChange={onSearchChange}
      />
      <InputRightElement width="3rem" h="full">
        <Circle size="32px" bg={COLORS.primary} color="white" cursor="pointer" _hover={{ bg: '#179A3E' }}>
          <SearchIcon />
        </Circle>
      </InputRightElement>
    </InputGroup>
  </Flex>
);

const Navbar = () => {
  // State untuk mendeteksi scroll, pengguna yang login, dan menu
  const [scrolled, setScrolled] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();
  const profileRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // Mengambil parameter pencarian dari URL
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Bandung');
  const [searchResults, setSearchResults] = useState([]);

 
  // Fungsi untuk menangani logout
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setLoggedInUser(null);
    onProfileClose();
    onClose();
    navigate('/auth/sign-in');
  };

  // Fungsi untuk menangani error saat memuat avatar
  const handleAvatarError = (e) => {
    e.target.src = 'https://via.placeholder.com/40'; //nanti diganti dengan API
  };

  // Fungsi untuk memperbarui pencarian
 const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BACKEND}/api/produk/search`, {
        params: {
          search: value,
        },
      });
      setSearchResults(response.data.products || []);
    } catch (err) {
      console.error('Gagal mencari produk:', err);
      setSearchResults([]);
    }
  };


  // Fungsi untuk memperbarui lokasi
  const handleLocationChange = (e) => {
    navigate(`/user/discoverpage?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(e.target.value)}`);
  };

  // Efek untuk memuat data pengguna dan mendeteksi scroll
  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      setLoggedInUser(parsedUser);

      // Ambil data profil dari server
      const fetchProfile = async () => {
        try {
          const response = await axios.get('http://localhost:5000/profile', {
            headers: { Authorization: `Bearer ${parsedUser.token}` },
          });
          setLoggedInUser((prev) => ({
            ...prev,
            username: response.data.username,
            email: response.data.email,
            avatar_url: response.data.avatar_url || null,
          }));
        } catch (error) {
          console.error('Gagal mengambil profil:', error);
          if (error.response?.status === 401) {
            handleLogout();
          }
        }
      };
      fetchProfile();
    }

    // Deteksi scroll untuk efek bayangan navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Kontainer utama navbar dengan posisi sticky
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={{ base: 4, md: 6 }}
      py={2}
      bg={COLORS.primary}
      color={COLORS.white}
      position="sticky"
      top={0}
      zIndex={1000}
      fontFamily="Poppins, sans-serif"
      transition="all 0.3s ease"
      height={SIZES.navbarHeight}
    >
      {/* Logo aplikasi */}
      <Flex align="center">
        {/* <Image
          src={logoImage}
          alt="FoodSnap Logo"
          h={SIZES.logoHeight}
          maxW="100%"
          objectFit="contain"
          mr={2}
        /> */}
        <Text fontSize="xl" fontWeight="bold" color={COLORS.white}>
          FoodSnap
        </Text>
      </Flex>

      {/* Bar pencarian */}
      <SearchBar
        searchQuery={searchQuery}
        selectedLocation={selectedLocation}
        onSearchChange={handleSearchChange}
        onLocationChange={handleLocationChange}
      />


      {/* Ikon notifikasi dan profil */}
      <Flex align="center" gap="12px">
        <IconButton
          aria-label="Notifikasi"
          icon={<BellIcon w={6} h={6} />}
          variant="ghost"
          color={COLORS.white}
          _hover={{ color: 'gray.200' }}
          transition="color 0.2s ease-in-out"
        />
        <Box position="relative" ref={profileRef}>
          <Popover
            placement="bottom-end"
            isOpen={isProfileOpen}
            onClose={onProfileClose}
            closeOnBlur={true}
            gutter={0}
          >
            <PopoverTrigger>
              <Avatar
                size="sm"
                bg={COLORS.avatarBg}
                color="white"
                name={loggedInUser?.username?.[0] || 'H'}
                fontWeight="bold"
                src={loggedInUser?.avatar_url}
                onError={handleAvatarError}
                cursor="pointer"
                onClick={() => (isProfileOpen ? onProfileClose() : onProfileOpen())}
                _hover={{ transform: 'scale(1.05)' }}
                transition="all 0.2s ease-in-out"
              />
            </PopoverTrigger>
            <PopoverContent
              width="250px"
              borderRadius="md"
              boxShadow="lg"
              border="1px solid"
              borderColor="gray.200"
              bg={COLORS.white}
            >
              <PopoverHeader borderBottomWidth="1px" p={4}>
                <HStack>
                  <Avatar
                    size="sm"
                    bg={COLORS.avatarBg}
                    color="white"
                    name={loggedInUser?.username?.[0] || 'H'}
                    src={loggedInUser?.avatar_url}
                    onError={handleAvatarError}
                    border="2px solid"
                    borderColor={COLORS.primary}
                  />
                  <Text fontWeight="medium">Hai, {loggedInUser?.username || 'User'}!</Text>
                </HStack>
              </PopoverHeader>
              <PopoverBody p={0}>
                <VStack spacing={0} align="stretch">
                  {PROFILE_MENU.map((item) => (
                    <ProfileMenuItem
                      key={item.text}
                      icon={item.icon}
                      text={item.text}
                      to={item.to}
                      isLogout={item.isLogout}
                      handleLogout={handleLogout}
                      onClick={onProfileClose}
                    />
                  ))}
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Flex>

      {/* Tombol menu hamburger untuk mobile */}
      <IconButton
        aria-label="Buka menu"
        icon={<HamburgerIcon />}
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="ghost"
        color={COLORS.white}
      />

      {/* Drawer untuk menu mobile */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody pt={10}>
            <Stack spacing={4}>
              <Box pt={5}>
                {loggedInUser ? (
                  // Menu untuk pengguna yang sudah login
                  <Flex direction="column" gap={2}>
                    <HStack spacing={4} mb={4}>
                      <IconButton
                        aria-label="Notifikasi"
                        icon={<BellIcon w={6} h={6} />}
                        variant="ghost"
                        color={COLORS.text}
                        _hover={{ color: COLORS.primary }}
                        transition="color 0.2s ease-in-out"
                      />
                      <Avatar
                        size="sm"
                        bg={COLORS.avatarBg}
                        color="white"
                        name={loggedInUser?.username?.[0] || 'H'}
                        src={loggedInUser?.avatar_url}
                        onError={handleAvatarError}
                        border="3px solid"
                        borderColor={COLORS.primary}
                      />
                      <Text fontWeight="medium">Hai, {loggedInUser?.username || 'User'}!</Text>
                    </HStack>
                    <VStack spacing={1} align="stretch">
                      {PROFILE_MENU.map((item) => (
                        <ProfileMenuItem
                          key={item.text}
                          icon={item.icon}
                          text={item.text}
                          to={item.to}
                          isLogout={item.isLogout}
                          handleLogout={handleLogout}
                          onClick={onClose}
                        />
                      ))}
                    </VStack>
                  </Flex>
                ) : (
                  // Tombol untuk pengguna yang belum login
                  <>
                    <AuthButton to="/auth/sign-in" text="Login" onClick={onClose} />
                    <AuthButton to="/auth/sign-up-role" text="Get Started" isSolid onClick={onClose} />
                  </>
                )}
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {searchQuery && searchResults.length > 0 && (
  <Box
    position="absolute"
    top="60px" // sesuaikan dengan tinggi navbar + margin
    bg="white"
    boxShadow="md"
    borderRadius="md"
    width={{ base: '100%', md: '60%' }}
    maxHeight="300px"
    overflowY="auto"
    zIndex={1500}
  >
    {searchResults.map((item) => (
      <Box
        key={item.id}
        px={4}
        py={2}
        borderBottom="1px solid"
        borderColor="gray.200"
        cursor="pointer"
        _hover={{ bg: 'gray.100' }}
        onClick={() => {
          navigate(`/produk/${item.id}`);
          setSearchQuery('');
          setSearchResults([]);
        }}
      >
        <Text fontWeight="semibold">{item.name}</Text>
        <Text fontSize="sm" color="gray.500">{item.description?.slice(0, 50)}...</Text>
      </Box>
    ))}
  </Box>
)}
    </Flex>
  );
};

export default Navbar;