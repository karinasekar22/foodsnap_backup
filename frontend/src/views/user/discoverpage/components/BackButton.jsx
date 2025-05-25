// src/components/BackButton.js
import React from 'react';
import { IconButton, Flex } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ label, ...props }) => {
  const navigate = useNavigate();

  return (
    <Flex align="center" p={4} {...props}>
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label={label || 'Kembali'}
        onClick={() => navigate(-1)}
        variant="ghost"
        size="md"
      />
    </Flex>
  );
};

export default BackButton;
