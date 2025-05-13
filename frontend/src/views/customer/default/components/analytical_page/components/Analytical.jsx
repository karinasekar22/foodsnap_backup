import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, useColorModeValue, Spinner } from '@chakra-ui/react';
import BarChart from 'components/charts/BarChart';
import Card from 'components/card/Card.js';
import { ChartOption } from './variables/charts';
import axios from 'api/axios';

export default function Analytic({ itemIds, ...props }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  useEffect(() => {
    if (!itemIds || itemIds.length === 0) {
      setResult([
        {
          Calorie: 0,
          Fat: 0,
          Sugar: 0,
          Protein: 0,
          Carbohydrates: 0,
          Fiber: 0,
        },
      ]);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .post('produk/analytic', { itemIds })
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setResult(res.data);
        } else {
          setResult(null);
        }
      })
      .catch((err) => {
        console.error('Gagal analisis:', err);
        setResult(null);
      })
      .finally(() => setLoading(false));
  }, [itemIds]);

  if (loading) return <Spinner size="xl" />;

  if (!result) return <Text>Gagal memuat hasil analisa.</Text>;

  return (
    <Card align="center" direction="column" w="100%" {...props}>
      <Flex justify="space-between" align="start" px="10px" pt="5px" w="100%">
        <Flex flexDirection="column" align="start" mr="20px">
          <Text
            color="secondaryGray.600"
            fontSize={{ base: 'xs', md: 'md' }}
            fontWeight="500"
            textAlign="start"
          >
            Estimasi Kandungan Gizi Makro
          </Text>
          <Flex align="end" mt={1}>
            <Text
              mr="4px"
              color="secondaryGray.600"
              fontSize={{ base: 'xs', md: 'md' }}
              fontWeight="500"
            >
              Data dari wishlist:
            </Text>
            <Text
              color={textColor}
              fontSize={{ base: 'md', md: 'xl' }}
              fontWeight="700"
              lineHeight="100%"
            >
              {itemIds?.length ?? 0} Item
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box h="315px" mt="auto" w="100%">
        <BarChart chartData={result} chartOptions={ChartOption} />
      </Box>
    </Card>
  );
}
