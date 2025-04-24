import React, { useState, useEffect, useRef } from 'react';
import { Flex, Text, Button, Image, Box, IconButton, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, Stack, useDisclosure, Avatar, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, VStack, HStack } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HamburgerIcon, BellIcon } from '@chakra-ui/icons';
import { FaUserAlt, FaClipboardList, FaBookmark, FaUsers, FaHeart, FaCog, FaHeadset, FaSignOutAlt } from 'react-icons/fa';
import logoImage from 'assets/img/homepage/logo.png';

// Konstanta untuk nilai yang sering digunakan
const COLORS = {
  primary: '#1DA344',
  text: 'gray.600',
  white: 'white',
  hoverBg: 'gray.50'
};

const SIZES = {
  buttonWidth: '110px',
  buttonHeight: '33px',
  logoHeight: { base: '30px', md: '30px' }
};

// Daftar link navigasi
const NAV_LINKS = [
  { to: '/user/', text: 'Home' },
  { to: '/user/discover', text: 'Discover' },
  { to: '/user/categories', text: 'Categories' },
  { to: '/user/add-review', text: 'Add Review' }
];

// Menu profil untuk dropdown
const PROFILE_MENU = [
  { icon: FaUserAlt, text: 'My Profile', to: '/user/profile' },
  { icon: FaClipboardList, text: 'My Reviews', to: '/user/reviews' },
  { icon: FaBookmark, text: 'My Whislist', to: '/user/wishlist' },
  { icon: FaUsers, text: 'Following', to: '/user/following' },
  { icon: FaHeart, text: 'Favorites', to: '/user/favorites' },
  { icon: FaCog, text: 'Account Settings', to: '/user/settings' },
  { icon: FaHeadset, text: 'Help & Support', to: '/help' },
  { icon: FaSignOutAlt, text: 'Log Out', to: '/auth/logout', isLogout: true }
];

// Komponen untuk tombol login dan register
const AuthButton = ({ to, text, isSolid, onClick }) => (
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
      border: isSolid ? `1px solid ${COLORS.primary}` : 'none'
    }}
    transition="all 0.3s ease-in-out"
    fontFamily="Poppins, sans-serif"
    onClick={onClick}
  >
    {text}
  </Button>
);

// Komponen untuk item navigasi (digunakan di desktop dan mobile)
const NavItem = ({ to, text, isMobile, onClick }) => (
  <NavLink
    to={to}
    style={{ width: isMobile ? '100%' : 'auto' }}
    onClick={onClick}
  >
    {({ isActive }) => (
      <Box
        position="relative"
        role="group"
        py={isMobile ? 2 : 0}
        px={isMobile ? 3 : 0}
        _hover={isMobile ? { bg: COLORS.hoverBg } : {}}
      >
        <Text
          color={isMobile && isActive ? COLORS.primary : COLORS.text}
          fontFamily="Poppins, sans-serif"
          fontWeight="bold"
        >
          {text}
        </Text>
        {!isMobile && (
          <Box
            position="absolute"
            bottom="-2px"
            left="50%"
            width={isActive ? "60%" : "0%"}
            height="2px"
            bg={COLORS.primary}
            transform="translateX(-50%)"
            _groupHover={{ width: "60%" }}
            transition="width 0.3s ease-in-out"
            borderRadius="full"
          />
        )}
      </Box>
    )}
  </NavLink>
);

