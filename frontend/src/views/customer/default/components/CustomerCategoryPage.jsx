import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Center, Text } from '@chakra-ui/react';
import axios from 'api/axios';
import LayoutCustomer from './LayoutCustomer';
import FoodGridCategories from './FoodGridCategories'; // sesuaikan path

const CustomerCategoryPage = () => {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFoodsByCategory = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BACKEND}/api/produk/search?kategori=${id}`);
        setFoods(res.data || []);
      } catch (err) {
        setError('Gagal memuat makanan berdasarkan kategori');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodsByCategory();
  }, [id]);

  const renderContent = () => {
    if (loading) {
      return (
        <Center mt={10}>
          <Spinner size="xl" color="green.500" />
        </Center>
      );
    }

    if (error) {
      return (
        <Center mt={10}>
          <Text color="red.500">{error}</Text>
        </Center>
      );
    }

    return <FoodGridCategories foods={foods} />;
  };

  return <LayoutCustomer>{renderContent()}</LayoutCustomer>;
};

export default CustomerCategoryPage;
