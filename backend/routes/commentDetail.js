const express = require('express');
const router = express.Router();
const commentDetailController = require('../controllers/commentDetailController');
const verifyToken = require('../middleware/auth');

/**
 * [GET] Semua detail interaksi user terhadap komentar
 */
router.get('/', verifyToken, commentDetailController.getAllCommentDetails);

/**
 * [GET] Detail berdasarkan comment_id
 */
router.get('/:comment_id', verifyToken, commentDetailController.getCommentDetailsByComment);

/**
 * [POST] Tambahkan rating/balasan ke komentar
 */
router.post('/', verifyToken, commentDetailController.createCommentDetail);

/**
 * [DELETE] Hapus rating/balasan
 */
router.delete('/:id', verifyToken, commentDetailController.deleteCommentDetail);

/**
 * [GET] Rata-rata rating dari komentar
 */
router.get('/average-rating/:id', verifyToken, commentDetailController.getAverageRating);

module.exports = router;
