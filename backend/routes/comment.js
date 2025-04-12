const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../middleware/auth');

/**
 * [POST] Buat komentar pertama kali
 * - Body: { item_makanan_id, comment_text }
 */
router.post('/', verifyToken, commentController.createComment);

/**
 * [GET] Ambil semua komentar
 */
router.get('/', verifyToken, commentController.getAllComments);

/**
 * [GET] Ambil komentar berdasarkan ID
 */
router.get('/:id', verifyToken, commentController.getCommentById);

module.exports = router;
