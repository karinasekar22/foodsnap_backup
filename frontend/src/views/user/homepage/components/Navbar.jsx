import React, { useState, useEffect } from 'react';
import { Flex, Text, Button, Image, Box, IconButton, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, Stack, useDisclosure } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

    // Cleanup function
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
          <Button
            variant="solid"
            size="md"
            width="150px"
            height="33px"
            bg={COLORS.primary}
            color={COLORS.white}
            _hover={{
              bg: COLORS.white,
              color: COLORS.primary,
              border: "1px solid",
              borderColor: COLORS.primary,
            }}
            transition="all 0.3s ease-in-out"
            fontFamily="Poppins, sans-serif"
          >
            {loggedInUser.username}
          </Button>
        ) : (
          <>
            <AuthButton to="/auth/sign-in" text="Login" />
            <AuthButton to="/auth/register-umkm" text="Get Started" isSolid />
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
                  <Button
                    variant="solid"
                    size="md"
                    width="150px"
                    height="33px"
                    bg={COLORS.primary}
                    color={COLORS.white}
                    _hover={{
                      bg: COLORS.white,
                      color: COLORS.primary,
                      border: "1px solid",
                      borderColor: COLORS.primary,
                    }}
                    transition="all 0.3s ease-in-out"
                    fontFamily="Poppins, sans-serif"
                    onClick={onClose}
                  >
                    {loggedInUser.username}
                  </Button>
                ) : (
                  <>
                    <AuthButton
                      to="/auth/sign-in"
                      text="Login"
                      onClick={onClose}
                    />
                    <AuthButton
                      to="/auth/register-umkm"
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