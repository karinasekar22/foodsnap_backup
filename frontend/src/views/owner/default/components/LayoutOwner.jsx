import React, { useState } from 'react';
import { useDisclosure, Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import routes from 'routes'; 

const LayoutOwner = ({ children }) => {
  const { onOpen } = useDisclosure(); 
  const [fixed] = useState(false); 
  const location = useLocation(); 

  const getActiveRoute = () => {
    let activeRoute = 'Default Brand Text';
    for (let route of routes) {
      if (
        route.layout &&
        location.pathname.indexOf(route.layout + route.path) !== -1
      ) {
        activeRoute = route.name || activeRoute;
      }
    }
    return activeRoute;
  };

  const getActiveNavbarText = () => {
    let activeNavbarText = '';
    for (let route of routes) {
      if (
        route.layout &&
        location.pathname.indexOf(route.layout + route.path) !== -1
      ) {
        activeNavbarText = route.messageNavbar || activeNavbarText;
      }
    }
    return activeNavbarText;
  };

  return (
    <>
      <Navbar
        onOpen={onOpen}
        brandText={getActiveRoute()} // Pass active route name
        message={getActiveNavbarText()} // Pass active navbar message
        fixed={fixed}
        style={{ zIndex: 1000 }}
      />
      <Sidebar toggleSidebar={fixed} />
      <Box
        float="right"
        minHeight="100vh"
        height="100%"
        overflow="auto"
        position="relative"
        maxHeight="100%"
        w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
        maxWidth={{ base: '100%', xl: 'calc( 100% - 325px )' }}
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
      >
        {children}
      </Box>
    </>
  );
};

export default LayoutOwner;
