import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Spinner,
  Select,
  Switch,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Card from "components/card/Card";
import axios from "api/axios";

const ItemMakananManage = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const tableBg = useColorModeValue("white", "gray.700");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [kategoriList, setKategoriList] = useState([]);
  const [restoranList, setRestoranList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); // untuk preview file baru
  const [existingImage, setExistingImage] = useState(null); // untuk gambar yang sudah diupload sebelumnya

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    restoran_id: "",
    caption: "",
    rating: 0,
    description: "",
    is_aktif: true,
    kategori_id: "",
    photo: null,
  });

    const [activeRestaurant, setActiveRestaurant] = useState(() => {
      const saved = sessionStorage.getItem("active_restaurant");
      return saved ? JSON.parse(saved) : null;
    });
  const [editId, setEditId] = useState(null);

  const API_URL = `${process.env.REACT_APP_API_BACKEND}/api/produk/`;

  //Display Restoran Masih Hardcode 
  const display_API = `${process.env.REACT_APP_API_BACKEND}/api/produk/restoran/${activeRestaurant.id}`;


  const fetchKategori = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BACKEND}/api/kategori/AllCategory`);
      setKategoriList(res.data);
    } catch (err) {
      console.error("Gagal load kategori", err);
    }
  };

  const fetchRestoran = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BACKEND}/api/restoran/`);
      setRestoranList(res.data);
    } catch (err) {
      console.error("Gagal load restoran", err);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(display_API);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchKategori();
    fetchRestoran();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm({ ...form, [name]: file });
      setPreviewImage(URL.createObjectURL(file));
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };


  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      if (editId) {
        await axios.put(`${API_URL}${editId}`, formData); // opsional, kalau PUT multipart disupport
        toast({ title: "Data berhasil diupdate", status: "success", isClosable: true });
      } else {
        await axios.post(API_URL, formData);
        toast({ title: "Data berhasil ditambahkan", status: "success", isClosable: true });
      }
      setForm({
        restoran_id: "",
        caption: "",
        rating: 0,
        description: "",
        is_aktif: true,
        kategori_id: "",
        photo: null,
      });
      setEditId(null);
      onClose();
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
      toast({ title: "Gagal menyimpan data", status: "error", isClosable: true });
    }
  };

  const handleEdit = (item) => {
    setForm({
      restoran_id: item.restoran_id,
      caption: item.caption,
      rating: item.rating,
      description: item.description,
      is_aktif: item.is_aktif,
      kategori_id: item.kategori_id,
      photo: null,
    });
    setExistingImage(item.photo_url); // Asumsikan Anda punya field URL foto
    setPreviewImage(null);
    setEditId(item.id);
    onOpen();
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      toast({ title: "Data berhasil dihapus", status: "success", isClosable: true });
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
      toast({ title: "Gagal menghapus data", status: "error", isClosable: true });
    }
  };

  return (
    <Card p={4} w="100%">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold" color={textColor}>
          Data Item Makanan
        </Text>
        <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={() => { setEditId(null); setForm({ restoran_id: "", caption: "", rating: 0, description: "", is_aktif: true, kategori_id: "", photo: null }); onOpen(); }}>
          Tambah Data
        </Button>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" py={10}><Spinner size="xl" /></Flex>
      ) : (
        <Box overflowX="auto">
          <Table variant="simple" bg={tableBg}>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Caption</Th>
                <Th>description</Th>
                <Th>Rating</Th>
                <Th>Aktif</Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr key={item.id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.caption}</Td>
                  <Td>{item.rating}</Td>
                  <Td>{item.is_aktif ? "Ya" : "Tidak"}</Td>
                  <Td>
                    <IconButton aria-label="Edit" icon={<EditIcon />} size="sm" colorScheme="yellow" mr={2} onClick={() => handleEdit(item)} />
                    <IconButton aria-label="Hapus" icon={<DeleteIcon />} size="sm" colorScheme="red" onClick={() => handleDelete(item.id)} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Modal Form */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editId ? "Edit Item Makanan" : "Tambah Item Makanan"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Restoran</FormLabel>
              <Select
                placeholder="Pilih Restoran"
                name="restoran_id"
                value={form.restoran_id}
                onChange={handleInputChange}
              >
                {restoranList.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.restaurant_name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Caption</FormLabel>
              <Input name="caption" value={form.caption} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Rating</FormLabel>
              <Input type="number" name="rating" value={form.rating} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>description</FormLabel>
              <Input type="text" name="description" value={form.description} onChange={handleInputChange} />
            </FormControl>
            <FormControl display="flex" alignItems="center" mb={3}>
              <FormLabel mb="0">Aktif</FormLabel>
              <Switch name="is_aktif" isChecked={form.is_aktif} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Kategori</FormLabel>
              <Select
                placeholder="Pilih Kategori"
                name="kategori_id"
                value={form.kategori_id}
                onChange={handleInputChange}
              >
                {kategoriList.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.nama}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Photo</FormLabel>
              <Input type="file" name="photo" accept="image/*" onChange={handleInputChange} />
            </FormControl>
            {previewImage ? (
              <Box mb={3}>
                <Text fontSize="sm" mb={1}>Preview Gambar Baru:</Text>
                <img src={previewImage} alt="Preview" style={{ maxWidth: "100%", borderRadius: "8px" }} />
              </Box>
            ) : existingImage ? (
              <Box mb={3}>
                <Text fontSize="sm" mb={1}>Gambar Sebelumnya:</Text>
                <img src={existingImage} alt="Lama" style={{ maxWidth: "100%", borderRadius: "8px" }} />
              </Box>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Simpan
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ItemMakananManage;
