import React, { useEffect, useState } from 'react';
import {
  Select,
  HStack,
  Box,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'api/axios';

const VisitorReports = () => {
  const [loading, setLoading] = useState(true);
  const [restoran, setRestoran] = useState([]);
  const [items, setItems] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedRestoranId, setSelectedRestoranId] = useState('all');
  const [selectedItemId, setSelectedItemId] = useState('all');

  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Fetch daftar restoran
  useEffect(() => {
    const fetchRestoran = async () => {
      try {
        const res = await axios.get('restoran');
        setRestoran(res.data);
      } catch (error) {
        console.error('Gagal mengambil data restoran:', error);
      }
    };

    fetchRestoran();
  }, []);

  // Fetch item berdasarkan restoran
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let res;
        if (selectedRestoranId === 'all') {
          res = await axios.get('produk/item-makanan-user/');
          setItems(res.data.items);
        } else {
          res = await axios.get(`produk/restoran/:restoran_id/${selectedRestoranId}`);
          setItems(res.data);
        }
        setSelectedItemId('all'); // reset item ketika ganti restoran
      } catch (error) {
        console.error('Gagal mengambil data item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedRestoranId]);

  // Fetch komentar berdasarkan item
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        let res;
        if (selectedItemId === 'all') {
          res = await axios.get('comments/comments'); // semua komentar
        } else {
          res = await axios.get(`comments/comments/item/${selectedItemId}`); // komentar spesifik item
        }
        setComments(res.data.data || []);
      } catch (error) {
        console.error('Gagal mengambil komentar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [selectedItemId]);

  if (loading) return <Box p={4}>Loading...</Box>;

  return (
    <Box p={4} w="full" maxW="1200px" mx="auto">
      <HStack align="flex-start" w="full" gap={4} mb={6}>
        <Select
          fontSize="sm"
          variant="subtle"
          value={selectedRestoranId}
          onChange={(e) => setSelectedRestoranId(e.target.value)}
          width="200px"
          fontWeight="700"
        >
          <option value="all">All Restaurant</option>
          {restoran.map((r) => (
            <option key={r.id} value={r.id}>
              {r.restaurant_name}
            </option>
          ))}
        </Select>

        <Select
          fontSize="sm"
          variant="subtle"
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          width="200px"
          fontWeight="700"
        >
          <option value="all">All Product</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.caption}
            </option>
          ))}
        </Select>
      </HStack>

      <Flex
        direction="column"
        w="100%"
        overflowX="auto"
        bg="white"
        borderRadius="xl"
        p={4}
        boxShadow="md"
      >
        <Text color={textColor} fontSize="xl" fontWeight="600" mb={4}>
          Daftar Komentar
        </Text>
        <Table variant="simple" color="gray.500">
          <Thead>
            <Tr>
              <Th borderColor={borderColor}>Username Komentator</Th>
              <Th borderColor={borderColor}>Komentar</Th>
              <Th borderColor={borderColor}>Nama Produk</Th>
            </Tr>
          </Thead>
          <Tbody>
            {comments.length > 0 ? (
              comments.slice(0, 10).map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <Flex align="center">
                      <Avatar
                        name={item.User?.username}
                        size="sm"
                        mr={2}
                      />
                      <Text fontWeight="600">{item.User?.username}</Text>
                    </Flex>
                  </Td>
                  <Td>{item.content}</Td>
                  <Td>{item.ItemMakanan?.caption || '-'}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={3} textAlign="center" py={4} color="gray.500">
                  Tidak ada komentar
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Flex>
    </Box>
  );
};

export default VisitorReports;
