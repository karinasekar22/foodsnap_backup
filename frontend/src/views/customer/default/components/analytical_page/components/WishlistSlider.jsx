import React, { useEffect, useRef, useState } from 'react';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const WishlistSlider = ({ children }) => {
  const sliderRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = () => {
    const el = sliderRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft === 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth);
  };

  const scroll = (direction) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    updateScrollState();
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState);
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [children]);

  return (
    <Box position="relative" w="full">
      <IconButton
        aria-label="scroll left"
        icon={<ChevronLeftIcon />}
        position="absolute"
        left={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        onClick={() => scroll('left')}
        isDisabled={atStart}
        bg="whiteAlpha.700"
        _hover={{ bg: 'whiteAlpha.900' }}
        boxShadow="md"
        rounded="full"
      />

      <Box
        ref={sliderRef}
        overflowX="auto"
        scrollBehavior="smooth"
        py="2"
        w="full"
        px={12}
        whiteSpace="nowrap"
        sx={{
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari, Edge
          },
        }}
      >
        <HStack spacing={4} minW="max-content">
          {children}
        </HStack>
      </Box>
      <IconButton
        aria-label="scroll right"
        icon={<ChevronRightIcon />}
        position="absolute"
        right={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        onClick={() => scroll('right')}
        isDisabled={atEnd}
        bg="whiteAlpha.700"
        boxShadow="md"
        rounded="full"
        _hover={{ bg: 'whiteAlpha.900' }}
      />
    </Box>
  );
};

export default WishlistSlider;
