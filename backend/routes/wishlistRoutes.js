const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const verifyToken = require('../middleware/auth');

/**
 * [GET] Ambil semua item wishlist milik user yang login
 * Endpoint: /api/wishlist
 */
router.get('/', verifyToken, wishlistController.getUserWishlist);

/**
 * [POST] Tambah item makanan ke wishlist
 * Body: { item_makanan_id }
 * Endpoint: /api/wishlist/add
 */
router.post('/add', verifyToken, wishlistController.addToWishlist);

/**
 * [DELETE] Hapus item dari wishlist
 * Body: { item_makanan_id }
 * Endpoint: /api/wishlist/remove
 */
router.delete('/remove/:item_makanan_id', verifyToken, wishlistController.removeFromWishlist);

module.exports = router;
