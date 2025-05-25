import { Box, VStack, HStack, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axiosInstance from 'api/axios';
import LayoutOwner from '../default/components/LayoutOwner';
import VisitorReports from './components/VisitorReports';

const ManageRestorant = () => {
  const [loading, setLoading] = useState(true); // Inisialisasi state loading
  useEffect(() => {
    axiosInstance
      .get('auth/umkm/dashboard')
      .then((response) => {
        console.log('Welcome Owner!:', response.data);
        setLoading(false); // Set loading false setelah data diterima
      })
      .catch((error) => {
        console.error('Bukan owner atau token invalid:', error);
        // Redirect ke login jika ada error
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <LayoutOwner>
      <Box mt="20vh">
        <HStack justify="space-between" w="100%" p={2}>
          <VStack w="100%">
            <VisitorReports />
          </VStack>
        </HStack>
      </Box>
    </LayoutOwner>
  );
};

export default ManageRestorant;
