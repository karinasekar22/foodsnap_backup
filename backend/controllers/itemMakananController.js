const ItemMakanan = require("../models/ItemMakanan");
const { Op, fn, col, literal } = require("sequelize");
const Kategori = require("../models/kategori");
const WishlistFood = require("../models/WishlistFood");
const Restoran = require("../models/Restoran");
const Location = require("../models/Location");
const Nutrition = require("../models/Nutrition");
const { sequelize } = require('../config/database');

// Endpoint untuk mencari dan memfilter produk berdasarkan kategori, lokasi, feeds, dan trends
exports.searchAndFilterItems = async (req, res) => {
  try {
    const { kategori, location, trend, search } = req.query;

    const whereConditions = {};

    // Filter berdasarkan kategori
    if (kategori) {
      whereConditions.kategori_id = kategori;
    }

    // Jika filter trend=true, hitung item berdasarkan frekuensi wishlist dan urutkan berdasarkan jumlahnya
    if (trend === "true") {
      // Menggunakan aggregate query untuk menghitung jumlah kemunculan item di wishlist
      const trendingItems = await ItemMakanan.findAll({
        where: whereConditions,
        include: [
          {
            model: WishlistFood,
            attributes: [],
            required: true, // Join dengan WishlistFood
          },
        ],
        group: ["ItemMakanan.id"], // Kelompokkan berdasarkan id ItemMakanan
        attributes: [
          "ItemMakanan.id",
          "ItemMakanan.caption", // kolom lainnya yang ingin ditampilkan
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.col("WishlistFoods.item_makanan_id")
            ),
            "trend_count",
          ],
        ],
        order: [
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.col("WishlistFoods.item_makanan_id")
            ),
            "DESC",
          ],
        ], // Urutkan berdasarkan tren
      });
    }
    // Filter berdasarkan kata kunci pencarian
    if (search) {
      whereConditions.caption = {
        [Op.iLike]: `%${search}%`, // menggunakan `Op.iLike` untuk pencarian case-insensitive di PostgreSQL
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
              where: location ? { id: location } : undefined, // Filter berdasarkan lokasi jika parameter ada
              through: { attributes: [] }, // Mengabaikan kolom junction table
            },
          ],
          required: location ? true : false, // Hanya join jika parameter location ada
        },
      ],
      logging: console.log, // Menampilkan query yang dijalankan untuk debugging
    });

    res.json(items);
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ message: "Gagal mengambil item" });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { restoran_id, caption, kategori_id, description } = req.body;
    const photo_url = req.file ? `/uploads/produk/${req.file.filename}` : null;

    const item = await ItemMakanan.create({
      restoran_id,
      caption,
      photo_url,
      kategori_id,
      description,
    });
    res.status(201).json({ message: "Item makanan dibuat", item });
  } catch (err) {
    console.log("Params ", req.query);

    console.error(err);
    res.status(500).json({ message: "Gagal membuat item" });
  }
};

exports.getItemsByRestoran = async (req, res) => {
  try {
    const { restoran_id } = req.params;
    const items = await ItemMakanan.findAll({ where: { restoran_id } });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil item" });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await ItemMakanan.findAll();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil semua item makanan" });
  }
};

exports.getItemMakananDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ItemMakanan.findByPk(id, {
      include: [
        {
          model: Restoran,
          attributes: ["restaurant_name"], // hanya ambil nama restoran
        },
      ],
    });

    if (!item) {
      return res.status(404).json({ message: "Item makanan tidak ditemukan" });
    }

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil detail item makanan" });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ItemMakanan.findByPk(id);
    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });

    const updateData = req.body;

    console.log(" Description ", req.body.description);
    if (req.file) {
      updateData.photo_url = `/uploads/produk/${req.file.filename}`;
    }

    await item.update(updateData);
    res.json({ message: "Item diperbarui", item });
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui item" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ItemMakanan.findByPk(id);
    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });

    await item.destroy();
    res.json({ message: "Item dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus item" });
  }
};

