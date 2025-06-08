const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../middleware/auth');


router.get('/food-comment/:id', verifyToken, commentController.getKomentarByItemId);

/**
 * [POST] Buat komentar pertama kali
 * - Body: { item_makanan_id, comment_text }
 */
router.post('/', verifyToken, commentController.createComment);

/**
 * [GET] Ambil semua komentar
 */
router.get('/', verifyToken, commentController.getAllComments);

router.get('/comments', verifyToken, commentController.getCommentByUser);
router.get('/comments/item/:id', verifyToken, commentController.getCommentByItemId);

/**
 * [GET] Ambil komentar berdasarkan ID
 */
router.get('/:id', verifyToken, commentController.getCommentById);

module.exports = router;
