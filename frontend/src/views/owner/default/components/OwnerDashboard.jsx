import { Box, VStack, HStack, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axiosInstance from 'api/axios';
import ReportCard from './report_card/ReportCard';
import Calendar from './CalendarOwner';
import AnalyticOwner from './analytic/AnalyticOwner';
import DailyTraffic from './DailyTrafficOwner';
import TopReviews from './TopReviews';
import tableDataTopCreators from './variables/tableDataTopCreators.json';
import { tableColumnsTopCreators } from './variables/tableColumnsTopCreators';

const OwnerDashboard = () => {
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
 <Box mt="20vh">
  <HStack justify="space-between" w="100%" p={2}>
    <VStack w="100%">
      <AnalyticOwner />
    </VStack>
  </HStack>
</Box>

  );
};

export default OwnerDashboard;
