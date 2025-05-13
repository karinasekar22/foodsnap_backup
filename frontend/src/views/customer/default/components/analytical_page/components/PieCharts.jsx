import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  HStack,
  VStack,
  Spinner,
  Grid,
} from '@chakra-ui/react';

import Card from 'components/card/Card.js';
import PieChart from './variables/PieChartNew';
import { pieChartOptions } from './variables/charts.js';

import axios from 'api/axios';

const LegendItem = ({ color, label, value, textColor }) => (
  <Flex direction="column" py="5px">
    <Flex align="center">
      <Box h="8px" w="8px" bg={color} borderRadius="50%" mr="4px" />
      <Text fontSize="xs" color="secondaryGray.600" fontWeight="700" mb="5px">
        {label}
      </Text>
    </Flex>
    <Text fontSize="lg" color={textColor} fontWeight="700">
      {value}
    </Text>
  </Flex>
);

const PieCharts = ({ itemIds, ...props }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'navy.700');
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset'
  );

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (!itemIds || itemIds.length === 0) {
      setResult([{ kategori: 'Kosong', jumlah: 1, persentase: '100' }]);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .post('produk/analytic-pie', { itemIds })
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setResult(res.data);
        } else {
          setResult([{ kategori: 'Kosong', jumlah: 1, persentase: '100' }]);
        }
      })
      .catch((err) => {
        console.error('Gagal analisis:', err);
        setResult(null);
      })
      .finally(() => setLoading(false));
  }, [itemIds]);

  if (loading) return <Spinner size="xl" />;

  if (!result || !Array.isArray(result))
    return <Text>Gagal memuat hasil analisa.</Text>;

  const labels = result.map((item) => String(item.kategori));
  const series = result.map((item) => parseFloat(item.persentase));

  //kalau masih awal masih kosong
  const safeSeries = series.length > 0 ? series : [100];
  const safeLabels = labels.length > 0 ? labels : ['No Data'];

  return (
    <Card p="20px" align="start" direction="column" w="100%" {...props}>
      <HStack
        align="start"
        spacing={4}
        w="100%"
        direction={{ base: 'column', md: 'row' }}
        flexWrap="wrap"
      >
        <VStack flex={1} align="center">
          <Text
            color={textColor}
            fontSize="md"
            fontWeight="600"
            mt="4px"
            ml={3}
            alignSelf="flex-start"
          >
            Category Based
          </Text>
          <Box>
            <PieChart
              width={250}
              height={250}
              chartData={safeSeries}
              chartOptions={{
                ...pieChartOptions,
                labels: safeLabels,
              }}
            />
          </Box>
        </VStack>
        <VStack flex={2} align="start">
          <Card
            bg={cardColor}
            direction="row"
            boxShadow={cardShadow}
            w="100%"
            p="5px"
            px="20px"
            mt="15px"
            mx="auto"
          >
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={4}
              autoRows="1fr"
              w="max-content"
            >
              {result.map((item, index) => (
                <LegendItem
                  key={index}
                  color={
                    pieChartOptions.colors[
                      index % pieChartOptions.colors.length
                    ]
                  }
                  label={item.kategori}
                  value={`${item.persentase}%`}
                  textColor={textColor}
                />
              ))}
            </Grid>
          </Card>
        </VStack>
      </HStack>
    </Card>
  );
};

export default PieCharts;