// Komponen untuk item menu profil dengan efek hover warna primary
const ProfileMenuItem = ({ icon: Icon, text, to, onClick, isLogout, handleLogout }) => (
  <Box
    as={isLogout ? 'button' : NavLink}
    to={isLogout ? undefined : to}
    style={{ width: '100%' }}
    onClick={isLogout ? handleLogout : onClick}
  >
    <HStack
      py={2}
      px={4}
      _hover={{ bg: COLORS.hoverBg }}
      borderRadius="md"
      transition="all 0.2s ease-in-out"
      role="group"
    >
      <Box 
        color={COLORS.text} 
        fontSize="sm"
        _groupHover={{ color: COLORS.primary }}
        transition="color 0.2s ease-in-out"
      >
        <Icon />
      </Box>
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
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();
  const profileRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setLoggedInUser(null);
    onProfileClose();
    onClose();
    navigate('/auth/sign-in');
  };

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      setLoggedInUser(parsedUser);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={{ base: 4, md: 12 }}
      py={3}
      bg={COLORS.white}
      boxShadow={scrolled ? 'md' : 'sm'}
      position="sticky"
      top={0}
      zIndex={1000}
      fontFamily="Poppins, sans-serif"
      transition="all 0.3s ease"
    >
      <Image
        src={logoImage}
        alt="FoodSnap Logo"
        h={SIZES.logoHeight}
        maxW="100%"
        objectFit="contain"
        alignSelf="center"
      />

      <Flex
        align="center"
        justify="center"
        flex={1}
        gap="25px"
        display={{ base: 'none', md: 'flex' }}
      >
        {NAV_LINKS.map((link) => (
          <NavItem key={link.to} to={link.to} text={link.text} />
        ))}
      </Flex>

      <Flex
        align="center"
        gap="20px"
        display={{ base: 'none', md: 'flex' }}
      >
        {loggedInUser ? (
          <>
            <IconButton
              aria-label="Notifications"
              icon={<BellIcon w={6} h={6} />}
              variant="ghost"
              color={COLORS.text}
              _hover={{ color: COLORS.primary }}
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
                    src={loggedInUser?.avatarUrl || '/api/placeholder/40/40'}
                    border="3px solid"
                    borderColor={COLORS.primary}
                    cursor="pointer"
                    onClick={() => isProfileOpen ? onProfileClose() : onProfileOpen()}
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
                  _focus={{ outline: 'none' }}
                  bg={COLORS.white}
                >
                  <PopoverHeader borderBottomWidth="1px" p={4}>
                    <HStack>
                      <Avatar 
                        size="sm" 
                        src={loggedInUser?.avatarUrl || '/api/placeholder/40/40'}
                        border="2px solid"
                        borderColor={COLORS.primary}
                      />
                      <Text fontWeight="medium">Hi, {loggedInUser?.username || 'User'}!</Text>
                    </HStack>
                  </PopoverHeader>
                  <PopoverBody p={0}>
                    <VStack spacing={0} align="stretch">
                      {PROFILE_MENU.map((item, index) => (
                        <ProfileMenuItem
                          key={index}
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
          </>
        ) : (
          <>
            <AuthButton to="/auth/sign-in" text="Login" />
            <AuthButton to="/auth/sign-up-role" text="Get Started" isSolid />
          </>
        )}
      </Flex>

      <IconButton
        aria-label="Buka menu"
        icon={<HamburgerIcon />}
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="ghost"
        color={COLORS.text}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody pt={10}>
            <Stack spacing={4}>
              {NAV_LINKS.map((link) => (
                <NavItem
                  key={link.to}
                  to={link.to}
                  text={link.text}
                  isMobile
                  onClick={onClose}
                />
              ))}
              <Box pt={5}>
                {loggedInUser ? (
                  <Flex direction="column" gap={2}>
                    <HStack spacing={4} mb={4}>
                      <IconButton
                        aria-label="Notifications"
                        icon={<BellIcon w={6} h={6} />}
                        variant="ghost"
                        color={COLORS.text}
                        _hover={{ color: COLORS.primary }}
                        transition="color 0.2s ease-in-out"
                      />
                      <Avatar 
                        size="sm" 
                        src={loggedInUser?.avatarUrl || '/api/placeholder/40/40'} //nanti diganti dengan API
                        border="3px solid"
                        borderColor={COLORS.primary}
                      />
                      <Text fontWeight="medium">Hi, {loggedInUser?.username || 'User'}!</Text>
                    </HStack>
                    <VStack spacing={1} align="stretch">
                      {PROFILE_MENU.map((item, index) => (
                        <ProfileMenuItem
                          key={index}
                          icon={item.icon}
                          text={item.to}
                          to={item.to}
                          isLogout={item.isLogout}
                          handleLogout={handleLogout}
                          onClick={onClose}
                        />
                      ))}
                    </VStack>
                  </Flex>
                ) : (
                  <>
                    <AuthButton
                      to="/auth/sign-in"
                      text="Login"
                      onClick={onClose}
                    />
                    <AuthButton
                      to="/auth/sign-up-role"
                      text="Get Started"
                      isSolid
                      onClick={onClose}
                    />
                  </>
                )}
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;