const ItemMakanan = require('../models/ItemMakanan');

exports.createItem = async (req, res) => {
  try {
    const { restoran_id, caption } = req.body;
    const photo_url = req.file ? `/uploads/produk/${req.file.filename}` : null;

    const item = await ItemMakanan.create({ restoran_id, caption, photo_url });
    res.status(201).json({ message: 'Item makanan dibuat', item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal membuat item' });
  }
};

exports.getItemsByRestoran = async (req, res) => {
  try {
    const { restoran_id } = req.params;
    const items = await ItemMakanan.findAll({ where: { restoran_id } });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil item' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ItemMakanan.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Item tidak ditemukan' });

    const updateData = req.body;
    if (req.file) {
      updateData.photo_url = `/uploads/produk/${req.file.filename}`;
    }

    await item.update(updateData);
    res.json({ message: 'Item diperbarui', item });
  } catch (err) {
    res.status(500).json({ message: 'Gagal memperbarui item' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ItemMakanan.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Item tidak ditemukan' });

    await item.destroy();
    res.json({ message: 'Item dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus item' });
  }
};
