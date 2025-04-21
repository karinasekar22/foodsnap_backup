import React, { useState, forwardRef } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';

const FormKomentar = forwardRef(({ itemId, parentId, onSubmit, replyingToUser }, ref) => {
  const [newKomentar, setNewKomentar] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newKomentar.trim()) {
      onSubmit(newKomentar);
      setNewKomentar('');
    }
  };

  return (
    <Box
      ref={ref}
      bg="white"
      px={4}
      pb={6}
      pt={2}
      w="100%"
      maxW="100%"
      mx="auto"
      borderTop="1px solid"
      borderColor="gray.100"
    >
      <Box w="full" maxW="xl" mx="auto">
        {replyingToUser && (
          <Text fontSize="sm" color="gray.500" mb={1}>
            Membalas ke <b>@{replyingToUser}</b>
          </Text>
        )}
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Add Comments..."
              value={newKomentar}
              onChange={(e) => setNewKomentar(e.target.value)}
              bg="#F5F7FA"
              h="40px"
              px={4}
              fontSize="sm"
              color="gray.600"
              borderRadius="xl"
              border="1px solid transparent"
              _focus={{
                outline: 'none',
                ring: 2,
                ringColor: 'blue.400',
              }}
            />
            <InputRightElement>
              <IconButton
                aria-label="Kirim komentar"
                icon={<FaPaperPlane />}
                colorScheme="blue"
                size="sm"
                variant="ghost"
                onClick={handleSubmit}
              />
            </InputRightElement>
          </InputGroup>
        </form>
      </Box>
    </Box>
  );
});

export default FormKomentar;