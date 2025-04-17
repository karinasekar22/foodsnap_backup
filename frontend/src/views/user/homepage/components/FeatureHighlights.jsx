import React from 'react';
import { Flex, Box, Text, Icon, Stack, Center } from '@chakra-ui/react';
import { FaMobileAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const FeatureHighlights = () => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      px={8}
      py={6}
      w={{ base: '95%', md: '90%' }}
      maxW="1000px"
      mx="auto"
      mt="-70px"
      position="relative"
      zIndex={2}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        textAlign="center"
        gap={{ base: 6, md: 4 }}
      >
        <Stack spacing={1} align="center" flex={1}>
          <Center w="50px" h="50px" color="green.500">
            <Icon as={FaMobileAlt} boxSize={8} />
          </Center>
          <Text fontWeight="bold" fontSize="md" color="black">
            Snap & Discover
          </Text>
          <Text fontSize="xs" color="gray.600">
            Find the best food spots with just a photo.
          </Text>
        </Stack>

        <Stack spacing={1} align="center" flex={1}>
          <Center w="50px" h="50px" color="green.500">
            <Icon as={FaMapMarkerAlt} boxSize={8} />
          </Center>
          <Text fontWeight="bold" fontSize="md" color="black">
            Local Favorites
          </Text>
          <Text fontSize="xs" color="gray.600">
            Curated food recommendations in your area.
          </Text>
        </Stack>

        <Stack spacing={1} align="center" flex={1}>
          <Center w="50px" h="50px" color="green.500">
            <Icon as={FaUsers} boxSize={8} />
          </Center>
          <Text fontWeight="bold" fontSize="md" color="black">
            Community Driven
          </Text>
          <Text fontSize="xs" color="gray.600">
            Join thousands of food lovers sharing experiences.
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default FeatureHighlights;
