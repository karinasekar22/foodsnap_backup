// chakra imports
import { Box, Flex, Stack, Image } from '@chakra-ui/react';
import { HSeparator } from 'components/separator/Separator';
import React from 'react';
import SidebarLinks from './SidebarLinks';
import { FoodsnapLogo } from "components/icons/Icons";

const SidebarContent = () => {
  // SIDEBAR
  return (
    <Flex
      direction="column"
      height="100%"
      pt="25px"
      px="16px"
      borderRadius="30px"
    >
      <Flex align="center" direction="column">
        <FoodsnapLogo h="40px" w="175px" my="32px" />
        <HSeparator mb="20px" />
      </Flex>
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: '16px', '2xl': '1px' }}>
          <SidebarLinks />
        </Box>
      </Stack>
    </Flex>
  );
};

export default SidebarContent;
