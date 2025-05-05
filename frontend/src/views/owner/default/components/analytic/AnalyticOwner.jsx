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
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Card from "components/card/Card";
import axios from "api/axios";
const AnalyticOwner = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const tableBg = useColorModeValue("white", "gray.700");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ restaurant_name: "", lokasi: "" });
  const [editId, setEditId] = useState(null);

  const API_URL = `${process.env.REACT_APP_API_BACKEND}/api/restoran/`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`${API_URL}${editId}`, form);
        toast({ title: "Data berhasil diupdate", status: "success", isClosable: true });
      } else {
        await axios.post(API_URL, form);
        toast({ title: "Data berhasil ditambahkan", status: "success", isClosable: true });
      }
      setForm({ restaurant_name: "", lokasi: "" });
      setEditId(null);
      onClose();
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
      toast({ title: "Gagal menyimpan data", status: "error", isClosable: true });
    }
  };

  const handleEdit = (item) => {
    setForm({ restaurant_name: item.restaurant_name, lokasi: item.lokasi });
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
          Data Restoran
        </Text>
        <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={() => { setEditId(null); setForm({ restaurant_name: "", lokasi: "" }); onOpen(); }}>
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
                <Th>Nama Restoran</Th>
                <Th>Lokasi</Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr key={item.id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.restaurant_name}</Td>
                  <Td>{item.lokasi}</Td>
                  <Td>
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      size="sm"
                      colorScheme="yellow"
                      mr={2}
                      onClick={() => handleEdit(item)}
                    />
                    <IconButton
                      aria-label="Hapus"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(item.id)}
                    />
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
          <ModalHeader>{editId ? "Edit Data" : "Tambah Data"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Nama Restoran</FormLabel>
              <Input name="restaurant_name" value={form.restaurant_name} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Lokasi</FormLabel>
              <Input name="lokasi" value={form.lokasi} onChange={handleInputChange} />
            </FormControl>
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

export default AnalyticOwner;
