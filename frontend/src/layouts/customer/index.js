// layouts/LayoutUmkm.js
import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import routes from 'routes.js';
import { Routes, Route, Navigate } from 'react-router-dom';


const CustomerLayout = (props) =>  {
const { theme, setTheme, ...rest } = props;

  const getRoute = () => {
    return window.location.pathname !== '/customer/full-screen-maps';
  };

  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === '/customer') {
        return (
          <Route path={`${route.path}`} element={route.component} key={key} />
        );
      }
      if (route.collapse) {
        return getRoutes(route.items);
      } else {
        return null;
      }
    });
  };

  return (
    <Box>
      <Box
        minHeight="100vh"
        height="100%"
        overflow="auto"
        position="relative"
        maxHeight="100%"
        w="100%"
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
      >
        {getRoute() ? (
          <Box
            mx="auto"
            minH="100vh"
          >
            <Routes>
              {getRoutes(routes)}
              <Route path="/" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default CustomerLayout;