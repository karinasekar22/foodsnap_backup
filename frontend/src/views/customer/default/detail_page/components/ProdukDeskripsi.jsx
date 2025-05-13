import React from 'react';
import {
  Box,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const ProdukDeskripsi = ({ caption, description }) => {
  return (
    <Box
      bg="white"
      color="gray.900"
      maxW="100%"
      mx="auto"
      textAlign="left"
      mt={0}
      px={{ base: 12, sm: 24 }} // padding kanan kiri
      py={{ base: 0, sm: 5 }} // padding atas-bawah juga biar lega
    >
      <Heading
        as="h1"
        fontWeight="extrabold"
        fontSize={{ base: 'base', sm: 'xl' }}
        lineHeight="tight"
        mb={2}
      >
        {caption || 'Tidak ada deskripsi.'}
      </Heading>

      <Text
        fontSize={{ base: 'sm', sm: 'md' }}
        fontWeight="normal"
        mb={3}
        color="gray.800"
      >
        {description}
      </Text>

      <Text
        fontSize={{ base: 'sm', sm: 'md' }}
        fontWeight="bold"
        mb={6}
        color="green.600"
      >
        #SotoAyamEnak😘
      </Text>

      <InputGroup
        border="1px solid"
        borderColor="gray.300"
        borderRadius="full"
        px={3}
        py={1}
        maxW={{ base: 'sm', sm: 'md' }}
      >
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color="gray.400" boxSize={3} />
        </InputLeftElement>
        <Input
          type="search"
          placeholder="Search"
          aria-label="Search"
          value="low calorie food"
          fontSize={{ base: 'sm', sm: 'md' }}
          color="gray.400"
          _placeholder={{ color: 'gray.400' }}
          border="none"
          pl={6}
        />
        <Button
          type="submit"
          variant="ghost"
          color="green.600"
          fontSize={{ base: 'sm', sm: 'md' }}
          fontWeight="semibold"
          ml={1}
        >
        </Button>
      </InputGroup>
    </Box>
  );
};

export default ProdukDeskripsi;
