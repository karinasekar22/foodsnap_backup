const CommentDetail = require('../models/CommentDetail');
const Comment = require('../models/Comment');
const User = require('../models/User');
const ItemMakanan = require('../models/ItemMakanan'); // Jika ingin info makanan juga
const { Sequelize } = require('sequelize');





/**
 * [GET] Top 3 komentar dengan jumlah review terbanyak
 */
exports.getTopCommentDetails = async (req, res) => {
  try {
    const topComments = await CommentDetail.findAll({
      attributes: [
        'comment_id',
        [Sequelize.fn('COUNT', Sequelize.col('comment_id')), 'total_reviews']
      ],
      group: ['comment_id', 'Comment.id', 'Comment->User.id', 'Comment->ItemMakanan.id'],
      order: [[Sequelize.literal('total_reviews'), 'DESC']],
      limit: 3,
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'username', 'email']
            },
            {
              model: ItemMakanan,
              attributes: ['id', 'caption', 'description']
            }
          ]
        }
      ]
    });

    res.status(200).json({
      message: 'Top 3 komentar dengan jumlah review terbanyak berhasil diambil',
      data: topComments
    });
  } catch (error) {
    console.error('Gagal mengambil top komentar:', error);
    res.status(500).json({
      message: 'Gagal mengambil top komentar dengan review terbanyak',
      error: error.message
    });
  }
};
/**
 * [GET] Mengambil semua detail komentar yang termasuk:
 * - Komentar utamanya
 * - User yang menulis komentar
 * - User yang memberikan detail (rating/reaction)
 */
exports.getAllCommentDetails = async (req, res) => {
  try {
    const commentDetails = await CommentDetail.findAll({
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'username', 'email'] // penulis komentar
            }
          ]
        },
        {
          model: User,
          attributes: ['id', 'username', 'email'] // user yang kasih rating
        }
      ]
    });

    res.json(commentDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data detail komentar' });
  }
};

/**
 * [POST] Menambahkan interaksi user terhadap sebuah komentar:
 * - Berupa rating (1-5)
 * - Harus ada comment_id valid
 */
exports.createCommentDetail = async (req, res) => {
  try {
    const { comment_id, rating, user_id } = req.body;
    // const user_id = req.user.id; // dari verifyToken

    console.log("Id ", user_id);
    // Validasi komentar ada
    const comment = await Comment.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ message: 'Komentar tidak ditemukan' });
    }

    // // Cek apakah user sudah memberi detail sebelumnya → jika ya, tolak
    // const existing = await CommentDetail.findOne({
    //   where: { comment_id, user_id }
    // });
    // if (existing) {
    //   return res.status(409).json({ message: 'Kamu sudah memberi rating untuk komentar ini' });
    // }

    // Validasi rating jika dikirimkan
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ message: 'Rating harus antara 1 dan 5' });
    }

    const detail = await CommentDetail.create({ comment_id, user_id, rating });

    res.status(201).json({ message: 'Berhasil memberi interaksi ke komentar', detail });
  } catch (error) {
    console.error("Message Error",error);
    res.status(500).json({ message: 'Gagal menyimpan detail komentar' });
  }
};

/**
 * [GET] Mengambil semua detail untuk satu komentar (berdasarkan comment_id)
 */
exports.getCommentDetailsByComment = async (req, res) => {
  try {
    const { comment_id } = req.params;

    const details = await CommentDetail.findAll({
      where: { comment_id },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    res.json(details);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil detail komentar berdasarkan komentar' });
  }
};

/**
 * [DELETE] Menghapus interaksi detail user terhadap komentar
 */
exports.deleteCommentDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await CommentDetail.findByPk(id);

    if (!detail) {
      return res.status(404).json({ message: 'Detail komentar tidak ditemukan' });
    }

    await detail.destroy();
    res.json({ message: 'Detail komentar dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus detail komentar' });
  }
};

/**
 * [GET] Menghitung rata-rata rating untuk sebuah komentar
 */
exports.getAverageRating = async (req, res) => {
    try {
      const { id: comment_id } = req.params;
  
      const avgData = await CommentDetail.findOne({
        where: { comment_id },
        attributes: [
          [Sequelize.fn('AVG', Sequelize.col('rating')), 'average_rating'],
          [Sequelize.fn('COUNT', Sequelize.col('rating')), 'total_ratings']
        ]
      });
  
      const avg = parseFloat(avgData.get('average_rating')) || 0;
      const total = parseInt(avgData.get('total_ratings')) || 0;
  
      res.json({
        comment_id,
        average_rating: avg.toFixed(2),
        total_ratings: total
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal menghitung rata-rata rating' });
    }
  };
