import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";

import routes from "routes.js";

const SidebarLinks = () => {
  const location = useLocation();

  // Chakra UI Color Mode
  const activeColor = useColorModeValue("green.300", "white");
  const activeIcon = useColorModeValue("green.300", "white");
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const brandColor = useColorModeValue("green.300", "green.300");

  const isActiveRoute = (routePath) => location.pathname.includes(routePath);

  const renderLinks = (routesArray) => {
    return routesArray.map((route, index) => {
      // Hanya render routes dengan layout '/owner'
      if (route.layout === '/owner') {
        if (route.category) {
          return (
            <React.Fragment key={index}>
              <Text
              fontSize={"md"}
              color={activeColor}
              fontWeight='bold'
              mx='auto'
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pt='18px'
              pb='12px'
              key={index}>
              {route.name}
            </Text>
            {renderLinks(route.items)}
            </React.Fragment>
          );
        } else if (route.layout) {
          return (
            <NavLink key={index} to={route.layout + route.path}>
              <Box>
                <HStack spacing={isActiveRoute(route.path) ? "22px" : "26px"} py="5px" ps="10px">
                  <Flex w="100%" align="start" justify="start">
                    {route.icon && (
                      <Box color={isActiveRoute(route.path) ? activeIcon : textColor} me="18px">
                        {route.icon}
                      </Box>
                    )}
                    <Text color={isActiveRoute(route.path) ? activeColor : textColor} fontWeight={isActiveRoute(route.path) ? "bold" : "normal"}>
                      {route.name}
                    </Text>
                  </Flex>
                  <Box h="36px" w="4px" bg={isActiveRoute(route.path) ? brandColor : "transparent"} borderRadius="5px" />
                </HStack>
              </Box>
            </NavLink>
          );
        }
      }
      return null;
    });
  };

  return <>{renderLinks(routes)}</>;
};

export default SidebarLinks;
