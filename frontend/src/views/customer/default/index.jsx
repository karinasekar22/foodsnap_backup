import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, Image, Grid, GridItem } from '@chakra-ui/react';
import axiosInstance from '../../../api/axios';

import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // 👉 untuk redirect
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Menjalankan kedua request dalam satu useEffect
    axiosInstance.get('auth/customer/dashboard')
      .then((response) => {
        console.log('Welcome Customer!:', response.data);
        setLoading(false);  // Set loading false setelah data diterima
      })
      .catch((error) => {
        console.error('Bukan customer atau token invalid:', error);
        // Redirect ke login jika ada error
      });
  
    axiosInstance
      .get('produk/item-makanan')
      .then(res => setItems(res.data))
      .catch(err => console.error('Gagal ambil data item:', err));
  
  }, []); 
  
  if (loading) return <div>Loading...</div>; // Hanya jalankan sekali saat komponen pertama kali mount
  
  return (
    <Box pt="100px" px="40px">
      <Heading mb={4}>Dashboard Customer</Heading>
      <Text mb={6}>Selamat datang, ini adalah halaman dashboard khusus untuk Customer🚀</Text>

      <Heading size="md" mb={4}>Daftar Semua Menu</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {items.length > 0 ? (
          items.map(item => (
            <GridItem
              key={item.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={3}
              cursor="pointer"
              onClick={() => navigate(`/customer/produk/${item.id}`)} // 👉 Redirect ke detail
              _hover={{ boxShadow: 'md' }}
            >
              <Image
                src={`http://localhost:5000${item.photo_url}`}
                alt={item.caption}
                borderRadius="md"
                boxSize="150px"
                objectFit="cover"
                mx="auto"
              />
              <Text mt={3} textAlign="center" fontWeight="semibold">
                {item.caption}
              </Text>
            </GridItem>
          ))
        ) : (
          <Text>Item tidak ditemukan.</Text>
        )}
      </Grid>
    </Box>
  );
}
