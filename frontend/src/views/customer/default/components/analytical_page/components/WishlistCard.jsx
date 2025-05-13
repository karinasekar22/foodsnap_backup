import React, { useState, useEffect, useCallback } from 'react';
import {
  HStack,
  VStack,
  Button,
  Box,
  Icon,
  Image,
  Text,
  Badge,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Grid,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { FaHeart } from 'react-icons/fa';
import axios from 'api/axios';
import WishlistSlider from './WishlistSlider';

// Komponen kartu item, opsional checkbox
function WishlistItemCard({ item, checked, onCheck, showCheckbox = true }) {
  const content = (
    <VStack gap={4}>
      <HStack align="flex-start" spacing={4}>
        <Image
          boxSize="125px"
          src={`${process.env.REACT_APP_API_BACKEND}${item.ItemMakanan.photo_url}`}
          alt={item.ItemMakanan.caption}
          borderRadius="xl"
          objectFit="cover"
        />
        <Box>
          <VStack alignItems="flex-start">
            <Text fontWeight="bold" fontSize="md">
              {item.ItemMakanan.caption}
            </Text>
            <Badge fontSize="12px" px={2} py={0.5} colorScheme="green">
              {item.ItemMakanan.Kategori.nama || 'Kategori'}
            </Badge>
          </VStack>
        </Box>
      </HStack>
      <HStack w="full" justify="space-between">
        <HStack spacing={2}>
          <Icon as={FaHeart} color="red.300" />
          <Text fontSize="xs">150K Like It</Text>
        </HStack>
        <HStack spacing={2}>
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              color={
                i < Math.floor(item.ItemMakanan.rating || 4)
                  ? 'yellow.400'
                  : 'gray.300'
              }
            />
          ))}
        </HStack>
      </HStack>
    </VStack>
  );

  if (showCheckbox) {
    return (
      <Box
        minW="250px"
        bg="white"
        borderRadius="xl"
        boxShadow="md"
        transition="transform 0.3s"
        _hover={{ transform: 'scale(1.03)' }}
        px={4}
        py={4}
      >
        <Checkbox isChecked={checked} onChange={onCheck} w="full">
          {content}
        </Checkbox>
      </Box>
    );
  }

  //untuk slider
  return (
    <Box
      minW="250px"
      bg="white"
      borderRadius="xl"
      boxShadow="md"
      transition="transform 0.3s"
      _hover={{ transform: 'scale(1.03)' }}
      px={4}
      py={4}
    >
      {content}
    </Box>
  );
}

const WishlistCard = ({ onAnalyze }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItems, setSelectedItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Ambil wishlist
  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setError('');
    axios
      .get('/wishlist/')
      .then((res) => {
        setWishlist(res.data.WishlistFoods || []);
      })
      .catch((err) => {
        console.error(err);
        setError('Gagal memuat wishlist.');
      })
      .finally(() => setLoading(false));
  }, [isOpen]);

  // Toggle pilih item
  const handleCheckboxChange = useCallback(
    (itemId) => {
      setSelectedItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    },
    []
  );

  // Analisa item terpilih
  const handleAnalyze = () => {
    const validIds = selectedItems.filter(
      (id) => id !== undefined && id !== null
    );
    if (validIds.length === 0) return;
    onAnalyze?.(validIds);
    onClose();
  };

  // Render konten modal
  const renderModalContent = () => {
    if (loading) return <Spinner />;
    if (error) return <Text color="red.500">{error}</Text>;
    if (wishlist.length === 0) return <Text>Tidak ada wishlist.</Text>;
    return (
      <Box maxH="400px" overflowX="auto" px={2}>
        <Grid templateColumns="repeat(2, 1fr)" gap={4} autoRows="1fr" w="max-content">
          {wishlist.map((item) => (
            <WishlistItemCard
              key={item.ItemMakanan.id}
              item={item}
              checked={selectedItems.includes(item.ItemMakanan.id)}
              onCheck={() => handleCheckboxChange(item.ItemMakanan.id)}
              showCheckbox={true}
            />
          ))}
        </Grid>
      </Box>
    );
  };

  // Filter item yang dipilih untuk slider
  const selectedWishlistItems = wishlist.filter((item) =>
    selectedItems.includes(item.ItemMakanan.id)
  );

  return (
    <VStack align="flex-start" w="full" maxW="calc(100vw - 240px)">
      <Button
        mr={6}
        size="sm"
        colorScheme="green"
        variant="outline"
        fontWeight="semibold"
        alignSelf="flex-end"
        onClick={onOpen}
      >
        + Wishlist
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="750px" w="90%">
          <ModalHeader>Pilih Makanan dari Wishlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderModalContent()}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleAnalyze}
              isDisabled={selectedItems.length === 0}
            >
              Analisa
            </Button>
            <Button onClick={onClose}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <WishlistSlider>
        {selectedWishlistItems.length === 0 ? (
          <Box
            w="full"
            textAlign="center"
            p={6}
            color="gray.500"
            fontWeight="semibold"
          >
            Silahkan pilih wishlist terlebih dahulu.
          </Box>
        ) : (
          selectedWishlistItems.map((item) => (
            <WishlistItemCard
              key={item.ItemMakanan.id}
              item={item}
              showCheckbox={false}
            />
          ))
        )}
      </WishlistSlider>
    </VStack>
  );
};

export default WishlistCard;
