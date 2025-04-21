import React from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { FiCornerDownRight } from 'react-icons/fi';

const KomentarItem = ({ komentar, depth = 0, onReplyClick }) => {
  return (
    <Box
      pl={depth * 6}
      py={2}
      borderLeft={depth ? '1px solid #CBD5E0' : 'none'}
      _hover={{ bg: 'gray.50' }}
      role="group"
    >
      <HStack align="start" justify="space-between" w="full">
        <HStack>
          <Avatar size="sm" name={komentar.User?.username} />
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold">{komentar.User?.username}</Text>
            <Text>{komentar.content}</Text>
          </VStack>
        </HStack>

        <Box display="none" _groupHover={{ display: 'inline-block' }}>
          <Button
            size="xs"
            variant="ghost"
            colorScheme="blue"
            leftIcon={<FiCornerDownRight />}
            onClick={() => onReplyClick(komentar.id, komentar.User?.username)}
          >
            Reply
          </Button>
        </Box>
      </HStack>

      {komentar.children?.length > 0 && komentar.children.map((child) => (
        <KomentarItem
          key={child.id}
          komentar={child}
          depth={depth + 1}
          onReplyClick={onReplyClick}
        />
      ))}
    </Box>
  );
};

export default KomentarItem;