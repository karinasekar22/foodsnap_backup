import React from "react";
import { Flex } from "@chakra-ui/react";

export default function IconBox(props) {
  const { icon, ...rest } = props;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"50%"}
      _hover={{ transform: 'scale(1.03)' }}
      
      {...rest}>
      {icon}
    </Flex>
  );
}
