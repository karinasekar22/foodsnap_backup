import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack } from '@chakra-ui/react';
import axiosInstance from 'api/axios';

import ReportCard from './report_card/ReportCard';
import Calendar from './CalendarOwner';
import AnalyticOwner from './analytic/AnalyticOwner';
import DailyTraffic from './DailyTrafficOwner';
import TopReviews from './TopReviews';

import tableDataTopCreators from './variables/tableDataTopCreators.json';
import { tableColumnsTopCreators } from './variables/tableColumnsTopCreators';

const OwnerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [setTopUser, setTopUsers] = useState([]);

  const [user, setUser] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [dashboardRes, itemsRes, restoranRes, wishlishtRes,totalTopUser] = await Promise.all([
          axiosInstance.get('auth/umkm/dashboard'),
          axiosInstance.get('produk/item-makanan/user'),
          axiosInstance.get('restoran'),
          axiosInstance.get('wishlist/total-wishlist'),
          axiosInstance.get('comments-detail/top/review'),

        ]);

        setUser(dashboardRes.data);
        setItems(itemsRes.data);
        setRestaurants(restoranRes.data);
        setWishlist(wishlishtRes.data);
        setTopUsers(totalTopUser.data.data);

        console.log(wishlishtRes.data);
        console.log('Welcome Owner:', dashboardRes.data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Box p={4}>Loading...</Box>;

  return (
    <Box p={4}>
      <ReportCard totalRestoran={restaurants.length} items={items.total} wishlist={wishlist.total}/>
      <HStack
        justify="space-between"
        align="start"
        spacing={4}
        mt={4}
        w="100%"
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
      >
        <VStack spacing={4} w="100%">
          <AnalyticOwner dateRange={dateRange} />
          <TopReviews
            tableData={setTopUser}
          />
        </VStack>

        <VStack spacing={4} w={{ base: '100%', md: 'auto' }}>
          <Calendar dateRange={dateRange} setDateRange={setDateRange} />
          <DailyTraffic />
        </VStack>
      </HStack>
    </Box>
  );
};

export default OwnerDashboard;
