import { React, useState, useEffect } from 'react';
import LayoutCustomer from '../LayoutCustomer';
import WishlistCard from './components/WishlistCard';
import Analytic from './components/Analytical';
import Calendar from './components/Calendar';
import { HStack, VStack } from '@chakra-ui/react';
import PieCharts from './components/PieCharts';
import RecipeList from './components/RecipeList';

const AnalyticalPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedIds, setSelectedIds] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log('IDs dikirim dari WishlistCard:', selectedIds);
  }, [selectedIds]);
  return (
    <LayoutCustomer>
      <WishlistCard onAnalyze={(ids) => setSelectedIds(ids)} />
      <HStack justify="space-between" w="100%" p={2}>
        <VStack w="100%">
          <Analytic itemIds={selectedIds} />
          <PieCharts itemIds={selectedIds} />
        </VStack>
        <VStack>
          <Calendar />
          <RecipeList />
        </VStack>
      </HStack>
    </LayoutCustomer>
  );
};

export default AnalyticalPage;
