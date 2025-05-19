const Wishlist = require("../models/Wishlist");
const WishlistFood = require("../models/WishlistFood");
const ItemMakanan = require("../models/ItemMakanan");
const { Op, fn, col } = require("sequelize");
const sequelize = require("../config/database");
const { Sequelize } = require("sequelize");
const Restoran = require("../models/Restoran");
const Kategori = require("../models/kategori");

exports.getUserWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({
      where: { user_id: userId },
      include: {
        model: WishlistFood,
        include: {
          model: ItemMakanan,
          attributes: ["id", "caption", "rating", "description", "photo_url"],
          include: {
            model: Kategori,
            attributes: ["id", "nama"],
          }
        },
      },
    });

    if (!wishlist) {
      return res.json({ wishlist: [] });
    }

    res.json(wishlist);
  } catch (error) {
    console.error("Error getUserWishlist:", error);
    res.status(500).json({ message: "Gagal mengambil wishlist" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { item_makanan_id } = req.body;

    let wishlist = await Wishlist.findOne({ where: { user_id: userId } });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user_id: userId,
        item_makanan_id: item_makanan_id,
      });
    }

    // Cek apakah item sudah ada di wishlist
    const existing = await WishlistFood.findOne({
      where: {
        wishlist_id: wishlist.id,
        item_makanan_id,
      },
    });

    if (existing) {
      return res.status(400).json({ message: 'Item sudah ada di wishlist' });
    }

    const wishlistItem = await WishlistFood.create({
      wishlist_id: wishlist.id,
      item_makanan_id,
    });

    res
      .status(201)
      .json({ message: "Item ditambahkan ke wishlist", data: wishlistItem });
  } catch (error) {
    console.error("Error addToWishlist:", error);
    res.status(500).json({ message: "Gagal menambahkan ke wishlist" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; // 👈 ambil dari params!

    const wishlist = await Wishlist.findOne({ where: { user_id: userId } });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist tidak ditemukan" });
    }

    const deleted = await WishlistFood.destroy({
      where: {
        wishlist_id: wishlist.id,
        id
      }
    });

    if (deleted === 0) {
      return res
        .status(404)
        .json({ message: "Item tidak ditemukan di wishlist" });
    }

    res.json({ message: "Item dihapus dari wishlist" });
  } catch (error) {
    console.error("Error removeFromWishlist:", error);
    res.status(500).json({ message: "Gagal menghapus dari wishlist" });
  }
};

exports.getTopWishlist = async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = req.user?.id;

  try {
    // Step 1: Ambil top 3 caption
    const topItems = await sequelize.query(
      `SELECT im.caption, COUNT(*) AS total
       FROM wishlist_food wf
       JOIN wishlist w ON wf.wishlist_id = w.id
       JOIN item_makanan im ON wf.item_makanan_id = im.id
       JOIN restoran r ON im.restoran_id = r.id
       WHERE w.created_at BETWEEN :startDate AND :endDate
         AND r.user_id = :userId
       GROUP BY im.caption
       ORDER BY total DESC
       LIMIT 3`,
      {
        replacements: { startDate, endDate, userId },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const topCaptions = topItems.map((item) => item.caption);
    if (topCaptions.length === 0) {
      console.log("Tidak ada data wishlist ditemukan di tanggal tersebut");
      return res.json([]);
    }

    const rawData = await sequelize.query(
      `SELECT im.caption, DATE(w.created_at) AS date, COUNT(*) AS total
       FROM wishlist_food wf
       JOIN wishlist w ON wf.wishlist_id = w.id
       JOIN item_makanan im ON wf.item_makanan_id = im.id
       JOIN restoran r ON im.restoran_id = r.id
       WHERE w.created_at BETWEEN :startDate AND :endDate
         AND r.user_id = :userId
         AND im.caption IN (:topCaptions)
       GROUP BY im.caption, DATE(w.created_at)
       ORDER BY im.caption, date`,
      {
        replacements: { startDate, endDate, userId, topCaptions },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const grouped = {};
    rawData.forEach(({ caption, date, total }) => {
      if (!grouped[caption]) grouped[caption] = [];
      grouped[caption].push({ x: date, y: Number(total) });
    });

    const formatted = Object.entries(grouped).map(([caption, data]) => ({
      name: caption,
      data,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("ERROR di getTopWishlist:", err);
    res.status(500).json({ error: "Gagal ambil data wishlist" });
  }
};

exports.getTotalUMKMWishlistbyUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findAll({
      include: {
        model: WishlistFood,
        attributes: ["wishlist_id"],
        include: {
          model: ItemMakanan,
          attributes: ["caption"],
          include: {
            model: Restoran,
            where: { user_id: userId },
          },
        },
      },
    });

    res.status(200).json({
      total: wishlist.length,
      data: wishlist,
    });
  } catch (error) {
    console.error("Error getTotalWishlist:", error);
    res.status(500).json({ message: "Gagal mengambil total wishlist" });
  }
};

