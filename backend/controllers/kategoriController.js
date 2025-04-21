const Kategori = require('../models/kategori');

// Create Kategori
exports.createKategori = async (req, res) => {
  try {
    const { nama } = req.body;

    // Membuat kategori baru
    const kategori = await Kategori.create({
      nama
    });

    res.status(201).json({
      message: 'Kategori berhasil dibuat',
      kategori
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal membuat kategori' });
  }
};

// Get All Kategori
exports.getAllKategori = async (req, res) => {
  try {
    // Mengambil semua kategori
    const kategoris = await Kategori.findAll();

    res.status(200).json(kategoris);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data kategori' });
  }
};

// Get Kategori by ID
exports.getKategoriById = async (req, res) => {
  try {
    const { id } = req.params;

    // Mengambil kategori berdasarkan ID
    const kategori = await Kategori.findByPk(id);

    if (!kategori) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    res.status(200).json(kategori);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data kategori' });
  }
};

// Update Kategori
exports.updateKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama } = req.body;

    const kategori = await Kategori.findByPk(id);

    if (!kategori) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    // Mengupdate kategori
    kategori.nama = nama;
    await kategori.save();

    res.status(200).json({
      message: 'Kategori berhasil diperbarui',
      kategori
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal memperbarui kategori' });
  }
};

// Delete Kategori
exports.deleteKategori = async (req, res) => {
  try {
    const { id } = req.params;

    const kategori = await Kategori.findByPk(id);

    if (!kategori) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    // Menghapus kategori
    await kategori.destroy();

    res.status(200).json({ message: 'Kategori berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus kategori' });
  }
};
