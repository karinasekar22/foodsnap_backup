const ItemMakanan = require('../models/ItemMakanan');
const { Op, fn, col, literal } = require('sequelize');
const Kategori = require('../models/kategori');
const WishlistFood = require('../models/WishlistFood');
const Restoran = require('../models/Restoran');
const Location = require('../models/Location');


// Endpoint untuk mencari dan memfilter produk berdasarkan kategori, lokasi, feeds, dan trends
exports.searchAndFilterItems = async (req, res) => {
  try {
    const { kategori, location, trend, search } = req.query;

    const whereConditions = {};

    // Filter berdasarkan kategori
    if (kategori) {
      whereConditions.kategori_id = kategori;
    }

    // Filter berdasarkan tren (misalnya, jika trend=true maka tampilkan item yang tren)
    if (trend) {
      whereConditions.trend = true; // Misalnya kita memiliki kolom `trend` pada tabel item_makanan
    }

    // Filter berdasarkan kata kunci pencarian
    if (search) {
      whereConditions.caption = {
        [Op.iLike]: `%${search}%`  // menggunakan `Op.iLike` untuk pencarian case-insensitive di PostgreSQL
      };
    }

    // Mencari item dengan kondisi filter
    const items = await ItemMakanan.findAll({
      where: whereConditions,
      include: [
        {
          model: Restoran,
          include: [
            {
              model: Location,
              where: location ? { id: location } : undefined,  // Filter berdasarkan lokasi jika parameter ada
              through: { attributes: [] },  // Mengabaikan kolom junction table
            }
          ],
          required: location ? true : false, // Hanya join jika parameter location ada
        }
      ],
      logging: console.log,  // Menampilkan query yang dijalankan untuk debugging
    });

    res.json(items);
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ message: 'Gagal mengambil item' });
  }
};


exports.createItem = async (req, res) => {
  try {
    const { restoran_id, caption , kategori_id } = req.body;
    const photo_url = req.file ? `/uploads/produk/${req.file.filename}` : null;

    const item = await ItemMakanan.create({ restoran_id, caption, photo_url ,kategori_id});
    res.status(201).json({ message: 'Item makanan dibuat', item });
  } catch (err) {
        console.log("Params ", req.query);

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