// Di controller ItemMakananController.js
exports.getAllItem = async (req, res) => {
  try {
    // Tidak ada filter berdasarkan kategori atau lokasi
    const items = await ItemMakanan.findAll();

    // Cek jika tidak ada item
    if (items.length === 0) {
      return res.status(404).json({ message: "Tidak ada item ditemukan" });
    }

    res.json(items);
  } catch (err) {
    console.error("Error:", err); // Menampilkan error
    res.status(500).json({ message: "Gagal mengambil item" });
  }
};

exports.getMakananById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ItemMakanan.findByPk(id, {
      include: [
        {
          model: Restoran,
          attributes: ["restaurant_name", "banner_url"], // ambil hanya field yang dibutuhkan
        },
        {
          model: Kategori, // pastikan ini udah di-associate
          attributes: ["nama"],
        },
      ],
    });

    if (!item) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    res.status(200).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data item" });
  }
};

exports.getTotalMakananByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const items = await ItemMakanan.findAll({
      include: [
        {
          model: Restoran,
          where: { user_id: userId },
          attributes: [],
        },
      ],
    });

    const totalItems = items.length;
    res.status(200).json({ total: totalItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil total item makanan" });
  }
};

exports.getNutritionFromWishlist = async (req, res) => {
  const { itemIds } = req.body;

  try {
    const items = await ItemMakanan.findAll({
      where: { id: itemIds },
      include: [
        {
          model: Nutrition,
          attributes: [
            "calories",
            "fat",
            "sugar",
            "protein",
            "carbohydrates",
            "fiber",
          ], // tambahkan ini
        },
      ],
    });

    const total = items.reduce(
      (acc, item) => {
        const nutrition = item.Nutrition;
        return {
          kalori: acc.kalori + (nutrition?.calories || 0),
          lemak: acc.lemak + (nutrition?.fat || 0),
          gula: acc.gula + (nutrition?.sugar || 0),
          protein: acc.protein + (nutrition?.protein || 0),
          karbo: acc.karbo + (nutrition?.carbohydrates || 0),
          serat: acc.serat + (nutrition?.fiber || 0),
        };
      },
      { kalori: 0, lemak: 0, gula: 0, protein: 0, karbo: 0, serat: 0 }
    );

    res.json([
      {
        name: "Nutrition",
        data: [
          total.kalori,
          total.gula,
          total.lemak,
          total.protein,
          total.karbo,
          total.serat,
        ],
      },
    ]);
  } catch (error) {
    console.error("Error in getNutritionFromWishlist:", error);
    res.status(500).json({ message: "Gagal menghitung analisis gizi" });
  }
};

exports.getKategoribyIMId = async (req, res) => {
  const { itemIds } = req.body;

  try {
    const items = await ItemMakanan.findAll({
      where: {
        id: itemIds,
      },
      attributes: [
        "kategori_id",
        [fn("COUNT", col("ItemMakanan.id")), "jumlah"],
      ],
      include: [
        {
          model: Kategori,
          attributes: ["nama"],
        },
      ],
      group: ["kategori_id", "Kategori.id"],
    });

    const total = items.reduce(
      (sum, item) => sum + parseInt(item.dataValues.jumlah),
      0
    );

    const result = items.map((item) => ({
      kategori: item.Kategori.nama,
      jumlah: parseInt(item.dataValues.jumlah),
      persentase: ((item.dataValues.jumlah / total) * 100).toFixed(2),
    }));

    res.json(result);
  } catch (error) {
    console.error("Error in fetch pie chart:", error);
    res.status(500).json({ message: "Gagal menghitung pie chart" });
  }
};

exports.getNamaMakananByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const items = await ItemMakanan.findAll({
      attributes: ['id', 'caption'], // ambil hanya id dan nama_produk
      include: [
        {
          model: Restoran,
          where: { user_id: userId },
          attributes: [], // tidak perlu ambil field dari restoran
        },
      ],
    });

    const totalItems = items.length;

    res.status(200).json({
      items, // kirim data item-nya juga
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil total item makanan" });
  }
};
