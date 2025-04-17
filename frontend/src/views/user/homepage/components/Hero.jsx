import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  VStack,
  Stack,
  Center,
  Icon,
  Text,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FaCamera, FaMapMarkerAlt, FaUsers, FaMobileAlt } from 'react-icons/fa';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';

import heroImage from 'assets/img/homepage/background.png';

const Hero = () => {
  return (
    <Box
      bgImage={heroImage}
      bgSize="cover"
      bgPosition="center"
      h={{ base: '70vh', md: '80vh' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      color="white"
      position="relative"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.5)"
      />
      <VStack spacing={6} zIndex={1}>
        <Heading
          fontSize={{ base: '3xl', md: '5xl' }}
          fontFamily="Arimo, sans-serif"
          textAlign="center"
        >
          <Box as="span" fontWeight="bold" letterSpacing="0.1em">
            FoodSnap
          </Box>
          <br />
          <Box as="span" fontWeight="300" fontSize={{ base: '2xl', md: '4xl' }}>
            Take a snap & review your favorite meals!
          </Box>
        </Heading>
        <Flex
          w={{ base: '90%', md: '600px' }}
          bg="white"
          borderRadius="7px"
          boxShadow="md"
          p={1}
          align="center"
        >
          <Box
            px={2}
            borderRight="1px"
            borderColor="gray.200"
            color="gray.700"
            h="40px"
            display="flex"
            alignItems="center"
          >
            <Box as="span" color="green.500" mr={1}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </Box>

            <Select
              variant="unstyled"
              defaultValue="Bandung"
              icon={<ChevronDownIcon />}
              width="110px"
              fontSize="md"
              fontWeight="medium"
            >
              <option value="Bandung">Bandung</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Surabaya">Surabaya</option>
            </Select>
          </Box>

          <InputGroup flex={1}>
            {/* <InputLeftElement pointerEvents="none" pl={3}>
              <SearchIcon color="gray.400" />
            </InputLeftElement> */}
            <Input
              pl={10}
              placeholder="What's on your craving list today?"
              border="none"
              color="gray.600"
              _focus={{ outline: 'none' }}
              _placeholder={{ color: 'gray.400' }}
            />
          </InputGroup>

          <Button colorScheme="white" size="md" borderRadius="7px" mx={1} p={3}>
            <SearchIcon color="green" />
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Hero;
