// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'api/axios';
// Custom components
import Card from 'components/card/Card.js';
import LineChart from './LineChartOwner';
import { RiArrowUpSFill } from 'react-icons/ri';
// Assets
import dayjs from 'dayjs';
import { eachDayOfInterval, format } from 'date-fns';
import { lineChartOptionsTotalSpent } from './charts';

const AnalyticOwner = ({ dateRange, ...props }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');

  useEffect(() => {
    const fetchChartData = async () => {
      if (!dateRange?.startDate || !dateRange?.endDate) return;

      try {
        const formattedStart = dayjs(dateRange.startDate).format('YYYY-MM-DD');
        const formattedEnd = dayjs(dateRange.endDate).format('YYYY-MM-DD');

        const res = await axios.get('/wishlist/top_item', {
          params: { startDate: formattedStart, endDate: formattedEnd },
        });

        const rawData = res.data;

        const fullDates = eachDayOfInterval({
          start: new Date(formattedStart),
          end: new Date(formattedEnd),
        }).map((d) => format(d, 'yyyy-MM-dd'));

        const normalized = rawData.map((item) => {
          const dateMap = new Map(item.data.map((d) => [d.x, d.y]));
          const filledData = fullDates.map((date) => ({
            x: date,
            y: dateMap.get(date) || 0,
          }));
          return {
            name: item.name,
            data: filledData,
          };
        });

        setData(normalized);
        setError('');
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError('Gagal mengambil data.');
        setData(null);
      }
    };

    fetchChartData();
  }, [dateRange?.startDate, dateRange?.endDate]);

  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      mb="0px"
      {...props}
    >
      <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
        <Flex align="center" w="100%">
          <Text
            color="secondaryGray.600"
            fontSize="sm"
            fontWeight="500"
            ml="5px"
            mt="4px"
            me="12px"
          >
            Total Wishlist
          </Text>
          <Flex align="center">
            <Icon as={RiArrowUpSFill} color="green.500" me="2px" mt="2px" />
            <Text color="green.500" fontSize="sm" fontWeight="700">
              +2.45%
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex w="100%" flexDirection={{ base: 'column', lg: 'row' }}>
        <Box minH="260px" w="100%" mt="28px">
          {error ? (
            <Text color="red.500">{error}</Text>
          ) : data ? (
            <LineChart
              key={JSON.stringify(data)}
              chartData={data}
              chartOptions={lineChartOptionsTotalSpent}
            />
          ) : (
            <Text color={textColorSecondary}>Loading chart...</Text>
          )}
        </Box>
      </Flex>
    </Card>
  );
};

export default AnalyticOwner;
