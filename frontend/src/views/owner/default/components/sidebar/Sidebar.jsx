import React from "react";
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Content from "./SideBarContent";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "./ScrollBar";
import { Scrollbars } from "react-custom-scrollbars-2";
import { IoMenuOutline } from "react-icons/io5";

const Sidebar = () => {
  const sidebarBg = useColorModeValue("white", "green");
  const shadow = useColorModeValue("14px 17px 40px 4px rgba(112, 144, 176, 0.08)", "unset");

  return (
    <Box display={{ sm: "none", xl: "block" }} w="300px" position="fixed" h="100vh" bg={sidebarBg} boxShadow={shadow}>
      <Scrollbars
        autoHide
        renderTrackVertical={renderTrack}
        renderThumbVertical={renderThumb}
        renderView={renderView}
      >
        <Content />
      </Scrollbars>
    </Box>
  );
};

export function SidebarResponsive() {
  const sidebarBg = useColorModeValue("white", "green");
  const menuColor = useColorModeValue("green.300", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent w="285px" maxW="285px" bg={sidebarBg}>
          <DrawerCloseButton _focus={{ boxShadow: "none" }} _hover={{ boxShadow: "none" }} />
          <DrawerBody px="0" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;
