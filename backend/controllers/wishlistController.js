const Wishlist = require('../models/Wishlist');
const WishlistFood = require('../models/WishlistFood');
const ItemMakanan = require('../models/ItemMakanan');

exports.getUserWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({
      where: { user_id: userId },
      include: {
        model: WishlistFood,
        include: {
          model: ItemMakanan,
          attributes: ['id', 'caption', 'rating'],
        }
      }
    });

    if (!wishlist) {
      return res.json({ wishlist: [] });
    }

    res.json(wishlist);
  } catch (error) {
    console.error('Error getUserWishlist:', error);
    res.status(500).json({ message: 'Gagal mengambil wishlist' });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { item_makanan_id } = req.body;

    let wishlist = await Wishlist.findOne({ where: { user_id: userId } });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user_id: userId ,item_makanan_id :item_makanan_id});
    }

    // Cek apakah item sudah ada di wishlist
    const existing = await WishlistFood.findOne({
      where: {
        wishlist_id: wishlist.id,
        item_makanan_id
      }
    });

    if (existing) {
      return res.status(400).json({ message: 'Item sudah ada di wishlist' });
    }

    const wishlistItem = await WishlistFood.create({
      wishlist_id: wishlist.id,
      item_makanan_id
    });

    res.status(201).json({ message: 'Item ditambahkan ke wishlist', data: wishlistItem });
  } catch (error) {
    console.error('Error addToWishlist:', error);
    res.status(500).json({ message: 'Gagal menambahkan ke wishlist' });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { item_makanan_id } = req.body;

    const wishlist = await Wishlist.findOne({ where: { user_id: userId } });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist tidak ditemukan' });
    }

    const deleted = await WishlistFood.destroy({
      where: {
        wishlist_id: wishlist.id,
        item_makanan_id
      }
    });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Item tidak ditemukan di wishlist' });
    }

    res.json({ message: 'Item dihapus dari wishlist' });
  } catch (error) {
    console.error('Error removeFromWishlist:', error);
    res.status(500).json({ message: 'Gagal menghapus dari wishlist' });
  }
};
