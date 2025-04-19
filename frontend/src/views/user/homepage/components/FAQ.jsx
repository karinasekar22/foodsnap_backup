import React from 'react';
import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Center,
} from '@chakra-ui/react';

const FAQ = () => {
  return (
    <Box py={16} px={{ base: 4, md: 12 }} pb="100px" bg="gray.50">
      <Center textAlign="center" maxW="800px" mx="auto" mb={12}>
        <Box>
          <Heading mb={4}>
            <Box as="span" color="#1DA344">
              FAQ's
            </Box>
            <br />
            Got Questions? We’ve Got Answers!
          </Heading>
          <Text color="gray.600">
            Can’t find what you’re looking for? Feel free to reach us at xxxxx@gmail.com
          </Text>
        </Box>
      </Center>
      <Accordion
        allowToggle
        w={{ base: '100%', md: '600px' }}
        mx="auto"
        maxH="500px" // Batasi tinggi maksimum Accordion
        overflowY="auto" // Tambahkan scroll jika konten melebihi
        zIndex={1} // Pastikan zIndex lebih rendah dari Footer
      >
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Can I find a restaurant based on my location?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            Yes! Use our location-based search to find the best local eats near you.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              How do I add a restaurant review?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            Sign up or log in, snap a photo of your meal, and share your review with our community.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Does FoodSnap have a mobile app?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            Yes, you can download our app from the App Store or Google Play.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Is FoodSnap free to use?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            Absolutely! FoodSnap is free for all users to explore, snap, and share.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default FAQ;