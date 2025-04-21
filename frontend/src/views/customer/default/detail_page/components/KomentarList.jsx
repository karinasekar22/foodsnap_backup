import React from 'react';
import { VStack } from '@chakra-ui/react';
import KomentarItem from './KomentarItem';

const KomentarList = ({ komentar, onReplyClick }) => {
  return (
    <VStack
      spacing={2}
      align="stretch"
      bg="white"
      px={12}
      pb={6}
      pt={2}
      w="100%"
      maxW="100%"
      mx="auto"
    >
      {komentar.map((item) => (
        <KomentarItem
          key={item.id}
          komentar={item}
          onReplyClick={onReplyClick}
        />
      ))}
    </VStack>
  );
};

export default KomentarList;

// VStack spacing={2} align="stretch"
