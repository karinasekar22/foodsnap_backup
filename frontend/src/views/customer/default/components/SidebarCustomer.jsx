import React from 'react';
import { VStack, HStack, Icon, Text } from '@chakra-ui/react';
import { FaHome, FaSearch, FaHeart, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useNavigate, useLocation, matchPath } from 'react-router-dom';

const navItems = [
  { icon: FaHome, label: "Dashboard", path: "/customer/default" },
  { icon: FaSearch, label: "Discover", path: "/" },
  { icon: FaHeart, label: "Wishlist", path: "/customer/wishlist" },
  { icon: FaBars, label: "Analytical", path: "/customer/analytical" },
  { icon: FaSignOutAlt, label: "Logout", path: "/logout" }, // Tambahkan Logout
];

const SidebarCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
  const confirmLogout = window.confirm('Apakah Anda yakin ingin logout?');
  if (confirmLogout) {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  }
};

  const handleNavigation = (path) => {
    if (path === '/logout') {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  return (
    <VStack
      spacing={6}
      p={4}
      bg="white"
      h="100vh"
      w="220px"
      align="flex-start"
      borderRight="1px solid #e2e8f0"
      fontFamily="Poppins, sans-serif"
    >
      {navItems.map((item, idx) => {
        const isActive = matchPath(item.path, location.pathname) && item.label !== "Logout";

        return (
          <HStack
            key={idx}
            spacing={4}
            px={3}
            py={2}
            borderRadius="lg"
            bg={isActive ? '#1DA344' : 'transparent'}
            color={isActive ? 'white' : 'gray.600'}
            cursor="pointer"
            w="full"
            _hover={{
              bg: item.label === "Logout" ? '#E53E3E' : '#1DA344',
              color: 'white',
            }}
            onClick={() => handleNavigation(item.path)}
          >
            <Icon as={item.icon} boxSize={5} />
            <Text fontWeight="medium">{item.label}</Text>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default SidebarCustomer;
