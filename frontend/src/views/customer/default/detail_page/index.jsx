import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Spinner,
  VStack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import axiosInstance from '../../../../api/axios';
import ProdukHeader from './components/ProdukHeader';
import ProdukDeskripsi from './components/ProdukDeskripsi';
import KomentarList from './components/KomentarList';
import FormKomentar from './components/FormKomentar';
import LayoutCustomer from '../components/LayoutCustomer';

const ProdukDetail = () => {
  const { id } = useParams();
  const toast = useToast();

  const [produk, setProduk] = useState(null);
  const [komentar, setKomentar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [replyingToUser, setReplyingToUser] = useState('');
  const formRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProduk = await axiosInstance.get(`/produk/item-makanan/${id}`);
        setProduk(resProduk.data);
      } catch (err) {
        console.error('Gagal memuat produk:', err);
        toast({
          title: 'Produk tidak ditemukan',
          description: 'Gagal memuat detail produk. Silakan coba lagi nanti.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }

      try {
        const resKomentar = await axiosInstance.get(`/comments/food-comment/${id}`);
        setKomentar(resKomentar.data.data || []);
      } catch (err) {
        console.error('Gagal memuat komentar:', err);
        toast({
          title: 'Komentar tidak tersedia',
          description: 'Gagal memuat komentar. Anda tetap bisa melihat produk.',
          status: 'warning',
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, toast]);

  const handleReplyClick = (komentarId, username) => {
    setReplyTo(komentarId);
    setReplyingToUser(username);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleKirimKomentar = async (newKomentar) => {
    try {
      await axiosInstance.post('/comments', {
        content: newKomentar,
        item_makanan_id: id,
        parent_id: replyTo,
      });

      setKomentar((prev) => [
        ...prev,
        { content: newKomentar, parent_id: replyTo, User: { username: 'Anda' } },
      ]);

      toast({
        title: 'Komentar berhasil dikirim',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setReplyTo(null);
      setReplyingToUser('');
    } catch (err) {
      console.error('Gagal kirim komentar:', err);
      toast({
        title: 'Gagal mengirim komentar',
        description: 'Terjadi kesalahan. Silakan coba lagi.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const toggleComments = () => setShowComments((prev) => !prev);

  const bgColor = useColorModeValue('white', 'gray.800');

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="lg" color="green.500" />
        <Text mt={4}>Memuat produk...</Text>
      </Box>
    );
  }

  if (!produk) {
    return (
      <LayoutCustomer>
        <Box textAlign="center" py={10}>
          <Text>Produk tidak ditemukan atau gagal dimuat.</Text>
        </Box>
      </LayoutCustomer>
    );
  }

  return (
    <LayoutCustomer>
      <Box
        w="full"
        px={{ base: 4, md: 12, lg: 20 }}
        py={6}
        bg={bgColor}
        borderRadius="lg"
        boxShadow="md"
        mt={6}
      >
        <VStack spacing={6} align="stretch">
          <ProdukHeader data={produk} />
          <ProdukDeskripsi caption={produk.caption || 'Tidak ada deskripsi.'} />

          <Divider borderColor="gray.300" />

          <Button
            size="md"
            colorScheme="green"
            variant="link"
            fontWeight="semibold"
            alignSelf="flex-start"
            onClick={toggleComments}
          >
            {showComments ? 'Sembunyikan ulasan' : `Lihat ${komentar.length} ulasan`}
          </Button>

          {showComments && (
            <KomentarList komentar={komentar} onReplyClick={handleReplyClick} />
          )}

          <FormKomentar
            ref={formRef}
            itemId={id}
            parentId={replyTo}
            replyingToUser={replyingToUser}
            onSubmit={handleKirimKomentar}
          />
        </VStack>
      </Box>
    </LayoutCustomer>
  );
};

export default ProdukDetail;
