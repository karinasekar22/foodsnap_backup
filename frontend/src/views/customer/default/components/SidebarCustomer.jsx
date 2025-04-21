import React from 'react';
import { VStack, HStack, Icon, Text } from '@chakra-ui/react';
import { FaHome, FaSearch, FaHeart, FaCog } from 'react-icons/fa';
import { useNavigate, useLocation, matchPath } from 'react-router-dom';

const navItems = [
  { icon: FaHome, label: "Dashboard", path: "/customer/default" },
  { icon: FaSearch, label: "Discover", path: "/customer/discover" },
  { icon: FaHeart, label: "Wishlist", path: "/customer/wishlist" },
  { icon: FaCog, label: "Settings", path: "/customer/settings" },
];

const SidebarCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        const isActive = matchPath(item.path, location.pathname);

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
              bg: '#1DA344',
              color: 'white'
            }}
            onClick={() => navigate(item.path)}
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
