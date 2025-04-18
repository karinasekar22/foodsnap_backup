import { Box, Text, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axios';

export default function OwnerDashboard() {
  const [loading, setLoading] = useState(true);  // Inisialisasi state loading
  useEffect(() => {
    axiosInstance.get('auth/umkm/dashboard')
      .then((response) => {
        console.log('Welcome Owner!:', response.data);
        setLoading(false);  // Set loading false setelah data diterima
      })
      .catch((error) => {
        console.error('Bukan owner atau token invalid:', error);
        // Redirect ke login jika ada error
      });
  }, []); 

  if (loading) return <div>Loading...</div>;
  return (
    <Box pt="100px" px="40px">
      <Heading mb={4}>Dashboard UMKM</Heading>
      <Text>Selamat datang, ini adalah halaman dashboard khusus untuk Owner UMKM😐</Text>
    </Box>
  );
}
