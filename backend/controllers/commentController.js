const Comment = require('../models/Comment');
const ItemMakanan = require('../models/ItemMakanan');
const User = require('../models/User');
const CommentDetail = require('../models/CommentDetail');


/**
 * [POST] Buat komentar pertama kali
 * - Body: { item_makanan_id, content, user_id }
 */
exports.createComment = async (req, res) => {
    try {
      const { item_makanan_id, content, rating } = req.body;
      const user_id = req.user.id;
  
      // Pastikan item makanan ada
      const item = await ItemMakanan.findByPk(item_makanan_id);
      if (!item) {
        return res.status(404).json({ message: 'Item makanan tidak ditemukan' });
      }
  
      // Simpan komentar utama
      const comment = await Comment.create({
        user_id,
        item_makanan_id,
        content
      });
  
      // Simpan detail rating jika ada
      let detail = null;
      if (rating) {
        detail = await CommentDetail.create({
          comment_id: comment.id,
          user_id,
          rating
        });
      }
  
      res.status(201).json({
        message: 'Komentar berhasil ditambahkan',
        comment,
        rating_detail: detail
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal menambahkan komentar' });
    }
  };
  

/**
 * [GET] Ambil semua komentar
 */
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email']
        },
        {
          model: ItemMakanan,
          attributes: ['id', 'caption', 'rating']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json(comments);
  } catch (error) {
    console.log("Message Error ", error);
    res.status(500).json({ message: 'Gagal mengambil komentar' });
  }
};

/**
 * [GET] Ambil komentar berdasarkan ID
 */
exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id, {
      include: [
        {
            model: User,
            attributes: ['id', 'username', 'email']
          },
          {
            model: ItemMakanan,
            attributes: ['id', 'caption', 'rating']
          }
      ]
    });

    if (!comment) {
      return res.status(404).json({ message: 'Komentar tidak ditemukan' });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil komentar' });
  }
};


exports.getKomentarByItemId = async (req, res) => {
  const { id } = req.params; // id = item_makanan_id

  // Validasi ID
  if (!Number(id)) {
    return res.status(400).json({ message: 'ID item makanan tidak valid' });
  }

  try {
    const komentar = await Comment.findAll({
      where: { item_makanan_id: id },
      order: [['created_at', 'DESC']],
      include: {
        model: User, // kalau ingin tampil nama user juga
        attributes: ['username']
      }
    });

    if (komentar.length === 0) {
      return res.status(404).json({ message: 'Komentar tidak ditemukan untuk item ini' });
    }

    res.status(200).json({
      message: 'Komentar berhasil diambil',
      data: komentar,
      total_komentar: komentar.length,
    });
  } catch (err) {
    console.error('Gagal mengambil komentar:', err);
    res.status(500).json({ message: 'Gagal mengambil komentar' });
  }
};

