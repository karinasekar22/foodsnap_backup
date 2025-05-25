import { StarIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';

const RatingStars = ({ rating }) => (
  <Flex align="center">
    {[...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        color={i < Math.floor(rating || 4) ? 'yellow.400' : 'gray.300'}
      />
    ))}
  </Flex>
);

const TopReviews = ({ tableData }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  return (
    <Flex
      direction="column"
      w="100%"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
      bg="white"
      borderRadius="xl"
    >
      <Flex
        align={{ sm: 'flex-start', lg: 'center' }}
        justify="space-between"
        w="100%"
        pt="15px"
        px="22px"
      >
        <Text color={textColor} fontSize="xl" fontWeight="600">
          Top 3 Reviews
        </Text>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mt="12px">
          <Thead>
            <Tr>
              <Th borderColor={borderColor} fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                Username Komentator
              </Th>
              <Th borderColor={borderColor} fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                Komentar 
              </Th>
              <Th borderColor={borderColor} fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                Nama Produk Makanan Yang Dikomentari
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData && tableData.length > 0 ? (
              tableData.slice(0, 11).map((item, index) => (
                <Tr key={index}>
                  <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }}>
                    <Flex align="center">
                      <Avatar name={item.name} w="30px" h="30px" me="8px" />
                      <Text color="gray.800" fontSize="sm" fontWeight="600">
                        {console.log("item", item.Comment.content)}
                        {item.Comment.User.username}
                      </Text>
                    </Flex>
                  </Td>
                  <Td
                    fontSize={{ sm: '14px' }}
                    minW={{ sm: '10px', md: '10px', lg: 'auto' }}
                    color="gray.600"
                    fontWeight="500"
                    textAlign="left"
                  >
                    {item.Comment.content}
                  </Td>
                  <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }}>
                   {item.Comment.ItemMakanan.caption}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={3} textAlign="center" py={4} color="gray.500">
                  No data available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default TopReviews;
