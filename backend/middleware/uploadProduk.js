const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/produk');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-produk' + path.extname(file.originalname));
  }
});

const uploadProduk = multer({ storage });

module.exports = uploadProduk;
