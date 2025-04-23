import React from 'react';
import {
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  useColorModeValue,
  Button,
  Badge,
  Box,
  VStack,
  Card,
} from '@chakra-ui/react';
import { FaCalendar } from 'react-icons/fa';
import { HSeparator } from 'components/separator/Separator';

import PopularRecipe1 from 'assets/img/customer/donut.jpg';
import PopularRecipe2 from 'assets/img/customer/roti.jpg';

const RecipeItem = ({ image, category, title, date }) => {
  const textColor = useColorModeValue('brands.900', 'white');
  const textColorDate = useColorModeValue('secondaryGray.600', 'white');
  const bgHoverStyle = useColorModeValue('gray.50', 'navy.700');

  return (
    <Box
      p="16px"
      _hover={{ bg: bgHoverStyle }}
      transition="0.2s linear"
      maxW="300px"
    >
      <HStack align="start">
        <VStack align="start">
        <Badge colorScheme="green" w="fit-content">
            {category}
          </Badge>
        <Image src={image} w="77px" h="77px" borderRadius="20px" me="16px" />
        </VStack>
        <VStack align="start" textAlign="start" spacing={1} w="full" >
          <Text color={textColor} fontSize="sm" fontWeight="bold">
            {title}
          </Text>
          <HStack spacing={2} align="center">
            <Icon as={FaCalendar} color={textColor} h="14px" />
            <Text fontWeight="700" fontSize="xs" color={textColorDate}>
              {date}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

const RecipeList = () => {
  const textColor = useColorModeValue('brands.900', 'white');

  const recipes = [
    {
      image: PopularRecipe1,
      category: 'Dessert',
      title: 'How to Make a Supper Fluffy Donut in Simple Way',
      date: '20, Jun 2025',
    },
    {
      image: PopularRecipe2,
      category: 'Main Course',
      title: 'Make a Yummy Sandwich with Just 5 Ingredients',
      date: '20, Jun 2025',
    },
  ];

  return (
    <Card p="0px" borderRadius="2xl">
      <Flex
        align={{ sm: 'flex-start', lg: 'center' }}
        justify="space-between"
        w="100%"
        px="22px"
        py="18px"
      >
        <Text color={textColor} fontSize="xl" fontWeight="600">
          Popular Recipe
        </Text>
        <Button variant="action" color="green">
          See all
        </Button>
      </Flex>
      <HSeparator />
      <Box px="22px" py="14px">
        {recipes.map((recipe, index) => (
          <RecipeItem key={index} {...recipe} />
        ))}
      </Box>
    </Card>
  );
};

export default RecipeList;
